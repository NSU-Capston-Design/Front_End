import Header from "../component/Header";
import "../css/Event.css";

export default function Event() {

    return (

        <div className="event_all">
            <Header/>
            <div className="event_title">이벤트</div>
            <div className="event_list">{/*이벤트목록 */}
                <div className="event_1">
                    <div className="event_txt">장성군 이벤트!<br />
                        <br />
                        내용
                    </div>
                </div>
                <div className="event_2">
                    <div className="event_txt">
                        기부이벤트<br />
                        <br />
                        기부하면 장성군에서 감사해드립니다
                    </div>
                    <div className="page_btn"></div> {/*페이지 넘기는거 컴포넌트만들 예정 */}
                </div>
            </div>
        </div>
    )
}