import {getDocs, collection, query, where, addDoc} from "firebase/firestore"
import { useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { Comment } from "./Comment";
import uuid from 'react-uuid';
import { useAuthState } from "react-firebase-hooks/auth";

interface PostId{
postId: string,
}
export interface Comment{
	id: string,
	body:string,
	userName:string,
	userId:string,
	parentId: string | null,
	createdAt: string,
}
export const Comments = (props: PostId) =>{
	const [user] = useAuthState(auth);
	const [replyCommentId, setReplyCommentId]= useState<string>("");
	const {postId}=props;
	const [replies, setReplies] =useState<Comment [] |null> (null);
	const [commentBody, setCommentBody] = useState("");
	const [commentsList, setCommentsList] = useState<Comment[] | null>(null);
	const commentsRef = collection(db,"comments");
	const commentsQuery = query(commentsRef, where("postId","==",postId), where("parentId", "==",null))
	const getComments = async () =>{
		const data = await getDocs(commentsQuery);
		setCommentsList(data.docs.map((doc) => ({ id: doc.data().id, body: doc.data().body, userName: doc.data().userName, userId: doc.data().userId, parentId: doc.data().parentId, createdAt: doc.data().createdAt })))
		console.log(commentsList);
		
	}
	const getReplies = async () => {
		const getRepliesQuery = query(commentsRef, where("postId", "==", postId), where("parentId","!=", null));
		const data = await getDocs(getRepliesQuery);
		setReplies(data.docs.map((doc)=>({ id: doc.data().id, body: doc.data().body, userName: doc.data().userName, userId: doc.data().userId, parentId: doc.data().parentId, createdAt: doc.data().createdAt }))
		.sort((a,b)=>(new Date(a.createdAt).getTime()-new Date(b.createdAt).getTime())));
	}
	useEffect(()=>{
		getComments();
		getReplies();
	},[]);
	const handleText = (event: any)=>{
		setCommentBody(event.target.value);
	}
	const handleAddComment = async ()=>{
		const result = await addDoc(commentsRef, {id:uuid(),postId:postId,body:commentBody,userName:user?.displayName,userId:user?.uid,parentId:null,createdAt:new Date().toISOString()})
		result && setCommentBody("");	
		getComments();
	}
	const handleAddReply = async ()=>{
		const result = await addDoc(commentsRef, {id:uuid(),postId:postId,body:commentBody,userName:user?.displayName,userId:user?.uid,parentId:replyCommentId,createdAt:new Date().toISOString()})
		result && setCommentBody("");
	}
	const handleReplay = async (commentId:string) =>{
		setReplyCommentId(commentId);
		getReplies();
		getComments();
	}
	return <div className="comments">
		{commentsList?.map((comment)=> <Comment key={comment.id} comment={comment} replies={replies} handleReplay={() => handleReplay(comment.id)}/>)}
		
		{replyCommentId ==="" ? 
		<div className="addcomment">
			<input type="text" placeholder="Add a comment..." onChange={handleText} value={commentBody}/> 
			<button onClick={handleAddComment}>Comment</button>
		</div>: 
		<div className="addcomment"><input type="text" placeholder="Add a reply..." onChange={handleText} value={commentBody}/>
			<button onClick={handleAddReply}>Reply</button>
		</div>
		}
			
		
	</div>
};