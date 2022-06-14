import '../../style/WatchMoviePage.scss';

import ReactPlayer from 'react-player/youtube';
import { useEffect, useState } from 'react';
import stateToProps from '../helper/stateToProps';
import {useNavigate, useParams} from 'react-router-dom';
import {connect} from 'react-redux';
import { instance } from '../helper/instance';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js'
import {addMsg} from '../redux/action/chatAction';

const movie_url = 'https://www.youtube.com/watch?v=Eag3k9p4pr4';

function WatchMoviePage(props){
    const {id} = useParams();
    const [chatMsg, setChatMsg] = useState('');
    const [userId, setUserId] = useState('');
    const [msgList, setMsgList] = useState([]);

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

        channel.bind('message', data => {
            console.log(msgList);
            console.log(data);
            setMsgList(...msgList, data.message.message);
        });

        return 
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

    return(
        <div className="page watch">
            <div className='wrap-center'>
                <div className='player-wrapper'>
                    <ReactPlayer className='player' width='100%' height='100%' url={movie_url}/>
                </div>
                <div className='chat-box'>
                    <ul className='chat-list'> 
                        {
                            // msgList.map(msg => <li>{msg}</li>)
                        }                        
                    </ul>
                    <div className='chat-form'>
                        <input type='text' value={chatMsg} onChange={e => setChatMsg(e.target.value)}/>
                        <button onClick={handleSendMsg}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapDispatchToProp = {
    addMsg
};

export default connect(stateToProps('user', 'chat'), mapDispatchToProp)(WatchMoviePage);