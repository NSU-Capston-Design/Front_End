import React from "react";
import { useEffect, useState } from 'react';
import Header from "../component/Header";
import Donation from "../css/Donation.css"

export default function Donation(){

    return(
        <div className="all">
           <Header/>

           <div className="donation" >
            <div className="donation_txt">기부</div>
            <div className="donation_txt_detail">기부하시고자하는 단제를 선택하세요</div>
           </div>

           <div className="donation_list">

            <div className="dontion_list1" > {/* 기부리스트1 */}
             <div className="donation_name1">사랑의 열매</div>
             <div className="donation_name1_dl">각 지역에서 모금된 성금 은 해당 지역의 복지 사업에 사용하고 있습니다.<br/></div>
             <div className="donation_name1_d2">
              <div className="donation_name1_d2_1">지속가능한 미래위한 노력<br/>사회적 약자의 권리증진<br/>지역사회 인프라구축</div>
              <div className="donation_name1_d2_2">어쩌구저쩌구멘트넣고싶은데</div>
             </div>
             <div className="donate_btn"></div>{/* 버튼 */}
            </div> 

            <div className="dontion_list2"> {/* 기부리스트2 */}
             <div className="donation_name2">지역기부</div>
             <div className="donation_name2_dl">지역기부소개<br/>어쩌구저쩌구</div>
             <div className="donation_name2_d2"> {/*상세설명*/}
              <div className="donation_name2_d2_1">지속가능한 미래위한 노력<br/>사회적 약자의 권리증진<br/>지역사회 인프라구축</div>
              <div className="donation_name2_d2_2">어쩌구저쩌구멘트넣고싶은데</div>
             </div>
             {/* 버튼만드시긔 */}
            </div> 

            <div className="dontion_list3"> {/* 기부리스트3 */}
             <div className="donation_name3">NGO굿피플</div>
             <div className="donation_name3_dl">UN경제사회이사회로부터 <br/>특별지위를 승인받은 비영리단체</div>
             <div className="donation_name3_d2"> {/*상세설명*/}
              <div className="donation_name3_d2_1">국내외 빈곤퇴치<br/>의료사각지대 의료지원<br/>아동보호 및 후원</div>
              <div className="donation_name3_d2_2">어쩌구저쩌구멘트넣고싶은데</div>
             </div>
             {/* 버튼만드시긔 */}
            </div> 

           </div>
   
        </div>
        
    )
}