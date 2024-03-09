import Header from '../component/Header';
import "../css/ProductDetail.css";
import Button from '../component/Button';
import React, { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ProductDetail() {
    const { fileId } = useParams();
    const id = parseInt(fileId, 10);
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
                console.log(typeof(fileId));
                    await axios.get(`/product/detail`, {
                    params: { fileId: fileId }
                    })
                    .then(response => {
                        setProductData(response.data);
                    });
                                    
            } catch(error){
                console.log("오류발생", error);
            }
        } 
     }, [])

    return (
        <div className='all'>
            <Header />
            <div className='product'>

                <div className='productImg'>
                    <div className='image' />{/* 상품 이미지 */}
                    <p className='description'>{/* 상품 이미지 밑 설명글 */}
                        <span className='descripText'>
                            상품 설명글입니다.
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
                                        <div className='infoTxt'>몇kg / 길이 etc</div>
                                    </div>
                                </div>

                                <div className='infoGN'>
                                    <div className='infoGroup'>
                                        <div className='groupName'>추가스펙설명</div>
                                    </div>
                                    <div className='infoName'>
                                        <div className='infoTxt'>몇kg / 길이 etc</div>
                                    </div>
                                </div>

                                <div className='infoGN'>
                                    <div className='infoGroup'>
                                        <div className='groupName'>추가스펙설명</div>
                                    </div>
                                    <div className='infoName'>
                                        <div className='infoTxt'>몇kg / 길이 etc</div>
                                    </div>
                                </div>

                                <div className='infoGN'>
                                    <div className='infoGroup'>
                                        <div className='groupName'>추가스펙설명</div>
                                    </div>
                                    <div className='infoName'>
                                        <div className='infoTxt'>몇kg / 길이 etc</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='buy'>

                    <div className='priceSection'>
                        <div className='price'>
                            <div className='currentPrice'>$123</div>
                            <div className='discount'>
                                <div className='discountAmount'>-12%</div>{/* 할인율 */}
                            </div>
                        </div>
                        <div className='lastPrice'>
                            <div className='lastPriceTxt'>할인 전 가격</div>
                            <div className='lastPriceTxt'>$456</div>
                        </div>
                    </div>

                    <div className='productBtn'> {/*구매/장바구니 버튼 */}
                        <Button className="buybtn"
                            clolor="rgba(12, 104, 244, 1)"
                            stateProp="active"
                            text="구매"
                            textColor='rgba(255,255,255,1)'
                            border='none'
                        />

                        <Button className="cart"
                        clolor='rgba(255,255,255,1)'
                        stateProp="active"
                        text='장바구니'
                        textColor='primary'
                        outlineColor='rgba(12, 104, 244, 1)'
                        textColor='rgba(12, 104, 244, 1)'
                       />
                    </div>
                </div>
            </div>
            <div className='reviewArea'>
                {/*리뷰 작성 및 리뷰목록 */}
            </div>
        </div>
    );
}
// export default function ProductDetail(){

    





//     return(
//         <>
//             <Header/>
//             <h1>상품 상세 페이지</h1>
//             <div className='detail-all' key={id}><p>상품id: {id}</p>
//                 <div className='productName_box'>
//                     <p>{productData.productName}</p>
//                 </div>
//                 <div className='productImg_box'>
//                     <img src={`${productData.productURL.replace(/\s/g, "_")}`} alt='상품 이미지'/>
//                 </div>
//                 <div className='productPrice_box'>가격: {productData.productPrice}원</div>
//                 <div className='productInven_box'>재고수량: {productData.productInven}개</div>
//                 <div className='productView_box'>상품 조회수: {productData.productView}회</div>
//                 <div className='product_uploadtime_box'>업로드 시간: {productData.uploadTime}</div>
//             </div>
//         </>
//     )
// }
