//Component (컴포넌트): 하나의 독립적인 코드 블록이며, UI의 일부분을 구성함
//useState (상태): 컴포넌트의 상태(데이터)를 관리함
//useNavigate (네비게이션 훅): 다른 페이지로의 이동을 도와주는 함수를 제공함
//import 구문들: 이 코드는 필요한 React 기능, 다른 리액트 컴포넌트, 스타일 시트, 필요한 훅들을 가져옴
//Product 컴포넌트: JavaScript ES6 함수 구문을 사용해 'Product'라는 이름의 컴포넌트를 정의함 또, 이 컴포넌트는 화면에 상품들을 표시함
//useState 훅: 이 훅을 사용해 컴포넌트의 상태인 list라는 상품 목록 배열을 생성하고 관리함

//함수들
//addToCart: 사용자가 '장바구니에 담기' 버튼을 클릭하면, localStorage에서 장바구니의 내용을 가져와 현재 상품을 추가함
//handleAddProduct: '상품 등록' 버튼을 클릭하면 사용자를 상품 등록 페이지로 이동시키는 함수임
//handleProductClick: 상품을 클릭하면, 해당 상품의 상세 페이지로 이동하는 함수임
//handleAddToCart: '장바구니에 담기' 버튼 클릭 이벤트를 처리하며 addToCart 함수를 호출함
//render 메소드 안의 JSX: 컴포넌트가 화면에 무엇을 표시할지 결정함. HTML과 유사하지만 JSX라는 JavaScript의 확장 문법임
//Header: 사용자 정의 헤더 컴포넌트를 랜더링함
//상품 목록 (.product-list): list 배열의 각 상품마다 반복해서 상품 아이템을 표시함
//이벤트 핸들러: 각 상품 아이템과 '장바구니에 담기' 버튼에 클릭 이벤트 핸들러를 연결함
//버튼: '상품 등록'을 위한 버튼을 제공하며, 클릭 시 handleAddProduct 함수를 호출함

//결제 처리 단계 : 결제를 위해 '결제하기' 또는 '주문확인' 버튼을 클릭하면, 백엔드 서버로 사용자의 결제 정보와 주문 정보가 전송됨 (결제에 필요한 정보들은 다 되어있다고 가정)
//이때 주문 데이터 생성, 결제 처리, 재고 관리 등의 백엔드 작업이 진행됨
//결제 확인 단계 : 결제가 성공적으로 처리되었다는 정보를 사용자에게 알려주고, 백엔드 시스템은 결제 내역을 최종적으로 데이터베이스에 기록함

import Header from "../component/Header";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Product.css";
import ProductDetail from "../pages/ProductDetail"; 
import axios from "axios";

export default function Product() {

    
    const [selectedProduct, setSelectedProduct] = useState(null); 
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [sortBy, setSortBy] = useState(""); // 정렬 방식을 저장하는 상태
    const [list, setList] = useState([]);

    const navigate = useNavigate();

    const addToCart = (product) => {
        const existingCartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const existingCartItem = existingCartItems.find(item => item.productId === product.productId);
        
        if (existingCartItem) {
            existingCartItem.quantity++; // 이미 장바구니에 있는 상품이라면 수량을 증가시킴
        } else {
            existingCartItems.push({ ...product, quantity: 1 }); // 새로운 상품이라면 수량을 1로 설정하여 추가
        }
        
        localStorage.setItem('cart', JSON.stringify(existingCartItems));
    }
    

    useEffect(() => { //제품가져오기
    const productList = async () => {
    try {
        const response = await axios.get('//localhost:8080/product/list');
        const data = response.data;
        console.log(data);

        if (Array.isArray(data)) {
            setList(data);
        } else {
            console.error('배열이 아닌 데이터입니다:', data);
        }
    } catch (error) {
        console.error('데이터를 불러오는 중 오류가 발생했습니다:', error);
    }
};
        productList();  // 초기 데이터 가져오기
    }, []);

    //     setList(temporaryData);
    // // }, []); // 빈 배열을 넣어 한 번만 실행되도록 설정

    const openProductDetailModal = (productId) => {
        const product = list.find(item => item.productId === productId);
        setSelectedProduct(product); // 선택된 상품 설정
        setIsModalOpen(true); // 모달 오픈
    };

    const closeProductDetailModal = () => {
        setSelectedProduct(null);
        setIsModalOpen(false);
    };

    const handleAddProduct = () => {
        navigate('/product/upload');
    };

    // const handleProductClick = (productId) => { 모달페이지로 열리는 걸로 했습니다.
    //     navigate(`/product/detail/${productId}`); // 상품 클릭 시 해당 상품의 상세 페이지로 이동
    // };

    const handleAddToCart = (event, item) => {
        event.stopPropagation(); // 상세 페이지 이동 방지
        addToCart(item);
    };

    const sortChange = (event) => {
        const value = event.target.value;
        setSortBy(value);
        if (value === "latest") {
            sortLatest();
        } else if (value === "popularity") {
            sortPopularity();
        }
    };

    const sortLatest = () => {
        const sortedList = [...list].sort((a, b) => new Date(b.uploadTime) - new Date(a.uploadTime));
        setList(sortedList);
    };

    const sortPopularity = () => {
        const sortedList = [...list].sort((a, b) => b.sales - a.sales);
        setList(sortedList);
    };

    return (
        <>
            <Header />
            <div className="product-all">
            <div className="product-controls">
                    <select value={sortBy} onChange={sortChange}>
                        <option value="">정렬</option>
                        <option value="latest">최신순</option>
                        <option value="popularity">인기순</option>
                    </select>
                </div>
                <div className="product-list">
                    {list.map((item) => (
                        <div key={item.productId} className="product-list-item" onClick={() => openProductDetailModal(item.productId)}>
                            <div className="product-list-box">
                                <div className="product-list-image">
                                    <img src={`${item.productURL}`} alt="Product" style={{ width: 150, height: 150 }} />
                                </div>
                                <div className="product-list-title" title={item.productName}>
                                    {item.productName}
                                </div>
                                <div className="product-list-price" title={item.productPrice}>
                                    {item.productPrice}원
                                </div>
                                <div className="product-list-review" title={item.productInven}>
                                    재고 : {item.productInven} &nbsp; 조회수 : {item.productView}
                                </div>
                                <div className="product-list-time" title={item.uploadTime}>
                                    업로드 : {item.uploadTime}
                                </div>
                                <button onClick={(event) => handleAddToCart(event, item)} className="add-to-cart-button">
                                    장바구니에 담기
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <span className="input-box">
                    <input type="button" className="movetoupload" onClick={handleAddProduct} value="상품 등록" />
                </span>
            </div>
            {isModalOpen && (
                // 모달 오픈 상태일 때 ProductDetail 모달로 렌더링
                <div className="product-overlay">
                    <div className="product-modal">
                        {/* ProductDetail 모달 */}
                        <ProductDetail product={selectedProduct} closeModal={closeProductDetailModal} />
                    </div>
                </div>
            )}
        </>
    );
}


