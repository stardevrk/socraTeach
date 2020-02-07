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
import { BLACK_PRIMARY, GREEN_PRIMARY, PURPLE_MAIN } from '../constants/colors';
import {firestore} from '../constants/firebase';
import {getChatUsers, getInitChats, clearChatsData} from '../controller/chat';
import {connect} from 'react-redux';
import {getTeacherInfo} from '../controller/user';


const LOGO_IMAGE = require('../assets/images/logo.png');
const EXAMPLE_IMAGE = require('../assets/images/example.png');
const MARK_IMAGE = require('../assets/images/square-logo.png');
const SOLUTION_EXAMPLE = require('../assets/images/solution-example.png');

const SCREEN_HEIGHT = Dimensions.get('window').height > Dimensions.get('window').width ? Dimensions.get('window').height : Dimensions.get('window').width;

let timerDuration = 60 * 1;
let timerDisplay = '05:00';
let myTimer;

class LearnSolve extends Component {

  constructor(props) {
    super(props);

    this.state={
      modalVisible: true,
      problemUri: '',
      problemData: {},
      subject: '',
      teacherName: '',
      teacherRate: 0,
      answer: '',
      chatting: false,
      prevTeacherId: '',
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            // avatar: 'https://placeimg.com/140/140/any',
          },
        }
      ],
      displayTimer: '',
      prevProblemId: ''
    }

    /** Commented By Me*/
    // let tempSubject = '';
    // let tempProblemId = '';
    // let tempPosterId = '';
    // props.navigation.addListener('didFocus', payload => {
    //   let problemData = payload.action.params.problem;
    //   tempSubject = payload.action.params.subject;
    //   tempProblemId = problemData.problemId;
    //   tempPosterId = problemData.posterId;
    //   // this.setState({subject: problemData.subject, problemData: problemData, problemUri: problemData.problemImage, answer: problemData.answer}, () => {
    //   //   // this._getPosterName(problemData.posterId);
    //   //   if (problemData.teacherId != undefined && problemData.teacherId != null) {
    //   //     // this.setState({teacherName: })
    //   //     // this.props.dispatch(clearChatsData());
    //   //     // this.props.dispatch(getChatUsers(tempSubject.toLowerCase(), tempProblemId));
    //   //     // this.props.dispatch(getInitChats(tempSubject.toLowerCase(), tempProblemId));
    //   //     this._getTeacherName(problemData.teacherId);
    //   //   }
    //   // });
      
    // })
    /** Commented By Me*/
  }
    
    learnClick = () => {
        navigationService.navigate(pages.LEARN_SUBJECT);
    }

    singupClick = () => {
      
    }    

    _renderTitle = () => {
      if (this.state.problemData.teacherId !== undefined) {
        return (
          <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', width: '100%', position: 'absolute', top: getHeight(20)}}
          onPress={() => {this.setState({modalVisible: !this.state.modalVisible})}}
          >
            <Text style={styles.titleText}>
              {this.state.teacherName}
            </Text>
            <Text style={styles.titleText}>
              {
                this.state.teacherName != '' ? 
                '(630)-772-1212'
                : 
                ''
              }
            </Text>
          </TouchableOpacity>
        )
      }
      else {
        return null;
      }
    }

    _renderRightItem = () => {
      return (
        <View style={{position: 'absolute', right: getWidth(16), top: getHeight(23)}}>
          <Text style={styles.titleText}>
            {this.state.displayTimer}
          </Text>
        </View>
      )
    }

    _getTeacherName = (teacherId) => {
      firestore.collection('users').doc(teacherId).get().then((teacherDoc) => {
        let teacherData = teacherDoc.data();
          this.setState({teacherName: teacherData.userName});
      })
    }

    _finishSession = () => {
      this.setState({modalVisible: false})
      //Save session Result & navigate to Home page
      navigationService.navigate(pages.HOME_SCREEN);
    }

    _clickChat =() =>{
      navigationService.navigate(pages.CHAT_SCREEN, {subject: this.state.subject, problem: this.state.problemData, prevScreen: 'leSolve'});
      // this.setState({chatting: true});  
    }

    startTimer = (duration, display) => {
      var timer = duration, minutes, seconds;
      let self = this;
      myTimer = setInterval(() => {
        //  console.log("Count Down ////////");
          minutes = parseInt(timer / 60, 10);
          seconds = parseInt(timer % 60, 10);
  
          minutes = minutes < 10 ? "0" + minutes : minutes;
          seconds = seconds < 10 ? "0" + seconds : seconds;
  
          display = minutes + ":" + seconds;
          self.setState({displayTimer: display});
  
          if (--timer < 0) {
            self.setState({modalVisible: true});
              timer = duration;
          }
      }, 1000);
    }

    static getDerivedStateFromProps (nextprops, nextstate) {
      /** Commented By Me*/
      // const {session} = nextprops;
      // const problemData = session.problemData;

      // // this._getPosterName(nextprops.session.problemData.posterId);

      // let newTeacherId = problemData.teacherId == undefined ? '' : problemData.teacherId;
      // let newProblemId = session.problemData.problemId == undefined ? '' : session.problemData.problemId;

      // if (problemData.teacherId == undefined || problemData.teacherId == null) {
      //   return {
      //     subject: problemData.subject,
      //     problemUri: problemData.problemImage,
      //     problemData: problemData,
      //     answer: problemData.answer,
      //     teacherName: '',
      //     prevTeacherId: newTeacherId,
      //     prevProblemId : newProblemId
      //   }

      // } else {
      //   if (nextstate.prevTeacherId != problemData.teacherId || nextstate.prevProblemId != session.problemData.problemId ) {
          
      //     nextprops.dispatch(getTeacherInfo(problemData.teacherId));
      //   }
  
      //   // console.log("LeSolve Session ===== ", session);
        
  
  
      //   return {
      //     subject: problemData.subject,
      //     problemUri: problemData.problemImage,
      //     problemData: problemData,
      //     answer: problemData.answer,
      //     teacherName: session.teacher != undefined ? session.teacher.userName : '',
      //     prevTeacherId: newTeacherId,
      //     prevProblemId : newProblemId
      //   }
      // }
      /** Commented By Me*/

      

      
      // return {
      //   subject: problemData.subject,
      //   problemUri: problemData.problemImage,
      //   problemData: problemData,
      //   answer: problemData.answer
      // };
    }

    componentDidUpdate(prevProps, prevState, snapShot) {
      // if (this.state.problemData.sessionExist == false) {
      //   this.startTimer(timerDuration, timerDisplay);
      //   return;
      // }

      if (this.state.modalVisible == true) {
        clearInterval(myTimer);
      }

      if (this.state.prevProblemId != prevState.prevProblemId) {
        this.setState({modalVisible: false});
        clearInterval(myTimer)
        // console.log("TimerDuration ==== ", timerDuration );
        this.startTimer(timerDuration, timerDisplay);
      }
    }

    componentDidMount() {
      this.startTimer(timerDuration, timerDisplay);
    }

    render () {
        return (
          <MenuPage 
            backgroundColor={'#FFFFFF'} menuBtnColor={BLACK_PRIMARY}
            renderTitle={this._renderTitle}
            renderRightItem={this._renderRightItem}
            >
              <View style={{flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <Image
                    source={{uri: this.state.problemUri}}
                    style={styles.logoImage}
                    resizeMode={'contain'}
                />
                {/* <View style={{width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  
                  <TextInput style={{width: '80%', fontFamily: 'Montserrat-Bold', fontSize: getHeight(18), backgroundColor: '#E0E0E0', height: getHeight(350)}} multiline value={this.state.answer} editable={false} />
                </View> */}
                {
                  this.state.problemData.teacherId !== undefined ? 
                  <View style={{width: '100%', height: getHeight(40), justifyContent: 'flex-start', alignItems: 'flex-end', paddingRight: getWidth(30)}}>
                    <TouchableOpacity onPress={() => this._clickChat()}>
                      <Chat size={getHeight(30)} color={'#000000'} /> 
                    </TouchableOpacity>
                  </View>
                  : null
                }
              </View>
              

              {
                this.state.modalVisible == true ? 
                <View style={styles.modalContainerView}>
                  <View style={styles.modalView}>
                    <View style={styles.modalMark}>
                      <Image style={styles.modalLogoLeft} source={MARK_IMAGE} resizeMode={'contain'} /> 
                    </View>
                    <View style={styles.modalTitleView}>
                      <Text style={styles.modalTitle}>Rate Your Teacher</Text>
                    </View>
                    <View style={styles.starView}>
                      <TouchableOpacity onPress={() => {this.setState({teacherRate: 1})}}>
                        {
                          this.state.teacherRate > 0 ? 
                          <Star width={getWidth(28)} height={getHeight(27)} color={GREEN_PRIMARY} />
                          :
                          <BStar width={getWidth(28)} height={getHeight(27)} color={'#FFFFFF'} stroke={BLACK_PRIMARY} />
                        }
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => {this.setState({teacherRate: 2})}}>
                        {
                          this.state.teacherRate > 1 ? 
                          <Star width={getWidth(28)} height={getHeight(27)} color={GREEN_PRIMARY} />
                          :
                          <BStar width={getWidth(28)} height={getHeight(27)} color={'#FFFFFF'} stroke={BLACK_PRIMARY} />
                        }
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => {this.setState({teacherRate: 3})}}>
                        {
                          this.state.teacherRate > 2 ? 
                          <Star width={getWidth(28)} height={getHeight(27)} color={GREEN_PRIMARY} />
                          :
                          <BStar width={getWidth(28)} height={getHeight(27)} color={'#FFFFFF'} stroke={BLACK_PRIMARY} />
                        }
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => {this.setState({teacherRate: 4})}}>
                        {
                          this.state.teacherRate > 3 ? 
                          <Star width={getWidth(28)} height={getHeight(27)} color={GREEN_PRIMARY} />
                          :
                          <BStar width={getWidth(28)} height={getHeight(27)} color={'#FFFFFF'} stroke={BLACK_PRIMARY} />
                        }
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => {this.setState({teacherRate: 5})}}>
                        {
                          this.state.teacherRate > 4 ? 
                          <Star width={getWidth(28)} height={getHeight(27)} color={GREEN_PRIMARY} />
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

LearnSolve.navigatorStyle = {
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
        height: getHeight(600),
        marginBottom: getHeight(23),
        
    },
    titleText:{
      fontFamily: 'Montserrat-Regular',
      fontSize: getHeight(16),
      color: BLACK_PRIMARY
    },
    modalView:{
      backgroundColor: PURPLE_MAIN,
      width: getWidth(244),
      height: getHeight(262),
      borderRadius: getHeight(10),
      justifyContent: 'flex-start',
      alignItems: 'center'
    },
    modalLogoLeft:{
      width: getWidth(80),
      height: getHeight(67)
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
      marginTop: getHeight(15),
    },
    modalTitleView:{
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      height: getHeight(36)
    },
    modalTitle: {
      fontFamily: 'Montserrat-Medium',
      fontSize: getHeight(20),
      color: '#FFFFFF'
    },
    phoneNum: {
      fontFamily: 'Montserrat-Medium',
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
      fontFamily: 'Montserrat-Medium',
      fontSize: getHeight(18),
      color: '#FFFFFF'
    },
    modalBtnView: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: getHeight(23)
    },
    modalBtn: {
      width: getWidth(220),
      height: getHeight(36),
      backgroundColor: '#FFFFFF',
      borderRadius: getHeight(10),
      justifyContent: 'center',
      alignItems: 'center'
    },
    modalBtnText: {
      fontFamily: 'Montserrat-Regular',
      fontSize: getHeight(18),
      color: BLACK_PRIMARY
    },
    modalContainerView:{
      flex: 1, 
      width: '100%',
      height: SCREEN_HEIGHT,
      justifyContent: 'center', 
      alignItems: 'center', 
      backgroundColor: 'rgba(0,0,0,0.4)',
      position: 'absolute',
      top: 0, 
      left: 0,
    }
})

const mapStateToProps = (state) => ({
  messages: state.chat,
  session: state.session
})

export default connect(mapStateToProps)(LearnSolve);