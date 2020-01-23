import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
    Image,
    TouchableOpacity,
    Alert
} from 'react-native';
import Page from '../components/basePage';
import {getWidth, getHeight} from '../constants/dynamicSize';
import {BLACK_PRIMARY} from '../constants/colors';
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
import {connect} from 'react-redux';
import _ from 'lodash';
import {fetchInitProblem} from '../controller/problem';

const LOGO_IMAGE = require('../assets/images/logo.png');

class TeachScreen extends Component {

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
    console.log("Problem Subject === ", props.problem);

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
        <View></View>
      )
    }

    // libraryClick = () => {
    //   navigationService.navigate(pages.CAMERA_ROLL);
    // }

    goForward = () => {

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

      const problems = this.props.problem;
      const currentSubject = this.state.subject.toLowerCase();
      const problemObject = _.get(problems, currentSubject, {});
      const problemList = _.get(problemObject, 'problems', []);
      const cardLength = _.get(problemObject, 'problemLength', 0);
      // console.log("Problem Length ==== ", problemList.length);
      
      navigationService.navigate(pages.CHOOSE_PROBLEM, {subject: this.state.subject, cardLength: cardLength});
      
      
    }

    _subjectSelect = (subject) => {
      const {dispatch} = this.props;
      dispatch(fetchInitProblem(subject.toLowerCase()));
      this.setState({subject: subject});
    }

    render () {
      const {subjects} = this.props;
      return (
          <MenuPage forceInset={{bottom: 'never'}} titleText={'TEACH'}>
            <View style={styles.container}>
              <View style={styles.workingPart}>
                  <Text
                      style={styles.title}
                  >
                    Subject
                  </Text>
                  <View style={styles.modalPart}>
                    <ModalDropdown options={subjects.subject} 
                      descPart={
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                          <Text style={styles.dropDescText}>
                            Choose Your Subject
                          </Text>
                          <Triangle width={getHeight(16)} height={getHeight(16)} color={'#FFFFFF'} />
                        </View>
                      }
                      style={{width: getWidth(283)}}
                      textStyle={{color: '#FFFFFF', fontSize: getHeight(10), fontFamily: 'Montserrat-Regular'}}
                      dropdownStyle={{backgroundColor: BLACK_PRIMARY, width: getWidth(150), marginTop: getHeight(3), height: getHeight(120)}}
                      dropdownTextStyle={{backgroundColor: BLACK_PRIMARY, color: '#FFFFFF'}}
                      dropdownTextHighlightStyle={{color: '#FFFFFF'}}
                      onDropdownWillShow={this.modalWillShow}
                      onDropdownWillHide={this.modalWillHide}
                      renderSeparator={this.renderModalSeparator}
                      renderRow={this.renderModalListRow}
                      renderButtonText={this.renderModalListText}
                      onExtractBtnText={this._subjectSelect}
                    >
                    </ModalDropdown>
                  </View>
                  
                </View>
                <View style={{height: getHeight(100), width: '100%', justifyContent: 'flex-start', alignItems: 'center'}}>
                  <BaseButton 
                    text={'CONTINUE'}
                    onClick={this.goForward}
                  />
                </View>
              </View>
            
          </MenuPage>
      )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
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
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      // backgroundColor: '#f3f3f3'
    },
    title: {
      width: '100%',
      fontFamily: 'Montserrat-Regular',
      color: '#FFFFFF',
      marginTop: getHeight(0),
      fontSize: getHeight(40),
      paddingLeft: getWidth(31),
      marginBottom: getHeight(34),
    },
    dropDescText: {
      color: '#FFFFFF',
      fontFamily: 'Montserrat-Regular',
      fontSize: getHeight(18),
      marginBottom: getHeight(8)
    },
    modalPart: {
      alignSelf: 'flex-start', 
      marginLeft: getWidth(31)
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
      fontSize: getHeight(48),
      width: '100%',
      marginTop: getHeight(33),
      paddingLeft: getWidth(34),
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
  subjects: state.subject,
  problem: state.problem
})

export default connect(mapStateToProps)(TeachScreen);