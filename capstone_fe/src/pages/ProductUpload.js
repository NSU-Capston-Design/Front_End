import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../component/Header";
import Select from 'react-select';

import '../css/Product_Upload.css';
import { json } from "react-router-dom";
export default function ProductUpload(){
    const [sessionId, setSessionId] = useState("");
    const [userName, setUserName] = useState("");
    const [labelList, setLabelList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]); 
    const [selectedFile, setSelectedFile] = useState(null);
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState(0);
    const [productInven, setProductInven] = useState(0);
    

    useEffect(() => {       // 컴포넌트가 마운트될 때 (실행될 때)
        const storageSessionId = window.localStorage.getItem('sessionId');
        const storageUserName = window.localStorage.getItem('username');
        
        setSessionId(storageSessionId || "");   // 값이 없으면 "" 공백 표기
        setUserName(storageUserName || "");

        console.log(userName);

    }, []);

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
    const onFile = (e) =>{                      // 파일이 올라갈 때, 발생하는 이벤트
        setSelectedFile(e.target.files[0]);
    }

    const onFileName = (e) => {                 // 인풋창에서 포커스가 떨어지면, 발생하는 이벤트(파일 이름입력)
        setProductName(e.target.value);
    }

    const onPrice = (e) => {                    // 상품의 가격정보
        setProductPrice(e.target.value);
    }

    const onInven = (e) => {
        setProductInven(e.target.value);
    }

    const onSubmit = async (event) => { // 보냈을 때의 이벤트
        event.preventDefault(); // 입력이 빈 칸일 때, 이벤트 막기
        
        const data = {
            productName: productName,
            productPrice: productPrice,
            userName: userName,
            productInven: productInven
        };

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('data', new Blob([JSON.stringify(data)], {
            type: "application/json"
        }));
        // formData.append('productName', productName);
        // formData.append('productPrice', productPrice);
        // formData.append('userName', userName);
        
        for(const entry of formData.entries()){
            console.log(entry);
        }

        const config = {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${sessionId}` // 세션 ID를 헤더에 포함하여 전송
            }
          };

        try{
            const response = await axios.post("http://localhost:8080/upload", formData, config);
            console.log('File Uploaded!', response);
        } catch(error){
            console.log("파일 업로드 실패!", error);
        }
    };

    return(
        <>
            <Header/>
            <div className="product_upload-all">
                <form id="upload_form" className="upload_form" onSubmit={onSubmit} encType="multipart/form-data">
                    <div className="product_upload_box">
                        <div className="upload_img_box">
                            <span>상품 사진</span>
                            <input type="file" className="file" onChange={onFile}/>
                        </div>
                        <div className="upload_title_box">
                            <span>상품 이름</span>
                            <input type="text" className="upload_title" onBlur={onFileName}/>
                        </div>
                        <div className="upload_price_box">
                            <span>상품 가격</span>
                            <input type="number" className="upload_price" onBlur={onPrice}/>
                        </div>
                        <div className="upload_inventory_box">
                            <span>재고 수량</span>
                            <input type="number" className="upload_inventory" onBlur={onInven}/>
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