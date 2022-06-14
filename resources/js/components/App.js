import '../../style/index.css';

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Nav from './Nav';
import SignInPage from './SignInPage';
import SignUpPage from './SignUpPage';
import SingleMoviePage from './SingleMoviePage';
import LandingPage from './LandingPage';
import MoviesPage from './MoviesPage';
import { login } from '../redux/action/loginAction';
import ActorsPage from './ActorsPage';

import SignUpProfile from './SignUpProfile';
<<<<<<< HEAD
import ResetPasswordPage from './ResetPassworPage';
=======
import HomePage from './HomePage';
import SingleActorPage from './SingleActorPage';

>>>>>>> f01f5d27bad9bcc2f071e00851cb1507f6019225
function App(props) {
    useEffect(() => {
        if (localStorage.getItem('access')) {
            props.login();
        }
    }, []);

    return (
        <BrowserRouter>
            <Nav />
            <Routes>
                {/* --------- Add Page here ----------- */}

                <Route path='/home' element={< LandingPage />} ></Route>

                <Route path='/' element={<LandingPage/>} ></Route>

                <Route path='/signin' element={<SignInPage />}></Route>
                <Route path='/signup' element={<SignUpPage />}></Route>
                <Route path='/signupprofile' element={<SignUpProfile />}></Route>
                <Route path='/movies' element={<MoviesPage />}></Route>
                <Route path='/movies/:id' element={<SingleMoviePage />}></Route>
<<<<<<< HEAD
                <Route path='/actors' element={<ActorsPage />}></Route>

                <Route path="/reset" element={<ResetPasswordPage />}></Route>
=======
                <Route path='/actors' element={<ActorsPage/>}></Route>
                <Route path='/actors/:id' element={<SingleActorPage/>}></Route>

>>>>>>> f01f5d27bad9bcc2f071e00851cb1507f6019225
            </Routes>

        </BrowserRouter >
    );
}

const mapDispatchToProps = {
    login
}

export default connect(null, mapDispatchToProps)(App);