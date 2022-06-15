import { instance } from '../helper/instance';
import useInput from '../helper/useInput';
import swal from 'sweetalert';
import {useNavigate} from 'react-router-dom';

export default function EditActorPopup(props){
    const d = props.data;
    const name = useInput(d.name);
    const gender = useInput(d.gender);
    const birthday = useInput(d.birthday);
    const place_of_birth = useInput(d.place_of_birth);
    const imdb_id = useInput(d.imdb_id);
    const biography = useInput(d.biography);
    const popularity = useInput(d.popularity);
    const navigate = useNavigate();

    function handleEdit(){
        instance.put(`/actors/${d.id}`, {
            name: name.value,
            gender: gender.value,
            birthday: birthday.value,
            place_of_birth: place_of_birth.value,
            imdb_id: imdb_id.value,
            popularity: popularity.value,
            biography: biography.value,
        })
        .then(res => {
            if(res.success){
                swal('Success', 'Edit actor successfully!', 'success');
                navigate(0);
            }
            else{
                swal('Fail', 'Edit actor fail!', 'error');
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
                <h2>Edit Actor</h2>
                <div className='hor'>
                    <input type='text' placeholder='name' value={name.value} onChange={e=>name.setValue(e.target.value)}/>
                    <input type='text' placeholder='gender' value={gender.value} onChange={e=>gender.setValue(e.target.value)}/>
                </div>
                <div className='hor'>
                    <input type='date' placeholder='birthday' value={birthday.value} onChange={e=>birthday.setValue(e.target.value)}/>
                    <input type='text' placeholder='place_of_birth' value={place_of_birth.value} onChange={e=>place_of_birth.setValue(e.target.value)}/>
                </div>
                <div className='hor'>
                    <input type='text' placeholder='imdb_id' value={imdb_id.value} onChange={e=>imdb_id.setValue(e.target.value)}/>
                    <input type='text' placeholder='popularity' value={popularity.value} onChange={e=>popularity.setValue(e.target.value)}/>
                </div>
                <div className='ver'>
                    <textarea cols={2} placeholder='Description' value={biography.value} onChange={e=>biography.setValue(e.target.value)}/>
                </div>
                <div className='hor accept-btn'>
                    <button className='admin-btn add' onClick={handleEdit}>Edit</button>
                    <button className='admin-btn delete' onClick={handleCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
}