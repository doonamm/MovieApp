import '../../style/QueryPage.scss';

import { useEffect, useState } from "react";
import { connect } from "react-redux";
import MovieList from "./MovieList";
import MoviesSidebar from "./MoviesSidebar";
import { instance } from '../helper/instance';
import {FaPlus} from 'react-icons/fa';

function MoviesPage(props){
    const [list, setList] = useState([]);
    const [query, setQuery] = useState({
        sort_by: 'popularity.desc'
    });
    const [next, setNext] = useState(0);

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
                <h1 className='title'>Search your favorite movie!</h1>
                <MovieList list={list}/>
                <button className='showmore-btn' onClick={handleShowMore}><FaPlus/></button>
            </div>
        </div>
    )
}

export default connect()(MoviesPage);