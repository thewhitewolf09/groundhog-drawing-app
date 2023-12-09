import React from 'react';
import './UserListModal.scss';

const UserListModal = ({ users, onClose, onInvite }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>Session Participants</h2>
        <ul className="user-list">
          {users.map((user, index) => (
            <li key={index} className="user-item">
              <img src={user.profilePic} alt={user.name} className="user-profile-pic" />
              <span className="user-name">{user.name}</span>
            </li>
          ))}
        </ul>
        <button className="invite-btn" onClick={onInvite}>Invite More Users</button>
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default UserListModal;
