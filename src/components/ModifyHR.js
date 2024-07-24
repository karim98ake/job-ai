import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './navbarHR';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import './profile.css';

function ModifyUser() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = location.state || {};
  const [formData, setFormData] = useState({
    first_name: user ? user.first_name : '',
    last_name: user ? user.last_name : '',
    email: user ? user.email : '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!user) {
      navigate('/'); 
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const formDataToSend = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
      };
  
      const response = await fetch(`/api/collaborateur/${user.user_id}/edit/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
        body: JSON.stringify(formDataToSend),
      });
  
      if (response.ok) {
        navigate('/ProfileHR');
      } else {
        const errorData = await response.json();
        setErrors(errorData.errors); 
        console.error('Error updating user data:', errorData);
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };
  

  return (
    <>
      <Navbar />
      <div className="profile-page">
        <div className="profile-header">
          <h1>Modify collaborateur Information</h1>
        </div>
        <Card className="profile-card">
          <CardHeader>
            <CardTitle className="profile-title">Modify Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="profile-info">
              <div className="form-group">
                <label>First Name:</label>
                <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />
                {errors.first_name && <span className="error">{errors.first_name}</span>}
              </div>
              <div className="form-group">
                <label>Last Name:</label>
                <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />
                {errors.last_name && <span className="error">{errors.last_name}</span>}
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>
              <button type="submit" className="btn save-btn text-black">Save</button>
              <button type="button" className="btn cancel-btn text-black" onClick={() => navigate('/profile')}>Cancel</button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default ModifyUser;
