import React, { useState } from "react";
import Header from "../component/Header";
import "../css/Inquiry.css";

export default function Inquiry() {
    // 각 문의 항목에 대한 상태를 관리합니다.
    const [inquiryVisible1, setInquiryVisible1] = useState(false);
    const [inquiryVisible2, setInquiryVisible2] = useState(false);

    const toggleInquiry1 = () => {
        // 첫 번째 문의 항목의 가시성을 토글합니다.
        setInquiryVisible1(!inquiryVisible1);
        // 두 번째 문의 항목의 가시성을 false로 설정합니다.
        setInquiryVisible2(false);
    };

    const toggleInquiry2 = () => {
        // 두 번째 문의 항목의 가시성을 토글합니다.
        setInquiryVisible2(!inquiryVisible2);
        // 첫 번째 문의 항목의 가시성을 false로 설정합니다.
        setInquiryVisible1(false);
    };

    return (
        <div className="inquiry_all">
            <div className="inq_all">
                <Header />

                    <div className="inquiry_txt">문의하기</div>
                    <div className="inquiry_txt2">자주 묻는 질문</div>

                <div className="inquiry_list">
                    {/* 첫 번째 문의 항목 */}
                    <div className="inquiry_btn_wrapper">
                        <div className="inquiry_btn1" onClick={toggleInquiry1}>
                            <span>Q.</span> &nbsp;
                            {inquiryVisible1 ? ' 타인/법인 명의의 휴대폰을 사용하고 있는데 환불을 받고 싶어요.' : ' 타인/법인 명의의 휴대폰을 사용하고 있는데 환불을 받고 싶어요.'}
                        </div>
                        {inquiryVisible1 && (
                            <div className="inquiry_content1">
                                A. 주문한 상품의 배송이 완료된 후 반품 희망 시 쇼핑하기 서비스 내에서 직접 반품 요청을 할 수 있습니다.
                            </div>
                        )}
                    </div>

                    {/* 두 번째 문의 항목 */}
                    <div className="inquiry_btn_wrapper">
                        <div className="inquiry_btn1" onClick={toggleInquiry2}>
                            <span>Q.</span> &nbsp;
                            {inquiryVisible2 ? ' 타인/법인 명의의 휴대폰을 사용하고 있는데 환불을 받고 싶어요.' : ' 타인/법인 명의의 휴대폰을 사용하고 있는데 환불을 받고 싶어요.'}
                        </div>
                        {inquiryVisible2 && (
                            <div className="inquiry_content2">
                                <p>A. 쇼핑하기에서는 안전한 거래를 위하여 취소된 주문의 결제 수단으로 환불이 어려운 경우 카카오계정에 인증된 휴대폰번호를 통해 본인으로 인증/확인된 분의 계좌로 환불을 진행하고 있습니다.</p>

                                <p>다만, 현재 타인/법인 명의의 휴대폰을 사용하고 있어 본인 인증/확인이 어렵거나 가족(2촌 이내) 명의의 계좌로 환불을 원하시는 경우엔 예외적으로 고객센터에서 관련 서류를 확인한 뒤 환불 절차를 진행합니다.</p>


                                <p>※ 반드시 고객센터를 통해 정확한 서류를 안내 받은 뒤 필요한 서류를 준비해 주세요.</p>

                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
