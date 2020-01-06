import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
    Image
} from 'react-native';
import Page from '../components/basePage';
import {getWidth, getHeight} from '../constants/dynamicSize';
import BaseButton from '../components/baseButton';
import navigationService from '../navigation/navigationService';
import pages from '../constants/pages';

const LOGO_IMAGE = require('../assets/images/logo.png');

export default class Welcome extends Component {
    
    loginClick = () => {
        navigationService.navigate(pages.SIGN_IN);
    }

    singupClick = () => {
        navigationService.navigate(pages.SIGN_UP);
    }

    render () {
        return (
            <Page>
                <View style={styles.container} >
                    <Image
                        source={LOGO_IMAGE}
                        style={styles.logoImage}
                        resizeMode={'contain'}
                    />
                    <BaseButton 
                        text={'LOGIN'}
                        onClick={this.loginClick}
                        buttonStyle={{marginBottom: getHeight(23)}}
                    />
                    <BaseButton 
                        text={'BECOME A SOPHIST'}
                        onClick={this.singupClick}
                    />
                </View>
            </Page>
        )
    }
}

Welcome.navigatorStyle = {
    navBarHidden: true,
    statusBarBlur: false
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoImage: {
        width: getWidth(291),
        height: getHeight(151),
        marginBottom: getHeight(23),
        
    }
})