import React, { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../component/Header';
import "../css/ProductDetail.css";
import axios from 'axios';


export default function ProductDetail(){

    const { productId } = useParams();
    console.log(productId);
    const id = parseInt(productId, 10);
    const [productData, setProductData] = useState({
        productName: '',
        uploadTime: '',
        productPrice: 0,
        productURL: '',
        productInven: 0,
        productView: 0
    })


    useEffect(() => {

        const ProductDetail = async () =>{
            try{
                const response = await axios.get(`/product/detail`, {
                    params: { productId: productId }
                    });

                const data = response.data;
             
                setProductData(data);
                    
            } catch(error){
                console.log("오류발생", error);
            }
        } 
        ProductDetail();

        // const ProductViews =  () =>{
        //     try{
        //          axios.get(`/product/views`, {
        //             params: { productId: productId }
        //         });
                    
        //     } catch(error){
        //         console.log("오류발생", error);
        //     }
        // }
        // ProductViews();

     }, [])


    return(
        <>
            <Header/>
            <h1>상품 상세 페이지</h1>
            <div className='detail-all' key={id}><p>상품id: {id}</p>
                <div className='productName_box'>
                    <p>{productData.productName}</p>
                </div>
                <div className='productImg_box'>
                    <img src={`${productData.productURL.replace(/\s/g, "_")}`} alt='상품 이미지'/>
                </div>
                <div className='productPrice_box'>가격: {productData.productPrice}원</div>
                <div className='productInven_box'>재고수량: {productData.productInven}개</div>
                <div className='productView_box'>상품 조회수: {productData.productView}회</div>
                <div className='product_uploadtime_box'>업로드 시간: {productData.uploadTime}</div>
            </div>
        </>
    )
}