import Settings from './Setting';
import Common from './Common';
import Dashboard from './Dashboard';
import Ecommerce from './Ecommerce';
import ChatApp from './ChatApp';
import MailApp from './MailApp';
import ScrumBoard from './ScrumboardApp';
import ContactApp from './ContactApp';
import WallApp from './WallApp';
import ToDoApp from './ToDoApp';
import UserList from './UserList';
import Auth from './Auth';
import Shop from './Shop';
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const authPersistConfig = {
  key: 'auth',
  storage,
  blacklist: [''],
  whitelist: ['accessToken', 'refreshToken', 'isAuthenticated'],
};

const dashboardPersistConfig = {
  key: 'dashboard',
  storage,
  blacklist: [''],
  whitelist: ['number'],
};

const reducers = combineReducers({
  settings: Settings,
  auth: persistReducer(authPersistConfig, Auth),
  dashboard: persistReducer(dashboardPersistConfig, Dashboard),
  ecommerce: Ecommerce,
  common: Common,
  chatApp: ChatApp,
  mailApp: MailApp,
  contactApp: ContactApp,
  scrumboardApp: ScrumBoard,
  wallApp: WallApp,
  todoApp: ToDoApp,
  userList: UserList,
  shop: Shop,
});

export default reducers;
