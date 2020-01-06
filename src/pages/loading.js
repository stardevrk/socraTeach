import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator
} from 'react-native';
import {PURPLE_MAIN} from '../constants/colors';
import Page from '../components/basePage';
import {getHeight} from '../constants/dynamicSize';
import navigationService from '../navigation/navigationService';
import pages from '../constants/pages';

export default class Loading extends Component {

    componentDidMount() {
        setTimeout(() => {
            navigationService.navigate(pages.AUTH);
        }, 3000);
    }

    render () {
        return (
            <Page>
                <View style={styles.container} >
                    <Text style={styles.loadText}>Loading...</Text>
                    <ActivityIndicator size={'large'} />
                </View>
            </Page>
            
        )
    }
};

Loading.navigatorStyle = {
    navBarHidden: true,
    statusBarBlur: false
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loadText: {
        paddingBottom: getHeight(10),
        color: '#FFFFFF',
        fontFamily: 'Montserrat-Bold',
    }
});