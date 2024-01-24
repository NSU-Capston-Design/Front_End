import "../css/ProductDetail.css";
import Button from '../component/Button';
import React, { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ProductDetail(props) {

    const { productId } = useParams();
    console.log(productId);
    const id = parseInt(productId, 10);
    const [productData, setProductData] = useState({
        // productName: '',
        // uploadTime: '',
        // productPrice: 0,
        // productURL: '',
        // productInven: 0,
        // productView: 0
        productId: 1,
        productName: "테스트 상품",
        uploadTime: "2022-01-20",
        productPrice: 10000,
        productURL: "../img/rank_profile_example.jpg",
        productInven: 10,
        productView: 50
    })


    const [reviewText, setReviewText] = useState("");
    const [reviews, setReviews] = useState([]);


    useEffect(() => {

        const ProductDetail = async () => {
            try {
                const response = await axios.get(`/product/detail`, {
                    params: { productId: productId }
                });

                const data = response.data;

                setProductData(data);

            } catch (error) {
                console.log("오류발생", error);
            }
        }
        ProductDetail();

        const ProductViews = () => {
            try {
                axios.get(`/product/views`, {
                    params: { productId: productId }
                });

            } catch (error) {
                console.log("오류발생", error);
            }
        }
        ProductViews();

    }, [])


    useEffect(() => {
        const updateProductViews = async () => {
            try {
                await axios.get(`/product/views`, {
                    params: { productId: productId }
                });

            } catch (error) {
                console.log("오류발생", error);
            }
        };

        updateProductViews();
    }, [productId]);

    const handleReviewChange = (event) => {
        setReviewText(event.target.value);
    };

    const submitReview = () => {
        // 여기에 리뷰를 서버에 전송하는 코드 추가
        // 성공적으로 리뷰가 등록되면 해당 리뷰를 상태에 추가
        const newReview = {
            username: "사용자", // 리뷰를 작성한 사용자의 이름 또는 아이디
            reviewText: reviewText
        };

        setReviews([...reviews, newReview]);
        setReviewText(""); // 리뷰 작성 후 폼 초기화
    };


    return (
        <div className='all'>

            <div className='product'>

                <div className='productImg'>
                <img src={productData.productURL} alt={productData.productName} />
                    <p className='description'>{/* 상품 이미지 밑 설명글 */}
                        <span className='descripText'>
                            상품 설명글입니다.
                        </span>
                    </p>
                    <div className="modalCloseBtn" onClick={props.closeModal}>
                        닫기
                    </div>
                </div>

                <div className='productInfo'>
                    <div className='productInfo1'>
                        <div className='productInfo2'>
                            <div className='productName'>{productData.productName}</div>
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
                            <div className='currentPrice'> {productData.productPrice} </div>
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
                            color="rgba(12, 104, 244, 1)"
                            stateProp="active"
                            text="구매"
                            textColor='rgba(255,255,255,1)'
                            border='none'
                        />

                        <Button className="cart"
                            color='rgba(255,255,255,1)'
                            stateProp="active"
                            text='장바구니'
                            textColor='primary'
                            outlineColor='rgba(12, 104, 244, 1)'
                            textColor='rgba(12, 104, 244, 1)'
                        />
                    </div>
                </div>
            </div>
            <div className="reviewArea">
                <h2>상품 리뷰</h2>
                {/* 리뷰 작성 폼 */}
                <div className="reviewForm">
                    <textarea
                        value={reviewText}
                        onChange={handleReviewChange}
                        placeholder="리뷰를 작성해주세요."
                    />
                    <Button
                        className="submitReviewBtn"
                        color="rgba(12, 104, 244, 1)"
                        stateProp="active"
                        text="리뷰 작성"
                        textColor="rgba(255,255,255,1)"
                        onClick={submitReview}
                    />
                </div>
                {/* 리뷰목록 */}
                <div className="reviewList">
                    {reviews.map((review, index) => (
                        <div key={index} className="reviewItem">
                            <strong>{review.username}:</strong> {review.reviewText}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

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
