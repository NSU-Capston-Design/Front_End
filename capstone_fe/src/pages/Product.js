import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import "../css/Product.css";
import Header from "../component/Header";

export default function Product(){
    const [list, setList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
    const productList = async () =>{    // axios의 비동기 특성 막기, 
        //
        try{
            const response = await axios.get(`//localhost:8080/product/list`);    // await: 데이터를 가져오고나서부터 다음줄 실행get 내부에 url 넣기 
            const data = response.data;                 // 받아온 데이터 data에 저장    
            console.log(data);
            
            if (Array.isArray(data)) {
            setList(data); // 받아온 데이터가 배열이라면 list 상태 업데이트
            } else {
            console.error('배열이 아닌 데이터입니다:', data);
            }

        } catch(error){
            console.error("에러", error);
        }
    };
    productList();  // 초기 데이터 가져오기
    console.log(list);
}, []);

const Moveto_ProductUpload = (e) => {
    navigate('/product/upload');
};
    return(
        <>
            <Header/>
            <div className="product-all">
                <div className="product-list">
                    {list.map((item) => (
                
                            <div key={item.productId} className= "product-list-box" >  {/* 리스트 목록 */}
                            
                                <div className="product-list-image">
                                    <img src={`http://localhost:8080${item.productURL.replace(/\s/g, "_")}`} alt="Product" style={{width: 250, height: 200}}/>    
                                </div>    {/* 상품 이미지 */}
                                <div key={item.productId} className="product-list-title" title={item.productName}><Link to ={`/product/detail/${item.fileId}`}>상품명: {item.productName}</Link></div> {/* 상품 타이틀 */} 
                                <div className="product-list-price" title={item.uploadTime}>업로드: {item.uploadTime}</div>     {/* 업로드 시간 */}
                                <div className="product-list-footer">
                                    <div className="product-list-fbox" title={item.productPrice}>가격: {item.productPrice}원</div>  {/* 상품 가격 */}
                                    <div className="product-list-fbox" title={item.productInven}>재고수량: {item.productInven}</div>
                                </div>
                                <div className="product-list-footer">
                                    <div className="product-list-fbox" title={item.userName}>판매자: {item.userName}</div>
                                    <div className="product-list-fbox" title={item.productView}>조회수: {item.productView}</div>
                                </div>
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