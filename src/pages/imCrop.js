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
// import BlurOverlay,{closeOverlay,openOverlay} from 'react-native-blur-overlay';

const LOGO_IMAGE = require('../assets/images/logo.png');

const IMAGE_WIDTH = Dimensions.get('screen').width > 500 ? getWidth(360) / 3 : (Dimensions.get('screen').width - 15) / 3;

export default class ImageCrop extends Component {

  constructor(props) {
    super(props);

  }

  goForward = () => {
    navigationService.navigate(pages.SEARCH_SOPHIST);
  }

  componentDidMount() {
    // openOverlay();
  }

  render () {
      return (
          <MenuPage forceInset={{bottom: 'never'}} titleText={'LEARN'}>
            <View style={styles.headView}>
              
                <Crop size={getHeight(44)} color={'#FFFFFF'} />
                <Text style={{color: '#FFFFFF', fontFamily: 'Montserrat-Regular', fontSize: getHeight(24), flex: 1, textAlign: 'center'}}>
                  Select Your Problem
                </Text>
              
            </View>
            <View style={styles.libraryView}>
            
            </View>
            <View style={styles.btnView}>
              <BaseButton 
                  text={'CONTINUE'}
                  onClick={this.goForward}
              />
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