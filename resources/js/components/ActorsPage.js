import '../../style/QueryPage.scss';

import { useEffect, useState } from "react";
import { connect } from "react-redux";
import PeopleList from "./PeopleList";
import ActorsSidebar from "./ActorsSidebar";
import { instance } from '../helper/instance';
import {FaPlus} from 'react-icons/fa';

function ActorsPage(props){
    const [list, setList] = useState([]);
    const [next, setNext] = useState(0);

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

    function handleShowMore(){
        instance.get('/actors', {
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
        <div className="page actors query-page">
            <ActorsSidebar query={query} setQuery={setQuery}/>
            <div className="main">
                <h1 className='title'>Search your favorite actor!</h1>
                <PeopleList list={list}/>
                <button className='showmore-btn' onClick={handleShowMore}><FaPlus/></button>
            </div>
        </div>
    )
}

export default connect()(ActorsPage);