import React from 'react';
import '../css/Commu-post.css';

const PostDetails = ({ post, onClose }) => {
  return (
    <div className="post-details-modal">
      <div className="post-details-header">
        <h2>{post.title}</h2>
        <button onClick={() => onClose()}>닫기</button>      </div>
      <div className="post-details-content">
        <p>{post.content}</p>
      </div>
    </div>
  );
};

export default PostDetails;
