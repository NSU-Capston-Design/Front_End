import React from "react";
import { useEffect, useState } from 'react';
import Header from "../component/Header";
import Rank from "../css/Rank.css"

export default function Rank(){
    retrun(
        <div className="all">
            <Header/>

            <div className="rank_info">현재 회원님의 순위는 ?위 입니다</div>
            <div className="rank_title">✨이번달 명예의 전당✨</div>

            <div className="rank_list">
                <div className="rank_1st"
            </div>
        </div>
    )
}