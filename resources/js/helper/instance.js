import axios from "axios";
import store from './store';
import { logout } from "../redux/action/loginAction";
import { getToken, clearToken } from "./token";
import swal from "sweetalert";

export const instance = axios.create({
    baseURL: 'http://localhost:8000/api',
    timeout: 10*1000,
    headers: {
        'Content-Type': 'application/json',
    }
});

instance.interceptors.request.use(config => {
    if(!getToken()){
        throw Error("Token not parsed!");
    }
    config.headers['Authorization'] = getToken();
    return config;
}, err => {
    return Promise.reject(err);
});

instance.interceptors.response.use(async response => {
    const {data: resData} = response;
    if(resData.success === false && resData.type === 'expired' && !getToken()){
        swal("Token expired!", "Session timeout!", "warning");
        clearToken();
        store.dispatch(logout());
        window.location = '/';
        return;
    }

    return resData;
}, err => Promise.reject(err));