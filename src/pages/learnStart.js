import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
    TouchableOpacity,
    Image
} from 'react-native';
import {BLACK_PRIMARY, PURPLE_MAIN} from '../constants/colors';
import Page from '../components/basePage';
import {getHeight, getWidth} from '../constants/dynamicSize';
import {connect} from 'react-redux';
import BaseButton from '../components/baseButton';
import navigationService from '../navigation/navigationService';
import Pages from '../constants/pages';
import Star from '../components/icons/star';
import BStar from '../components/icons/bstar';
import {firestore, auth} from '../constants/firebase';
import {withMappedNavigationParams} from 'react-navigation-props-mapper';
import {getMyLiveLearnSession, getMyLiveTeachSession, clearMyLTSession} from '../controller/ltsession';

const ICON_LOGO = require('../assets/images/icon-logo.png');
const MASTER_IMAGE = require('../assets/images/master.png');

@withMappedNavigationParams()
class LearnStart extends Component {

  constructor(props) {
    super(props);

    this.state= {
      problemData: {}
    }
  }

  componentDidMount() {
    console.log("Navigation Params =", this.props.sessionData);
    const {sessionData} = this.props;
    firestore.collection(sessionData.subject.toLowerCase()).doc(sessionData.problemId).get().then(doc => {
      this.setState({problemData: doc.data()});
    })
  }

  _gotoPayments = () => {
    navigationService.navigate(pages.PAYMENTS);
  }

  _goLearn = () => {
    const {sessionData, user, dispatch} = this.props;
    
    firestore.collection('users').doc(auth.currentUser.uid).collection('learn_session').doc(sessionData.subject.toLowerCase() + '-' + sessionData.problemId).update({
      acceptance: true,
      lastUpdate: Date.now()
    });
    navigationService.navigate(Pages.LEARN_SOLVE, {sessionData: this.props.sessionData});
  }

  _cancelLearn = () => {
    // navigationService.reset(pages.LOADING);
    const {sessionData, user, dispatch} = this.props;
    
    firestore.collection('users').doc(auth.currentUser.uid).collection('learn_session').doc(sessionData.subject.toLowerCase() + '-' + sessionData.problemId).delete().then((value) => {
      dispatch(clearMyLTSession());
      dispatch(getMyLiveLearnSession());
      dispatch(getMyLiveTeachSession());
    });
    navigationService.navigate(Pages.SESSION);
  }

  render () {
    const {sessionData} = this.props;
    console.log("Learn Start sessionData = ", sessionData);
    let userRating = sessionData.userData.rating ? sessionData.userData.rating : 0;
      return (
          <Page>
              <View style={styles.container} >
                <Image style={{width: getWidth(155), height: getHeight(82)}} resizeMode={'contain'} source={ICON_LOGO}/>
                <View style={styles.modal}>
                  <View style={{flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={styles.bodyText}>{this.props.sessionData.name}</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                      {
                        userRating > 0 ?
                        <Star width={getWidth(28)} height={getHeight(27)} color ={PURPLE_MAIN}/>
                        :
                        <BStar width={getWidth(28)} height={getHeight(27)} color={'#FFFFFF'} stroke={BLACK_PRIMARY} />
                      }
                      {
                        userRating > 1 ?
                        <Star width={getWidth(28)} height={getHeight(27)} color ={PURPLE_MAIN}/>
                        :
                        <BStar width={getWidth(28)} height={getHeight(27)} color={'#FFFFFF'} stroke={BLACK_PRIMARY} />  
                      }
                      {
                        userRating > 2 ?
                        <Star width={getWidth(28)} height={getHeight(27)} color ={PURPLE_MAIN}/>
                        :
                        <BStar width={getWidth(28)} height={getHeight(27)} color={'#FFFFFF'} stroke={BLACK_PRIMARY} />  
                      }
                      {
                        userRating > 3 ?
                        <Star width={getWidth(28)} height={getHeight(27)} color ={PURPLE_MAIN}/>
                        :
                        <BStar width={getWidth(28)} height={getHeight(27)} color={'#FFFFFF'} stroke={BLACK_PRIMARY} />  
                      }
                      {
                        userRating > 4 ?
                        <Star width={getWidth(28)} height={getHeight(27)} color ={PURPLE_MAIN}/>
                        :
                        <BStar width={getWidth(28)} height={getHeight(27)} color={'#FFFFFF'} stroke={BLACK_PRIMARY} />  
                      }
                    </View>
                    <Text style={styles.bodySecText}>
                      {this.props.sessionData.phoneNumber}
                    </Text>
                    <Text style={styles.bodyThirdText}>
                      $3.00
                    </Text>
                  </View>
                  <TouchableOpacity style={styles.btnBody}
                  onPress={this._gotoPayments}
                  >
                    {/* <Text style={styles.btnText}>Home</Text> */}
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Image style={{width: getWidth(24), height: getHeight(15.87)}} source={MASTER_IMAGE}/>
                      <Text style={styles.btnText}>0874</Text>
                    </View>
                    <Text style={styles.btnText}>
                      Change
                    </Text>
                  </TouchableOpacity>
                </View>
                <BaseButton 
                  text={'LEARN'}
                  onClick={this._goLearn}
                  buttonStyle={{marginTop: getHeight(113)}}
                />
                <BaseButton 
                  text={'CANCEL'}
                  onClick={this._cancelLearn}
                  buttonStyle={{marginTop: getHeight(22)}}
                />
              </View>
          </Page>
          
      )
  }
};

LearnStart.navigatorStyle = {
    navBarHidden: true,
    statusBarBlur: false
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loadText: {
        paddingBottom: getHeight(10),
        color: '#FFFFFF',
        fontFamily: 'Montserrat-Bold',
    },
    modal: {
      width: getWidth(244),
      height: getHeight(262),
      backgroundColor: '#FFFFFF',
      alignItems: 'center',
      borderRadius: getHeight(10),
      marginTop: getHeight(42)
    },
    btnText: {
      fontFamily: 'Montserrat-Medium',
      color: '#FFFFFF',
      fontSize: getHeight(18)
    },
    bodyText: {
      fontFamily: 'Montserrat-Medium',
      fontSize: getHeight(20),
      color: BLACK_PRIMARY
    },
    bodySecText: {
      fontFamily: 'Montserrat-Medium',
      fontSize: getHeight(15),
      color: BLACK_PRIMARY,
      height: getHeight(20),
      paddingVertical: 0,
      marginTop: getHeight(5)
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
      backgroundColor: BLACK_PRIMARY, 
      justifyContent: 'space-between',
      alignItems: 'center', 
      flexDirection: 'row',
      paddingLeft: getWidth(13),
      paddingRight: getWidth(25),
      marginBottom: getHeight(23)
    }
});

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps)(LearnStart);