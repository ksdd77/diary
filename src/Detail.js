import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Calendar from "react-calendar"; // react-calendar 라이브러리 import
import "react-calendar/dist/Calendar.css"; // 스타일링을 위한 CSS import
import moment from "moment";

const Detail = () => {
    const { id } = useParams();
    const post = { 1: '첫 번째 글 내용', 2: '두 번째 글 내용' }[id];
    const [date, setDate] = useState(new Date());  // 캘린더에서 선택한 날짜 상태 관리
    const [isOpen, setIsOpen] = useState(false); // 캘린더 표시 여부 상태
    const [isProfileVisible, setIsProfileVisible] = useState(false); // 프로필 섹션 보이기/숨기기 상태
     // 미니 캘린더 클릭 시 캘린더 열고 닫기 (캘린더 외부 클릭 방지)
     const handleToggleCalendar = (e) => {
        e.stopPropagation(); // 이벤트가 부모 요소로 전파되지 않도록 방지
        setIsOpen(!isOpen); // 캘린더 열고 닫기
    };
     // 날짜가 변경되었을 때 호출되는 함수
     const handleDateChange = (newDate) => {
        setDate(newDate);  // 선택된 날짜를 업데이트
        setIsOpen(false);   // 날짜가 변경되면 캘린더 닫기
    };
    // 캘린더 내부 클릭 시 이벤트 전파 방지
    const handleCalendarClick = (e) => {
        e.stopPropagation(); // 클릭 이벤트가 캘린더 외부로 전파되지 않도록 방지
    };
    const selectedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD 형식으로 변환
    const [posts] = useState([
        { date: '2024-12-01', content: '게시글 1' },
        { date: '2024-12-04', content: '게시글 2' },
      ]);
    const filteredPosts = posts.filter(post => post.date === date.toLocaleDateString());
   

    return (
      <div className="homepage-container">
         <div className={`profile-section`}>
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
            <div>
                <Calendar onChange={handleDateChange} value={date} />
                
            </div>
            <div className="board-section">
                <h2>{date.toLocaleDateString()}의 게시글</h2>
                <ul>
                    {filteredPosts.length > 0 ? (
                    filteredPosts.map((post, index) => <li key={index}>{post.content}</li>)
                    ) : (
                    <li>게시글이 없습니다.</li>
                    
                    )}
                </ul>
                <ul>
                    {filteredPosts.length > 0 ? (
                    filteredPosts.map((post, index) => <li key={index}>{post.content}</li>)
                    ) : (
                    <li>게시글이 없습니다.</li>
                    
                    )}
                </ul>
            </div>    


         </div>
         <div className="calendar-section">
            <h2>일기 작성 페이지</h2>
            <p>오늘 하루는 어땠나요?</p>

         </div>
        
        {/* <h1>상세 페이지</h1>
        <p>{post}</p> */}
      </div>

      
  
    );
  };

  export default Detail;