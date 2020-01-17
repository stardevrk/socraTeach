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
import {connect} from 'react-redux';
import {signupUserInfo} from '../../model/actions/signupAC';

const LOGO_IMAGE = require('../../assets/images/logo.png');

class Signup extends Component {

  constructor(props) {
    super(props);

    this.state ={
      userName: '',
      email: '',
      password: '',
      passwordConfirm: '',
      errorEmail: false,
      passwordDismatch: false,
      country: '',
      emptyName: false,
      emptyEmail: false,
      emptyCountry: false,
      emptyPassword: false,
      emptyPasswordConfirm: false
    }
  }
    
    goForward = () => {
      if (this.state.userName == '') {
        this.setState({emptyName: true});
        return;
      }
      if (this.state.email == '') {
        this.setState({emptyEmail: true});
        return;
      }
      if (this.state.country == '') {
        this.setState({emptyCountry: true});
        return;
      }
      if (this.state.password == '') {
        this.setState({emptyPassword: true});
        return;
      }
      if (this.state.passwordConfirm == '') {
        this.setState({emptyPasswordConfirm: true});
        return;
      }
      const {dispatch} = this.props;
      dispatch(signupUserInfo({
        userName: this.state.userName,
        email: this.state.email,
        country: this.state.country,
        password: this.state.password
      }));
      navigationService.navigate(pages.PAY_TEACHING);
    }

    goBack = () => {
      navigationService.pop();
    }

    _changeFirstName = (text) => {
      
      if (text != '') {
        this.setState({emptyName: false});
      }
      
      this.setState({userName: text}); 
    }

    _changeEmail = (email) => {
      this.setState({email: email});
      
      if (email != '') {
        this.setState({emptyEmail: false});
      }

      if (!validateEmail(email)) {
        this.setState({errorEmail: true});
      } else {
        this.setState({errorEmail: false});
      }
    }

    _changeCountry = (country) => {
      if (country != '') {
        this.setState({emptyCountry: false});
      }
      this.setState({country: country});
    }

    _changePassword = (password) => {
      if (password != '') {
        this.setState({emptyPassword: false});
      }
      this.setState({password: password});
      if (this.state.passwordConfirm != '' && this.state.passwordConfirm != password) {
        this.setState({passwordDismatch: true});
      } 
      if (this.state.passwordConfirm != '' && this.state.passwordConfirm == password) {
        this.setState({passwordDismatch: false});
      }
    }

    _changePasswordConfirm = (password) => {
      this.setState({passwordConfirm: password});
      if (password != '') {
        this.setState({emptyPasswordConfirm: false});
      }
      if (this.state.password != password) {
        this.setState({passwordDismatch: true})
      } else {
        this.setState({passwordDismatch: false})
      }
      
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
                      errorExist={this.state.emptyName}
                      errorText={'Required!'}
                    />
                    <BaseInput 
                      desc={'Email Address'}
                      wrapperStyle={{marginBottom: getHeight(30)}}
                      onChangeText={this._changeEmail}
                      errorExist={this.state.errorEmail || this.state.emptyEmail}
                      errorText={this.state.emptyEmail == true ? 'Required!' : 'Invalid Email!'}
                    />
                    <BaseInput 
                      desc={'Country'}
                      wrapperStyle={{marginBottom: getHeight(30)}}
                      onChangeText={this._changeCountry}
                      errorExist={this.state.emptyCountry}
                      errorText={'Required!'}
                    />
                    <BaseInput 
                      desc={'Password'}
                      pwdType={true}
                      wrapperStyle={{marginBottom: getHeight(30)}}
                      onChangeText={this._changePassword}
                      errorExist={this.state.passwordDismatch || this.state.emptyPassword}
                      errorText={this.state.emptyPassword == true ? 'Required!' : 'Password Dismatch!'}
                    />
                    <BaseInput 
                      desc={'Confirm Password'}
                      pwdType={true}
                      wrapperStyle={{marginBottom: getHeight(64)}}
                      onChangeText={this._changePasswordConfirm}
                      errorExist={this.state.emptyPasswordConfirm}
                      errorText={'Required!'}
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

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps)(Signup);