import React, { useState, useCallback, useEffect } from 'react';
import Header from '../component/Header';
import '../css/Don_commu.css';
import Posting from '../component/Posting';
import PostDetails from './commu-post';
import axios from 'axios';

const postsArray = [
  { id: 1, userId: 'user1', title: '제목 1', content: '내용 1', uploadTime: '2024-02-14', comments: [
    { userId: 'commenter1', content: '댓글 1-1', uploadTime: '2024-02-14 12:00:00' },
    { userId: 'commenter2', content: '댓글 1-2', uploadTime: '2024-02-14 12:30:00' }
  ] },
  { id: 2, userId: 'user2', title: '제목 2', content: '내용 2', uploadTime: '2024-02-14', comments: [ { userId: 'commenter3', content: '댓글 2-1', uploadTime: '2024-02-14 13:00:00' },
  { userId: 'commenter4', content: '댓글 2-2', uploadTime: '2024-02-14 13:30:00' }] },
  // ... 더 많은 게시글 데이터
];

const pageSize = 5; // 페이지당 보여질 게시글 수

export default function Don_commu() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    setCurrentUser('user1'); // 작성자로 설정
    setIsAdmin(true); // 관리자 설정
  }, []);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);


  //현재 페이지 포스트 가져오기
  const indexOfLastPost = currentPage * pageSize;
  const indexOfFirstPost = indexOfLastPost - pageSize;
  const currentPosts = postsArray.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);//페이지 변경

  const handlePostClick = (post) => {
    setSelectedPost(post);
    openModal();
  };
  const handleOpenPostingModal = () => {
    setSelectedPost(null); // 글쓰기 모달을 열 때는 선택된 게시물을 초기화
    openModal();
  };
  
  console.log("isModalOpen:", isModalOpen);
  console.log("selectedPost:", selectedPost);
  return (
    <div className="don_commu_all">
      <Header />
      <div className="don_commu">
        <div className="commu_title">게시판</div>
      </div>
      <div className="posting">
      <button className="posting_btn" onClick={handleOpenPostingModal}>
          글쓰기
        </button>
      </div>
      <div className="msg_board">
        <table className="post-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Content</th> 
              <th>작성자</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map((post) => (
              <tr key={post.id} onClick={() => handlePostClick(post)}>
                <td>{post.title}</td>
                <td>{post.content}</td>
                <td>{post.userId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        {Array.from({ length: Math.ceil(postsArray.length / pageSize) }, (_, index) => (
          <button key={index + 1} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
      {isModalOpen && selectedPost === null && <Posting onClose={closeModal} />} {/* 글쓰기 모달 */}
      {isModalOpen && selectedPost !== null && (<PostDetails post={selectedPost} onClose={closeModal} isAdmin={true} setCurrentUser={true}  />)} {/* 게시글 상세 모달 */}
    </div>
  );
}
