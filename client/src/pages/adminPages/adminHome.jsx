import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminAppBar from '../../components/admin/Appbar';
import HomeComponent from '../../components/admin/Home';
import ContactComponent from '../../components/admin/Contact';
import SettingsComponent from '../../components/admin/Settings';
import DashboardComponent from '../../components/admin/Dashboard';

const Home = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const [value, setValue] = useState(0);


  const fetchUserData = async () => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/users/home', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),  // Send token in the request body
      });

      const data = await response.json();  // Parse the response as JSON

      if (response.ok) {
        setUserData(data.userData);  // Store the received user data
        console.log('User data:', data.userData);
      } else {
        console.error('Failed to fetch user data:', data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    // Fetch the user data when the component mounts
    fetchUserData();
  }, []);
  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('loggedIn');
    // Optionally, navigate to the login page or another page
    navigate('/signin');
  };
  return (
    <div>
      <AdminAppBar value={value} setValue={setValue} handleLogout={handleLogout} />
      {value === 0 && <HomeComponent />}
      {value === 1 && <ContactComponent />}
      {value === 2 && <DashboardComponent />}
      {value === 3 && <SettingsComponent />}
    </div>
  );
};

export default Home;
