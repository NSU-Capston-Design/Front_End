import React from "react";
import { useEffect, useState } from 'react';
import Header from "../component/Header";
import Don_commu from "../css/Don_commu.css"
import Post from "../component/Post"
export default function Donation() {


    const postsArray = [
        { id: 1, title: "제목 1", content: "내용 1" },
        { id: 2, title: "제목 2", content: "내용 2" },
    ];

    return (
        
        <div className="don_commu_all">
            <Header />

            <div className="don_commu">{/*게시판 타이틀 */}
                <div className="commu_title">게시판</div>
            </div>
            <div className="posting">{/*글쓰기버튼 레이아웃/ 버튼 */}
                <div className="posting_btn"></div>
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
                        {/* 글목록 */}
                        {postsArray.map(post => (
                            <tr key={post.id}>
                                <td>{post.title}</td>
                                <td>{post.content}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}