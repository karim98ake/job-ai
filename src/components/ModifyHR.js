import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './navbarHR';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import './profile.css';

const checkTokenExpiration = (token) => {
  if (!token) {
    return true;
  }

  try {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const exp = decodedToken.exp * 1000;
    return Date.now() >= exp;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true;
  }
};

function ModifyUser() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = location.state || {};
  const [formData, setFormData] = useState({
    first_name: user ? user.first_name : '',
    last_name: user ? user.last_name : '',
    email: user ? user.email : '',
    telephone: user ? user.telephone : '',
    description: user ? user.description : '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!user) {
      navigate('/');
    }

    const token = localStorage.getItem('token');
    if (checkTokenExpiration(token)) {
      navigate('/signin', { replace: true });
      return;
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
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
        telephone: formData.telephone,
        description: formData.description,
      };
<<<<<<< HEAD
  
=======

>>>>>>> d1991f9a2ebcfa37f146d6bd8cd8b387591a2b2d
      const response = await fetch(`/api/users/${user.user_id}/edit/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
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
      <div className="mt-[5%] max-sm:mt-[20%]">
        <div className="w-[90%] mx-auto py-10">
          <h2 className="profile-title text-start mb-10 max-sm:mb-6">
<<<<<<< HEAD
            Modify collaborateur Information
          </h2>
          <Card className="profile-card">
            <CardHeader>
              <CardTitle className="profile-title">Modify Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="profile-info">
                <div className="flex gap-6 max-sm:flex-col mb-4">
                  <div className="form__div mb-0 flex-1 ">
                    <input
                      className="form__input w-full"
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      required
                    />
                    <label className="form__label">First Name</label>
                    {errors.first_name && <span className="error">{errors.first_name}</span>}
                  </div>
                  <div className="form__div mb-0 flex-1">
                    <input
                      className="form__input w-full"
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      required
                    />
                    <label className="form__label">Last Name</label>
                    {errors.last_name && <span className="error">{errors.last_name}</span>}
                  </div>
                </div>
                <div className="flex w-full gap-6 max-sm:gap-2 max-sm:flex-col mb-4 ">
                  <div className="form__div mb-0 flex-1">
                    <input
                      className="form__input w-full"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    <label className="form__label">Email</label>
                    {errors.email && <span className="error">{errors.email}</span>}
                  </div>
                  <div className="form__div mb-0 flex-1">
                    <input
                      className="form__input w-full"
                      type="text"
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleChange}
                      required
                    />
                    <label className="form__label">Telephone</label>
                    {errors.telephone && <span className="error">{errors.telephone}</span>}
                  </div>
                </div>
                <div className="form__div mb-0 text-area my-4">
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="form__input w-full"
                    required
                  />
                  <label className="form__label">Description</label>
                  {errors.description && <span className="error">{errors.description}</span>}
                </div>
                <CardFooter className="profile-footer">
                  <button type="submit" className="btn save-btn text-black">Save</button>
                  <button type="button" className="btn cancel-btn text-black" onClick={() => navigate('/profile')}>Cancel</button>
                </CardFooter>
              </form>
=======
            Modify User Information
          </h2>
          <Card className="profile-card">
            <CardHeader>
              <CardTitle className="profile-title">Personal Info</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-6 max-sm:flex-col mb-4">
                <div className="w-[20%] max-sm:w-full h-[200px] border border-gray-400 rounded-lg relative mb-4 p-4">
                  <div className="text-center">
                    <img src={user.image || 'https://bootdey.com/img/Content/avatar/avatar7.png'} className="avatar img-circle img-thumbnail" alt="Profile" />
                  </div>
                </div>
                <div className="w-[80%] max-sm:w-full">
                  <form className="form-horizontal" role="form" onSubmit={handleSubmit}>
                    <div className="flex w-full gap-6 max-sm:gap-2 max-sm:flex-col mb-4">
                      <div className="form__div mb-0 flex-1 ">
                        <input
                          className="form__input w-full"
                          type="text"
                          name="first_name"
                          value={formData.first_name}
                          onChange={handleChange}
                          required
                        />
                        <label className="form__label">First Name</label>
                        {errors.first_name && <span className="error">{errors.first_name}</span>}
                      </div>
                      <div className="form__div mb-0 flex-1">
                        <input
                          className="form__input w-full"
                          type="text"
                          name="last_name"
                          value={formData.last_name}
                          onChange={handleChange}
                          required
                        />
                        <label className="form__label">Last Name</label>
                        {errors.last_name && <span className="error">{errors.last_name}</span>}
                      </div>
                    </div>
                    <div className="flex w-full gap-6 max-sm:gap-2 max-sm:flex-col mb-4 ">
                      <div className="form__div mb-0 flex-1">
                        <input
                          className="form__input w-full"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                        <label className="form__label">Email</label>
                        {errors.email && <span className="error">{errors.email}</span>}
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="btn cancel-btn text-black"
                        onClick={() => navigate("/profile")}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="btn save-btn text-black"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
>>>>>>> d1991f9a2ebcfa37f146d6bd8cd8b387591a2b2d
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

export default ModifyUser;
