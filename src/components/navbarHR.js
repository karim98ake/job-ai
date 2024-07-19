import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo-med.svg";
import search from "../assets/search.svg";
import arrow from "../assets/arrow.svg";
import defaultUserImage from "../assets/user.svg"; // Add a default user image

function Navbar() {
  const [showNav, setShowNav] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      console.log("Retrieved token:", token);
      if (token) {
        try {
          const userId = getUserIdFromToken(token);
          console.log("User ID from token:", userId);
          const response = await fetch(`/api/collaborateur/${userId}/`, {  // Correct the URL here
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log("API response status:", response.status);
          if (!response.ok) {
            if (response.status === 404) {
              console.error("User not found");
            } else {
              console.error("Failed to fetch user data, status code:", response.status);
            }
            throw new Error("Failed to fetch user data");
          }
          const userData = await response.json();
          console.log("Fetched user data:", userData);
          setUser(userData);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUser();
  }, []);

  function getUserIdFromToken(token) {
    if (!token) return null;
    try {
      const tokenPayload = parseJwt(token);
      console.log("Token payload:", tokenPayload);
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
    navigate("/signin");
  };

  return (
    <nav className="flex justify-between items-center z-[10000]">
      <div className="logo flex-[1] flex items-center">
        <img src={logo} alt="Logo" />
      </div>
      <div
        className={
          showNav
            ? "flex items-center justify-between w-[80%] max-sm:shadow-xl list max-sm:hidden show"
            : "flex justify-between items-center flex-[1.4] max-sm:hidden list"
        }
      >
        <ul className="flex items-center mb-0 p-0 gap-10 font-medium">
          <li>
            <Link to="/HomeHR">Home</Link>
          </li>
          <li>
            <Link to="/add-job">Add Offer</Link>
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
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50">
                <Link to="/ProfileHR" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Profile</Link>
                <button 
                  onClick={handleLogout} 
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link to="/signin" className="btn text-black">
              Sign In
            </Link>
            <Link to="/signup" className="btn text-black">
              Sign Up
            </Link>
          </div>
        )}
      </div>
      <button
        onClick={() => setShowNav(!showNav)}
        className="bg-red-100 text-white w-fit hidden max-sm:flex max-sm:order-1"
      >
        <img src={search} alt="Search" />
      </button>
    </nav>
  );
}

export default Navbar;
