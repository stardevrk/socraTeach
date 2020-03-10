import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Alert,
    Image,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
    Linking
} from 'react-native';
import TopBarPage from '../components/topBarPage';
import {getWidth, getHeight} from '../constants/dynamicSize';
import navigationService from '../navigation/navigationService';
import pages from '../constants/pages';
import {connect} from 'react-redux';
import { GREEN_PRIMARY, PURPLE_MAIN, BLACK_PRIMARY } from '../constants/colors';
import {auth, firestore} from '../constants/firebase';
import Bank from '../components/icons/bank';
import _ from 'lodash';

const WORD_LOGO = require('../assets/images/word-logo.png');
const CHASE_IMAGE = require('../assets/images/bank-chase.png');
const AMERICA_IMAGE = require('../assets/images/bank-america.png');

class Banks extends Component {
    
    constructor(props) {
        super(props);

        this.paymentsData = [
          {
            id: 'new',
            newItem: true
          }
        ]
        this.state = {
          hasBank : false,
          loading: false
        }
    }
    learnClick = () => {
        navigationService.navigate(pages.LEARN_SUBJECT);
    }

    teachClick = () => {
        navigationService.navigate(pages.TEACH_SUBJECT);
    }
    
    static getDerivedStateFromProps (props, state) {
        if (props.user.account == null) {
          return {
            hasBank: false
          };
        }
        else {
          return {
            hasBank: true
          }
        }
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

    _goSetup = () => {
      // navigationService.navigate(pages.BANK_SETUP, {prevScreen: 'banks'});
      // ca_GnclzGHybAEFl9aSwOI96R3jkPDIIIlM
      console.log("User Bank ----", this.props.bank);
      if (this.props.bank != null) {
        if (!_.isNil(this.props.bank.express)) {
          this.setState({loading: true});
          let xhr = new XMLHttpRequest();
          xhr.open('GET', `https://us-central1-socrateach-65b77.cloudfunctions.net/proto/createLoginLink/${auth.currentUser.uid}`);
          xhr.send();

          xhr.onload = () => {
              if (xhr.status == 200) {
                  let responseData = JSON.parse(xhr.response);
                  if (responseData['result'] == true) {
                      let linkObject = responseData['linkObject'];
                      console.log("Login Link Object = ", linkObject);
                      let url = linkObject.url;
                      Linking.canOpenURL(url)
                      .then((supported) => {
                        this.setState({loading: false});
                        if (!supported) {
                          console.log("Can't handle Loign URL: ", url);
                        } else {
                          return Linking.openURL(url);
                        }
                      }).catch(err => {
                        this.setState({loading: false});
                        console.log("URL Checking Error occured: ", err);
                      });
                  } else {
                    this.setState({loading: false});
                    Alert.alert(
                      'Login Attemp Failed!',
                      'Login Link generation Failed!',
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
              } else {
                this.setState({loading: false});
                Alert.alert(
                  'Login Attemp Failed!',
                  'Login Link generation Failed!',
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
          }
        }
      } else {
        this.setState({loading: true});
        let url = `https://connect.stripe.com/express/oauth/authorize?redirect_uri=https://socrateach-65b77.firebaseapp.com&client_id=ca_GncllTyA3AAQIxk0jJd7RZsYaKCB1Jpi&state=${auth.currentUser.uid}`;
        Linking.canOpenURL(url)
        .then((supported) => {
          this.setState({loading: false});
          if (!supported) {
            console.log("Can't handle url: " + url);
          } else {
            return Linking.openURL(url);
          }
        })
        .catch((err) => {
          this.setState({loading: false});
          console.error('An error occurred', err)
        });
      }
      
    }

    _goEdit = () => {
      navigationService.navigate(pages.BANK_EDIT);
    }

    _renderListItem =(item) => {
      console.log(item.item);
      if (this.state.hasBank == true) {
        // switch (item.item.name) {
        //   case 'chase':
        //     return (
        //       <TouchableOpacity style={styles.listItem} onPress={this._goEdit}>
        //           <Image style={{width: getWidth(24), height: getHeight(16), marginLeft: getWidth(24), marginRight: getWidth(16)}}
        //             resizeMode={'contain'} source={CHASE_IMAGE}
        //           />
        //           <Text style={styles.listText}>
        //             {item.item.card_name}
        //           </Text>
                  
        //       </TouchableOpacity>
        //     )
        //   case 'america': 
        //     return (
        //       <TouchableOpacity style={styles.listItem} onPress={this._goEdit}>
        //           <Image style={{width: getWidth(24), height: getHeight(16), marginLeft: getWidth(24), marginRight: getWidth(16)}}
        //             resizeMode={'contain'} source={AMERICA_IMAGE}
        //           />
        //           <Text style={styles.listText}>
        //             {item.item.card_name}
        //           </Text>
                  
        //       </TouchableOpacity>
        //     )
        // }
        return (
          <TouchableOpacity style={styles.listItem} onPress={this._goSetup}>
            <Text style={{width: getWidth(24), height: getHeight(16), marginLeft: getWidth(24), marginRight: getWidth(16), color: '#FFFFFF', fontSize: getHeight(18)}}></Text>
            <Text style={styles.newListText}>
              Edit Bank Account
            </Text>
          </TouchableOpacity>
        )
      } else {
        return (
          <TouchableOpacity style={styles.listItem} onPress={this._goSetup}>
            <Text style={{width: getWidth(24), height: getHeight(16), marginLeft: getWidth(24), marginRight: getWidth(16), color: '#FFFFFF', fontSize: getHeight(18)}}></Text>
            <Text style={styles.newListText}>
              Add Bank Account
            </Text>
          </TouchableOpacity>
        )
      }

    }

    render () {
        return (
            <TopBarPage titleText={'BANK SETUP'}>
                <View style={styles.container}>
                    {/* <FlatList 
                      data={this.paymentsData}
                      renderItem={item => this._renderListItem(item)}
                      keyExtractor={item => item.id}
                      contentContainerStyle={{flex: 1, width: '100%'}}
                      style={{flex: 1, width: '100%'}}
                    /> */}
                    <View style={styles.modal}>
                      <View style={{flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', paddingBottom: getHeight(40)}}>
                        <Bank size={getHeight(48)} color={BLACK_PRIMARY} />
                        <Text style={styles.bodyText}>Add or change bank</Text>
                        <Text style={styles.secondText}>account through </Text>
                        <Text style={styles.secondText}>Stripe</Text>
                      </View>
                      {
                        this.state.loading == false ?
                        <TouchableOpacity style={styles.btnBody}
                        onPress={this._goSetup}
                        >
                          {/* <Text style={styles.btnText}>Home</Text> */}
                          
                          <Text style={styles.btnText}>
                            Bank Setup
                          </Text>
                        </TouchableOpacity>
                        : 
                        <View style={styles.btnBody}>
                          <ActivityIndicator size={'small'} />
                        </View>
                      }
                    </View>
                </View>
            </TopBarPage>
        )
    }
}

Banks.navigatorStyle = {
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
        
    },
    listText: {
      fontFamily: 'Montserrat-Medium',
      fontSize: getHeight(18),
      color: '#FFFFFF'
    },
    newListText: {
      fontFamily: 'Montserrat-Medium',
      fontSize: getHeight(18),
      color: GREEN_PRIMARY
    },
    listItem: {
      width: '100%', 
      height: getHeight(40), 
      flexDirection: 'row', 
      alignItems: 'center', 
      borderBottomColor: PURPLE_MAIN, 
      borderBottomWidth: 2, 
      backgroundColor: BLACK_PRIMARY
    },
    modal: {
      width: getWidth(244),
      height: getHeight(262),
      backgroundColor: '#FFFFFF',
      alignItems: 'center',
      borderRadius: getHeight(10),
      alignSelf: 'center'
    },
    btnText: {
      fontFamily: 'Montserrat-Medium',
      color: '#FFFFFF',
      fontSize: getHeight(18)
    },
    bodyText: {
      fontFamily: 'Montserrat-Medium',
      fontSize: getHeight(18),
      color: BLACK_PRIMARY,
      marginTop: getHeight(29)
    },
    secondText: {
      fontFamily: 'Montserrat-Medium',
      fontSize: getHeight(18),
      color: BLACK_PRIMARY,
    },
    bodySecText: {
      fontFamily: 'Montserrat-Medium',
      fontSize: getHeight(15),
      color: BLACK_PRIMARY
    },
    bodyThirdText: {
      fontFamily: 'Montserrat-Medium',
      fontSize: getHeight(18),
      color: BLACK_PRIMARY
    },
    btnBody: {
      width: getWidth(220), 
      height: getHeight(36), 
      borderRadius: getHeight(10), 
      backgroundColor: PURPLE_MAIN, 
      justifyContent: 'center',
      alignItems: 'center', 
      flexDirection: 'row',
      marginBottom: getHeight(23)
    }
})

const mapStateToProps = (state) => ({
    subjects: state.subject,
    user: state.user,
    bank: state.bank
  })
  
  export default connect(mapStateToProps)(Banks);