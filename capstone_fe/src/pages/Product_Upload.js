import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../component/Header";
import Select from 'react-select';

import '../css/Product_Upload.css';
export default function Product_Upload(){
    const [ labelList, setLabelList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]); 
       
    const categoryData = [  // 카테고리 데이터
        { value: 'electronics', label: '전자기기' },
        { value: 'appliances', label: '가전제품'},
        { value: 'top',label: '상의' },
        { value: 'bottom', label: '하의' },
        { value: 'shoes', label: '신발' }
    ];
    const handleChangeCategory = (selectedOptions) => { // 옵션 선택시 이벤트
        if(selectedOptions.length > 3){
            // 선택 가능한 최대 항목 수를 초과하면 마지막 선택을 제외하고 처리.
            selectedOptions = selectedOptions.slice(0, 3);
        }
        setSelectedCategory(selectedOptions);
    };
    const onSubmit = async (event) => { // 보냈을 때의 이벤트
        event.preventDefault(); // 입력이 빈 칸일 때, 이벤트 막기
        
    };

    return(
        <>
            <Header/>
            <div className="product_upload-all">
                <form id="upload_form" className="upload_form" onSubmit={onSubmit} encType="multipart/form-data">
                    <div className="product_upload_box">
                        <div className="upload_img_box">
                            <span>상품 사진</span>
                            <input type="file" className="file"/>
                        </div>
                        <div className="upload_title_box">
                            <span>상품 제목</span>
                            <input type="text" className="upload_title"/>
                        </div>
                        <div className="Select-box">
                            <Select
                                isMulti
                                options={categoryData}
                                onChange={handleChangeCategory}
                                placeholder="상품 카테고리"
                            />
                        </div>
                        <textarea className="product_information" placeholder="세부설명을 적어주세요."/>
                    </div>
                    <input type="submit" className="submit_btn"/>
                </form>
            </div>
        </>
    )
}