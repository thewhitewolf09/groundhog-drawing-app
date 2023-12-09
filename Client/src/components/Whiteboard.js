import React, { useEffect, useState } from 'react';
import './Whiteboard.scss';
import UserListModal from './UserListModal'; // Assume you have this component

const Whiteboard = ({ userList, onInvite }) => {
  const [isUserListModalOpen, setUserListModalOpen] = useState(false);
  const [lastSaveTime, setLastSaveTime] = useState(null);
  const [saveTimeText, setSaveTimeText] = useState('Saved 1 second Ago');

  const handleUserListClick = () => {
    setUserListModalOpen(true);
  };

  const handleCloseModal = () => {
    setUserListModalOpen(false);
  };


  // Dummy function to simulate saving
  const saveDrawing = () => {
    const now = new Date();
    setLastSaveTime(now);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (lastSaveTime) {
        const now = new Date();
        const secondsAgo = Math.round((now - lastSaveTime) / 1000);
        setSaveTimeText(`Saved ${secondsAgo}s ago`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lastSaveTime]);

  return (
    <div className="whiteboard-container">
     <div className="user-list">
        {userList.slice(0, 3).map((user, index) => (
          <img key={index} src={user.profilePic} alt={user.name} className="user-profile-pic" />
        ))}
        {userList.length > 3 && (
          <button className="more-users-btn" onClick={handleUserListClick}>
            +{userList.length - 3} more
          </button>
        )}

        <div className="save-time-text">{saveTimeText}</div>
      </div>
      {isUserListModalOpen && <UserListModal users={userList} onClose={handleCloseModal} onInvite={onInvite} />}
      <div className="whiteboard">
        {/* Canvas or drawing area goes here */}
        
      </div>
    </div>
  );
};

export default Whiteboard;
