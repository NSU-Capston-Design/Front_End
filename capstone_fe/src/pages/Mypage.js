import React, { useState } from "react";
import Header from "../component/Header";
import "../css/Mypage.css";
import direction_SwitchImage from '../img/direction_switch.png';
import logoImage from '../img/logo.png';
import warningImage from '../img/warning.png';

export default function Mypage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessMessageOpen, setIsSuccessMessageOpen] = useState(false);
  const [isWithdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [isWithdrawSuccessMessageOpen, setIsWithdrawSuccessMessageOpen] = useState(false);
  const [isEditSuccessMessageOpen, setIsEditSuccessMessageOpen] = useState(false);

  const handleCloseWithdrawSuccessMessage = () => {
    setIsWithdrawSuccessMessageOpen(false);
  };


  
  const initialFormData = {
    name: "",
    username: "",
    password: "",
    passwordConfirm: "",
    zipCode: "",
    refundAccount: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleEditButtonClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleCloseEditSuccessMessage = () => {
    setIsEditSuccessMessageOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  
  const handleSaveButtonClick = () => {
    console.log("저장 버튼이 클릭되었습니다.");
    console.log("수정된 정보:", formData);
    setIsModalOpen(false);
    setIsSuccessMessageOpen(true); // 수정 완료 메시지 띄우기
    resetForm(); // 저장 후에 상태 초기화
  };

  const handleCloseSuccessMessage = () => {
    setIsSuccessMessageOpen(false);
  };

  const handleWithdrawButtonClick = () => {
    setWithdrawModalOpen(true);
  };

  const handleWithdrawCancel = () => {
    setWithdrawModalOpen(false);
  };

  const handleWithdrawConfirm = () => {
    // 실제 탈퇴 처리 로직을 여기에 추가해야 합니다.
    // 탈퇴가 성공하면 모달을 닫거나 다른 처리를 수행할 수 있습니다.
    // 이 부분에서는 탈퇴 완료 메시지 모달을 열도록 변경합니다.
    // 여기서는 단순히 메시지를 출력하도록 했습니다.
    setWithdrawModalOpen(false);
    alert("회원 탈퇴가 완료되었습니다.");
  };


  const resetForm = () => {
    setFormData(initialFormData);
  };

  return (
    <>
      <Header/>
      <div className="mypage_all">
        

        <div className="mypage_list1">
          <div className="mypage_image1">
            <img src={logoImage} alt="버튼" />
          </div>
          <div className="mypage_name1">엄 준식</div>
          <div className="mypage_name1_dl">
            <button className="mypage_edit_button" onClick={handleEditButtonClick}>
              회원정보 수정
            </button>
          </div>
        </div>

        {isModalOpen && (
  <div className="edit-modal" style={{ zIndex: 9999 }}>
    <div className="modal-content" style={{ width: 1700, height: 850 }}>
      <div style={{ fontWeight: 'bold', fontSize: 24, marginBottom: 20 }}>정보 수정</div>
      <form>
        <div>
          <label>이름</label>
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="이름을 입력하세요." />
        </div>

        <div>
          <label>아이디</label>
          <input type="text" name="username" value={formData.username} onChange={handleInputChange} placeholder="아이디를 입력하세요." />
        </div>

        <div>
          <label>비밀번호</label>
          <input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="비밀번호를 입력하세요." />
        </div>

        <div>
          <label>비밀번호 확인</label>
          <input type="password" name="passwordConfirm" value={formData.passwordConfirm} onChange={handleInputChange} placeholder="비밀번호를 다시 입력하세요."/>
        </div>

        <div className="postal-code">
          <label>우편번호</label>
          <input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleInputChange}
            placeholder="우편번호를 입력하세요."
          />
          <button type="button">검색</button>
        </div>

        <div className="address">
          <label>주소</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="주소를 입력하세요."
          />
          <label>상세주소</label>
          <input
            type="text"
            name="detailAddress"
            value={formData.detailAddress}
            onChange={handleInputChange}
            placeholder="상세주소를 입력하세요."
          />
        </div>

        <div className="contact-info">
          <label>이메일</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="이메일을 입력하세요."
          />
          <label>휴대폰</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="휴대폰 번호를 입력하세요."
          />
        </div>

        <div>
          <label>환불계좌</label>
          <input
            type="text"
            name="refundAccount"
            value={formData.refundAccount}
            onChange={handleInputChange}
            placeholder="환불계좌를 입력하세요."
          />
        </div>
      </form>
      <div style={{ marginTop: 20 }}>
        <button type="button" onClick={handleSaveButtonClick}>
          저장
        </button>
        <button type="button" onClick={() => { handleEditButtonClick(); resetForm(); }}>
          취소
        </button>
      </div>
    </div>
  </div>
)}

{isSuccessMessageOpen && (
  <div className="your-updated-class-name" style={{ zIndex: 9 }}>
    <div className="modal-content" style={{ width: 500, height: 200 }}>
      <div style={{ fontWeight: 'bold', fontSize: 24, marginBottom: 20 }}>
        회원 정보 수정이 완료되었습니다.
      </div>
      <button type="button" onClick={handleCloseSuccessMessage}>
        X
      </button>
    </div>
  </div>
)}

{isWithdrawModalOpen && (
  <div className="withdraw-modal" style={{ zIndex: 9999 }}>
    <div className="modal-content" style={{ width: 500, height: 560, textAlign: 'center' }}>
      <div style={{ fontWeight: 'bold', fontSize: 24, marginBottom: 20 }}>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;정말 탈퇴하시겠습니까?
      </div>
      <img src={warningImage} alt="warning" style={{ width: 300, height: 300, marginBottom: 20, marginLeft: 'auto', marginRight: 'auto' }} />
      <p style={{ marginBottom: 20, color: 'red' }}>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;아래에 회원님의 모든 정보가 삭제되고 <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;공백 사이트를 더 이상 이용할 수 없게 됩니다.
      </p>
      <button type="button" onClick={handleWithdrawCancel}>
        아니오
      </button>
      <button type="button" onClick={handleWithdrawConfirm}>
        탈퇴하기
      </button>
    </div>
  </div>
)}

{isWithdrawSuccessMessageOpen && isWithdrawModalOpen && (
  <div className="modal" style={{ zIndex: 9999 }}>
    <div className="modal-content" style={{ width: 500, height: 200, textAlign: 'center' }}>
      <div style={{ fontWeight: 'bold', fontSize: 24, marginBottom: 20, color: 'black' }}>
        회원 탈퇴가 완료되었습니다.
      </div>
      <button type="button" onClick={handleCloseWithdrawSuccessMessage}>
        확인
      </button>
    </div>
  </div>
)}

        <div className="mypage_list2">
          <div className="mypage_name2">주문조회</div>
          <div className="mypage_name2_dl">0건<br /></div>
          <div className="mypage_name2_d2">
          </div>
        </div>

        <div className="mypage_list3">
          <div className="mypage_name3">포인트</div>
          <div className="mypage_name3_dl">0p<br /></div>
          <div className="mypage_name3_d2">
          </div>
        </div>

        <div className="mypage_list4">
          <div className="mypage_name4"><strong>기부내역</strong></div>
          <div className="mypage_name4_dl">0원</div>
          <div className="mypage_image4"><img src={direction_SwitchImage} alt="버튼" /></div>
        </div>

        <div className="mypage_list5"></div>
        <div className="mypage_list5">
          <div className="mypage_image5"></div>
          <button className="mypage_inquiry_button">문의하기</button>
        </div>

        <div className="mypage_list6">
          <div className="mypage_image6"></div>
          <button className="mypage_withdraw_button" onClick={handleWithdrawButtonClick}>
            회원탈퇴
          </button>
        </div>
      </div>
    </>
  );
}
