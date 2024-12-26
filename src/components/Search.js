import React, { useState } from "react";
import "./Search.css";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() === "") {
      alert("검색어를 입력해주세요!");
      return;
    }
    // 검색 결과 더미 데이터
    const dummyResults = [
      "영화 1 - 액션",
      "영화 2 - 드라마",
      "영화 3 - 코미디",
      "영화 4 - 로맨스",
    ];
    setResults(dummyResults.filter((item) => item.includes(searchTerm)));
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
          {results.length > 0 ? (
            results.map((result, index) => (
              <div key={index} className="search-result-item">
                {result}
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
