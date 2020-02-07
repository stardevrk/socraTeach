import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
    Image,
    KeyboardAvoidingView,
    Platform
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
import {GiftedChat, Actions} from 'react-native-gifted-chat';
import _ from 'lodash';
import {auth} from '../constants/firebase';
import {getChatUsers, getInitChats, clearChatsData, getMoreChats, sendMessage} from '../controller/chat';
import ActionSheet from 'react-native-action-sheet';
import ImagePicker from 'react-native-image-picker';
import {uploadImage} from '../service/firebase';

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
          prevSession: {},
          sessionTimer: null,
          loading: false
        }

        props.navigation.addListener('didFocus', payload => {
          // let problemData = payload.action.params.problem;
          // console.log(payload.action.params)
          console.log("Chat Screen Payload ========== ", payload);

          let problemData = payload.state.params !== undefined ? payload.state.params.problem : payload.action.params.problem;
          let subject = payload.state.params !== undefined ? payload.state.params.subject : payload.action.params.subject;
          let prevScreen = payload.state.params !== undefined ? payload.state.params.prevScreen : payload.action.params.prevScreen;
          // tempProblemId = problemData.problemId;
          let timer = payload.state.params !== undefined ? payload.state.params.timer : payload.action.params.timer;
          this.setState({prevScreen: prevScreen, sessionTimer: timer});


          
          // this.setState({subject: subject, problemData: problemData, prevScreen: prevScreen});
          // if (this.state.subject !== '') {
          //   this.props.dispatch(clearChatsData());
          // this.props.dispatch(getChatUsers(subject.toLowerCase(), tempProblemId));
          // this.props.dispatch(getInitChats(subject.toLowerCase(), tempProblemId));
          // }
        })
    }
    
    
    static getDerivedStateFromProps (props, state) {
        /** Commented By Me*/
        // const subject = props.session.subject;
        // const problemId = props.session.problemId;
        // // let newSession = props.session;

        // if (props.chat == null || props.chat == undefined) {
        //   return null;
        // }
        
        // if (state.prevSession !== props.session) {
        //   props.dispatch(clearChatsData(subject.toLowerCase(), problemId));
        //   props.dispatch(getInitChats(subject.toLowerCase(), problemId));
        //   return {
        //     prevSession: props.session,
        //     subject: subject,
        //     problemData: props.session.problemData
        //   }
        // }

        // if (props.chat.messages == undefined) {
        //   return {
        //     messages: []
        //   }
        // }

        // const loading = props.chat.loading != undefined ? props.chat.loading : false;
        // const earlierLodable = props.chat.earlierLodable != undefined ? props.chat.earlierLodable : true;
        // // console.log("Session next ********************", props.session); 
        // const {messages} = props.chat;
        // console.log("Message Item $$$$$$$$$$=", messages);

        // let chatUserName = '';
        // if (props.session.sessionType == 'teach_session') {
        //   chatUserName = props.session.poster != undefined ? props.session.poster.userName : '';
        // }

        // if (props.session.sessionType == 'learn_session') {
        //   chatUserName = props.session.teacher != undefined ? props.session.teacher.userName : '';
        // }
        
        // if (messages !== state.prevMessages) {
          
        //   const messagesRaw = _.map(messages, item => {
        //     let newItem = {
        //         _id: item._id,
        //         text: item.text,
        //         image: item.image,
        //         createdAt: item.createdAt,
        //         timestamp: item.timestamp,
        //         user: {
        //           _id: item.sentBy,
        //           name: chatUserName
        //         }
        //       }
        //     return newItem;
        //   });
          
        //   const sortedMessages = _.orderBy(messagesRaw, ['timestamp'], ['desc']);
        //   return {
        //     messages: sortedMessages,
        //     prevMessages: messages,
        //     loadingEarlier: loading,
        //     earlierLodable: earlierLodable,
        //   }
        // }
        // else {
        //   return {
        //     loadingEarlier: loading,
        //     earlierLodable: earlierLodable,
        //   };
        // }
        /** Commented By Me*/
    }

    goBack = () => {
      if (this.state.prevScreen == 'thSolve') {
        navigationService.navigate(pages.TEACH_SOLVE, {subject: this.props.session.subject, problem: this.props.session.problemData});
      } else {
        navigationService.navigate(pages.LEARN_SOLVE, {subject: this.props.session.subject, problem: this.props.session.problemData});
      }
    }

    onSend = (messages = []) => {
      /** Commented By Me*/
      // const {dispatch, session}  = this.props;
      // if (this.state.sessionTimer != null) {
      //   // clearInterval(this.state.sessionTimer);  
      // }
      
      // // this.setState(previousState => ({
      // //   messages: GiftedChat.append(previousState.messages, messages),
      // // }));
      // if (this.state.messages.length > 0) {
      //   for (const message of messages) {
      //     dispatch(sendMessage(session.subject.toLowerCase(), session.problemData.problemId, message, false));
      //   }
      // } else {
        
      //   for (const message of messages) {
      //     dispatch(sendMessage(session.subject.toLowerCase(), session.problemData.problemId, message, true));
      //   }
      // }
      
      // this.giftedChatRef.scrollToBottom();
      /** Commented By Me*/
      //  sendMessage(this.state.subject.toLocaleUpperCase(), this.state.problemId, messages)
    }

    _loadEarlierMessages = () => {
      this.setState({loadingEarlier: true});
      const {dispatch} = this.props;
      const {session} =  this.props;
      // console.log("Load More Chats! !!!!!!!1", session.subject, session.problemData.problemId);
      /** Commented By Me*/
      // dispatch(getMoreChats(session.subject.toLowerCase(), session.problemData.problemId));
      /** Commented By Me*/
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

    _renderActions = () => {
      return (
        <Actions 
          onPressActionButton={this._pressActionButton}
        />
      )
    }

    _imagePickandSend = () => {
      const options = {
        title: 'Select Image',
        customButtons: [],
        storageOptions: {
          skipBackup: true,
          path: 'chat_images',
        },
      };
      
      ImagePicker.launchImageLibrary(options, (response) => {
        console.log("Image Picker Response = ", response);
        /** Commented By Me*/
        // if (response.uri != undefined && response.uri != null && response.uri != '' ) {
        //   this.setState({loading: true});
        //   let imageToBeUploaded = '';
        //   if (Platform.OS == 'ios') {
        //     imageToBeUploaded = response.uri;
        //   } else if (Platform.OS == 'android') {
        //     let absPath = 'file://' + response.path;
        //     imageToBeUploaded = absPath;
        //   } else {
        //     imageToBeUploaded = response.uri;
        //   }

        //   const {dispatch, session} = this.props;
        //   uploadImage(imageToBeUploaded).then((data) => {
        //     const newMessage = {
        //       _id: 'image_message_' + Date.now(),
        //       createdAt: new Date(),
        //       image: data,
        //       user: 
        //       {_id: auth.currentUser.uid}
        //     }
        //     if (this.state.messages.length > 0) {
              
        //         dispatch(sendMessage(session.subject.toLowerCase(), session.problemData.problemId, newMessage, false));
        //     } else {
        //         dispatch(sendMessage(session.subject.toLowerCase(), session.problemData.problemId, newMessage, true));
        //     }
        //   }).finally(() => {
        //     this.setState({loading: false});
        //   })
        // }
        /** Commented By Me*/
      })
    }

    _imageTakeandSend = () => {
      const options = {
        title: 'Select Image',
        customButtons: [],
        storageOptions: {
          skipBackup: true,
          path: 'chat_images',
        },
      };

      ImagePicker.launchCamera(options, (response)=> {
        console.log("Image Picker Response = ", response);
        
        if (response.uri != undefined && response.uri != null && response.uri != '' ) {
          this.setState({loading: true});
          let imageToBeUploaded = '';
          if (Platform.OS == 'ios') {
            imageToBeUploaded = response.uri;
          } else if (Platform.OS == 'android') {
            let absPath = 'file://' + response.path;
            imageToBeUploaded = absPath;
          } else {
            imageToBeUploaded = response.uri;
          }

          const {dispatch, session} = this.props;
          uploadImage(imageToBeUploaded).then((data) => {
            const newMessage = {
              _id: 'image_message_' + Date.now(),
              createdAt: new Date(),
              image: data,
              user: 
              {_id: auth.currentUser.uid}
            }
            if (this.state.messages.length > 0) {
                dispatch(sendMessage(session.subject.toLowerCase(), session.problemData.problemId, newMessage, false));
            } else {
                dispatch(sendMessage(session.subject.toLowerCase(), session.problemData.problemId, newMessage, true));
            }
          }).finally(() => {
            this.setState({loading: false});
          })
        }
      })
    }

    _pressActionButton = () => {
      const options = [
        'Image From Library',
        'Image From Camera',
        'Cancel',
      ]
      const cancelButtonIndex = options.length - 1
      
      ActionSheet.showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex,
        },
        async buttonIndex => {
          // const { onSend } = this.props
          switch (buttonIndex) {
            case 0:
              // pickImageAsync(onSend)
              this._imagePickandSend();
              return
            case 1:
               this._imageTakeandSend();
              return
            case 2:
              // getLocationAsync(onSend)
            default:
          }
        },
      )
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
                  renderActions={this._renderActions}
                  // onPressActionButton={this._pressActionButton}
                />
                {
                  this.state.loading == true ? 
                  <View style={{position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)'}}>
                    <ActivityIndicator size={'large'} />
                  </View>
                  : null
                }
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