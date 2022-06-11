
import MovieList from "./MovieList";
import { useState, useEffect } from 'react';
import axios from "axios";
import { set } from "lodash";
import { getToken } from "../helper/token";
import React from "react";

function MovieAPIlist(props) {

    const [listMovie, setListMovie] = useState([]);

    const { title, genre, limit } = props;

    const [next, setNext] = useState(0);

    const [err, setErr] = useState("");

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
                'genres': [genre],
            },
        })
            .then(function ({ data }) {
                if (data.success == false) {
                    setErr("KHONG THE LOAD FILM");
                } else {
                    console.log(data);
                    setListMovie(data.data);
                    setNext(next + limit);
                }
            })
            .catch(function (error) {
                console.log(error);
                setErr("KHONG THE LOAD FILM");
            })
    }

    function loadMoreFilm(e) {
        e.preventDefault();

        axios.get("http://localhost:8000/api/movies", {
            headers: {
                Authorization: getToken(),
            },
            params: {
                'limit': limit,
                'next': next != 0 ? next : undefined,
                'genres': [genre],
            },
        })
            .then(function ({ data }) {
                if (data.success) {
                    console.log(data);
                    setListMovie([...listMovie, ...data.data]);
                    setNext(next + limit);
                } else {
                    alert("KHONG THE LOAD THEM FILM");
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    return (
        <div>
            <h2>{title}</h2>

            {/* <MovieList list={listMovie} /> */}
            {!err && <MovieList list={listMovie} />}

            {!err && next < 50 && <button onClick={loadMoreFilm}>LOAD MORE</button>}
        </div>
    );
}

export default MovieAPIlist;
