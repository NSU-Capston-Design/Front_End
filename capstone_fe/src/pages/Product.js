// import React, { useEffect, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";

// import "../css/Product.css";
// import Header from "../component/Header";
// import ProductDetail from "../pages/ProductDetail";

// export default function Product() {
//     const [list, setList] = useState([]);
//     const navigate = useNavigate();
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     useEffect(() => {
//     const productList = async () => {
//     try {
//         const response = await axios.get(`//localhost:8080/product/list`);
//         const data = response.data;
//         console.log(data);

//         if (Array.isArray(data)) {
//             setList(data);
//         } else {
//             console.error('배열이 아닌 데이터입니다:', data);
//         }
//     } catch (error) {
//         console.error('데이터를 불러오는 중 오류가 발생했습니다:', error);
//     }
// };
//         productList();  // 초기 데이터 가져오기
//     }, []);

//     const Moveto_ProductUpload = (e) => {
//         navigate('/product/upload');
//     };
//     const openProductDetailModal = (productId) => {
//         setSelectedProductId(productId);
//         setIsModalOpen(true);
//     };

//     const closeProductDetailModal = () => {
//         setSelectedProductId(null);
//         setIsModalOpen(false);
//     };

//     return (
//         <>
//             <Header />
//             <div className="product-all">
//                 <div className="product-list">
//                     {list.map((item) => (

//                             <div key={item.productId} className= "product-list-box" >  {/* 리스트 목록 */}

//                                 <div className="product-list-image">
//                                 <img src={`http://localhost:8080${item.productURL.replace(/\s/g, "_")}`} alt="Product" style={{width: 250, height: 200}}/>    
//                                 </div>    {/* 상품 이미지 */}
//                                 <div key={item.productId} className="product-list-title" title={item.productName}><Link to ={`/product/detail/${item.productId}`}>{item.productName}</Link></div> {/* 상품 타이틀 */} 
//                                 <div className="product-list-price" title={item.uploadTime}>{item.uploadTime}</div>     {/* 상품 가격 */}
//                                 <div className="product-list-review" title={item.productPrice}>{item.productPrice}</div>  {/* 상품 리뷰 */}
//                             </ div >
//                      ))

//                     }
//                 </div>
//                 <span className="input-box">
//                     <input type="button" className="movetoupload" onClick={Moveto_ProductUpload} value='상품 등록' />
//                 </span>
//             </div>
//             {isModalOpen && (
//                 <div className="product-overlay">
//                     <div className="product-modal">
//                         {/* ProductDetail 모달 */}
//                         <ProductDetail productId={selectedProductId} closeModal={closeProductDetailModal} />
//                     </div>
//                 </div>
//             )}

//         </>
//     )
// }
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "../css/Product.css";
import Header from "../component/Header";
import ProductDetail from "../pages/ProductDetail"; 

export default function Product() {
    const [list, setList] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState(null); // 추가
    const [isModalOpen, setIsModalOpen] = useState(false); // 추가
    const navigate = useNavigate();

    useEffect(() => {
        // 임시 데이터 배열
        const temporaryData = [
            {
                productId: 1,
                productName: "테스트 상품 1",
                uploadTime: "2022-01-20",
                productPrice: 10000,
                productURL: "https://i.pinimg.com/564x/ce/50/6f/ce506fa7dfd2e9900643f588ee4f2cad.jpg",
                productReview: 5
            },
            {
                productId: 2,
                productName: "테스트 상품 2",
                uploadTime: "2022-01-21",
                productPrice: 15000,
                productURL: "https://i.pinimg.com/564x/ce/50/6f/ce506fa7dfd2e9900643f588ee4f2cad.jpg",
                productReview: 4
            },
            // 추가적인 임시 데이터
        ];

        setList(temporaryData);
    }, []); // 빈 배열을 넣어 한 번만 실행되도록 설정

    const openProductDetailModal = (productId) => {
        setSelectedProductId(productId);
        setIsModalOpen(true);
    };

    const closeProductDetailModal = () => {
        setSelectedProductId(null);
        setIsModalOpen(false);
    };

    const Moveto_ProductUpload = (e) => {
        navigate('/product/upload');
    };

    return (
        <>
            <Header />
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
                    <input type="button" className="movetoupload" onClick={Moveto_ProductUpload} value="상품 등록" />
                </span>
            </div>

            {isModalOpen && (
                // 모달 오픈 상태일 때 ProductDetail 모달로 렌더링
                <div className="product-overlay">
                    <div className="product-modal">
                        {/* ProductDetail 모달 */}
                        <ProductDetail productId={selectedProductId} closeModal={closeProductDetailModal} />
                    </div>
                </div>
            )}
        </>
    );
}
