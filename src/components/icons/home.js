import React from 'react'
import Svg, { Path, Defs, G, Use, Mask } from 'react-native-svg'

export default function (props) {
  return (
    <Svg width={props.size} height={props.size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path d="M8.33342 16.6667V11.6667H11.6667V16.6667H15.8334V10H18.3334L10.0001 2.5L1.66675 10H4.16675V16.6667H8.33342Z" fill={props.color}/>
    </Svg>
  )
}