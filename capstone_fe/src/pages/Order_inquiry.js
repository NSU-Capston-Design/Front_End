import React, { useState, useEffect } from "react";
import Header from "../component/Header";
import "../css/Order_inquiry.css";
import axios from "axios";
import { getItemWithTime } from "../component/GetStorage";

export default function Order_inquiry() {
  const [order, setOrder] = useState([]); // 주문 정보 상태
  const [userId, setUserId] = useState();

  useEffect(() => {
    setUserId(getItemWithTime('userId'));

    // orderId에 따른 주문 정보를 가져오는 함수
    const fetchOrder = async () => {
      console.log(userId);
      try {
        const response = await axios.get(`http://localhost:8080/orders`,{
          params: {userId : userId}
        });
        const orderData = response.data; // 백엔드에서 받은 주문 정보
        setOrder(orderData); // 주문 정보 상태 업데이트
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    fetchOrder(); // 주문 정보 가져오는 함수 호출

  }, [userId]);

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

                {order.map((item) => (
                  <div key={item.orderId} className="order_table">
                    <div className="order_inquiry_label">
                      <strong>주문일</strong>
                      <div>{item.orderDate}</div>
                    </div>
                    <div className="order_inquiry_label">
                      <strong>주문 상태</strong>
                      <div>{item.orderStatus}</div>
                    </div>
                    <div className="order_inquiry_label">
                      <strong>상품갯수</strong>
                      <div>{item.orderItems.length}</div>
                    </div>
                    <div className="order_inquiry_label">
                      <strong>상품 명</strong>
                      <div>
                        { item.orderItems.length > 1 ? (
                              <>
                                <span key={item.orderItems[0].id}>{item.orderItems[0].productName} </span>
                                <span> 외 {item.orderItems.length - 1}개</span>
                              </>
                            ) :
                              item.orderItems.map((orderItems) => (
                                <span key={orderItems.id}> {orderItems.productName} </span>
                              ))
                        }</div>
                    </div>
                      <div className="order_inquiry_label">
                      <strong>총 비용</strong>
                    <div>{item.orderTotalCost}원</div>               
                    </div>
                  </div>
                  ))
                }
                                          
      </div>
    </div>
  );
}
