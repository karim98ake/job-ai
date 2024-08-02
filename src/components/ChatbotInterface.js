import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import './ChatbotInterface.css';
import Navbar from "./Navbar";
import JobCard from "./JobCard";
import RasaWebchat from './RasaWebchat';
import { ChatContext } from '../App';

function ChatbotInterface() {
  const { showChat, toggleChat } = useContext(ChatContext);
  const [job, setJob] = useState(null); 
  const navigate = useNavigate();
  const location = useLocation();

  const checkTokenExpiration = (token) => {
    if (!token) {
      return true; 
    }

    try {
      const decodedToken = jwtDecode(token);
      const exp = decodedToken.exp * 1000; 
      return Date.now() >= exp;
    } catch (error) {
      console.error("Error decoding token:", error);
      return true; 
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (checkTokenExpiration(token)) {
      navigate('/login', { replace: true });
      return;
    }

    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        navigate('/login');
      } else {
        sessionStorage.clear();
        
        if (location.state && location.state.job) {
          setJob(location.state.job);
        } else {
          navigate('/jobs'); 
        }
      }
    } else {
      navigate('/login');
    }
    toggleChat(true);
  }, [navigate, toggleChat, location.state]);

  return (
    <>
      <Navbar />
      <div className="w-full">
        <main className="py-10">
          <div className="search-job fixed left-0 h-[100vh] top-0 z-[10] pt-[35%] text-center flex flex-col bg-white max-sm:relative">
            <h2 className="text-start mb-6">Applied Job</h2>
            {job ? (
              <JobCard job={job} chatBot={true} /> 
            ) : (
              <p>Loading job information...</p>
            )}
          </div>
          <div id='chat-section' className="chat-section flex flex-wrap gap-3 items-center ml-[30%] mt-[5%]">
            {showChat && <RasaWebchat />}
          </div>
        </main>
      </div>
    </>
  );
}

export default ChatbotInterface;
