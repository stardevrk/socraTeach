import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
    Image,
    Dimensions,
    CameraRoll
} from 'react-native';
import Page from '../components/basePage';
import MenuPage from '../components/menuPage';
import {getWidth, getHeight} from '../constants/dynamicSize';
import BaseButton from '../components/baseButton';
import MenuButton from '../components/menuButton';
import Crop from '../components/icons/crop';
import navigationService from '../navigation/navigationService';
import pages from '../constants/pages';
import {uploadImage} from '../service/firebase';
import {auth, firestore} from '../constants/firebase';
// import BlurOverlay,{closeOverlay,openOverlay} from 'react-native-blur-overlay';
import ImagePicker from 'react-native-image-picker';
import {connect} from 'react-redux';
import {getMyInitLearnList} from '../controller/learn';

const LOGO_IMAGE = require('../assets/images/logo.png');

const IMAGE_WIDTH = Dimensions.get('screen').width > 500 ? getWidth(360) / 3 : (Dimensions.get('screen').width - 15) / 3;

class ImageCrop extends Component {

  constructor(props) {
    super(props);
    this.state = {
      imageSource: '',
      subject: '',
      loading: false
    }

    props.navigation.addListener('didFocus', payload => {
      // console.log("Navigation Event Payload === ", payload);
      this.setState({imageSource: payload.action.params.imageUri, subject: payload.action.params.subject});
    })
  }

  goForward = async () => {
    if (this.state.imageSource == '' || this.state.subject == '') {
      console.log("Not be able to go forward")
      return;
    }
    this.setState({loading: true});    
    uploadImage(this.state.imageSource).then((data) => {
      let newDocRef  = firestore.collection(this.state.subject).doc();
      newDocRef.set({
        problemId: newDocRef.id,
        posterId: auth.currentUser.uid,
        problemImage: data,
        updateTime: Date.now(),
        sessionExist: false,
        subject: this.state.subject
      }).finally(() => {
        this.setState({loading: false});
      });
      const {dispatch} = this.props;
      dispatch(getMyInitLearnList());
      navigationService.navigate(pages.LEARN_HISTORY);
    })
    
  }

  componentDidMount() {
    // openOverlay();
    
  }

  render () {
    return (
        <MenuPage forceInset={{bottom: 'never'}} titleText={'LEARN'}>
          <View style={styles.container}>
            <View style={styles.headView}>
              
                <Crop size={getHeight(44)} color={'#FFFFFF'} />
                <Text style={{color: '#FFFFFF', fontFamily: 'Montserrat-Regular', fontSize: getHeight(24), flex: 1, textAlign: 'center'}}>
                  Select Your Problem
                </Text> 
            </View>
            <View style={styles.libraryView}>
              <Image style={{width: '100%', height: '100%', borderRadius: getHeight(10),}} source={{uri: this.state.imageSource}}/>
            </View>
            <View style={styles.btnView}>
              <BaseButton 
                  text={'CONTINUE'}
                  onClick={this.goForward}
                  loading={this.state.loading}
              />
            </View>
          </View>
          
        </MenuPage>
    )
  }
}

ImageCrop.navigatorStyle = {
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
    headView: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: '100%',
      paddingLeft: getWidth(23),
      marginBottom: getHeight(90)
    },
    titleView: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: '100%',
      
    },
    libraryView: {
      width: getWidth(316),
      height: getHeight(410),
      borderRadius: getHeight(10),
      backgroundColor: '#FFFFFF'
    },
    btnView: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: getHeight(40)
    },
    btnMask: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      backgroundColor: 'rgba(0,0,0,0.8)'
    }
})

const mapStateToProps = (state) => ({
  
})

export default connect(mapStateToProps)(ImageCrop);