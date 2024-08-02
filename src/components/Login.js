import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { ChatContext } from '../App';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const { showChat, toggleChat } = useContext(ChatContext);

  const checkTokenExpiration = (token) => {
    if (!token) {
      return false;
    }

    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const exp = decodedToken.exp * 1000;

      if (Date.now() >= exp) {
        localStorage.removeItem('token');
        return true;
      }

      return false;
    } catch (error) {
      console.error("Error decoding token:", error);
      localStorage.removeItem('token');
      return true;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const hasExpired = checkTokenExpiration(token);
      if (hasExpired) {
        navigate('/login', { replace: true });
      } else {
        const role = localStorage.getItem('role');
        if (role === 'candidate') {
          navigate('/job-list', { replace: true });
        } else if (role === 'professional') {
          navigate('/jobs', { replace: true });
        }
      }
    }
    toggleChat(false)
  }, [navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem('token');
      
      if (token) {
        const hasExpired = checkTokenExpiration(token);
        if (hasExpired) {
          navigate('/login', { replace: true });
        }
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/login/', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      if (!response.ok) {
        if (data.errors && data.errors.__all__) {
          setMessage(data.errors.__all__[0].message);
        } else {
          setMessage('Login failed');
        }
        return;
      }

      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);

        if (data.role === 'candidate') {
          navigate('/job-list');
        } else if (data.role === 'professional') {
          navigate('/jobs');
        }
      } else {
        setMessage('Invalid email or password');
      }
    } catch (error) {
      setMessage('Error during login: ' + error.message);
    }
  };


  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  return (
    <div className="login-container overflow-hidden w-[100vw]">
    <div className="card login-card w-[35%]" >
      <div className="card-body w-full">
        <div className="login-header">
          <img src="/assets/logo.jpg" alt="Logo" className="login-logo" />
        </div>  
        <h2 className="card-title">Welcome 👋</h2>
        <p className="login-message">Please login here</p>
        <form onSubmit={handleSubmit} className="form">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input type="email" className="form-control" id="email" value={email}
              onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" value={password}
              onChange={e => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
          <div className="text-center mt-4">
            Don't have an account? <Link to="/register">Sign Up</Link>
          </div>
        </form>
        {message && <div className="alert alert-danger" role="alert">{message}</div>}
      </div>
    </div>
    <div className="login-images overflow-hidden w-[100%] h-full relative ml-auto">
      <img className='absolute top-[11%] right-[-21%] z-20' src="/assets/home.svg" alt="Home Icon"  />
      <img className='absolute top-[-55%] right-[-25%] z-0' src="/assets/chat-empty.svg" alt="Chat Icon" />
      <img className='absolute top-[-20%] right-[-10%] z-10' src="/assets/Job-List.svg" alt="Job List Icon" />
    </div>
  
  </div>
);
}
export default Login;