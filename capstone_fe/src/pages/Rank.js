import React from "react";
import { useEffect, useState } from 'react';
import Header from "../component/Header";
import "../css/Rank.css"
import { Element } from "../component/Rank";
import axios from "axios";

export default function Rank() {

  const [topDonators, setTopDonators] = useState();
  useEffect(() => { //기부순위 함수 호출
    fetchDonaRanks();
  }, []);
  const fetchDonaRanks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/donations/top");
      setUserRank(response.data.userRank);
      setTopDonators(response.data.topDonators);
    } catch (error) {
      console.error('기부 순위 데이터를 가져오는 중에 오류가 발생했습니다:', error);
    }
  };


  const [donations, setUserRank] = useState();

  //기부금액 내림차순 정렬
  const sortedDonations = [...donations].sort((a, b) => b.donation_amount - a.donation_amount);

  return (
    <div className="rank_all">
      <Header />
      <div className="container">
        <div className="rank_info">
          <div className="ran_info">
            <span>{'현재 회원님의 순위는'}</span>
            <span className="rank_num">{/*userRank*/}</span> {/*로그인한 회원의 순위 */}
            <span>위 입니다</span>
          </div>
        </div>
      </div>
      <div className="rank_title">✨이번달 명예의 전당✨</div>


      <div className="rank_list"> {/*전체유저 상위 10위권만 표시 */}

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
          <div className="rank-name-2">{sortedDonations[1]?.user_id}</div>
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
          <div className="rank-name-1">{sortedDonations[0]?.user_id}</div>
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
          <div className="rank-name3">{sortedDonations[2]?.user_id}</div>
        </div>

        <div className="other-ranks">
          {sortedDonations.slice(3).map((donation, index) => ( // 4위부터 시작
            <div key={donation.id} className={`rank${index + 4}`}>
              <div className={`avatar-${index + 4}`}>
                <div className={`overlap-group-${index + 4}`}>
                  <div className={`rank-badge-${index + 4}`}>
                    <div className="badge-frame">
                      <div className={`rank-num-${index + 4}`}>{index + 4}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`rank-name-${index + 4}`}>{donation.user_id}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}