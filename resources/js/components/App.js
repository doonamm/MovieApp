import '../../style/index.css';

import React from 'react';
import { connect } from 'react-redux';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Nav from './Nav';
import SignInPage from './SignInPage';

function App(props) {

    return (
        <BrowserRouter>
            <Nav/>
            <Routes>
                {/* --------- Add Page here ----------- */}
                <Route path='/signin' element={<SignInPage/>}></Route>
            </Routes>

        </BrowserRouter>
    );
}

export default connect()(App);