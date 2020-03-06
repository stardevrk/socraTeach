import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
    Image,
    TouchableOpacity
} from 'react-native';
import Page from '../components/basePage';
// import MenuPage from '../components/menuPage';
import TopBarPage from '../components/topBarPage';
import {getWidth, getHeight} from '../constants/dynamicSize';
import {notifications} from '../constants/firebase';
import BaseButton from '../components/baseButton';
import MenuButton from '../components/menuButton';
import Alert from '../components/icons/alert';
import navigationService from '../navigation/navigationService';
import pages from '../constants/pages';
import {connect} from 'react-redux';
import {fetchInitProblem} from '../controller/problem';
import {getMyInitTeachList, clearMyTeachList} from '../controller/teach';
import {getMyInitLearnList, clearMyLearnList} from '../controller/learn';
import {getExpressAccount, fetchBalance} from '../controller/user';
import {getMyLiveLearnSession, getMyLiveTeachSession, clearMyLTSession} from '../controller/ltsession';
import PushNotificationIOS from "@react-native-community/push-notification-ios"
import {GRAY_SECONDARY, PURPLE_MAIN} from '../constants/colors';

const LOGO_IMAGE = require('../assets/images/logo.png');
const WORD_LOGO = require('../assets/images/word-logo.png');

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.notificationOpenListener = null;
        this.notificationListener =  null;
        this.state = {
            modalVisible: false
        }
    }
    learnClick = () => {
        navigationService.navigate(pages.LEARN_SUBJECT);
    }

    teachClick = () => {
        console.log("Home Express Props = ", this.props.bank.express);
        if (this.props.bank.express != null) {
            navigationService.navigate(pages.TEACH_SUBJECT);
        } else {
            this.setState({modalVisible: true});
        }
        
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
      dispatch(getExpressAccount());
      dispatch(fetchBalance());
      dispatch(clearMyLearnList());
      dispatch(clearMyTeachList());
      dispatch(clearMyLTSession());
      dispatch(getMyInitLearnList());
      dispatch(getMyInitTeachList());
      dispatch(getMyLiveLearnSession());
      dispatch(getMyLiveTeachSession());
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
                    <BaseButton 
                        text={'LEARN'}
                        onClick={this.learnClick}
                        buttonStyle={{marginBottom: getHeight(23)}}
                    />
                    <BaseButton 
                        text={'TEACH'}
                        onClick={this.teachClick}
                    />
                    {
                    this.state.modalVisible == true ?
                    <View style={{flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}>
                        <View style={{width: getWidth(244), height: getHeight(262), backgroundColor: GRAY_SECONDARY, borderRadius: getHeight(10), alignItems: 'center'}}>
                        <View style={{flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                            <Alert width={getWidth(44)} height={getHeight(38)} color={PURPLE_MAIN} />
                            <Text style={{color: '#FFFFFF', fontFamily: 'Montserrat-Medium', fontSize: getHeight(18), marginTop: getHeight(29)}}>
                            Add Bank Account to
                            </Text>
                            <Text style={{color: '#FFFFFF', fontFamily: 'Montserrat-Medium', fontSize: getHeight(18)}}>
                            Teach
                            </Text>
                        </View>
                        <TouchableOpacity style={{width: getWidth(220), height: getHeight(36), backgroundColor: '#FFFFFF', borderRadius: getHeight(10), marginBottom: getHeight(23), justifyContent: 'center', alignItems: 'center'}}
                        onPress={() =>{this.setState({modalVisible: false})}}
                        >
                            <Text style={{color: PURPLE_MAIN, fontFamily: 'Montserrat-Medium', fontSize: getHeight(17)}}>OK</Text>
                        </TouchableOpacity>
                        </View>

                    </View>
                    : null
                    }
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
    subjects: state.subject,
    user: state.user,
    bank: state.bank
  })
  
  export default connect(mapStateToProps)(HomeScreen);