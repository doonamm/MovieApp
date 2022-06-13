import '../../style/QueryPage.scss';

import { useEffect, useState } from "react";
import { connect } from "react-redux";
import PeopleList from "./PeopleList";
import ActorsSidebar from "./ActorsSidebar";
import { instance } from '../helper/instance';

function ActorsPage(props){
    const [list, setList] = useState([]);

    const [query, setQuery] = useState({
        sort_by: 'popularity.desc',
    });

    useEffect(()=>{
        fetchActors();
    }, [query]);

    function fetchActors(){
        console.log(query);

        instance.get('/actors', {
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

    return(
        <div className="page actors query-page">
            <ActorsSidebar query={query} setQuery={setQuery}/>
            <div className="main">
                <h1>Search your favorite actor!</h1>
                <PeopleList list={list}/>
            </div>
        </div>
    )
}

export default connect()(ActorsPage);