import React, { useState } from "react";
import Header from "../component/Header";
import "../css/Donation.css";
import Button from "../component/Button";
import axios from 'axios';

export default function Donation() {
    const [donationAmount, setDonationAmount] = useState(0); // 기부 금액 상태
    const [modalOpen, setModalOpen] = useState(false); // 모달 열림 상태
    const [paymentMethod, setPaymentMethod] = useState(""); // 결제 방식 상태


    // 기부하기 버튼 클릭 시 모달을 열도록 하는 함수
    const openDonationModal = () => {
        setModalOpen(true);
    };

    // 모달 닫기 버튼 클릭 시 모달을 닫도록 하는 함수
    const closeDonationModal = () => {
        setModalOpen(false);
        setPaymentMethod(""); // 결제 방식 초기화
    };
    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
    };

    const handleDonate = async () => {

        if (donationAmount < 1000) {
            alert('천원 이상의 금액을 입력해주세요.');
            return;
        }
        if (!paymentMethod) {
            alert("결제 방식을 선택해주세요.");
            return;
        }
        try {
            // 백엔드에 기부 정보를 전달하고 결제 처리
            const response = await axios.post('http://localhost:8080/donate', {
                userId: window.localStorage.getItem('userId'),
                amount: donationAmount
            });
            // 결제 성공 시에는 다음 단계로 넘어갈 수 있도록 처리
            // 예를 들어 결제 완료 페이지로 이동하는 등의 작업 수행
            console.log('기부 성공:', response.data);
            // 모달을 닫습니다.
            closeDonationModal();
            // 기부 감사 메시지를 띄웁니다.
            alert('기부해주셔서 감사합니다!');
        } catch (error) {
            console.error('기부 실패:', error);
            // 기부 실패 시 에러 처리 로직 추가
        }
    };

    return (
        <div className="donation_all">
            <div className="don_all">
                <Header />

                <div className="donation" >
                    <div className="donation_txt">기부</div>
                    <div className="donation_txt_detail">Donation 寄附 寄付 пожертвование</div>
                </div>

                <div className="donation_list">
                    <div className="dontion_list1">
                        <div className="donation_name1">지역기부</div>
                        <div className="donation_name1_dl">지역기부소개<br />어쩌구저쩌구</div>
                        <div className="donation_name1_d2">
                            <div className="donation_name1_d2_1">지속가능한 미래위한 노력<br />사회적 약자의 권리증진<br />지역사회 인프라구축</div>
                            <div className="donation_name1_d2_2">기부 ㄳ합니다💕</div>
                        </div>
                        <Button onClick={openDonationModal}>기부하기</Button>
                    </div>
                </div>
            </div>

            {/* 모달 컴포넌트 */}
            {modalOpen && (
                <div className="donationmodal">
                    <div className="donationmodal-content">
                        <span className="donationclose" onClick={closeDonationModal}>
                            &times;
                        </span>
                        <h2>기부 정보 입력</h2>
                        <div className="donationmodal-body">
                            <p>
                                친구들과 함께 좋은 일에 동참해 주셔서 감사합니다.<br />
                                여러분의 기부 금액은 어려운 이웃의 더 나은 삶을 위해 사용될 것입니다.
                            </p>
                            <label>기부 금액:</label>
                            <input
                                type="number"
                                value={donationAmount}
                                onChange={(e) => setDonationAmount(e.target.value)}
                                required
                                placeholder="금액을 입력해 주세요"
                                min="0"
                            />
                            <div className="donationpayment-options">
                                <h3>결제 방법</h3>
                                <div className="option">
                                    <input type="radio" id="credit-card" name="payment" value="신용카드" checked={paymentMethod === "신용카드"} onChange={(e) => handlePaymentMethodChange(e.target.value)} />
                                    <label htmlFor="credit-card">신용카드</label>
                                </div>
                                <div className="option">
                                    <input type="radio" id="mobile" name="payment" value="휴대폰결제" checked={paymentMethod === "휴대폰결제"} onChange={(e) => handlePaymentMethodChange(e.target.value)} />
                                    <label htmlFor="mobile">카카오페이</label>
                                </div>
                                <div className="option">
                                    <input type="radio" id="mobile" name="payment" value="휴대폰결제" checked={paymentMethod === "휴대폰결제"} onChange={(e) => handlePaymentMethodChange(e.target.value)} />
                                    <label htmlFor="mobile">네이버페이</label>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <Button type="submit" onClick={handleDonate}>결제하기</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}