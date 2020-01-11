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
import navigationService from '../navigation/navigationService';
import pages from '../constants/pages';
import CameraRollPicker from '../components/cameraRollPicker/index';
import CameraRollGallery from '../components/cameraRollBrowser/index';
import BlurOverlay,{closeOverlay,openOverlay} from 'react-native-blur-overlay';
import { RNCamera } from 'react-native-camera';

const LOGO_IMAGE = require('../assets/images/logo.png');

const IMAGE_WIDTH = Dimensions.get('screen').width > 500 ? getWidth(360) / 3 : (Dimensions.get('screen').width - 15) / 3;

export default class Camera extends Component {

  constructor(props) {
    super(props);

    this.state = {
      num: 0,
      selectedImage: "",
      selected: false,

      flash: 'off',
      zoom: 0,
      autoFocus: 'on',
      autoFocusPoint: {
          normalized: { x: 0.5, y: 0.5 }, // normalized values required for autoFocusPointOfInterest
          drawRectPosition: {
              x: Dimensions.get('window').width * 0.5 - 32,
              y: Dimensions.get('window').height * 0.5 - 32,
          },
      },
      depth: 0,
      type: 'back',
      whiteBalance: 'auto',
      ratio: '16:9',
      recordOptions: {
          mute: false,
          maxDuration: 50,
          fixOrientation: true,
          skipProcessing: false,
          quality: RNCamera.Constants.VideoQuality["288p"]
      },
      isRecording: false,
      canDetectFaces: false,
      canDetectText: false,
      canDetectBarcode: false,
      faces: [],
      textBlocks: [],
      barcodes: [],
      defaultBtn: 'photo',
      intervalReference: null,
      time: new Date().toLocaleTimeString(),
      countdown: 0,
      sec_Right: 0,
      pause: false
    };

    this.getSelectedImages = this.getSelectedImages.bind(this);
  }

  photoSelect = () => {
    navigationService.navigate(pages.PROBLEM_CROP);
  }

  componentDidMount() {
    openOverlay();
  }

  getSelectedImages(images, current) {
    
    let num = images.length;

    if (images.length > 0) {
      closeOverlay();
    } else {
      openOverlay();
    }

    this.setState({
      num: num,
      selected: images,
    });

    console.log(current);
    console.log(this.state.selected);
  }

  _onSelectImage = (imgId, index, uri) => {
    console.log("SelectedImage URI = ", uri);
    this.setState({selected: true, selectedImage: uri});
  }

  render () {
      return (
          <MenuPage forceInset={{bottom: 'never'}} titleText={'LEARN'}>
            <View style={styles.libraryView}>
              <RNCamera
                  ref={ref => {
                      this.camera = ref;
                  }}
                  style={{
                      flex: 1,
                      justifyContent: 'space-between',
                  }}
                  type={this.state.type}
                  flashMode={this.state.flash}
                  autoFocus={this.state.autoFocus}
                  autoFocusPointOfInterest={this.state.autoFocusPoint.normalized}
                  zoom={this.state.zoom}
                  whiteBalance={this.state.whiteBalance}
                  ratio={this.state.ratio}
                  focusDepth={this.state.depth}
                  permissionDialogTitle={'Permission to use camera'}
                  permissionDialogMessage={'We need your permission to use your camera phone'}
              >
              </RNCamera>
            </View>
            <View style={styles.btnView}>
              <BaseButton 
                  text={'TAKE'}
                  onClick={this.photoSelect}
                  textStyle={this.state.selected == false ? {color: 'gray'} : {}}
              />
            </View>
          </MenuPage>
      )
  }
}

Camera.navigatorStyle = {
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
    libraryView: {
      width: '100%',
      height: getHeight(576),
      backgroundColor: '#FFFFFF'
    },
    btnView: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      // paddingBottom: getHeight(40)
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