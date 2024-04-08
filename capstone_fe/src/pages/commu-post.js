import React, { useEffect, useState } from 'react';
import '../css/Commu-post.css';
import axios from 'axios';

//헷갈려서 comments: 댓글 배열, comment: 댓글 하나 개별 객체


const PostDetails = ({ post, onClose, isAdmin }) => {
  const [newComment, setNewComment] = useState('');
  const [selectedComment, setSelectedComment] = useState(1);
  const [editPostContent, setEditPostContent] = useState(post.content); // 수정 중인 게시글
  const [isEditPost, setIsEditPost] = useState(false); //게시글 수정모드
  const [currentUser, setCurrentUser] = useState(null); // 현재 사용자 



  useEffect(() => {
    // 현재 사용자 정보 가져오기
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get('http://localhost:8080/user');
        setCurrentUser(response.data); // 현재 사용자 설정
      } catch (error) {
        console.error('사용자 정보 가져오기 실패:', error);
      }
    };
    fetchCurrentUser();
  }, []);


  const addComment = async () => {
    try {
      const response = await axios.post('http://localhost:8080/comment/save', {
        comment: newComment,
        userId: currentUser.id,
        postId: post.id
      });
      const newCommentData = response.data;
      // 현재 게시물에 새로운 댓글 추가
      const updatedComments = [...post.comments, newCommentData];
      // 게시물의 댓글 목록을 업데이트
      // updatePostComments(updatedComments);
      setNewComment('');
    } catch (error) {
      console.error('댓글 추가 실패:', error);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await axios.delete(`http://localhost:8080/comment/${commentId}`);
      // 삭제된 댓글을 제외한 나머지 댓글들로 갱신
      const updatedComments = post.comments.filter(comment => comment.id !== commentId);
      // 갱신된 댓글 목록을 업데이트
      // updatePostComments(updatedComments);
    } catch (error) {
      console.error('댓글 삭제 실패:', error);
    }
  };

  // const editComment = async (commentId, updatedContent) => {
  //   try {
  //     await axios.put(`http://localhost:8080/comment/{commentId}`, { content: updatedContent });
  //     // 댓글 내용 수정
  //     const updatedComments = post.comments.map(comment => {
  //       if (comment.id === commentId) {
  //         return { ...comment, content: updatedContent };
  //       }
  //       return comment;
  //     });
  //     // 수정된 댓글 목록을 업데이트
  //     // updatePostComments(updatedComments);
  //     setSelectedComment(null); // 수정 중인 댓글 초기화
  //   } catch (error) {
  //     console.error('댓글 수정 실패:', error);
  //   }
  // };

  const editPost = async () => {
    try {
      await axios.put(`http://localhost:8080/post/{post.id}`, { content: editPostContent });
      setIsEditPost(false);
    } catch (error) {
      console.error('게시물 수정 실패:', error);
    }
  };

  const deletePost = async () => {
    try {
      await axios.delete(`http://localhost:8080/post/delete`);
      onClose();
    } catch (error) {
      console.error('게시물 삭제 실패:', error);
    }
  };

  return (
    <form>
      <div className="post-details-modal">
        <div className="post-details-header">
          {!isEditPost ? (
            <>
              <h2>{post.postTitle}</h2>
              <p>{post.uploadTime}</p>
              <p>{post.userId ? post.userId : '알 수 없음'}</p>
              {(currentUser && currentUser.id === post.userId) && <button onClick={() => setIsEditPost(true)}>게시글 수정</button>}
            </>
          ) : (

            <button onClick={editPost}>수정 완료</button>
          )}
          {(isAdmin || currentUser === post.userId) && <button onClick={deletePost}>삭제</button>}
          <button onClick={() => onClose()}>닫기</button>
        </div>
        <div className="post-details-content">
          {!isEditPost ? (
            <p>{post.content}</p>
          ) : (
            <div>
              <textarea
                value={editPostContent}
                onChange={(e) => setEditPostContent(e.target.value)}
              />
            </div>
          )}

          <h3>댓글</h3>
          <ul>
            {post.comments.map((comment) => (
              <li key={comment.id}>
                <p>{comment.userId}: {comment.content} {comment.uploadTime}</p>
                {isAdmin && currentUser === comment.userId && (
                  <button onClick={() => deleteComment(comment.id)}>삭제</button>
                )}
                {/* {currentUser === comment.userId && (
                  <button onClick={() => setSelectedComment(comment.id)}>수정</button>
                )} */}
              </li>
            ))}
          </ul>
          <div>
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="댓글을 입력하세요"
            />
            <button onClick={addComment}>댓글 작성</button>
          </div>
        </div>
      </div>
    </form >
  );
};

export default PostDetails;