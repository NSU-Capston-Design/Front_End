import React, { useState, useCallback, useEffect } from 'react';
import Header from '../component/Header';
import '../css/Don_commu.css';
import Posting from '../component/Posting';
import PostDetails from './commu-post';
import axios from 'axios';
import UserMark from './User-mark';
import Pagination from '../component/Pagination';

const DonCommu = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // 페이지가 마운트될 때 게시글 데이터를 가져옴
    async function fetchPosts() {
      try {
        const response = await axios.get('http://localhost:8080/post/all');
        setPosts(response.data); // 게시글 데이터 설정
      } catch (error) {
        console.error('게시글 데이터를 가져오는 중 에러 발생:', error);
      }
    }
    fetchPosts();
   
  }, []);

  

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedPost(null);
  }, []);

  //현재 페이지의 게시글 가져오기
  const pageSize = 5; // 페이지당 보여질 게시글 수
  const indexOfLastPost = currentPage * pageSize;
  const indexOfFirstPost = indexOfLastPost - pageSize;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

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
                <td>{post.postTitle}</td>
                <td>{post.postDetail}</td>
                <td>{post.userId && <UserMark username={post.userId} rank={post.userRank} />} {/* 유저 아이디가 존재하고 등급이 있을 때 마크 표시 */}
                  {post.userId && !post.userRank && post.userId} {/* 유저 아이디가 존재하고 등급이 없으면 닉네임만 표시 */}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <Pagination/>
          
      
      </div>
      {isModalOpen && selectedPost === null && <Posting onClose={closeModal} />} {/* 글쓰기 모달 */}
      {isModalOpen && selectedPost !== null && (<PostDetails post={selectedPost} onClose={closeModal} isAdmin={isAdmin} setCurrentUser={true} />)} {/* 게시글 상세 모달 */}
    </div>
  );
};

export default DonCommu;
