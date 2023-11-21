import React from "react";
import { useEffect, useState } from 'react';

import Header from "../component/Header";
// import '../css/Mainpage.css';
// import logo from '../img/logo.png';
// import cart from '../img/cart.png';
// import mypage from '../img/mypage.png';
// import menu from '../img/menu_bar.png';
import left_arrow from '../img/left_arrow.png';
import right_arrow from '../img/right_arrow.png';

export default function Mainpage(){

    const [list, setList] = useState([]);
    
    return(
        <div className="all">
            <Header/>  
            
            <div className="content">   {/* 추천상품, 이벤트(컨텐츠칸) */}
                <div className="best">  
                    <div className="best_text">장성군몰 베스트 상품!</div>
                    <div className="product">               {/* 상품 이미지, 상세 파트 */}
                        <div className="best_image"></div>
                        <div className="best_detail"></div>
                    </div>
                    <div className="product">
                        <div className="best_image"></div>
                        <div className="best_detail"></div>
                    </div>
                    <div className="product">
                        <div className="best_image"></div>
                        <div className="best_detail"></div>
                    </div>
                </div>
                <div className="event_box">
                    <div className="event_text"></div>
                    <div className="event_btns">
                        <div className="left_arrow">
                            <img src={left_arrow}></img>
                        </div>
                        <div className="events">    {/* 이벤트들 넣는 곳 */}
                            <div className="event"></div>
                            <div className="event"></div>
                            <div className="event"></div>
                            {/* 이벤트들 넣기 */}
                        <div className="right_arrow">
                        </div>
                            <img src={right_arrow}></img>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer"></div>  {/* 하단바 */}
        </div>
    )
}