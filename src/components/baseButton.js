import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {PURPLE_MAIN} from '../constants/colors';
import PropTypes from 'prop-types';
import {getHeight, getWidth} from '../constants/dynamicSize';

const wrapperDefault = {
  width: getWidth(270),
  height: getHeight(50),
  borderRadius: getWidth(5),
  backgroundColor: '#FFFFFF',
  justifyContent: 'center',
  alignItems: 'center'
};

const textDefault = {
  color: PURPLE_MAIN,
  fontFamily: 'Montserrat-Medium',
  fontSize: getHeight(18)
};

const ComonButton = ({text, onClick, buttonStyle, textStyle}) => {
  return (
    <TouchableOpacity
      style={{...wrapperDefault, ...buttonStyle}}
      onPress={onClick}
    >
      <Text style={{...textDefault, ...textStyle}}>{text}</Text>
    </TouchableOpacity>
  )
};

ComonButton.defaultProps = {
  text: '',
  onClick: null,
  buttonStyle: {},
  textStyle: {}
};

ComonButton.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  buttonStyle: PropTypes.object,
  textStyle: PropTypes.object
};

export default ComonButton;