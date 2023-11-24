import React from "react";
import { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
//import {KakaoLogin} from 'react-kakao-login';

import kakao from "../img/kakao_login.png";
import Header from "../component/Header";
import "../css/Register.css";

export default function Register(){
    
    const rest_kakao_key = '7e346965896ae39355ed0fe5c0d086dd'    // api 키값
    const redirect_url = 'http://localhost:3000/register'    // redirect url
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${rest_kakao_key}&redirect_uri=${redirect_url}&response_type=code`

    const kakaoLogin = () =>{
        window.location.href = kakaoURL
    }
    // const Kakao = ({setUser}) => {
    //     const onSuccess = (res) => {
    //         setUser(res.profile);
    //     };

    //     const onFailure = (error) => {
    //         // 로그인 실패 시 처리할 로직
    //         console.error('카카오 로그인 실패', error);
    //     };
    // }

    const [userId, setUserId] = useState('')
    const [userPw, setUserPw] = useState('')
    const [userName, setUserName] = useState('')
    const [userEmail, setUserEamil] = useState('')
    const [userPhone, setUserPhone] = useState('')
    const [userBirth, setUserBirth] = useState('')
    // const [roles, setRoles] = useState([])
    const [btnBackcolor, setBtnBackcolor] = useState('gray')
    const userCheck = {}    // 유저 정보 체크

    //유효성 검사
    const [IdCheck, setIdCheck] = useState()
    const [userPwchk, setUserPwchk] = useState()
    const [pwchkchk, setPwchkchk] = useState()
    const [EmailCheck, setEmailCheck] = useState()
    const [PhoneCheck, setPhoneCheck] = useState()
    const [CheckJoin, setCheckJoin] = useState(false)
    const [fontcolor, setFontcolor] = useState('black')

    const [idmsgcolor, setIdMsgcolor] = useState('')
    const [pwmsgcolor, setPwmsgcolor] = useState('')
    const [pwchkmsgcolor, setPwchkmsgcolor] =useState('')
    const [emailmsgcolor, setEmailmsgColor] = useState('')
    const [phonemsgcolor, setPhonemsgColor] = useState('')

    const [Iderrmsg, setIderrmsg] = useState('')
    const [Pwerrmsg, setPwerrmsg] = useState('')
    const [pwchkmsg, setPwchkmsg] = useState('')
    const [emailmsg, setEmailmsg] = useState('')
    const [phonemsg, setPhonemsg] = useState('')

    // useEffect(()=>{
    //     setRoles([...roles, "USER"])
    // },[])

    const UserInfo = {} // 배열형식으로 받는 user정보
    const navigate = useNavigate()  // 페이지 이동 및 param(값)를 주고 받기 위함 

    const InputName = e => {    // 이름이 입력될 때, 
        setUserName(e.target.value) // state에 저장
    }
    const InputId = e => {      // id가 입력됐을 때,
        setUserId(e.target.value)   // state에 저장
    }
    const InputPw = e => {      // pw
        setUserPw(e.target.value)   // 저장
    }
    const InputPwchk = e => {   // pw 입력됐을 때,
        if(e.target.value === userPw){  // 첫번째 패스워드 칸에서 저장된 userPw(setUserPw로 userPw값 변환)와 같다면
            setPwchkmsg('설정하신 비밀번호와 같습니다.')
            setPwchkmsgcolor('#077912')
            setPwchkchk(true)   // 확인완료로 쓰이는 state에 true 저장
        }else{  // 아니라면
            setPwchkmsg('설정하신 비밀번호와 다릅니다.')
            setPwchkmsgcolor('red')
            setPwchkchk(false)  // 확인완료로 쓰이는 state에 false 저장
        }
    }
    useEffect(()=> {    // 이벤트 리스너를 통해 이벤트를 추가한다면, 이벤트 삭제가 필요함(cleanup 함수 사용)
        if(userId && userEmail && userBirth && userPhone && userPw && userPwchk && pwchkchk/*&& IdCheck  && EmailCheck && PhoneCheck*/){    // 모든게 입력(true)되었다면,
            setCheckJoin(true)  // 회원가입 버튼 활성화
            setBtnBackcolor('#077912')
            setFontcolor('white')
        } else{
            setCheckJoin(false) // 회원가입 버튼 비활성화
            setBtnBackcolor('gray')
            setFontcolor('black')
        }
    }, [userId, userEmail, userBirth, userName, userPhone, userPw, userPwchk, pwchkchk/*, IdCheck, EmailCheck, PhoneCheck*/])   // 이 값들이 변경될 때 마다 실행
    const InputEmail = e => {   // email
        setUserEamil(e.target.value)
    }
    const InputPhonenum = e => {    // 전화번호
        setUserPhone(e.target.value)
    }
    const InputBirth = e => {   // 생일
        setUserBirth(e.target.value)
    }
    const CheckId = e => {  // id 중복 확인 (axios를 통한 백과의 통신으로 점검)
        userCheck["userCheck"] = userId
        axios({
            method : 'post',    // (수정)
            url : '//localhost:8080',   // url
            data: userCheck
        })
        .then(res => {  // 받은 데이터는 res에 담김
            console.log(res.data.message)
            if(res.data.message !== 'FAIL'){
                setIderrmsg('사용 가능한 아이디입니다.')
                setIdCheck(true)
                setIdMsgcolor('#077912')
            } else{
                setIderrmsg('이미 사용중인 아이디입니다.')
                setIdMsgcolor('red')
                setIdCheck(false)   
            }
            // setIdCheck(res.data.idcheck)
        })
        .catch(err => {
            console.log(err)
            
            // setIdCheck()
        })
    }
    const CheckPw = e => {  // 비밀번호 유효성 검사
        if(e.target.value.length > 4 && e.target.value.length < 16){
            setPwerrmsg('올바른 비밀번호 형식입니다.')
            setUserPwchk(true)
            setPwmsgcolor('#077912')
        } else{
            setPwerrmsg('5자리 이상 15자리 이하로 입력해주세요')
            setPwmsgcolor('red')
            setUserPwchk(false)
        }
    }
    const CheckEmail = e => {   // 이메일 중복 검사
        userCheck["userCheck"] = userEmail
        axios({
            method : 'post',
            url : '//localhost:8080/user/userid-check',
            data: userCheck
        })
        .then(res => { 
            console.log(res.data)
            if(res.data.message !== 'FAIL'){
                setEmailmsg('사용 가능한 이메일입니다.')
                setEmailmsgColor('#077912')
                setEmailCheck(true)
            }else{
                setEmailmsg('이미 사용중인 이메일입니다.')
                setEmailmsgColor('red')
                setEmailCheck(false)
            }
            // setEmailCheck(res.data.idcheck)
        })
        .catch(err => {
            console.log(err)
            // setEmailCheck()
        })
    }
    const CheckPhone = e => {   // 폰 번호 중복 검사
        userCheck["userCheck"] = userPhone
        axios({
            method : 'post',
            url : '//localhost:8080',
            data : userCheck
        })
        .then(res => {
            console.log(res.data)
            if(res.data.message !== 'FAIL'){
                setPhonemsg('사용 가능한 번호입니다.')
                setPhonemsgColor('#077912')
                setPhoneCheck(true)
            } else{
                setPhonemsg('이미 사용중인 번호입니다.')
                setPhonemsgColor('red')
                setPhoneCheck(false)
            }
        })
        .catch(err => {
            console.log(err)    
        })
    }
    const JoinComplete = e => {
        e.preventDefault() // 이벤트가 처리되지 않을 경우 시행하지 않음.
        UserInfo['userId'] = userId
        UserInfo['userName'] = userName
        UserInfo['userPassword'] = userPw
        UserInfo['userEmail'] = userEmail
        UserInfo['userPhone'] = userPhone
        UserInfo['userBirth'] = userBirth
        // UserInfo['roles'] = roles
        console.log(UserInfo)

        axios({ // 가입시 적은 유저정보들을 전달
            method : 'post',
            url : '//localhost:8080/user/register',
            data : UserInfo
        }).then(res => {
            console.log(res.data)
            alert('회원가입 완료!')
            navigate('/login')
        })
          .catch(err => {
            console.log(err.data);
            alert("중복된 값입니다.");
        })
    }

    useEffect(()=>{ // id가 변할때 마다 실행
        if(IdCheck){   
        } else{
        }
    },[IdCheck])
    return(
        <div className="Register-all">
            <Header/>
            
            <div className="registeruser">
            <div className="registeruserinfobox-titlebox">
                    <h1 className="registeruserinfobox-titlebox__title">로고와 회원가입</h1>
                </div>
            <div className="registeruserinfobox">
                
                <div className="joinbox-countbox">
                    <h3 className="joinbox-countbox__countpage">회원 가입 정보</h3>
                </div>
                <form className="registeruserinfobox-joinform">
                    <div className="joinform-joinbody">
                        <div className="joinform-joinbody__joinbox">
                            <div>
                                <span className="starimg"></span>
                                <label className="joinform-joinbody__joinbox--label">성명</label>
                            </div>
                            <div className="joinform-joinbody__joinbox--box">
                                <input type='text' className="inputuserinfo joinform-joinbody__joinbox--userinforegister" placeholder="성함을 입력해주세요." onChange={InputName}/>
                            </div>
                        </div>
                        <div className="joinform-joinbody__totalbox">
                            <div className="joinform-joinbody__joinbox">
                                <label className="joinform-joinbody__joinbox--label">회원 아이디</label>
                                <div className="joinform-joinbody__joinbox--box">
                                    <input type='text' className="inputuserinfo joinform-joinbody__joinbox--userinfoId" placeholder="아이디를 입력하세요." onChange={InputId} onBlur={CheckId}/>
                                </div>
                            </div>
                            <small className="errmsg" style={{color : idmsgcolor}}>
                                    {Iderrmsg}
                            </small>
                        </div>
                        <div className="joinform-joinbody__totalbox">
                            <div className="joinform-joinbody__joinbox">
                                <label className="joinform-joinbody__joinbox--label">비밀번호</label>
                                <div className="joinform-joinbody__joinbox--box">
                                    <input type='password' className="inputuserinfo joinform-joinbody__joinbox--userinfoPw" placeholder="비밀번호를 입력하세요." onChange={InputPw} onBlur={CheckPw}/>
                                </div>
                            </div>
                            <small className="errmsg" style={{color : pwmsgcolor}}>
                                    {Pwerrmsg}
                            </small>
                        </div>
                        <div className="joinform-joinbody__totalbox">
                            <div className="joinform-joinbody__joinbox">
                                <label className="joinform-joinbody__joinbox--label">비밀번호 확인</label>
                                <div className="joinform-joinbody__joinbox--box">
                                    <input type='text' className="inputuserinfo joinform-joinbody__joinbox--userinfoPwchk" placeholder="비밀번호를 다시 입력해주세요." onBlur={InputPwchk}/>
                                </div>
                            </div>
                            <small className="errmsg" style={{color : pwchkmsgcolor}}>
                                    {pwchkmsg}
                            </small>
                        </div>
                        <div className="joinform-joinbody__totalbox">
                            <div className="joinform-joinbody__joinbox">
                                <label className="joinform-joinbody__joinbox--label">이메일</label>
                                <div className="joinform-joinbody__joinbox--box">
                                    <input type='email' className="inputuserinfo joinform-joinbody__joinbox--userinfoEmail" placeholder="이메일을 입력하세요." onChange={InputEmail} onBlur={CheckEmail}/>
                                </div>
                            </div>
                            <small className="errmsg" style={{color : emailmsgcolor}}>
                                    {emailmsg}
                            </small>
                        </div>
                        <div className="joinform-joinbody__totalbox">
                            <div className="joinform-joinbody__joinbox">
                                <label className="joinform-joinbody__joinbox--label">휴대폰</label>
                                <div className="joinform-joinbody__joinbox--box">
                                    <input type='text' className="inputuserinfo joinform-joinbody__joinbox--userinfoTel" placeholder="전화번호를 입력하세요." onChange={InputPhonenum} onBlur={CheckPhone}/>
                                </div>
                            </div>
                            <small className="errmsg" style={{color : phonemsgcolor}}>
                                    {phonemsg}
                            </small>
                        </div>
                        <div className="joinform-joinbody__joinbox">
                            <label className="joinform-joinbody__joinbox--label">생년월일</label>
                            <div className="joinform-joinbody__joinbox--box">
                                <input type='text' className="inputuserinfo joinform-joinbody__joinbox--userinfoDamdang" placeholder="생년월일 6자리를 입력해주세요(yymmdd)" onChange={InputBirth}/>  
                            </div>
                        </div>
                    </div>   
                    <input className="singupcompletebtn" type="submit" style={{backgroundColor : btnBackcolor, color : fontcolor}} value={'회원가입'} disabled={!CheckJoin} onClick={JoinComplete}/>
                </form>
            </div>
            <div className="kakao_login">
                
                    <img src={kakao} onClick={kakaoLogin} alt="카카오 로그인"></img>
                
            </div>
        </div>
    </div>
    )
}