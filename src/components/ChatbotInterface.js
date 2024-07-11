import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./ChatbotInterface.css";

import ReactPaginate from "react-paginate";
import axios from "axios";
import "./JobList.css";
import Navbar from "./Navbar";
import searchGray from "../assets/search-gray.svg";
import student from "../assets/student.svg";
import JobCard from "./JobCard";
import send from "../assets/send-gray.svg";

function ChatbotInterface() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [job, setJob] = useState({
    job_id: 1,
    job_title: "Software Engineer",
    job_description: "Develop and maintain web applications.",
    work_type: "Full-time",
    job_qualification: "JavaScript, React, Node.js, CSS",
    new: true,
    featured: true,
  });
  const [messages, setMessages] = useState([
    {
      user: true,
      text: "Hello! How can I help you today?",
      timestamp: "2024-07-11T09:00:00Z",
    },
    {
      user: false,
      text: "I need some assistance with my account.",
      timestamp: "2024-07-11T09:01:00Z",
    },
    {
      user: true,
      text: "Sure, I'd be happy to help. What seems to be the issue?",
      timestamp: "2024-07-11T09:02:00Z",
    },
    {
      user: false,
      text: "I'm having trouble logging in.",
      timestamp: "2024-07-11T09:03:00Z",
    },
    {
      user: true,
      text: "Sure, I'd be happy to help. What seems to be the issue?",
      timestamp: "2024-07-11T09:02:00Z",
    },
    {
      user: false,
      text: "I'm having trouble logging in.",
      timestamp: "2024-07-11T09:03:00Z",
    },
    {
      user: true,
      text: "Sure, I'd be happy to help. What seems to be the issue?",
      timestamp: "2024-07-11T09:02:00Z",
    },
    {
      user: false,
      text: "I'm having trouble logging in.",
      timestamp: "2024-07-11T09:03:00Z",
    },
    {
      user: true,
      text: "Sure, I'd be happy to help. What seems to be the issue?",
      timestamp: "2024-07-11T09:02:00Z",
    },
    {
      user: false,
      text: "I'm having trouble logging in.",
      timestamp: "2024-07-11T09:03:00Z",
    },
    {
      user: true,
      text: "Sure, I'd be happy to help. What seems to be the issue?",
      timestamp: "2024-07-11T09:02:00Z",
    },
    {
      user: false,
      text: "I'm having trouble logging in.",
      timestamp: "2024-07-11T09:03:00Z",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // const token = localStorage.getItem('token');
    // if (token) {
    //   const decodedToken = jwtDecode(token);
    //   const currentTime = Date.now() / 1000;
    //   if (decodedToken.exp < currentTime) {
    //     navigate('/login');
    //   } else {
    //     sessionStorage.clear();
    //   }
    // } else {
    //   navigate('/login');
    // }
  }, []);

  // const toggleChat = () => {
  //   setIsChatOpen(!isChatOpen);
  // };

  const sendMessage = async (message) => {
    // const token = localStorage.getItem("token");
    // const userId = jwtDecode(token).user_id;
    // const response = await fetch(
    //   "http://localhost:5005/webhooks/rest/webhook",
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${token}`,
    //     },
    //     body: JSON.stringify({
    //       sender: `user_${userId}`,
    //       message,
    //     }),
    //   }
    // );
    // const data = await response.json();
    // return data;
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    // if (!inputMessage.trim()) return;
    // const userMessage = {
    //   text: inputMessage,
    //   user: true,
    // };
    // setMessages([...messages, userMessage]);
    // setInputMessage("");
    // const responseMessages = await sendMessage(inputMessage);
    // const botMessages = responseMessages.map((msg) => ({
    //   text: msg.text,
    //   user: false,
    // }));
    // setMessages((prevMessages) => [...prevMessages, ...botMessages]);
  };

  return (
    <>
      <Navbar />
      <div className="w-full">
        <main className="py-10">
          <div className="search-job fixed left-0 h-[100vh] top-0 z-[10] pt-[35%]  text-center flex flex-col bg-white max-sm:relative ">
            <h2 className="text-start mb-6"> Applied Job </h2>

            <JobCard job={job} chatBot={true} />
          </div>
          <div className="cards-section flex flex-wrap gap-3 items-center ml-[30%] mt-[5%]">
            <form onSubmit={handleSendMessage} className="w-full">
              <div id="chatContainer" className="chat-container w-full">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`message ${msg.user ? "outgoing" : "incoming"}`}
                  >
                    <img
                      src={
                        msg.user
                          ? "/assets/images/personne.png"
                          : "/assets/images/logo.jpg"
                      }
                      alt="Avatar"
                      className="message-avatar"
                    />
                    <div className="message-content">{msg.text}</div>
                    <br />
                    <div className="message-time">
                      {new Date().toLocaleTimeString()}
                    </div>
                  </div>
                ))}
                <div className="message-input">
                  <div className="w-full bg-[#F7F9FB]">
                    <input
                      type="text"
                      className="w-[90%]"
                      id="messageInput"
                      placeholder="Type your message here..."
                      // value={inputMessage}
                      // onChange={(e) => setInputMessage(e.target.value)}
                    />
                    <button onClick={handleSendMessage}>
                      <img src={send} alt="" />
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>

      {/* <form onSubmit={handleSendMessage}>
        <div className={`chat-container ${isChatOpen ? "chat-open" : ""}`}>
          <div id="chatContainer" className="chat-container">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.user ? "outgoing" : "incoming"}`}
              >
                <img
                  src={
                    msg.user
                      ? "/assets/images/personne.png"
                      : "/assets/images/logo.jpg"
                  }
                  alt="Avatar"
                  className="message-avatar"
                />
                <div className="message-content">{msg.text}</div>
                <div className="message-time">
                  {new Date().toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
          <div className="message-input">
            <input
              type="text"
              id="messageInput"
              placeholder="Type your message here..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            />
            <button onClick={handleSendMessage}>
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </form> */}
    </>
  );
}

export default ChatbotInterface;
