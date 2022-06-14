import { FaFacebookF, FaGooglePlusG, FaLinkedinIn } from 'react-icons/fa';
import React from "react";
import { Link, useNavigate } from 'react-router-dom';

import validator from 'validator';
import FormItem from "./formItem";
import axios from "axios";
import useInput from '../helper/useInput';
import '../../style/SignUpPage.scss';

import logo from '../../img/logo.png';
import { useState } from 'react';
import SignUpProfile from './SignUpProfile';

function SignUpPage() {

    const navigate = useNavigate();
    const username = useInput("", false);
    const password = useInput("", false);
    const repassword = useInput("", false);

    const [showClass, setShowClass] = useState("signUpProfile");

    const [id, setID] = useState(0);

    function Register(e) {
        e.preventDefault();
        var flag = false;

        if (!validator.isAlphanumeric(username.value)) {
            username.setError("Invalid username")
            flag = true;
        }

        if (!validator.isAlphanumeric(password.value)) {
            password.setError("Invalid Password")
            flag = true;
        }

        if (password.value !== repassword.value) {
            repassword.setError("Confirm Password is not correct!")
            flag = true;
        }

        if (flag) {
            return;
        }

        axios.post('http://localhost:8000/api/auth/register', {
            'username': username.value,
            'password': password.value,
            'password_confirmation': repassword.value,
        })
            .then(function (data) {
                console.log(data.data);
                if (data.data.success == true) {
                    setID(data.data.id);
                    setShowClass("showSignUpProfile");
                }
                else {
                    alert(data.data.error.username[0]);
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    return (
        <div className="page signup">

            <div className="container">
                <div className='img-wrapper'>
                    <Link to="/home"><img src={logo}></img></Link>
                </div>
                <h2 className="margin">
                    SIGN UP
                </h2>
                <div className='social_button'>
                    <button className='facebook'><FaFacebookF /></button>
                    <button className='google'><FaGooglePlusG /></button>
                    <button className='linkedin'><FaLinkedinIn /></button>
                </div>
                <div className='form'>
                    <form action="#" onSubmit={Register}>
                        <FormItem
                            title="Username"
                            type="text"

                            useInputObject={username}

                            className="input_form"
                            placeholder="Username"
                        />

                        <FormItem
                            title="Password"
                            type="password"
                            useInputObject={password}
                            className="input_form"
                            placeholder="Password"
                        />

                        <FormItem
                            title="Confirm Password"
                            type="password"
                            useInputObject={repassword}
                            className="input_form"
                            placeholder="Confirm Password"
                        />
                        <input className='signup_btn' type="submit" value="SIGN UP" />
                        <p className='already_a_user'> Already a user ? <Link to='/signin'>SIGN IN</Link></p>
                    </form>
                </div>


                <SignUpProfile
                    id={id}
                    className={showClass}
                />
            </div>
        </div>
    );
}

export default SignUpPage;