import '../../style/Nav.scss';

import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import stateToProps from '../helper/stateToProps';
import { logout } from '../redux/action/loginAction';

function Nav(props) {
    const location = useLocation();
    const navigate = useNavigate();

    const [openUserController, setOpenUserController] = useState(false);

    function toggleUserController() {
        setOpenUserController(state => !state);
    }

    function handleSignOut() {
        swal('Bye bye', 'Good bye my friend!', 'success');
        props.logout();
        localStorage.clear();
        navigate('/');
    }

    if (location.pathname === '/signin' || location.pathname === '/signup') {
        return null;
    }

    const userId = props.user.id || localStorage.getItem('user_id');

    return (
        <div className="nav">
            <div className="wrap-center">
                <div className='left'>
                    <div className="logo img-wrapper">
                        <Link to="/">
                            <img src="https://previews.123rf.com/images/michaelrayback/michaelrayback1610/michaelrayback161000022/64360128-.jpg" />
                        </Link>
                    </div>
                    <ul className='nav-list'>
                        <li><Link to="/movies">Movies</Link></li>
                        <li><Link to="/actors">Actors</Link></li>
                    </ul>
                </div>
                <div className='right'>
                    {props.login.isLogged ? (
                        <div className="user-controllers">
                            <div onClick={toggleUserController} className="img-wrapper avatar">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/2048px-User_font_awesome.svg.png" />
                            </div>
                            <ul className={openUserController ? "controllers show" : "controllers"}>
                                <li>Settings</li>
                                <li onClick={()=>navigate('/profile/' + userId)}>Profile</li>
                                <li onClick={handleSignOut}>Sign out</li>
                            </ul>
                        </div>
                    ) : (
                        <div className='btn-container'>
                            <button onClick={() => navigate('/signin')}>Sign in</button>
                            <button onClick={() => navigate('/signup')}>Sign up</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

const mapDispatchToProps = {
    logout
}

export default connect(stateToProps('login', 'user'), mapDispatchToProps)(Nav);