import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
    Image,
    TouchableOpacity,
    Alert,
    Platform
} from 'react-native';
import Page from '../components/basePage';
import {getWidth, getHeight} from '../constants/dynamicSize';
import {BLACK_PRIMARY, PURPLE_MAIN} from '../constants/colors';
import BaseButton from '../components/baseButton';
import MenuButton from '../components/menuButton';
import Triangle from '../components/icons/triangle';
import Algebra from '../components/icons/algebra';
import Geometry from '../components/icons/geometry';
import Physics from '../components/icons/physics';
import Chemistry from '../components/icons/chemistry';
import navigationService from '../navigation/navigationService';
import pages from '../constants/pages';
import ModalDropdown from '../components/dropDownList';
import MenuPage from '../components/menuPage';
import TopBarPage from '../components/topBarPage';
import ImagePicker from 'react-native-image-picker';
import {connect} from 'react-redux';
import {getMyInitLearnList, clearMyLearnList} from '../controller/learn';

const LOGO_IMAGE = require('../assets/images/logo.png');

class LearnScreen extends Component {

  constructor(props) {
    super(props);

    this.state={
      modalOpened: false,
      subjectArray: [
        {
          iconName: 'algebra',
          name: 'Algebra'
        },
        {
          iconName: 'physics',
          name: 'Physics'
        },
        {
          iconName: 'geometry',
          name: 'Geometry'
        },
        {
          iconName: 'chemistry',
          name: 'Chemistry'
        }
      ],
      subject: ''
    }

    console.log("Redux Store Subjects =", props.subjects);
  }

  modalWillShow = () => {
    console.log("$$$$$$$");
    this.setState({modalOpened: true});
    // openOverlay();
  }

  modalWillHide = () => {
    console.log("######");
    this.setState({modalOpened: false});
    // closeOverlay();
  }

  renderModalListRow = (rowData, rowID, highlighted) => {
    switch (rowData.iconName) {
      case 'algebra': 
        return (
          <View style={styles.mListItem}>
            <Algebra size={getHeight(12)} color={'#FFFFFF'} />
            <Text style={styles.modalListText}>{rowData.name}</Text>
          </View>
        )
      case 'physics': 
        return (
          <View style={styles.mListItem}>
            <Physics size={getHeight(12)} color={'#FFFFFF'} />
            <Text style={styles.modalListText}>{rowData.name}</Text>
          </View>
        )
      case 'geometry': 
        return (
          <View style={styles.mListItem}>
            <Geometry size={getHeight(12)} color={'#FFFFFF'} />
            <Text style={styles.modalListText}>{rowData.name}</Text>
          </View>
        )
      case 'chemistry': 
        return (
          <View style={styles.mListItem}>
            <Chemistry size={getHeight(12)} color={'#FFFFFF'} />
            <Text style={styles.modalListText}>{rowData.name}</Text>
          </View>
        )
      default:
        return (
          <View style={styles.mListItem}>
            <Algebra size={getHeight(12)} color={'#FFFFFF'} />
            <Text style={styles.modalListText}>{rowData.name}</Text>
          </View>
        )
    }
    
  }

  renderModalListText = (rowData) => {
    console.log('rowData', rowData);
    return `${rowData.name}`;
  }

  renderModalSeparator = () => {
    return (
      <View style={{width: '100%', height: 2, backgroundColor: PURPLE_MAIN}}></View>
    )
  }

  checkSubject = () => {
    if (this.state.subject == '') {
      Alert.alert(
        'YOUR SUBJECT',
        'Please select your subject',
        [
          {
            text: 'OK',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          }
        ],
        {cancelable: false}
      )
    }
  }

  libraryClick = () => {
    if (this.state.subject == '') {
      Alert.alert(
        'YOUR SUBJECT',
        'Please select your subject',
        [
          {
            text: 'OK',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          }
        ],
        {cancelable: false}
      )
      return;
    }
    const options = {
      title: 'Select Problem Image',
      customButtons: [],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log("Image Picker Response = ", response);
      if (response.uri != undefined && response.uri != null && response.uri != '' ) {
        const subject = this.state.subject.toLowerCase();
        if (Platform.OS == 'ios') {
          navigationService.navigate(pages.PROBLEM_CROP, {imageUri: response.uri, imageWidth: response.width, imageHeight: response.height, subject: subject});
        } else if (Platform.OS == 'android') {
          let absPath = 'file://' + response.path;
          navigationService.navigate(pages.PROBLEM_CROP, {imageUri: absPath, imageWidth: response.width, imageHeight: response.height, subject: subject});
        } else {
          navigationService.navigate(pages.PROBLEM_CROP, {imageUri: response.uri, imageWidth: response.width, imageHeight: response.height, subject: subject});
        }
      }
    })
  }

  cameraClick = () => {
    if (this.state.subject == '') {
      Alert.alert(
        'YOUR SUBJECT',
        'Please select your subject',
        [
          {
            text: 'OK',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          }
        ],
        {cancelable: false}
      )
      return;
    }
    const subject = this.state.subject.toLowerCase();
    navigationService.navigate(pages.CAMERA, {subject: subject});
  }

  _subjectSelect = (subject) => {
    // console.log("Subject Text = ", subject);
    this.setState({subject: subject});
  }

  _skipUpload = () => {
    const {dispatch} = this.props;
    dispatch(clearMyLearnList());
    dispatch(getMyInitLearnList());
    navigationService.navigate(pages.LEARN_HISTORY);
  }

  _gotoLearn = () => {
    // navigationService.navigate(pages.LEARN_START);
    navigationService.navigate(pages.SESSION);
  }

  render () {
    const {subjects} = this.props;
    return (
        <TopBarPage titleText={'LEARN'} forceInset={{bottom: 'never'}} onRightClick={this._gotoLearn} notiExist={true} rightExist={true}>
          <View style={styles.workingPart}>
            <Text
              style={styles.title}
            >
              Subject
            </Text>
            <View style={styles.modalPart}>
              <ModalDropdown options={subjects.subject} 
                descPart={
                    <Triangle width={getHeight(16)} height={getHeight(16)} color={'#FFFFFF'} />
                }
                style={{width: getWidth(276)}}
                textStyle={{color: '#FFFFFF', fontSize: getHeight(18), fontFamily: 'Montserrat-Regular'}}
                dropdownStyle={{backgroundColor: BLACK_PRIMARY, width: getWidth(276), marginTop: getHeight(3), height: getHeight(128)}}
                buttonStyle={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}
                dropdownTextStyle={{backgroundColor: BLACK_PRIMARY, color: '#FFFFFF'}}
                dropdownTextHighlightStyle={{color: '#FFFFFF'}}
                onDropdownWillShow={this.modalWillShow}
                onDropdownWillHide={this.modalWillHide}
                renderSeparator={this.renderModalSeparator}
                renderRow={this.renderModalListRow}
                renderButtonText={this.renderModalListText}
                defaultValue={'Choose Your Subject'}
                onExtractBtnText={this._subjectSelect}
              >
              </ModalDropdown>
            </View>
            <View style={styles.belowPart}>
                <View style={styles.blackPart}>
                  <Text style={styles.uploadText}>
                    Upload
                  </Text>
                  <BaseButton 
                    text={'TAKE PICTURE'}
                    onClick={this.cameraClick}
                    buttonStyle={{marginBottom: getHeight(31)}}
                  />
                  <BaseButton 
                    text={'CAMERA ROLL'}
                    onClick={this.libraryClick}
                  />
                </View>
            </View>
          </View>
        </TopBarPage>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingTop: getHeight(80)
    },
    headerTitle: {
      width: '100%',
      textAlign: 'center',
      fontSize: getHeight(24),
      fontFamily: 'Montserrat-Regular',
      color: '#FFFFFF',
      position: 'absolute',
      top: getHeight(20)
    },
    workingPart: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: '100%',
    },
    title: {
      width: '100%',
      fontFamily: 'Montserrat-Medium',
      color: '#FFFFFF',
      fontSize: getHeight(30),
      paddingLeft: getWidth(52),
      marginBottom: getHeight(44),
      marginTop: getHeight(126)
    },
    dropDescText: {
      color: '#FFFFFF',
      fontFamily: 'Montserrat-Regular',
      fontSize: getHeight(18),
      marginBottom: getHeight(8)
    },
    modalPart: {
      alignSelf: 'flex-start', 
      marginLeft: getWidth(52)
    },
    belowPart: {
      flex: 1,
      width: '100%',
      justifyContent: 'flex-end'
    },
    blackPart: {
      width: '100%',
      height: getHeight(338),
      backgroundColor: BLACK_PRIMARY,
      alignItems: 'center'
    },
    uploadText: {
      color: '#FFFFFF',
      fontFamily: 'Montserrat-Bold',
      fontSize: getHeight(30),
      width: '100%',
      marginTop: getHeight(33),
      paddingLeft: getWidth(50),
      marginBottom: getHeight(40)
    },
    mListItem: {
      flexDirection: 'row',
      width: '100%',
      paddingLeft: getWidth(19),
      alignItems: 'center',
      height: getHeight(30)
    },
    modalListText: {
      fontFamily: 'Montserrat-Regular',
      fontSize: getHeight(16),
      color: '#FFFFFF',
      marginLeft: getWidth(21)
    }
})

const mapStateToProps = (state) => ({
  subjects: state.subject
})

export default connect(mapStateToProps)(LearnScreen);