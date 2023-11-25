import React from "react";
import Header from "../component/Header";
import "./Donation_details.css"; // CSS 파일을 import

export default function Donation_details() {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "70px",
  };

  const boxStyle = {
    border: "4px solid #DEDEDE",
    borderRadius: "30px",
    padding: "200px",
    width: "1850px",
    height: "500px",
    marginTop: "0px",
  };

  const titleContainerStyle = {
    display: "flex",
    gap: "350px",
  };

  const rowStyle = {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
    marginTop: "-100px",
  };

  const labelStyle = {
    flex: "1",
    textAlign: "center",
    fontSize: "20px",
    fontWeight: "bold",
  };

  const horizontalLineStyle = {
    position: "absolute",
    width: "70%",
    height: "5px",
    backgroundColor: "#ccc",
    bottom: "800px",
  };

  const grayBoxContainerStyle = {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "20px",
  };

  const grayBoxStyle = {
    position: "relative",
    width: "150px",
    height: "150px",
    background: "#DEDEDE",
    borderRadius: "10px",
    padding: "10px",
    textAlign: "center",
  };

  return (
    <div className="donation_details_all" style={containerStyle}>
      <Header />

      <div className="donation_details">
        <div className="donation_details_txt" style={{ textAlign: "center" }}>
          <p>
            <font size="7">
              <strong>
                <font color="#617CC2">기부내역</font>
              </strong>
            </font>
          </p>
        </div>
      </div>

      <div className="section_separator"></div>

      <div style={containerStyle}>
        <div style={boxStyle}>
          <div style={rowStyle}>
            <div style={titleContainerStyle}>
              <div className="donation_details_label" style={labelStyle}>
                <strong>기부일</strong>
              </div>

              <div className="donation_details_label" style={labelStyle}>
                <strong>기부처</strong>
              </div>
            </div>

            <div className="donation_details_label" style={labelStyle}>
              <strong>상태</strong>
            </div>

            <div className="donation_details_label" style={labelStyle}>
              <strong>금액</strong>
            </div>
          </div>

          <hr style={horizontalLineStyle} />

          <div style={rowStyle}>
            <div style={titleContainerStyle}>
              <div className="donation_details_label" style={{ ...labelStyle, marginTop: "200px" }}>
                12/12
              </div>

              <div className="donation_details_label" style={{ ...labelStyle, marginTop: "200px" }}>
                인천
              </div>
            </div>

            <div className="donation_details_label" style={{ ...labelStyle, marginTop: "200px" }}>
              possibility
            </div>

            <div className="donation_details_label" style={{ ...labelStyle, marginTop: "200px" }}>
              10,000원
            </div>
          </div>

          <hr style={horizontalLineStyle} />

          <div style={rowStyle}>
            <div style={titleContainerStyle}>
              <div className="donation_details_label" style={{ ...labelStyle, marginTop: "200px" }}>
                11/11
              </div>

              <div className="donation_details_label" style={{ ...labelStyle, marginTop: "200px" }}>
                서울
              </div>
            </div>

            <div className="donation_details_label" style={{ ...labelStyle, marginTop: "200px" }}>
              impossibility
            </div>

            <div className="donation_details_label" style={{ ...labelStyle, marginTop: "200px" }}>
              5,000원
            </div>
          </div>
        </div>

        <div style={grayBoxContainerStyle}>
          <div style={grayBoxStyle}>
            <p>포인트0P</p>
          </div>
        </div>
      </div>
    </div>
  );
}
