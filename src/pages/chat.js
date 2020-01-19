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
import {sendMessage} from '../controller/chat';
import { SafeAreaView } from 'react-navigation';
import {auth} from '../constants/firebase';

const LOGO_IMAGE = require('../assets/images/logo.png');

class ChatScreen extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
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
          prevMessages: [],
          subject: '',
          problemData: {},
          prevScreen: ''
        }

        props.navigation.addListener('didFocus', payload => {
          // let problemData = payload.action.params.problem;
          // console.log(payload.action.params)
          this.setState({subject: payload.action.params.subject, problemData: payload.action.params.problem, prevScreen: payload.action.params.prevScreen});
        })
    }
    
    
    static getDerivedStateFromProps (props, state) {

        if (props.chat == null || props.chat == undefined) {
          return null;
        }

        if (props.chat.messages == null || props.chat.users == undefined || props.chat.users == null || props.chat.users == undefined) {
          return null;
        }
          
        const {messages} = props.chat
        const {users} = props.chat
        if (messages !== state.prevMessages) {
          
          const messagesRaw = _.map(messages, item => {
            return (
              {
                _id: item.id,
                text: item.text,
                createdAt: item.createdAt,
                timestamp: item.timestamp,
                user: {
                  _id: item.sentBy,
                  name: users[item.sentBy].userName
                }
              }
            )
          });
          const sortedMessages = _.orderBy(messagesRaw, ['timestamp'], ['desc']);
          return {
            messages: sortedMessages,
            previousState: messages
          }
        }
        else {
          return null;
        }
    }

    goBack = () => {
      if (this.state.prevScreen == 'thSolve') {
        navigationService.navigate(pages.TEACH_SOLVE, {subject: this.state.subject, problem: this.state.problemData});
      } else {
        navigationService.navigate(pages.LEARN_SOLVE, {subject: this.state.subject, problem: this.state.problemData});
      }
    }

    onSend = (messages = []) => {
      const {dispatch}  = this.props;
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }));
      for (const message of messages) {
        dispatch(sendMessage(this.state.subject.toLowerCase(), this.state.problemData.problemId, message));
      }
      //  sendMessage(this.state.subject.toLocaleUpperCase(), this.state.problemId, messages)
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
                  messages={this.state.messages}
                  onSend={messages => this.onSend(messages)}
                  user={{
                    _id: auth.currentUser.uid,
                  }}
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
    chat: state.chat
  })
  
export default connect(mapStateToProps)(ChatScreen);