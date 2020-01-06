import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    View,
    Text
} from 'react-native';
import Page from '../../components/basePage';
import {getWidth, getHeight} from '../../constants/dynamicSize';
import BaseButton from '../../components/baseButton';
import NavButton from '../../components/navButton';
import ProfileOption from '../../components/profileOption';
import ProfileNote2 from '../../components/profileNote2';
import navigationService from '../../navigation/navigationService';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {PURPLE_SECOND} from '../../constants/colors';
import pages from '../../constants/pages';

const LOGO_IMAGE = require('../../assets/images/logo.png');

export default class PayLearning extends Component {
    
    goForward = () => {
      navigationService.navigate(pages.PAYMENT);
    }

    goBack = () => {
      navigationService.pop();
    }

    goSkip = () => {
      navigationService.navigate(pages.PAYMENT);
    }

    checkSecond = () => {

    }

    render () {
        return (
            <Page>
                <KeyboardAwareScrollView style={styles.container} contentContainerStyle={styles.wrapper}>
                    <NavButton 
                      iconName={'md-arrow-back'} 
                      buttonStyle={{position: 'absolute', left: getWidth(16), top: getHeight(15)}}
                      onClick={this.goBack}
                    />
                    <Image
                        source={LOGO_IMAGE}
                        style={styles.logoImage}
                        resizeMode={'contain'}
                    />
                    <Text
                      style={styles.primaryDesc} 
                    >
                      Payment for Learning
                    </Text>
                    <Text
                      style={styles.secondaryDesc} 
                    >
                      Select
                    </Text>
                    <View
                      style={styles.optionContainer}
                    >
                      <ProfileOption 
                        text={'Paypal'}
                        checked={true}
                        onClick={this.checkFirst}
                      />
                      <ProfileOption 
                        text={'Credit Card'}
                        checked={false}
                        onClick={this.checkSecond}
                      />
                    </View>
                    <ProfileNote2
                      text1={'Use your teaching earnings'}
                      text2={'for learning sessions!'}
                      customStyle={{marginBottom: getHeight(19)}}
                    />
                    <ProfileNote2
                      text1={'Skip this section for teaching only!'}
                      text2={'You can decide to learn later!'}
                      customStyle={{marginBottom: getHeight(43)}}
                    />
                    
                    
                    <BaseButton 
                        text={'SKIP'}
                        onClick={this.goSkip}
                        buttonStyle={{marginBottom: getHeight(22)}}
                    />
                    <BaseButton 
                        text={'CONTINUE'}
                        onClick={this.goForward}
                    />
                </KeyboardAwareScrollView>
            </Page>
        )
    }
}

PayLearning.navigatorStyle = {
    navBarHidden: false,
    statusBarBlur: false
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    wrapper: {
      flex: 1,
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center'
    },
    logoImage: {
      width: getWidth(291),
      height: getHeight(151),
      marginBottom: getHeight(16),
    },
    primaryDesc: {
      fontFamily: 'Montserrat-Bold',
      fontSize: getHeight(24),
      color: '#FFFFFF',
      marginBottom: getHeight(38)
    },
    secondaryDesc: {
      fontFamily: 'Montserrat-Bold',
      fontSize: getHeight(18),
      color: '#FFFFFF',
      width: '100%',
      paddingLeft: getWidth(32),
      marginBottom: getHeight(10)
    },
    optionContainer: {
      width: getWidth(346),
      height: getHeight(124),
      backgroundColor: PURPLE_SECOND,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 7,
      },
      shadowOpacity: 0.41,
      shadowRadius: 9.11,
      elevation: 14,
      borderRadius: getHeight(10),
      justifyContent: 'space-evenly',
      alignItems: 'center',
      marginBottom: getHeight(20.57)
    }
})