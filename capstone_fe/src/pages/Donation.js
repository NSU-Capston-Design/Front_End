import React from "react";
import { useEffect, useState } from 'react';
import Header from "../component/Header";
import "../css/Donation.css"
import Button from "../component/Button";
export default function Donation() {

    return (
        <div className="donation_all">
            <div className="don_all">
                <Header />

                <div className="donation" >
                    <div className="donation_txt">기부</div>
                    <div className="donation_txt_detail">Donation 寄附 寄付 пожертвование</div>
                </div>

                <div className="donation_list">



                    <div className="dontion_list1"> {/* 기부리스트2 */}
                        <div className="donation_name1">지역기부</div>
                        <div className="donation_name1_dl">지역기부소개<br />어쩌구저쩌구</div>
                        <div className="donation_name1_d2"> {/*상세설명*/}
                            <div className="donation_name1_d2_1">지속가능한 미래위한 노력<br />사회적 약자의 권리증진<br />지역사회 인프라구축</div>
                            <div className="donation_name1_d2_2">기부 ㄳ합니다💕</div>
                        </div>
                        <Button>기부하기</Button>{/* 결제창으로 넘어가게*/}
                    </div>



                </div>

            </div>
        </div>
    )
}