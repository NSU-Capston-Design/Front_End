import React from "react";
import Header from "../component/Header";
import '../css/Donation_details.css';

export default function Donation_details() {

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
        </div>
      </div>

      <div className="section-separator"></div>

      <div className="donation_details_container">
        <div className="donation_details_box">
          <div className="row-style">
            <div className="title-container">
              <div className="donation_details_label">
                <strong>기부일</strong>
              </div>

              <div className="donation_details_label">
                <strong>기부처</strong>
              </div>
            </div>

            <div className="donation_details_label">
              <strong>상태</strong>
            </div>

            <div className="donation_details_label">
              <strong>금액</strong>
            </div>
          </div>

          <hr className="donation_details_line" />

          <div className="row-style">
            <div className="title-container">
              <div className="donation_details_label" style={{ marginTop: "200px" }}>
                12/12
              </div>

              <div className="donation_details_label" style={{ marginTop: "200px" }}>
                인천
              </div>
            </div>

            <div className="donation_details_label" style={{ marginTop: "200px" }}>
              possibility
            </div>

            <div className="donation_details_label" style={{ marginTop: "200px" }}>
              10,000원
            </div>
          </div>

          <hr className="donation_details_line" />

          <div className="row-style">
            <div className="title-container">
              <div className="donation_details_label" style={{ marginTop: "200px" }}>
                11/11
              </div>

              <div className="donation_details_label" style={{ marginTop: "200px" }}>
                서울
              </div>
            </div>

            <div className="donation_details_label" style={{ marginTop: "200px" }}>
              impossibility
            </div>

            <div className="donation_details_label" style={{ marginTop: "200px" }}>
              5,000원
            </div>
          </div> 
          
          <div className="pagination_container" style={{ textAlign: "center", marginTop: "20px" }}>
              <button className="pagination_button">&lt;</button>
              <button className="pagination_button">1</button>
              <button className="pagination_button">2</button>
              <button className="pagination_button">3</button>
              <button className="pagination_button">4</button>
              <button className="pagination_button">5</button>
              <button className="pagination_button">&gt;</button>
            
          </div>      
        </div>
      </div>
    </div>
  );
}
