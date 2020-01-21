import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
    Image,
    TouchableOpacity,
    Dimensions,
    Platform,
    TextInput,
    KeyboardAvoidingView
} from 'react-native';
import Page from '../components/basePage';
import MenuPage from '../components/menuPage';
import {getWidth, getHeight} from '../constants/dynamicSize';
import BaseButton from '../components/baseButton';
import NavButton from '../components/navButton';
import Chat from '../components/icons/chat';
import Hat from '../components/icons/hat';
import Star from '../components/icons/star';
import BStar from '../components/icons/bstar';
import Phone from '../components/icons/phone';
import navigationService from '../navigation/navigationService';
import pages from '../constants/pages';
import { BLACK_PRIMARY, GRAY_PRIMARY } from '../constants/colors';
import {connect} from 'react-redux';
import _ from 'lodash';
import {firestore} from '../constants/firebase';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {GiftedChat} from 'react-native-gifted-chat';
import {sendMessage} from '../controller/chat';
import {getChatUsers, getInitChats, clearChatsData} from '../controller/chat';
import {getPosterInfo} from '../controller/user';


const LOGO_IMAGE = require('../assets/images/logo.png');
const EXAMPLE_IMAGE = require('../assets/images/example.png');
const MARK_IMAGE = require('../assets/images/square-logo.png');
const SOLUTION_EXAMPLE = require('../assets/images/solution-example.png');

const SCREEN_HEIGHT = Dimensions.get('window').height > Dimensions.get('window').width ? Dimensions.get('window').height : Dimensions.get('window').width;

class SOLVESCREEN extends Component {

  constructor(props) {
    super(props);

    this.state={
      modalVisible: false,
      problemUri: '',
      problemData: {},
      subject: '',
      posterName: '',
      posterRate: 0,
      prevPosterId: ''
    }

    let tempSubject = '';
    let tempProblemId = '';
    let tempPosterId = '';
    props.navigation.addListener('didFocus', payload => {
      let problemData = payload.action.params.problem;
      tempSubject = payload.action.params.subject;
      tempProblemId = problemData.problemId;
      tempPosterId = problemData.posterId;
      // this.setState({subject: payload.action.params.subject, problemData: problemData, problemUri: problemData.problemImage}, () => {
      //   // this.props.dispatch(clearChatsData());
      //   // this.props.dispatch(getChatUsers(tempSubject.toLowerCase(), tempProblemId));
      //   // this.props.dispatch(getInitChats(tempSubject.toLowerCase(), tempProblemId));
      //   this._getPosterName(tempPosterId);
      // });
    })
  }
    
    learnClick = () => {
        navigationService.navigate(pages.LEARN_SUBJECT);
    }

    singupClick = () => {
        // navigationService.navigate(pages.SIGN_UP);
    }    

    _renderTitle = () => {
      return (
        <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', width: '100%', position: 'absolute', top: getHeight(20)}}
        onPress={() => {this.setState({modalVisible: !this.state.modalVisible})}}
        >
          <Text style={styles.titleText}>
            {this.state.posterName}
          </Text>
          <Text style={styles.titleText}>
            (630)-772-1212
          </Text>
        </TouchableOpacity>
      )
    }

    _renderRightItem = () => {
      return (
        <View style={{position: 'absolute', right: getWidth(16), top: getHeight(23)}}>
          <Text style={styles.titleText}>
            5:00
          </Text>
        </View>
      )
    }

    _getPosterName = (posterId) => {
      firestore.collection('users').doc(posterId).get().then((posterDoc) => {
        let posterData = posterDoc.data();
          this.setState({posterName: posterData.userName});
      })
    }

    _finishSession = () => {
      this.setState({modalVisible: false})
      //Save session Result & navigate to Home page
      navigationService.navigate(pages.HOME_SCREEN);
    }

    static getDerivedStateFromProps (nextprops, nextstate) {
      const {session} = nextprops;

      if (nextstate.prevPosterId != session.problemData.posterId || nextstate.prevProblemId != session.problemData.problemId) {
        nextprops.dispatch(getPosterInfo(session.problemData.posterId));  
      }

      let newPosterId = session.problemData.posterId == undefined ? '' : session.problemData.posterId;
      let newProblemId = session.problemData.problemId == undefined ? '' : session.problemData.problemId;

      return {
        subject: session.subject,
        problemUri: session.problemData.problemImage,
        problemData: session.problemData,
        posterName: session.poster != undefined ? session.poster.userName : '',
        prevPosterId: newPosterId,
        prevProblemId : newProblemId
      };
    }

    _clickChat =() =>{
      navigationService.navigate(pages.CHAT_SCREEN, {subject: this.state.subject, problem: this.state.problemData, prevScreen: 'thSolve'});
      // this.setState({chatting: true});  
    }

    componentDidMount() {
      const {dispatch} = this.props;
      const problemData = this.state.problemData;
      // console.log("TH Solve Mounted! ====", this.state.subject, problemData.problemId);
      // dispatch(getChatUsers(this.state.subject, problemData.problemId));
      // dispatch(getInitChats(this.state.subject, problemData.problemId));
    }

    render () {
      return (
        <MenuPage 
          backgroundColor={'#FFFFFF'} menuBtnColor={BLACK_PRIMARY}
          renderTitle={this._renderTitle}
          renderRightItem={this._renderRightItem}
          >
            <KeyboardAwareScrollView style={{flex: 1, width: '100%'}} contentContainerStyle={{alignItems: 'center'}}>
              <Image
                  source={{uri: this.state.problemUri}}
                  style={styles.logoImage}
                  resizeMode={'contain'}
              />
              <View style={{width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                {/* <Image source={SOLUTION_EXAMPLE} resizeMode={'contain'}/> */}
                <TextInput style={{width: '80%', fontFamily: 'Montserrat-Bold', fontSize: getHeight(18), backgroundColor: '#E0E0E0', height: getHeight(350)}} multiline/>
              </View>
            </KeyboardAwareScrollView>
            <View style={{width: '100%', height: getHeight(50), justifyContent: 'flex-start', alignItems: 'flex-end', paddingRight: getWidth(30)}}>
              <TouchableOpacity onPress={() => this._clickChat()}>
                <Chat size={getHeight(30)} color={'#000000'} /> 
              </TouchableOpacity>
              
            </View>
            {
              this.state.modalVisible == true ? 
              <View style={styles.modalContainerView}>
                <View style={styles.modalView}>
                  <View style={styles.modalMark}>
                    <Hat width={getWidth(86)} height={getHeight(84)} color={BLACK_PRIMARY} />  
                  </View>
                  <Image style={styles.modalLogoLeft} source={MARK_IMAGE} resizeMode={'contain'} />
                  <Image style={styles.modalLogoRight} source={MARK_IMAGE} resizeMode={'contain'} />
                  <View style={styles.modalTitleView}>
                    <Text style={styles.modalTitle}>Rate Your Student</Text>
                  </View>
                  <View style={styles.starView}>
                    <TouchableOpacity onPress={() => {this.setState({posterRate: 1})}}>
                      {
                        this.state.posterRate > 0 ? 
                        <Star width={getWidth(28)} height={getHeight(27)} color={BLACK_PRIMARY} />
                        :
                        <BStar width={getWidth(28)} height={getHeight(27)} color={'#FFFFFF'} stroke={BLACK_PRIMARY} />
                      }
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {this.setState({posterRate: 2})}}>
                      {
                        this.state.posterRate > 1 ? 
                        <Star width={getWidth(28)} height={getHeight(27)} color={BLACK_PRIMARY} />
                        :
                        <BStar width={getWidth(28)} height={getHeight(27)} color={'#FFFFFF'} stroke={BLACK_PRIMARY} />
                      }
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {this.setState({posterRate: 3})}}>
                      {
                        this.state.posterRate > 2 ? 
                        <Star width={getWidth(28)} height={getHeight(27)} color={BLACK_PRIMARY} />
                        :
                        <BStar width={getWidth(28)} height={getHeight(27)} color={'#FFFFFF'} stroke={BLACK_PRIMARY} />
                      }
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {this.setState({posterRate: 4})}}>
                      {
                        this.state.posterRate > 3 ? 
                        <Star width={getWidth(28)} height={getHeight(27)} color={BLACK_PRIMARY} />
                        :
                        <BStar width={getWidth(28)} height={getHeight(27)} color={'#FFFFFF'} stroke={BLACK_PRIMARY} />
                      }
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {this.setState({posterRate: 5})}}>
                      {
                        this.state.posterRate > 4 ? 
                        <Star width={getWidth(28)} height={getHeight(27)} color={BLACK_PRIMARY} />
                        :
                        <BStar width={getWidth(28)} height={getHeight(27)} color={'#FFFFFF'} stroke={BLACK_PRIMARY} />
                      }
                    </TouchableOpacity>
                  </View>
                  
                  <View style={styles.modalTimeView}>
                    <Text style={styles.modalTime}>
                      $3.30
                    </Text>
                  </View>
                  <View style={{flex: 1}}>
                    
                  </View>
                  <View style={styles.modalBtnView}>
                    <TouchableOpacity style={styles.modalBtn} onPress={() => {this._finishSession()}}>
                      <Text style={styles.modalBtnText}>
                        Home
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              : null
            }
        </MenuPage>
      )  
    }
}

SOLVESCREEN.navigatorStyle = {
    navBarHidden: true,
    statusBarBlur: false
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    logoImage: {
        width: getWidth(291),
        height: getHeight(151),
        marginBottom: getHeight(23),
        
    },
    titleText:{
      fontFamily: 'Montserrat-Regular',
      fontSize: getHeight(16),
      color: BLACK_PRIMARY
    },
    modalView:{
      backgroundColor: '#FFFFFF',
      width: getWidth(244),
      height: getHeight(262),
      borderRadius: getHeight(10),
      justifyContent: 'flex-start',
      alignItems: 'center'
    },
    modalLogoLeft:{
      width: getWidth(80),
      height: getHeight(67),
      position: 'absolute',
      top: 0,
      left: 0
    },
    modalLogoRight:{
      width: getWidth(80),
      height: getHeight(67),
      position: 'absolute',
      top: 0,
      right: 0
    },
    starView:{
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: getHeight(5)
    },
    btnView:{
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      height: getHeight(120)
    },
    modalMark: {
      marginTop: -getHeight(41),
    },
    modalTitleView:{
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      height: getHeight(36)
    },
    modalTitle: {
      fontFamily: 'Montserrat-Regular',
      fontSize: getHeight(20),
      color: BLACK_PRIMARY
    },
    phoneNum: {
      fontFamily: 'Montserrat-Regular',
      fontSize: getHeight(18),
      color: BLACK_PRIMARY,
      marginLeft: getWidth(12)
    },
    modalTimeView: {
      width: '100%',
      marginTop: getHeight(9),
      justifyContent: 'center',
      alignItems: 'center'
    },
    modalTime: {
      fontFamily: 'Montserrat-Regular',
      fontSize: getHeight(18),
      color: BLACK_PRIMARY
    },
    modalBtnView: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center'
    },
    modalBtn: {
      width: getWidth(220),
      height: getHeight(36),
      backgroundColor: GRAY_PRIMARY,
      borderRadius: getHeight(10),
      justifyContent: 'center',
      alignItems: 'center'
    },
    modalBtnText: {
      fontFamily: 'Montserrat-Regular',
      fontSize: getHeight(18),
      color: '#FFFFFF'
    },
    modalContainerView:{
      flex: 1, 
      width: '100%',
      height: SCREEN_HEIGHT - getHeight(100),
      justifyContent: 'center', 
      alignItems: 'center', 
      backgroundColor: 'rgba(0,0,0,0.4)',
      position: 'absolute',
      top: 0, 
      left: 0,
      marginTop: getHeight(70)
    }
})

const mapStateToProps = (state) => ({
  messages: state.chat,
  session: state.session
})

export default connect(mapStateToProps)(SOLVESCREEN);