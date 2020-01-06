import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
    Image,
    TouchableOpacity,
    Dimensions
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
import ModalDropdown from '../components/dropDownCategory';
import MenuPage from '../components/menuPage';
import Swiper from '../components/Swiper/index';

const LOGO_IMAGE = require('../assets/images/logo.png');

const { height, width } = Dimensions.get('window');

// demo purposes only
function * range (start, end) {
  for (let i = start; i <= end; i++) {
    yield i
  }
}

export default class TeachScreen extends Component {

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
      cards: [...range(1, 50)],
      swipedAllCards: false,
      swipeDirection: '',
      cardIndex: 0
    }
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
  
    renderCard = (card, index) => {
      return (
        <View style={{width: '100%', height: getHeight(372), backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.text}>{card} - {index}</Text>
        </View>
      )
    };
  
    onSwiped = (type) => {
      console.log(`on swiped ${type}`)
    }
  
    onSwipedAllCards = () => {
      this.setState({
        swipedAllCards: true
      })
    };
  
    swipeLeft = () => {
      this.swiper.swipeLeft()
    };

    renderModalListText = (rowData) => {
      console.log('rowData', rowData);
      return `${rowData.name}`;
    }

    renderModalSeparator = () => {
      return (
        <View></View>
      )
    }

    libraryClick = () => {
      navigationService.navigate(pages.CAMERA_ROLL);
    }

    render () {
      return (
          <MenuPage forceInset={{bottom: 'never'}} titleText={'TEACH'}>
            <View style={styles.workingPart}>
              <Text
                  style={styles.title}
              >
                Assignments
              </Text>
              <View style={styles.modalPart}>
                <ModalDropdown options={this.state.subjectArray} 
                  descPart={
                      <Triangle width={getHeight(16)} height={getHeight(16)} color={'#FFFFFF'} />
                  }
                  style={{width: getWidth(130)}}
                  textStyle={{color: '#FFFFFF', fontSize: getHeight(18), fontFamily: 'Montserrat-Regular'}}
                  dropdownStyle={{backgroundColor: BLACK_PRIMARY, width: getWidth(283), marginTop: getHeight(3)}}
                  dropdownTextStyle={{backgroundColor: BLACK_PRIMARY, color: '#FFFFFF'}}
                  dropdownTextHighlightStyle={{color: '#FFFFFF'}}
                  onDropdownWillShow={this.modalWillShow}
                  onDropdownWillHide={this.modalWillHide}
                  renderSeparator={this.renderModalSeparator}
                  renderRow={this.renderModalListRow}
                  renderButtonText={this.renderModalListText}
                >
                </ModalDropdown>
              </View>
              <View style={{flex: 1, width: '100%', marginBottom: getHeight(50), marginTop: getHeight(40)}}>
              <Swiper
                  ref={swiper => {
                    this.swiper = swiper
                  }}
                  onSwiped={() => this.onSwiped('general')}
                  onSwipedLeft={() => this.onSwiped('left')}
                  onSwipedRight={() => this.onSwiped('right')}
                  onSwipedTop={() => this.onSwiped('top')}
                  onSwipedBottom={() => this.onSwiped('bottom')}
                  onTapCard={this.swipeLeft}
                  cards={this.state.cards}
                  cardIndex={this.state.cardIndex}
                  cardVerticalMargin={0}
                  renderCard={this.renderCard}
                  onSwipedAll={this.onSwipedAllCards}
                  stackSize={3}
                  stackSeparation={15}
                  useViewOverflow={true}
                  containerStyle={{justifyContent: 'center', alignItems: 'center', flex: 1, width: '100%'}}
                  overlayLabels={{
                    bottom: {
                      title: 'BLEAH',
                      style: {
                        label: {
                          backgroundColor: 'black',
                          borderColor: 'black',
                          color: 'white',
                          borderWidth: 1
                        },
                        wrapper: {
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }
                      }
                    },
                    left: {
                      title: 'NOPE',
                      style: {
                        label: {
                          backgroundColor: 'black',
                          borderColor: 'black',
                          color: 'white',
                          borderWidth: 1
                        },
                        wrapper: {
                          flexDirection: 'column',
                          alignItems: 'flex-end',
                          justifyContent: 'flex-start',
                          marginTop: 30,
                          marginLeft: -80
                        }
                      }
                    },
                    right: {
                      title: 'LIKE',
                      style: {
                        label: {
                          backgroundColor: 'black',
                          borderColor: 'black',
                          color: 'white',
                          borderWidth: 1
                        },
                        wrapper: {
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          justifyContent: 'flex-start',
                          marginTop: 30,
                          marginLeft: 30
                        }
                      }
                    },
                    top: {
                      title: 'SKIP',
                      style: {
                        label: {
                          backgroundColor: 'black',
                          borderColor: 'black',
                          color: 'white',
                          borderWidth: 1
                        },
                        wrapper: {
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }
                      }
                    }
                  }}
                  animateOverlayLabelsOpacity
                  animateCardOpacity
                >
                  <TouchableOpacity onPress={() => this.swiper.swipeBack()} title='Swipe Back' />
                </Swiper>
              </View>
            </View>
            <View style={{height: getHeight(100), width: '100%', justifyContent: 'flex-start', alignItems: 'center'}}>
              <BaseButton 
                text={'CONTINUE'}
                onClick={this.teachClick}
              />
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
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      // backgroundColor: '#f3f3f3'
    },
    title: {
      width: '100%',
      fontFamily: 'Montserrat-Regular',
      color: '#FFFFFF',
      marginTop: getHeight(40),
      fontSize: getHeight(40),
      paddingLeft: getWidth(31),
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
    },
    card: {
      flex: 1,
      borderRadius: 4,
      borderWidth: 2,
      borderColor: '#E8E8E8',
      justifyContent: 'center',
      backgroundColor: 'white'
    },
    text: {
      textAlign: 'center',
      fontSize: 50,
      backgroundColor: 'transparent'
    },
    done: {
      textAlign: 'center',
      fontSize: 30,
      color: 'white',
      backgroundColor: 'transparent'
    }
})