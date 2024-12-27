import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        } else {
          alert("사용자 데이터를 찾을 수 없습니다.");
        }
      } else {
        alert("로그인이 필요합니다.");
        navigate("/login");
      }
    };
    fetchUserData();
  }, [navigate]);

  return (
    <div>
      <h2>프로필</h2>
      {userData ? (
        <div>
          <p>닉네임: {userData.nickname}</p>
          <p>이메일: {userData.email}</p>
        </div>
      ) : (
        <p>로딩 중...</p>
      )}
    </div>
  );
};

export default Profile;
