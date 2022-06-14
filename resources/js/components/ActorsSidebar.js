import { useEffect, useState } from "react";
import { connect } from "react-redux";
import {instance} from '../helper/instance';
import {FaArrowUp, FaArrowDown} from 'react-icons/fa';

const sorts = ['popularity', 'name'];

function ActorsSidebar(props){
    const [isDesc, setIsDesc] = useState(true);
    const [sort, setSort] = useState('popularity');

    useEffect(()=>{
        triggerQuery();
    }, [isDesc, sort]);

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
                sort_by: sort + (isDesc ? '.desc' : '.asc')
            }
        });
    }

    function toggleDirec(){
        setIsDesc(!isDesc);
    }

    return(
        <div className="sidebar actors">
            <div className="search">
                <input onChange={handleInputSearch} type="text" placeholder="Search actor..."/>
            </div>
            <div className="filter-container">
                <div className="row">
                    <h3>Sort by</h3>
                    <button onClick={toggleDirec}>{isDesc ? <FaArrowDown/> : <FaArrowUp/>}</button>
                </div>
                <ul className="filter-selections">
                    {
                        sorts.map(o => <li className={sort === o ? 'selected' : ''} onClick={()=>setSort(o)}>{o}</li>)
                    }
                </ul>
            </div>
        </div>
    )
}

export default connect()(ActorsSidebar);