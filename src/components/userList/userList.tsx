import React from 'react';
import './userList.css';
import UserModel from '../../model/modelUser';

interface UserListProps {
  userProfiles: UserModel[];
  onUserClick: (username: string) => void;
}

const UserList: React.FC<UserListProps> = ({ userProfiles, onUserClick }) => {
  return (
    <ul className="user-list">
      {userProfiles.length > 0 ? (
        userProfiles.map((profile) => (
          <li key={profile.login} className="user-item">
            <img className="avatar" src={profile.avatar_url} alt={profile.login} />
            <span className="user-link">
              {profile.login}
            </span>
            <button className="user-btn" onClick={() => onUserClick(profile.login)}>
              <i className="fas fa-info-circle"></i> Detalles
            </button>
            <button className="user-btn">
              <a href={profile.html_url} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github"></i> GitHub
              </a>
            </button>
          </li>
        ))
      ) : (
        <p>No users found</p>
      )}
    </ul>
  );
};

export default UserList;
