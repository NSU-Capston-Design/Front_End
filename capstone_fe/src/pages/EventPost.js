import React, { useState } from "react";
import axios from "axios";
import '../css/EventPost.css';
import Button from '../component/Button';

const EventPost = ({ onClose }) => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handlePosting = async () => {
        try {
            const response = await axios.post("url", { //보내기
                title: title,
                content: content
            });
            console.log("이벤트 작성 완료", response.data);
            onClose(); //등록 후 창 닫기
        } catch (error) {
            console.error(" 이벤트 업로드 오류: ", error);
        }
    };
    return (

        <div className="EventPost">
            <div className="EventPostheader">
                <div className="EventPosting_title">
                    <input className="EventPosting_titleInput"
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
                <textarea className="Event_content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="게시글 내용을 입력하세요"
                />
            </div>

            <Button size="sm" onClick={handlePosting}>이벤트 게시</Button>
        </div>

    );
};
 
export default EventPost;
