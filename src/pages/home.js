import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
    Image,
    Alert
} from 'react-native';
import Page from '../components/basePage';
// import MenuPage from '../components/menuPage';
import TopBarPage from '../components/topBarPage';
import {getWidth, getHeight} from '../constants/dynamicSize';
import {notifications} from '../constants/firebase';
import BaseButton from '../components/baseButton';
import MenuButton from '../components/menuButton';
import navigationService from '../navigation/navigationService';
import pages from '../constants/pages';
import {connect} from 'react-redux';
import {fetchInitProblem} from '../controller/problem';
import {getMyInitTeachList, clearMyTeachList} from '../controller/teach';
import {getMyInitLearnList, clearMyLearnList} from '../controller/learn';
import {getMyLiveLearnSession, getMyLiveTeachSession, clearMyLTSession} from '../controller/ltsession';
import PushNotificationIOS from "@react-native-community/push-notification-ios"

const LOGO_IMAGE = require('../assets/images/logo.png');
const WORD_LOGO = require('../assets/images/word-logo.png');

class HomeScreen extends Component {

    
    
    constructor(props) {
        super(props);
        this.notificationOpenListener = null;
        this.notificationListener =  null;
        this.state = {}
    }
    learnClick = () => {
        navigationService.navigate(pages.LEARN_SUBJECT);
    }

    teachClick = () => {
        navigationService.navigate(pages.TEACH_SUBJECT);
    }
    
    static getDerivedStateFromProps (props, state) {
        
        return null;
    }

    _renderTitle = () => {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingLeft: getWidth(10)}}>
                <Image 
                    style={{width: getWidth(191), height: getHeight(28)}}
                    resizeMode={'contain'}
                    source={WORD_LOGO}
                />
            </View>
            
        )
    }

    componentDidMount() {
        const {dispatch} = this.props;
      dispatch(clearMyLearnList());
      dispatch(clearMyTeachList());
      dispatch(clearMyLTSession());
      dispatch(getMyInitLearnList());
      dispatch(getMyInitTeachList());
      dispatch(getMyLiveLearnSession());
      dispatch(getMyLiveTeachSession());
    //   notifications.getInitialNotification().then(value => {
    //       console.log("Notification value = ", value);
    //     //     Alert.alert(
    //     //     'YOUR SUBJECT',
    //     //     value,
    //     //     [
    //     //       {
    //     //         text: 'OK',
    //     //         onPress: () => console.log('Cancel Pressed'),
    //     //         style: 'cancel'
    //     //       }
    //     //     ],
    //     //     {cancelable: false}
    //     //   )

    //     firebase.notifications().getInitialNotification()
    //     .then((notificationOpen) => {
    //         if (notificationOpen) {
    //         // App was opened by a notification
    //         // Get the action triggered by the notification being opened
    //         const action = notificationOpen.action;
    //         // Get information about the notification that was opened
    //         const notification = notificationOpen.notification;  
    //         }
    //     });

    //   })
        this.notificationOpenListener = notifications.onNotificationOpened((notificationOpen) => {
            console.log("Notification Opened ", notificationOpen.notification);
            // Get the action triggered by the notification being opened
            const action = notificationOpen.action;
            // Get information about the notification that was opened
            const notification = notificationOpen.notification;
        });

        this.notificationListener = notifications.onNotification((notification) => {
            console.log("Notification Received ", notification.body);
            console.log("Notification Received ", notification.title);
            PushNotificationIOS.presentLocalNotification({
               alertBody: notification.body,
               alertTitle: notification.title,  
            })
        })
    }

    componentWillUnmount() {
        this.notificationOpenListener();
        this.notificationListener();
    }

    render () {
        return (
            <TopBarPage renderTitle={this._renderTitle} rightExist={true}>
                <View style={styles.container}>
                    <Image
                        source={LOGO_IMAGE}
                        style={styles.logoImage}
                        resizeMode={'contain'}
                    />
                    <BaseButton 
                        text={'LEARN'}
                        onClick={this.learnClick}
                        buttonStyle={{marginBottom: getHeight(23)}}
                    />
                    <BaseButton 
                        text={'TEACH'}
                        onClick={this.teachClick}
                    />
                </View>
            </TopBarPage>
        )
    }
}

HomeScreen.navigatorStyle = {
    navBarHidden: true,
    statusBarBlur: false
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        
    },
    logoImage: {
        width: getWidth(291),
        height: getHeight(151),
        marginBottom: getHeight(23),
        
    }
})

const mapStateToProps = (state) => ({
    subjects: state.subject
  })
  
  export default connect(mapStateToProps)(HomeScreen);