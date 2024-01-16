import React from 'react';
import Header from '../component/Header';
import "../css/ProductDetail.css";


export default function ProductDetail() {
    return (
        <div className='all'>
            <Header />
             <div className='product'>

                <div className='productImg'>
                    <div className='image' />{/* 상품 이미지 */}
                    <p className='description'>{/* 상품 이미지 밑 설명글 */}
                        <span className='descripText'>
                            상품 설명글입니다.{" "}
                        </span>
                    </p>
                </div>

                <div className='productInfo'>
                    <div className='productInfo1'>
                        <div className='productInfo2'>
                            <div className='productName'>상품명</div>
                            <div className='rate'>
                                <div className='rate_start' >
                                    <div className='rate_num'>4.9</div>
                                </div>
                            </div>
                        </div>
                        <div className='stock_deliver'>
                            <div className='stock'>
                                {/*<Shop className="icon-instance-node" />*/}
                                <div className="stock_txt">재고있음</div>

                                <div className='delivery'>
                                    {/* <Truck className="icon-instance-node" />*/}
                                    <div className="delivery_txt">무료배송</div>
                                </div>
                            </div>
                        </div>

                        <div className='infoDetails'>
                            <div className='info'>

                                <div className='infoGN'>
                                    <div className='infoGroup'>
                                        <div className='groupName'>브랜드</div>
                                    </div>
                                    <div className='infoName'>
                                        <div className='infoTxt'>지역브랜드명</div>
                                    </div>
                                </div>

                                <div className='infoGN'>
                                    <div className='infoGroup'>
                                        <div className='groupName'>추가스펙설명</div>
                                    </div>
                                    <div className='infoName'>
                                        <div className='infoTxt'>몇kg / 길이..?같은거</div>
                                    </div>
                                </div>

                                <div className='infoGN'>
                                    <div className='infoGroup'>
                                        <div className='groupName'>추가스펙설명</div>
                                    </div>
                                    <div className='infoName'>
                                        <div className='infoTxt'>몇kg / 길이..?같은거</div>
                                    </div>
                                </div>

                                <div className='infoGN'>
                                    <div className='infoGroup'>
                                        <div className='groupName'>추가스펙설명</div>
                                    </div>
                                    <div className='infoName'>
                                        <div className='infoTxt'>몇kg / 길이..?같은거</div>
                                    </div>
                                </div>

                                <div className='infoGN'>
                                    <div className='infoGroup'>
                                        <div className='groupName'>추가스펙설명</div>
                                    </div>
                                    <div className='infoName'>
                                        <div className='infoTxt'>몇kg / 길이..?같은거</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='priceSection'>
                    <div className='price'>
                        <div className='currentPrice'>$123</div>
                        <div className='discountAmount'>12%</div>{/* 할인율 */}
                        <div className='lastPrice'>
                            <div className='lastPriceTxt'>최근거래가격</div>
                            <div className='lastPeiceTxt'>$456</div>
                        </div>
                    </div>
                </div>

                <div className='productBtn'> {/*구매/장바구니 버튼 */}

                </div>
            </div>
            <div className='reviewArea'>
                {/*리뷰 작성 및 리뷰목록 */}
            </div>
        </div>
    );
}
