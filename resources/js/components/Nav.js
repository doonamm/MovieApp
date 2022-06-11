import '../../style/Nav.scss';

import { connect } from "react-redux";
import {GiMagnifyingGlass} from 'react-icons/gi';
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';

function Nav(props){
    const location = useLocation();

    if(location.pathname === '/signin'){
        return null;
    }
   
    const [open, setOpen] = useState(false);

    function toggleController(){
        setOpen(state => !state);
    }

    return(
        <div className="nav">
            <div className="wrap-center">
                <div className='left'>
                    <div className="logo img-wrapper">
                        <img src="https://previews.123rf.com/images/michaelrayback/michaelrayback1610/michaelrayback161000022/64360128-.jpg"/>
                    </div>
                    <ul className='nav-list'>
                        <li><span>Home</span></li>
                        <li><span>Movies</span></li>
                        <li><span>Collections</span></li>
                    </ul>
                </div>
                <div className='right'>
                    <form className="search">
                        <input type="text" placeholder="Search film..."/>
                        <button type="submit"><GiMagnifyingGlass/></button>
                    </form>
                    <div className="user-controllers">
                        <div onClick={toggleController} className="img-wrapper avatar">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/2048px-User_font_awesome.svg.png"/>
                        </div>
                        {/* 
                            ---- Todo ----
                            Announce component
                        
                        */}
                        <ul className={open ? "controllers show" : "controllers"}>
                            <li>Settings</li>
                            <li>Edit profile</li>
                            <li>Sign out</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );

    <MovieAPi genre="aaa" limit="10"/>
}

export default connect()(Nav);