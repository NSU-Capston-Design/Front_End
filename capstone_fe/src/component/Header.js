import React from "react";
import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

import '../css/Header.css';
import logo from '../img/logo.png';
import cart from '../img/cart.png';
import mypage from '../img/mypage.png';
import menu from '../img/menu_bar.png';
import menu_black from '../img/menu_black.png';
import axios from "axios";

export default function Header() {
    const [sessionId, setSessionId] = useState(false);
    const [memberId, setMemberId] = useState("");
    const navigate = useNavigate()  // 이동 라이브러리 저장
    const [isLogined, setIsLogined] = useState(false);
    useEffect(() => {
        const stroageMemberId = window.localStorage.getItem('memberId');
        setMemberId(stroageMemberId || 0);
        const stroageSessionId = window.localStorage.getItem('sessionId');
        setSessionId(stroageSessionId);
        
        console.log(memberId);
        console.log(sessionId);
        if (sessionId) {
            setIsLogined(true);

        } else {
            setIsLogined(false);
        }

    }, [sessionId]);
    const MovetoMain = e => {   // 메인페이지로 이동
        navigate('/')
    }
    const MovetoLogin = e => {   // 로그인 페이지로 이동
        navigate('/login')       // 페이지 내부 주소
    }

    const MovetoRegister = e => {   // 회원가입 페이지로 이동
        navigate('/agreepage')       // 페이지 내부 주소
    }

    const MovetoDonation = e => {   // 기부 페이지로 이동
        navigate('/donation')       // 페이지 내부 주소
    }

    const MovetoMypage = e => {   // 마이 페이지로 이동
        navigate('/mypage')       // 페이지 내부 주소
    }

    const MovetoCart = e => {   // 장바구니로 이동
        navigate('/cart')       // 페이지 내부 주소
    }

    const MovetoInquiry = e => {   // 문의하기로 이동
        navigate('/inquiry')       // 페이지 내부 주소
    }

    const MovetoProduct = e => {
        navigate('/product')
    }

    const MovetoLogout = e => {
        setIsLogined(false);

        axios.post('//localhost:8080/user/logout', {}, {
            withCredentials: true   // 쿠키전송옵션
        })
            .then(response => {
                alert('로그아웃 성공');
                window.localStorage.clear();
                navigate('/');
            })
            .catch(error => {
                console.error('에러 발생: ', error);
            });

    }

    const MovetoCommu = e => {
        navigate('/don_commu');
    }

    return (
        <div className="header-all">
            <header> {/* 헤더 */}
                <div className="logo_box">
                    <img src={logo} onClick={MovetoMain}></img>
                </div>
                <div className="search">
                    <img src={menu_black}></img>
                    <div className="search-box">
                        <input type="search" size={50} placeholder="검색"></input>
                    </div>
                </div>


                {isLogined ?
                    <div className="sign"><div className="logout" onClick={MovetoLogout}>로그아웃</div></div> :

                    (<div className="sign"><div className="login" onClick={MovetoLogin}>로그인</div> / <div className="register" onClick={MovetoRegister}>회원가입</div></div>)}

                <div className="icons"> {/* 장바구니, 계정 버튼*/}

                    <div className="cart" onClick={MovetoCart}>
                        <img src={cart}></img>
                        <span>장바구니</span>
                    </div>
                    <div className="mypage" onClick={MovetoMypage} >
                        <img src={mypage}></img>
                        <span> &nbsp;마이페이지</span>
                    </div>

                </div>
            </header>
            <div className="categorybar">   {/* 카테고리바 */}
                <div className="category">
                    <div className="tab"></div>
                    <ul>
                        <li className="all-menu" onClick={MovetoProduct}><img src={menu} alt="menu"></img><span>전체메뉴</span></li>
                        <li>카테고리1</li>
                        <li>카테고리2</li>
                        <li>카테고리3</li>
                        <li>카테고리4</li>
                        <div className="donate">
                            <button className="donate_btn" onClick={MovetoDonation}>기부하기</button>
                        </div>

                        <div className="inquiry">
                            <button className="inquiry_btn" onClick={MovetoInquiry}>문의하기</button>
                        </div>
                        <div className="board" onClick={MovetoCommu}>

                            📝
                            <span>게시판</span>
                        </div>

                    </ul>

                </div>
            </div>
        </div>
    )
}