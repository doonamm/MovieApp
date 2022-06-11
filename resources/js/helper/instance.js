import axios from "axios";
import store from './store';
// import { signOut } from "../redux/action/status";
import { getToken, clearToken } from "./token";

export const instance = axios.create({
    timeout: 10 * 1000,
    headers: {
        'Content-Type': 'application/json'
    }
});

instance.interceptors.request.use(config => {
    config.headers['Authorization'] = getToken();
    return config;
}, err => Promise.reject(err))

instance.interceptors.response.use(async response => {
    const { data: resData } = response;

    if (resData.status === 'fail' && resData.message === 'Token expired') {
        alert('Session timeout!');
        clearToken();
        store.dispatch(signOut());
        return;
    }

    return resData;
}, err => Promise.reject(err));