import '../../style/QueryPage.scss';

import { useEffect, useState } from "react";
import { connect } from "react-redux";
import MovieList from "./MovieList";
import MoviesSidebar from "./MoviesSidebar";
import { instance } from '../helper/instance';
import {FaPlus} from 'react-icons/fa';
import stateToProps from '../helper/stateToProps';
import AddMoviePopup from './AddMoviePopup';

function MoviesPage(props){
    const [list, setList] = useState([]);
    const [query, setQuery] = useState({
        sort_by: 'popularity.desc'
    });
    const [next, setNext] = useState(0);
    const [openPopup, setOpenPopup] = useState(false);

    useEffect(()=>{
        fetchMovies();
    }, [query]);

    function fetchMovies(){
        instance.get('/movies', {
            params: query
        })
        .then(res => {
            console.log(res);
            if(res.success){
                setList(res.data);
            }
        })
        .catch(console.log);
    }

    function handleShowMore(){
        instance.get('/movies', {
            params: {
                ...query,
                next: next + 20
            }
        })
        .then(res => {
            console.log(res);
            if(res.success){
                setList([...list, ...res.data]);
                setNext(next + 20);
            }
        })
        .catch(console.log);
    }

    return(
        <div className="page movies query-page">
            <MoviesSidebar query={query} setQuery={setQuery}/>
            <div className="main">
                <div className='row'>
                    <h1 className='title'>Search your favorite movie!</h1>
                    {
                        props.user.role === 'admin'
                        &&
                        <button onClick={setOpenPopup} className='admin-btn add'>Add movie</button>
                    }
                </div>
                {openPopup && <AddMoviePopup setOpen={setOpenPopup}/>}
                <MovieList list={list}/>
                <button className='showmore-btn' onClick={handleShowMore}><FaPlus/></button>
            </div>
        </div>
    )
}

export default connect(stateToProps('user'))(MoviesPage);