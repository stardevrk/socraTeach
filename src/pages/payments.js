import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
    Image,
    FlatList,
    TouchableOpacity
} from 'react-native';
import Page from '../components/basePage';
// import MenuPage from '../components/menuPage';
import TopBarPage from '../components/topBarPage';
import {getWidth, getHeight} from '../constants/dynamicSize';
import BaseButton from '../components/baseButton';
import MenuButton from '../components/menuButton';
import navigationService from '../navigation/navigationService';
import pages from '../constants/pages';
import {connect} from 'react-redux';
import {fetchInitProblem} from '../controller/problem';
import {getMyInitTeachList, clearMyTeachList} from '../controller/teach';
import {getMyInitLearnList, clearMyLearnList} from '../controller/learn';
import { GREEN_PRIMARY, PURPLE_MAIN, BLACK_PRIMARY } from '../constants/colors';

const LOGO_IMAGE = require('../assets/images/logo.png');
const WORD_LOGO = require('../assets/images/word-logo.png');
const VISA_IMAGE = require('../assets/images/visa.png');
const MASTER_IMAGE = require('../assets/images/master.png');

class Payments extends Component {
    
    constructor(props) {
        super(props);

        this.paymentsData = [
          {
            id: '0',
            name: 'visa',
            card_name: 'Chase',
            number: '8372',
            newItem: false
          },
          {
            id: '1',
            name: 'master',
            card_name: 'Bank of America',
            number: '0874',
            newItem: false
          },
          {
            id: 'new',
            newItem: true
          }
        ]
        this.state = {}
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

    _addPayment = () => {
      navigationService.navigate(pages.PAYMENTS_SETUP);
    }

    _renderListItem =(item) => {
      console.log(item.item);
      if (item.item.newItem == false) {
        
        switch (item.item.name) {
          case 'visa':
            return (
              <TouchableOpacity style={styles.listItem} onPress={this._addPayment}>
                  <Image style={{width: getWidth(24), height: getHeight(16), marginLeft: getWidth(24), marginRight: getWidth(16)}}
                    resizeMode={'contain'} source={VISA_IMAGE}
                  />
                  <Text style={styles.listText}>
                    {item.item.card_name}, 
                  </Text>
                  <Text style={styles.listText}>
                    {item.item.number}
                  </Text>
              </TouchableOpacity>
            )
          case 'master': 
            return (
              <TouchableOpacity style={styles.listItem} onPress={this._addPayment}>
                  <Image style={{width: getWidth(24), height: getHeight(16), marginLeft: getWidth(24), marginRight: getWidth(16)}}
                    resizeMode={'contain'} source={MASTER_IMAGE}
                  />
                  <Text style={styles.listText}>
                    {item.item.card_name},
                  </Text>
                  <Text style={styles.listText}>
                    {item.item.number}
                  </Text>
              </TouchableOpacity>
            )
        }
        
      } else {
        return (
          <TouchableOpacity style={styles.listItem} onPress={this._addPayment}>
            <Text style={{width: getWidth(24), height: getHeight(16), marginLeft: getWidth(24), marginRight: getWidth(16), color: '#FFFFFF', fontSize: getHeight(18)}}>+1</Text>
            <Text style={styles.newListText}>
              Add Credit/Debit
            </Text>
          </TouchableOpacity>
        )
      }

    }

    render () {
        return (
            <TopBarPage titleText={'PAYMENTS'}>
                <View style={styles.container}>
                    <FlatList 
                      data={this.paymentsData}
                      renderItem={item => this._renderListItem(item)}
                      keyExtractor={item => item.id}
                      contentContainerStyle={{flex: 1, width: '100%'}}
                      style={{flex: 1, width: '100%'}}
                    />
                </View>
            </TopBarPage>
        )
    }
}

Payments.navigatorStyle = {
    navBarHidden: true,
    statusBarBlur: false
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingTop: getHeight(56)
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
    }
})

const mapStateToProps = (state) => ({
    subjects: state.subject
  })
  
  export default connect(mapStateToProps)(Payments);