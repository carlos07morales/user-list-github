import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './userDetails.css';
import { handleError } from '../../util/errorHandler';
import UserDetailModel from '../../model/modelUserDetail';
import business from '../../business/userBusiness';
import LoadingModal from '../loading/loadingModal';

const UserDetails: React.FC = () => {
  const navigate = useNavigate();
  const { username } = useParams<{ username: string }>();
  const [userDetail, setUserDetail] = useState<UserDetailModel | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (username) {
          const details = await business.getUserDetails(username);
          setUserDetail(details);
        }
      } catch (error) {
        handleError(error);
      }
    };

    fetchUserDetails();
  }, [username]);

  const handleBackClick = (name: string) => {
    navigate('/', { state: { query: name } });
  };
  

  if (!userDetail) {
    return <LoadingModal />;
  }

  return (
    <div className="user-details-container">
        <div className="user-details-card">
            <h2>{userDetail.name} <span>({userDetail.login})</span></h2>
            <img className="avatar" src={userDetail.avatar_url} alt={userDetail.login} />
            <div className="user-info">
            <p><strong>Compañía:</strong> <span>{userDetail.company || 'N/A'}</span></p>
            <p><strong>Ubicación:</strong> <span>{userDetail.location || 'N/A'}</span></p>
            <p><strong>Biografía:</strong> <span>{userDetail.bio || 'N/A'}</span></p>
            <p><strong>Repositorios Públicos:</strong> <span>{userDetail.public_repos}</span></p>
            <p><strong>Seguidores:</strong> <span>{userDetail.followers}</span></p>
            <p><strong>Siguiendo:</strong> <span>{userDetail.following}</span></p>
            <p><strong>Cuenta creada el:</strong> <span>{new Date(userDetail.created_at).toLocaleDateString()}</span></p>
            </div>
            <button className="back-button" onClick={() => handleBackClick(userDetail.name)}>
            <i className="fas fa-backward"></i> Volver
            </button>
        </div>
    </div>
  );
};

export default UserDetails;
