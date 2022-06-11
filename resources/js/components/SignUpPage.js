import React from "react";
import validator from 'validator';
import FormItem from "./formItem";
import axios from "axios";
import useInput from '../helper/useInput';
import { useNavigate } from 'react-router-dom';

function SignUpPage() {

    const username = useInput("", false);
    const password = useInput("", false);
    const repassword = useInput("", false);
    const navigate = useNavigate();


    function Register(e) {
        e.preventDefault();
        var flag = false;

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
                console.log(data);
                if (data.data.success == false) {
                    alert(data.data.message);
                } else {
                    navigate('/signin');
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    return (
        <div>
            <div>
                <h2>
                    SIGN UP
                </h2>
            </div>

            <div className="form-container">
                <form action="#" onSubmit={Register}>
                    <FormItem
                        title="Username"
                        useInputObject={username}
                    />

                    <FormItem
                        title="Password"
                        type="password"
                        useInputObject={password}
                    />

                    <FormItem
                        title="Confirm Password"
                        type="password"
                        useInputObject={repassword}
                    />

                    <input type="submit" value="SIGN UP" />
                </form>
            </div>
        </div>
    );
}

export default SignUpPage;