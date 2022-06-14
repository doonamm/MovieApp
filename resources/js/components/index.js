import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from '../helper/store';
import { Provider } from 'react-redux';
import Echo from 'laravel-echo';

const root = document.getElementById('root');
ReactDOM.render((
    <Provider store={store}> 
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>
), root);