import CommentItem from './CommentItem';

function CommentList(props){
    const {list} = props;
    return(
        <ul className="comment_list">
        {   
            list.map((comment, i) => <CommentItem key={comment.id} atr={comment}/>)
        }
        </ul>
    );
}
export default CommentList;