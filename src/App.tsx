import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserProfiles from './components/search/userSearch';
import '@fortawesome/fontawesome-free/css/all.min.css';
import UserDetails from './components/userDetails/userDetails';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserProfiles />} />
        <Route path="/userDetails/:username" element={<UserDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
