import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // 로그인 상태 확인
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login"); // 로그아웃 후 로그인 화면으로 이동
  };

  return (
    <div className="navbar">
      {user ? (
        <div>
          <p>안녕하세요, {user.displayName}님!</p>
          <button onClick={handleLogout}>로그아웃</button>
        </div>
      ) : (
        <button onClick={() => navigate("/login")}>로그인</button>
      )}
    </div>
  );
};

export default Navbar;
