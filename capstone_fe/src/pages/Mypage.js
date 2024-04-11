import React, { useState, useEffect } from "react"; // useEffect 추가
import Header from "../component/Header";
import "../css/Mypage.css";
import direction_SwitchImage from '../img/direction_switch.png';
import logoImage from '../img/logo.png';
import warningImage from '../img/warning.png';
import { useNavigate } from "react-router-dom";
import axios from 'axios';


export default function Mypage() {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessMessageOpen, setIsSuccessMessageOpen] = useState(false);
  const [isWithdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [isWithdrawSuccessMessageOpen, setIsWithdrawSuccessMessageOpen] = useState(false);
  const [isEditSuccessMessageOpen, setIsEditSuccessMessageOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState("");
  
  useEffect(() => {
    // 컴포넌트가 마운트될 때 백엔드에서 회원 정보 가져오기
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/user');
        if (response.status === 200) {
          setUserData(response.data); // 받아온 회원 정보를 상태에 저장
        }
      } catch (error) {
        console.error('회원 정보를 가져오는 중 오류 발생:', error);
      }
    };

    fetchUserData(); // 함수 호출
  }, []); // 마운트 시 한 번만 호출하도록 빈 배열 전달


  
  const navigate = useNavigate();
  
  const handleMoveToOrderInquiry = () => {
    navigate('/Order_inquiry'); // Order_inquiry 페이지로 이동
  };

  const handleCloseWithdrawSuccessMessage = () => {
    setIsWithdrawSuccessMessageOpen(false);
  };

  const handleDirectionSwitchClick = () => {
    // 이미지를 클릭하여 주문조회 페이지로 이동
    navigate('/Order_inquiry');
  };

  const handleMoveToDonationDetails = () => {
    navigate('/donation_details'); // Donation_details 페이지로 이동
  };

  const MovetoInquiry = () => {
    navigate('/inquiry');
  };
  
  const memberDTO = {
    userId: "", // 유저 ID
    userEmail: "", // 유저 이메일
    userPassword: "", // 유저 비밀번호
    userName: "", // 유저 이름
    userPhone: "", // 유저 전화번호
    userBirth: "", // 유저 생년월일
  };


  
  const [formData, setFormData] = useState(memberDTO);

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

  const handleWithdrawConfirm = async () => {
    try {
      const response = await fetch('http://localhost:8080/user/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        setWithdrawModalOpen(false);
        setIsWithdrawSuccessMessageOpen(true); // 회원 탈퇴 완료 메시지 모달 열기
      } else {
        throw new Error('회원 탈퇴 실패');
      }
    } catch (error) {
      console.error('회원 탈퇴 오류:', error);
    }
  };


  const resetForm = () => {
    setFormData(memberDTO);
  };

  return (
    <>
      <Header/>
      <div className="mypage_all">
        

      <div className="mypage_list1">
  <div className="mypage_image1">
    <img src={logoImage} alt="버튼" />
  </div>
  {/* userData가 존재하고 userId가 존재한다면 userId를 표시 */}
  <div className="mypage_name1">{userData && userData.userId}</div>
  <button className="mypage_edit_button" onClick={handleEditButtonClick}>
    회원정보 수정
  </button>
</div>

        {isModalOpen && (
  <div className="edit-modal" style={{ zIndex: 9999 }}>
    <div className="modal-content" style={{ width: 1700, height: 850 }}>
      <div style={{ fontWeight: 'bold', fontSize: 24, marginBottom: 20 }}>정보 수정</div>
      <form>
        <div>
          <label>ID</label>
          <input type="text" name="userId" value={formData.userId} onChange={handleInputChange} placeholder="아이디를 입력하세요." />
        </div>

        <div>
          <label>이메일</label>
          <input type="text" name="userEmail" value={formData.userEmail} onChange={handleInputChange} placeholder="이메일을 입력하세요." />
        </div>

        <div>
          <label>비밀번호</label>
          <input type="password" name="userPassword" value={formData.userPassword} onChange={handleInputChange} placeholder="비밀번호를 입력하세요." />
        </div>

        <div>
          <label>비밀번호 확인</label>
          <input type="password" name="userPasswordConfirm" value={formData.userPasswordConfirm} onChange={handleInputChange} placeholder="비밀번호를 다시 입력하세요."/>
        </div>

        <div>
          <label>이름</label>
          <input type="text" name="userName" value={formData.userName} onChange={handleInputChange} placeholder="이름을 입력하세요."/>
        </div>
        
        <div className="contact-info1">
          
          <label>휴대폰</label>
          <input
            type="text"
            name="userPhone"
            value={formData.userPhone}
            onChange={handleInputChange}
            placeholder="휴대폰 번호를 입력하세요."
          />
        </div>

        <div className="contact-info2">
          
          <label>생일</label>
          <input
            type="text"
            name="userBirth"
            value={formData.userBirth}
            onChange={handleInputChange}
            placeholder="생일을 입력하세요."
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
      <button type="button" onClick={() => {
        handleWithdrawConfirm(); // 탈퇴 확인 함수 호출
        setWithdrawModalOpen(false); // 탈퇴 모달 닫기
      }}>
        탈퇴하기
      </button>
    </div>
  </div>
)}

<div className="mypage_list2">
          <div className="mypage_name2">주문조회하기</div>
          <div className="mypage_image2">
            <img
              src={direction_SwitchImage}
              alt="버튼"
              onClick={handleDirectionSwitchClick}
            />
          </div>
        </div>

        {isWithdrawSuccessMessageOpen && (
  <div className="withdraw-success-message">
    <div className="message-content">
      <div style={{ fontWeight: 'bold', fontSize: 24, marginBottom: 20, color: 'black' }}>
        회원 탈퇴가 완료되었습니다.
      </div>
      <button type="button" onClick={handleCloseWithdrawSuccessMessage}>
        확인
      </button>
    </div>
  </div>
)}

        <div className="mypage_list4">
          <div className="mypage_name4"><strong>기부내역</strong></div>
          <div className="mypage_image4">
          <div className="button-container" onClick={handleMoveToDonationDetails}>
  <img src={direction_SwitchImage} alt="버튼" />
</div>
          </div>
          </div>

        <div className="mypage_list5">
        <div className="mypage_image5"></div>
        <button className="mypage_inquiry_button" onClick={MovetoInquiry}>
          문의하기
        </button>
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
