import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
    Image,
    TouchableOpacity,
    Dimensions,
    Platform
} from 'react-native';
import Page from '../components/basePage';
import MenuPage from '../components/menuPage';
import {getWidth, getHeight} from '../constants/dynamicSize';
import BaseButton from '../components/baseButton';
import MenuButton from '../components/menuButton';
import Chat from '../components/icons/chat';
import Hat from '../components/icons/hat';
import Star from '../components/icons/star';
import BStar from '../components/icons/bstar';
import Phone from '../components/icons/phone';
import navigationService from '../navigation/navigationService';
import pages from '../constants/pages';
import { BLACK_PRIMARY, GRAY_PRIMARY } from '../constants/colors';

const LOGO_IMAGE = require('../assets/images/logo.png');
const EXAMPLE_IMAGE = require('../assets/images/example.png');
const MARK_IMAGE = require('../assets/images/square-logo.png');
const SOLUTION_EXAMPLE = require('../assets/images/solution-example.png');

const SCREEN_HEIGHT = Dimensions.get('window').height > Dimensions.get('window').width ? Dimensions.get('window').height : Dimensions.get('window').width;

export default class SOLVESCREEN extends Component {

  constructor(props) {
    super(props);

    this.state={
      modalVisible: true
    }
  }
    
    learnClick = () => {
        navigationService.navigate(pages.LEARN_SUBJECT);
    }

    singupClick = () => {
        // navigationService.navigate(pages.SIGN_UP);
    }    

    _renderTitle = () => {
      return (
        <View style={{justifyContent: 'center', alignItems: 'center', width: '100%', position: 'absolute', top: getHeight(20)}}>
          <Text style={styles.titleText}>
            Abraham
          </Text>
          <Text style={styles.titleText}>
            (630)-772-1212
          </Text>
        </View>
      )
    }

    _renderRightItem = () => {
      return (
        <View style={{position: 'absolute', right: getWidth(16), top: getHeight(23)}}>
          <Text style={styles.titleText}>
            5:00
          </Text>
        </View>
      )
    }

    render () {
        return (
            <MenuPage 
              backgroundColor={'#FFFFFF'} menuBtnColor={BLACK_PRIMARY}
              renderTitle={this._renderTitle}
              renderRightItem={this._renderRightItem}
              >
                <Image
                    source={EXAMPLE_IMAGE}
                    style={styles.logoImage}
                    resizeMode={'contain'}
                />
                <View style={{width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  <Image source={SOLUTION_EXAMPLE} resizeMode={'contain'}/>
                </View>
                <View style={{width: '100%', height: getHeight(40), justifyContent: 'flex-end', alignItems: 'flex-end', paddingRight: getWidth(30)}}>
                  <Chat size={getHeight(30)} color={'#000000'} />
                </View>
                {
                  this.state.modalVisible == true ? 
                  <View style={styles.modalContainerView}>
                    <View style={styles.modalView}>
                      <View style={styles.modalMark}>
                        <Hat width={getWidth(86)} height={getHeight(84)} color={BLACK_PRIMARY} />  
                      </View>
                      <Image style={styles.modalLogoLeft} source={MARK_IMAGE} resizeMode={'contain'} />
                      <Image style={styles.modalLogoRight} source={MARK_IMAGE} resizeMode={'contain'} />
                      <View style={styles.modalTitleView}>
                        <Text style={styles.modalTitle}>Rate Your Student</Text>
                      </View>
                      <View style={styles.starView}>
                        <BStar width={getWidth(28)} height={getHeight(27)} color={'#FFFFFF'} stroke={BLACK_PRIMARY} />
                        <BStar width={getWidth(28)} height={getHeight(27)} color={'#FFFFFF'} stroke={BLACK_PRIMARY} />
                        <BStar width={getWidth(28)} height={getHeight(27)} color={'#FFFFFF'} stroke={BLACK_PRIMARY} />
                        <BStar width={getWidth(28)} height={getHeight(27)} color={'#FFFFFF'} stroke={BLACK_PRIMARY} />
                      </View>
                      
                      <View style={styles.modalTimeView}>
                        <Text style={styles.modalTime}>
                          $3.30
                        </Text>
                      </View>
                      <View style={{flex: 1}}>
                        
                      </View>
                      <View style={styles.modalBtnView}>
                        <TouchableOpacity style={styles.modalBtn}>
                          <Text style={styles.modalBtnText}>
                            Home
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  : null
                }  
            </MenuPage>
        )
    }
}

SOLVESCREEN.navigatorStyle = {
    navBarHidden: true,
    statusBarBlur: false
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    logoImage: {
        width: getWidth(291),
        height: getHeight(151),
        marginBottom: getHeight(23),
        
    },
    titleText:{
      fontFamily: 'Montserrat-Regular',
      fontSize: getHeight(16),
      color: BLACK_PRIMARY
    },
    modalView:{
      backgroundColor: '#FFFFFF',
      width: getWidth(244),
      height: getHeight(262),
      borderRadius: getHeight(10),
      justifyContent: 'flex-start',
      alignItems: 'center'
    },
    modalLogoLeft:{
      width: getWidth(80),
      height: getHeight(67),
      position: 'absolute',
      top: 0,
      left: 0
    },
    modalLogoRight:{
      width: getWidth(80),
      height: getHeight(67),
      position: 'absolute',
      top: 0,
      right: 0
    },
    starView:{
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: getHeight(5)
    },
    btnView:{
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      height: getHeight(120)
    },
    modalMark: {
      marginTop: -getHeight(41),
    },
    modalTitleView:{
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      height: getHeight(36)
    },
    modalTitle: {
      fontFamily: 'Montserrat-Regular',
      fontSize: getHeight(20),
      color: BLACK_PRIMARY
    },
    phoneNum: {
      fontFamily: 'Montserrat-Regular',
      fontSize: getHeight(18),
      color: BLACK_PRIMARY,
      marginLeft: getWidth(12)
    },
    modalTimeView: {
      width: '100%',
      marginTop: getHeight(9),
      justifyContent: 'center',
      alignItems: 'center'
    },
    modalTime: {
      fontFamily: 'Montserrat-Regular',
      fontSize: getHeight(18),
      color: BLACK_PRIMARY
    },
    modalBtnView: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center'
    },
    modalBtn: {
      width: getWidth(220),
      height: getHeight(36),
      backgroundColor: GRAY_PRIMARY,
      borderRadius: getHeight(10),
      justifyContent: 'center',
      alignItems: 'center'
    },
    modalBtnText: {
      fontFamily: 'Montserrat-Regular',
      fontSize: getHeight(18),
      color: '#FFFFFF'
    },
    modalContainerView:{
      flex: 1, 
      width: '100%',
      height: SCREEN_HEIGHT - getHeight(100),
      justifyContent: 'center', 
      alignItems: 'center', 
      backgroundColor: 'rgba(0,0,0,0.4)',
      position: 'absolute',
      top: 0, 
      left: 0,
      marginTop: getHeight(70)
    }
})