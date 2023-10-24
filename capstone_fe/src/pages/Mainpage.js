import React from "react";
import { useEffect, useState } from 'react';
import logo from '../img/logo.png';
import cart from '../img/cart.png';
import mypage from '../img/mypage.png';
import left_arrow from '../img/left_arrow.png';
import right_arrow from '../img/right_arrow.png';

export default function Mainpage(){

    return(
        <div className="all">  
            <div className="headerbar"> {/* 헤더바 */}
                <div className="logo_box">
                    <img src={logo}></img>    
                </div>    
                <div className="search">
                    <input type="search"></input>
                </div>
                <div className="sign">로그인 / 회원가입</div>
                <div className="icons"> {/* 장바구니, 계정 버튼*/}
                    <div className="cart">
                        <img src={cart}></img>
                        <span>장바구니</span>
                    </div>
                    <div className="mypage">
                        <img src={mypage}></img>
                        <span>마이페이지</span>
                    </div>
                </div>
            </div>
            <div className="categorybar">   {/* 카테고리바 */}
                <div className="category">  
                    <div className="tab"></div>
                    <ul>
                        <li>전체메뉴</li>
                        <li>카테고리1</li>
                        <li>카테고리2</li>
                        <li>카테고리3</li>
                        <li>카테고리4</li>
                    </ul>
                    <div className="donate">    
                        <button className="donate_btn">기부하기</button>
                    </div>
                </div>
            </div>
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