/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { Svg, Path, Rect, LinearGradient, Stop, Ellipse, Defs, RadialGradient } from 'react-native-svg'


const forLRBT = (s) => {
  return {
    left: s,
    right: s,
    bottom: s,
    top: s,
  }
}

function linearGradFactory(args) {
  return (
    <LinearGradient x1="0" y1="0" x2="0" y2="0" {...args}>
      <Stop offset="0" stopColor="#FFFFFF00" stopOpacity="0" />
      <Stop offset="1" stopColor="red" stopOpacity="1" />
    </LinearGradient>
  )
}


function radialGradFactory({ id, x, y }) {
  return (
    <RadialGradient
      cx={x}
      cy={y}
      rx="14"
      ry="14"
      fx={x}
      fy={y}
      id={id}
      gradientUnits="userSpaceOnUse"
    >
      <Stop offset="0" stopColor="red" stopOpacity="1" />
      <Stop offset="1" stopColor="#FFFFFF00" stopOpacity="0" />
    </RadialGradient>
  )
}

function ShadowView (props){
  return <View {...props}>
    <View style={{ width: 10, height: 10, bottom: -10, right: -10, position: 'absolute', backgroundColor: 'yellow' }} />
    <View style={{ width: 10, height: 10, bottom: -10, left: -10, position: 'absolute', backgroundColor: 'yellow' }} />
    <View style={{ ...forLRBT('-50%'), position: 'absolute', justifyContent: 'center' }}>
    {/*<View style={{ position: 'absolute', width: '70%', height: '70%', alignSelf: 'center', backgroundColor: '#00220011'}}/>*/}
      <Svg width="100%" height="100%">
        <Defs>
          {linearGradFactory({ id: "grad-top", y2: 1  })}
          {linearGradFactory({ id: "grad-bottom", y1: 1  })}
          {linearGradFactory({ id: "grad-left", x2: 1  })}
          {linearGradFactory({ id: "grad-right", x1: 1  })}
          {radialGradFactory({ id:"grad-top-right", y: "25%", x: "75%" })}
          {radialGradFactory({ id:"grad-bottom-right", y: "75%", x: "75%" })}
          {radialGradFactory({ id:"grad-top-left", y: "25%", x: "25%" })}
          {radialGradFactory({ id:"grad-bottom-left", y: "75%", x: "25%" })}
        </Defs>
        <Rect
          fill="url(#grad-right)"
          height={"50%"}
          width="14"
          x="75%"
          y={"25%"}
        />
        <Rect
          fill="url(#grad-left)"
          height={"50%"}
          width="-14"
          x="25%"
          y={"25%"}
        />
        <Rect
          fill="url(#grad-bottom)"
          width={"50%"}
          height="14"
          y="75%"
          x={"25%"}
        />
        <Rect
          fill="url(#grad-top)"
          width={"50%"}
          height="-14"
          y="25%"
          x={"25%"}
        />
        <Rect
          fill="url(#grad-top-right)"
          width={"14"}
          height="-14"
          y="25%"
          x={"75%"}
        />
        <Rect
          fill="url(#grad-bottom-right)"
          width={"14"}
          height="14"
          y="75%"
          x={"75%"}
        />
        <Rect
          fill="url(#grad-top-left)"
          width={"-14"}
          height="-14"
          y="25%"
          x={"25%"}
        />
        <Rect
          fill="url(#grad-bottom-left)"
          width={"-14"}
          height="14"
          y="75%"
          x={"25%"}
        />
      </Svg>
    {/*<View style={{ position: 'absolute', width: '62.5%', height: '62.5%', alignSelf: 'center', backgroundColor: '#0000DD11'}}/>*/}
    </View>
    {props.children}
  </View>

}


const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={{
          backgroundColor: 'yellow',
          flexDirection: 'column',
          height: 800,
          borderWidth: 1,
          margin: 4,
          padding: 10,
          justifyContent: 'space-between'
        }}>

          <View
            style={{
              width: 200,
              height: 200,
            }}
          >
            <Svg
              width="100%"
              height="200"
              fill="blue"
              stroke="red"
              color="green"
              viewBox="-16 -16 544 544"
            >
              <Path
                d="M318.37,85.45L422.53,190.11,158.89,455,54.79,350.38ZM501.56,60.2L455.11,13.53a45.93,45.93,0,0,0-65.11,0L345.51,58.24,449.66,162.9l51.9-52.15A35.8,35.8,0,0,0,501.56,60.2ZM0.29,497.49a11.88,11.88,0,0,0,14.34,14.17l116.06-28.28L26.59,378.72Z"
                strokeWidth="32"
              />
              <Path d="M0,0L512,512" stroke="currentColor" strokeWidth="32" />
            </Svg>

          </View>

          <ShadowView
            style={{
              margin: 50,
              backgroundColor: 'green'
            }}
          >
            <View
              style={{
                margin: 50,
                width: 100,
                height: 100,
                backgroundColor: 'red'
              }}
            />
          </ShadowView>

          <ShadowView
            style={{
              margin: 30,
              backgroundColor: 'green'
            }}
          >
            <View
              style={{
                margin: 50,
                width: 100,
                height: 50,
                backgroundColor: 'red'
              }}
            />
          </ShadowView>

          <View
            style={{
              margin: 50,
              backgroundColor: 'green'
            }}
          >
            <View
              style={{
                
                margin: 50,
                width: 100,
                height: 100,
                backgroundColor: 'red'
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
