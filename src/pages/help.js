import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
    TouchableOpacity,
    Image
} from 'react-native';
import {BLACK_PRIMARY, PURPLE_MAIN, GRAY_SECONDARY} from '../constants/colors';
import Page from '../components/basePage';
import {getHeight, getWidth} from '../constants/dynamicSize';
import {connect} from 'react-redux';
import navigationService from '../navigation/navigationService';
import pages from '../constants/pages';
import Checked from '../components/icons/checked';
import HelpIcon from '../components/icons/help';

const ICON_LOGO = require('../assets/images/icon-logo.png');


class Help extends Component {

    componentDidMount() {
        
    }

    _gotoHome = () => {
      navigationService.reset(pages.LOADING);
    }   

    render () {
        return (
            <Page>
                <View style={styles.container} >
                  <Image style={{width: getWidth(155), height: getHeight(82), marginBottom: getHeight(42)}} resizeMode={'contain'} source={ICON_LOGO}/>
                  <View style={{width: getWidth(244), height: getHeight(262), backgroundColor: GRAY_SECONDARY, borderRadius: getHeight(10), alignItems: 'center'}}>
                    <View style={{flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                      <HelpIcon size={getWidth(40)} color={PURPLE_MAIN} />
                      <Text style={{color: '#FFFFFF', fontFamily: 'Montserrat-Medium', fontSize: getHeight(18), marginTop: getHeight(29)}}>
                        Call or Text
                      </Text>
                      <Text style={{color: '#FFFFFF', fontFamily: 'Montserrat-Medium', fontSize: getHeight(18)}}>
                        1-630-408-6670 for
                      </Text>
                      <Text style={{color: '#FFFFFF', fontFamily: 'Montserrat-Medium', fontSize: getHeight(18)}}>
                        Questions/Concerns
                      </Text>
                    </View>
                    <TouchableOpacity style={{width: getWidth(220), height: getHeight(36), backgroundColor: '#FFFFFF', borderRadius: getHeight(10), marginBottom: getHeight(23), justifyContent: 'center', alignItems: 'center'}}
                    onPress={this._gotoHome}
                    >
                      <Text style={{color: PURPLE_MAIN, fontFamily: 'Montserrat-Medium', fontSize: getHeight(17)}}>OK</Text>
                    </TouchableOpacity>
                  </View>
                  
                </View>
            </Page>
            
        )
    }
};

Help.navigatorStyle = {
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
    },
    modal: {
      width: getWidth(244),
      height: getHeight(262),
      backgroundColor: '#FFFFFF',
      alignItems: 'center',
      borderRadius: getHeight(10),
      marginTop: getHeight(42)
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
      marginTop: getHeight(19)
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
      paddingLeft: getWidth(13),
      paddingRight: getWidth(25),
      marginBottom: getHeight(23)
    }
});

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps)(Help);