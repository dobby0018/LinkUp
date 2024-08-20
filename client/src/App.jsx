import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './pages/SignIn';
import Layout2 from './pages/SignUp';
import AdminAppBar from './components/admin/appbar2';
import HomeComponent from './components/admin/Home';
import ContactComponent from './components/admin/Contact';
import SettingsComponent from './components/admin/Settings';
import DashboardComponent from './components/admin/Dashboard';
import ProtectedRoute from './components/ProtectedRoutes';
import UserHome from './components/user/UserHome';
import Bookings from './components/user/Bookings';
function App() {
  const [loggedIn, setLoggedIn] = useState(window.localStorage.getItem('loggedIn') === 'true');
  const [userType, setUserType] = useState(window.localStorage.getItem('userType') || 'none');

  const handleLogin = (userType) => {
    window.localStorage.setItem('loggedIn', 'true');
    window.localStorage.setItem('userType', userType);
    setLoggedIn(true);
    setUserType(userType);
  };

  const handleLogout = () => {
    window.localStorage.setItem('loggedIn', 'false');
    window.localStorage.removeItem('userType');
    setLoggedIn(false);
    setUserType('none');
  };

  return (
    <Router>
      <div style={{ width: '100vw', height: '100vh' }}>
        {loggedIn && <AdminAppBar onLogout={handleLogout} userType={userType} />}
        {userType}
        <Routes>
          {/* Public routes */}
          {!loggedIn ? (
            <>
              <Route path="/signin" element={<Layout onLogin={(userType) => handleLogin(userType)} />} />
              <Route path="/signup" element={<Layout2 />} />
              <Route path="*" element={<Navigate to="/signin" />} /> {/* Catch-all route */}
            </>
          ) : (
            <>
              {/* Protected routes */}
              <Route element={<ProtectedRoute userType={userType} />}>
                {userType === 'admin' ? (
                  <>
                    <Route path="/admin/home" element={<HomeComponent />} />
                    <Route path="/admin/contact" element={<ContactComponent />} />
                    <Route path="/admin/dashboard" element={<DashboardComponent />} />
                    <Route path="/admin/settings" element={<SettingsComponent />} />
                    {/* Admin Catch-all */}
                    <Route path="*" element={<Navigate to="/admin/home" />} /> {/* Catch-all for admin */}
                  </>
                ) : (
                  <>
                    <Route path="/home" element={<UserHome />} />
                    <Route path="/mybookings" element={<Bookings />} />
                    {/* User Catch-all */}
                    <Route path="*" element={<Navigate to="/home" />} /> {/* Catch-all for users */}
                  </>
                )}
              </Route>
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
