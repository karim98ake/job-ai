import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import JobList from './components/JobList';
import Login from './components/Login';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';
import ChatbotInterface from './components/ChatbotInterface';
import AddJobForm from './components/AddJobForm';
import ProtectedRoute from './components/ProtectedRoute';
import JobListRH from './components/Job_ListRH'; 
import CandidateList from './components/List_Candidat'; 
import EditJobForm from './components/EditJobForm';
import HomePage from "./components/HomePage";
import Profile from './components/Profile';
import ModifyUser from './components/ModifyUser';
import HomeHR from './components/HomeHR';
import ProfileHR from './components/ProfileHR';
import ModifyHR from './components/ModifyHR';




export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [showChat, setShowChat] = useState(false);

  const toggleChat = (boolean) => {
    setShowChat(boolean);
  };
  useEffect(() => {
    if (showChat) {
      document.body.classList.add('chat-active'); // Add class when chat is shown
    } else {
      document.body.classList.remove('chat-active'); // Remove class when chat is hidden
    }
  }, [showChat]);

  return (
    <ChatContext.Provider value={{ showChat, toggleChat }}>
      {children}
    </ChatContext.Provider>
  );
};

function App() {
  return (
    <Router>
            <ChatProvider>

      <Routes>
        <Route path="/job-list" element={
          <ProtectedRoute redirectTo="/login"><JobList /></ProtectedRoute>
        } />
        <Route path="/" element={<HomePage />} />
        <Route path='/add-job' element={
          <ProtectedRoute redirectTo="/signin"><AddJobForm /></ProtectedRoute>
        }/>
        <Route path="/login" element={<Login />} />
        <Route path="/HomeHR" element={<HomeHR />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/chatbot-interface" element={
          <ProtectedRoute redirectTo="/login"><ChatbotInterface /></ProtectedRoute>
        } />
        <Route path="/signup" element={<SignUpForm />} /> 
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/edit-job/:jobId" element={<EditJobForm />} />
        <Route path="/modify-user" element={<ModifyUser />} />
        <Route path="/modify-collaborateur" element={<ModifyHR />} />
        <Route path="/jobs" element={
          <ProtectedRoute redirectTo="/signin"><JobListRH /></ProtectedRoute>
        } />
        <Route path="/Profile" element={
          <ProtectedRoute redirectTo="/login"><Profile/></ProtectedRoute>
        } />
        <Route path="/ProfileHR" element={
          <ProtectedRoute redirectTo="/signin"><ProfileHR/></ProtectedRoute>
        } />
        
        <Route path="/jobs/:jobId/candidates" element={
          <ProtectedRoute redirectTo="/signin"><CandidateList /></ProtectedRoute>
        } />
      </Routes>
      </ChatProvider>
    </Router>
  );
}

export default App;
