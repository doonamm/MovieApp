import { instance } from '../helper/instance';
import useInput from '../helper/useInput';
import swal from 'sweetalert';
import {useNavigate} from 'react-router-dom';

export default function EditMoviePopup(props){
    const d = props.data;
    const adult = useInput(d.adult);
    const title = useInput(d.title);
    const tagline = useInput(d.tagline);
    const overview = useInput(d.overview);
    const status = useInput(d.status);
    const language = useInput(d.language);
    const runtime = useInput(d.runtime);
    const popularity = useInput(d.popularity);
    const revenue = useInput(d.revenue);
    const release_date = useInput(d.release_date);
    const movie_url = useInput(d.movie_url || '');
    const trailer_url = useInput(d.trailer_url || '');
    const navigate = useNavigate();

    function handleEdit(){
        instance.put(`/movies/${d.id}`, {
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
            trailer_url: trailer_url.value
        })
        .then(res => {
            if(res.success){
                swal('Success', 'Edit movie successfully!', 'success');
                navigate(0);
            }
            else{
                swal('Fail', 'Edit movie fail!', 'error');
            }
        })
        .catch(console.log);
    }

    function handleCancel(){
        props.setOpen(false);
    }

    return(
        <div className="pop-up">
            <div className='container'>
                <h2>Edit movie</h2>
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
                <div className='ver'>
                    <input type='text' placeholder='title' value={title.value} onChange={e=>title.setValue(e.target.value)}/>
                    <input type='text' placeholder='tagline' value={tagline.value} onChange={e=>tagline.setValue(e.target.value)}/>
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