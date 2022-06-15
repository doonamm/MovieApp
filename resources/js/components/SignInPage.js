import { FaFacebookF, FaGooglePlusG, FaLinkedinIn } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import '../../style/SignInPage.scss'
import FormItem from './formItem';
import useInput from '../helper/useInput';
import axios from 'axios';
import { storeToken } from '../helper/token';
import { login } from '../redux/action/loginAction';
import { setId, setRole } from '../redux/action/userAction';
import { connect } from 'react-redux';
import logo from '../../img/logo1.png';

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
            .then(function ({ data: res }) {
                if (res.success) {
                    swal('Success', 'Sign in successfully!', 'success');
                    storeToken(res.token);
                    props.setId(res.user_id);
                    props.setRole(res.role);
                    props.login();
                    navigate('/home');
                }
                else {
                    username.setError("Wrong username or password");
                    password.setValue("");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div className='page signin'>
            <div className='container'>

                <div className='img-wrapper'>
                    <Link to="/home"><img src={logo}></img></Link>
                </div>
                <h2 className='margin'>SIGN IN</h2>
                <div className='social_button margin'>
                    <button className='facebook'><FaFacebookF /></button>
                    <button className='google'><FaGooglePlusG /></button>
                    <button className='linkedin'><FaLinkedinIn /></button>
                </div>
                <form className="form" onSubmit={SignIn}>
                    <FormItem
                        title="Username"
                        type="text"
                        useInputObject={username}
                    />
                    <FormItem
                        title="Password"
                        type="password"
                        useInputObject={password}
                        className="margin"
                    />
                    <Link to='#'>Forgot your password ?</Link>
                    <p className='needanaccount'>Need an account?<Link to='/signup'>SIGN UP</Link></p>
                    <button className='signin_button'>Sign In</button>
                </form>
            </div>
        </div>
    )
}

const mapDispatchToProps = {
    login,
    setId,
    setRole
}
export default connect(null, mapDispatchToProps)(SignInPage);