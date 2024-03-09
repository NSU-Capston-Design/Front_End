import "../css/ProductDetail.css";
import Button from '../component/Button';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function ProductDetail(props) {

    useEffect(()=>{ //관리자/사용자 권한 로컬 설정
        const isAdmin = localStorage.getItem('isAdmin') === 'true';
        setIsAdmin(true);
      },[]);

    const navigate = useNavigate();
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
        productURL: "https://i.pinimg.com/564x/ce/50/6f/ce506fa7dfd2e9900643f588ee4f2cad.jpg",
        productInven: 10,
        productView: 50,
        productCategory: "테스트 카테고리",
        productBrand: "테스트 브랜드",
        productDescription: "테스트 상품 설명입니다."
    })

    const [isAdmin, setIsAdmin]=useState(false); //관리자 여부
    const [reviewText, setReviewText] = useState("");
    const [satisfaction, setSatisfaction] = useState(""); // 만족도 
    const [reviews, setReviews] = useState([]);


    const delteProduct = async()=>{//상품삭제
        try{
            await axios.delete('${productId}');
            navigate('/');
        }catch(error){
            console.log("상품 삭제 오류", error);
        }
    }

    const editProduct=()=>{//상품상세 수정

    }

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const response = await axios.get('/product/detail', {
                    params: { productId: productId }
                });

                const data = response.data;
                setProductData(data);
            } catch (error) {
                console.log("오류발생", error);
            }
        };

        fetchProductDetail();
    }, [productId]);

    const updateProductViews = async () => {
        try {
            await axios.get(`/product/views`, {
                params: { productId: productId }
            });
        } catch (error) {
            console.log("오류발생", error);
        }
    };

    useEffect(() => {
        updateProductViews();
    }, [productId]);

    const handleReviewChange = (event) => {
        setReviewText(event.target.value);
    };

    const handleSatisfactionChange = (event) => { // 만족도 변경 처리
        setSatisfaction(event.target.value);
    };

    const submitReview = () => {
        const newReview = {
            username: "사용자", // 리뷰 작성자
            reviewText: reviewText,
            satisfaction: satisfaction // 만족도 추가
        };

        setReviews([...reviews, newReview]);
        setReviewText(""); // 리뷰 작성 후 폼 초기화
        setSatisfaction(""); // 만족도 초기화
    };


    const Purchase = () => {
        // 구매 로직
        const isConfirmed=window.confirm(`상품(${productId})을 구매하시겠습니까?.`);

        if(isConfirmed){
            console.log(`상품(${productId}) 결제페이지로 이동합니다.`);
            navigate('/')//결제모달로 수정예정
           
        }else{
            console.log(`상품(${productId}) 구매가 취소되었습니다.`);
        }
    };

    const addToCart = async() => {
       
        // 장바구니 추가 로직
        const cartItem = {
            productId: productData.productId,
            productName: productData.productName,
            productPrice: productData.productPrice
        };
    
        try {
            // const response = await axios.post('url', cartItem);
            // console.log('장바구니 추가됨:', response.data);
            const isConfirmed = window.confirm(`상품(${productId})을 장바구니에 추가했습니다. 장바구니로 이동하시겠습니까?`);
    
            if (isConfirmed) {
                navigate('/cart');
            }
        } catch (error) {
            console.error('장바구니로 이동 중 오류:', error);
        }
    };
    

    return (
        <div className='all'>
            <div className="modalCloseBtn" onClick={props.closeModal}>
                닫기
            </div>  
            {isAdmin && (
                    <div>
                        <button onClick={editProduct}>제품정보 수정</button>
                        <button  onClick={delteProduct}>삭제</button>
                        </div>

                )}
            <div className='product'>

                <div className='productImg'>
                    <img src={productData.productURL} alt={productData.productName} />
                    <p className='description'>{/* 상품 이미지 밑 설명글 */}
                        <span className='descripText'>
                            상품 설명글입니다.
                        </span>
                    </p>

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
                                        <div className='groupName'>가격</div>
                                    </div>
                                    <div className='infoName'>
                                        <div className='infoTxt'>{productData.productPrice}원</div>
                                    </div>
                                </div>

                                <div className='infoGN'>
                                    <div className='infoGroup'>
                                        <div className='groupName'>재고수량</div>
                                    </div>
                                    <div className='infoName'>
                                        <div className='infoTxt'>{productData.productInven}개</div>
                                    </div>
                                </div>

                                <div className='infoGN'>
                                    <div className='infoGroup'>
                                        <div className='groupName'>상품 조회수</div>
                                    </div>
                                    <div className='infoName'>
                                        <div className='infoTxt'>{productData.productView}회</div>
                                    </div>
                                </div>

                                <div className='infoGN'>
                                    <div className='infoGroup'>
                                        <div className='groupName'>업로드 시간</div>
                                    </div>
                                    <div className='infoName'>
                                        <div className='infoTxt'>{productData.uploadTime}</div>
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
                        <Button size="sm" onClick={Purchase}>구매</Button>


                        <Button size="sm" onClick={addToCart}>장바구니</Button>
                    </div>
                </div>
            </div>
            <div className="reviewArea">
                <h2>상품 리뷰</h2>
                
                <div className="reviewForm">
                    <input
                        value={reviewText}
                        onChange={handleReviewChange}
                        placeholder="리뷰를 작성해주세요."
                    />
         <select value={satisfaction} onChange={handleSatisfactionChange}>
                        <option value="">만족도를 선택하세요</option>
                        <option value="very-satisfied">매우 만족</option>
                        <option value="satisfied">만족</option>
                        <option value="neutral">보통</option>
                        <option value="unsatisfied">불만족</option>
                        <option value="very-unsatisfied">매우 불만족</option>
                    </select>
                    <Button size="sm" onClick={submitReview}>리뷰작성</Button>
                </div>
                <div className="reviewList">
                    {reviews.map((review, index) => (
                        <div key={index} className="reviewItem">
                            <strong>{review.username}:</strong> {review.reviewText} (만족도: {review.satisfaction})
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