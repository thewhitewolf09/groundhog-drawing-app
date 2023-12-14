import React, { useEffect, useState } from "react";
import Header from "..//components/Header";
import Whiteboard from "..//components/Whiteboard";
import Toolbox from "..//components/Toolbox";
import ProfilePic from "../assets/blank-profile-picture-973460.svg";
import "./MainPage.scss";
import axios from 'axios';
import { serverurl } from '..//url';

const MainPage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  // Placeholder functions for component actions. Replace with actual logic.
  const handleStartNewCanvas = () => {
    /* ... */
  };
  const handleJoinExistingSession = () => {
    /* ... */
  };
  const handleLoadSavedCanvas = () => {
    /* ... */
  };
  const handleLogout = () => {
    /* ... */
  };
  const handleInvite = () => {
    /* ... */
  };
  const handleSave = () => {
    /* ... */
  };
  const handleLeaveSession = () => {
    /* ... */
  };
  const handleColorPick = (event) => {
    /* ... */
  };
  const handleBasicColorPick = (event) => {
    /* ... */
  };
  const handlePenClick = () => {
    /* ... */
  };
  const handleEraserClick = () => {
    /* ... */
  };

  // Dummy user list for Whiteboard users display
  const userList = [
    { name: "User1", profilePic: ProfilePic },
    { name: "User2", profilePic: ProfilePic },
    { name: "User3", profilePic: ProfilePic },
    { name: "User4", profilePic: ProfilePic },
    { name: "User5", profilePic: ProfilePic },
    { name: "User6", profilePic: ProfilePic },
    { name: "User1", profilePic: ProfilePic },
    { name: "User2", profilePic: ProfilePic },
    { name: "User3", profilePic: ProfilePic },
    { name: "User4", profilePic: ProfilePic },
    { name: "User5", profilePic: ProfilePic },
    { name: "User6", profilePic: ProfilePic },
    // ...more users
  ];



  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${serverurl}/api/v1/user/profile`, { withCredentials: true });
      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  };
  

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchUserData();
        setUserData(data);
      } catch (error) {
        // Handle error (e.g., redirect to login page)
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Or any loading indicator
  }

  console.log(userData);


  return (
    <div className="main-page">
      <Header
        onNewCanvas={handleStartNewCanvas}
        onJoinSession={handleJoinExistingSession}
        onLoadCanvas={handleLoadSavedCanvas}
        onLogout={handleLogout}
      />
      <div className="main-content">
        <Whiteboard userList={userList} onInvite={handleInvite} />
        <Toolbox
          onPenClick={handlePenClick}
          onEraserClick={handleEraserClick}
          onSave={handleSave}
          onLeave={handleLeaveSession}
          onColorPick={handleColorPick}
          onColorSelect ={handleBasicColorPick}
        />
      </div>
      {/* <footer className="footer">
        &copy; {new Date().getFullYear()} GroundHog. All rights reserved.
      </footer> */}
    </div>
  );
};

export default MainPage;
