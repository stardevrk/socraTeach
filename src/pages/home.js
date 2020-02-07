import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
    Image
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

const LOGO_IMAGE = require('../assets/images/logo.png');
const WORD_LOGO = require('../assets/images/word-logo.png');

class HomeScreen extends Component {
    
    constructor(props) {
        super(props);

        this.state = {}
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

    componentDidMount() {
        const {dispatch} = this.props;
      dispatch(clearMyLearnList());
      dispatch(clearMyTeachList());
      dispatch(getMyInitLearnList());
      dispatch(getMyInitTeachList());
    }

    render () {
        return (
            <TopBarPage renderTitle={this._renderTitle}>
                <View style={styles.container}>
                    <Image
                        source={LOGO_IMAGE}
                        style={styles.logoImage}
                        resizeMode={'contain'}
                    />
                    <BaseButton 
                        text={'LEARN'}
                        onClick={this.learnClick}
                        buttonStyle={{marginBottom: getHeight(23)}}
                    />
                    <BaseButton 
                        text={'TEACH'}
                        onClick={this.teachClick}
                    />
                </View>
            </TopBarPage>
        )
    }
}

HomeScreen.navigatorStyle = {
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
        
    }
})

const mapStateToProps = (state) => ({
    subjects: state.subject
  })
  
  export default connect(mapStateToProps)(HomeScreen);