import React from 'react';
import {TextInput, Text, View} from 'react-native';
import {PURPLE_MAIN} from '../constants/colors';
import PropTypes from 'prop-types';
import {getHeight, getWidth} from '../constants/dynamicSize';

const wrapperDefault = {
  width: '100%',
  paddingLeft: getWidth(35),
  paddingRight: getWidth(64),
  justifyContent: 'center',
  alignItems: 'center'
};

const descDefault = {
  color: '#FFFFFF',
  fontFamily: 'Montserrat-Medium',
  fontSize: getHeight(18),
  width: '100%',
  paddingLeft: getWidth(8)
};

const textDefault = {
  color: '#FFFFFF',
  fontFamily: 'Montserrat-Medium',
  fontSize: getHeight(10),
  width: '100%',
  paddingLeft: getWidth(10),
  height: getHeight(20)
}

const ComonInput = ({desc, onChange, wrapperStyle, descStyle, textStyle, pwdType}) => {
  return (
    <View
      style={{...wrapperDefault, ...wrapperStyle}}
    >
      <Text style={{...descDefault, ...descStyle}}>{desc}</Text>
      {
        pwdType == true ? 
        <TextInput style={{...textDefault, ...textStyle}} onChange={onChange} secureTextEntry={true}></TextInput>
        :
        <TextInput style={{...textDefault, ...textStyle}} onChange={onChange}></TextInput>  
      }
      
      <View style={{width: '100%', backgroundColor: '#FFFFFF', height: 2}} />
    </View>
  )
};

ComonInput.defaultProps = {
  desc: '',
  onChange: null,
  descStyle: {},
  textStyle: {},
  pwdType: false,
  wrapperStyle: {}
};

ComonInput.propTypes = {
  desc: PropTypes.string,
  onChange: PropTypes.func,
  descStyle: PropTypes.object,
  textStyle: PropTypes.object,
  pwdType: PropTypes.bool,
  wrapperStyle: PropTypes.object
};

export default ComonInput;