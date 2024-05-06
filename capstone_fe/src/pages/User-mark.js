import React, { useState, useEffect } from "react";
import axios from 'axios';
import "../css/User-mark.css";
import {Top10} from "../component/Top10.js";

export default function UserMark({ username }) {
    const [isDonator, setIsDonator] = useState(false);
    const [users, setUsers] = useState([]);
    const [check, setCheck] = useState(false);

    useEffect(() => {
        console.log(username);
        // 서버에서 기부자 여부 확인
        const callAxios = async () => {
            await axios.get("http://localhost:8080/donations/check",{
                params:{
                    userId : username
                }
            })
            .then(response => {
                const data = response.data;
                setIsDonator(data);
            })
            .catch(error => {
                console.error('기부자 여부 확인 중 에러 발생:', error);
            });

        // 서버에서 상위 10위 기부자 여부 확인
        const top10 = async () => {
            try{
                const res = await axios.get("http://localhost:8080/donations/top");
                console.log(res.data);
                setUsers(res.data);
                // setUsers(JSON.stringify(res.data));
                console.log(users);
                window.localStorage.setItem('top10', users);
                // setUsers(JSON.parse(window.localStorage.getItem('top10')));
                // console.log(users[0]);
            } catch (e){
                console.error(e);
            }
        };
        
            top10();
        }

        callAxios();

        const top10Check = () => {
            for(let i = 0; i < 10; i++){
                if(users[i] === username){
                    setCheck(true);
                } 
                setCheck(false);
            }
        }

        top10Check();

    }, [username]);

    

    let mark = null;
 
    if (users[0] === username) {
        mark = <span role="img" aria-label="1st">💗</span>;
    } else if (check) {
        mark = <span role="img" aria-label="Top 10">🍀</span>;
    } else if (isDonator) {
        mark = <span role="img" aria-label="Donator">☘️</span>;
    } else {
        mark = null; // 모든 조건에 해당하지 않는 경우, mark를 null로 설정합니다.
    }

    return (
        <div className="mark">
            <span>{mark}</span>
            {/* 👁️👄👁️ */}
        </div>
    );
}