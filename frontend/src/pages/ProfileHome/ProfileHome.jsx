import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfileHome = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('UserAuth');

        if (!token) {
          
          navigate('/login');
          return;
        }

        const response = await axios.get('http://localhost:3000/auth/userDetails', {
          headers: {
            Authorization: token,
          },
        });

        setUserData(response.data.user);
      } catch (error) {
        console.error('Error fetching user details:', error);

        navigate('/login');
      }
    };

    fetchUserData();

  }, []);

  const handleLogout = () => {

    localStorage.removeItem('UserAuth');

    navigate('/login');
  };

  return (
    <div className="container mx-auto mt-20 p-6 bg-white rounded-md shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Profile Home</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      {userData ? (
        <div>
          <p>Welcome, {userData.username}!</p>
          <p>Email: {userData.email}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default ProfileHome;
