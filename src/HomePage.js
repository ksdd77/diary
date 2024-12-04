import React, { useState } from "react";
import Calendar from "react-calendar"; // react-calendar 라이브러리 import
import "react-calendar/dist/Calendar.css"; // 스타일링을 위한 CSS import
import "./HomePage.css";
import moment from "moment"; // 날짜 데이터 조작을 하기 쉽게 도와주는 라이브러리

function HomePage() {
    const [date, setDate] = useState(new Date());  // 캘린더에서 선택한 날짜 상태 관리
    const [isOpen, setIsOpen] = useState(false); // 캘린더 표시 여부 상태
    const [isProfileVisible, setIsProfileVisible] = useState(false); // 프로필 섹션 보이기/숨기기 상태

    // 날짜가 변경되었을 때 호출되는 함수
    const handleDateChange = (newDate) => {
        setDate(newDate);  // 선택된 날짜를 업데이트
        setIsOpen(false);   // 날짜가 변경되면 캘린더 닫기
    };

    // 미니 캘린더 클릭 시 캘린더 열고 닫기 (캘린더 외부 클릭 방지)
    const handleToggleCalendar = (e) => {
        e.stopPropagation(); // 이벤트가 부모 요소로 전파되지 않도록 방지
        setIsOpen(!isOpen); // 캘린더 열고 닫기
    };

    // 캘린더 내부 클릭 시 이벤트 전파 방지
    const handleCalendarClick = (e) => {
        e.stopPropagation(); // 클릭 이벤트가 캘린더 외부로 전파되지 않도록 방지
    };

    // 햄버거 메뉴 클릭 시 프로필 섹션 보이기/숨기기
    const handleHamburgerClick = () => {
        setIsProfileVisible(!isProfileVisible);
    };

    // profile-section 외부 클릭 시 프로필 닫기 - 모바일환경에서만 동작
    const handleProfileSectionClick = (e) => {
        // profile-section 외부 클릭 시 프로필 닫기
        if (!e.target.closest(".profile-section") && !e.target.closest(".hamburger-menu")) {
            setIsProfileVisible(false); // 프로필 숨기기
        }
    };

    return (
        <div
            className={`homepage-container ${isProfileVisible ? "blurred" : ""}`} // 프로필이 보일 때 배경 흐리게
            onClick={() => setIsOpen(false)} // 캘린더 외부 클릭 시 캘린더 닫기
            onClick1={handleProfileSectionClick} // 모바일에서 profile-section 외부 클릭 시 프로필 닫기
        >
            {/* 왼쪽 섹션: 프로필 */}
            <div className={`profile-section ${isProfileVisible ? "show" : ""}`}>
                <div>
                    <div className="profile">
                        <h3>닉네임(향후 회원 디비에서 가져옴)</h3>
                        <p>마이페이지(향후 링크 추가)</p>
                    </div>

                    {/* 미니 캘린더: 캘린더를 클릭하면 캘린더 열고 닫기 */}
                    <div className="mini_calendar" onClick={handleToggleCalendar}>
                        <span>{date.toLocaleDateString()}</span> {/* 현재 선택된 날짜 표시 */}
                        {/* 달력 표시 */}
                        {isOpen && (
                            <div className="calendar-dropdown" onClick={handleCalendarClick}>
                                <Calendar
                                    onChange={handleDateChange}  // 날짜 변경 시 핸들러
                                    value={date}  // 현재 선택된 날짜
                                    calendarType="gregory" // 요일을 일요일부터 시작하도록 설정
                                    formatDay={(locale, date) => moment(date).format("DD")} // "일" 빼기
                                />
                            </div>
                        )}
                    </div>

                    {/* 날씨 정보 구역: 날씨 정보를 표시할 예정 */}
                    <div className="weather-info">
                        <p>날씨 정보를 여기에 표시할 예정입니다.</p>
                    </div>

                    {/* 게시판 영역: 게시물 목록 표시 */}
                    <div className="board-section">
                        <h3>인기 결과 게시판</h3>
                        <ul className="board-list">
                            <li><a>게시물 1</a></li>
                            <li><a>게시물 2</a></li>
                            <li><a>게시물 3</a></li>
                            <li><a>게시물 4</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* 오른쪽 섹션: 캘린더 영역 */}
            <div className="calendar-section">
                {/* 햄버거 메뉴 버튼 */}
                <div className="hamburger-menu" onClick={handleHamburgerClick}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <h2>캘린더 영역</h2>
                <p>여기에 캘린더를 추가하세요.</p>
            </div>

        </div>
    );
}

export default HomePage;
