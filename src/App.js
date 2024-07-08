import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import JobList from "./components/JobList";
import Login from "./components/Login";
import ChatbotInterface from "./components/ChatbotInterface";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./HomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/job-list"
          element={
            <JobList />
            // <ProtectedRoute>
            // </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Register />} />
        <Route path="/chatbot-interface" element={<ChatbotInterface />} />
      </Routes>
    </Router>
  );
}

export default App;
