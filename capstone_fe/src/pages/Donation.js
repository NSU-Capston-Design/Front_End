import React, { useState } from "react";
import Header from "../component/Header";
import "../css/Donation.css";
import Button from "../component/Button";
import axios from 'axios';

export default function Donation() {
    const [donationAmount, setDonationAmount] = useState(0); // 기부 금액 상태
    const [modalOpen, setModalOpen] = useState(false); // 모달 열림 상태
    // const [paymentMethod, setPaymentMethod] = useState(""); // 결제 방식 상태
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [accountHolder, setAccountHolder] = useState('');
    const [bankName, setBankName] = useState('');

    // 기부하기 버튼 클릭 시 모달을 열도록 하는 함수
    const openDonationModal = () => {
        setModalOpen(true);
    };

    // 모달 닫기 버튼 클릭 시 모달을 닫도록 하는 함수
    const closeDonationModal = () => {
        setModalOpen(false);
        setDonationAmount(0); // 기부 금액 초기화
    };
    // const handlePaymentMethodChange = (method) => {
    //     setPaymentMethod(method);
    // };

    const handleDonate = async () => {

        if (donationAmount < 1000) {
            alert('천원 이상의 금액을 입력해주세요.');
            return;
        }
        // // if (!paymentMethod) {
        // //     alert("결제 방식을 선택해주세요.");
        // //     return;
        // }
        try {
            // 백엔드에 기부 정보를 전달하고 결제 처리
            const response = await axios.post('http://localhost:8080/donate', {
                userId: window.localStorage.getItem('userId'),
                amount: donationAmount
            });
        
            console.log('기부 성공:', response.data);
            // 모달을 닫습니다.
            closeDonationModal();
            
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
            {    modalOpen && (
      <div className="donationmodal">
        <div className="donationmodal-content">
          <span className="donationclose" onClick={closeDonationModal}>
            &times;
          </span>
          <h2>기부 정보 입력</h2>
          <div className="donationmodal-body">
            <div>
              <label htmlFor="name">성명</label>
              <input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
              <label htmlFor="email">이메일</label>
              <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <label htmlFor="phone">연락처</label>
              <input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
            <div>
              <label htmlFor="donationAmount">기부 금액:</label>
              <input
                id="donationAmount"
                type="number"
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
                required
                placeholder="금액을 입력해 주세요"
                min="0"
              />
            </div>
            <div>
              <label htmlFor="paymentMethod">결제 방식:</label>
              <select
                id="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="">결제 방식을 선택해주세요</option>
                <option value="credit">신용카드</option>
                <option value="bank_transfer">계좌 이체</option>
              </select>
            </div>
            {paymentMethod === 'bank_transfer' && (
              <div>
                <label htmlFor="accountNumber">계좌번호:</label>
                <input
                  id="accountNumber"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  required
                />
                <label htmlFor="accountHolder">예금주:</label>
                <input
                  id="accountHolder"
                  value={accountHolder}
                  onChange={(e) => setAccountHolder(e.target.value)}
                  required
                />
                <label htmlFor="bankName">은행명:</label>
                <input
                  id="bankName"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  required
                />
              </div>
            )}
            <p>
              함께 좋은 일에 동참해 주셔서 감사합니다.<br />
              여러분의 기부 금액은 어려운 이웃의 더 나은 삶을 위해 사용될 것입니다.
            </p>
          </div>
          <div className="modal-footer">
            <button onClick={handleDonate}>기부하기</button>
          </div>
        </div>
      </div>
            )}
        </div>
    );
}