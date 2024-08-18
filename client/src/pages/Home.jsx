import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
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

    // Optionally, navigate to the login page or another page
    navigate('/signin');
  };
  return (
    <div>
      <h1>Home Page</h1>
      {userData ? (
        <div>
          <p>Welcome, {userData.role} {userData.lastName}</p>
          <p>Email: {userData.email}</p>
          <div>
      <h1>Welcome to our website!</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
        </div>
        
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Home;
