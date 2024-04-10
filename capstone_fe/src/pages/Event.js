import Header from "../component/Header";
import "../css/Event.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import EventPost from "../pages/EventPost";
import Pagination from "../component/Pagination";

export default function Event() {
    const [events, setEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const isAdmin = true; //관리자 여부
    const [userLevel, setUserDonorLevel] = useState(null); // 사용자의 기부자 등급
    const [selectedEvent, setSelectedEvent] = useState(null);// 이벤트 상세 모달
    const [isEventModalOpen, setIsEventModalOpen] = useState(false);


    useEffect(() => {
        fetchEvents();
        fetchUserLevel();
    }, []); // 컴포넌트가 마운트될 때 이벤트 목록을 가져옴

    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:8080/events');
            setEvents(response.data); // 백엔드에서 받아온 이벤트 목록을 상태에 설정
        } catch (error) {
            console.error('이벤트 목록을 가져오는 중에 오류가 발생했습니다:', error);
        }
    };

    const fetchUserLevel = async () => {// 유저 등급가져오기
        try {
            const response = await axios.get('http://localhost:8080//donations/grade');
            setUserDonorLevel(response.data.level); // 백엔드에서 받아온 사용자의 기부자 등급을 상태에 설정
        } catch (error) {
            console.error('사용자의 기부자 등급을 가져오는 중에 오류가 발생했습니다:', error);
        }
    };

    const openEventModal = async (eventId) => {
        const eventDetail = await eventDetail(eventId); 
        setSelectedEvent(eventDetail);
        setIsEventModalOpen(true)
    }

    const closeEventModal = () => {
        setSelectedEvent(null);
        setIsEventModalOpen(false);
    }

    // 이벤트 등록 모달  
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);

    const openEventPost = () => {
        setIsPostModalOpen(true);
    };

    const closeEventPost = () => {
        setIsPostModalOpen(false);
    };

    const deleteEvent = async () => {
        try {
            // 선택된 이벤트를 삭제하고 백엔드에도 해당 이벤트 삭제 요청을 보냄
            await axios.delete(`http://localhost:8080/event/delete`);
            const updatedEvents = events.filter(event => event.eventId !== selectedEvent.eventId);
            setEvents(updatedEvents);
            closeEventModal(); // 모달을 닫음
        } catch (error) {
            console.error('이벤트 삭제 중에 오류가 발생했습니다:', error);
        }
    };
    
    const isSpecialEvent = (event) => { // 기부자 등급 별로 이벤트 필터링
        return event.special && userLevel >= event.requiredDonorLevel;
    };

    return (

        <div className="event_all">
            <Header />
            <div className="event_title">이벤트</div>
            {isAdmin && (<button className="event-post" onClick={openEventPost}>이벤트 등록하기</button>)}
            {isPostModalOpen && <EventPost onClose={closeEventPost} />}

            <div className="event_list">{/*이벤트목록 */}
                {events.map(event => (
                    <div key={event.id} className="event_item" onClick={() => openEventModal(event.eventId)}>
                        <div className="event_txt">{event.eventTitle}</div>
                        <img src={event.eventImg} />

                    </div>
                ))}
                <div className="page_btn"><Pagination currentPage={currentPage}
                    setCurrentPage={setCurrentPage} /></div>
            </div>
            {isEventModalOpen && (
                <div className="event-modal">
                    <div className="event-content">
                        {isAdmin && (<button onClick={deleteEvent}>삭제</button>)}
                        <button onClick={closeEventModal}>닫기</button>
                        <h2>{selectedEvent.eventTitle}</h2>
                        <p>{selectedEvent.eventDetail}</p>
                        <p>게시일: {selectedEvent.eventData}</p>
                        <p>종료일: {selectedEvent.eventEnd}</p>
                        <img src={selectedEvent.eventImg} />
                    </div>
                </div>
            )}
        </div>
    );
}

