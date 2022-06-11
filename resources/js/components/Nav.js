import '../../style/Nav.scss';

import { connect } from "react-redux";
import { GiMagnifyingGlass } from 'react-icons/gi';
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { set } from 'lodash';
import axios from 'axios';
import { getToken } from '../helper/token';

function Nav(props) {
    const location = useLocation();
    const navigate = useNavigate();

    if (location.pathname === '/signin') {
        return null;
    }

    const [open, setOpen] = useState(false);
    const [inputVal, setInputVal] = useState("");

    function toggleController() {
        setOpen(state => !state);
    }

    function searchFilm(e) {
        e.preventDefault();
        axios.get("http://localhost:8000/api/movies", {
            headers: {
                Authorization: getToken(),
            },
            params: {
                'search': inputVal,
            },
        })
            .then(function ({ data }) {
                console.log(data);
                setSearchFilmResult(data);

                navigate("/chitietfilm", {
                    data: data,
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

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
                        <li><span>
                            <Link to="/">Home</Link>
                        </span></li>

                        <li><span>
                            <Link to="#">Movies</Link>
                        </span></li>

                        <li><span>
                            <Link to="#">Collections</Link>
                        </span></li>
                    </ul>
                </div>

                <div className='right'>
                    <form className="search" onSubmit={searchFilm}>
                        <input type="text" placeholder="Search film..." onChange={evt => { setInputVal(evt.target.value) }} />
                        <button type="submit"><GiMagnifyingGlass /></button>
                    </form>

                    <div className="user-controllers">
                        <div onClick={toggleController} className="img-wrapper avatar">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/2048px-User_font_awesome.svg.png" />
                        </div>
                        {/* 
                            ---- Todo ----
                            Announce component
                        
                        */}
                        <ul className={open ? "controllers show" : "controllers"}>
                            <li>
                                <Link to='#'>Settings</Link>
                            </li>
                            <li>
                                <Link to="#">Profile</Link>
                            </li>
                            <li>
                                <Link to="#">Sign out</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );

    <MovieAPi genre="aaa" limit="10" />
}

export default connect()(Nav);