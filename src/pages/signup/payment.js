import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    View,
    ActivityIndicator
} from 'react-native';
import Page from '../../components/basePage';
import {getWidth, getHeight} from '../../constants/dynamicSize';
import BaseButton from '../../components/baseButton';
import BaseInput from '../../components/baseInput';
import NavButton from '../../components/navButton';
import navigationService from '../../navigation/navigationService';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import pages from '../../constants/pages';
import Card from '../../components/icons/card';
import {validateExp, validateCardNum} from '../../service/utils';
import {getStripeToken} from '../../service/stripe';
import {signupStripeInfo} from '../../model/actions/signupAC';
import {connect} from 'react-redux';

const LOGO_IMAGE = require('../../assets/images/logo.png');

class Payment extends Component {

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
      console.log("Stripe Response ", value.tokenId);
      dispatch(signupStripeInfo(value.tokenId));
    }).finally(() => {
      this.setState({loading: false});
      navigationService.navigate(pages.SINGUP_FINISH);
    });

    // navigationService.navigate(pages.SINGUP_FINISH);
  }

  goBack = () => {
    navigationService.pop();
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
                <View style={{width: '100%', paddingLeft: getWidth(45), marginBottom: getHeight(56)}}>
                  <Card width={getWidth(40)} height={getHeight(32)} color={'#FFFFFF'} />
                </View>
                
                <BaseInput 
                  desc={'Name on Card'}
                  wrapperStyle={{marginBottom: getHeight(36), width: '100%'}}
                  onChangeText={this._changeName}
                  errorText={'Required!'}
                  errorExist={this.state.emptyName}
                />
                <BaseInput 
                  desc={'Card Number'}
                  wrapperStyle={{marginBottom: getHeight(36)}}
                  onChangeText={this._changeCardNumber}
                  errorText={this.state.invalidCardNum == true ? 'Invalid Card Number' : 'Required!'}
                  errorExist={this.state.emptyCardNumber || this.state.invalidCardNum}
                  keyboardType={'numeric'}
                />
                <BaseInput 
                  desc={'Expiration'}
                  wrapperStyle={{marginBottom: getHeight(36)}}
                  onChangeText={this._changeCardExp}
                  errorText={this.state.invalidExp == true ? 'Invalid Expiration!' : 'Required!'}
                  errorExist={this.state.emptyExp || this.state.invalidExp}
                  placeholder={'08/2020'}
                  keyboardType={'numeric'}
                />
                <BaseInput 
                  desc={'Security Code'}
                  wrapperStyle={{marginBottom: getHeight(63)}}
                  onChangeText={this._changeSecurity}
                  errorExist={this.state.emptySecurity}
                  errorText={'Required!'}
                />
                
                <BaseButton 
                    text={'CONTINUE'}
                    onClick={this.goForward}
                />
            </KeyboardAwareScrollView>
          }
        </Page>
    )
  }
}

Payment.navigatorStyle = {
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
    }
})

const mapStateToProps = (state) => ({
  signupInfo: state.signupInfo
});

export default connect(mapStateToProps)(Payment)