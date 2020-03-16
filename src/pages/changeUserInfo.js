import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    TouchableOpacity,
    View,
    ActivityIndicator
} from 'react-native';
import Page from '../components/basePage';
import {getWidth, getHeight} from '../constants/dynamicSize';
import BaseButton from '../components/baseButton';
import BaseInput from '../components/baseInput';
import AuthInput from '../components/authInput';
import navigationService from '../navigation/navigationService';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import pages from '../constants/pages';
import {validateEmail, validatePhoneNumber} from '../service/utils';
import {connect} from 'react-redux';
import {signupUserInfo} from '../model/actions/signupAC';
import { BLACK_PRIMARY } from '../constants/colors';
import {auth, firestore} from '../constants/firebase';
import {withMappedNavigationParams} from 'react-navigation-props-mapper';

const LOGO_IMAGE = require('../assets/images/logo.png');
const BACK_BUTTON = require('../assets/images/back-button.png');
const FORWARD_BUTTON = require('../assets/images/forward-button.png');

@withMappedNavigationParams()
class ChangeUserInfo extends Component {

  constructor(props) {
    super(props);

    this.state ={
      userName: props.userData ? props.userData.userName : '',
      email: props.userData ? props.userData.email : '',
      errorEmail: false,
      phoneNumber: props.userData ? props.userData.phoneNumber : '',
      emptyPhoneNumber: false,
      errorPhoneNumber: false,
      emptyName: false,
      emptyEmail: false,
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
      
      if (this.state.email == '') {
        this.setState({emptyEmail: true});
        return;
      }

      if (this.state.password.length < 8) {
        this.setState({weekPassword: true});
        return;
      }
      const {dispatch} = this.props;
      dispatch(signupUserInfo({
        userName: this.state.userName,
        phoneNumber: this.state.phoneNumber,
        password: this.state.password
      }));
      navigationService.navigate(pages.BANK);
    }

    goBack = () => {
      navigationService.goBack();
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

    _goSave = () => {
      if (this.state.userName == '') {
        this.setState({emptyName: true});
        return;
      }

      if (this.state.phoneNumber == '') {
        this.setState({emptyPhoneNumber: true});
        return;
      }
      
      if (this.state.email == '') {
        this.setState({emptyEmail: true});
        return;
      }

      if (this.state.errorEmail) {
        return;
      }

      this.setState({loading: true});
      auth.currentUser.updateEmail(this.state.email).then((value) => {
        firestore.collection('users').doc(auth.currentUser.uid).update({
          phoneNumber: this.state.phoneNumber,
          userName: this.state.userName,
          email: this.state.email
        }).then((value) => {
          this.setState({loading: false});
          console.log("Update is Finished! ", value);
        }).catch(error => {
          this.setState({loading: false});
          console.log("Update is Failed: ", error);
        });
      }).catch(error => {
        this.setState({loading: false});
        console.log("Firebase Current User Email Change Failed: ", error);
      });
    }

    render () {
        return (
            <Page backgroundColor={BLACK_PRIMARY} forceInset={{top: 'never', bottom: 'never'}}>
                <KeyboardAwareScrollView style={styles.container} contentContainerStyle={styles.wrapper}>
                  <TouchableOpacity style={styles.backBtnView} onPress={this.goBack}>
                      <Image style={styles.backBtnImage} resizeMode={'contain'} source={BACK_BUTTON}/>
                  </TouchableOpacity>
                  
                  <AuthInput 
                      desc={'Email Address'}
                      wrapperStyle={{marginBottom: getHeight(27)}}
                      descStyle={{marginBottom: getHeight(25)}}
                      onChangeText={this._changeEmail}
                      errorExist={this.state.emptyEmail || this.state.errorEmail}
                      defaultValue={this.state.email}
                      errorText={this.state.email == true ? 'Required!' : 'Invalid Email'}
                  />
                  <AuthInput 
                      desc={'Full Name'}
                      wrapperStyle={{marginBottom: getHeight(27)}}
                      descStyle={{marginBottom: getHeight(25)}}
                      onChangeText={this._changeFirstName}
                      errorExist={this.state.emptyName}
                      defaultValue={this.state.userName}
                      errorText={'Required!'}
                  />
                  <AuthInput 
                      desc={'Phone Number'}
                      placeholder={'6304086670'}
                      wrapperStyle={{marginBottom: getHeight(27)}}
                      descStyle={{marginBottom: getHeight(25)}}
                      onChangeText={this._changePhoneNumber}
                      errorExist={this.state.emptyPhoneNumber}
                      defaultValue={this.state.phoneNumber}
                      errorText={'Required!'}
                  />
                  <View style={styles.forwardBtnView}>  
                    <BaseButton 
                      text={'SAVE'}
                      onClick={this._goSave}
                    />
                  </View>
                </KeyboardAwareScrollView>
                {
                  this.state.loading == true ? 
                  <View style={styles.loadingWrapper}>
                    <ActivityIndicator size={'large'} />
                  </View>
                  : null
                }
            </Page>
        )
    }
}

ChangeUserInfo.navigatorStyle = {
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
  loadingWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)'
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
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingBottom: getHeight(30)
  },
  forwardBtn: {
      marginRight: getWidth(32),
  }
})

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps)(ChangeUserInfo);