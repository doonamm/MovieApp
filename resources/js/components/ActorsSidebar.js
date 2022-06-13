import { useEffect, useState } from "react";
import { connect } from "react-redux";
import {instance} from '../helper/instance';

function ActorsSidebar(props){
    const [direc, setDirec] = useState('.desc');
    const [sort, setSort] = useState('popularity');

    useEffect(()=>{
        triggerQuery();
    }, [direc, sort]);

    function handleInputSearch(e){
        const search = e.target.value.trim();

        props.setQuery({
            ...props.query,
            search: search
        });
    }

    function triggerQuery(){
        props.setQuery(state => {
            return{
                ...state,
                sort_by: sort + direc
            }
        });
    }

    return(
        <div className="movies-sidebar">
            <div className="search">
                <input onChange={handleInputSearch} type="text" placeholder="Search film..."/>
            </div>
            <h3>Sort by</h3>
            <ul className="filter-direc">
                <li onClick={()=>setDirec('.asc')}>Ascending</li>
                <li onClick={()=>setDirec('.desc')}>Descending</li>
            </ul>
            <ul className="filter-selections">
                <li onClick={()=>setSort("popularity")}>Popularity</li>
                <li onClick={()=>setSort("name")}>Name</li>
            </ul>
        </div>
    )
}

export default connect()(ActorsSidebar);