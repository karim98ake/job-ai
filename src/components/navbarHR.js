import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { format } from 'date-fns';
import logo from "../assets/logo-med.svg";
import arrow from "../assets/arrow.svg";
import defaultUserImage from "../assets/user.svg";
import notificationIcon from "../assets/notification.svg";

function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

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
          console.log("User data:", userData);
          fetchNotifications(token);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    const fetchNotifications = async (token) => {
      try {
        console.log("Fetching notifications...");
        const response = await fetch(`/api/notifications/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch notifications");
        }
        const notificationsData = await response.json();
        setNotifications(notificationsData);
        console.log("Notifications data:", notificationsData);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchUser();
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const formatNotificationDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "PPPP p");
  };

  return (
    <nav className="flex justify-between items-center z-[10000]">
      <div className="logo flex-[1] flex items-center">
        <img src={logo} alt="Logo" />
      </div>
      <div className="flex justify-between items-center flex-[1.4] list">
        <ul className="flex items-center mb-0 p-0 gap-10 font-medium">
          <li>
            <Link to="/HomeHR">Home</Link>
          </li>
          <li>
            <Link to="/jobs">Jobs</Link>
          </li>
        </ul>
        {user ? (
          <div className="relative flex items-center gap-3">
            <img 
              src={user.image || defaultUserImage} 
              alt="User" 
              className="w-10 h-10 rounded-full object-cover"
            />
            <button 
              className="flex items-center gap-3" 
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <h6 className="text-[14px] mb-0">{`${user.first_name} ${user.last_name}`}</h6>
              <img src={arrow} alt="Arrow" />
            </button>
            {showDropdown && (
              <div className="absolute top-10 right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50">
                <Link to="/ProfileHR" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Profile</Link>
                <button 
                  onClick={handleLogout} 
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            )}
            <button
              className="relative"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <img src={notificationIcon} alt="Notifications" className="w-6 h-6" />
              {notifications.length > 0 && (
                <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full"></span>
              )}
            </button>
            {showNotifications && (
              <div className="absolute top-10 right-10 mt-2 w-64 bg-white shadow-lg rounded-md py-2 z-50">
                {notifications.length === 0 ? (
                  <p className="px-4 py-2 text-gray-800">No new notifications</p>
                ) : (
                  notifications.map((notification, index) => (
                    <div key={index} className="px-4 py-2 text-gray-800 hover:bg-gray-200">
                      {notification.message} on {formatNotificationDate(notification.interview_date)}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link to="/login" className="btn text-black">
              Sign In
            </Link>
            <Link to="/register" className="btn text-black">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
