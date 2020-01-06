import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import {PURPLE_MAIN, BLACK_PRIMARY} from '../constants/colors';
import PropTypes from 'prop-types';
import {getHeight, getWidth} from '../constants/dynamicSize';

const wrapperDefault = {
  width: '100%',
  height: getHeight(40),
  flexDirection: 'row',
  borderBottomColor: BLACK_PRIMARY,
  borderBottomWidth: 1,
  backgroundColor: PURPLE_MAIN,
  justifyContent: 'center',
  alignItems: 'center'
};

const textDefault = {
  color: '#FFFFFF',
  flex: 1,
  fontFamily: 'Montserrat-Regular',
  fontSize: getHeight(16)
};

const iconViewDefault = {
  width: getWidth(52),
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center'
}

const CommonMenu = ({text, onClick, wrapperStyle, textStyle, icon, iconViewStyle}) => {
  return (
    <TouchableOpacity
      style={{...wrapperDefault, ...wrapperStyle}}
      onPress={onClick}
    >
      <View
        style={{...iconViewDefault, ...iconViewStyle}}
      >
        {icon}
      </View>
      <Text style={{...textDefault, ...textStyle}}>{text}</Text>
    </TouchableOpacity>
  )
};

CommonMenu.defaultProps = {
  text: '',
  onClick: null,
  wrapperStyle: {},
  textStyle: {},
  icon: null,
  iconViewStyle: {}
};

CommonMenu.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  wrapperStyle: PropTypes.object,
  textStyle: PropTypes.object,
  icon: PropTypes.element,
  iconViewStyle: PropTypes.object
};

export default CommonMenu;