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
import MenuPage from '../components/menuPage';
import {getWidth, getHeight} from '../constants/dynamicSize';
import BaseButton from '../components/baseButton';
import MenuButton from '../components/menuButton';
import navigationService from '../navigation/navigationService';
import pages from '../constants/pages';
import {connect} from 'react-redux';
import _ from 'lodash';
import { BLACK_PRIMARY } from '../constants/colors';
import {firestore} from '../constants/firebase';
import {getMyInitLearnList, clearMyLearnList} from '../controller/learn';

const LOGO_IMAGE = require('../assets/images/logo.png');

class LearnHistory extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
          teachList: [],
          userName: '',
          loading: false
        }
    }
    
    static getDerivedStateFromProps (props, state) {
      let problems = _.get(props.problem, 'problems', []);
      console.log("Learn History Porblems ====", problems);
      let newProblems = _.map(problems, (item, index) => {
        item['key'] = index;
        let subject = item.subject;
        const newSubject = subject.charAt(0).toUpperCase() + subject.slice(1);
        item.subject = newSubject;
        return item;
      })

      // let changedProblems = _.map(newProblems, item => {
      //   let subject = item.subject;
      //   const newSubject = subject.charAt(0).toUpperCase() + subject.slice(1);
      //   item.subject = newSubject;
      //   return item;
      // })
      return {
        teachList: newProblems,
        userName: props.user.userName
      }
    }

    _renderItem = (element, index) => {
      const {item} = element;
      
      return (
        <View style={styles.listItem} key={item.key}>
          <View style={styles.itemWrapper}>
            <View style={styles.itemHeader}>
              <Text style={styles.listSubject}>
                {item.subject}
              </Text>
              {/* <Text style={styles.listPoster}>
                {item.userName}
              </Text> */}
            </View>
            <Image source={{uri: item.problemImage}} resizeMode={'cover'} style={{width: '100%', height: getHeight(60)}} />
          </View>
        </View>
      )
    }

    _refreshData = () => {
      this.setState({loading: true});
      const {dispatch}  = this.props;
      dispatch(clearMyLearnList());
      dispatch(getMyInitLearnList());
      this.setState({loading: false});
    }

    _moveSolvePage = (problem) => {
      navigationService.navigate(pages.LEARN_SOLVE, {subject: problem.subject, problem: problem});
    }

    render () {
        return (
          <MenuPage titleText={'LEARN HISTORY'}>
              <View style={styles.container}>
                <FlatList
                  style={{width: '100%'}}
                  extraData={this.state}
                  data={this.state.teachList}
                  renderItem={({ item, index }) =>
                    <TouchableOpacity style={styles.listItem} key={item.key} 
                      onPress={() => this._moveSolvePage(item)}
                    >
                      <View style={styles.itemWrapper}>
                        <View style={styles.itemHeader}>
                          <Text style={styles.listSubject}>
                            {item.subject}
                          </Text>
                          <Text style={styles.listPoster}>
                            {item.userName}
                          </Text>
                        </View>
                        <Image source={{uri: item.problemImage}} resizeMode={'stretch'} style={{width: '100%', height: getHeight(80), borderRadius: getHeight(10)}} />
                      </View>
                    </TouchableOpacity>
                  }
                  // onRefresh={() => this._refreshData()}
                  keyExtractor={(index) => index.toString()}
                  // refreshing={this.state.loading}
                />
              </View>
          </MenuPage>
        )
    }
}

LearnHistory.navigatorStyle = {
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
  teachList:{
    flex: 1,
    width: '80%',
  },
  listItem: {
    width: '100%',
    backgroundColor: 'transparent',
    padding: getWidth(10),
  },
  listSubject: {
    fontFamily: 'Montserrat-Regular',
    fontSize: getHeight(16),
    color: '#FFFFFF',
  },
  listPoster: {
    fontFamily: 'Montserrat-Regular',
    fontSize: getHeight(16),
    color: '#FFFFFF',
    flex: 1
  },
  itemHeader: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: getHeight(10),
  },
  itemWrapper: {
    width: '100%',
    backgroundColor: BLACK_PRIMARY,
    borderRadius: getHeight(10),
    padding: getHeight(10)
  }
})

const mapStateToProps = (state) => ({
    subjects: state.subject,
    problem: state.myLearn,
    user: state.user
  })
  
  export default connect(mapStateToProps)(LearnHistory);