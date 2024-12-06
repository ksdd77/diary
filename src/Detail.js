import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Calendar from "react-calendar"; // react-calendar 라이브러리 import
import "react-calendar/dist/Calendar.css"; // 스타일링을 위한 CSS import
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const Detail = () => {
    const { id } = useParams();
    const post = { 1: '첫 번째 글 내용', 2: '두 번째 글 내용' }[id];
    const [date, setDate] = useState(new Date());  // 캘린더에서 선택한 날짜 상태 관리
    const [isOpen, setIsOpen] = useState(false); // 캘린더 표시 여부 상태
    const [isProfileVisible, setIsProfileVisible] = useState(false); // 프로필 섹션 보이기/숨기기 상태
    
     // 미니 캘린더 클릭 시 캘린더 열고 닫기 (캘린더 외부 클릭 방지)
    //  const handleToggleCalendar = (e) => {
    //     e.stopPropagation(); // 이벤트가 부모 요소로 전파되지 않도록 방지
    //     setIsOpen(!isOpen); // 캘린더 열고 닫기
    // };
     // 날짜가 변경되었을 때 호출되는 함수
    //  const handleDateChange = (newDate) => {
    //     setDate(newDate);  // 선택된 날짜를 업데이트
    //     setIsOpen(false);   // 날짜가 변경되면 캘린더 닫기
    // };
    // 캘린더 내부 클릭 시 이벤트 전파 방지
    // const handleCalendarClick = (e) => {
    //     e.stopPropagation(); // 클릭 이벤트가 캘린더 외부로 전파되지 않도록 방지
    // };
   var [selectedDate, setSelectedDate] = useState(new Date());
   selectedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD 형식으로 변환 
    const [posts, setPosts] = useState([
        { id: 1, title: "첫 번째 게시글", author: "홍길동", date: selectedDate},
        { id: 2, title: "두 번째 게시글", author: "김철수", date: selectedDate},
        { id: 3, title: "세 번째 게시글", author: "이영희", date: selectedDate},
      ]);
    
    const filteredPosts = posts.filter(post => post.date === date.toLocaleDateString());
    const handleDateChange = (newDate) => {
        setSelectedDate(date);
        setDate(newDate);
        setIsOpen(false); 
    // const formattedDate = date.toISOString().split("T")[0]; // YYYY-MM-DD 형식으로 변환
        setPosts((prevPosts) =>
            prevPosts.map((post) => ({
            ...post,
            date: selectedDate
            }))
        );
    };
    
        // 햄버거 메뉴 클릭 시 프로필 섹션 보이기/숨기기
        const handleHamburgerClick = () => {
            setIsProfileVisible(!isProfileVisible);
        };
        const [title, setTitle] = useState('');
        const [author, setAuthor] = useState('');
        const [datetime, setDatetime] = useState('');
        const [content, setContent] = useState('');
        const handleSubmit = (e) => {
            e.preventDefault();
            const postData = {
                title,
                author,
                datetime,
                content,
            };
            console.log('게시글 데이터:', postData);
        };
        const styles = {
            header: {
              border: "1px solid #ddd",
              padding: "8px",
              backgroundColor: "#f4f4f4",
              textAlign: "left",
            },
            cell: {
              border: "1px solid #ddd",
              padding: "8px",
            }
        };


    return (
      <div className="homepage-container">
         <div className={`profile-section`}>
            <div>
                <Calendar 
                    onChange={handleDateChange} 
                    value={date}
                    calendarType="gregory" 
                />
                
            </div>
            <br></br>
            <div className="board-section">
                <h2>{date.toLocaleDateString()}의 게시글</h2>
                    <div style={{ margin: "9px",height:"100%"}}>
                        <table style={{ width: "105%", borderCollapse: "collapse", fontSize:"13px"}}>
                            <thead>
                            <tr>
                                <th style={styles.header}>번호</th>
                                <th style={styles.header}>제목</th>
                                <th style={styles.header}>작성자</th>
                                <th style={styles.header}>작성일</th>
                            </tr>
                            </thead>
                            <tbody>
                                {posts.map((post, index) => (
                                    <tr key={post.id}>
                                    <td style={styles.cell}>{index + 1}</td>
                                    <td style={styles.cell}>{post.title}</td>
                                    <td style={styles.cell}>{post.author}</td>
                                    <td style={styles.cell}>{post.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                {/* <ul>
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
                </ul> */}
            </div>    


         </div>
         <div className="calendar-section">
            <h2>일기 작성 페이지</h2>
            <p>오늘 하루는 어땠나요?</p>
            <label htmlFor="title">제목:</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <br></br>
                <label htmlFor="author">작성자:</label>
                <input
                    type="text"
                    id="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                />
                <br></br>
                <label htmlFor="datetime">작성일시:</label>
                <input
                    type="datetime-local"
                    id="datetime"
                    value={datetime}
                    onChange={(e) => setDatetime(e.target.value)}
                    required
                />
                <br></br>
                 <label htmlFor="content">내용</label>
                <br></br> 
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows="10"
                    required
                ></textarea>

                <button type="submit">작성</button>
              
         </div>
        
        {/* <h1>상세 페이지</h1>
        <p>{post}</p> */}
      </div>

      
  
    );
  };

  export default Detail;