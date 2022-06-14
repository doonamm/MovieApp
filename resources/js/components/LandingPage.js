import { useEffect, useState } from "react";
import MovieAPIlist from "./MovieAPIlist";
import { getToken } from "../helper/token";
import '../../style/LandingPage.scss';
import { instance } from "../helper/instance";

function LandingPage() {
    const [listGenres, setListGenres] = useState([]);

    useEffect(() => {
        getListGenres();
    }, [])

    function getListGenres() {
        instance.get("/genres")
            .then(function (res) {
                if (res.success) {
                    setListGenres(res.data);
                }
            })
            .catch(console.log);
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
