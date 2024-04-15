import React, { useState, useEffect } from "react";
import Header from "../component/Header";
import "../css/Order_inquiry.css";
import axios from "axios";

export default function Order_inquiry() {
  const [order, setOrder] = useState(null); // 주문 정보 상태

  useEffect(() => {
    // orderId에 따른 주문 정보를 가져오는 함수
    const fetchOrder = async () => {
      const orderId = "your_order_id"; // 백엔드에서 받은 주문 ID
      try {
        const response = await axios.get(`http://localhost:8080/get/${orderId}`);
        const orderData = response.data; // 백엔드에서 받은 주문 정보
        setOrder(orderData); // 주문 정보 상태 업데이트
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    fetchOrder(); // 주문 정보 가져오는 함수 호출

  }, []);

  return (
    <div className="order_inquiry_all">
      <Header />
      <div className="order_inquiry">
        <div className="order_inquiry_txt">
          <p>
            <strong>주문 내역</strong>
          </p>
        </div>
      </div>
      <div className="order_inquiry_container">
        
              <div className="order_inquiry_label">
                <strong>주문일</strong>
                <div>{order && new Date(order.orderDate).toLocaleDateString()}</div>
              </div>
              <div className="order_inquiry_label">
                <strong>주문 상태</strong>
                <div>{order && order.orderStatus}</div>
              </div>
              <div className="order_inquiry_label">
                <strong>결제 상태</strong>
                <div>{order && order.orderPaymentStatus}</div>
              </div>
              <div className="order_inquiry_label">
                <strong>상품 결제</strong>
                <div>{order && `${order.productPayment}원`}</div>
              </div>
              <div className="order_inquiry_label">
                <strong>상품 명</strong>
                <div>{order && order.productName}</div>
              </div>
              <div className="order_inquiry_label">
                <strong>배송비</strong>
                <div>{order && `${order.orderShippingCost}원`}</div>
              </div>
              <div className="order_inquiry_label">
                <strong>총 비용</strong>
                <div>{order && `${order.orderTotalCost}원`}</div>
              
        </div>
      </div>
    </div>
  );
}
