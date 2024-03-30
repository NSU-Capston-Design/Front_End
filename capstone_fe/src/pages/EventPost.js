import React, { useState } from "react";
import axios from "axios";
import '../css/EventPost.css';
import Button from '../component/Button';

const EventPost = ({ onClose }) => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [file, setFile] = useState(null);


    const handlePosting = async () => {
        try {
            const eventData = new FormData();
            eventData.append("title", title);
            eventData.append("content", content);
            if (file) {
                eventData.append("event_file", file);
            }
            const response = await axios.post("http://localhost:8080/event/upload", eventData);
            console.log("이벤트 작성 완료", response.data);
            onClose(); // 등록 후 창 닫기
        } catch (error) {
            console.error("이벤트 업로드 오류:", error);
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    return (
        <div className="EventPost">
            <div className="EventPostheader">
                <div className="EventPosting_title">
                    <input
                        className="EventPosting_titleInput"
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
                <textarea
                    className="Event_content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="게시글 내용을 입력하세요"
                />
            </div>

            <div className="file-upload">
                <label htmlFor="event-file">이미지 업로드:</label>
                <input
                    type="file"
                    id="event-file"
                    onChange={handleFileChange}
                />
            </div>

            <Button size="sm" onClick={handlePosting}>이벤트 게시</Button>
        </div>
    );
};
 
export default EventPost;