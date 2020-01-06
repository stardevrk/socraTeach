import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import pages from '../constants/pages';
import Loading from '../pages/loading';
import Welcome from '../pages/welcome';
import Login from '../pages/login';
import Signup from '../pages/signup/signup';
import PayTeaching from '../pages/signup/payForTeaching';
import PayLearning from '../pages/signup/payForLearning';
import Payment from '../pages/signup/payment';
import Finish from '../pages/signup/finish';
import HomeScreen from '../pages/home';
import MenuContent from '../pages/menu';
import LearnSubject from '../pages/learn';
import PhotoLibrary from '../pages/pLibrary';
import ProblemCrop from '../pages/imCrop';
import SearchSophist from '../pages/seSophist';
import ChooseSophist from '../pages/chSophist';
import SolveScreen from '../pages/solve';
import TeachSubject from '../pages/teach';
import ChooseProblem from '../pages/chProblem';

const navigatorConfig = {
    defaultNavigationOptions: {
        header: null
    }
}

const AppDrawer = createDrawerNavigator(
    {
        [pages.HOME_SCREEN]: HomeScreen,
        [pages.LEARN_SUBJECT]: LearnSubject,
        [pages.CAMERA_ROLL]: PhotoLibrary,
        [pages.PROBLEM_CROP]: ProblemCrop,
        [pages.SEARCH_SOPHIST]: SearchSophist,
        [pages.CHOOSE_SOPHIST]: ChooseSophist,
        [pages.PROBLEM_SOLVE]: SolveScreen,
        [pages.TEACH_SUBJECT]: TeachSubject,
        [pages.CHOOSE_PROBLEM]: ChooseProblem
    },
    {
        initialRouteName: pages.HOME_SCREEN,
        contentComponent: MenuContent,
        overlayColor: 'rgba(0, 0, 0, 0.7)'
    }
);

const AuthStack = createStackNavigator(
    {
        [pages.INIT_SCREEN]: Welcome,
        [pages.SIGN_IN]: Login,
        [pages.SIGN_UP]: Signup,
        [pages.PAY_TEACHING]: PayTeaching,
        [pages.PAY_LEARNING]: PayLearning,
        [pages.PAYMENT]: Payment,
        [pages.SINGUP_FINISH]: Finish
    },
    navigatorConfig
);

const RootNavigator = createSwitchNavigator(
    {
        [pages.LOADING]: Loading,
        [pages.AUTH]: AuthStack,
        [pages.APP]: AppDrawer
    },
    {
        initialRouteName: pages.LOADING
    }
)

export const AppContainer = createAppContainer(RootNavigator);