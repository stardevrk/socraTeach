import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
    Image,
    KeyboardAvoidingView
} from 'react-native';
import Page from '../components/basePage';
import MenuPage from '../components/menuPage';
import {getWidth, getHeight} from '../constants/dynamicSize';
import BaseButton from '../components/baseButton';
import MenuButton from '../components/menuButton';
import navigationService from '../navigation/navigationService';
import pages from '../constants/pages';
import NavButton from '../components/navButton';
import {connect} from 'react-redux';
import {GiftedChat} from 'react-native-gifted-chat';
import _ from 'lodash';
import {auth} from '../constants/firebase';
import {getChatUsers, getInitChats, clearChatsData, getMoreChats, sendMessage} from '../controller/chat';

const LOGO_IMAGE = require('../assets/images/logo.png');

class ChatScreen extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
          messages: [],
          prevMessages: [],
          subject: '',
          problemData: {},
          prevScreen: '',
          loadingEarlier: false,
          earlierLodable: false,
          // session: {},
          prevSession: {}
        }

        props.navigation.addListener('didFocus', payload => {
          // let problemData = payload.action.params.problem;
          // console.log(payload.action.params)
          // console.log("Chat Screen Payload ========== ", payload);

          let problemData = payload.state.params !== undefined ? payload.state.params.problem : payload.action.params.problem;
          let subject = payload.state.params !== undefined ? payload.state.params.subject : payload.action.params.subject;
          let prevScreen = payload.state.params !== undefined ? payload.state.params.prevScreen : payload.action.params.prevScreen;
          tempProblemId = problemData.problemId;
          this.setState({prevScreen: prevScreen});
          
          // this.setState({subject: subject, problemData: problemData, prevScreen: prevScreen});
          // if (this.state.subject !== '') {
          //   this.props.dispatch(clearChatsData());
          // this.props.dispatch(getChatUsers(subject.toLowerCase(), tempProblemId));
          // this.props.dispatch(getInitChats(subject.toLowerCase(), tempProblemId));
          // }
        })
    }
    
    
    static getDerivedStateFromProps (props, state) {

        const subject = props.session.subject;
        const problemId = props.session.problemId;
        // let newSession = props.session;

        if (props.chat == null || props.chat == undefined) {
          return null;
        }
        
        if (state.prevSession !== props.session) {
          props.dispatch(clearChatsData(subject.toLowerCase(), problemId));
          props.dispatch(getChatUsers(subject.toLowerCase(),problemId));
          props.dispatch(getInitChats(subject.toLowerCase(), problemId));
          return {
            prevSession: props.session,
            subject: subject,
            problemData: props.session.problemData
          }
        }

        // console.log("Session Users ======= ***************", props.session);

        if (props.chat.users == undefined) {
          return null;
        }

        if (props.chat.messages == undefined) {
          return {
            messages: []
          }
        }

        // console.log("Session prev ======= ***************", state.prevMessages);
        // console.log("Session next ********************", props.chat.messages);

        const loading = props.chat.loading != undefined ? props.chat.loading : false;
        const earlierLodable = props.chat.earlierLodable != undefined ? props.chat.earlierLodable : true; 
        const {messages} = props.chat;
        const {users} = props.chat;
        
        if (messages !== state.prevMessages) {
          
          const messagesRaw = _.map(messages, item => {
            
            let newItem = {
                _id: item._id,
                text: item.text,
                createdAt: item.createdAt,
                timestamp: item.timestamp,
                user: {
                  _id: item.sentBy,
                  name: users[item.sentBy].userName
                }
              }
            return newItem;
          });
          const sortedMessages = _.orderBy(messagesRaw, ['timestamp'], ['desc']);
          return {
            messages: sortedMessages,
            prevMessages: messages,
            loadingEarlier: loading,
            earlierLodable: earlierLodable,
          }
        }
        else {
          return {
            loadingEarlier: loading,
            earlierLodable: earlierLodable,
          };
        }
    }

    goBack = () => {
      if (this.state.prevScreen == 'thSolve') {
        navigationService.navigate(pages.TEACH_SOLVE, {subject: this.props.session.subject, problem: this.props.session.problemData});
      } else {
        navigationService.navigate(pages.LEARN_SOLVE, {subject: this.props.session.subject, problem: this.props.session.problemData});
      }
    }

    onSend = (messages = []) => {
      const {dispatch, session}  = this.props;
      // this.setState(previousState => ({
      //   messages: GiftedChat.append(previousState.messages, messages),
      // }));
      if (this.state.messages.length > 0) {
        for (const message of messages) {
          dispatch(sendMessage(session.subject.toLowerCase(), session.problemData.problemId, message, false));
        }
      } else {
        console.log("New Teach Session !!!!!!!1");
        for (const message of messages) {
          dispatch(sendMessage(session.subject.toLowerCase(), session.problemData.problemId, message, true));
        }
      }
      
      this.giftedChatRef.scrollToBottom();
      //  sendMessage(this.state.subject.toLocaleUpperCase(), this.state.problemId, messages)
    }

    _loadEarlierMessages = () => {
      this.setState({loadingEarlier: true});
      const {dispatch} = this.props;
      const {session} =  this.props;

      dispatch(getMoreChats(session.subject, session.problemData.problemId));
    }

    componentWillUnmount() {
      this.setState({
        messages: [],
        prevMessages: [],
        subject: '',
        problemData: {},
        prevScreen: '',
        loadingEarlier: false,
        earlierLodable: false,
      })
    }

    render () {
        return (
          <Page backgroundColor={'#FFFFFF'}>
            
              <KeyboardAvoidingView style={{flex: 1, width: '100%'}}>
              <View style={{height: getHeight(40), width: '100%'}}>
                <NavButton 
                  iconName={'md-arrow-back'} 
                  buttonStyle={{position: 'absolute', left: getWidth(16), top: getHeight(10)}}
                  onClick={this.goBack}
                  color={'#000000'}
                />
              </View>
                <GiftedChat
                  ref={ref => this.giftedChatRef = ref}
                  messages={this.state.messages}
                  onSend={messages => this.onSend(messages)}
                  user={{
                    _id: auth.currentUser.uid,
                  }}
                  loadEarlier={this.state.earlierLodable}
                  onLoadEarlier={() => {this._loadEarlierMessages()}}
                  isLoadingEarlier={this.state.loadingEarlier}
                  scrollToBottom={true}
                />
            </KeyboardAvoidingView>
            
          </Page>
        )
    }
}

ChatScreen.navigatorStyle = {
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
        
    }
})

const mapStateToProps = (state) => ({
    subjects: state.subject,
    chat: state.chat,
    session: state.session
  })
  
export default connect(mapStateToProps)(ChatScreen);