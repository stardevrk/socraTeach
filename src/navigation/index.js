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
import SolveScreen from '../pages/thSolve';
import LearnSolve from '../pages/leSolve';
import TeachSubject from '../pages/teach';
import ChooseProblem from '../pages/chProblem';
import Camera from '../pages/camera';
import TeachHistory from '../pages/thHistory';
import LearnHistory from '../pages/leHistory';
import ChatScreen from '../pages/chat';
import LiveLearn from '../pages/liveLearn';
import Bank from '../pages/signup/bank';
import SubProblem from '../pages/subProblem';
import LearnStart from '../pages/learnStart';
import TeachStart from '../pages/teachStart';
import NotiStudent from '../pages/notiStudent';
import Payments from '../pages/payments';
import Banks from '../pages/banks';
import TransactionHistory from '../pages/transactionHistory';
import Transfer from '../pages/transfer';
import TransferStarted from '../pages/transferStarted';
import PaymentSetup from '../pages/paymentSetup';
import BankSetup from '../pages/bankSetup';
import Help from '../pages/help';
import Session from '../pages/session';

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
        [pages.CAMERA]: Camera,
        [pages.PROBLEM_CROP]: ProblemCrop,
        [pages.SEARCH_SOPHIST]: SearchSophist,
        [pages.CHOOSE_SOPHIST]: ChooseSophist,
        [pages.TEACH_SOLVE]: SolveScreen,
        [pages.LEARN_SOLVE]: LearnSolve,
        [pages.TEACH_SUBJECT]: TeachSubject,
        [pages.CHOOSE_PROBLEM]: ChooseProblem,
        [pages.TEACH_HISTORY]: TeachHistory,
        [pages.LEARN_HISTORY]: LearnHistory,
        [pages.CHAT_SCREEN]: ChatScreen,
        [pages.LIVE_LEARN]: LiveLearn,
        [pages.PROBLEM_SUBMITTED]: SubProblem,
        [pages.LEARN_START]: LearnStart,
        [pages.TEACH_START]: TeachStart,
        [pages.NOTI_STUDENT]: NotiStudent,
        [pages.PAYMENTS]: Payments,
        [pages.PAYMENTS_SETUP]: PaymentSetup,
        [pages.BANKS]: Banks,
        [pages.BANK_SETUP]: BankSetup,
        [pages.TRANSACTION_HISTORY]: TransactionHistory,
        [pages.TRANSFER]: Transfer,
        [pages.TRANSFER_STARTED]: TransferStarted,
        [pages.HELP]: Help,
        [pages.SESSION]: Session
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
        [pages.SINGUP_FINISH]: Finish,
        [pages.BANK]: Bank
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