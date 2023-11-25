import React, { useState, useCallback } from 'react';
import Header from '../component/Header';
import '../css/Don_commu.css';
import Posting from '../component/Posting';

const postsArray = [
  { id: 1, title: '제목 1', content: '내용 1' },
  { id: 2, title: '제목 2', content: '내용 2' },
  // ... 더 많은 게시글 데이터
];

const pageSize = 5; // 페이지당 보여질 게시글 수

export default function Don_commu() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const indexOfLastPost = currentPage * pageSize;
  const indexOfFirstPost = indexOfLastPost - pageSize;
  const currentPosts = postsArray.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="don_commu_all">
      <Header />
      <div className="don_commu">
        <div className="commu_title">게시판</div>
      </div>
      <div className="posting">
        <button className="posting_btn" onClick={openModal}>
          글쓰기
        </button>
      </div>
      <div className="msg_board">
        <table className="post-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Content</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>{post.content}</td>
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
      {isModalOpen && <Posting onClose={closeModal} />}
    </div>
  );
}
