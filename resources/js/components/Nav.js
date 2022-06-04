import '../../style/Nav.scss';

import { connect } from "react-redux";
import {GiMagnifyingGlass} from 'react-icons/gi';
import { useState } from "react";

function Nav(props){

    const [open, setOpen] = useState(false);

    function toggleController(){
        setOpen(state => !state);
    }

    return(
        <div className="nav">
            <div className="wrap-center">
                <div className="logo img-wrapper">
                    <img src="https://previews.123rf.com/images/michaelrayback/michaelrayback1610/michaelrayback161000022/64360128-.jpg"/>
                </div>
                <ul>
                    <li>Home</li>
                    <li>Movies</li>
                    <li>Collections</li>
                </ul>
                <form className="search">
                    <input type="text"/>
                    <button type="submit"><GiMagnifyingGlass/></button>
                </form>
                <div className="user-controllers">
                    <div onClick={toggleController} className="img-wrapper">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/2048px-User_font_awesome.svg.png"/>
                    </div>
                    {open && (
                        <ul className="controllers">
                            <li>Settings</li>
                            <li>Edit profile</li>
                            <li>Sign out</li>
                        </ul>
                    )}
                </div>
            </div>
        </div>
    )
}

export default connect()(Nav);