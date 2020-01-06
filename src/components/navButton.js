import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {getHeight, getWidth} from '../constants/dynamicSize';
import Back from '../components/icons/back';

const wrapperDefault = {
  width: getWidth(36),
  height: getHeight(36),
  justifyContent: 'center',
  alignItems: 'center'
};

const NavButton = ({onClick, buttonStyle}) => {
  return (
    <TouchableOpacity
      style={{...wrapperDefault, ...buttonStyle}}
      onPress={onClick}
    >
      <Back size={getHeight(20)} color={'#FFFFFF'} />
    </TouchableOpacity>
  )
};

NavButton.defaultProps = {
  iconName: 'md-arrow-back',
  onClick: null,
  buttonStyle: {},
  iconStyle: {}
};

NavButton.propTypes = {
  iconName: PropTypes.string,
  onClick: PropTypes.func,
  buttonStyle: PropTypes.object,
  iconStyle: PropTypes.object
};

export default NavButton;