import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    View,
    ActivityIndicator,
    Alert,
    TouchableOpacity,
    Text
} from 'react-native';
import Page from '../components/basePage';
import {getWidth, getHeight} from '../constants/dynamicSize';
import BaseButton from '../components/baseButton';
import AuthInput from '../components/authInput';
import navigationService from '../navigation/navigationService';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import pages from '../constants/pages';
import Card from '../components/icons/card';
import {validateExp, validateCardNum} from '../service/utils';
import {getStripeToken} from '../service/stripe';
import {signupStripeInfo} from '../model/actions/signupAC';
import {connect} from 'react-redux';
import { BLACK_PRIMARY } from '../constants/colors';
import {auth, firestore} from '../constants/firebase';


const BACK_BUTTON = require('../assets/images/back-button.png');
const FORWARD_BUTTON = require('../assets/images/forward-button.png');

class PaymentSetup extends Component {

  constructor(props) {
    super(props);

    this.state = {
      cardName: '',
      emptyName: false,
      cardNumber: '',
      emptyCardNumber: false,
      cardExp: '',
      emptyExp: false,
      cardSecurity: '',
      emptySecurity: false,
      invalidExp: false,
      invalidCardNum: false,
      loading: false
    }
  }
    
  goForward = () => {
    if (this.state.cardName == '') {
      this.setState({emptyName: true});
      return;
    }
    if (this.state.cardNumber == '') {
      this.setState({emptyCardNumber: true});
      return;
    }
    if (this.state.cardExp == '') {
      this.setState({emptyExp: true});
      return;
    }
    if (this.state.cardSecurity == '') {
      this.setState({emptySecurity: true});
      return;
    }
    if (this.state.invalidExp == true) {
      return;
    }
    if(this.state.invalidCardNum == true) {
      return;
    }
    let expArray = this.state.cardExp.split('/');
    let exp_month = expArray[0];
    let exp_year = expArray[1];

    const {dispatch} = this.props;
    this.setState({loading: true});
    getStripeToken(this.state.cardNumber, exp_month, exp_year, this.state.cardSecurity).then((value) => {
      firestore.collection('users').doc(auth.currentUser.uid).collection('cards').add({
        name: this.state.cardName,
        number: this.state.cardNumber,
        exp_month: parseInt(exp_month),
        exp_year: parseInt(exp_year),
        cvc: this.state.cardSecurity
      }).then((value) => {
        this.setState({loading: false});
        navigationService.navigate(pages.PAYMENTS);
      }).catch((error) => {
        this.setState({loading: false});
      })
      
    }).catch(() => {
      this.setState({loading: false});
      Alert.alert(
        'Invalid Card',
        'Please use correct Card',
        [
          {
            text: 'OK',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          }
        ],
        {cancelable: false}
      )
    })
    .finally(() => {
      
    });

    // navigationService.navigate(pages.SINGUP_FINISH);
  }

  goBack = () => {
    navigationService.navigate(pages.PAYMENTS);
  }

  _changeName = (name) => {
    this.setState({cardName: name});
    if (name != '') {
      this.setState({emptyName: false});
    }
  }

  _changeCardNumber = (number) => {
    this.setState({cardNumber: number});
    this.setState({invalidCardNum: !validateCardNum(number)});
    if (number != '') {
      this.setState({emptyCardNumber: false});
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

  _changeSecurity = (security) => {
    this.setState({cardSecurity: security});
    if (security != '') {
      this.setState({emptySecurity: false});
    }
  }

  render () {
    return (
        <Page backgroundColor={BLACK_PRIMARY} forceInset={{top: 'never', bottom: 'never'}}>
          {
            this.state.loading == true ? 
            <View style={styles.loadingWrapper}>
              <ActivityIndicator size={'large'} />
              <Text style={{color: 'white', fontFamily: 'Montserrat-Medium', fontSize: getHeight(14), width: '100%', textAlign: 'center'}}>Your card will appear in a few seconds.</Text>
            </View>
            :
            <View style={{flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
              <KeyboardAwareScrollView style={styles.container} contentContainerStyle={styles.wrapper}>
                
                <TouchableOpacity style={styles.backBtnView} onPress={this.goBack}>
                    <Image style={styles.backBtnImage} resizeMode={'contain'} source={BACK_BUTTON}/>
                </TouchableOpacity>
                <Text style={styles.pageName}>Credit/Debit</Text>
                <View style={{width: '100%', paddingLeft: getWidth(34), marginBottom: getHeight(56)}}>
                  <Card width={getWidth(40)} height={getHeight(32)} color={'#FFFFFF'} />
                </View>

                <AuthInput 
                    desc={'Name on Card'}
                    wrapperStyle={{marginBottom: getHeight(27)}}
                    descStyle={{marginBottom: getHeight(20)}}
                    onChangeText={this._changeName}
                    errorExist={this.state.emptyName}
                    errorText={'Required!'}
                />

                <AuthInput 
                    desc={'Number'}
                    wrapperStyle={{marginBottom: getHeight(27)}}
                    descStyle={{marginBottom: getHeight(20)}}
                    onChangeText={this._changeCardNumber}
                    errorExist={this.state.emptyCardNumber || this.state.invalidCardNum}
                    errorText={this.state.invalidCardNum == true ? 'Invalid Card Number' : 'Required!'}
                    keyboardType={'default'}
                />
                
                <AuthInput 
                    desc={'Expiration'}
                    wrapperStyle={{marginBottom: getHeight(27)}}
                    descStyle={{marginBottom: getHeight(20)}}
                    onChangeText={this._changeCardExp}
                    errorExist={this.state.emptyExp || this.state.invalidExp}
                    errorText={this.state.invalidExp == true ? 'Invalid Expiration!' : 'Required!'}
                    placeholder={'08/2020'}
                  keyboardType={'default'}
                />

                <AuthInput 
                    desc={'Security Code'}
                    wrapperStyle={{marginBottom: getHeight(27)}}
                    descStyle={{marginBottom: getHeight(20)}}
                    onChangeText={this._changeSecurity}
                    errorExist={this.state.emptySecurity}
                    errorText={'Required!'}
                />
                
              </KeyboardAwareScrollView>
              <BaseButton text={'ADD'} onClick={this.goForward} buttonStyle={{marginBottom: getHeight(20), marginTop: getHeight(20)}}/>
            </View>
            
          }
        </Page>
    )
  }
}

PaymentSetup.navigatorStyle = {
    navBarHidden: false,
    statusBarBlur: false
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    wrapper: {
      flex: 1,
      width: '100%',
      height: '100%'
    },
    loadingWrapper: {
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
    },
    forwardBtn: {
        marginRight: getWidth(32),
    },
    pageName: {
      fontFamily: 'Montserrat-Bold',
      fontSize: getHeight(25), 
      marginBottom: getHeight(22),
      color: '#FFFFFF',
      marginLeft: getWidth(34)
    }
})

const mapStateToProps = (state) => ({
  signupInfo: state.signupInfo
});

export default connect(mapStateToProps)(PaymentSetup)