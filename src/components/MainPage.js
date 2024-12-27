import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import "./MainPage.css";

const MainPage = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [userName, setUserName] = useState(null);

  // API 호출 함수
  const fetchMovies = async () => {
    try {
      const response = await fetch(
        "https://yts.mx/api/v2/list_movies.json?limit=50&minimum_rating=8&sort_by=download_count"
      );
      const data = await response.json();
      if (data.status === "ok") {
        setMovies(data.data.movies);
        setFilteredMovies(data.data.movies); // 초기값 설정
      } else {
        console.error("Failed to fetch movies:", data.status_message);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  // 장르 필터링 함수
  const filterMoviesByGenre = (genre) => {
    setSelectedGenre(genre);
    if (genre === "All") {
      setFilteredMovies(movies);
    } else {
      const filtered = movies.filter(
        (movie) => movie.genres && movie.genres.includes(genre)
      );
      setFilteredMovies(filtered);
    }
  };

  useEffect(() => {
    fetchMovies();

    // 로그인 상태 확인
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName || user.email); // 닉네임 또는 이메일 표시
      } else {
        setUserName(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="main-page">
      {/* Hero Section */}
      <header className="hero-section">
        <h1>
          {userName
            ? `${userName}님을 위한 영화 추천`
            : "당신을 위한 영화 추천"}
        </h1>
        <p>사용자 취향에 기반한 맞춤형 영화 추천 서비스를 제공합니다.</p>
      </header>

      {/* Genre Section */}
      <section className="genre-section">
        <h2>장르별 인기 영화</h2>
        <div className="genre-list">
          {["All", "Action", "Comedy", "Drama", "Romance", "Sci-Fi"].map(
            (genre) => (
              <button
                key={genre}
                className={`genre-button ${
                  selectedGenre === genre ? "active" : ""
                }`}
                onClick={() => filterMoviesByGenre(genre)}
              >
                {genre}
              </button>
            )
          )}
        </div>
      </section>

      {/* Recommendation Section */}
      <section className="recommendation-section">
        <h2>추천 영화</h2>
        {loading ? (
          <p>로딩 중...</p>
        ) : (
          <div className="movie-grid">
            {filteredMovies.length > 0 ? (
              filteredMovies.map((movie) => (
                <div key={movie.id} className="movie-card">
                  <img
                    src={movie.medium_cover_image}
                    alt={movie.title}
                    className="movie-poster"
                  />
                  <div className="movie-info">
                    <h3>{movie.title}</h3>
                    <p>
                      장르:{" "}
                      {movie.genres ? movie.genres.join(", ") : "정보 없음"}
                    </p>
                    <p>평점: ⭐ {movie.rating}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>해당 장르의 영화가 없습니다.</p>
            )}
          </div>
        )}
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <p>© 2024 Movie Recommender. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MainPage;
