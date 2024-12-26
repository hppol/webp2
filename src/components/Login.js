import React from "react";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  return (
    <div className="login">
      <h1>로그인</h1>
      <form>
        <div className="form-group">
          <label htmlFor="email">이메일</label>
          <input type="email" id="email" placeholder="이메일을 입력하세요" />
        </div>
        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            placeholder="비밀번호를 입력하세요"
          />
        </div>
        <button type="submit">로그인</button>
      </form>
      <div className="signup-link">
        <p>아직 회원이 아니신가요?</p>
        <Link to="/signup">회원가입</Link>
      </div>
    </div>
  );
};

export default Login;
