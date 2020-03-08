import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
    Image,
    SafeAreaView,
    ScrollView
} from 'react-native';
import {getWidth, getHeight} from '../constants/dynamicSize';
import Person from '../components/icons/person';
import navigationService from '../navigation/navigationService';
import pages from '../constants/pages';
import Home from '../components/icons/home';
import Arrow from '../components/icons/arrow';
import Scard from '../components/icons/scard';
import Bank from '../components/icons/bank';
import Qmark from '../components/icons/qmark';
import Hat from '../components/icons/hat';
import Logout from '../components/icons/logout';
import {PURPLE_MAIN, BLACK_PRIMARY} from '../constants/colors';
import MenuItem  from '../components/baseMenuItem';
import {auth} from '../constants/firebase';
import {connect} from 'react-redux';
import {getUserPayments, getUserPaymentHistory} from '../controller/payment';
import _ from 'lodash';

const MENU_LOGO = require('../assets/images/logo-menu.png')

class MenuContent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      user: {},
      prevBank: {},
      balanceAmount: '$0.00 in the Socra'
    }
  }
    
    loginClick = () => {
      navigationService.navigate(pages.SIGN_IN);
    }

    singupClick = () => {
        navigationService.navigate(pages.SIGN_UP);
    }

    onHomeClick = () => {
      // navigationService.navigate(pages.HOME_SCREEN);
      navigationService.reset(pages.LOADING);
    }

    onSignoutClick = () => {
      auth.signOut();
    }

    onTeachHistory = () => {
      navigationService.navigate(pages.TEACH_HISTORY);
    }

    onLearnHistory = () => {
      navigationService.navigate(pages.LEARN_HISTORY);
    }

    _onPayments = () => {
      navigationService.navigate(pages.PAYMENTS);
    }

    _onBanks = () => {
      navigationService.navigate(pages.BANKS);
    }

    _onTransactionHistory = () => {
      navigationService.navigate(pages.TRANSACTION_HISTORY);
    }

    _onTransfer = () => {
      navigationService.navigate(pages.TRANSFER);
    }

    _onHelp = () => {
      navigationService.navigate(pages.HELP)
    }

    static getDerivedStateFromProps (props, state) {
      if (props.bank != null && props.bank != state.prevBank && props.user != null) {
        let balance = props.bank.balance;
        console.log("Props.Balance", props.bank.balance);
        if (balance != null) {
          return {
            balanceAmount: '$' + balance.total + ' in Socra',
            prevBank: props.bank,
            user: props.user
          }
        } else {
          return null;
        }
        
      }

      return null;
      
    }

    componentDidMount() {
      const {dispatch} = this.props;
      dispatch(getUserPayments());
      dispatch(getUserPaymentHistory());
    }

    render () {
      // console.log("This.props === ", this.props.user);
      const balance = this.props.bank ? this.props.bank.balance : null;
      
      const displayBalance = balance ? '$' + balance + ' in Socra' : '$0.00 in Socra';
      const {user} = this.state;
      let userRating = user.rating == undefined ? 0 : user.rating;
      let displayRating = '';
      if (userRating * 100 % 100 == 0 && userRating != 0) {
        displayRating = userRating + '.00';
      }
        return (
            <View style={styles.container}>
              <SafeAreaView style={styles.safeView}>
                
                <View style={styles.contentView}>
                  <View style={styles.header}>
                    <View style={styles.personView}>
                      <Person size={getHeight(30)} color={'#FFFFFF'} />
                    </View>
                    <Text style={styles.headerTitle}>
                      {
                        user.userName == undefined ? '' : user.userName
                      }
                    </Text>
                  </View>
                  <View style={styles.markView}>
                    <Text style={styles.markTitle}>
                      {
                        displayRating
                      }
                    </Text>
                  </View>
                  
                  <View style={styles.statusPart}>
                    <Text style={styles.statusText}>
                      {this.state.balanceAmount}
                    </Text>
                    <Text style={styles.statusBold}>
                      Teach
                    </Text>
                  </View>

                  <MenuItem 
                    text={'Home'}
                    icon={<Home size={getHeight(20)} color={'#FFFFFF'} />}
                    onClick={this.onHomeClick}
                  />
                  <MenuItem 
                    text={'Transer Balance'}
                    icon={<Arrow size={getHeight(20)} color={'#FFFFFF'} />}
                    onClick={this._onTransfer}
                  />
                  {/* <MenuItem 
                    text={'Teaching History'}
                    icon={<Clock size={getHeight(20)} color={'#FFFFFF'} />}
                    onClick={this.onTeachHistory}
                  />
                  <MenuItem 
                    text={'Learning History'}
                    icon={<Clock size={getHeight(20)} color={'#FFFFFF'} />}
                    onClick={this.onLearnHistory}
                  /> */}
                  <MenuItem 
                    text={'Transaction History'}
                    icon={<Hat width={getHeight(20)} height={getHeight(20)} color={'#FFFFFF'} />}
                    onClick={this._onTransactionHistory}
                  />
                  <MenuItem 
                    text={'Bank Setup'}
                    icon={<Bank size={getHeight(20)} color={'#FFFFFF'} />}
                    onClick={this._onBanks}
                  />
                  <MenuItem 
                    text={'Payments'}
                    icon={<Scard size={getHeight(20)} color={'#FFFFFF'} />}
                    onClick={this._onPayments}
                  />
                  <MenuItem 
                    text={'Help'}
                    icon={<Qmark size={getHeight(20)} color={'#FFFFFF'} />}
                    onClick={this._onHelp}
                  />
                  
                  {/* <MenuItem 
                    text={'Free Learning Sessions'}
                    icon={<Image source={LOGO_IMAGE} style={{width: getWidth(38.54), height: getHeight(20)}} resizeMode={'contain'} />}
                    onClick={this.onHomeClick1}
                  />
                  <MenuItem 
                    text={'Claim Free Stylus'}
                    icon={<Pencil size={getHeight(20)} color={'#FFFFFF'} />}
                    onClick={this.onHomeClick1}
                  />
                  <MenuItem 
                    text={'Legal'}
                    icon={<Hammer size={getHeight(20)} color={'#FFFFFF'} />}
                    onClick={this.onHomeClick1}
                  /> */}
                  <MenuItem 
                    text={'Log out'}
                    icon={<Logout size={getHeight(20)} color={'#FFFFFF'} />}
                    onClick={this.onSignoutClick}
                  />
                  <View style={styles.logoView}>
                    <Image style={{width: getWidth(150), height: getHeight(131)}} source={MENU_LOGO} resizeMode={'contain'} />
                  </View>
                </View>
                
              </SafeAreaView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: BLACK_PRIMARY
    },
    safeView: {
      flex: 1, 
      width: '100%', 
      height: '100%'
    },
    contentView: {
      flex: 1, 
      backgroundColor: BLACK_PRIMARY,
      justifyContent: 'center',
      alignItems: 'center'
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: '100%',
      marginTop: getHeight(20)
    },
    personView: {
      width: getWidth(75),
      justifyContent: 'center',
      alignItems: 'center'
    },
    headerTitle: {
      fontFamily: 'Montserrat-Bold',
      fontSize: getHeight(20),
      color: '#FFFFFF'
    },
    markView: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      paddingLeft: getWidth(75),
      marginBottom: getHeight(10)
    },
    markTitle: {
      fontFamily: 'Montserrat-Bold',
      fontSize: getHeight(18),
      color: '#FFFFFF'
    },
    statusPart: {
      width: '100%',
      height: getHeight(30),
      backgroundColor: PURPLE_MAIN,
      paddingLeft: getWidth(18),
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginBottom: getHeight(26),
      flexDirection: 'row'
    },
    statusText: {
      fontFamily: 'Montserrat-Regular',
      fontSize: getHeight(17),
      color: '#FFFFFF',
    },
    statusBold: {
      fontFamily: 'Montserrat-Bold',
      fontSize: getHeight(17),
      color: '#FFFFFF',
    },
    logoView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      
    }
})

const mapStateToProps = (state) => ({
  user: state.user,
  payment: state.payment,
  bank: state.bank
})

export default connect(mapStateToProps)(MenuContent);