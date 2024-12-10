//import에도 순서가 있으므로 최대한 기능은 분리해서 하자
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";// 캘린더 밑 게시글 목록 호출위해 react-router-dom을 import함
import HomePage from "./HomePage"; // 새로 만든 HomePage 컴포넌트
import './App.css';
import Navbar from "./Navbar"; // Navbar 컴포넌트를 분리
import Detail from './Detail'; // 일기 작성 상세페이지
import { useEffect,useState } from "react";// 상태변수 import
import axios from "axios";

function App() {

    const [message, setMessage] = useState("");
        useEffect(() => {
            axios.get("http://localhost:8080/api/greeting")
                .then((response) => {
                    setMessage(response.data.message);
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        }, []);
        
    return (
        
        <Router>
             <switch>
            <Navbar />
            <Routes>
               
                <Route path="/" element={<HomePage />} />
                <Route path="/diary" element={<h1 className="page-title">일기 작성 페이지</h1>} />
                <Route path="/photo-viewer" element={<h1 className="page-title">사진 뷰어 페이지</h1>} />
                <Route path="/analysis" element={<h1 className="page-title">분석 결과 공유 페이지</h1>} />
                <Route path="/chat" element={<h1 className="page-title">채팅 페이지</h1>} />
                <Route path="/mypage" element={<h1 className="page-title">마이페이지</h1>} />
                <Route path="/login" element={<h1 className="page-title">로그인 페이지</h1>} />
                <Route path="/notifications" element={<h1 className="page-title">알림 페이지</h1>} />
                <Route path="/detail/:id" element={<Detail />}  />
                
            </Routes>
            </switch>
            <div>{message}</div>;
        </Router>
    );
}

export default App;
