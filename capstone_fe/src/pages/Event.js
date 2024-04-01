import Header from "../component/Header";
import "../css/Event.css";
import axios from "axios";
import React, { useState,useEffect } from "react";
import EventPost from "../pages/EventPost";

export default function Event() {
    const [events, setEvents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const isAdmin = true; //관리자 여부

    useEffect(() => {
        fetchEvents();
    }, []); // 컴포넌트가 마운트될 때 이벤트 목록을 가져옴

    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:8080/events');
            setEvents(response.data); // 백엔드에서 받아온 이벤트 목록을 상태에 설정
        } catch (error) {
            console.error('이벤트 목록을 가져오는 중에 오류가 발생했습니다:', error);
        }
    };
    const eventDetail = async (eventId) => {
        try {
            const response = await axios.get(`http://localhost:8080/event/detail/{eventId}`);
            return response.data; // 백엔드에서 받아온 이벤트 상세 정보를 반환
        } catch (error) {
            console.error('이벤트 상세 정보를 가져오는 중에 오류가 발생했습니다:', error);
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedEvent(null); //선택된 이벤트 초기화
        setIsModalOpen(false); // 모달 닫기
    };

    const openEventModal = async(eventId) => {
        const eventDetail = await eventDetail(eventId);
        setSelectedEvent(eventDetail);

    }

    const deleteEvent = async() => {
        try {
            // 선택된 이벤트를 삭제하고 백엔드에도 해당 이벤트 삭제 요청을 보냄
            await axios.delete(`http://localhost:8080/events/${selectedEvent.eventId}`);
            const updatedEvents = events.filter(event => event.eventId !== selectedEvent.eventId);
            setEvents(updatedEvents);
            closeModal(); // 모달을 닫음
        } catch (error) {
            console.error('이벤트 삭제 중에 오류가 발생했습니다:', error);
        }
    };

    // const eventPost=(eventData)=>{//서버로그 작성
    //     console.log('이벤트 등록',eventData);
    //     closeModal();

    // }

    return (

        <div className="event_all">
            <Header />
            <div className="event_title">이벤트</div>
            {isAdmin && (<button className="event-post" onClick={openModal}>이벤트 등록하기</button>)}
            {isModalOpen && <EventPost onClose={closeModal} />}

            <div className="event_list">{/*이벤트목록 */}
                {events.map(event => (
                    <div key={event.id} className="event_item" onClick={() => openEventModal(event.eventId)}>
                        <div className="event_txt">{event.eventTitleitle}</div>
                    </div>
                ))}
                <div className="page_btn"></div> {/*페이지 넘기는거 컴포넌트만들 예정 */}
            </div>
            {selectedEvent && (
                <div className="event-modal">
                    <div className="event-content">
                    {isAdmin && (<button onClick={deleteEvent}>삭제</button>)}
                        <button onClick={closeModal}>
                            닫기
                        </button>
                        <h2>{selectedEvent.eventTitle}</h2>
                        <p>{selectedEvent.eventDetail}</p>
                    </div>
                </div>
            )}
        </div>
    );
}