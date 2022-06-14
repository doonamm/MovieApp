import { useEffect, useState } from "react";
import { connect } from "react-redux";
import {instance} from '../helper/instance';

function MoviesSidebar(props){
    const [genres, setGenres] = useState(['all']);
    const [selectedSortIndex, setSelectedSortIndex] = useState(0);

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

    function setSelectedSort(sort, index){
        setSelectedSortIndex(index);

        props.setQuery(state => {
            return{
                ...state,
                sort_by: sort + '.desc'
            }
        });
    }

    function toggleSelectGenre(genre, e){
        e.target.classList.toggle('selected');

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
        <div className="sidebar movies">
            <div className="search">
                <input onChange={handleInputSearch} type="text" placeholder="Search film..."/>
            </div>
            <div className="filter-container">
                <h3>Discovery</h3>
                <ul className="filter-selections">
                    <li className={selectedSortIndex === 0 ? 'selected' : ''} onClick={()=>setSelectedSort("popularity", 0)}>Popularity</li>
                    <li className={selectedSortIndex === 1 ? 'selected' : ''} onClick={()=>setSelectedSort("vote_average", 1)}>Top rated</li>
                    <li className={selectedSortIndex === 2 ? 'selected' : ''} onClick={()=>setSelectedSort("release_date", 2)}>Newest</li>
                </ul>
                <h3>Genres</h3>
                <ul className="filter-selections">
                    {
                        genres.map(genre => (
                            <li 
                                key={genre.id} 
                                onClick={(e)=>toggleSelectGenre(genre.name, e)}
                            >
                                {genre.name}
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default connect()(MoviesSidebar);