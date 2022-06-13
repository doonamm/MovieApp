import { FaFacebookF, FaGooglePlusG, FaLinkedinIn } from 'react-icons/fa';
import React from "react";
import validator from 'validator';
import FormItem from "./formItem";
import axios from "axios";
import useInput from '../helper/useInput';
import '../../style/SignUpPage.scss';
import logo from '../../img/logo.png';
function SignUpPage() {

    const email = useInput("", false);
    const password = useInput("", false);
    const repassword = useInput("", false);

    function Register(e) {
        e.preventDefault();
        var flag = false;

        if (!validator.isEmail(email.value)) {
            email.setError("Invalid Email")
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
            'username': email.value,
            'password': password.value,
            'password_confirmation': repassword.value,
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    return (
        <div className="page signup">
            
            <div className="container">
                <div className='img-wrapper'>
                    <img src={logo}></img>
                </div>
                <h2 className="margin">
                    SIGN UP
                </h2>
                <p>Sign up with: </p>
                <div className='social_button'>
                    <button className='facebook'><FaFacebookF /></button>
                    <button className='google'><FaGooglePlusG /></button>
                    <button className='linkedin'><FaLinkedinIn /></button>
                </div>
                <div className='form'>
                    <form action="#" onSubmit={Register}>
                        <FormItem
                            title="Email"
                            type="email"
                            useInputObject={email}
                            className="input_form"
                            placeholder="Email/ Username"
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

                        <input class='signup_btn' type="submit" value="SIGN UP" />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUpPage;