import React from "react";
import { useEffect, useState } from 'react';
import axios from "axios";

import Header from "../component/Header";
import left_arrow from '../img/left_arrow.png';
import right_arrow from '../img/right_arrow.png';

export default function Mainpage(){

    const [list, setList] = useState([]);
    const [eventList, setEventList] = useState([]);

    useEffect(() => {
        const main = async () =>{ 
            try{
            const response = await axios.get(`//localhost:8080`);    // get 내부에 url 넣기 
            const data = response.data;                 // 받아온 데이터 data에 저장    
            console.log(data);                  // 데이터 확인
            setList(data);              // list에 데이터 저장

            const extractedData = data.map((item) => ({ // 받아온 데이터들을 map을 사용해 관여
                // 받아온 데이터들 넣기
                // 이미지, 상품명, 가격, 상품id, 분류, 리뷰 점수 가져와야 함. (3개만, 백엔드에서 처리해줘야 함)
            }));
            console.log(extractedData); // 추출 데이터 확인
            
        } catch(error){
            console.error("에러", error);
        }
    };
    setList(); 
    }, [])
    
    useEffect(() => {
        const event = async () =>{ 
            try{
            const response = await axios.get(`//localhost:8080`);    // get 내부에 url 넣기 
            const data = response.data;                 // 받아온 데이터 data에 저장    
            console.log(data);                  // 데이터 확인
            setEventList(data);              // list에 데이터 저장

            const extractedData = data.map((item) => ({ // 받아온 데이터들을 map을 사용해 관여
                // 받아온 데이터들 넣기
                // 이벤트 가져오기
            }));
            console.log(extractedData); // 추출 데이터 확인
            
        } catch(error){
            console.error("에러", error);
        }
    };
    setEventList(); 
    }, [])
    return(

        <div className="all">
            <Header/>  
            
            <div className="content">   {/* 추천상품, 이벤트(컨텐츠칸) */}
                <div className="best">  
                    <div className="best_text">장성군몰 베스트 상품!</div>  {/* 베스트 상품 목록 */}

                    <div className="best_product">
                        <div className="best_image"></div>
                        <div className="best_review"></div>
                        <div className="best_title"></div>
                    </div>
                    {/* {list.map((item) => (<div key={item.productId} className="best_product">              
                        <div className="best_image">{item.image}</div>
                        <div className="best_review">{item.review}</div>
                        <div className="best_title">{item.title}</div>
                        <ul>
                            <div className="best_product_label">{item.label}</div>
                            <div className="best_product_label">{item.label}</div>
                            <div className="best_product_label">{item.label}</div>
                        </ul>
                    </div>
                    ))
                    } */}
                    
                </div>
                <div className="event_box">
                    <div className="event_text">이달의 이벤트 !</div>
                    <div className="event_contents">
                        <div className="left_arrow">
                            <img src={left_arrow}></img>
                        </div>
                                {/* 이벤트 목록 */}
                        {/* {eventList.map((item) => (
                        <div key={item.eventId} className="events">    
                            <div className="event">{item.event}</div>
                            <div className="event">{item.event}</div>
                            <div className="event">{item.event}</div>
                        </div>
                        ))} */}
                        <div className="right_arrow">
                            <img src={right_arrow}></img>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer"></div>  
        </div>
    )
}