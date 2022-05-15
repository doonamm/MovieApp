import React from 'react';
import { connect } from 'react-redux';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import stateToProps from '../helper/stateToProps';

import Example_Nav from './exampleComponents/Example_Nav';
import Example_Footer from './exampleComponents/Example_Footer';
import Example_MainPage from './exampleComponents/Example_MainPage';
import Example_AnotherPage from './exampleComponents/Example_AnotherPage';

import '../../sass/Example_style.scss';

function App(props) {

    if(props.login.isLogged === true){
        console.log('Welcomeeeeeeeeeee');
    }

    return (
        <BrowserRouter>
            <Example_Nav/>
            <Routes>
                <Route path="/" element={<Example_MainPage/>}></Route>
                <Route path="/another" element={<Example_AnotherPage/>}></Route>
            </Routes>
            <Example_Footer/>
        </BrowserRouter>
    );
}

export default connect(stateToProps('login'))(App);