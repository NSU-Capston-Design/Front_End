//상품 페이지(Product Page):

//사용자가 상품을 선택하고 장바구니에 추가함
//사용자가 상품을 선택하면, 프론트엔드는 해당 상품에 대한 정보(예: 상품 ID, 상품명, 가격 등)를 서버로 보냄
//이 정보는 보통 POST 요청 또는 GraphQL 쿼리로 전송됨
//백엔드는 상품 정보를 받아서 처리하고, 장바구니에 해당 상품을 추가함
//하지만 내가 만든건 로컬스토리지를 이용하여 바로 장바구니에 담게하는 방법 (해결)


//장바구니 페이지(Cart Page):

//사용자가 장바구니 페이지로 이동하면, 프론트엔드는 장바구니에 담긴 상품 정보를 서버로부터 요청함
//백엔드는 장바구니에 담긴 상품 정보를 데이터베이스에서 가져와 프론트엔드에 응답함
//프론트엔드는 받은 상품 정보를 사용자에게 보여줌
//사용자가 장바구니에서 상품의 수량을 변경하거나 삭제할 경우, 이 정보를 프론트엔드가 서버로 전송함
//프론트엔드는 이 정보를 백엔드로 보내어 장바구니 정보를 업데이트함
//로컬스토리지에서 바로 불러오고 수정함 (해결)


//결제 페이지(Checkout Page):

//사용자가 결제 페이지로 이동하면, 프론트엔드는 결제를 위한 정보를 서버로 요청함
//이 정보에는 사용자의 제품명, 상품가격, 수량, 제품 등이 포함될 예정 
//백엔드는 사용자의 요청을 처리하고, 결제를 위한 정보를 프론트엔드에 응답함
//프론트엔드는 받은 정보를 사용자에게 보여주고, 사용자가 결제를 완료할 수 있도록 구현함
//사용자가 결제를 완료하면, 프론트엔드는 해당 정보를 백엔드로 전송하여 결제를 처리함


import React, { useState, useEffect } from "react";
import Header from "../component/Header";
import "../css/Cart.css";
import axios from 'axios';

export default function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [showModal, setShowModal] = useState(false);

    // 장바구니 아이템의 총 가격을 계산합니다.
    const calculateTotalPrice = (items) => {
        return items.reduce((total, item) => total + (item.totalPrice || (item.productPrice * item.quantity)), 0);
    };

    useEffect(() => {
        // 로컬 스토리지에서 저장된 장바구니 아이템을 불러옵니다.
        const storedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(storedCartItems);
        setTotalPrice(calculateTotalPrice(storedCartItems));
    }, []);

    // 장바구니 아이템을 업데이트하고, 로컬 스토리지와 총 가격을 갱신합니다.
    const updateCartItems = (updatedCartItems) => {
        setCartItems(updatedCartItems);
        localStorage.setItem('cart', JSON.stringify(updatedCartItems));
        setTotalPrice(calculateTotalPrice(updatedCartItems));
    };

    // 장바구니에 아이템을 추가합니다. (장바구니 담기 버튼을 클릭할때 활성화 됨)
    const addToCart = (product) => {
        const updatedCartItems = [...cartItems];
        const existingCartItemIndex = updatedCartItems.findIndex(item => item.productId === product.productId);
    
        if (existingCartItemIndex !== -1) {
            // 이미 장바구니에 있는 상품일 경우 수량을 증가시킵니다.
            updatedCartItems[existingCartItemIndex].quantity++;
            updatedCartItems[existingCartItemIndex].totalPrice += product.productPrice;
        } else {
            // 장바구니에 새로운 상품으로 추가합니다.
            updatedCartItems.push({ ...product, quantity: 1, totalPrice: product.productPrice }); // 여기서 totalPrice를 productPrice로 설정합니다.
        }
        updateCartItems(updatedCartItems);
    };

    // 장바구니에서 특정 아이템을 삭제합니다.
    const removeItem = (index) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems.splice(index, 1);
        updateCartItems(updatedCartItems);
    };

    // 장바구니 아이템의 수량을 변경합니다.
    const changeQuantity = (index, newQuantity) => {
        const updatedCartItems = [...cartItems];
        if (newQuantity < 1) {
            newQuantity = 1; // 최소값이 1이 되도록 설정
        }
        updatedCartItems[index].quantity = newQuantity;
        updatedCartItems[index].totalPrice = updatedCartItems[index].productPrice * newQuantity;
        updateCartItems(updatedCartItems);
    };

    // 주문을 제출합니다.
    const submitOrder = () => {
        setShowModal(true);
    };

    // 주문을 확인하고 백엔드로 데이터를 전송합니다. (결제쪽)
    const confirmOrder = async () => {
        try {
            const backendURL = 'http://localhost:8080/product/buyList'; // 백엔드 상품 장바구니 리스트 -넣-
            
            const orderData = cartItems.map(item => ({
                productId: item.productId,
                productName: item.productName,
                productPrice: item.productPrice,
                quantity: item.quantity,
                productURL: item.productURL
            }));

            const response = await axios.post(
                backendURL,
                orderData
            );
            console.log('주문 성공:', response);
            // 주문이 성공적으로 처리된 후에는 장바구니를 비웁니다.
            setCartItems([]);
            localStorage.removeItem('cart');
            setTotalPrice(0);
            setShowModal(false); // 주문 완료 후 모달 닫기
        } catch (error) {
            console.error('주문 실패:', error);
        }
    };

    // 모달을 닫습니다.
    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className="cart_all">
            <Header />
            <div className="don_all">
                <div className="cart">
                    <div className="cart_txt">장바구니</div>
                </div>

                <div className="cart_list">
                    {cartItems.map((product, index) => (
                        <div className="cart_item" key={index}>
                            <div className="cart_item_image">
                                <img src={product.productURL} alt={product.productName} />
                            </div>
                            <div className="cart_item_name">{product.productName}</div>
                            <div className="cart_item_price">{product.productPrice ? product.productPrice.toLocaleString() : '0'}원</div>
                            <div className="cart_item_quantity">
                                <button onClick={() => changeQuantity(index, product.quantity - 1)}>-</button>
                                {product.quantity}
                                <button onClick={() => changeQuantity(index, product.quantity + 1)}>+</button>
                            </div>
                            <div className="cart_item_total_price">{product.totalPrice ? product.totalPrice.toLocaleString() : '0'}원</div>
                            <button onClick={() => removeItem(index)}>삭제하기</button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="total_price">총 가격: {totalPrice.toLocaleString()}원</div>
            <button onClick={submitOrder}>주문하기</button>

            {/* 모달 */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h2>주문 확인</h2>
                        <ul>
                            {cartItems.map((product, index) => (
                                <li key={index}>{product.productName}: {product.quantity}개</li>
                            ))}
                        </ul>
                        <p>총 가격: {totalPrice.toLocaleString()}원</p>
                        <div className="modal-buttons">
                            <button className="confirm-button" onClick={confirmOrder}>결제 하기</button>
                            <button className="cancel-button" onClick={closeModal}>결제 취소</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
