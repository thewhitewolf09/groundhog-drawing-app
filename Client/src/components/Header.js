import React, { useState } from "react";
import "./Header.scss";
import ProfilePic from "./../assets/blank-profile-picture-973460.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverurl } from '..//url';

const Header = ({ onNewCanvas, onJoinSession, onLoadCanvas}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const onLogout =async()=>{
    
    try {
      await axios.get(`${serverurl}/api/v1/logout`);
      navigate("/");; // Replace 'Login' with your login screen route name
    } catch (error) {
      console.error('Logout error:', error);
      // Handle error
    }
  }

  return (
    <header className="header">
      <div className="header-logo">GroundHog</div>
      <nav className="header-nav">
        <button onClick={onNewCanvas}>Start New Canvas</button>
        <button onClick={onJoinSession}>Join Existing Session</button>
        <button onClick={onLoadCanvas}>Load Saved Canvas</button>
        <div className="header-profile">
          <img
            src={ProfilePic} // Replace with path to user's profile image
            alt="Profile"
            className="profile-image"
            onClick={toggleDropdown}
          />
          {dropdownOpen && (
            <div className="profile-dropdown">
              <button onClick={onLogout}>Logout</button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
