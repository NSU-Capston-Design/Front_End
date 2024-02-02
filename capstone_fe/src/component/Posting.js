import React from "react";
import '../css/Posting.css';

const Posting = ({ onClose }) => {
    return (
        <form>
            <div className="Posting">
                <div className="Posting_header">
                    <div className="Posting_title">
                        <textarea className="Posting_titleInput">
                            글 제목
                        </textarea>
                        <button type="button" className="Posting_closeBtn" onClick={() => onClose()}>
                            닫기
                        </button>
                    </div>
                </div>
                <textarea name="Posting_content">
                    {/* 게시글 내용 작성 칸 */}
                </textarea>
                <button className="posting_btn">
                    {/* 게시 버튼 */}
                    게시
                </button>
            </div>
        </form>
    );
};

export default Posting;
