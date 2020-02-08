import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StatusBar, View, StyleSheet, Text, Platform, TouchableOpacity, Image} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {getHeight, getWidth} from '../constants/dynamicSize';
import {PURPLE_MAIN, BLUE_PRIMARY} from '../constants/colors';
import navigationService from '../navigation/navigationService';
import Page from './basePage';
import NavMenuButton from '../components/navMenuButton';
import Notification from '../components/icons/notification';
import {isIphoneX} from '../service/utils';

const TOPBAR_LOGO = require('../assets/images/topbar-logo.png');

const containerDefault = {
  flex: 1,
  alignItems: 'center',
  width: '100%',
  paddingTop: isIphoneX ? getHeight(30) : 0,
}

const topViewDefault = {
  height: getHeight(150),
  borderRadius: getHeight(10),
  marginTop: -getHeight(50),
  backgroundColor: BLUE_PRIMARY,
  width: '100%'
}

const forceInsetDefault ={
  top: 'never'
}

export default class TopBarPage extends Component {

  toggleMenu = () => {
    navigationService.openDrawer();
  }

  render () {
    const {titleText, renderTitle, children, backgroundColor, menuBtnColor, customContainer, customeTopView, notiExist, forceInset, onRightClick} = this.props
    return (
      <Page forceInset={{...forceInsetDefault, ...forceInset}} backgroundColor={backgroundColor}>
        
        <View style={{...containerDefault, ...customContainer}}>
          <View style={{...topViewDefault, ...customeTopView}}>
            <View style={{position: 'absolute', bottom: getHeight(20), flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: getHeight(50), width: '100%'}}>
              <NavMenuButton buttonStyle={{marginLeft: getWidth(29)}}
                buttonColor={menuBtnColor}
                onClick={this.toggleMenu} 
              />
              {
                renderTitle ? 
                renderTitle() :
                <Text style={styles.headerTitle}>
                  {titleText}
                </Text>
              }
              <TouchableOpacity style={styles.rightBtn} onPress={onRightClick}>
                {
                  notiExist == true ? 
                  <View style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    <Image style={{width: getWidth(50), height: getHeight(37.68), position: 'absolute', left: 0, bottom: 0}} source={TOPBAR_LOGO} resizeMode={'contain'}/>
                    <View style={{position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, justifyContent: 'center', alignItems: 'center', paddingBottom: getHeight(35), paddingLeft: getWidth(35)}}>
                      <Notification size={getHeight(21)}/>
                    </View>
                  </View>
                  :
                  
                    <Image style={{width: getWidth(50), height: getHeight(37.68), position: 'absolute', left: 0, bottom: 0}} source={TOPBAR_LOGO} resizeMode={'contain'}/>
                  
                }
              </TouchableOpacity>
            </View>
          </View>
          
          {
            children
          }
        </View>
      </Page>
    )
  }
}

TopBarPage.defaultProps = {
  forceInset: {},
  customContainer: {},
  titleText: '',
  rightText: '',
  renderTitle: null,
  renderRightItem: null,
  children: null,
  backgroundColor: PURPLE_MAIN,
  menuBtnColor: '#FFFFFF',
  notiExist: false,
  onRightClick: null
};

TopBarPage.propTypes = {
  forceInset: PropTypes.object,
  customContainer: PropTypes.object,
  titleText: PropTypes.string,
  rightText: PropTypes.string,
  renderTitle: PropTypes.func,
  renderRightItem: PropTypes.func,
  children: PropTypes.element,
  backgroundColor: PropTypes.string,
  menuBtnColor: PropTypes.string,
  notiExist: PropTypes.bool,
  onRightClick: PropTypes.func
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingTop: getHeight(80)
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: getHeight(23),
    fontFamily: 'Montserrat-Bold',
    color: '#FFFFFF',
  },
  rightTitle: {
    position: 'absolute', 
    right: getWidth(16), 
    top: getHeight(15),
    fontFamily: 'Montserrat-Regular',
    color: '#FFFFFF',
    fontSize: getHeight(18)
  },
  rightBtn: {
    marginRight: getWidth(19),
    height: getHeight(38),
    width: getWidth(60),
    justifyContent: 'center',
    alignItems: 'center'
  }
});