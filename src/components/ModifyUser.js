import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
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
    description: user ? user.description : '',
    cv: null,
    image: null,
    telephone: user ? user.telephone : '0000000000',
  });

  useEffect(() => {
    if (!user) {
      navigate('/'); // Redirect to home if no user data is available
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'cv' || name === 'image') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const formDataToSend = new FormData();
      formDataToSend.append('first_name', formData.first_name);
      formDataToSend.append('last_name', formData.last_name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('telephone', formData.telephone);
      if (formData.cv) {
        formDataToSend.append('cv', formData.cv);
      }
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      const response = await fetch(`/api/users/${user.user_id}/edit/`, {
        method: 'PUT',
        headers: {
          'Authorization': `Token ${token}`,
        },
        body: formDataToSend,
      });

      if (response.ok) {
        navigate('/profile');
      } else {
        const errorData = await response.json();
        console.error('Error updating user data:', errorData);
        throw new Error('Failed to update user data');
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
          <h1>Modify User Information</h1>
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
              </div>
              <div className="form-group">
                <label>Last Name:</label>
                <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Description:</label>
                <textarea name="description" value={formData.description} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Telephone:</label>
                <input type="text" name="telephone" value={formData.telephone} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>CV:</label>
                <input type="file" name="cv" accept=".pdf" onChange={handleChange} />
                {user && user.cv && (
                  <div>
                    <a href={user.cv} target="_blank" rel="noopener noreferrer">View current CV</a>
                  </div>
                )}
              </div>
              <div className="form-group">
                <label>Image:</label>
                <input type="file" name="image" accept="image/*" onChange={handleChange} />
                {user && user.image && (
                  <div>
                    <img src={user.image} alt="Current Profile" width="100" />
                  </div>
                )}
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <button type="submit" className="btn save-btn text-black" onClick={handleSubmit}>Save</button>
            <button type="button" className="btn cancel-btn text-black" onClick={() => navigate('/profile')}>Cancel</button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default ModifyUser;
