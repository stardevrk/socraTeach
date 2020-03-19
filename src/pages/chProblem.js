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
import {BLACK_PRIMARY, GRAY_SECONDARY, PURPLE_MAIN} from '../constants/colors';
import BaseButton from '../components/baseButton';
import Alert from '../components/icons/alert';
import Aback from '../components/icons/aback';
import Algebra from '../components/icons/algebra';
import Geometry from '../components/icons/geometry';
import Physics from '../components/icons/physics';
import Chemistry from '../components/icons/chemistry';
import navigationService from '../navigation/navigationService';
import pages from '../constants/pages';
import Swiper from '../components/Swiper/index';
import {connect} from 'react-redux';
import _ from 'lodash';
import {fetchInitProblem, clearSubjectProblems, fetchMoreProblems} from '../controller/problem';
import {selectProblem, getMyInitTeachList} from '../controller/teach';
import {auth} from '../constants/firebase';
import {updateSession, clearSession} from '../model/actions/sessionAC';

class ChooseProblem extends Component {

  constructor(props) {
    super(props);

    let problems = _.get(props.problem, 'problems', []);
    
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
      // cards: [...range(1, 50)],
      cards: problems,
      cardLength: problems.length == undefined ? 0 : problems.length,
      swipedAllCards: false,
      swipeDirection: '',
      cardIndex: 0,
      subject: '',
      newSubjectCards: false,
      modalVisible: true,
      prevProblems: {},
      swippedCards: 0,
      zoomModalVisible: false,
      checkedProblemImage: '',
      textVisible: false,
      endModalVisible: false,
    }

    props.navigation.addListener('didFocus', payload => {
      // console.log("Navigation Event Payload === ", payload);
      this.setState({subject: payload.action.params.subject});
      this.setState({newSubjectCards: true});
      const {dispatch} = this.props;
      dispatch(clearSubjectProblems(payload.action.params.subject.toLowerCase()));
      dispatch(fetchInitProblem(payload.action.params.subject.toLowerCase()));
    })
  }

  modalWillShow = () => {
    this.setState({modalOpened: true});
    // openOverlay();
  }

  modalWillHide = () => {
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
        <View style={{width: '100%', height: getHeight(577), backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', borderRadius: getHeight(10)}}>
          {
            card != undefined ? 
            <Image style={{width: '100%', height: '100%', borderRadius: getHeight(10)}} resizeMode={'contain'} source={{uri: card['problemImage']}}/>
            : 
            null
          }
        </View>
      )
    };
  
    onSwiped = (type) => {
      this.setState({newSubjectCards: false});
      let currentSwipped = this.state.swippedCards;
      currentSwipped++;
      console.log(`on swiped ${currentSwipped}`);
      if (this.state.cardLength > 3 && currentSwipped == this.state.cardLength - 3 && this.state.cardLength % 20 == 0) {
        const {dispatch} = this.props;
        console.log("Fetch More Problems");
        dispatch(fetchMoreProblems(this.state.subject.toLowerCase()));
      }
      this.setState({swippedCards: currentSwipped});
    }
  
    onSwipedAllCards = () => {
      this.setState({
        swipedAllCards: true,
        endModalVisible: true
      });
      
    };
  
    swipeLeft = () => {
      this.swiper.swipeLeft()
    };

    renderModalListText = (rowData) => {
      // console.log('rowData', rowData);
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

  static getDerivedStateFromProps (props, state) {
    // const problems = props.problem;
    let problems = _.get(props.problem, 'problems', {});
    if (problems != state.prevProblems) {
      let arrayProblems = _.map(problems, (item) => {
        return item;
      });
      let filteredArray = _.filter(arrayProblems, function(item) {
        return item.posterId != auth.currentUser.uid  
      });
      let sortedArray = _.orderBy(filteredArray, ['updateTime'], 'desc');
      console.log("New Cards Length = ", sortedArray.length);
      return {
        modalVisible: sortedArray.length == 0 ? false : true,
        cards: sortedArray,
        prevProblems: problems,
        cardLength: sortedArray.length
      }
    } else {
      return null;
    }
    
  }

  _subjectSelect = (subject) => {
    this.setState({subject: subject, newSubjectCards: true});
    const {dispatch} = this.props;
    dispatch(clearSubjectProblems(subject.toLowerCase()));
    dispatch(fetchInitProblem(subject.toLowerCase()));
  }

  _swipeSelect = (index) => {
    const {cards, subject} = this.state;
    const {dispatch} = this.props;

    if (index != undefined && index != null) {
      selectProblem(subject, cards[index]);
      let problemData = cards[index];
      dispatch(clearSession());
      dispatch(updateSession('teach_session', subject, problemData.problemId, cards[index]));
      // navigationService.navigate(pages.TEACH_SOLVE, {subject: subject, problem: cards[index]});
      navigationService.navigate(pages.NOTI_STUDENT);
    }
  }

  _checkProblem = (index) => {
    console.log("Card Tapped! =", this.state.cards[index]);
    let checkedProblem = this.state.cards[index];
    this.setState({checkedProblemImage: checkedProblem['problemImage'], zoomModalVisible: true});
  }

  _removeZoomModal = () => {
    this.setState({zoomModalVisible: false});
  }

  _teachClick = () => {
    const {dispatch} = this.props;
    dispatch(getMyInitTeachList());
    navigationService.navigate(pages.TEACH_HISTORY);
  }

  _goBack=() => {
    this.setState({swippedCards: 0, endModalVisible: false});
    navigationService.navigate(pages.TEACH_SUBJECT)
  }

  render () {
    const {subjects} = this.props;
    return (
        <Page forceInset={{bottom: 'never', top: 'never'}}>
          <View style={styles.workingPart}>
            <View style={{marginTop: getHeight(58), marginBottom: getHeight(10), width: '100%'}}>
              <TouchableOpacity style={{marginLeft: getWidth(39)}} onPress={this._goBack}>
                <Aback size={getHeight(28)} color={'#FFFFFF'}/>
              </TouchableOpacity>
            </View>
              <View style={{flex: 1, width: '100%', marginBottom: getHeight(50), marginTop: getHeight(20)}}>
                {
                  this.state.cards.length != 0 ?
                  <Swiper
                    ref={swiper => {
                      this.swiper = swiper
                    }}
                    onSwiped={() => this.onSwiped('general')}
                    onSwipedLeft={() => this.onSwiped('left')}
                    onSwipedRight={this._swipeSelect}
                    onSwipedTop={() => this.onSwiped('top')}
                    onSwipedBottom={() => this.onSwiped('bottom')}
                    onTapCard={this._checkProblem}
                    cards={this.state.cards}
                    cardLength={this.state.cardLength}
                    cardIndex={this.state.cardIndex}
                    cardVerticalMargin={0}
                    renderCard={this.renderCard}
                    onSwipedAll={this.onSwipedAllCards}
                    stackSize={3}
                    stackSeparation={15}
                    useViewOverflow={true}
                    disableBottomSwipe={true}
                    newSubjectCards={this.state.newSubjectCards}
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
                        title: 'Nope',
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
                        title: 'Teach',
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
                  : 
                  <View style={{flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}>
                    <View style={{width: getWidth(244), height: getHeight(262), backgroundColor: GRAY_SECONDARY, borderRadius: getHeight(10), alignItems: 'center'}}>
                      <View style={{flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                        <Alert width={getWidth(44)} height={getHeight(38)} color={PURPLE_MAIN} />
                        <Text style={{color: '#FFFFFF', fontFamily: 'Montserrat-Medium', fontSize: getHeight(18), marginTop: getHeight(15)}}>
                          There are no more
                        </Text>
                        <Text style={{color: '#FFFFFF', fontFamily: 'Montserrat-Medium', fontSize: getHeight(18)}}>
                          recently uploaded
                        </Text>
                        <Text style={{color: '#FFFFFF', fontFamily: 'Montserrat-Medium', fontSize: getHeight(18)}}>
                          problems in this
                        </Text>
                        <Text style={{color: '#FFFFFF', fontFamily: 'Montserrat-Medium', fontSize: getHeight(18)}}>
                          subject
                        </Text>
                      </View>
                      <TouchableOpacity style={{width: getWidth(220), height: getHeight(36), backgroundColor: '#FFFFFF', borderRadius: getHeight(10), marginBottom: getHeight(23), justifyContent: 'center', alignItems: 'center'}}
                      onPress={() =>{this._goBack()}}
                      >
                        <Text style={{color: PURPLE_MAIN, fontFamily: 'Montserrat-Medium', fontSize: getHeight(17)}}>OK</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                }
              
              </View> 
              {/* {
              this.state.modalVisible == true ?
              <View style={{flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}>
                <View style={{width: getWidth(244), height: getHeight(262), backgroundColor: GRAY_SECONDARY, borderRadius: getHeight(10), alignItems: 'center'}}>
                  <View style={{flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    <Alert width={getWidth(44)} height={getHeight(38)} color={PURPLE_MAIN} />
                    <Text style={{color: '#FFFFFF', fontFamily: 'Montserrat-Medium', fontSize: getHeight(18), marginTop: getHeight(29)}}>
                      Solve the problem
                    </Text>
                    <Text style={{color: '#FFFFFF', fontFamily: 'Montserrat-Medium', fontSize: getHeight(18)}}>
                      before swiping right.
                    </Text>
                  </View>
                  <TouchableOpacity style={{width: getWidth(220), height: getHeight(36), backgroundColor: '#FFFFFF', borderRadius: getHeight(10), marginBottom: getHeight(23), justifyContent: 'center', alignItems: 'center'}}
                  onPress={() =>{this.setState({modalVisible: false, textVisible: true})}}
                  >
                    <Text style={{color: PURPLE_MAIN, fontFamily: 'Montserrat-Medium', fontSize: getHeight(17)}}>OK</Text>
                  </TouchableOpacity>
                </View>

              </View>
              : null
            } */}
            {
              this.state.zoomModalVisible == true ?
              <View style={{flex: 1, width: '100%', zIndex: 10, position: 'absolute', left: 0, top: 0, bottom: 0, right: 0, backgroundColor: PURPLE_MAIN}}>
                <Image style={{position: 'absolute', left: 0, top: 0, width: '100%', height: '100%'}} resizeMode={'contain'} source={{uri: this.state.checkedProblemImage}}/>
                <View style={{marginTop: getHeight(35), width: '100%'}}>
                  <TouchableOpacity style={{marginLeft: getWidth(20)}} onPress={() => this._removeZoomModal()}>
                    <Aback size={getHeight(28)} color={'#FFFFFF'}/>
                  </TouchableOpacity>
                </View>
              </View>
              : null
            }
          </View>
          {/* <View style={{height: getHeight(100), width: '100%', justifyContent: 'flex-start', alignItems: 'center'}}>
            <BaseButton 
              text={'TEACH'}
              onClick={this._teachClick}
            />
          </View> */}
          
            <Text style={styles.bottomText}>
              Solve the problem before swiping right
            </Text>
            
          {
              this.state.endModalVisible == true ?
              <View style={{flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}>
                <View style={{width: getWidth(244), height: getHeight(262), backgroundColor: GRAY_SECONDARY, borderRadius: getHeight(10), alignItems: 'center'}}>
                  <View style={{flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    <Alert width={getWidth(44)} height={getHeight(38)} color={PURPLE_MAIN} />
                    <Text style={{color: '#FFFFFF', fontFamily: 'Montserrat-Medium', fontSize: getHeight(18), marginTop: getHeight(15)}}>
                      There are no more
                    </Text>
                    <Text style={{color: '#FFFFFF', fontFamily: 'Montserrat-Medium', fontSize: getHeight(18)}}>
                      recently uploaded
                    </Text>
                    <Text style={{color: '#FFFFFF', fontFamily: 'Montserrat-Medium', fontSize: getHeight(18)}}>
                      problems in this
                    </Text>
                    <Text style={{color: '#FFFFFF', fontFamily: 'Montserrat-Medium', fontSize: getHeight(18)}}>
                      subject
                    </Text>
                  </View>
                  <TouchableOpacity style={{width: getWidth(220), height: getHeight(36), backgroundColor: '#FFFFFF', borderRadius: getHeight(10), marginBottom: getHeight(23), justifyContent: 'center', alignItems: 'center'}}
                  onPress={() =>{this._goBack()}}
                  >
                    <Text style={{color: PURPLE_MAIN, fontFamily: 'Montserrat-Medium', fontSize: getHeight(17)}}>OK</Text>
                  </TouchableOpacity>
                </View>

              </View>
              : null
            }
        </Page>
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
      fontFamily: 'Montserrat-Medium',
      color: '#FFFFFF',
      marginTop: getHeight(11),
      fontSize: getHeight(25),
      textAlign: 'center'
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
    },
    bottomText: {
      fontFamily: 'Montserrat-Medium',
      fontSize: getHeight(14),
      color: '#FFFFFF',
      marginBottom: getHeight(30),
      width: '100%',
      textAlign: 'center'
    }
})

const mapStateToProps = (state) => ({
  subjects: state.subject,
  problem: state.problem
})

export default connect(mapStateToProps)(ChooseProblem);