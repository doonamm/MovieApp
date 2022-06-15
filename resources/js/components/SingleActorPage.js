import '../../style/SingleActorPage.scss';

import { useState } from 'react';
import { useEffect } from 'react';
import {useParams} from 'react-router-dom';
import {instance} from '../helper/instance';
import MovieList from './MovieList';
import stateToProps from '../helper/stateToProps';
import {connect} from 'react-redux';
import EditActorPopup from './EditActorPopup';
import {useNavigate} from 'react-router-dom';

function SingleActorPage(props){
    const {id} = useParams();
    const [info, setInfo] = useState({});
    const [moreBio, setMoreBio] = useState(false);
    const [movieList, setMovieList] = useState([]);
    const [next, setNext] = useState(0);
    const [openEditForm, setOpenEditForm] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        instance.get('/actors/' + id)
        .then(res => {
            if(res.success){
                setInfo(res.data);
                loadMovieList(res.data.name);
            }
        })
        .catch(console.log);
    }, []);

    function loadMovieList(name){
        instance.get('/movies', {
            params: {
                casts: [
                    name
                ]
            }
        })
        .then(res => {
            if(res.success){
                setMovieList(res.data);
            }
        })
        .catch(console.log);
    }

    const {
        name,
        birthday,
        gender,
        place_of_birth,
        profile_path,
        biography,
        imdb_id,
        popularity
    } = info;

    function deleteActor(){
        swal('Delete actor', `Delete actor "${name}"`, 'warning').then((accept)=>{
            if(accept){
                instance.delete(`/actors/${id}`)
                .then(res => {
                    if(res.success){
                        navigate('/actors');
                        swal('Delete actor', `Delete success!"`, 'success');
                    }
                    else{
                        swal('Delete actor', `Delete fail!"`, 'error');
                    }
                })
                .catch(console.log);
            }
        });
    }

    return(
        <div className="page single-actor">
            <div className='wrap-center'>
                {
                    props.user.role === 'admin'
                    &&
                    <div className='admin-btn-container'>
                        <button onClick={deleteActor} className='admin-btn delete'>Delete</button>
                        <button onClick={()=>setOpenEditForm(!openEditForm)} className='admin-btn edit'>Edit</button>
                    </div>
                }
                {openEditForm && <EditActorPopup setOpen={setOpenEditForm} data={info}/>}
                <div className='top'>
                    <div className='img-wrapper'>
                        <img src={'https://image.tmdb.org/t/p/w370_and_h556_bestv2' + profile_path}/>
                    </div>
                    <div className='info'>
                        <h3>{name}</h3>
                        <ul>
                            <li>
                                <p className='field'>Gender:</p>
                                <p>{gender}</p>
                            </li>
                            <li>
                                <p className='field'>Birthday:</p>
                                <p>{birthday}</p>
                            </li>
                            <li>
                                <p className='field'>Place of birth:</p>
                                <p>{place_of_birth}</p>
                            </li>
                            <li>
                                <p className='field'>Imdb:</p>
                                <p>{imdb_id}</p>
                            </li>
                            <li>
                                <p className='field'>Description:</p>
                                <p className='bio'>
                                    {moreBio ? biography : biography?.substring(0, 400)} 
                                    <span onClick={()=>setMoreBio(!moreBio)} className='toggle-more-btn'>{moreBio ? 'Less' : 'More'}</span>
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='bottom'>
                    <h3>{name}'s movies:</h3>
                    <MovieList list={movieList}/>
                </div>
            </div>
        </div>
    )
}

export default connect(stateToProps('user'))(SingleActorPage);