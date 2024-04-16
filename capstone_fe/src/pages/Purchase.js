import React, { useState } from 'react';
import Button from '../component/Button';
import axios from 'axios';
import "../css/Purchase.css";

export default function Purchase({ productName, fileId, productPrice, onClose }) {
    const [paymentStep, setPaymentStep] = useState(1); // 결제 단계 추적을 위한 상태
    const [paymentInfo, setPaymentInfo] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardholderName: ''
    });
    const [paymentCompleted, setPaymentCompleted] = useState(false); // 결제 완료 상태 추적

    const handleConfirmPurchase = async () => {
        try {
            const response = await axios.post('http://localhost:8080/orders', {
                productName,
                fileId,
                productPrice,
                paymentInfo
            });
            if (response.status === 200) {
                setPaymentCompleted(true); // 결제 완료 상태로 변경
            } else {
                throw new Error('주문을 생성하는데 실패했습니다.');
            }
        } catch (error) {
            console.error('주문 생성 중 오류 발생:', error);
            alert('주문을 생성하는데 실패했습니다.');
        }
    };

    const handlePaymentInfoChange = (e) => {
        const { name, value } = e.target;
        setPaymentInfo((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleNextStep = () => {
        if (paymentStep === 1) {
            setPaymentStep(2);
        } else if (paymentStep === 2) {
            const { cardNumber, expiryDate, cvv, cardholderName } = paymentInfo;
            if (cardNumber && expiryDate && cvv && cardholderName) {
                handleConfirmPurchase();
            } else {
                alert('모든 필드를 입력해주세요.');
            }
        }
    };

    const handlePrevStep = () => {
        setPaymentStep((prevStep) => prevStep - 1);
    };

    const renderPaymentStep = () => {
        switch (paymentStep) {
            case 1:
                return (
                    <>
                        <h3>결제 정보 확인</h3>
                        <p>상품명: {productName}</p>
                        <p>가격: {productPrice}</p>
                        <Button size="sm" onClick={handleNextStep}>다음</Button>
                    </>
                );
            case 2:
                return (
                    <>
                        <h3>카드 정보 입력</h3>
                        <input
                            type="text"
                            name="cardholderName"
                            placeholder="카드 소유자 이름"
                            value={paymentInfo.cardholderName}
                            onChange={handlePaymentInfoChange}
                        />
                        <input
                            type="text"
                            name="cardNumber"
                            placeholder="카드 번호"
                            value={paymentInfo.cardNumber}
                            onChange={handlePaymentInfoChange}
                        />
                        <div>
                            <input
                                type="text"
                                name="expiryDate"
                                placeholder="유효 기간 (MM/YY)"
                                value={paymentInfo.expiryDate}
                                onChange={handlePaymentInfoChange}
                            />
                            <input
                                type="text"
                                name="cvv"
                                placeholder="CVV"
                                value={paymentInfo.cvv}
                                onChange={handlePaymentInfoChange}
                            />
                        </div>
                        <div>
                            <Button size="sm" onClick={handlePrevStep}>이전</Button>
                            <Button size="sm" onClick={handleNextStep}>결제하기</Button>
                        </div>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="purchase-modal-overlay">
            <div className="purchase-modal">
                <div className="purchase-modal-content">
                    <span className="purchase-close" onClick={onClose}>&times;</span>
                    {paymentCompleted ? (
                        <div>
                            <h3>결제 완료</h3>
                            <p>결제가 성공적으로 완료되었습니다.</p>
                            <Button size="sm" onClick={onClose}>닫기</Button>
                        </div>
                    ) : (
                        renderPaymentStep()
                    )}
                </div>
            </div>
        </div>
    );
}