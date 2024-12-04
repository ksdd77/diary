import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css"; // CSS 파일을 분리

// Navbar 컴포넌트
function Navbar() {
    return (
        <nav className="navbar">
            {/* 왼쪽 - 홈페이지 버튼 */}
            <div className="left-section">
                <Link to="/" className="nav-link">
                    홈
                </Link>
            </div>

            {/* 가운데 - 네비게이션 링크 */}
            <div className="center-section">
                <Link to="/diary" className="nav-link">
                    일기 작성
                </Link>
                <Link to="/photo-viewer" className="nav-link">
                    사진 뷰어
                </Link>
                <Link to="/analysis" className="nav-link">
                    분석 결과 공유
                </Link>
                <Link to="/chat" className="nav-link">
                    채팅
                </Link>
            </div>

            {/* 오른쪽 - 마이페이지, 로그인, 알림 */}
            <div className="right-section">
                <Link to="/mypage" className="nav-link">
                    마이페이지
                </Link>
                <Link to="/login" className="nav-link">
                    로그인
                </Link>
                <Link to="/notifications" className="nav-link">
                    알림
                </Link>
            </div>
        </nav>
    );
}

// App 컴포넌트
function App() {
    const [location, setLocation] = useState({
        latitude: null,
        longitude: null,
        country: '',
        region: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hasDeniedPermission, setHasDeniedPermission] = useState(false); // 권한 거부 상태 관리

    // 위치 정보를 요청하는 함수
    const requestLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation((prevLocation) => ({
                        ...prevLocation,
                        latitude,
                        longitude,
                    }));

                    // Reverse Geocoding API로 나라 및 지역 정보 가져오기
                    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
                        .then(response => response.json())
                        .then(data => {
                            setLocation((prevLocation) => ({
                                ...prevLocation,
                                country: data.countryName,
                                region: data.locality,
                            }));
                            setLoading(false);
                        })
                        .catch(error => {
                            console.error('Error fetching location data:', error);
                            setError('위치 정보를 가져오는 데 실패했습니다.');
                            setLoading(false);
                        });
                },
                (error) => {
                    console.error('Geolocation error:', error);
                    setError('위치 정보 접근을 거부했습니다.');
                    setLoading(false);
                    setHasDeniedPermission(true); // 권한 거부 시 상태 변경
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
            setLoading(false);
        }
    };

    // 처음에 위치 요청
    useEffect(() => {
        // Permissions API로 위치 권한 상태 확인
        if (navigator.permissions) {
            navigator.permissions.query({ name: 'geolocation' }).then((result) => {
                if (result.state === 'denied') {
                    setHasDeniedPermission(true); // 권한이 거부된 상태
                }
            });
        }

        requestLocation(); // 위치 요청
    }, []);

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={
                    <div className="home">
                        <h1 className="page-title">홈페이지</h1>

                        {loading && <p>위치 정보를 가져오는 중...</p>}

                        {error && <p style={{ color: 'red' }}>{error}</p>}

                        {location.latitude && location.longitude && !loading && !error ? (
                            <div>
                                <p>현재 위치:</p>
                                <p>위도: {location.latitude}</p>
                                <p>경도: {location.longitude}</p>
                                <p>국가: {location.country}</p>
                                <p>지역: {location.region}</p>
                            </div>
                        ) : (
                            !loading && !error && <p>위치 정보를 불러오는 중...</p>
                        )}

                        {/* 권한 거부 후 안내 메시지 */}
                        {hasDeniedPermission && (
                            <div>
                                <p>위치 정보 권한이 거부되었습니다. 브라우저 설정에서 권한을 허용해야 위치 정보를 요청할 수 있습니다.</p>
                                <p>브라우저 주소창에서 자물쇠 아이콘을 클릭하여 위치 권한을 변경하세요.</p>
                            </div>
                        )}
                    </div>
                } />
                <Route path="/diary" element={<h1 className="page-title">일기 작성 페이지</h1>} />
                
                <Route path="/photo-viewer" element={<h1 className="page-title">사진 뷰어 페이지</h1>} />
                <Route path="/analysis" element={<h1 className="page-title">분석 결과 공유 페이지</h1>} />
                <Route path="/chat" element={<h1 className="page-title">채팅 페이지</h1>} />
                <Route path="/mypage" element={<h1 className="page-title">마이페이지</h1>} />
                <Route path="/login" element={<h1 className="page-title">로그인 페이지</h1>} />
                <Route path="/notifications" element={<h1 className="page-title">알림 페이지</h1>} />
            </Routes>
        </Router>
    );
}

export default App;
