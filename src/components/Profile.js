import React from "react";
import "./Profile.css";

const Profile = () => {
  const user = {
    name: "홍길동",
    email: "hong@example.com",
    joinedDate: "2023-01-01",
    profileImage: "https://via.placeholder.com/150",
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <img
          src={user.profileImage}
          alt="프로필 사진"
          className="profile-image"
        />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <p>가입일: {user.joinedDate}</p>
      </div>

      <div className="profile-actions">
        <button className="action-button">프로필 수정</button>
        <button className="action-button logout">로그아웃</button>
      </div>
    </div>
  );
};

export default Profile;
