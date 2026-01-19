import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProfileView from './components/ProfileView';
import AllProfiles from './components/AllProfiles';
import CreateProfile from './components/CreateProfile';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          {/* Home - Featured Profile (Vashu Kumar) */}
          <Route path="/" element={<ProfileView featured={true} />} />
          
          {/* All Profiles Directory */}
          <Route path="/all" element={<AllProfiles />} />
          
          {/* Individual Profile by Username */}
          <Route path="/user/:username" element={<ProfileView />} />
          
          {/* Create New Profile */}
          <Route path="/join" element={<CreateProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
