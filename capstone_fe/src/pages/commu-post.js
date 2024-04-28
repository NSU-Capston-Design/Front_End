import React, { useEffect, useState } from 'react';
import '../css/Commu-post.css';
import axios from 'axios';
import UserMark from './User-mark';
import { getItemWithTime } from '../component/GetStorage';
//헷갈려서 comments: 댓글 배열, comment: 댓글 하나 개별 객체


const PostDetails = ({ post, postId, onClose, isAdmin }) => {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([
    {},
  ]); // 댓글 상태 
  // const [selectedComment, setSelectedComment] = useState(1);
  const [editPostContent, setEditPostContent] = useState(post.content); // 수정 중인 게시글
  const [editPostTitle, setEditPostTitle] = useState(post.content); // 수정 중인 게시글
  const [isEditPost, setIsEditPost] = useState(false); //게시글 수정모드
  const [currentUser, setCurrentUser] = useState(null); // 현재 사용자 


  useEffect(() => {
    // 게시글의 댓글을 가져오는 함수 정의
    const fetchComments = async (postId) => {
      postId = post.postId;
      console.log(postId);
      try {
        const response = await axios.get(`http://localhost:8080/comment/${postId}`);
        const data = response.data;
        console.log(data);
        setComments(data); // 댓글 상태 업데이트
      } catch (error) {
        console.error('댓글을 가져오는 중 에러 발생:', error);
      }
    };

    // 마운트될 때 댓글 가져오기
    fetchComments();
  }, []); // 게시글 ID가 변경될 때마다 호출

  // useEffect(() => {
  //   // 관리자
  //   const admin = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:8080/user');
  //       setCurrentUser(response.data); // 관리자
  //     } catch (error) {
  //       console.error('사용자 정보 가져오기 실패:', error);
  //     }
  //   };
  //   admin();
  // }, []);


  const addComment = async () => {
    try {

      console.log(newComment);
      console.log(getItemWithTime('userId'));
      // console.log(window.localStorage.getItem('userId'));
      console.log(post.postId);
      
      const response = await axios.post('http://localhost:8080/comment/save', {
        
          comment: newComment,
          userId: getItemWithTime('userId'),
          // userId: window.localStorage.getItem('userId'),
          postId: post.postId
        
      });

      console.log(response.data);
      // const newCommentData = response.data;
      // 현재 게시물에 새로운 댓글 추가
      // const updatedComments = [...post.comments, newCommentData];
      // 게시물의 댓글 목록을 업데이트
      // updatePostComments(updatedComments);
      // setNewComment('');
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
      await axios.put(`http://localhost:8080/post/${post.id}`, { content: editPostContent, title: editPostTitle });
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
              <span>{post.uploadTime}</span>
              {post.userId ? (
                <div className='username'>
                  <UserMark username={post.userId} rank={post.userRank} />
                  <span>{post.userId}</span>
                </div>
              ) : (
                <p>알 수 없음</p>
              )}
              {post.userId === currentUser && <button onClick={() => setIsEditPost(true)}>게시글 수정</button>}
              <div className="spacer"></div> {/* 공백 아이템 */}
            </>
          ) : (
            <>
              <input
                value={editPostTitle}
                onChange={(e) => setEditPostTitle(e.target.value)}
                placeholder={post.postTitle}
              /> 
              <div className="spacer"></div> {/* 공백 아이템 */}
              <button onClick={editPost}>수정 완료</button>
            </>
          )}

          {(isAdmin || currentUser === post.userId) && <button onClick={deletePost}>삭제</button>}
          <button onClick={() => onClose()}>닫기</button>
        </div>
        <div className="post-details-content">
          {!isEditPost ? (
            <p>{post.postDetail}</p>
          ) : (
            <div>


              <textarea
                value={editPostContent}
                onChange={(e) => setEditPostContent(e.target.value)}
                placeholder={post.postDetail}
              />
            </div>
          )}

        </div>
        <div className='comments'>
          <div className='cominput'>
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="댓글을 입력하세요"
            />
            <button onClick={addComment}>댓글 작성</button>
          </div>
          <ul>
            {comments.map((comment) => (
              <li key={comment.commentId}>
                <p>{comment.userId}: {comment.comment} </p>
                {isAdmin && currentUser === comment.commentId && (
                  <button onClick={() => deleteComment(comment.id)}>삭제</button>
                )}
                {/* {currentUser === comment.userId && (
      <button onClick={() => setSelectedComment(comment.id)}>수정</button>
    )} */}
              </li>
            ))}
          </ul>

        </div>
      </div>
    </form >
  );
};

export default PostDetails;