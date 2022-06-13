import axios from "axios";
import { useEffect, useState } from "react";
import MovieAPIlist from "./MovieAPIlist";
import { getToken } from "../helper/token";
import '../../style/LandingPage.scss';
function LandingPage() {

    const [listGenres, setListGenres] = useState([]);

    useEffect(() => {
        getListGenres();
    }, [])

    function getListGenres() {
        axios.get("http://localhost:8000/api/genres", {
            headers: {
                Authorization: getToken(),
            },
        })
            .then(function ({ data }) {
                console.log(data);
                setListGenres(data.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }


    return (
        <div className="landing_page wrap-center">
            {
                listGenres.map(genre => <MovieAPIlist key={genre.id} title={genre.name} limit={10} genre={genre.name} />)
            }
        </div>
    );
}
export default LandingPage;
