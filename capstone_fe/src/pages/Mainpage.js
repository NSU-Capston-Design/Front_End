import React from "react";
import { useEffect, useState } from 'react';
import axios from "axios";

import "../css/Mainpage.css";
import Header from "../component/Header";
import left_arrow from '../img/left_arrow.png';
import right_arrow from '../img/right_arrow.png';
import item_img from '../img/item.png';
import { Link } from "react-router-dom";
import ProductDetail from "./ProductDetail";

export default function Mainpage() {

    const [list, setList] = useState([]);
    const [eventList, setEventList] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState(null);  // 선택된 제품의 ID를 추적

    const handlePurchaseClick = (productId) => {
        setSelectedProductId(productId);
    };


    useEffect(() => {   //상품 인기순 정렬
        const main = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/`);    // get 내부에 url 넣기 
                const data = response.data;                 // 받아온 데이터 data에 저장    
                console.log(data);                  // 데이터 확인
                setList(data);              // list에 데이터 저장
                console.log(list);

            } catch (error) {
                console.error("에러", error);
            }
        };
        main();
        console.log(list);
    }, [])

    return (

        <div className="mainpage-all">
            <Header />

            <div className="content">   {/* 추천상품, 이벤트(컨텐츠칸) */}
                <div className="best">
                    <div className="best_text">
                        <span className="big-text">장성군몰</span> 베스트 상품! </div>  {/* 베스트 상품 목록 */}


                    {/* 베스트 상품 */}
                    <div className="best_product">
                        {list.map((item) => (

                            <div key={item.productId} className="best_product_item">
                                <div className="best_image"><img src={`http://localhost:8080${item.productURL}`} alt="item" style={{ width: 330, height: 440 }} /></div>
                                <div className="best_product_text">장성군 베스트 특산품</div><br />
                                <div className="best_title">{item.productName}</div>
                                <div className="best_detail"> <button onClick={handlePurchaseClick}>구매하기</button>
                                {selectedProductId === item.productId && <ProductDetail closeModal={() => setSelectedProductId(null)}  />}
                                {/* 선택된 제품ID와 현재 제품의 ID가 일치하면 상세 모달 표시*/}
                                </div>

                                <div className="best_uploadTime">{item.uploadTime}</div>
                            </div>
                        ))
                        }
                    </div>

                </div>

                {/* 이벤트 */}
                <div className="event_box">
                    <div className="event_text">이달의 이벤트 !</div>
                    <div className="event_contents">
                        <div className="left_arrow">
                            <img src={left_arrow} alt="left_arrow"></img>
                        </div>
                        {/* 이벤트 목록 */}
                        {eventList.map((item) => (
                            <div key={item.eventId} className="events">
                                <div className="event">{item.event}</div>
                                <div className="event">{item.event}</div>
                                <div className="event">{item.event}</div>
                            </div>
                        ))}
                        <div className="right_arrow">
                            <img src={right_arrow} alt="right arrow"></img>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer"></div>
        </div>
    )
}