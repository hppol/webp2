import React, { useEffect, useState, useCallback } from "react";
import "./Recommendation.css";

const Recommendation = () => {
  const [movies, setMovies] = useState([]); // 영화 데이터를 저장
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [rating, setRating] = useState(8); // 기본 평점 8점 이상
  const [genre, setGenre] = useState("Action"); // 기본 장르는 액션
  const [year, setYear] = useState(2020); // 기본 연도 2020년
  const [isFilterOpen, setIsFilterOpen] = useState({
    rating: false,
    genre: false,
    year: false,
  }); // 필터 메뉴 상태

  // 영화 데이터를 가져오는 함수
  const fetchMovies = useCallback(async () => {
    try {
      const response = await fetch(
        `https://yts.mx/api/v2/list_movies.json?limit=10&minimum_rating=${rating}&genre=${genre}&year=${year}&sort_by=download_count`
      );
      const data = await response.json();
      if (data.status === "ok") {
        setMovies(data.data.movies || []); // undefined 방지
      } else {
        console.error("Failed to fetch movies:", data.status_message);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  }, [rating, genre, year]);

  // 컴포넌트 렌더링 시, 필터 값이 바뀔 때마다 영화 데이터를 새로 불러옴
  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  // 필터 버튼 상태 전환 함수
  const toggleFilterMenu = (filterType) => {
    setIsFilterOpen((prev) => ({
      ...prev,
      [filterType]: !prev[filterType],
    }));
  };

  return (
    <div className="recommendation-page">
      <h1 className="recommendation-title">추천 영화</h1>
      <p className="recommendation-description">
        원하는 평점, 장르, 연도를 선택해보세요!
      </p>

      {/* 필터링 옵션 */}
      <div className="filter-menu">
        {/* 평점 선택 */}
        <div className="filter-section">
          <button
            onClick={() => toggleFilterMenu("rating")}
            className="filter-button"
          >
            {rating} 이상
          </button>
          {isFilterOpen.rating && (
            <div className="filter-dropdown">
              {[5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9].map((rate) => (
                <button
                  key={rate}
                  onClick={() => {
                    setRating(rate);
                    toggleFilterMenu("rating"); // 선택 후 닫기
                  }}
                  className="filter-option"
                >
                  {rate} 이상
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 장르 선택 */}
        <div className="filter-section">
          <button
            onClick={() => toggleFilterMenu("genre")}
            className="filter-button"
          >
            {genre}
          </button>
          {isFilterOpen.genre && (
            <div className="filter-dropdown">
              {[
                "Action",
                "Comedy",
                "Drama",
                "Romance",
                "Sci-Fi",
                "Adventure",
                "Horror",
                "Fantasy",
                "Thriller",
                "Mystery",
                "Documentary",
              ].map((genreType) => (
                <button
                  key={genreType}
                  onClick={() => {
                    setGenre(genreType);
                    toggleFilterMenu("genre"); // 선택 후 닫기
                  }}
                  className="filter-option"
                >
                  {genreType}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 연도 선택 */}
        <div className="filter-section">
          <button
            onClick={() => toggleFilterMenu("year")}
            className="filter-button"
          >
            {year}년
          </button>
          {isFilterOpen.year && (
            <div className="filter-dropdown">
              {[...Array(35).keys()].map((i) => {
                const yearOption = 1990 + i;
                return (
                  <button
                    key={yearOption}
                    onClick={() => {
                      setYear(yearOption);
                      toggleFilterMenu("year"); // 선택 후 닫기
                    }}
                    className="filter-option"
                  >
                    {yearOption}년
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* 추천 영화 목록 */}
      {loading ? (
        <p>로딩 중...</p>
      ) : (
        <div className="recommendation-list">
          {movies && movies.length > 0 ? (
            movies.map((movie, index) => (
              <div key={index} className="recommendation-card">
                <img
                  src={movie.medium_cover_image}
                  alt={movie.title}
                  className="recommendation-image"
                />
                <div className="recommendation-info">
                  <h3 className="movie-title">{movie.title}</h3>
                  <p className="movie-year">{movie.year}년</p>
                  <p className="movie-description">
                    {movie.summary.length > 100
                      ? movie.summary.substring(0, 100) + "..."
                      : movie.summary}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>추천할 영화가 없습니다. 필터를 변경해보세요!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Recommendation;
