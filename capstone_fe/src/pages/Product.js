import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import Header from "../component/Header";

export default function Product(){
    const [list, setList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
    const productList = async () =>{
        try{
            const response = await axios.get(`//localhost:8080`);    // get 내부에 url 넣기 
            const data = response.data;                 // 받아온 데이터 data에 저장    
            console.log(data);                  // 데이터 확인
            setList(data);              // list에 데이터 저장

            const extractedData = data.map((item) => ({ // 받아온 데이터들을 map을 사용해 관여
                // 받아온 데이터들 넣기
                // ex) id : item.id 
            }));
            console.log(extractedData); // 추출 데이터 확인
        } catch(error){
            console.error("에러", error);
        }
    };
    productList();  // 가져온 데이터 확인 절차
}, []);

const Moveto_ProductDetail = (e) =>{
    navigate('/detail');
}
    return(
        <>
            <Header/>
            <div className="product-all">
            {list.map((item) => (
                        <div key={item.userId} className= "product-list-box" >  {/* 리스트 목록 */}
                         
                            <div className="product-list-image">
                                <img src=""/>    
                            </div>    {/* 상품 이미지 */}
                            <div className="product-list-title" title={item.id} onClick={Moveto_ProductDetail}>{item.title}</div> {/* 상품 타이틀 */} 
                            <div className="MovetoNoticeDetail" title={item.id} onClick={Moveto_ProductDetail}>{item.price}</div>     {/* 상품 가격 */}
                            <div className="product-review" title={item.id} onClick={Moveto_ProductDetail}>{item.review}</div>  {/* 상품 리뷰 */}
                        </ div >
                    ))
                }
            </div>
        </>
    )
}