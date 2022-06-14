import { useState } from 'react';
import { useEffect } from 'react';
import {useParams} from 'react-router-dom';
import {instance} from '../helper/instance';

function SingleActorPage(props){
    const {id} = useParams();
    const [info, setInfo] = useState({});

    useEffect(()=>{
        instance.get('/actors/' + id)
        .then(res => {
            if(res.success){
                setInfo(res.data);
            }
        })
        .catch(console.log);
    }, []);

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

    return(
        <div className="page single-actor">
            <div className='wrap-center'>
                <div className='top'>
                    <div className='img-wrapper'>
                        <img src={'https://image.tmdb.org/t/p/w370_and_h556_bestv2' + profile_path}/>
                    </div>
                    <div className='info'>
                        <h3>{name}</h3>
                        <ul>
                            <li>
                                <p>Gender:</p>
                                <p>{gender}</p>
                            </li>
                            <li>
                                <p>Imdb:</p>
                                <p>{imdb_id}</p>
                            </li>
                            <li>
                                <p>Birthday:</p>
                                <p>{birthday}</p>
                            </li>
                            <li>
                                <p>Place of birth:</p>
                                <p>{place_of_birth}</p>
                            </li>
                            <li>
                                <p>Description:</p>
                                <p>{biography}</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='bottom'>

                </div>
            </div>
        </div>
    )
}

export default SingleActorPage;