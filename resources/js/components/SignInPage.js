import { FaFacebookF, FaGooglePlusG, FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../../style/SignInPage.scss'
import FormItem from './formItem';
import useInput from '../helper/useInput';
import axios from 'axios';

function SignInPage(props) {

    const email = useInput("", false);
    const password = useInput("", false);

    function SignIn() {
        axios.post('http://localhost:8000/api/auth/login', {
            'username': email.value,
            'password': password.value,
        })
            .then(function (response) {
                console.log(response);
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
                    {/* <input className='margin' type='text' placeholder="Username" />
                    <input className=' margin' type='text' placeholder="Password" /> */}

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

                    <Link to='#'>Forgot your password ?</Link>
                    <p className='needanaccount'>Need an account?<Link to='/signup'>SIGN UP</Link></p>
                    <button className='signin_button'>Sign In</button>
                </form>
            </div>
        </div>
    )
}
export default SignInPage;