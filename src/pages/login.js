import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    ActivityIndicator,
    View,
    TouchableOpacity,
    Text
} from 'react-native';
import Page from '../components/basePage';
import {getWidth, getHeight} from '../constants/dynamicSize';
import BaseButton from '../components/baseButton';
import BaseInput from '../components/baseInput';
import AuthInput from '../components/authInput';
import NavButton from '../components/navButton';
import navigationService from '../navigation/navigationService';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {auth, firestore} from '../constants/firebase';
import {validateEmail} from '../service/utils';
import { BLACK_PRIMARY, PURPLE_MAIN } from '../constants/colors';
import pages from '../constants/pages';
import {connect} from 'react-redux';

const LOGO_IMAGE = require('../assets/images/icon-logo.png');
const BACK_BUTTON = require('../assets/images/back-button.png');
const FORWARD_BUTTON = require('../assets/images/forward-button.png');

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            emptyEmail: false,
            invalidEmail: false,
            emptyPassword: false,
            mismatch: false,
            loading: false,
            modalVisiable: false
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

    _forgotpasswordClick = () => {
        this.setState({modalVisiable: true});
    }

    _gotoHome = () => {
        console.log("Go To Home!!!!!");
        navigationService.reset(pages.LOADING);
        
    }

    _forwardClick = () => {
        if (this.state.password == '') {
            this.setState({emptyPassword: true});
            return;
        }

        this.setState({loading: true});
        auth.signInWithEmailAndPassword(this.props.login.email, this.state.password).then((value) => {
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

    render () {
        return (
            <Page backgroundColor={BLACK_PRIMARY} forceInset={{top: 'never'}}>
                {
                    this.state.modalVisiable == false ?
                    this.state.loading == true ? 
                    <View style={styles.loadingWrapper}>
                        <ActivityIndicator size={'large'} />
                    </View>
                    :
                    <KeyboardAwareScrollView style={styles.container} contentContainerStyle={styles.wrapper}>
                        <TouchableOpacity style={styles.backBtnView} onPress={this.goBack}>
                            <Image style={styles.backBtnImage} resizeMode={'contain'} source={BACK_BUTTON}/>
                        </TouchableOpacity>
                        
                        <AuthInput 
                            desc={'Password'}
                            pwdType={true}
                            wrapperStyle={{marginBottom: getHeight(18)}}
                            descStyle={{marginBottom: getHeight(20)}}
                            onChangeText={this._changePassword}
                            errorExist={this.state.emptyEmail || this.state.mismatch}
                            errorText={this.state.mismatch == true ? 'Incorrect Password or Email!' : 'Required!'}
                        />
                        <TouchableOpacity style={{marginBottom: getHeight(45), paddingLeft: getWidth(33), paddingRight: getWidth(234)}}
                        onPress={this._forgotpasswordClick}
                        >
                            <Text style={styles.forgotText}>Forgot Password?</Text>
                            <View style={{height: 1, width: '100%', backgroundColor: '#FFFFFF'}}></View>
                        </TouchableOpacity>
                        <View style={styles.forwardBtnView}>
                            <TouchableOpacity style={styles.forwardBtn} onPress={this._forwardClick}>
                                <Image style={styles.backBtnImage} resizeMode={'contain'} source={FORWARD_BUTTON}/>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAwareScrollView>
                    :
                    <View style={styles.modalWrapper}>
                        <Image style={{marginTop: getHeight(120), width: getWidth(156), height: getHeight(82)}} source={LOGO_IMAGE} />
                        <View style={styles.modalView}>
                            <View style={{flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={styles.descText}>
                                    Password recovery 
                                </Text>
                                <Text style={styles.descText}>
                                    information has been 
                                </Text>
                                <Text style={styles.descText}>
                                    sent to your email
                                </Text>
                            </View>
                            <TouchableOpacity style={styles.btnWrapper} onPress={this._gotoHome}>
                                <Text style={styles.btnText}>Home</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
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
    loadingWrapper: {
      flex: 1,
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center'
    },
    wrapper: {
      flex: 1,
      width: '100%',
      height: '100%',
    },
    logoImage: {
        width: getWidth(291),
        height: getHeight(151),
        marginBottom: getHeight(23)
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
    emailTitle: {
        marginTop: getHeight(24),
        marginLeft: getWidth(32),
        fontFamily: 'Montserrat-Medium',
        fontSize: getHeight(25),
        color: '#FFFFFF'
    },
    emailInputView: {
        marginTop: getHeight(50),
        marginLeft: getWidth(34)
    },
    emailInput: {
        fontFamily: 'Montserrat-Regular',
        fontSize: getHeight(20),
        marginBottom: getHeight(12)
    },
    forwardBtnView: {
        width: '100%', 
        alignItems: 'flex-end',
    },
    forwardBtn: {
        marginRight: getWidth(32),
    },
    forgotText: {
        fontFamily: 'Montserrat-Regular',
        fontSize: getHeight(12),
        color: '#FFFFFF',
        marginBottom: getHeight(5)
    },
    modalWrapper: {
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },
    btnText: {
        color: '#FFFFFF',
        fontFamily: 'Montserrat-Medium',
        fontSize: getHeight(18)
    },
    btnWrapper: {
        width: getWidth(220), 
        height: getHeight(36), 
        backgroundColor: PURPLE_MAIN, 
        marginBottom: getHeight(23),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: getHeight(10)
    },
    modalView: {
        marginTop: getHeight(55), 
        borderRadius: getHeight(10), 
        width: getWidth(244), 
        height: getHeight(262), 
        backgroundColor: '#E5E5E5',
        alignItems: 'center'
    },
    descText: {
        color: '#3A3A3C',
        fontFamily: 'Montserrat-Medium',
        fontSize: getHeight(18)
    }
})

const mapStateToProps = (state) => ({
    login: state.login
})

export default connect(mapStateToProps)(Login);