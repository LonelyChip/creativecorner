import React from "react";
import {useState, useEffect} from "react";
import "./PostCard.css"; 
import { Post as IPost} from "../pages/Home";
import {addDoc, collection, getDocs, query, doc, where, deleteDoc} from "firebase/firestore"
import { auth, db } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {useNavigate} from "react-router-dom"
import { Comments } from "./Comments";
interface Props{
  post: IPost
}
interface Like{
  userId:string,
  postId: string,
}

function PostCard(props : Props) {
  // const navigate = useNavigate();
  const [isCommentsShown, setCommentsShown] = useState(false);
  const {post} = props;
  const [likes,setLikes] = useState<Like[] | null>(null);
  const [user] = useAuthState(auth);
  const likesRef = collection(db, "likes");
  const likesDocQuery = query(likesRef, where("postId", "==",post.postId))
  const addLike = async() =>{
    if(user){
      await addDoc(likesRef, {userId:user?.uid,postId:post.postId})
      setLikes((prev)=>prev ? [...prev,{userId:user?.uid,postId:post.postId}]:[{userId:user?.uid,postId:post.postId}])
    }
 
  }

  const getLikes = async () =>{
    const data = await getDocs(likesDocQuery)
    setLikes(data.docs.map((doc)=>({userId:doc.data().userId, postId:doc.data().postId})));
  }
  
  const removeLike = async () =>{
    const deleteQuery= query(likesRef, where("userId", "==",user?.uid), where("postId", "==",post.postId));
    const deleteRecords = await getDocs(deleteQuery);
    const deleteRecord= doc(db,"likes", deleteRecords.docs[0].id);
    await deleteDoc(deleteRecord);
    if(user){
      setLikes((prev)=> prev && prev?.filter((like)=>like.userId !== user?.uid))
    }
   
  }
  useEffect(()=>{getLikes();},[])

  const hasUserLiked = likes?.find((like)=>(like.userId===user?.uid));

  const handleCommentDisplay = ()=>{
    setCommentsShown((prev)=>!prev);
  }
  return (
<div className="container">
  <div className="post-container">
    <div className="post-card">
      <h2 className="post-title">{post.title}</h2>
      <p className="post-description">{post.description}</p>
      <div className="post-buttons">
        <button className="like-button" onClick={hasUserLiked ? removeLike : addLike}>
          {hasUserLiked ? "👎" : "👍"}
          <p className="likecount">{likes?.length}</p>
        </button>
        <button className="comment-button" onClick={handleCommentDisplay}>
          💬
        </button>
      </div>
    </div>
    {isCommentsShown && (
      <div className="comment-container">
        <Comments postId={post.postId}/>
      </div>
    )}
  </div>
</div>

  );
}

export default PostCard;
