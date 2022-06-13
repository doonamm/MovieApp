function CommentItem(props){
    const {atr} = props;
    return(
        <li className="comment-detail">
            <div className='comment_body'>
                <div className='left_comment img-wrapper'>
                    <img src={atr.image}/>
                </div>
                <div className='right_comment'>
                    <p className='name'>{atr.name}</p>
                    <p className='content'>Omg this film is really nice !</p>
                    <ul className='react'>
                        <li><i>Like</i></li>
                        <li><i>Reply</i></li>
                        <li>20 hours ago</li>
                    </ul>
                </div>
            </div>
        </li>
    );
}
export default CommentItem;