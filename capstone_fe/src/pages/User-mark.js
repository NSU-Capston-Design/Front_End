import React, { useState, useEffect } from "react";
import axios from 'axios';
import "../css/User-mark.css";
export default function UserMark({ username, rank }) {
    const [isDonator, setIsDonator] = useState(false);
    const [isTopDonator, setIsTopDonator] = useState(false);

    useEffect(() => {
        // 서버에서 기부자 여부 확인
        axios.get("/donations/checktrue")
            .then(response => {
                const data = response.data;
                setIsDonator(data);
            })
            .catch(error => {
                console.error('기부자 여부 확인 중 에러 발생:', error);
            });

        // 서버에서 상위 10위 기부자 여부 확인
        axios.get("/donations/top")
            .then(response => {
                const data = response.data;
                setIsTopDonator(data.topDonators.includes(username));
            })
            .catch(error => {
                console.error('상위 10위 기부자 여부 확인 중 에러 발생:', error);
            });
    }, [username]);

    let mark = null;

    if (isDonator) {
        mark = <span role="img" aria-label="Donator">☘️</span>;
    } else if (isTopDonator) {
        mark = <span role="img" aria-label="Top 10">🍀</span>;
    } else if (rank === '1위') {
        mark = <span role="img" aria-label="1st">💗</span>;
    } else {
        mark = null; // 모든 조건에 해당하지 않는 경우, mark를 null로 설정합니다.
    }

    return (
        <div className="mark">
            {mark}
            <span>👁️👄👁️</span>
        </div>
    );
}