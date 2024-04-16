// import Header from "../component/Header";
// import "../css/Event.css";
// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import EventPost from "../pages/EventPost";
// import Pagination from "../component/Pagination";

// export default function Event() {
//     const [events, setEvents] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const isAdmin = true; //관리자 여부
//     const [userLevel, setUserDonorLevel] = useState(null); // 사용자의 기부자 등급
//     const [selectedEvent, setSelectedEvent] = useState(null);// 이벤트 상세 모달
//     const [isEventModalOpen, setIsEventModalOpen] = useState(false);

//     useEffect(() => {
//         const fetchEvents = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8080/event');
//                 const data = response.data; // 응답 데이터를 변수에 할당
//                 console.log('이벤트 목록 가져오기:', data); // 할당한 데이터를 콘솔에 출력
//                 setEvents(data); // 할당한 데이터를 상태에 설정
//             } catch (error) {
//                 console.error('이벤트 목록을 가져오는 중에 오류가 발생했습니다:', error);
//             }
//         };

//         fetchEvents(); // fetchEvents 함수를 useEffect 내에서 호출
//     }, []); // 컴포넌트가 마운트될 때 한 번만 이벤트 목록을 가져옴

//     const fetchUserLevel = async () => {// 유저 등급가져오기
//         try {
//             const response = await axios.get('http://localhost:8080/donations/grade');
//             setUserDonorLevel(response.data.level); // 백엔드에서 받아온 사용자의 기부자 등급을 상태에 설정
//         } catch (error) {
//             console.error('사용자의 기부자 등급을 가져오는 중에 오류가 발생했습니다:', error);
//             // 오류 처리: 사용자에게 메시지 표시 또는 로깅
//         }
//     };

//     const openEventModal = async (eventId) => {
//         try {
//             const response = await axios.get(`http://localhost:8080/event/${eventId}`);
//             setSelectedEvent(response.data);
//             setIsEventModalOpen(true);
//         } catch (error) {

//             console.error('이벤트 상세를 가져오는 중에 오류가 발생했습니다:', error);
//         }
//     };


//     const closeEventModal = () => {
//         setSelectedEvent(null);
//         setIsEventModalOpen(false);
//     }

//     // 이벤트 등록 모달  
//     const [isPostModalOpen, setIsPostModalOpen] = useState(false);

//     const openEventPost = () => {
//         setIsPostModalOpen(true);
//     };

//     const closeEventPost = () => {
//         setIsPostModalOpen(false);
//     };

//     const deleteEvent = async () => {
//         try {
//             // 선택된 이벤트를 삭제하고 백엔드에도 해당 이벤트 삭제 요청을 보냄
//             await axios.delete(`http://localhost:8080/event/delete`);
//             const updatedEvents = events.filter(event => event.eventId !== selectedEvent.eventId);
//             setEvents(updatedEvents);
//             closeEventModal(); // 모달을 닫음
//         } catch (error) {
//             console.error('이벤트 삭제 중에 오류가 발생했습니다:', error);
//         }
//     };

//     const isSpecialEvent = (event) => { // 기부자 등급 별로 이벤트 필터링
//         return event.special && userLevel >= event.requiredDonorLevel;
//     };

//     return (

//         <div className="event_all">
//             <Header />
//             <div className="event_title">이벤트</div>
//             {/* {isAdmin && (<button className="event-post" onClick={openEventPost}>이벤트 등록하기</button>)} */}
//             {isPostModalOpen && <EventPost onClose={closeEventPost} />}

//             <div className="event_list">{/*이벤트목록 */}
//                 {events.map(event => (
//                     <div key={event.eventId} className="event_item" onClick={() => openEventModal(event.eventId)}>
//                         <div className="event_txt">{event.eventTitle}</div>
//                         <img src={event.eventImg} alt={event.eventTitle} />
//                     </div>
//                 ))}
//                 <div className="page_btn"><Pagination currentPage={currentPage}
//                     setCurrentPage={setCurrentPage} /></div>
//             </div>
//             {isEventModalOpen && (
//                 <div className="event-modal">
//                     <div className="event-content">
//                         {isAdmin && (<button onClick={deleteEvent}>삭제</button>)}
//                         <button onClick={closeEventModal}>닫기</button>
//                         <h2>{selectedEvent.eventTitle}</h2>
//                         <p>{selectedEvent.eventDetail}</p>
//                         <p>게시일: {selectedEvent.eventData}</p>
//                         <p>종료일: {selectedEvent.eventEnd}</p>
//                         <img src={selectedEvent.eventImg} />
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

import Header from "../component/Header";
import "../css/Event.css";
import React, { useState } from "react";
import EventPost from "../pages/EventPost";
import UserMark from "../pages/User-mark";
import Pagination from "../component/Pagination";

export default function Event() {
    const [events, setEvents] = useState([
        { id: 1, title: "장성군 이벤트", content: "내용", date: "2020-2-20~2020-3-10", eventimg: "https://i.pinimg.com/564x/ce/50/6f/ce506fa7dfd2e9900643f588ee4f2cad.jpg", requiredDonorLevel: 1 },
        { id: 2, title: "기부이벤트", content: "기부하면 장성군에서 감사해드립니다", date: "2020-05-05~2020-06-06", eventimg: "https://pbs.twimg.com/media/F-1CT6rakAE231j?format=jpg&name=small", requiredDonorLevel: 1 },
        { id: 3, title: "등급이벤트", content: "등급 이벤트 ", date: "2020-05-05~2020-06-06", eventimg: "https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fnebs1%2FbtqKgFEbkFN%2F1A84nt1VBjeHAKBrLRu4y0%2Fimg.jpg", requiredDonorLevel: 2 },
        { id: 4, title: "등급이벤트", content: "등급 이벤트 ", date: "2020-05-05~2020-06-06", eventimg: "https://cvws.icloud-content.com/B/Af-pIHxtfAucGCX1bSt8jJotR7obAcMzACOsmslx3LY2mHfQoGpnTkfV/PNG+%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png?o=Asyf0WHwHWfbDdjth8mlRaHx_K6zS5WRV25giMvIdLnW&v=1&x=3&a=CAogxRrCZI0hUmOi_uvQTe3FpUgBcd4kB6auRDqKLvD1mYUSbRCci9qt7TEYnOi1r-0xIgEAUgQtR7obWgRnTkfVaiZ9cgnW2zUVp_GE-yTLAruYVU6iBR6IkRjLlPhq6jij-L2GKegB3nIm6k49dKs1qb5W7idpey636p3H2UGv3lfdp59i7gWKmPfiaSHIsew&e=1712986092&fl=&r=44f252cf-01c3-4742-8d9e-930588f28fb6-1&k=spvqfhQgPlC_MN2CuXLgLA&ckc=com.apple.clouddocs&ckz=com.apple.CloudDocs&p=154&s=FLgZjEoyH8FLMMxLfXO3SBSkvAU&cd=i", requiredDonorLevel: 3 }
    ]);

    const [selectedEvent, setSelectedEvent] = useState(null);
    const isAdmin = true; //관리자 여부
    const [isEventModalOpen, setIsEventModalOpen] = useState(false);
    const [userLevel, setUserLevel] = useState(3); // 사용자의 기부자 등급 (임시로 설정) 1: 일반, 2: 기부자, 3: 10위권

    const openEventModal = async (eventId) => {
        try {
            const event = events.find(event => event.id === eventId);
            setSelectedEvent(event);
            setIsEventModalOpen(true);
        } catch (error) {
            console.error('이벤트 상세를 가져오는 중에 오류가 발생했습니다:', error);
        }
    };

    const closeEventModal = () => {
        setSelectedEvent(null);
        setIsEventModalOpen(false);
    };

    // 이벤트 등록 모달  
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);

    const openEventPost = () => {
        setIsPostModalOpen(true);
    };

    const closeEventPost = () => {
        setIsPostModalOpen(false);
    };

    return (
        <div className="event_all">
            <Header />
            <div className="event_title">이벤트</div>
            {isAdmin && (<button className="event-post" onClick={openEventPost}>이벤트 등록하기</button>)}
            {isPostModalOpen && <EventPost onClose={closeEventPost} />}
            <div className="event_list">{/*이벤트목록 */}
                {events.map(event => (
                    // 특정 등급 이벤트인 경우에만 렌더링
                    (userLevel >= event.requiredDonorLevel || !event.requiredDonorLevel) && (
                        <div key={event.id} className="event_item" onClick={() => openEventModal(event.id)}>
                            {event.requiredDonorLevel && event.requiredDonorLevel !== 1 && (
                                <span className="event_mark">
                                    {"<" +
                                        (event.requiredDonorLevel === 2 ? "☘️" :
                                            event.requiredDonorLevel === 3 ? "🍀" :
                                                "") + "등급 이상 전용>"
                                    }
                                </span>
                            )}
                            {event.title}<br />
                            {event.date}
                            <div className="event-img">
                                <img src={event.eventimg} />
                            </div>
                        </div>
                    )
                ))}
                
            </div>
            <div className="page_btn"><Pagination/></div> {/*페이지 넘기는거 컴포넌트만들 예정 */}
            {selectedEvent && isEventModalOpen && (
                <div className="event-modal">
                    <div className="event-content">
                        <button onClick={closeEventModal}>&times;</button>
                        <h2>{selectedEvent.title}</h2>
                        <p>{selectedEvent.date}</p>
                        <p>{selectedEvent.content}</p>
                        <img src={selectedEvent.eventimg} alt="Event" />
                    </div>
                </div>
            )}
        </div>
    );
}