import React from "react";
import Header from "../component/Header";
import "../css/Eventpage.css";
import eventpage1 from "../img/eventpage1.jpg"; // eventpage1 이미지를 import

export default function Eventpage() {
  return (
    <div className="Eventpage_all">
      <Header />
      <div className="Eventpage">
        <div className="Eventpage_txt">
          <p>
            <strong>이달의 이벤트</strong>
          </p>
          장성군 고향사랑 기부제!
        </div>

        {/* eventpage1 이미지 추가 */}
        <div className="Eventpagecontainer">
          <img src={eventpage1} alt="eventpage1" />
        </div>
      </div>
    </div>
  );
}
