import React, { useState, useEffect } from "react";
import Header from "../component/Header"; // 헤더 컴포넌트를 불러옵니다.
import '../css/Donation_details.css'; // 기부 내역 CSS를 불러옵니다.
import axios from 'axios'; // axios를 불러옵니다.

export default function Donation_details() {
  // 기부 내역과 총 기부 금액을 관리하는 상태
  const [donationData, setDonationData] = useState({
    totalAmount: 0, // 총 기부 금액
    donationList: [] // 기부 내역 리스트
  });

  // 컴포넌트가 처음 렌더링될 때 기부 내역을 가져오는 효과
  useEffect(() => {
    fetchDonationData(); // 컴포넌트가 처음 렌더링될 때 fetchDonationData 함수를 실행합니다.
  }, []);

  // 백엔드 API로부터 기부 내역을 가져오는 함수
  const fetchDonationData = async () => {
    try {
      // 백엔드 API를 호출하여 기부 내역을 가져옴 (수정)
      const response = await axios.get("http://localhost:8080/donations/by-user");

      // 가져온 기부 내역에서 총 기부 금액 계산
      const totalAmount = response.data.reduce((total, donation) => total + donation.amount, 0);

      // 상태 업데이트
      setDonationData({
        totalAmount: totalAmount, // 총 기부 금액 업데이트
        donationList: response.data // 기부 내역 리스트 업데이트
      });
    } catch (error) {
      console.error("Error fetching donation data: ", error); // 에러가 발생할 경우 콘솔에 에러 메시지를 출력합니다.
    }
  };

  return (
    <div className="donation_details_all">
      {/* 헤더 컴포넌트 */}
      <Header />

      <div className="donation_details">
        <div className="donation_details_txt" style={{ textAlign: "center" }}>
          <p>
            <strong>
              <font color="#617CC2">기부내역11</font>
            </strong>
          </p>
          {/* 총 기부 금액 표시 */}
          <p>총 기부 금액: {donationData.totalAmount}원</p>
        </div>
      </div>

      {/* 기부 내역 표시 */}
      <div className="donation_details_list">
        <h2>기부 내역</h2>
        <ul>
          {/* 기부 내역 목록 표시 */}
          {donationData.donationList.map((donation, index) => (
            <li key={index}>
              {/* 기부한 날짜 표시 */}
              <p>기부일: {donation.donationDate}</p>
              {/* 기부 금액 표시 */}
              <p>금액: {donation.amount}원</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
