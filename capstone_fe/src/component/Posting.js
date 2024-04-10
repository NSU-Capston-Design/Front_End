import React, { useState } from "react";
import axios from "axios";
import '../css/Posting.css';
import Button from '../component/Button';

const Posting = ({ onClose }) => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handlePosting = async () => {
        try {
            const postSave = {};
            postSave['postTitle'] = title;
            postSave['postDetail'] = content;
            postSave['userId'] = "111";
            const response = await axios.post("http://localhost:8080/post/save", postSave);
            console.log("게시글 작성 완료", response.data);
        } catch (error) {
            console.error(" 업로드 오류: ", error);
        }
    };
    return (

        <div className="Posting">
            <div className="Posting_header">
                <div className="Posting_title">
                    <input className="Posting_titleInput"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="게시글 제목을 입력하세요"
                    />

                    <button type="button" className="Posting_closeBtn" onClick={() => onClose()}>
                        닫기
                    </button>
                </div>
            </div>

            <div className="content">
                <textarea className="Posting_content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="게시글 내용을 입력하세요"
                />
            </div>

            <Button size="sm" onClick={handlePosting}>게시</Button>
        </div>

    );
};
 
export default Posting;