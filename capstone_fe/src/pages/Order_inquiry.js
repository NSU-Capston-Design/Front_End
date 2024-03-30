import React, { useState, useEffect } from "react";
import Header from "../component/Header";
import '../css/Order_inquiry.css';
import axios from 'axios';

export default function Order_inquiry() {
  const [orders, setOrders] = useState([]); // 주문 목록 상태

  // 페이지 로드시 주문 목록을 가져오는 함수
  useEffect(() => {
    fetchOrders(); // 주문 목록을 가져오는 함수 호출
    addTestOrder(); // 테스트 주문 정보를 추가하는 함수 호출
  }, []);

  // 주문 목록을 가져오는 함수
  const fetchOrders = async () => {
    try {
      // 주문 목록을 가져오는 API 요청
      const response = await axios.get(`http://localhost:8080/get/orderId`);
      setOrders(response.data); // 가져온 주문 목록을 상태에 설정
    } catch (error) {
      console.error("Error fetching orders: ", error);
    }
  };

  // 테스트 주문 정보 추가 함수
  const addTestOrder = () => {
    const testOrder = {
      orderDate: new Date().toISOString(), // 현재 날짜를 주문일로 설정
      productName: "아메리카노", // 상품 이름 설정
      orderStatus: "배송중", // 주문 상태 설정
      orderTrackingNumber: "123", // 송장 번호 설정
      orderTotalCost: 3000 // 총 비용 설정
    };

    // 테스트 주문 정보를 주문 목록에 추가
    setOrders([testOrder]);
  };

  // 배송 조회 페이지로 이동하는 함수
  const handleTrackDelivery = () => {
    window.location.href = "https://service.epost.go.kr/iservice/usr/trace/usrtrc001k01.jsp";
  };

  return (
    <div className="order_inquiry_all">
      <Header />
      <div className="order_inquiry">
        <div className="order_inquiry_txt" style={{ textAlign: "center" }}>
          <p>
            <strong>
              <font color="#617CC2">주문 내역</font>
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
                <strong>주문일</strong>
              </div>
              <div className="order_inquiry_label">
                <strong>상품 이름</strong>
              </div>
              <div className="order_inquiry_label">
                <strong>주문 상태</strong>
              </div>
              <div className="order_inquiry_label">
                <strong>송장 번호</strong>
              </div>
              <div className="order_inquiry_label">
                <strong>총 비용</strong>
              </div>
            </div>
          </div>
          {orders.map((order, index) => (
            <div key={index} className="row-style">
              <div className="title">
                <div className="order_inquiry_label">
                  {order.orderDate}
                </div>
                <div className="order_inquiry_label">
                  {order.productName}
                </div>
                <div className="order_inquiry_label">
                  {order.orderStatus}
                </div>
                <div className="order_inquiry_label">
                  {order.orderTrackingNumber}
                </div>
                <div className="order_inquiry_label">
                  {order.orderTotalCost}원
                </div>
              </div>
            </div>
          ))}
          <div className="order_inquiry_container" style={{ textAlign: "center", marginTop: "20px" }}>
            <button className="order_inquiry_button" onClick={handleTrackDelivery}>배송조회하기</button>
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
