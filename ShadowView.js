/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Platform, StyleSheet, View,} from 'react-native';
import {Circle, Defs, LinearGradient, RadialGradient, Rect, Stop, Svg} from 'react-native-svg'

const P = (ios, android) => Platform.OS === 'ios' ? ios : (android || ios)

const forLRBT = (s) => {
  return {
    left: s,
    right: s,
    bottom: s,
    top: s,
  }
}

function linearGradFactory(args, color) {
  return (
    <LinearGradient x1="0" y1="0" x2="0" y2="0" {...args}>
      <Stop offset="0" stopColor={color} stopOpacity="0" />
      <Stop offset="1" stopColor={color} stopOpacity={1} />
    </LinearGradient>
  )
}


function radialGradFactory({ id, x, y, transform }, color, shadowRadius, borderRadius = 0) {
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

const INNERALIZING_OF_SHADOW = P(1.3, 1.4)
const MULTIPLICATING_SHADOW = P(2.4, 2.3)
const MIN_RADIUS = P(2, 2)
const EPSILON = P(0, 0.04)

function ShadowView (props) {
  const fstyle = StyleSheet.flatten(props.style);
  const { shadowColor, shadowOpacity = 1, shadowRadius, shadowOffset = { }, ...restStyle } = fstyle;
  const { width = 0, height = 0 } = shadowOffset
  const [outerProps, innerProps] = splitPositionalStyleProps(restStyle)
  const {
    borderRadius = 0,
  } = innerProps;
  const {
    borderTopRightRadius: rawBorderTopRightRadius = borderRadius,
    borderTopLeftRadius: rawBorderTopLeftRadius = borderRadius,
    borderBottomRightRadius: rawBorderBottomRightRadius = borderRadius,
    borderBottomLeftRadius: rawBorderBottomLeftRadius = borderRadius
  }= innerProps;

  const borderTopRightRadius = Math.max(rawBorderTopRightRadius - shadowRadius, MIN_RADIUS)
  const borderTopLeftRadius = Math.max(rawBorderTopLeftRadius - shadowRadius, MIN_RADIUS)
  const borderBottomRightRadius = Math.max(rawBorderBottomRightRadius - shadowRadius, MIN_RADIUS)
  const borderBottomLeftRadius = Math.max(rawBorderBottomLeftRadius - shadowRadius, MIN_RADIUS)


  return (
    <View {...props} style={[outerProps, { backgroundColor: 'transparent' }]}>
      <View style={{ width: 10, height: 10, bottom: -10, right: -10, position: 'absolute' }} />
      <View style={{ width: 10, height: 10, bottom: -10, left: -10, position: 'absolute' }} />
      <View style={{ ...forLRBT('-50%'), position: 'absolute', justifyContent: 'center', opacity: 1, transform:[{ translateX: width }, { translateY: height }] }}>
        <View style={{ width: `${50 + EPSILON}%`, height: '50%', top: 0, left: 0, backgroundColor: 'transparent', position: 'absolute' }}>
          <Svg width="100%" height="100%" >
            <Defs>
              {linearGradFactory({ id: "grad-top", y2: 1  }, shadowColor)}
              {linearGradFactory({ id: "grad-left", x2: 1  }, shadowColor)}
              {radialGradFactory({ id:"grad-top-left", y: "50%", x: "50%", transform:`translate(${MULTIPLICATING_SHADOW * shadowRadius + borderTopLeftRadius}, ${MULTIPLICATING_SHADOW * shadowRadius + borderTopLeftRadius})`}, shadowColor, shadowRadius * MULTIPLICATING_SHADOW, borderTopLeftRadius)}
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
              {linearGradFactory({ id: "grad-top", y2: 1  }, shadowColor)}
              {linearGradFactory({ id: "grad-right", x1: 1  }, shadowColor)}
              {radialGradFactory({ id:"grad-top-right", y: "50%", x: "50%", transform:`translate(0, ${MULTIPLICATING_SHADOW * shadowRadius + borderTopRightRadius})`}, shadowColor, shadowRadius * MULTIPLICATING_SHADOW, borderTopRightRadius)}
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
        <View style={{ width: `${50 + EPSILON}%`, height: '50%', bottom: 0, left: 0, backgroundColor: 'transparent', position: 'absolute' }}>
          <Svg width="100%" height="100%" >
            <Defs>
              {linearGradFactory({ id: "grad-bottom", y1: 1  }, shadowColor)}
              {linearGradFactory({ id: "grad-left", x2: 1  }, shadowColor)}
              {radialGradFactory({ id:"grad-bottom-left", y: "50%", x: "50%", transform:`translate(${MULTIPLICATING_SHADOW * shadowRadius + borderBottomLeftRadius}, 0)`}, shadowColor, shadowRadius * MULTIPLICATING_SHADOW, borderBottomLeftRadius)}
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
              {linearGradFactory({ id: "grad-bottom", y1: 1  }, shadowColor)}
              {linearGradFactory({ id: "grad-right", x1: 1  }, shadowColor)}
              {radialGradFactory({ id:"grad-bottom-right", y: "50%", x: "50%" }, shadowColor, shadowRadius * MULTIPLICATING_SHADOW, borderBottomRightRadius)}
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
export default ShadowView;
