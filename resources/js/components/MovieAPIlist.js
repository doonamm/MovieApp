
import MovieList from "./MovieList";
import { useState, useEffect } from 'react';
import axios from "axios";
import { set } from "lodash";
import { getToken } from "../helper/token";

function MovieAPIlist(props) {

    const [listMovie, setListMovie] = useState([]);

    const { title, genre, limit } = props;

    const [next, setNext] = useState(0);

    useEffect(() => {
        getTop10();
    }, [])

    function getTop10() {
        axios.get("http://localhost:8000/api/movies", {
            headers: {
                Authorization: getToken(),
            },
            params: {
                // 'sort_by': 'popularity.asc',
                'limit': limit,
                // 'next': next * 5,
                'genres': [genre],
            },
        })
            .then(function ({ data }) {
                console.log(data);
                setListMovie(data.data);

            })
            .catch(function (error) {
                console.log(error);
            })
    }

    return (
        <div>
            <h2>{title}</h2>

            <MovieList
                list={listMovie}
            />
        </div>
    );
}

export default MovieAPIlist;