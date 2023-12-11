import React, { useState } from "react";
import Header from "../component/Header";
import "../css/Cart.css";
import item_img from '../img/item.png';
import successful_paymentImage from '../img/successful_payment.png';
import payment_failedImage from '../img/payment_failed.png';

export default function Cart() {
  // 수량 상태 관리
  const [quantities, setQuantities] = useState({
    cart_list1: 1,
    cart_list2: 1,
    cart_list3: 1,
  });

  // 결제 성공, 실패 모달 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isFailureModalOpen, setIsFailureModalOpen] = useState(false);

  // 수량 증가 함수
  const increaseQuantity = (box) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [box]: prevQuantities[box] + 1,
    }));
  };

  // 수량 감소 함수
  const decreaseQuantity = (box) => {
    if (quantities[box] > 1) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [box]: prevQuantities[box] - 1,
      }));
    }
  };

  // 결제 성공 처리 함수
  const handleSuccess = () => {
    console.log("결제 성공 처리");
    openSuccessModal(); // 결제 성공 모달 열기
  };

  // 결제 실패 처리 함수
  const handleFailure = () => {
    console.log("결제 실패 처리");
    openFailureModal(); // 결제 실패 모달 열기
  };

  // 결제 실패 확인 함수
  const handleFailureConfirmation = () => {
    closeFailureModal(); // 결제 실패 모달 닫기
    closeModal(); // 기존 모달 닫기
  };

  // 모달 열기 함수
  const openModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 결제하기 버튼 클릭 시 실행되는 함수
  const handlePayment = () => {
    openModal(); // 결제하기 버튼을 누를 때 기존 모달 열기
  };

  // 결제 성공 모달 열기 함수
  const openSuccessModal = () => {
    setIsSuccessModalOpen(true);
    setIsModalOpen(false); // 기존 모달 닫기
  };

  // 결제 성공 모달 닫기 함수
  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  // 결제 실패 모달 열기 함수
  const openFailureModal = () => {
    setIsFailureModalOpen(true);
  };

  // 결제 실패 모달 닫기 함수
  const closeFailureModal = () => {
    setIsFailureModalOpen(false);
  };

  // 결제 성공 확인 함수
  const handleSuccessConfirmation = () => {
    closeSuccessModal(); // 결제 성공 모달 닫기
  };

  // 결제 성공 버튼 클릭 시 실행되는 함수
  const handleSuccessButtonClick = () => {
    handleSuccess(); // 결제 성공 함수 호출
    openSuccessModal(); // 결제 성공 모달 열기
  };

  return (
    <div className="cart_all">
      <div className="don_all">
        <Header />

        <div className="cart">
          <div className="cart_txt">장바구니</div>
        </div>

        {/* 장바구니 아이템 1 */}
        <div className="cart_list1">
          <div className="item-container">
            <img src={item_img} alt="Item" className="item-image" />
            <div className="item-info">
              <div className="item-name">추억의 도시락</div>
              <div className="item-shipping">배송 가능</div>
              <div className="item-price">가격</div>
            </div>
            <div className="quantity-controls">
              <button onClick={() => decreaseQuantity("cart_list1")}>-</button>
              <span>{quantities.cart_list1}</span>
              <button onClick={() => increaseQuantity("cart_list1")}>+</button>
            </div>
          </div>
        </div>

        {/* 장바구니 아이템 2 */}
        <div className="cart_list2">
          <div className="item-container">
            <img src={item_img} alt="Item" className="item-image" />
            <div className="item-info">
              <div className="item-name">추억의 도시락A</div>
              <div className="item-shipping">배송 가능</div>
              <div className="item-price">500,000</div>
            </div>
            <div className="quantity-controls">
              <button onClick={() => decreaseQuantity("cart_list2")}>-</button>
              <span>{quantities.cart_list2}</span>
              <button onClick={() => increaseQuantity("cart_list2")}>+</button>
            </div>
          </div>
        </div>

        {/* 장바구니 아이템 3 */}
        <div className="cart_list3">
          <div className="item-container">
            <img src={item_img} alt="Item" className="item-image" />
            <div className="item-info">
              <div className="item-name">추억의 도시락B</div>
              <div className="item-shipping">배송 불가</div>
              <div className="item-price">100,000</div>
            </div>
            <div className="quantity-controls">
              <button onClick={() => decreaseQuantity("cart_list3")}>-</button>
              <span>{quantities.cart_list3}</span>
              <button onClick={() => increaseQuantity("cart_list3")}>+</button>
            </div>
          </div>
        </div>

        {/* 결제 정보 */}
        <div className="cart_list4">
          <div className="payment-info-container">
            <div className="item-info">
              <div className="payment-info">
                <div className="payment-label">결제 내역</div>

                {/* 결제 상세 내역 */}
                <div className="payment-details">
                  {/* 아이템 1 */}
                  <div className="item-details">
                    <div className="item-name1">추억의 도시락A</div>
                    <div className="quantity-controls1">X1</div>
                    <div className="item-price1">10,000</div>
                  </div>

                  {/* 아이템 2 */}
                  <div className="item-details">
                    <div className="item-name1">추억의 도시락B</div>
                    <div className="quantity-controls1">X1</div>
                    <div className="item-price1">20,000</div>
                  </div>

                  {/* 아이템 3 */}
                  <div className="item-details">
                    <div className="item-name1">추억의 도시락C</div>
                    <div className="quantity-controls1">X1</div>
                    <div className="item-price1">30,000</div>
                  </div>
                </div>

                {/* 총액 및 결제 버튼 */}
                <div className="payment-label1">총액</div>
                <div className="payment-label2">60,000</div>
                <button className="checkout-button" onClick={openModal}>결제하기</button>
              </div>
            </div>
          </div>
        </div>

        {/* 결제 성공 모달 */}
        {isSuccessModalOpen && (
          <div className="custom-modal" onClick={closeSuccessModal} style={{ zIndex: 10001 }}>
            <div className="custom-modal-content" onClick={(e) => e.stopPropagation()}>
              <span className="custom-close" onClick={handleSuccessConfirmation}>&times;</span>
              <img src={successful_paymentImage} alt="Successful Payment" className="successful-payment-image" />
              <p style={{ fontSize: '24px' }}>결제 성공!</p>

              {/* 결제 정보 */}
              <div className="payment-info">
                <div className="info-label-value-container">
                  <div className="info-label info-text">결제방법</div>
                  <div className="info-value info-text">인터넷뱅킹</div>
                </div>

                <div className="info-label-value-container">
                  <div className="info-label info-text">전화번호</div>
                  <div className="info-value info-text">010-1234-5678</div>
                </div>

                <div className="info-label-value-container">
                  <div className="info-label info-text">이메일</div>
                  <div className="info-value info-text">asd@naver.com</div>
                </div>

                <div className="info-label-value-container">
                  <div className="info-label info-text">구매계정</div>
                  <div className="info-value info-text">12345</div>
                </div>

                <div className="info-label-value-container">
                  <div className="info-label info-text">총 구매액</div>
                  <div className="info-value info-text">60,000</div>
                </div>
              </div>

              {/* 현재 사용하지 않는다면 이 버튼들을 제거하세요 */}
              <div className="modal-buttons">
                <button className="success-button" onClick={handleSuccessConfirmation}>확인</button>
              </div>
            </div>
          </div>
        )}

        {/* 결제 실패 모달 */}
        {isFailureModalOpen && (
          <div className="custom-modal" onClick={closeFailureModal} style={{ zIndex: 10002 }}>
            <div className="custom-modal-content" onClick={(e) => e.stopPropagation()}>
              <span className="custom-close" onClick={handleFailureConfirmation}>&times;</span>
              <img src={payment_failedImage} alt="Payment Failed" className="payment-failed-image" />
              <p style={{ fontSize: '24px', fontWeight: 'bold', whiteSpace: 'pre-line', marginBottom: '-50px' }}>
                결제 오류가 생겼습니다.<br />잠시 후 다시 시도해주세요.
              </p>

              {/* 현재 사용하지 않는다면 이 버튼들을 제거하세요 */}
              <div className="modal-buttons">
                <button className="failure-button" onClick={handleFailureConfirmation}>확인</button>
              </div>
            </div>
          </div>
        )}

        {/* 일반 모달 */}
        {isModalOpen && (
          <div className="custom-modal" onClick={closeModal} style={{ zIndex: 10000 }}>
            <div className="custom-modal-content" onClick={(e) => e.stopPropagation()}>
              <span className="custom-close" onClick={closeModal}>&times;</span>
              <p>결제 모듈 넣는곳</p>

              {/* 결제 성공, 실패 버튼 추가 */}
              <div className="modal-buttons">
                <button className="success-button" onClick={() => { handleSuccess(); openSuccessModal(); }}>결제 성공</button>
                <button className="failure-button" onClick={() => { handleFailure(); openFailureModal(); }}>결제 실패</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
