import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import './profile.css';
import { ChatContext } from '../App';

const checkTokenExpiration = (token) => {
  if (!token) {
    return true; 
  }

  try {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const exp = decodedToken.exp * 1000; 
    return Date.now() >= exp;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true; 
  }
};

const parseJwt = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  } catch (error) {
    console.error("Error parsing JWT:", error);
    return null;
  }
};

function Profile() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { showChat, toggleChat } = useContext(ChatContext);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        if (checkTokenExpiration(token)) {
          navigate('/login', { replace: true });
          return;
        }

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
          const decodedToken = parseJwt(token);
          setRole(decodedToken.role);
        } catch (error) {
          setError(error.message);
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
        navigate('/login', { replace: true });
      }
    };

    fetchUser();
    toggleChat(false);
  }, [navigate, toggleChat]);

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
    navigate('/job-list');
  };

  return (
    <>
      <Navbar />
      <div className="mt-[5%] max-sm:mt-[20%]">
        <div className="w-[90%] mx-auto py-10">
          <h2 className="profile-title text-start mb-10 max-sm:mb-6">
            Profile Information
          </h2>
          <Card className="profile-card">
            <CardHeader>
              <CardTitle className="profile-title">Personal Info</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-6 max-sm:flex-col mb-4">
                <div className="w-[20%] max-sm:w-full h-[200px] border border-gray-400 rounded-lg relative mb-4 p-4">
                  <div className="text-center">
                    <img src={user.image || '/assets/images/personne.png'} className="avatar img-circle img-thumbnail" alt="Profile" />
                  </div>
                </div>
                <div className="w-[80%] max-sm:w-full">
                  <div className="flex w-full gap-6 max-sm:gap-2 max-sm:flex-col mb-4">
                    <div className="form__div mb-0 flex-1 ">
                      <input
                        className="form__input w-full"
                        type="text"
                        name="first_name"
                        value={user.first_name}
                        readOnly
                      />
                      <label className="form__label">First Name</label>
                    </div>
                    <div className="form__div mb-0 flex-1">
                      <input
                        className="form__input w-full"
                        type="text"
                        name="last_name"
                        value={user.last_name}
                        readOnly
                      />
                      <label className="form__label">Last Name</label>
                    </div>
                  </div>
                  <div className="flex w-full gap-6 max-sm:gap-2 max-sm:flex-col mb-4 ">
                    <div className="form__div mb-0 flex-1">
                      <input
                        className="form__input w-full"
                        type="email"
                        name="email"
                        value={user.email}
                        readOnly
                      />
                      <label className="form__label">Email</label>
                    </div>
                    <div className="form__div mb-0 flex-1">
                      <input
                        className="form__input w-full"
                        type="text"
                        name="telephone"
                        value={user.telephone}
                        readOnly
                      />
                      <label className="form__label">Telephone</label>
                    </div>
                  </div>
                  <div className="form__div mb-0 text-area my-4">
                    <textarea
                      name="description"
                      value={user.description}
                      className="form__input w-full"
                      readOnly
                    />
                    <label className="form__label">Description</label>
                  </div>
                  <div className="rounded-md border border-red-500 bg-gray-50 p-4  mt-4 shadow-md w-full mb-4">
                    <label className="flex flex-col items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 fill-white border-red-500"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <span className="text-gray-600 font-medium">CV</span>
                    </label>
                    {user.cv && (
                      <div>
                        <a href={user.cv} target="_blank" rel="noopener noreferrer">View current CV</a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="profile-footer">
              <button className="btn submit-btn" onClick={handleModifyClick}>Modify</button>
              <button className="btn cancel-btn text-black" onClick={handleCancelClick}>Cancel</button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Profile;