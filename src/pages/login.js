import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    ActivityIndicator,
    View
} from 'react-native';
import Page from '../components/basePage';
import {getWidth, getHeight} from '../constants/dynamicSize';
import BaseButton from '../components/baseButton';
import BaseInput from '../components/baseInput';
import NavButton from '../components/navButton';
import navigationService from '../navigation/navigationService';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {auth, firestore} from '../constants/firebase';
import {validateEmail} from '../service/utils';

const LOGO_IMAGE = require('../assets/images/logo.png');

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            emptyEmail: false,
            invalidEmail: false,
            emptyPassword: false,
            mismatch: false,
            loading: false
        }
    }
    
    loginClick = () => {
        if (this.state.email == '') {
            this.setState({emptyEmail: true});
            return;
        }

        if (this.state.password == '') {
            this.setState({emptyPassword: true});
            return;
        }
        this.setState({loading: true});
        auth.signInWithEmailAndPassword(this.state.email, this.state.password).then((value) => {
            this.setState({mismatch: false});
            firestore.collection('users').doc(value.user.uid).update({
                lastLogin: Date.now()
            }).catch((error) => {
                console.log("Firestore Update Error", error);
            })
        }).catch((error) => {
            console.log("SignIn Error = ", error);
            this.setState({mismatch: true});
        }).finally(() => {
            this.setState({loading: false});
        })
    }

    goBack = () => {
      navigationService.pop();
    }

    _changeEmail = (email) => {
        this.setState({email: email});
        if (email != '') {
            this.setState({emptyEmail: false});
        }

        if (!validateEmail(email)) {
            this.setState({invalidEmail: true});
        } else {
            this.setState({invalidEmail: false});
        }
    }

    _changePassword = (password) => {
        this.setState({password: password});
        if (password != '') {
            this.setState({emptyPassword: false})
        }
    }

    render () {
        return (
            <Page>
                {
                    this.state.loading == true ? 
                    <View style={styles.wrapper}>
                        <ActivityIndicator size={'large'} />
                    </View>
                    :
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
                      onChangeText={this._changeEmail}
                      errorExist={this.state.emptyEmail || this.state.invalidEmail}
                      errorText={this.state.invalidEmail == true ? 'Invalid Email!' : 'Required!'}
                      keyboardType={'email-address'}
                    />
                    <BaseInput 
                      desc={'Password'}
                      pwdType={true}
                      wrapperStyle={{paddingLeft: getWidth(47), paddingRight: getWidth(47)}}
                      onChangeText={this._changePassword}
                      errorExist={this.state.emptyPassword || this.state.mismatch}
                      errorText={this.state.mismatch == true ? 'Invalid Email/Password!' : 'Required!'}
                    />
                    <BaseButton 
                        text={'LOGIN'}
                        onClick={this.loginClick}
                        buttonStyle={{position: 'absolute', bottom: getHeight(54)}}
                    />
                </KeyboardAwareScrollView>
                }
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