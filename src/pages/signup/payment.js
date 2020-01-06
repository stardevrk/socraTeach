import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    View,
} from 'react-native';
import Page from '../../components/basePage';
import {getWidth, getHeight} from '../../constants/dynamicSize';
import BaseButton from '../../components/baseButton';
import BaseInput from '../../components/baseInput';
import NavButton from '../../components/navButton';
import navigationService from '../../navigation/navigationService';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import pages from '../../constants/pages';
import Card from '../../components/icons/card';

const LOGO_IMAGE = require('../../assets/images/logo.png');

export default class Payment extends Component {
    
    goForward = () => {
      navigationService.navigate(pages.SINGUP_FINISH);
    }

    goBack = () => {
      navigationService.pop();
    }

    render () {
        return (
            <Page>
                <KeyboardAwareScrollView style={styles.container} contentContainerStyle={styles.wrapper}>
                    <NavButton 
                      iconName={'md-arrow-back'} 
                      buttonStyle={{position: 'absolute', left: getWidth(16), top: getHeight(15)}}
                      onClick={this.goBack}
                    />
                    <Image
                        source={LOGO_IMAGE}
                        style={styles.logoImage}
                        resizeMode={'contain'}
                    />
                    <View style={{width: '100%', paddingLeft: getWidth(45), marginBottom: getHeight(56)}}>
                      <Card width={getWidth(40)} height={getHeight(32)} color={'#FFFFFF'} />
                    </View>
                    
                    <BaseInput 
                      desc={'Name on Card'}
                      wrapperStyle={{marginBottom: getHeight(36), width: '100%'}}
                    />
                    <BaseInput 
                      desc={'Card Number'}
                      wrapperStyle={{marginBottom: getHeight(36)}}
                    />
                    <BaseInput 
                      desc={'Expiration'}
                      wrapperStyle={{marginBottom: getHeight(36)}}
                    />
                    <BaseInput 
                      desc={'Security Code'}
                      wrapperStyle={{marginBottom: getHeight(63)}}
                    />
                    
                    <BaseButton 
                        text={'CONTINUE'}
                        onClick={this.goForward}
                    />
                </KeyboardAwareScrollView>
            </Page>
        )
    }
}

Payment.navigatorStyle = {
    navBarHidden: false,
    statusBarBlur: false
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    wrapper: {
      flex: 1,
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center'
    },
    logoImage: {
        width: getWidth(291),
        height: getHeight(151),
        marginBottom: getHeight(19),
    }
})