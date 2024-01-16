import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import "../css/Product.css";
import Header from "../component/Header";

export default function Product(){
    const [list, setList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
    const productList = async () =>{    // 비동기로 받아오기
        try{
            const response = await axios.get(`//localhost:8080/product/list`);    // get 내부에 url 넣기 
            const data = response.data;                 // 받아온 데이터 data에 저장    

            if (Array.isArray(data)) {
            setList(data); // 받아온 데이터가 배열이라면 list 상태 업데이트
            } else {
            console.error('배열이 아닌 데이터입니다:', data);
            }
               // 데이터 확인
            setList(data);              // list에 데이터 저장

            const extractedData = data.map((item) => ({ // 받아온 데이터들을 map을 사용해 관여
                // 받아온 데이터들 넣기
                // ex) id : item.id 
                id: item.id,                        
                productTitle: item.productName,
                date: item.uploadTime, 
                price: item.productPrice,
                imgUrl: item.productURL
            }));
            
            console.log(extractedData); // 추출 데이터 확인
        } catch(error){
            console.error("에러", error);
        }
    };
    productList();  // 가져온 데이터 확인 절차
}, []);

const Moveto_ProductDetail = (e) =>{    // 상품 세부 페이지
    navigate(`/detail/{productId}`);    // 나중에 &{productId}로 변경 예정
};
const Moveto_ProductUpload = (e) => {
    navigate('/product/upload');
};
    return(
        <>
            <Header/>
            <div className="product-all">
                <div className="product-list">
                    {list.map((item) => (
                
                            <div key={item.id} className= "product-list-box" >  {/* 리스트 목록 */}
                            
                                <div className="product-list-image">
                                <img src={`http://localhost:8080${item.productURL.replace(/\s/g, "_")}`} alt="Product" style={{width: 250, height: 200}}/>    
                                </div>    {/* 상품 이미지 */}
                                <div className="product-list-title" title={item.productName} onClick={Moveto_ProductDetail}>{item.productName}</div> {/* 상품 타이틀 */} 
                                <div className="product-list-price" title={item.uploadTime} onClick={Moveto_ProductDetail}>{item.uploadTime}</div>     {/* 상품 가격 */}
                                <div className="product-list-review" title={item.productPrice} onClick={Moveto_ProductDetail}>{item.productPrice}</div>  {/* 상품 리뷰 */}
                            </ div >
                     ))

                    }
                </div>
                <span className="input-box">
                    <input type="button" className="movetoupload" onClick={Moveto_ProductUpload} value='상품 등록'/>
                </span>
            </div>
        </>
    )
}