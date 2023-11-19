import React from 'react';

const Post = ({ title, content }) => (
    <div className="post">
        <h2>{title}</h2>
        <p>{content}</p>
    </div>
);

export default Post;
//기부커뮤 컴포넌트