import CommentItem from './CommentItem';

function CommentList(props){
    const {list} = props;
    return(
        <ul className="comment_list">
        {   
            list.map((comment) => <CommentItem key={comment.id} movieId={props.movieId} data={comment}/>)
        }
        </ul>
    );
}
export default CommentList;