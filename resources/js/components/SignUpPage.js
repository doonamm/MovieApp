import React from "react";
import validator from 'validator';
import FormItem from "./formItem";
import axios from "axios";
import useInput from '../helper/useInput';

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
        <div>
            <div>
                <h2>
                    SIGN UP
                </h2>
            </div>

            <div className="form-container">
                <form action="#" onSubmit={Register}>
                    <FormItem
                        title="Email"
                        type="email"
                        useInputObject={email}
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