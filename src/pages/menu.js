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
import Page from '../components/basePage';
import {getWidth, getHeight} from '../constants/dynamicSize';
import Person from '../components/icons/person';
import navigationService from '../navigation/navigationService';
import pages from '../constants/pages';
import Star from '../components/icons/star';
import Home from '../components/icons/home';
import Arrow from '../components/icons/arrow';
import Clock from '../components/icons/clock';
import Scard from '../components/icons/scard';
import Bank from '../components/icons/bank';
import Qmark from '../components/icons/qmark';
import Pencil from '../components/icons/pencil';
import Hammer from '../components/icons/hammer';
import Hat from '../components/icons/hat';
import Logout from '../components/icons/logout';
import {PURPLE_MAIN, BLACK_PRIMARY} from '../constants/colors';
import MenuItem  from '../components/baseMenuItem';
// import { ScrollView } from 'react-native-gesture-handler';
import {auth} from '../constants/firebase';
import {connect} from 'react-redux';

const LOGO_IMAGE = require('../assets/images/logo.png');
const MENU_LOGO = require('../assets/images/logo-menu.png')

class MenuContent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      user: {}
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
      if (props.user != null) {
        return {
          user: props.user
        }
      } else {
        return null;
      }
    }

    render () {
      // console.log("This.props === ", this.props.user);
      const {user} = this.state;
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
                      4.79
                    </Text>
                  </View>

                  <View style={styles.statusPart}>
                    <Text style={styles.statusText}>
                      $24.72 in Socra
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
  user: state.user
})

export default connect(mapStateToProps)(MenuContent);