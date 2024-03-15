import React, { useEffect, useState } from 'react';
import '../css/Commu-post.css';
import axios from 'axios';

//헷갈려서 comments: 댓글 배열, comment: 댓글 하나 개별 객체


const PostDetails = ({ post, onClose, updatePostComments, isAdmin}) => {
  const [newComment, setNewComment] = useState('');
  const [selectedComment, setSelectedComment] = useState(-1);
  const [editPostContent, setEditPostContent] = useState(post.content); // 수정 중인 게시글
  const [isEditPost, setIsEditPost] = useState(false); //게시글 수정모드
  const [currentUser, setCurrentUser] = useState(null); // 현재 사용자 


  
  useEffect(() => {
    //현재 사용자가 작성자인지
    const user = { id: 'user1' }; // 임시 사용자 정보
    setCurrentUser(user);
  }, []); 

  const addComment = async () => {
    try {
      const response = await axios.post('api', { postId: post.id, content: newComment });
      const updatedComments = [...post.comments, response.data]; //새로운댓글추가
      updatePostComments(post.id, updatePostComments);
      setNewComment('');
    } catch (error) {
      console.error('댓글 작성 실패 : ', error);
    }
  };

  const deleteComment = async (index) => {
    try {
      await axios.delete('api${post.id}/${index}');
      const updatedComments = post.comments.filter((_, i) => i !== index);
      updatePostComments(post.id, updatePostComments);
    } catch (error) {
      console.error('댓글 삭제 오류 : ', error);
    }
  };

  const editComment = async (index, updatedContent) => { //수정완료 시 호출
    try {
      await axios.put('url${post.id}${index}', { content: updatedContent });
      const updatedComments = [...post.comments];
      updatedComments[index].content = updatedContent;
      updatePostComments(post.id, updatedComments);
      setSelectedComment(-1); //선택 댓글 초기화
    } catch (error) {
      console.error('댓글 수정 오류: ', error);
    }
  };

  const editPost = async () => {
    try {
      await axios.put('url{&post.id)', { content: editPostContent });
      setIsEditPost(false)//수정 모드 종료
    } catch (error) {
      console.error('게시글 수정 오류: ', error);
    }
  };

  const deletePost = async()=>{
    try{
      await axios.delete('psotId');
      onClose();
    }catch(error){
      console.error('게시글 삭제 오류: ',error);
    }
 };

  return (
    <form>
      <div className="post-details-modal">
        <div className="post-details-header">
        {!isEditPost ? (
            <>
              <h2>{post.title}</h2>
              <p>{post.uploadTime}</p>
              <p>{post.userId ? post.userIdId : '알 수 없음'}</p>
              {(currentUser && currentUser.id===post.userId)&&<button onClick={() => setIsEditPost(true)}>게시글 수정</button>}
            </>
          ) : (
         
              <button onClick={editPost}>수정 완료</button>
          )}
       {(isAdmin ||currentUser===post.userId)&&<button onClick={deletePost}>삭제</button>}
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
            {post.comments.map((comment, index) => (
              <li key={index}>
                <p>{comment.userId}: {comment.content} {comment.uploadTime}</p> {/*댓글 유저,내용,시간 */}
                {isAdmin &&currentUser===comment.userId ?( //관리자/댓글작성자 본인 댓글 삭제
                  <button onClick={() => deleteComment(index)}>삭제</button>
                ):null}
                {currentUser===comment.userId && (//댓글 작성자만 수정가능
                  <button onClick={() => setSelectedComment(index)}>수정</button>
                )}
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