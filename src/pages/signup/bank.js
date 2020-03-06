import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    View,
    ActivityIndicator,
    Alert,
    TouchableOpacity,
    Text,
    Linking
} from 'react-native';
import Page from '../../components/basePage';
import {getWidth, getHeight} from '../../constants/dynamicSize';
import BaseButton from '../../components/baseButton';
import BaseInput from '../../components/baseInput';
import NavButton from '../../components/navButton';
import AuthInput from '../../components/authInput';
import navigationService from '../../navigation/navigationService';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import pages from '../../constants/pages';
import Bank from '../../components/icons/bank';
import {validateExp, validateCardNum} from '../../service/utils';
import {getStripeToken} from '../../service/stripe';
import {signupStripeInfo, signupUserInfo} from '../../model/actions/signupAC';
import {getExpress} from '../../model/actions/userAC';
import {connect} from 'react-redux';
import { BLACK_PRIMARY, PURPLE_MAIN } from '../../constants/colors';
import {auth} from '../../constants/firebase';

const ICON_LOGO = require('../../assets/images/icon-logo.png');
const BACK_BUTTON = require('../../assets/images/back-button.png');
const FORWARD_BUTTON = require('../../assets/images/forward-button.png');

class BankSetup extends Component {

  constructor(props) {
    super(props);

    this.state = {
      routeName: '',
      emptyRoute: false,
      accountNumber: '',
      emptyAccountNumber: false,
      cardExp: '',
      emptyExp: false,
      secondAccount: '',
      emptySecond: false,
      invalidExp: false,
      invalidAccountNum: false,
      loading: false
    }
  }
    
  goForward = () => {
    const {dispatch, signupInfo} = this.props;
    this.setState({loading: true});
    dispatch(signupUserInfo({
      routeNumber: this.state.routeName,
      accountNumber: this.state.accountNumber,
      secondAccount: this.state.secondAccount,
      bankSkipped: false
    }));
    auth.createUserWithEmailAndPassword(signupInfo.email, signupInfo.password).then((result) => {
      dispatch(getExpress({desc: 'Express Account Will be Created'}));
      let url = `https://connect.stripe.com/express/oauth/authorize?redirect_uri=https://socrateach-65b77.firebaseapp.com&client_id=ca_GnclzGHybAEFl9aSwOI96R3jkPDIIIlM&state=${result.user.uid}`;
      Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          console.log("Can't handle url: " + url);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => console.error('An error occurred', err));
    }).finally(() => {
      this.setState({loading: false});
    })
  }

  goBack = () => {
    navigationService.pop();
  }

  goSKIP = () => {
    const {dispatch, signupInfo} = this.props;
    this.setState({loading: true});
    dispatch(signupUserInfo({
      bankSkipped: true
    }));

    auth.createUserWithEmailAndPassword(signupInfo.email, signupInfo.password).then((result) => {
      console.log("Signup Result = ", result);
    }).finally(() => {
      this.setState({loading: false});
    })
  }

  _changeRoute = (name) => {
    this.setState({routeName: name});
    if (name != '') {
      this.setState({emptyRoute: false});
    }
  }

  _changeAccountNumber = (number) => {
    this.setState({accountNumber: number});
    this.setState({invalidAccountNum: !validateCardNum(number)});
    if (number != '') {
      this.setState({emptyAccountNumber: false});
    }
  }

  _changeCardExp = (exp) => {
    this.setState({cardExp: exp});
    if (exp != '') {
      this.setState({emptyExp: false});
    }

    let invalidExp = validateExp(exp);
    if(invalidExp == false) {
      this.setState({invalidExp: true});
    } else {
      this.setState({invalidExp: false});
    }
  }

  _changeSecond = (security) => {
    this.setState({secondAccount: security});
    if (security != '') {
      this.setState({emptySecond: false});
    }
  }

  render () {
    return (
        <Page backgroundColor={BLACK_PRIMARY} forceInset={{top: 'never'}}>
          {
            this.state.loading == true ? 
            <View style={styles.wrapper}>
              <ActivityIndicator size={'large'} />
            </View>
            :
            <View style={styles.container}>
                
                <TouchableOpacity style={styles.backBtnView} onPress={this.goBack}>
                    <Image style={styles.backBtnImage} resizeMode={'contain'} source={BACK_BUTTON}/>
                </TouchableOpacity>
                <View style={{flex: 1, width: '100%'}}>

                
                <Image style={{width: getWidth(155), height: getHeight(82), alignSelf: 'center'}} resizeMode={'contain'} source={ICON_LOGO}/>
                  <View style={styles.modal}>
                    <View style={{flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', paddingBottom: getHeight(40)}}>
                      <Bank size={getHeight(48)} color={BLACK_PRIMARY} />
                      <Text style={styles.bodyText}>Add bank account</Text>
                      <Text style={styles.secondText}>through Stripe</Text>
                    </View>
                    <TouchableOpacity style={styles.btnBody}
                    onPress={this.goForward}
                    >
                      {/* <Text style={styles.btnText}>Home</Text> */}
                      
                      <Text style={styles.btnText}>
                        Add Bank
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.bottomBtnView}>
                  <BaseButton 
                    text={'SKIP'}
                    onClick={this.goSKIP}
                  />
                </View>
            </View>
          }
        </Page>
    )
  }
}

BankSetup.navigatorStyle = {
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
        marginBottom: getHeight(19),
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
        marginBottom: getHeight(27)
    },
    forwardBtn: {
        marginRight: getWidth(32),
    },
    pageName: {
      fontFamily: 'Montserrat-Medium',
      fontSize: getHeight(25), 
      marginBottom: getHeight(22),
      color: '#FFFFFF',
      marginLeft: getWidth(34)
    },
    bottomBtnView: {
      width: '100%', 
      alignItems: 'center',
      marginBottom: getHeight(37)
    },
    modal: {
      width: getWidth(244),
      height: getHeight(262),
      backgroundColor: '#FFFFFF',
      alignItems: 'center',
      borderRadius: getHeight(10),
      marginTop: getHeight(42),
      alignSelf: 'center'
    },
    btnText: {
      fontFamily: 'Montserrat-Medium',
      color: '#FFFFFF',
      fontSize: getHeight(18)
    },
    bodyText: {
      fontFamily: 'Montserrat-Medium',
      fontSize: getHeight(18),
      color: BLACK_PRIMARY,
      marginTop: getHeight(29)
    },
    secondText: {
      fontFamily: 'Montserrat-Medium',
      fontSize: getHeight(18),
      color: BLACK_PRIMARY,
    },
    bodySecText: {
      fontFamily: 'Montserrat-Medium',
      fontSize: getHeight(15),
      color: BLACK_PRIMARY
    },
    bodyThirdText: {
      fontFamily: 'Montserrat-Medium',
      fontSize: getHeight(18),
      color: BLACK_PRIMARY
    },
    btnBody: {
      width: getWidth(220), 
      height: getHeight(36), 
      borderRadius: getHeight(10), 
      backgroundColor: PURPLE_MAIN, 
      justifyContent: 'center',
      alignItems: 'center', 
      flexDirection: 'row',
      paddingLeft: getWidth(13),
      paddingRight: getWidth(25),
      marginBottom: getHeight(23)
    }
})

const mapStateToProps = (state) => ({
  signupInfo: state.signupInfo
});

export default connect(mapStateToProps)(BankSetup)