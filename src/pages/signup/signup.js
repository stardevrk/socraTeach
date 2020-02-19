import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    TouchableOpacity,
    View
} from 'react-native';
import Page from '../../components/basePage';
import {getWidth, getHeight} from '../../constants/dynamicSize';
import BaseButton from '../../components/baseButton';
import BaseInput from '../../components/baseInput';
import AuthInput from '../../components/authInput';
import NavButton from '../../components/navButton';
import navigationService from '../../navigation/navigationService';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import pages from '../../constants/pages';
import {validateEmail, validatePhoneNumber} from '../../service/utils';
import {connect} from 'react-redux';
import {signupUserInfo} from '../../model/actions/signupAC';
import { BLACK_PRIMARY } from '../../constants/colors';

const LOGO_IMAGE = require('../../assets/images/logo.png');
const BACK_BUTTON = require('../../assets/images/back-button.png');
const FORWARD_BUTTON = require('../../assets/images/forward-button.png');

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
      phoneNumber: '',
      emptyPhoneNumber: false,
      errorPhoneNumber: false,
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

      if (this.state.phoneNumber == '') {
        this.setState({emptyPhoneNumber: true});
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
        phoneNumber: this.state.phoneNumber,
        password: this.state.password
      }));
      navigationService.navigate(pages.PAYMENT);
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

    _changePhoneNumber = (number) => {
      this.setState({phoneNumber: number});
      if (number != '') {
        this.setState({emptyPhoneNumber: false});
      }

      // if (!validatePhoneNumber(number)) {
      //   this.setState({errorPhoneNumber: true});
      // } else {
      //   this.setState({errorPhoneNumber: false});
      // }

    }

    render () {
        return (
            <Page backgroundColor={BLACK_PRIMARY} forceInset={{top: 'never'}}>
                <KeyboardAwareScrollView style={styles.container} contentContainerStyle={styles.wrapper}>
                  <TouchableOpacity style={styles.backBtnView} onPress={this.goBack}>
                      <Image style={styles.backBtnImage} resizeMode={'contain'} source={BACK_BUTTON}/>
                  </TouchableOpacity>
                  
                  <AuthInput 
                      desc={'Full Name'}
                      
                      wrapperStyle={{marginBottom: getHeight(27)}}
                      descStyle={{marginBottom: getHeight(25)}}
                      onChangeText={this._changeFirstName}
                      errorExist={this.state.emptyName}
                      errorText={'Required!'}
                  />
                  <AuthInput 
                      desc={'Phone Number'}
                      
                      wrapperStyle={{marginBottom: getHeight(27)}}
                      descStyle={{marginBottom: getHeight(25)}}
                      onChangeText={this._changePhoneNumber}
                      errorExist={this.state.emptyPhoneNumber}
                      errorText={'Required!'}
                  />
                  <AuthInput 
                      desc={'Password'}
                      pwdType={true}
                      wrapperStyle={{marginBottom: getHeight(27)}}
                      descStyle={{marginBottom: getHeight(25)}}
                      onChangeText={this._changePassword}
                      errorExist={this.state.emptyPassword || this.state.passwordDismatch}
                      errorText={this.state.passwordDismatch == true ? 'Password Mismatch!' : 'Required!'}
                  />
                  <AuthInput 
                      desc={'Confirm'}
                      pwdType={true}
                      wrapperStyle={{marginBottom: getHeight(62)}}
                      descStyle={{marginBottom: getHeight(25)}}
                      onChangeText={this._changePasswordConfirm}
                      errorExist={this.state.emptyPasswordConfirm}
                      errorText={'Required!'}
                  />
                  <View style={styles.forwardBtnView}>
                      <TouchableOpacity style={styles.forwardBtn} onPress={this.goForward}>
                          <Image style={styles.backBtnImage} resizeMode={'contain'} source={FORWARD_BUTTON}/>
                      </TouchableOpacity>
                  </View>
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
    
  },
  logoImage: {
      width: getWidth(291),
      height: getHeight(151),
      marginBottom: getHeight(23),
  },
  backBtnView: {
    marginTop: getHeight(48),
    marginLeft: getWidth(32),
    marginBottom: getHeight(24)
  },
  backBtnImage: {
      width: getHeight(48),
      height: getHeight(48)
  },
  forwardBtnView: {
      width: '100%', 
      alignItems: 'flex-end',
  },
  forwardBtn: {
      marginRight: getWidth(32),
  }
})

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps)(Signup);