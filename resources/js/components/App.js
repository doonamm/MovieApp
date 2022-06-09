import '../../style/index.css';

import React from 'react';
import { connect } from 'react-redux';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Nav from './Nav';
import SignInPage from './SignInPage';
import SignUpPage from './SignUpPage';
import SingleMoviePage from './SingleMoviePage';
import LandingPage from './LandingPage';

function App(props) {

    return (
        <BrowserRouter>
            <Nav />
            <Routes>
                {/* --------- Add Page here ----------- */}
                <Route path='/signin' element={<SignInPage />}></Route>
                <Route path='/signup' element={<SignUpPage />}></Route>

                <Route path='/:id' element={<SingleMoviePage />}></Route>
                <Route path='/' element={< LandingPage />} ></Route>
            </Routes>

        </BrowserRouter >
    );
}

export default connect()(App);