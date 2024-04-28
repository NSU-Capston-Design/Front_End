import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import "../css/Login.css";

import { setItemWithTime } from "../component/SetStorage";  // 스토리지 등록
import { getItemWithTime } from "../component/GetStorage";  // 스토리지 아이템 가져오기

import Header from "../component/Header";

export default function Login() {
    
    const [userId, setUserId] = useState('')    // id state
    const [userPw, setUserPw] = useState('')    // pw state
    const navigate = useNavigate();

    const MovetoFindId = e => { // 아이디 찾기
        navigate('/findid')
    }
    const InputId = e => {  // 아이디 입력시
        setUserId(e.target.value)
    }
    const InputPw = e => {  // 비밀번호 입력시
        setUserPw(e.target.value)
    }

    const Signin = e => {   // 로그인 
        e.preventDefault()
       
        const UserInfo = {}
        UserInfo['userId'] = userId // 입력받은 아이디를 userinfo의 userid에 넣기
        UserInfo['userPassword'] = userPw   // 입력받은 아이디를 userinfo의 password에 넣기
        axios({
            method : 'post',    // post방식으로 통신
            url : '//localhost:8080/user/login',    
            data : UserInfo,
            withCredentials: true
        })
        .then(res => {  // 가져온 데이터들 셋업
            console.log(res.data);
            setItemWithTime('memberId', res.data.memberId, 600000)          // 만료시간 10분
            setItemWithTime('userId', res.data.userId, 600000)
            // window.localStorage.setItem('memberId', res.data.memberId);     // PK값
            // window.localStorage.setItem('userId', res.data.userId);         // 사용자 Id

            console.log(res.data);
            navigate('/');
        })
        .catch(err => {
            console.log(err);
            alert('로그인 실패');
        })
    }
    return (
        <>
        <Header/>
        <div className="Loginpage">
            <div className="Loginpage-loginbox">
                <h1 className="Loginpage-loginbox__title">login</h1>
            </div>
            <div className="Loginpage-loginform">
                
                <div className="Loginpage-loginform__body">
                    <div className="Loginpage-loginform__body--box">
                        <h3 className="loginpage-loginform__idlabel">아이디</h3>
                        <div className="logininfobox">
                            <input type="text" className="loginuserinfo Loginpage-loginfrom__inputid" onChange={InputId}/>
                        </div>
                    </div>
                    <div className="Loginpage-loginform__body--box">
                        <h3 className="loginpage-loginform__pwlabel">비밀번호</h3>
                        <div className="logininfobox">
                            <input type="password" className="loginuserinfo Loginpage-loginfrom__inputpw" onChange={InputPw}/>
                        </div>
                    </div>
                </div>
                <input type="submit" className="signin-btn" onClick={Signin} value={'로그인'}/>
                <input type="button" className="findid-btn" onClick={MovetoFindId} value={'아이디 찾기'}/>
            </div>
        </div>
        </>
    )
}