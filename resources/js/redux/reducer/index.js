import { combineReducers } from "redux";
import loginReducer from './loginReducer';
import userReducer from './userReducer';
import chatReducer from './chatReducer';

export default combineReducers({
    login: loginReducer,
    user: userReducer,
    chat: chatReducer
});