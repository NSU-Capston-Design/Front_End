import React from "react";
import { useEffect, useState } from 'react';
import axios from "axios";

import {Top10} from "../component/Top10.js";

import "../css/Mainpage.css";
import Header from "../component/Header";
import left_arrow from '../img/left_arrow.png';
import right_arrow from '../img/right_arrow.png';
import item_img from '../img/item.png';
import { Link } from "react-router-dom";
import ProductDetail from "./ProductDetail";
import event1 from "../img/event1.jpg";

export default function Mainpage() {

    const [list, setList] = useState([]);
    const [users, setUsers] = useState([]);
    const [eventList, setEventList] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState(null);  // 선택된 제품의 ID를 추적
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handlePurchaseClick = (fileId) => {
        setSelectedProductId(fileId);
        setIsModalOpen(true);
    };

    const closeitemModal = ()=>{
        setIsModalOpen(false);
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
        
        const top10 = async () => {
            try{
                const res = await axios.get("http://localhost:8080/donations/top");
                console.log(res.data);
                setUsers(JSON.stringify(res.data));
                console.log(users);
                window.localStorage.setItem('top10', users);
                // setUsers(JSON.parse(window.localStorage.getItem('top10')));
                // console.log(users[0]);
            } catch (e){
                console.error(e);
            }
        };
        
        top10();
    }, [])

    return (
        <div className="mainpage-all">
            <Header />
            <div className="content">
                <div className="best">
                    <div className="best_text">
                        <span className="big-text">장성군몰</span> 베스트 상품!
                    </div>

                    <div className="best_product">
                        {list.map((item) => (
                            <div key={item.fileId} className="best_product_item" onClick={() => handlePurchaseClick(item.fileId)}>
                                <div className="best_image">
                                    <img src={`http://localhost:8080${item.productURL}`} alt="item" style={{ width: 330, height: 440 }} />
                                </div>
                                <p>
                                <div className="best_product_text">장성군 베스트 특산품</div>
                                
                                <div className="best_title">{item.productName}</div>
                                <div className="best_detail">
                                    <button onClick={() => handlePurchaseClick(item.fileId)}>구매하기</button>
                                </div>
                                </p>
                                <div className="best_uploadTime">{item.uploadTime}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="event_box">
                    <div className="event_text">이달의 이벤트 !</div>
                    <div className="event_contents">
                        <div className="left_arrow">
                            <img src={left_arrow} alt="left arrow" />
                        </div>

                        <Link to="/eventpage"> {/* 이벤트 이미지 클릭 시 이벤트 페이지로 이동 */}
                            <div className="event">
                                <img src={event1} alt="event1" />
                            </div>
                        </Link>

                        {eventList.map((item) => (
                            <div key={item.eventId} className="events">
                                <div className="event">{item.event}</div>
                                <div className="event">{item.event}</div>
                            </div>
                        ))}

                        <div className="right_arrow">
                            <img src={right_arrow} alt="right arrow" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer"></div>

            {isModalOpen && selectedProductId && (
                <div className="product-overlay">
                    <div className="product-modal">
                        <ProductDetail fileId={selectedProductId} closeModal={closeitemModal} />
                    </div>
                </div>
            )}
        </div>
    );
}