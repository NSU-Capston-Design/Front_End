import React from "react";
import Header from "../component/Header";
import "../css/Donation_details.css";

export default function Donation_details() {
  return (
    <div className="donation-details-all">
      <Header />

      <div className="donation-details">
        <div className="donation-details-txt" style={{ textAlign: "center" }}>
          <p>
            <font size="7">
              <strong>
                <font color="#617CC2">기부내역</font>
              </strong>
            </font>
          </p>
        </div>
      </div>

      <div className="donation-details-box">
        <div className="title-container">
          <div className="donation-details-label">
            <div className="donation-details-label" style={{ fontSize: "30px" }}>
              <strong>적립일</strong>
            </div>
            <p style={{ fontSize: '20px', margin: '5px 0' }}>11/11</p>
          </div>

          <div className="donation-details-label" style={{ marginBottom: '20px' }}>
            <div className="donation-details-label" style={{ fontSize: "30px" }}>
              <strong>적립내역</strong>
            </div>
            <p style={{ fontSize: '20px', margin: '5px 0' }}>인천대표</p>
          </div>

          <div className="donation-details-label" style={{ marginBottom: '20px' }}>
            <div className="donation-details-label" style={{ fontSize: "30px" }}>
              <strong>유효기간</strong>
            </div>
            <p style={{ fontSize: '20px', margin: '5px 0' }}>처리결과</p>
          </div>
        </div>

        <hr className="horizontal-line" />
      </div>

      <div className="gray-box-container">
        <div className="gray-box" style={{ marginTop: '50px' }}>
          <p style={{ fontWeight: 'bold', fontSize: '24px', marginBottom: '10px' }}>포인트</p>
          <p style={{ color: '#617CC2', fontWeight: 'bold', fontSize: '100px', marginTop: '10px' }}>0P</p>
        </div>
      </div>
    </div>
  );
}
