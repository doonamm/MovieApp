
import MovieList from "./MovieList";
import { useState, useEffect } from 'react';
import axios from "axios";
import { set } from "lodash";
import { getToken } from "../helper/token";

function MovieAPIlist(props) {

    const [listMovie, setListMovie] = useState([]);

    const { title, genre, limit } = props;

    useEffect(() => {
        getTop10();
    }, [])

    function getTop10() {
        axios.get("http://localhost:8000/api/movies", {
            headers: {
                Authorization: getToken(),
            },
            params: {
                'limit': limit,
                'genres': [genre],
            },
        })
            .then(function ({ data }) {
                setListMovie(data.data);

            })
            .catch(function (error) {
                console.log(error);
            })
    }

    return (
        <div className="movie_land">
            <h2 className="title">{title}</h2>
            <MovieList
                list={listMovie}
            />
        </div>
    );
}

export default MovieAPIlist;