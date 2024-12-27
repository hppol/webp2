import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("로그아웃 성공!");
      navigate("/login");
    } catch (error) {
      alert(`로그아웃 실패: ${error.message}`);
    }
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">My Movie App</Link>
      </div>
      <nav className="nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/recommendation">Recommendation</Link>
          </li>
          <li>
            <Link to="/search">Search</Link>
          </li>

          {/* 로그인 상태에 따른 메뉴 변경 */}
          {auth.currentUser ? (
            <>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/login" onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
