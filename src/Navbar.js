import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    const [indicatorStyle, setIndicatorStyle] = useState({ left: "0px", width: "0px" });
    const location = useLocation();  // 현재 경로를 가져옵니다.

    // 페이지 로드와 경로 변경 시 한번만 인디케이터 위치 업데이트
    useEffect(() => {
        updateIndicator(location.pathname); // 초기 페이지 로드 시 인디케이터 설정
    }, []);  // 의존성 배열을 빈 배열로 설정하여 처음 로드될 때만 실행되게 함.


    // 리사이즈 이벤트 핸들러
    useEffect(() => {
        //TODO:24.11.29 페이지 로드와 경로 변경 시마다 인디케이터 위치 업데이트
        const handleResize = () => {
            updateIndicator(location.pathname);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);  // 컴포넌트가 unmount 될 때 이벤트 리스너 제거
        };
    }, [location.pathname]); // 경로 변경 시에도 리사이즈 이벤트가 작동하도록 추가 의존성

    // 인디케이터를 현재 경로에 맞게 업데이트하는 함수
    const updateIndicator = (path) => {
        const currentLink = document.querySelector(`.nav-link[data-path='${path}']`);
        if (currentLink) {
            const linkRect = currentLink.getBoundingClientRect();
            setIndicatorStyle({
                left: `${linkRect.left}px`,
                width: `${linkRect.width}px`,
            });
        }
    };


    const handleMouseEnter = (e) => {
        const link = e.target.getBoundingClientRect();
        document.documentElement.style.setProperty("--hover-left", `${link.left}px`);
        document.documentElement.style.setProperty("--hover-width", `${link.width}px`);
    };

    const handleMouseLeave = () => {
        document.documentElement.style.setProperty("--hover-left", "0px");
        document.documentElement.style.setProperty("--hover-width", "0px");
    };

    const handleClick = (e) => {
        const link = e.target.getBoundingClientRect();
        setIndicatorStyle({
            left: `${link.left}px`,
            width: `${link.width}px`,
        });
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link
                    to="/"
                    className="nav-link"
                    data-path="/"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                >
                    홈
                </Link>
            </div>

            <div className="navbar-center">
                <Link
                    to="/detail/:id"
                    className="nav-link"
                    data-path="/detail/:id"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                >
                    일기작성
                </Link>
                <Link
                    to="/photo-viewer"
                    className="nav-link"
                    data-path="/photo-viewer"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                >
                    사진뷰어
                </Link>
                <Link
                    to="/analysis"
                    className="nav-link"
                    data-path="/analysis"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                >
                    분석결과공유
                </Link>
                <Link
                    to="/chat"
                    className="nav-link"
                    data-path="/chat"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                >
                    채팅
                </Link>
            </div>

            <div className="navbar-right">
                <Link
                    to="/mypage"
                    className="nav-link"
                    data-path="/mypage"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                >
                    마이페이지
                </Link>
                <Link
                    to="/login"
                    className="nav-link"
                    data-path="/login"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                >
                    로그인
                </Link>
                <Link
                    to="/notifications"
                    className="nav-link"
                    data-path="/notifications"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                >
                    알림
                </Link>
            </div>

            {/* 클릭 시 인디케이터 */}
            <div className="menu-indicator" style={indicatorStyle}></div>

            {/* 마우스 호버 시 나타나는 효과 */}
            <div className="hover-indicator"></div>
        </nav>
    );
}

export default Navbar;

