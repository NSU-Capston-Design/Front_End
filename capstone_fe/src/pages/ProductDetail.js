// ProductDetail 컴포넌트
import React from "react";
import Header from "../component/Header";
import Button from "../component/Button"; // Button 컴포넌트 import 추가
import { useParams } from "react-router-dom";

import "../css/ProductDetail.css";

export default function ProductDetail() {
    const { productId } = useParams(); // URL 파라미터에서 상품 아이디 가져오기

    // 상품 정보를 가져오는 로직은 이곳에서 구현해주세요.

    const productData = {
        productName: "상품명",
        productPrice: 123,
        productInven: 10,
        productView: 100,
        uploadTime: "2022-02-17"
    };

    return (
        <div className="all">
            <Header />
            <div className="product">
                <div className="productImg">
                    <div className="image" />
                    <p className="description">
                        <span className="descripText">상품 설명글입니다.</span>
                    </p>
                </div>

                <div className="productInfo">
                    <div className="productInfo1">
                        <div className="productInfo2">
                            <div className="productName">{productData.productName}</div> {/* 상품명 표시 */}
                            <div className="rate">
                                <div className="rate_start">
                                    <div className="rate_num">4.9</div>
                                </div>
                            </div>
                        </div>
                        <div className="stock_deliver">
                            <div className="stock">
                                <div className="stock_txt">재고있음</div>
                                <div className="delivery_txt">무료배송</div>
                            </div>
                        </div>

                        <div className="infoDetails">
                            {/* 추가 정보 영역 */}
                        </div>
                    </div>
                </div>

                <div className="buy">
                    <div className="priceSection">
                        <div className="price">
                            <div className="currentPrice">${productData.productPrice}</div> {/* 상품 가격 표시 */}
                            <div className="discount">
                                <div className="discountAmount">-12%</div>
                            </div>
                        </div>
                        <div className="lastPrice">
                            <div className="lastPriceTxt">할인 전 가격</div>
                            <div className="lastPriceTxt">$456</div>
                        </div>
                    </div>

                    <div className="productBtn">
                        {/* 구매 버튼 */}
                        <Button
                            className="buybtn"
                            clolor="rgba(12, 104, 244, 1)"
                            stateProp="active"
                            text="구매"
                            textColor="rgba(255,255,255,1)"
                            border="none"
                        />
                        {/* 장바구니 버튼 */}
                        <Button
                            className="cart"
                            clolor="rgba(255,255,255,1)"
                            stateProp="active"
                            text="장바구니"
                            textColor="primary"
                            outlineColor="rgba(12, 104, 244, 1)"
                            textColor="rgba(12, 104, 244, 1)"
                        />
                    </div>
                </div>
                {/* 상품 정보 출력 */}
                <div className="productPrice_box">가격: {productData.productPrice}원</div>
                <div className="productInven_box">재고수량: {productData.productInven}개</div>
                <div className="productView_box">상품 조회수: {productData.productView}회</div>
                <div className="product_uploadtime_box">업로드 시간: {productData.uploadTime}</div>
            </div>
            <div className="reviewArea">{/* 리뷰 작성 및 리뷰목록 */}</div>
        </div>
    );
}
