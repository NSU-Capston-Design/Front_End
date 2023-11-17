import React from "react";
import { useEffect, useState } from 'react';
import Header from "../component/Header";
import Don_commu from "../css/Don_commu.css"

export default function Donation() {
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
                {/* 글목록 */}
            </div>
        </div>
    )
}