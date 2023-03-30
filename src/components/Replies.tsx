import { Comment as IComment} from "./Comments";
import moment from "moment";

interface Reply{
	reply:IComment,
	commentId:string
}
export const Replies = (props: Reply) => {
	const { reply, commentId } = props;
	return reply.parentId !== null && reply.parentId === commentId ? (
	  <div className="reply">
		<div className="reply-content">
		  <div className="reply-header">
			<img src={process.env.PUBLIC_URL + '/userIcon.png'} alt="User Logo" style={{ width: "50px", height: "50px" }} />
			<div className="author-name">{reply.userName}</div>
			<div className="created-time">{moment(reply.createdAt).fromNow()}</div>
		  </div>
		  <div className="reply-text">{reply.body}</div>
		</div>
	  </div>
	) : null;
  };