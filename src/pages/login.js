import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
} from 'react-native';
import Page from '../components/basePage';
import {getWidth, getHeight} from '../constants/dynamicSize';
import BaseButton from '../components/baseButton';
import BaseInput from '../components/baseInput';
import NavButton from '../components/navButton';
import navigationService from '../navigation/navigationService';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const LOGO_IMAGE = require('../assets/images/logo.png');

export default class Login extends Component {
    
    loginClick = () => {
    }    

    goBack = () => {
      navigationService.pop();
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
                    <BaseInput 
                      desc={'Email Address'}
                      wrapperStyle={{marginBottom: getHeight(30), paddingLeft: getWidth(47), paddingRight: getWidth(47)}}
                    />
                    <BaseInput 
                      desc={'Password'}
                      pwdType={true}
                      wrapperStyle={{paddingLeft: getWidth(47), paddingRight: getWidth(47)}}
                    />
                    <BaseButton 
                        text={'LOGIN'}
                        onClick={this.loginClick}
                        buttonStyle={{position: 'absolute', bottom: getHeight(54)}}
                    />
                </KeyboardAwareScrollView>
            </Page>
        )
    }
}

Login.navigatorStyle = {
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
      alignItems: 'center',
    },
    logoImage: {
        width: getWidth(291),
        height: getHeight(151),
        marginBottom: getHeight(23)
    }
})