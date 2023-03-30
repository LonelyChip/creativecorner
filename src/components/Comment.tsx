import { Comment as IComment} from "./Comments";
import moment from 'moment';
import { Replies } from "./Replies";

interface Props{
  comment: IComment
  replies: IComment[] | null,
  handleReplay:(commentId: string) => void,
}

export const Comment = (props: Props) =>{
  const {comment, replies, handleReplay} = props;
  const handleReplyClick = () => {
    handleReplay(comment.id);
  };
  return (
    <div className="comment">
      <div className="comment-content">
        <div className="comment-header">
          <img src={process.env.PUBLIC_URL + '/userIcon.png'} alt="User Logo" style={{ width:"50px", height:"50px" }}/>
          <div className="author-name">{comment.userName}</div>
          <div className="created-time">{moment(comment.createdAt).fromNow()}</div>
          <button className="reply-button" onClick={handleReplyClick}>Reply</button>
        </div>
        <div className="comment-text">{comment.body}</div>
      </div>
      <div className="Replies">
        {replies && replies.map((reply) => <Replies reply={reply} commentId={comment.id}/>)}
      </div>
    </div>
  );
};
