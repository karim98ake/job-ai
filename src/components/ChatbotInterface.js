import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Corrected import
import "./ChatbotInterface.css";

function ChatbotInterface() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
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
    // e.preventDefault();
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
    <form onSubmit={handleSendMessage}>
      <div className={`chat-container ${isChatOpen ? "chat-open" : ""}`}>
        <div className="header">
          <img
            src="/assets/images/logo.jpg"
            alt="Avatar"
            className="header-image"
          />
          <div className="chat-title">Mint Bot</div>
        </div>
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
    </form>
  );
}

export default ChatbotInterface;
