import React from "react";
import "./PostCard.css"; // import the CSS file for styling

function PostCard({ title="William W. Purkey", description ="You've gotta dance like there's nobody watching,Love like you'll never be hurt,Sing like there's nobody listening,And live like it's heaven on earth,You've gotta dance like there's nobody watching,Love like you'll never be hurt,Sing like there's nobody listening,And live like it's heaven on earth,You've gotta dance like there's nobody watching,Love like you'll never be hurt,Sing like there's nobody listening,And live like it's heaven on earth,You've gotta dance like there's nobody watching,Love like you'll never be hurt,Sing like there's nobody listening,And live like it's heaven on earth,You've gotta dance like there's nobody watching,Love like you'll never be hurt,Sing like there's nobody listening,And live like it's heaven on earth"}) {
  return (
    <div className="container">
    <div className="post-card">
      <h2 className="post-title">{title}</h2>
      <p className="post-description">{description}</p>
      <div className="post-buttons">
        <button className="like-button">❤️</button>
        <button className="comment-button">💬</button>
      </div>
    </div>
    </div>
  );
}

export default PostCard;
