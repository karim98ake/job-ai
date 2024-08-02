import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [description, setDescription] = useState("");
  const [telephone, setTelephone] = useState("");
  const [cv, setCv] = useState(null);
  const [image, setImage] = useState(null);
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirm_password", confirmPassword);
    formData.append("description", description);
    formData.append("telephone", telephone);
    formData.append("role", role);
    if (role === "candidate" && cv) {
      formData.append("cv", cv);
    }
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await fetch("http://localhost:8000/register/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.errors);
        return;
      }

      const data = await response.json();
      if (data.success) {
        navigate("/login");
      } else {
        toast.error(data.errors);
      }
    } catch (error) {
      toast.error("Error during request: " + error.message);
    }
  };

  return (
    <div className="common-container">
      <ToastContainer />
      <div className="common-card login-card">
        <div className="card-body w-full">
          <div className="login-header">
            <img src="/assets/logo.jpg" alt="Logo" className="login-logo" />
          </div>
          <h2 className="register-card-title" style={{ marginTop: '5%' }}>Create an Account</h2>
          <p className="login-message">Please register here</p>
          <form onSubmit={handleSubmit} className="register-form">
            <div className="register-form-control">
              <label htmlFor="first-name" className="login-form-label">First Name</label>
              <input
                type="text"
                id="first-name"
                className="common-form-control"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="register-form-control">
              <label htmlFor="last-name" className="login-form-label">Last Name</label>
              <input
                type="text"
                id="last-name"
                className="common-form-control"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="register-form-control">
              <label htmlFor="email" className="login-form-label">Email</label>
              <input
                type="email"
                id="email"
                className="common-form-control"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="register-form-control">
              <label htmlFor="password" className="login-form-label">Password</label>
              <input
                type="password"
                id="password"
                className="common-form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="register-form-control">
              <label htmlFor="confirm-password" className="login-form-label">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                className="common-form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="register-form-control">
              <label htmlFor="description" className="login-form-label">Description</label>
              <input
                type="text"
                id="description"
                className="common-form-control"
                placeholder="Enter your description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="register-form-control">
              <label htmlFor="telephone" className="login-form-label">Phone number</label>
              <input
                type="text"
                id="telephone"
                className="common-form-control"
                placeholder="Enter your phone number"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
              />
            </div>
            <div className="register-form-control">
              <label htmlFor="role" className="login-form-label">Role</label>
              <select
                id="role"
                className="common-form-control"
                style={{ marginTop: '1%', width: '100%' }}
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="">Select Role</option>
                <option value="candidate">Candidate</option>
                <option value="professional">Professional</option>
              </select>
            </div>
            {role === "candidate" && (
              <div className="register-form-control">
                <label htmlFor="cv" className="login-form-label">Upload CV</label>
                <input
                  type="file"
                  id="cv"
                  className="common-form-control"
                  style={{ width: '100%' }}
                  onChange={(e) => setCv(e.target.files[0])}
                />
              </div>
            )}
            <div className="register-form-control">
              <label htmlFor="image" className="login-form-label">Upload Image</label>
              <input
                type="file"
                id="image"
                className="common-form-control"
                style={{ width: '100%' }}
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <button type="submit" className="common-btn-primary w-100" style={{ marginTop: '5%' }}>Create an Account</button>
            <div className="mt-4 text-center text-sm">
              Already have an account? <Link to="/login" className="text-decoration-none">Sign in</Link>
            </div>
          </form>
        </div>
      </div>
      <div className="login-images overflow-hidden w-[100%] h-full relative ml-auto">
        <img className='absolute top-[11%] right-[-21%] z-20' src="/assets/home.svg" alt="Home Icon" />
        <img className='absolute top-[-55%] right-[-25%] z-0' src="/assets/chat-empty.svg" alt="Chat Icon" />
        <img className='absolute top-[-20%] right-[-10%] z-10' src="/assets/Job-List.svg" alt="Job List Icon" />
      </div>
    </div>
  );
}

export default Register;
