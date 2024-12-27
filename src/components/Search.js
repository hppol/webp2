import React, { useState } from "react";
import "./Search.css";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
  const [results, setResults] = useState([]); // 검색 결과 상태
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(""); // 에러 상태

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim() === "") {
      alert("검색어를 입력해주세요!");
      return;
    }

    setLoading(true); // 로딩 시작
    setError(""); // 이전 에러 초기화
    setResults([]); // 이전 검색 결과 초기화

    try {
      const response = await fetch(
        `https://yts.mx/api/v2/list_movies.json?query_term=${searchTerm}&limit=20`
      );
      const data = await response.json();

      if (data.status === "ok") {
        setResults(data.data.movies || []); // 영화 결과가 없을 경우 빈 배열
      } else {
        setError("영화를 불러오는 중 문제가 발생했습니다.");
      }
    } catch (err) {
      setError("영화를 검색하는 중 오류가 발생했습니다.");
      console.error(err);
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  return (
    <div className="search-page">
      <div className="search-container">
        <h1 className="search-title">영화 검색</h1>
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="영화 제목을 입력하세요"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="search-button">
            검색
          </button>
        </form>
        <div className="search-results">
          {loading ? (
            <p>로딩 중...</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : results.length > 0 ? (
            results.map((movie) => (
              <div key={movie.id} className="search-result-item">
                <img
                  src={movie.medium_cover_image}
                  alt={movie.title}
                  className="result-image"
                />
                <div className="result-info">
                  <h3>{movie.title}</h3>
                  <p>평점: {movie.rating}</p>
                  <p>년도: {movie.year}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="no-results">검색 결과가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
