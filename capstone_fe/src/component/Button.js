import React from "react";
import "../css/Button.css";


//컴포넌트 정의
//props로 버튼 스타일, 상태, 색상 등 설정가능
export const Button = ({
    tEXT = true, //텍스트 표시 여부
    text = "구매", //버튼 표시할 텍스트
    clolor = "primary", // 기본 색상을 'primary'로 설정
    textColor = "black", // 기본 글자 색상을 검정색으로 설정
    outlineColor = "black", // 기본 아웃라인 색상을 검정색으로 설정
}) => {
    return (
        <button
            className={`button ${clolor}`}
            style={{
                // CSS 변수 --color, --textColor, --outlineColor를 설정
                "--color": clolor,
                "--textColor": textColor, // CSS 변수 --textColor에 글자 색상을 설정
                "--outlineColor": outlineColor, // CSS 변수 --outlineColor에 아웃라인 색상을 설정
                width: 182, 
                height: 48, 
                paddingLeft: 16, 
                paddingRight: 16, 
                paddingTop: 8, 
                paddingBottom: 8, 
                borderRadius: 8, 
                justifyContent: 'center', 
                alignItems: 'center', 
                gap: 8, 
                display: 'inline-flex',
                
            }}
        >
            {tEXT && <div className="btn_text">{text}</div>}
        </button>
    );
};
/*function reducer(state, action) { 호버효과
    switch (action) {
        case "mouse_enter":
            return {
                ...state,
                state: "hover",
            };
        case "mouse_leave":
            return {
                ...state,
                state: "active",
            };

    }
    return state;
}*/

export default Button;