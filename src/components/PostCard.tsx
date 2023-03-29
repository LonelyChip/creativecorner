import React from "react";
import "./PostCard.css"; 
import { Post as IPost} from "../pages/Home";

interface Props{
  post: IPost
}

function PostCard(props : Props) {
  const {post} = props;
  return (
    <div className="container">
    <div className="post-card">
      <h2 className="post-title">{post.title}</h2>
      <p className="post-description">{post.description}</p>
      <div className="post-buttons">
        <button className="like-button">❤️</button>
        <button className="comment-button">💬</button>
      </div>
    </div>
    </div>
  );
}

export default PostCard;
