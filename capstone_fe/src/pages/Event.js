import Header from "../component/Header";
import "../css/Event.css";
import React,{useState} from "react";
import EventPost from "../pages/EventPost";

export default function Event() {
    const [events, setEvents] = useState([
        { id: 1, title: "장성군 이벤트", content: "내용" },
        { id: 2, title: "기부이벤트", content: "기부하면 장성군에서 감사해드립니다" }
    ]);
    const [isModalOpen,setIsModalOpen]=useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const isAdmin = true; //관리자 여부


    const openModal=()=>{ 
        setIsModalOpen(true);
    };

    const closeModal =()=>{
        setIsModalOpen(false);
    };

    const openEventModal=(event)=>{
        setSelectedEvent(event);
        setIsModalOpen(true);
    }

    // const eventPost=(eventData)=>{//서버로그 작성
    //     console.log('이벤트 등록',eventData);
    //     closeModal();

    // }

    return (

        <div className="event_all">
            <Header/>
            <div className="event_title">이벤트</div>
            {isAdmin &&(<button className="event-post" onClick={openModal}>이벤트 등록하기</button>) }
            {isModalOpen && <EventPost onClose={closeModal} />}

            <div className="event_list">{/*이벤트목록 */}
            {events.map(event => (
                    <div key={event.id} className="event_item" onClick={() => openEventModal(event)}>
                        <div className="event_txt">{event.title}</div>
                    </div>
                ))}
                    <div className="page_btn"></div> {/*페이지 넘기는거 컴포넌트만들 예정 */}
                </div>
                {selectedEvent && (
                <div className="event-modal">
                    <div className="event-content">
                        <button onClick={closeModal}>&times;</button>
                        <h2>{selectedEvent.title}</h2>
                        <p>{selectedEvent.content}</p>
                    </div>
                </div>
            )}
        </div>
    );
}