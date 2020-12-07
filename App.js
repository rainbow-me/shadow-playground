/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View,} from 'react-native';

import {Colors,} from 'react-native/Libraries/NewAppScreen';
import {Path, Svg} from 'react-native-svg'
import ShadowView from "./ShadowView";


const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={{
          backgroundColor: 'violet',
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

          <View style={{ height: 50, with: '100%', flexDirection: 'row', backgroundColor: 'yellow', justifyContent: 'space-between' }}>
            <ShadowView
              style={{
                height: 30,
                flex: 1,
                width: 80,
                backgroundColor: 'red',
                shadowColor: "#000",
                // shadowOffset: {
                //   width: 10,
                //   height: 10,
                // },
                shadowOpacity: 0.5,
                shadowRadius: 10,
                borderRadius: 0,
              }}
            />
            <ShadowView
              style={{
                height: 30,
                flex: 1,
                width: 80,
                backgroundColor: 'red',
                shadowColor: "#000",
                // shadowOffset: {
                //   width: 10,
                //   height: 10,
                // },
                shadowOpacity: 0.5,
                shadowRadius: 10,
                borderRadius: 0,
              }}
            />
          </View>

          <ShadowView
            style={{
              margin: 50,
              backgroundColor: 'red',
              shadowColor: "#000",
              // shadowOffset: {
              //   width: 10,
              //   height: 10,
              // },
              shadowOpacity: 0.5,
              shadowRadius: 20,
              flex: 1,
              borderRadius: 0,
              // borderTopRightRadius: 30,
            }}
          >
            <View
              style={{
                margin: 50,
                width: 100,
                height: 100,
                backgroundColor: 'transparent'
              }}
            />
          </ShadowView>

          {/*<ShadowView*/}
          {/*  style={{*/}
          {/*    margin: 30,*/}
          {/*    backgroundColor: 'green',*/}
          {/*    shadowColor: "#000",*/}
          {/*    // shadowOffset: {*/}
          {/*    //   width: 0,*/}
          {/*    //   height: 2,*/}
          {/*    // },*/}
          {/*    shadowOpacity: 0.5,*/}
          {/*    shadowRadius: 10,*/}
          {/*  }}*/}
          {/*>*/}
          {/*  <View*/}
          {/*    style={{*/}
          {/*      margin: 50,*/}
          {/*      width: 100,*/}
          {/*      height: 50,*/}
          {/*      backgroundColor: 'red'*/}
          {/*    }}*/}
          {/*  />*/}
          {/*</ShadowView>*/}

          <View
            style={{
              margin: 50,
              backgroundColor: 'green',
              shadowColor: "#000",
              // shadowOffset: {
              //   width: 10,
              //   height: 0,
              // },
              shadowOpacity: 1,
              shadowRadius: 10,
              flex: 1,
              borderRadius: 0,
              borderTopRightRadius: 10,
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
