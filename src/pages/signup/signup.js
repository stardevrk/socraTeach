import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
} from 'react-native';
import Page from '../../components/basePage';
import {getWidth, getHeight} from '../../constants/dynamicSize';
import BaseButton from '../../components/baseButton';
import BaseInput from '../../components/baseInput';
import NavButton from '../../components/navButton';
import navigationService from '../../navigation/navigationService';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import pages from '../../constants/pages';
import {validateEmail} from '../../service/utils';

const LOGO_IMAGE = require('../../assets/images/logo.png');

export default class Signup extends Component {

  constructor(props) {
    super(props);

    this.state ={
      userName: '',
      email: '',
      password: '',
      passwordConfirm: ''
    }
  }
    
    goForward = () => {
      navigationService.navigate(pages.PAY_TEACHING);
    }

    goBack = () => {
      navigationService.pop();
    }

    _changeFirstName = (text) => {
      this.setState({userName: text}); 
    }

    _changeEmail = (email) => {
      this.setState({email: email});
    }

    _changePassword = (password) => {
      this.setState({password: password});
    }

    _changePasswordConfirm = (password) => {
      this.setState({passwordConfirm: password});
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
                      desc={'First Name'}
                      wrapperStyle={{marginBottom: getHeight(30)}}
                      onChangeText={this._changeFirstName}
                    />
                    <BaseInput 
                      desc={'Email Address'}
                      wrapperStyle={{marginBottom: getHeight(30)}}
                      onChangeText={this._changeEmail}
                    />
                    <BaseInput 
                      desc={'Country'}
                      wrapperStyle={{marginBottom: getHeight(30)}}
                      onChangeText={this._changePassword}
                    />
                    <BaseInput 
                      desc={'Password'}
                      pwdType={true}
                      wrapperStyle={{marginBottom: getHeight(30)}}
                      onChangeText={this._changePasswordConfirm}
                    />
                    <BaseInput 
                      desc={'Confirm Password'}
                      pwdType={true}
                      wrapperStyle={{marginBottom: getHeight(64)}}
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

Signup.navigatorStyle = {
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
        marginBottom: getHeight(23),
    }
})