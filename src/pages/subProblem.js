import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';
import {BLACK_PRIMARY} from '../constants/colors';
import Page from '../components/basePage';
import Vector from '../components/icons/vector';
import {getHeight, getWidth} from '../constants/dynamicSize';
import {connect} from 'react-redux';
import navigationService from '../navigation/navigationService';
import pages from '../constants/pages';


class Loading extends Component {

    componentDidMount() {
        
    }

    _gotoHome = () => {
      navigationService.reset(pages.LOADING);
    }

    render () {
        return (
            <Page>
                <View style={styles.container} >
                    <View style={styles.modal}>
                      <View style={{flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                        <Vector size={getHeight(40)} />
                        <Text style={styles.bodyText}>Problem Submitted</Text>
                      </View>
                      <TouchableOpacity style={{width: getWidth(220), height: getHeight(36), borderRadius: getHeight(10), backgroundColor: 'rgba(58, 58, 60, 0.8)', justifyContent: 'center', alignItems: 'center', marginBottom: getHeight(23)}}
                      onPress={this._gotoHome}
                      >
                        <Text style={styles.btnText}>Home</Text>
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.descText}>
                      You'll get a notification when a
                    </Text>
                    <Text style={styles.descText}>
                      teacher can help you solve it!
                    </Text>
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
    },
    modal: {
      width: getWidth(244),
      height: getHeight(262),
      backgroundColor: '#FFFFFF',
      alignItems: 'center',
      borderRadius: getHeight(10),
      marginBottom: getHeight(49)
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
      marginTop: getHeight(28)
    },
    descText: {
      fontFamily: 'Montserrat-Medium',
      fontSize: getHeight(18),
      color: '#FFFFFF',
      width: '100%',
      textAlign: 'center'
    }
});

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps)(Loading);