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
import Check from '../components/icons/check';
import { GREEN_PRIMARY, PURPLE_MAIN, BLACK_PRIMARY } from '../constants/colors';

const LOGO_IMAGE = require('../assets/images/logo.png');
const WORD_LOGO = require('../assets/images/word-logo.png');
const CHASE_IMAGE = require('../assets/images/bank-chase.png');
const AMERICA_IMAGE = require('../assets/images/bank-america.png');

class Transfer extends Component {
    
    constructor(props) {
        super(props);

        this.paymentsData = [
          {
            id: '0',
            name: 'chase',
            card_name: 'Chase, 8372',
            number: '8372',
            newItem: false
          },
          {
            id: '1',
            name: 'america',
            card_name: 'Bank of America, 0874',
            number: '0874',
            newItem: false
          },
          {
            id: 'new',
            newItem: true
          }
        ]
        this.state = {
          selected: 'chase'
        }
    }
    learnClick = () => {
        navigationService.navigate(pages.LEARN_SUBJECT);
    }

    teachClick = () => {
        navigationService.navigate(pages.TEACH_SUBJECT);
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

    _renderListItem =(item) => {
      console.log(item.item);
      if (item.item.newItem == false) {
        
        switch (item.item.name) {
          case 'chase':
            return (
              <TouchableOpacity style={styles.listItem} onPress={() => {this.setState({selected: 'chase'})}}>
                <View style={{flexDirection: 'row'}}>
                  <Image style={{width: getWidth(24), height: getHeight(16), marginLeft: getWidth(24), marginRight: getWidth(16)}}
                    resizeMode={'contain'} source={CHASE_IMAGE}
                  />
                  <Text style={styles.listText}>
                    {item.item.card_name}
                  </Text>
                  
                </View>
                  {
                    this.state.selected == 'chase' ?
                    <View style={{marginRight: getWidth(29)}}>
                      <Check size={getHeight(20)} color={'#FFFFFF'}/>
                    </View>
                    : null
                  }
              </TouchableOpacity>
            )
          case 'america': 
            return (
              <TouchableOpacity style={styles.listItem} onPress={() => {this.setState({selected: 'america'})}}>
                <View style={{flexDirection: 'row'}}>
                  <Image style={{width: getWidth(24), height: getHeight(16), marginLeft: getWidth(24), marginRight: getWidth(16)}}
                    resizeMode={'contain'} source={AMERICA_IMAGE}
                  />
                  <Text style={styles.listText}>
                    {item.item.card_name}
                  </Text>
                  
                </View>
                  {
                    this.state.selected == 'america' ?
                    <View style={{marginRight: getWidth(29)}}>
                      <Check size={getHeight(20)} color={'#FFFFFF'}/>
                    </View>
                    : null
                  }
              </TouchableOpacity>
            )
        }
        
      } else {
        return (
          <TouchableOpacity style={{width: '100%', height: getHeight(40), flexDirection: 'row', alignItems: 'center', borderBottomColor: PURPLE_MAIN, borderBottomWidth: 2, backgroundColor: BLACK_PRIMARY}} onPress={this._addBank}>
            <Text style={{width: getWidth(24), height: getHeight(16), marginLeft: getWidth(24), marginRight: getWidth(16), color: '#FFFFFF', fontSize: getHeight(18)}}>+1</Text>
            <Text style={styles.newListText}>
              Add Bank Account
            </Text>
          </TouchableOpacity>
        )
      }

    }

    _addBank = () => {
      navigationService.navigate(pages.BANK_SETUP, {prevScreen: 'transfer'});
    }

    _clickTransfer = () => {
      navigationService.navigate(pages.TRANSFER_STARTED)
    }

    render () {
        return (
            <TopBarPage titleText={'TRANSFER'}>
                <View style={styles.container}>
                  <Text style={styles.title}>
                    Choose Bank
                  </Text>
                  <FlatList 
                    data={this.paymentsData}
                    renderItem={item => this._renderListItem(item)}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{flex: 1, width: '100%'}}
                    style={{flex: 1, width: '100%'}}
                  />
                  <BaseButton 
                    onClick={this._clickTransfer}
                    text={'TRANSFER $24.72'}
                    buttonStyle={{marginBottom: getHeight(26)}}
                  />
                </View>
            </TopBarPage>
        )
    }
}

Transfer.navigatorStyle = {
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
        
    },
    title: {
      width: '100%',
      paddingLeft: getWidth(29),
      marginTop: getHeight(52),
      marginBottom: getHeight(45),
      color: '#FFFFFF',
      fontSize: getHeight(20), 
      fontFamily: 'Montserrat-Medium'
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
      backgroundColor: BLACK_PRIMARY,
      justifyContent: 'space-between'
    }
})

const mapStateToProps = (state) => ({
    subjects: state.subject
  })
  
  export default connect(mapStateToProps)(Transfer);