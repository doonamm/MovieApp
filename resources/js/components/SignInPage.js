import { FaFacebookF, FaGooglePlusG, FaLinkedinIn } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import '../../style/SignInPage.scss'
import FormItem from './formItem';
import useInput from '../helper/useInput';
import axios from 'axios';
import { storeToken } from '../helper/token';

function SignInPage(props) {

    const navigate = useNavigate()

    const username = useInput("", false);
    const password = useInput("", false);

    function SignIn(e) {
        e.preventDefault();

        axios.post('http://localhost:8000/api/auth/login', {
            'username': username.value,
            'password': password.value,
        })
            .then(function ({ data }) {
                console.log(data);

                if (data.success == true) {
                    storeToken(data.token);

                    navigate('/');
                } else {
                    alert("Sai cmnr!");
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    return (
        <div className='page signin'>
            <div className='container'>
                <h2 className='margin'>SIGN IN</h2>
                <div className='social_button margin'>
                    <button className='facebook'><FaFacebookF /></button>
                    <button className='google'><FaGooglePlusG /></button>
                    <button className='linkedin'><FaLinkedinIn /></button>
                </div>
                <form className="form" onSubmit={SignIn}>
                    <FormItem
                        title="Username"
                        useInputObject={username}
                    />

                    <FormItem
                        title="Password"
                        type="password"
                        useInputObject={password}
                    />

                    <Link to='#'>Forgot your password ?</Link>
                    <p className='needanaccount'>Need an account?<Link to='/signup'>SIGN UP</Link></p>
                    <button className='signin_button'>Sign In</button>
                </form>
            </div>
        </div>
    )
}
export default SignInPage;