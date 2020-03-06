import React from 'react';
import {TextInput, Text, View, Platform} from 'react-native';
import {PURPLE_MAIN} from '../constants/colors';
import PropTypes from 'prop-types';
import {getHeight, getWidth} from '../constants/dynamicSize';

const wrapperDefault = {
  width: '100%',
  paddingLeft: getWidth(33),
  paddingRight: getWidth(36),
  justifyContent: 'center',
  alignItems: 'center'
};

const descDefault = {
  color: '#FFFFFF',
  fontFamily: 'Montserrat-Medium',
  fontSize: getHeight(25),
  width: '100%'
};

const textDefault = {
  color: 'white',
  fontFamily: 'Montserrat-Regular',
  fontSize: getHeight(20),
  width: '100%',
  height: getHeight(35),
  paddingVertical: 0
}

const errorDefault = {
  color: 'red',
  fontFamily: 'Montserrat-Medium',
  fontSize: getHeight(12),
  width: '100%',
  paddingLeft: getWidth(10),
}

const ComonInput = ({desc, onChangeText, wrapperStyle, descStyle, textStyle, pwdType, errorText, errorExist, errorStyle, placeholder, keyboardType, autoFocus, defaultValue}) => {
  return (
    <View
      style={{...wrapperDefault, ...wrapperStyle}}
    >
      <Text style={{...descDefault, ...descStyle}}>{desc}</Text>
      {
        pwdType == true ? 
        <TextInput style={{...textDefault, ...textStyle}} autoFocus={autoFocus} onChangeText={onChangeText} secureTextEntry={true} placeholder={placeholder} placeholderTextColor={'#d3d3d3'} keyboardType={keyboardType}></TextInput>
        :
        <TextInput style={{...textDefault, ...textStyle}} autoFocus={autoFocus} onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor={'#d3d3d3'} keyboardType={keyboardType} defaultValue={defaultValue}></TextInput>  
      }
      
      <View style={{width: '100%', backgroundColor: 'rgba(88, 86, 214, 0.76)', height: 2, paddingLeft: getWidth(1)}} />
      {
        errorExist == true ? 
        <Text style={{...errorDefault, ...errorStyle}}>{errorText}</Text>
        : null
      }
    </View>
  )
};

ComonInput.defaultProps = {
  desc: '',
  onChangeText: null,
  descStyle: {},
  textStyle: {},
  pwdType: false,
  wrapperStyle: {},
  errorExist: false,
  errorStyle: {},
  errorText: '',
  placeholder: '',
  keyboardType: 'default',
  autoFocus: false,
  defaultValue: ''
};

ComonInput.propTypes = {
  desc: PropTypes.string,
  onChangeText: PropTypes.func,
  descStyle: PropTypes.object,
  textStyle: PropTypes.object,
  pwdType: PropTypes.bool,
  wrapperStyle: PropTypes.object,
  errorText: PropTypes.bool,
  errorStyle: PropTypes.object,
  errorText: PropTypes.string,
  placeholder: PropTypes.string,
  keyboardType: PropTypes.string,
  autoFocus: PropTypes.bool,
  defaultValue: PropTypes.string
};

export default ComonInput;