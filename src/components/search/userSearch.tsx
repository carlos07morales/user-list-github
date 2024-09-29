import React, { useState } from 'react';
import './userSearch.css';
import business from '../../business/userBusiness';
import { handleError } from '../../util/errorHandler';
import UserList from '../userList/userList';
import UserModel from '../../model/modelUser';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingModal from '../loading/loadingModal';

const UserProfiles: React.FC = () => {
  const [userProfiles, setUserProfiles] = useState<UserModel[]>([]);
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (location.state && location.state.query) {
      setQuery(location.state.query);
      handleSearch(location.state.query);
    }
  }, [location.state]);

  const handleSearch = async (searchQuery?: string) => {
    try {
      setLoading(true);
      const profiles = await business.getUserProfiles(searchQuery || query);
      setUserProfiles(profiles);
      setLoading(false);
    } catch (error) {
      handleError(error);
    }
  };

  const handleUserClick = (username: string) => {
    navigate(`/userDetails/${username}`);
  };

  return (
    <div className="container">
      <h1 className="title">Búsqueda de usuarios en GitHub</h1>
      <div className="search-bar">
        <input
          className="search-input"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ingresa tu nombre de usuario en GitHub..."
        />
        <button className="search-button" onClick={ () => handleSearch()}>Buscar <i className="fas fa-search"></i></button>
      </div>
      {
        userProfiles.length > 0 && (
          <div className="scroll-container">
            <UserList userProfiles={userProfiles} onUserClick={handleUserClick} />
          </div>
        )
      }
      {
        loading ? <LoadingModal /> : null
      }
    </div>
  );
};

export default UserProfiles;
