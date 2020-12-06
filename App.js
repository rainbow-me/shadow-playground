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
import { Svg, Path, Rect, LinearGradient, Stop, Ellipse, Defs, RadialGradient, G, Circle } from 'react-native-svg'


const forLRBT = (s) => {
  return {
    left: s,
    right: s,
    bottom: s,
    top: s,
  }
}

function linearGradFactory(args, opacity, color) {
  return (
    <LinearGradient x1="0" y1="0" x2="0" y2="0" {...args}>
      <Stop offset="0" stopColor={color} stopOpacity="0" />
      <Stop offset="1" stopColor={color} stopOpacity={1} />
    </LinearGradient>
  )
}


function radialGradFactory({ id, x, y, transform }, opacity, color, shadowRadius, borderRadius = 0) {
  return (
    <RadialGradient
      cx={x}
      cy={y}
      rx={shadowRadius + borderRadius}
      ry={shadowRadius + borderRadius}
      fx={x}
      fy={y}
      id={id}
      transform={transform}
      gradientUnits="userSpaceOnUse"
    >
      <Stop offset="0" stopColor={color} stopOpacity={1} />
      <Stop offset={borderRadius / (shadowRadius + borderRadius)} stopColor={color} stopOpacity={1} />
      <Stop offset="1" stopColor={color} stopOpacity="0" />
    </RadialGradient>
  )
}

function splitPositionalStyleProps(style) {
  const {
    bottom,
    direction,
    display,
    end,
    left,
    margin,
    marginBottom,
    marginEnd,
    marginHorizontal,
    marginLeft,
    marginRight,
    marginStart,
    marginTop,
    marginVertical,
    position,
    right,
    start,
    top,
    zIndex,
    backfaceVisibility,
    opacity,
    transform,
    width,
    height,
    ...rest
  } = style
  return [{
    bottom,
    direction,
    display,
    end,
    left,
    margin,
    marginBottom,
    marginEnd,
    marginHorizontal,
    marginLeft,
    marginRight,
    marginStart,
    marginTop,
    marginVertical,
    position,
    right,
    start,
    top,
    zIndex,
    backfaceVisibility,
    transform,
    width,
    opacity,
    height
  }, rest]
}

const INNERALIZING_OF_SHADOW = 1.8;
const MULTIPLICATING_SHADOW = 3.9

const EPSILON = 0.045

function ShadowView (props) {
  const fstyle = StyleSheet.flatten(props.style);
  const { shadowColor, shadowOpacity = 1, shadowRadius, shadowOffset = { }, ...restStyle } = fstyle;
  const { width = 0, height = 0 } = shadowOffset
  const [outerProps, innerProps] = splitPositionalStyleProps(restStyle)

  const borderTopRightRadius = 15;
  const borderTopLeftRadius = 0;
  const borderBottomRightRadius = 0;
  const borderBottomLeftRadius = 0;


  return (
      <View {...props} style={[outerProps, { backgroundColor: 'transparent' }]}>
        <View style={{ width: 10, height: 10, bottom: -10, right: -10, position: 'absolute' }} />
        <View style={{ width: 10, height: 10, bottom: -10, left: -10, position: 'absolute' }} />
        <View style={{ ...forLRBT('-50%'), position: 'absolute', justifyContent: 'center', opacity: 1, transform:[{ translateX: width }, { translateY: height }] }}>
          <View style={{ width: '50%', height: '50%', top: 0, left: 0, backgroundColor: 'transparent', position: 'absolute' }}>
            <Svg width="100%" height="100%" >
              <Defs>
                {linearGradFactory({ id: "grad-top", y2: 1  }, shadowOpacity, shadowColor)}
                {linearGradFactory({ id: "grad-left", x2: 1  }, shadowOpacity, shadowColor)}
                {radialGradFactory({ id:"grad-top-left", y: "50%", x: "50%", transform:`translate(${MULTIPLICATING_SHADOW * shadowRadius + borderTopLeftRadius}, ${MULTIPLICATING_SHADOW * shadowRadius + borderTopLeftRadius})`}, shadowOpacity, shadowColor, shadowRadius * MULTIPLICATING_SHADOW, borderTopLeftRadius)}
              </Defs>
              <Rect
                fill="url(#grad-left)"
                height={"50%"}
                width={-shadowRadius * MULTIPLICATING_SHADOW}
                x="50%"
                y="50%"
                transform={`translate(${INNERALIZING_OF_SHADOW * shadowRadius}, ${INNERALIZING_OF_SHADOW * shadowRadius + borderTopLeftRadius})`}
              />
              <Rect
                fill="url(#grad-top)"
                width={"50%"}
                height={-shadowRadius * MULTIPLICATING_SHADOW}
                y="50%"
                x="50%"
                transform={`translate(${INNERALIZING_OF_SHADOW * shadowRadius + borderTopLeftRadius}, ${INNERALIZING_OF_SHADOW * shadowRadius})`}

              />
              <Rect
                fill="url(#grad-top-left)"
                width={shadowRadius * MULTIPLICATING_SHADOW + borderTopLeftRadius}
                height={shadowRadius * MULTIPLICATING_SHADOW + borderTopLeftRadius}
                y="50%"
                x="50%"
                transform={`translate(-${(MULTIPLICATING_SHADOW - INNERALIZING_OF_SHADOW) * shadowRadius}, -${(MULTIPLICATING_SHADOW - INNERALIZING_OF_SHADOW) * shadowRadius})`}
              />
              <Rect
                fill={shadowColor}
                width="50%"
                height="50%"
                y="50%"
                x={"50%"}
                transform={`translate(${(INNERALIZING_OF_SHADOW) * shadowRadius + borderTopLeftRadius}, ${INNERALIZING_OF_SHADOW * shadowRadius + borderTopLeftRadius})`}
              />
              <Rect
                fill={shadowColor}
                width={borderTopLeftRadius}
                height="50%"
                y="50%"
                x="50%"
                transform={`translate(${(INNERALIZING_OF_SHADOW) * shadowRadius}, ${INNERALIZING_OF_SHADOW * shadowRadius + borderTopLeftRadius})`}
              />
              <Rect
                fill={shadowColor}
                width="50%"
                height={borderTopLeftRadius}
                y="50%"
                x="50%"
                transform={`translate(${(INNERALIZING_OF_SHADOW) * shadowRadius + borderTopLeftRadius}, ${INNERALIZING_OF_SHADOW * shadowRadius })`}
              />
              <Circle cx="50%" cy="50%" r={borderTopLeftRadius} fill={shadowColor} transform={`translate(${INNERALIZING_OF_SHADOW * shadowRadius + borderTopLeftRadius}, ${INNERALIZING_OF_SHADOW * shadowRadius + borderTopLeftRadius})`} />
            </Svg>
          </View>
          <View style={{ width: '50%', height: '50%', top: 0, right: 0, backgroundColor: 'transparent', position: 'absolute' }}>
            <Svg width="100%" height="100%" >
              <Defs>
                {linearGradFactory({ id: "grad-top", y2: 1  }, shadowOpacity, shadowColor)}
                {linearGradFactory({ id: "grad-right", x1: 1  }, shadowOpacity, shadowColor)}
                {radialGradFactory({ id:"grad-top-right", y: "50%", x: "50%", transform:`translate(0, ${MULTIPLICATING_SHADOW * shadowRadius + borderTopRightRadius})`}, shadowOpacity, shadowColor, shadowRadius * MULTIPLICATING_SHADOW, borderTopRightRadius)}
              </Defs>
              <Rect
                fill="url(#grad-right)"
                height={"50%"}
                width={shadowRadius * MULTIPLICATING_SHADOW}
                x="50%"
                y="50%"
                transform={`translate(${-INNERALIZING_OF_SHADOW * shadowRadius}, ${INNERALIZING_OF_SHADOW * shadowRadius + borderTopRightRadius})`}
              />
              <Rect
                fill="url(#grad-top)"
                width={"50%"}
                height={shadowRadius * MULTIPLICATING_SHADOW}
                y="50%"
                x="0%"
                transform={`translate(${-INNERALIZING_OF_SHADOW * shadowRadius - borderTopRightRadius}, ${(INNERALIZING_OF_SHADOW - MULTIPLICATING_SHADOW) * shadowRadius})`}

              />
              <Rect
                fill="url(#grad-top-right)"
                width={shadowRadius * MULTIPLICATING_SHADOW + borderTopRightRadius}
                height={shadowRadius * MULTIPLICATING_SHADOW + borderTopRightRadius}
                y="50%"
                x="50%"
                transform={`translate(${(-INNERALIZING_OF_SHADOW) * shadowRadius - borderTopRightRadius}, ${-(MULTIPLICATING_SHADOW - INNERALIZING_OF_SHADOW) * shadowRadius})`}
              />
              <Rect
                fill={shadowColor}
                width="50%"
                height="50%"
                y="50%"
                x={"0%"}
                transform={`translate(${(-INNERALIZING_OF_SHADOW) * shadowRadius - borderTopRightRadius}, ${INNERALIZING_OF_SHADOW * shadowRadius + borderTopRightRadius})`}
              />
              <Rect
                fill={shadowColor}
                width={borderTopRightRadius}
                height="50%"
                y="50%"
                x={"50%"}
                transform={`translate(${(-INNERALIZING_OF_SHADOW) * shadowRadius - borderTopRightRadius}, ${INNERALIZING_OF_SHADOW * shadowRadius + borderTopRightRadius})`}
              />
              <Rect
                fill={shadowColor}
                width="50%"
                height={borderTopRightRadius}
                y="50%"
                x={"0%"}
                transform={`translate(${(-INNERALIZING_OF_SHADOW) * shadowRadius - borderTopRightRadius}, ${INNERALIZING_OF_SHADOW * shadowRadius})`}
              />
              <Circle cx="50%" cy="50%" r={borderTopRightRadius} fill={shadowColor} transform={`translate(${- INNERALIZING_OF_SHADOW * shadowRadius - borderTopRightRadius}, ${INNERALIZING_OF_SHADOW * shadowRadius + borderTopRightRadius})`} />

            </Svg>
          </View>
          <View style={{ width: '50%', height: '50%', bottom: 0, left: 0, backgroundColor: 'transparent', position: 'absolute' }}>
            <Svg width="100%" height="100%" >
              <Defs>
                {linearGradFactory({ id: "grad-bottom", y1: 1  }, shadowOpacity, shadowColor)}
                {linearGradFactory({ id: "grad-left", x2: 1  }, shadowOpacity, shadowColor)}
                {radialGradFactory({ id:"grad-bottom-left", y: "50%", x: "50%", transform:`translate(${MULTIPLICATING_SHADOW * shadowRadius + borderBottomLeftRadius}, 0)`}, shadowOpacity, shadowColor, shadowRadius * MULTIPLICATING_SHADOW, borderBottomLeftRadius)}
              </Defs>
              <Rect
                fill="url(#grad-left)"
                height={"50%"}
                width={-shadowRadius * MULTIPLICATING_SHADOW}
                x="50%"
                y="0%"
                transform={`translate(${INNERALIZING_OF_SHADOW * shadowRadius}, ${-INNERALIZING_OF_SHADOW * shadowRadius - borderBottomLeftRadius})`}
              />

              <Rect
                fill="url(#grad-bottom)"
                width={"50%"}
                height={shadowRadius * MULTIPLICATING_SHADOW}
                y="50%"
                x="50%"
                transform={`translate(${INNERALIZING_OF_SHADOW * shadowRadius + borderBottomLeftRadius}, ${-INNERALIZING_OF_SHADOW * shadowRadius})`}
              />
              <Rect
                fill="url(#grad-bottom-left)"
                width={shadowRadius * MULTIPLICATING_SHADOW + borderBottomLeftRadius}
                height={shadowRadius * MULTIPLICATING_SHADOW + borderBottomLeftRadius}
                y="50%"
                x="50%"
                transform={`translate(${-(MULTIPLICATING_SHADOW - INNERALIZING_OF_SHADOW) * shadowRadius}, ${-INNERALIZING_OF_SHADOW * shadowRadius - borderBottomLeftRadius})`}
              />
              <Rect
                fill={shadowColor}
                width="50%"
                height="50%"
                y="0%"
                x={"50%"}
                transform={`translate(${(INNERALIZING_OF_SHADOW) * shadowRadius + borderBottomLeftRadius}, ${-INNERALIZING_OF_SHADOW * shadowRadius - borderBottomLeftRadius})`}
              />
              <Rect
                fill={shadowColor}
                width={borderBottomLeftRadius}
                height="50%"
                y="0%"
                x={"50%"}
                transform={`translate(${(INNERALIZING_OF_SHADOW) * shadowRadius}, ${-INNERALIZING_OF_SHADOW * shadowRadius - borderBottomLeftRadius})`}
              />
              <Rect
                fill={shadowColor}
                height={borderBottomLeftRadius}
                width="50%"
                y="50%"
                x={"50%"}
                transform={`translate(${(INNERALIZING_OF_SHADOW) * shadowRadius + borderBottomLeftRadius}, ${-INNERALIZING_OF_SHADOW * shadowRadius - borderBottomLeftRadius})`}
              />
              <Circle cx="50%" cy="50%" r={borderBottomLeftRadius} fill={shadowColor} transform={`translate(${INNERALIZING_OF_SHADOW * shadowRadius + borderBottomLeftRadius}, ${-INNERALIZING_OF_SHADOW * shadowRadius - borderBottomLeftRadius})`} />

            </Svg>
          </View>
          <View style={{ width: '50%', height: '50%', bottom: 0, right: 0, backgroundColor: 'absolute', position: 'absolute' }}>
              <Svg width="100%" height="100%" >
                <Defs>
                  {linearGradFactory({ id: "grad-bottom", y1: 1  }, shadowOpacity, shadowColor)}
                  {linearGradFactory({ id: "grad-right", x1: 1  }, shadowOpacity, shadowColor)}
                  {radialGradFactory({ id:"grad-bottom-right", y: "50%", x: "50%" }, shadowOpacity, shadowColor, shadowRadius * MULTIPLICATING_SHADOW, borderBottomRightRadius)}
                </Defs>
                <Rect
                  fill="url(#grad-right)"
                  height={"50%"}
                  width={shadowRadius * MULTIPLICATING_SHADOW}
                  x="50%"
                  y="0%"
                  transform={`translate(${-INNERALIZING_OF_SHADOW * shadowRadius}, ${-INNERALIZING_OF_SHADOW * shadowRadius - borderBottomRightRadius})`}
                />
                <Rect
                  fill="url(#grad-bottom)"
                  width={"50%"}
                  height={shadowRadius * MULTIPLICATING_SHADOW}
                  y="50%"
                  x={"0%"}
                  transform={`translate(${-INNERALIZING_OF_SHADOW * shadowRadius - borderBottomRightRadius}, ${-INNERALIZING_OF_SHADOW * shadowRadius})`}

                />
                <Rect
                  fill="url(#grad-bottom-right)"
                  width={shadowRadius * MULTIPLICATING_SHADOW + borderBottomRightRadius}
                  height={shadowRadius * MULTIPLICATING_SHADOW + borderBottomRightRadius}
                  y="50%"
                  x={"50%"}
                  transform={`translate(${-INNERALIZING_OF_SHADOW * shadowRadius - borderBottomRightRadius}, ${-INNERALIZING_OF_SHADOW * shadowRadius - borderBottomRightRadius})`}
                />
                <Rect
                  fill={shadowColor}
                  width="50%"
                  height="50%"
                  y="0%"
                  x={"0%"}
                  transform={`translate(${(-INNERALIZING_OF_SHADOW) * shadowRadius - borderBottomRightRadius}, ${-INNERALIZING_OF_SHADOW * shadowRadius - borderBottomRightRadius})`}
                />
                <Rect
                  fill={shadowColor}
                  width={borderBottomRightRadius}
                  height="50%"
                  y="0%"
                  x={"50%"}
                  transform={`translate(${- INNERALIZING_OF_SHADOW * shadowRadius - borderBottomRightRadius}, ${- INNERALIZING_OF_SHADOW * shadowRadius - borderBottomRightRadius})`}
                />
                <Rect
                  fill={shadowColor}
                  width="50%"
                  height={borderBottomRightRadius}
                  y="50%"
                  x={"0%"}
                  transform={`translate(${- INNERALIZING_OF_SHADOW * shadowRadius - borderBottomRightRadius}, ${- INNERALIZING_OF_SHADOW * shadowRadius - borderBottomRightRadius})`}
                />
                <Circle cx="50%" cy="50%" r={borderBottomRightRadius} fill={shadowColor} transform={`translate(${- INNERALIZING_OF_SHADOW * shadowRadius - borderBottomRightRadius}, ${- INNERALIZING_OF_SHADOW * shadowRadius - borderBottomRightRadius})`} />
              </Svg>
          </View>
        </View>
        <View style={[innerProps, { width: '100%', height: '100%', position: 'absolute' }]}/>

        {props.children}
    </View>)

}


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

          <ShadowView
            style={{
              margin: 50,
              backgroundColor: 'transparent',
              shadowColor: "#000",
              shadowOffset: {
                width: 10,
                height: 0,
              },
              shadowOpacity: 0.5,
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
              shadowOffset: {
                width: 10,
                height: 0,
              },
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
