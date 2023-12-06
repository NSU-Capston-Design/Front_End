import React from "react";
import Header from "../component/Header";
import '../css/Point.css';

export default function Point() {

  return (
    <div className="point_all">
      <Header />

      <div className="point">
        <div className="point_txt" style={{ textAlign: "center" }}>
          <p>
            <strong>
              <font color="#617CC2">기부내역</font>
            </strong>
          </p>
        </div>
      </div>

      <div className="section-separator"></div>

      <div className="point_list1">
          <div className="mypage_name2">포인트</div>
          <div className="mypage_name2_dl">0P<br/></div>
          </div>

      <div className="point_container">
        <div className="point_box">
          <div className="row-style">
            <div className="title-container">
              <div className="point_label">
                <strong>기부일</strong>
              </div>

              <div className="point_label">
                <strong>기부처</strong>
              </div>
            </div>

            <div className="point_label">
              <strong>상태</strong>
            </div>

            <div className="point_label">
              <strong>금액</strong>
            </div>
          </div>

          <hr className="point_line" />

          <div className="row-style">
            <div className="title-container">
              <div className="point_label" style={{ marginTop: "200px" }}>
                12/12
              </div>

              <div className="point_label" style={{ marginTop: "200px" }}>
                인천
              </div>
            </div>

            <div className="point_label" style={{ marginTop: "200px" }}>
              possibility
            </div>

            <div className="point_label" style={{ marginTop: "200px" }}>
              10,000원
            </div>
          </div>

          <hr className="point_line" />

          <div className="row-style">
            <div className="title-container">
              <div className="point_label" style={{ marginTop: "200px" }}>
                11/11
              </div>

              <div className="point_label" style={{ marginTop: "200px" }}>
                서울
              </div>
            </div>

            <div className="point_label" style={{ marginTop: "200px" }}>
              impossibility
            </div>

            <div className="point_label" style={{ marginTop: "200px" }}>
              5,000원
            </div>
          </div> 
          
          <div className="pagination_container" style={{ textAlign: "center", marginTop: "-20px" }}>
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
