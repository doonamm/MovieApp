import '../../style/ProfilePage.scss';

import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import stateToProps from '../helper/stateToProps';
import {instance} from '../helper/instance';
import {setInfo} from '../redux/action/userAction';
import {FaCamera} from 'react-icons/fa';
import {useLocation} from 'react-router-dom';

function ProfilePage(props){
    const navigate = useNavigate();
    const [profile, setProfile] = useState({});
    const [img, setImg] = useState();

    useEffect(()=>{
        const userId = props.user.id || localStorage.getItem('user_id');
        if(!userId){
            navigate('/login');
        }

        instance.get(`/users/${userId}/profile`)
        .then(res => {
            if(res.success){
                setProfile(res.data);
                if(!props.user.nickname){
                    props.setInfo({
                        id: userId,
                        ...res.data
                    });
                }
            }
        })
        .catch(console.log);
    }, []);

    function handleChangeAvt(e){
        const data = new FormData() 
        data.append('image', e.target.files[0]);
        console.log(data);
        instance.post(`/avatar`, data)
        .then(res => {
            console.log(res);
            if(res.success){
                setProfile({
                    ...profile,
                    avatar_url: res.data
                });
            }
        })
        .catch(console.log);
    }
    
    console.log(window.location.origin + '/uploads/' + profile.avatar_url);

    return(
        <div className="page profile">
            <div className="wrap-center">
                <div className='container'>
                    <div className="img-wrapper">
                        <img src={window.location.origin + '/uploads/' + profile.avatar_url}/>
                        <label className="change-avt">
                            <span><FaCamera/></span>
                            <input onChange={handleChangeAvt} type="file"/>
                        </label>
                    </div>
                    <h2>{profile.nickname}</h2>
                    <p>Gender: {profile.gender}</p>
                    <p>Birthday: {profile.birthday}</p>
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = {
    setInfo
}

export default connect(stateToProps('user', 'login'), mapDispatchToProps)(ProfilePage);