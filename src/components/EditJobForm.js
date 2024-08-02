import React, { useState, useEffect } from "react";
import axios from "axios";
import close from "../assets/close.svg";
<<<<<<< HEAD
=======
import { useNavigate } from "react-router-dom";
>>>>>>> d1991f9a2ebcfa37f146d6bd8cd8b387591a2b2d
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card, CardTitle } from "./ui/card";
import "./profile.css";

const EditJobForm = ({ setOpenSidebar, openSidebar }) => {
  const [job, setJob] = useState(openSidebar.job);
<<<<<<< HEAD

  useEffect(() => {
    if (openSidebar.job) {
=======
  const navigate = useNavigate();

  useEffect(() => {
    if (openSidebar.job) {
      
>>>>>>> d1991f9a2ebcfa37f146d6bd8cd8b387591a2b2d
      axios.get(`/api/get-job/${openSidebar.job.job_id}/`)
        .then(response => {
          setJob(response.data);
        })
        .catch(error => {
          console.error("Error fetching job details:", error);
          toast.error("Error fetching job details.");
        });
    }
  }, [openSidebar.job]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post(`/api/edit-job/${job.job_id}/`, job);
      toast.success("Job edited successfully.");
      setOpenSidebar(false);
<<<<<<< HEAD
=======
      
>>>>>>> d1991f9a2ebcfa37f146d6bd8cd8b387591a2b2d
    } catch (error) {
      console.error("Error editing job:", error);
      toast.error("Error editing job.");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setJob({ ...job, [name]: value });
  };

  return (
    <div className="absolute right-0 top-0 rounded-none h-full max-sm:w-full w-[35%] overflow-auto">
      <ToastContainer />
      <Card className="p-6 rounded-none">
        <div className="flex justify-between items-center mb-4 border-b border-gray-300 pb-3">
          <CardTitle className="font-semibold text-[20px]">Edit Job</CardTitle>
          <button onClick={() => setOpenSidebar(false)}>
            <img src={close} alt="close" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="w-full relative pb-[15%] gap-4">
          <div className="form__div">
            <input
              className="form__input w-full"
              type="text"
              name="job_title"
              value={job.job_title || ""}
              onChange={handleChange}
              placeholder=" "
            />
            <label className="form__label">Job Title</label>
          </div>
          <div className="form__div text-area mt-4">
            <textarea
              name="job_description"
              value={job.job_description || ""}
              className="form__input w-full"
              onChange={handleChange}
            />
            <label className="form__label">Job Description</label>
          </div>
          <div className="form__div">
            <input
              className="form__input w-full"
              type="text"
              name="job_experience"
              value={job.job_experience || ""}
              onChange={handleChange}
              placeholder=" "
            />
            <label className="form__label">Job Experience</label>
          </div>
          <div className="form__div">
            <input
              className="form__input w-full"
              type="text"
              name="job_qualification"
              value={job.job_qualification || ""}
              onChange={handleChange}
              placeholder=" "
            />
            <label className="form__label">Job Qualification</label>
          </div>
          <div className="form__div">
            <input
              className="form__input w-full"
              type="text"
              name="salary_range"
              value={job.salary_range || ""}
              onChange={handleChange}
              placeholder=" "
            />
            <label className="form__label">Salary Range</label>
          </div>
          <div className="form__div">
            <input
              className="form__input w-full"
              type="text"
              name="work_type"
              value={job.work_type || ""}
              onChange={handleChange}
              placeholder=" "
            />
            <label className="form__label">Work Type</label>
          </div>
          <div className="form__div text-area mt-4">
            <textarea
              name="job_benefit"
              value={job.job_benefit || ""}
              className="form__input w-full"
              onChange={handleChange}
            />
            <label className="form__label">Job Benefit</label>
          </div>
          <div className="form__div text-area mt-4">
            <textarea
              name="job_skills"
              value={job.job_skills || ""}
              className="form__input w-full"
              onChange={handleChange}
            />
            <label className="form__label">Job Skills</label>
          </div>
          <div className="form__div text-area mt-4">
            <textarea
              name="job_responsibilities"
              value={job.job_responsibilities || ""}
              className="form__input w-full"
              onChange={handleChange}
            />
            <label className="form__label">Job Responsibilities</label>
          </div>
          <div className="form__div">
            <input
              className="form__input w-full"
              type="text"
              name="company_name"
              value={job.company_name || ""}
              onChange={handleChange}
              placeholder=" "
            />
            <label className="form__label">Company Name</label>
          </div>
          <div className="form__div">
            <input
              className="form__input w-full"
              type="number"
              name="seuil"
              value={job.seuil || ""}
              step="0.01"
              onChange={handleChange}
              placeholder=" "
            />
            <label className="form__label">Seuil</label>
          </div>

          <div className="form__div">
            <input
              className="form__input w-full"
              type="number"
              name="required_candidates"
              value={job.required_candidates|| ""}
              step="0.01"
              onChange={handleChange}
              placeholder=" "
            />
<<<<<<< HEAD
            <label className="form__label">Number of posts</label>
=======
            <label className="form__label">number of posts</label>
>>>>>>> d1991f9a2ebcfa37f146d6bd8cd8b387591a2b2d
          </div>

          <div className="fixed bottom-0 py-2 right-[0.3%] w-[34%] max-sm:w-full shadow-lg flex justify-center items-center gap-4 z-10 bg-white">
            <button
              type="button"
              className="btn cancel-btn w-[40%]"
              onClick={() => setOpenSidebar(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn submit-btn w-[40%]">
              Update Job
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
<<<<<<< HEAD
}
=======
};
>>>>>>> d1991f9a2ebcfa37f146d6bd8cd8b387591a2b2d

export default EditJobForm;
