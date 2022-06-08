import {FaFacebookF, FaGooglePlusG, FaLinkedinIn} from 'react-icons/fa';
import '../../style/SignInPage.scss'
function SignInPage(props){
    return(
        <div className='page signin'>
            <div className='container'>
                <h2 className='margin'>SIGN IN</h2>
                <div className='social_button margin'>
                    <button className='facebook'><FaFacebookF/></button>
                    <button className='google'><FaGooglePlusG/></button>
                    <button className='linkedin'><FaLinkedinIn/></button>
                </div>
                <div className="form margin">
                    <input className='margin' type='text' placeholder="Username"/>
                    <input className=' margin' type='text' placeholder="Password"/>
                    <i className='margin'>Forgot your password ?</i>
                    <button className='signin_button'>Sign In</button>
                </div>
            </div>
        </div>
    )
}
export default SignInPage;