import { useEffect, useState } from "react";
import { connect } from "react-redux";
import {instance} from '../helper/instance';

function MoviesSidebar(props){
    const [genres, setGenres] = useState(['all']);

    useEffect(()=>{
        instance.get('/genres')
        .then(res => {
            if(res.success){
                setGenres(res.data);
            }
        })
        .catch(console.log);
    }, []);

    function handleInputSearch(e){
        const search = e.target.value.trim();

        props.setQuery({
            ...props.query,
            search: search
        });
    }

    function setSelectedSort(sort){
        props.setQuery(state => {
            return{
                ...state,
                sort_by: sort + '.desc'
            }
        });
    }

    function toggleSelectGenre(genre){
        const genres = props.query.genres || [];
        const i = genres.findIndex(item => item === genre);
        if(i > -1){
            props.setQuery(state => {
                return{
                    ...state,
                    genres: genres.filter((o, index) => index !== i)
                };
            });
        }
        else{
            props.setQuery(state => {
                return{
                    ...state,
                    genres: [...genres, genre]
                };
            });
        }
    }

    return(
        <div className="movies-sidebar">
            <div className="search">
                <input onChange={handleInputSearch} type="text" placeholder="Search film..."/>
            </div>
            <h3>Discovery</h3>
            <ul className="filter-selections">
                <li onClick={()=>setSelectedSort("popularity")}>Popularity</li>
                <li onClick={()=>setSelectedSort("vote_average")}>Top rated</li>
                <li onClick={()=>setSelectedSort("release_date")}>Newest</li>
            </ul>
            <h3>Genres</h3>
            <ul className="filter-selections">
                {
                    genres.map(genre => <li key={genre.id} onClick={()=>toggleSelectGenre(genre.name)}>{genre.name}</li>)
                }
            </ul>
        </div>
    )
}

export default connect()(MoviesSidebar);