import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import './profile.css';
import { ChatContext } from '../App';

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { showChat, toggleChat } = useContext(ChatContext);


  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const userId = getUserIdFromToken(token);
          const response = await fetch(`/api/users/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (!response.ok) {
            throw new Error("Failed to fetch user data");
          }
          const userData = await response.json();
          setUser(userData);
        } catch (error) {
          setError(error.message);
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUser();
    toggleChat(false)
  }, []);

  function getUserIdFromToken(token) {
    if (!token) return null;
    try {
      const tokenPayload = parseJwt(token);
      return tokenPayload.user_id;
    } catch (error) {
      console.error("Error parsing JWT:", error);
      return null;
    }
  }

  function parseJwt(token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(base64));
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>No user data available</div>;
  }

  const handleModifyClick = () => {
    navigate('/modify-user', { state: { user } });
  };

  const handleCancelClick = () => {
    navigate('/');
  };

  return (
    <>
      <Navbar />
      <div className="profile-page">
        <div className="profile-header">
          <h1>Your Profile</h1>
        </div>
        <Card className="profile-card">
          <CardHeader>
            <CardTitle className="profile-title">Profile Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="profile-container">
              <img src={user.image || '/assets/images/personne.png'} alt="Profile" className="profile-image" />
              <div className="profile-info">
                <p><strong>First Name:</strong> {user.first_name}</p>
                <p><strong>Last Name:</strong> {user.last_name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Description:</strong> {user.description}</p>
                <p><strong>Telephone:</strong> {user.telephone}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="profile-footer">
            <button className="btn modify-btn text-black" onClick={handleModifyClick}>Modify</button>
            <button className="btn cancel-btn text-black" onClick={handleCancelClick}>Cancel</button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default Profile;
