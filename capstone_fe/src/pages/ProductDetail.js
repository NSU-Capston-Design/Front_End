import React, { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../component/Header';
import "../css/ProductDetail.css";
import axios from 'axios';


export default function ProductDetail(){

    const params = useParams();
    const { productId } = params;
    const id = parseInt(productId, 10);
        
    // useEffect(() => {
        
    //     axios.
    // })
    return(
        <>
            <Header/>
            <h1>상품 상세 페이지</h1>
            <p>상품번호: {id}</p>
        </>
    )
}