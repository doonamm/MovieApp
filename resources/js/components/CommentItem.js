import { useState } from 'react';
import { instance } from '../helper/instance';
import {getDeltaTimeToNow} from '../helper/time';

function CommentItem(props){
    const {data: d} = props;
    const deltaTime = getDeltaTimeToNow(d.created_at || Date.now()) || [];
    const [liked, setLiked] = useState(false);

    function toggleLike(){
        instance.post(`/movies/${props.movieId}/comments/${d.id}/likes`)
        .then(res => {
            if(res.success){
                console.log(2224444);
                setLiked(true);
            }
        })
        .catch(console.log);
    }

    return(
        <li className="comment-detail">
            <div className='comment_body'>
                <div className='left_comment img-wrapper'>
                    <img src={'http://pm1.narvii.com/7627/321d255098da6653d71f1ffb2c71693256d5bb34r1-540-673v2_uhq.jpg' || d.avatar_url}/>
                </div>
                <div className='right_comment'>
                    <p className='name'>{d.nickname}</p>
                    <p className='content'>{d.content}</p>
                    <ul className='react'>
                        <li><span>{d.like_count + liked ? 1 : 0}</span><i onClick={toggleLike}>{liked ? 'unlike' : 'like'}</i></li>
                        <li>{deltaTime[1] || '0'} {deltaTime[0] || 'seconds'} ago</li>
                    </ul>
                </div>
            </div>
        </li>
    );
}
export default CommentItem;