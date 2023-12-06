import React from "react";
import { useEffect, useState } from 'react';
import Header from "../component/Header";
import "../css/Rank.css"
import {Element} from "../component/Rank";

export default function Rank() {



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

        <div className="rank2"> {/*2위 */}
          <div className="avatar-2">
            <div className="overlap-group-2">{/*프로필 사진 */}
              <div className="rank-badge-2"> {/*순위 뱃지 */}
                <div className="badge-frame-2">
                  <div className="rank-num-2">2</div> {/*순위 */}
                </div>
              </div>
            </div>
          </div>
          <div className="rank-name-2">닉네임2</div>
        </div>

        <div className="rank1"> {/*1위 */}
          <div className="avatar-1">
            <div className="overlap-group-1">{/*프로필 사진 */}
              <div className="rank-badge-1"> {/*순위 뱃지 */}
                <div className="badge-frame-1">
                  <div className="rank-num-1">1</div> {/*순위 */}
                </div>
              </div>
            </div>
          </div>
          <div className="rank-name-1">닉네임1</div>
        </div>

        <div className="rank3"> {/*3위 */}
          <div className="avatar-3">
            <div className="overlap-group-3">{/*프로필 사진 */}
              <div className="rank-badge-3"> {/*순위 뱃지 */}
                <div className="badge-frame-3">
                  <div className="rank-num-3">3</div> {/*순위 */}
                </div>
              </div>
            </div>
          </div>
          <div className="rank-name3">닉네임3</div>
        </div>

        <div className="other-ranks">
          <Element className="four" rankNum='4' rankName='닉4'/>
          <Element className="four" rankNum = '5' rankName='닉5'/>
          <Element className="four"  rankNum = '6' rankName='닉6'/>
          <Element className="four" rankNum = '7' rankName='닉7'/>
          <Element className="four"  rankNum = '8' rankName='닉8'/>
          <Element className="four" rankNum = '9' rankName='닉9'/>
          <Element className="four" rankNum = '10' rankName='닉10'/>
        </div>




      </div>
    </div>
  );
}