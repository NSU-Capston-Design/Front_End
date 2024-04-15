import React, { useState, useEffect } from "react";
import Header from "../component/Header";
import "../css/Donation_details.css";
import axios from "axios";

export default function Donation_details() {
  const [donationData, setDonationData] = useState({
    totalAmount: 0,
    donationList: [],
  });

  useEffect(() => {
    // 로그인한 사용자의 정보를 가져온다고 가정
    const userToken = localStorage.getItem("userToken"); // 로컬 스토리지에서 사용자 토큰을 가져옴

    // 사용자 정보를 가져오는 API 호출
    axios.get("http://localhost:8080/userinfo", {
      headers: {
        Authorization: `Bearer ${userToken}`, // 사용자 토큰을 Authorization 헤더에 포함하여 전송
      },
    })
    .then(response => {
      const userId = response.data.userId; // API 응답에서 사용자 ID 추출

      fetchDonationData(userId); // 추출한 사용자 ID로 기부 내역을 가져오는 함수 호출
    })
    .catch(error => {
      console.error("Error fetching user info: ", error);
    });
  }, []);

  const fetchDonationData = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8080/donations/by-user/${userId}`);

      const donationList = response.data;
      const totalAmount = donationList.reduce((total, donation) => total + donation.amount, 0);

      setDonationData({
        totalAmount: totalAmount,
        donationList: donationList,
      });
    } catch (error) {
      console.error("Error fetching donation data: ", error);
    }
  };

  return (
    <div className="donation_details_all">
      <Header />

      <div className="donation_details">
        <div className="donation_details_txt" style={{ textAlign: "center" }}>
          <p>
            <strong>
              <font color="#617CC2">기부내역</font>
            </strong>
          </p>
          <p>총 기부 금액: {donationData.totalAmount}원</p>
        </div>
      </div>

      <div className="donation_details_list">
        <ul>
          {donationData.donationList.map((donation, index) => (
            <li key={index}>
              <p>기부일: {new Date(donation.donationDate).toLocaleDateString()}</p>
              <p>금액: {donation.amount}원</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
