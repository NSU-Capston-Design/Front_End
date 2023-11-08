import React from "react";
import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

import '../css/Header.css';
import logo from '../img/logo.png';
import cart from '../img/cart.png';
import mypage from '../img/mypage.png';
import menu from '../img/menu_bar.png';

export default function Header(){

    const navigate = useNavigate()  // 이동 라이브러리 저장

    const MovetoRegister = e => {   // 회원가입 페이지로 이동
        navigate('/register')       // 페이지 내부 주소
        navigate('/donation')
    }
    

    return(
        <div className="header-all">  
            <header> {/* 헤더바 */}
                <div className="logo_box">
                    <img src={logo}></img>    
                </div>    
                <div className="search">
                    <input type="search" size={50}></input>
                </div>
                <div className="sign" onClick={MovetoRegister}>로그인 / 회원가입</div>
                <div className="icons"> {/* 장바구니, 계정 버튼*/}
                    <div className="cart">
                        <img src={cart}></img>
                        <span>장바구니</span>
                    </div>
                    <div className="mypage">
                        <img src={mypage}></img>
                        <span>&nbsp;마이페이지</span>
                    </div>
                </div>
            </header>
            <div className="categorybar">   {/* 카테고리바 */}
                <div className="category">  
                    <div className="tab"></div>
                    <ul>
                        <li className="all-menu"><img src={menu}></img><span>전체메뉴</span></li>
                        <li>카테고리1</li>
                        <li>카테고리2</li>
                        <li>카테고리3</li>
                        <li>카테고리4</li>
                    </ul>
                    <div className="donate" onClick={MovetoRegister}>    
                        <button className="donate_btn">기부하기</button>
                    </div>
                </div>
            </div>
        </div>
    )
}