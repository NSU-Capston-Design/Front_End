import React from "react";
import { useEffect, useState } from 'react';
import Header from "../component/Header";
import Avatar from "../component/Rank";


export default function Rank() {

  const rankData = [
    { index: 2, imageSrc: "", badgeNumber: 2, nickname: "닉2🥈" },
    { index: 1, imageSrc: "", badgeNumber: 1, nickname: "닉1🥇" },
    { index: 3, img: "", badgeNumber: 3, nickname: "닉3🥉" },
    // 나머지 순위 데이터도 추가
    // { index: 4, img: "", badgeNumber: 4, nickname: "닉4" },
    // ...
    // { index: 10, img: "", badgeNumber: 10, nickname: "닉10" },
  ];

  return (
    <div className="rank_all">
      <Header />


      <div className="container">
        <div className="rank_info">
          <div className="ran_info">
            <span>{'현재 회원님의 순위는'}</span>
            <span className="rank_num">?</span>
            <span>위 입니다</span>
          </div>
        </div>
      </div>
      <div className="rank_title">✨이번달 명예의 전당✨</div>


      <div className="rank_list">
        {rankData.map((data) => (
          // 각 순위 생성
          <div key={data.index} className={`rank_${data.index}`}>
            {/* Avatar 컴포넌트 순위, 이미지, 뱃지 번호 등을 표시. */}
            <Avatar {...data} />

            {/* 닉네임 */}
            <div className={`rank${data.index}_name`}>{data.nickname}</div>
          </div>
        ))}
      </div>
    </div>
  );
}