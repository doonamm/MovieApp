import '../../style/WatchMoviePage.scss';

import ReactPlayer from 'react-player/youtube';
import React, { useEffect, useRef, useState } from 'react';
import stateToProps from '../helper/stateToProps';
import {useNavigate, useParams} from 'react-router-dom';
import {connect} from 'react-redux';
import { instance } from '../helper/instance';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js'
import {addMsg} from '../redux/action/chatAction';

const movie_url = 'https://www.youtube.com/watch?v=Eag3k9p4pr4';

const WatchMoviePage = (props) => {
    const {id} = useParams();
    const [chatMsg, setChatMsg] = useState('');
    const [userId, setUserId] = useState('');
    const [playing, setPlaying] = useState(false);

    useEffect(()=>{
        const userId_ = props.user.id || localStorage.getItem('user_id');
        if(!userId_){
            useNavigate()('/login');
            return;
        }
        setUserId(userId_);

        const pusher = new Pusher('340cd78dec58556b573b', {
            cluster: 'ap1'
        });
        
        var channel = pusher.subscribe('movie-app-20521627');
        channel.bind('chat', data => {
            const {message} = data
            if(message === 'play'){
                setPlaying(true);
            }
            else if(message === 'pause'){
                setPlaying(false);
            }
        });

        return;
    }, []);

    function handleSendMsg(){
        const msg = chatMsg.trim();
        if(msg){
            instance.post('/new-message', {
                message: msg
            })
            .catch(console.log);
        }
        setChatMsg('');
    }

    function handlePause(){
        instance.post('/new-message', {
            message: "pause"
        })
        .catch(console.log);
    }

    function handlePlay(data){
        console.log(data);
        instance.post('/new-message', {
            message: "play"
        })
        .catch(console.log);
    }
    
    function handleSeek(data){
        console.log('seek', data);
        instance.post('/new-message', {
            message: ""
        })
        .catch(console.log);
    }

    return(
        <div className="page watch">
            <div className='wrap-center'>
                <div className='player-wrapper'>
                    <ReactPlayer controls playing={playing} onPause={handlePause} onPlay={handlePlay} className='player' width='100%' height='100%' url={movie_url}/>
                </div>
            </div>
        </div>
    );
}

const mapDispatchToProp = {
    addMsg
};

export default connect(stateToProps('user', 'chat'), mapDispatchToProp)(WatchMoviePage);