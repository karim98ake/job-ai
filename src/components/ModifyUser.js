import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import "./profile.css";

const parseJwt = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  } catch (error) {
    console.error("Error parsing JWT:", error);
    return null;
  }
};

const checkTokenExpiration = (token) => {
  if (!token) {
    return true;
  }

  try {
    const decodedToken = parseJwt(token);
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
  const [role, setRole] = useState(null);
  const [formData, setFormData] = useState({
    first_name: user ? user.first_name : "",
    last_name: user ? user.last_name : "",
    email: user ? user.email : "",
    description: user ? user.description : "",
    cv: null,
    image: null,
    telephone: user ? user.telephone : "0000000000",
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [cvName, setCvName] = useState(
<<<<<<< HEAD
    user && user.cv ? user.cv.split("/").pop() : "No CV uploaded"
=======
    user && user.cv ? user.cv.split('/').pop() : 'No CV uploaded'
>>>>>>> d1991f9a2ebcfa37f146d6bd8cd8b387591a2b2d
  );

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (checkTokenExpiration(token)) {
      navigate('/signin', { replace: true });
      return;
    }

    const decodedToken = parseJwt(token);
    if (decodedToken) {
      setRole(decodedToken.role);
    }

    if (!user) {
<<<<<<< HEAD
      navigate("/"); // Redirect to home if no user data is available
=======
      navigate('/'); 
>>>>>>> d1991f9a2ebcfa37f146d6bd8cd8b387591a2b2d
    }
    if (user && user.image) {
      setPreviewImage(user.image);
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "cv" || name === "image") {
      setFormData({ ...formData, [name]: files[0] });
<<<<<<< HEAD
      if (name === "image") {
=======
      if (name === 'image') {
>>>>>>> d1991f9a2ebcfa37f146d6bd8cd8b387591a2b2d
        const file = files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);
      }
<<<<<<< HEAD
      if (name === "cv") {
        setCvName(files[0] ? files[0].name : "No CV uploaded");
=======
      if (name === 'cv') {
        setCvName(files[0] ? files[0].name : 'No CV uploaded');
>>>>>>> d1991f9a2ebcfa37f146d6bd8cd8b387591a2b2d
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const formDataToSend = new FormData();
      formDataToSend.append("first_name", formData.first_name);
      formDataToSend.append("last_name", formData.last_name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("telephone", formData.telephone);
      if (formData.cv) {
        formDataToSend.append("cv", formData.cv);
      }
      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      const response = await fetch(`/api/users/${user.user_id}/edit/`, {
        method: "PUT",
        headers: {
          Authorization: `Token ${token}`,
        },
        body: formDataToSend,
      });

      if (response.ok) {
        navigate("/profile");
      } else {
        const errorData = await response.json();
        console.error("Error updating user data:", errorData);
        throw new Error("Failed to update user data");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="mt-[5%] max-sm:mt-[20%]">
        <div className="w-[90%] mx-auto py-10">
          <h2 className="profile-title text-start mb-10 max-sm:mb-6">
            Modify Information
          </h2>
          <form
            onSubmit={handleSubmit}
            className="flex gap-6 max-sm:flex-col mb-4"
          >
            <div className="w-[20%] max-sm:w-full h-[200px] border border-gray-400 rounded-lg relative mb-4 p-4">
              {previewImage && (
                <div className="absolute top-0 w-full h-full left-0 z-10 pointer-events-none">
                  <img
                    src={previewImage}
                    alt="Current Profile"
                    className="w-full h-full"
                  />
                </div>
              )}
              <label
                htmlFor="upload-image"
                className="flex flex-col items-center gap-2 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 fill-white stroke-indigo-500"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span className="text-gray-600 font-medium">Upload image</span>
              </label>
              <input
                id="upload-image"
                className="hidden"
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
              />
            </div>
            <div className="w-[80%] max-sm:w-full">
              <div className="flex w-full gap-6 max-sm:gap-2 max-sm:flex-col mb-4">
                <div className="form__div mb-0 flex-1 ">
                  <input
                    className="form__input w-full"
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    placeholder=" "
                    required
                  />
                  <label className="form__label">First Name</label>
                </div>
                <div className="form__div mb-0 flex-1">
                  <input
                    className="form__input w-full"
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    placeholder=" "
                    required
                  />
                  <label className="form__label">Last Name</label>
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
                    placeholder=" "
                    required
                  />
                  <label className="form__label">Email</label>
                </div>
                <div className="form__div mb-0 flex-1">
                  <input
                    className="form__input w-full"
                    type="text"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    placeholder=" "
                    required
                  />
                  <label className="form__label">Telephone</label>
                </div>
              </div>
              <div className="form__div mb-0 text-area my-4">
                <textarea
                  name="description"
                  value={formData.description}
                  className="form__input w-full"
                  onChange={handleChange}
                  required
                />
                <label className="form__label">Description</label>
              </div>
              <div className="rounded-md border border-red-500 bg-gray-50 p-4  mt-4 shadow-md w-full mb-4">
                <label
                  htmlFor="upload-cv"
                  className="flex flex-col items-center gap-2 cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 fill-white border-red-500"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span className="text-gray-600 font-medium">{cvName}</span>
                </label>
                <input
                  id="upload-cv"
                  type="file"
                  className="hidden"
                  name="cv"
                  accept=".pdf"
                  onChange={handleChange}
                />
              </div>
            </div>
          </form>
          <div className="flex justify-end">
            <button
              type="button"
              className="btn cancel-btn w-[20%] max-sm:w-full"
              onClick={() => navigate("/profile")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn submit-btn w-[20%]  max-sm:w-full"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModifyUser;