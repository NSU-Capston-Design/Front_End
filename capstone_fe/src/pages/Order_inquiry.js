import React from "react";
import Header from "../component/Header";
import '../css/Order_inquiry.css';

export default function Order_inquiry() {

  return (
    <div className="order_inquiry_all">
      <Header />

      <div className="order_inquiry">
        <div className="order_inquiry_txt" style={{ textAlign: "center" }}>
          <p>
            <strong>
              <font color="#617CC2">기부내역</font>
            </strong>
          </p>
        </div>
      </div>

      <div className="section-separator"></div>

      <div className="order_inquiry_container">
        <div className="order_inquiry_box">
          <div className="row-style">
            <div className="title-container">
              <div className="order_inquiry_label">
                <strong>구매일</strong>
              </div>

              <div className="order_inquiry_label">
                <strong>구매내역</strong>
              </div>
            </div>

            <div className="order_inquiry_label">
              <strong>배송상태</strong>
            </div>

            <div className="order_inquiry_label">
              <strong>송장번호</strong>
            </div>
            
            <div className="order_inquiry_label">
              <strong>금액</strong>
          </div>
          </div>
          
          <hr className="order_inquiry_line" />

          <div className="row-style">
            <div className="title-container">
              <div className="order_inquiry_label" style={{ marginTop: "200px" }}>
                12월 12일
              </div>

              <div className="order_inquiry_label" style={{ marginTop: "200px" }}>
                인천
              </div>
            </div>

            <div className="order_inquiry_label" style={{ marginTop: "200px" }}>
              배송완료
            </div>

            <div className="order_inquiry_label" style={{ marginTop: "200px" }}>
              213141
            </div>

            <div className="order_inquiry_label" style={{ marginTop: "200px" }}>
              5,000원
            </div>
          </div>
          
          
          <div className="order_inquiry_container" style={{ textAlign: "center", marginTop: "20px" }}>
              <button className="order_inquiry_button">&lt;</button>
              <button className="order_inquiry_button">1</button>
              <button className="order_inquiry_button">2</button>
              <button className="order_inquiry_button">3</button>
              <button className="order_inquiry_button">4</button>
              <button className="order_inquiry_button">5</button>
              <button className="order_inquiry_button">&gt;</button>
            
          </div>      
        </div>
      </div>
    </div>
  );
}
