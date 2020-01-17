import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StatusBar, View, StyleSheet, Text, Platform, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {getHeight, getWidth} from '../constants/dynamicSize';
import {PURPLE_MAIN} from '../constants/colors';
import navigationService from '../navigation/navigationService';
import Page from './basePage';
import MenuButton from '../components/menuButton';

export default class MenuPage extends Component {

  toggleMenu = () => {
    navigationService.openDrawer();
  }

  render () {
    const {forceInset, titleText, rightText, renderTitle, renderRightItem, children, backgroundColor, menuBtnColor} = this.props
    return (
      <Page forceInset={forceInset} backgroundColor={backgroundColor}>
        <View style={styles.container}>
          
          {
            renderTitle ? 
            renderTitle() :
            <Text style={styles.headerTitle}>
              {titleText}
            </Text>
          }
          <MenuButton buttonStyle={{position: 'absolute', left: getWidth(16), top: getHeight(15)}}
                      buttonColor={menuBtnColor}
                      onClick={this.toggleMenu} 
          />
          {
            renderRightItem ?
            renderRightItem() :
            <Text style={styles.rightTitle}>
              {rightText}
            </Text>
          }
          {
            children
          }
        </View>
      </Page>
    )
  }
}

MenuPage.defaultProps = {
  forceInset: {},
  titleText: '',
  rightText: '',
  renderTitle: null,
  renderRightItem: null,
  children: null,
  backgroundColor: PURPLE_MAIN,
  menuBtnColor: '#FFFFFF'
};

MenuPage.propTypes = {
  forceInset: PropTypes.object,
  titleText: PropTypes.string,
  rightText: PropTypes.string,
  renderTitle: PropTypes.func,
  renderRightItem: PropTypes.func,
  children: PropTypes.element,
  backgroundColor: PropTypes.string,
  menuBtnColor: PropTypes.string
};

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
  rightTitle: {
    position: 'absolute', 
    right: getWidth(16), 
    top: getHeight(15),
    fontFamily: 'Montserrat-Regular',
    color: '#FFFFFF',
    fontSize: getHeight(18)
  }
});