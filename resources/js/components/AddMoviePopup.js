import { instance } from '../helper/instance';
import useInput from '../helper/useInput';
import swal from 'sweetalert';
import {useNavigate} from 'react-router-dom';

export default function AddMoviePopup(props){
    const d = props.data;
    const adult = useInput();
    const title = useInput();
    const tagline = useInput();
    const overview = useInput();
    const status = useInput();
    const language = useInput();
    const runtime = useInput();
    const popularity = useInput();
    const revenue = useInput();
    const release_date = useInput();
    const movie_url = useInput();
    const trailer_url = useInput();
    const poster_path = useInput();
    const backdrop_path = useInput();
    const vote_average = useInput();
    const vote_count = useInput();
    const navigate = useNavigate();

    function handleEdit(){
        instance.post(`/movies`, {
            adult: adult.value,
            title: title.value,
            tagline: tagline.value,
            overview: overview.value,
            status: status.value,
            language: language.value,
            runtime: runtime.value,
            popularity: popularity.value,
            revenue: revenue.value,
            release_date: release_date.value,
            movie_url: movie_url.value,
            trailer_url: trailer_url.value,
            poster_path: poster_path.value,
            backdrop_path: backdrop_path.value,
            vote_average: vote_average.value,
            vote_count: vote_count.value,
        })
        .then(res => {
            if(res.success){
                swal('Success', 'Add movie successfully!', 'success');
                navigate(0);
            }
            else{
                swal('Fail', 'Add movie fail!', 'error');
            }
        })
        .catch(console.log);
    }

    function handleCancel(){
        props.setOpen(false);
    }

    return(
        <div className="pop-up add">
            <div className='container'>
                <h2>Add movie</h2>
                <div className='hor'>
                    <input type='text' placeholder='adult' value={adult.value} onChange={e=>adult.setValue(e.target.value)}/>
                    <input type='text' placeholder='runtime' value={runtime.value} onChange={e=>runtime.setValue(e.target.value)}/>
                    <input type='text' placeholder='language' value={language.value} onChange={e=>language.setValue(e.target.value)}/>
                </div>
                <div className='hor'>
                    <input type='text' placeholder='status' value={status.value} onChange={e=>status.setValue(e.target.value)}/>
                    <input type='date' placeholder='release_date' value={release_date.value} onChange={e=>release_date.setValue(e.target.value)}/>
                </div>
                <div className='hor'>
                    <input type='text' placeholder='popularity' value={popularity.value} onChange={e=>popularity.setValue(e.target.value)}/>
                    <input type='text' placeholder='revenue' value={revenue.value} onChange={e=>revenue.setValue(e.target.value)}/>
                </div>
                <div className='hor'>
                    <input type='text' placeholder='Vote average' value={vote_average.value} onChange={e=>vote_average.setValue(e.target.value)}/>
                    <input type='text' placeholder='Vote count' value={vote_count.value} onChange={e=>vote_count.setValue(e.target.value)}/>
                </div>
                <div className='ver'>
                    <input type='text' placeholder='title' value={title.value} onChange={e=>title.setValue(e.target.value)}/>
                    <input type='text' placeholder='tagline' value={tagline.value} onChange={e=>tagline.setValue(e.target.value)}/>
                    <input type='text' placeholder='poster_path' value={poster_path.value} onChange={e=>poster_path.setValue(e.target.value)}/>
                    <input type='text' placeholder='backdrop_path' value={backdrop_path.value} onChange={e=>backdrop_path.setValue(e.target.value)}/>
                    <input type='text' placeholder='movie_url' value={movie_url.value} onChange={e=>movie_url.setValue(e.target.value)}/>
                    <input type='text' placeholder='trailer_url' value={trailer_url.value} onChange={e=>trailer_url.setValue(e.target.value)}/>
                    <textarea cols={2} placeholder='overview' value={overview.value} onChange={e=>overview.setValue(e.target.value)}/>
                </div>
                <div className='hor accept-btn'>
                    <button className='admin-btn add' onClick={handleEdit}>Edit</button>
                    <button className='admin-btn delete' onClick={handleCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
}