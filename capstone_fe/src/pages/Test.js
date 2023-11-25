import React from "react";
import { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom'

import Header from "../component/Header";

export default function Test(){
    const [checkEmail, setCheckEmail] = useState();
    const navigate = useNavigate() 

    const check = (e) => {
        setCheckEmail(e.target.value);
       
    }

    const Submit = e => {

        axios({
            method: 'post',
            url: '//localhost:8080/member/email-check',
            data: { email: checkEmail }
        }).then(res=>{
            console.log(res.data)
            alert('회원가입 완료!')
            navigate('/')
        }) .catch(error => {
            console.log(error)})
        
        }
    
    return(
        <>
            <Header/>
            <input type="text" id="memberEmail" onChange={check}></input>
            <input type="submit" id="submit" onClick={Submit} value={'테스트'}></input>
        </>
    )

}