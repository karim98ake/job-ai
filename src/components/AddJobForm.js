import React, { useState } from "react";
import axios from "axios";
import close from "../assets/close.svg";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import "./profile.css";

const AddJobForm = ({ setOpenSidebar }) => {
  const [job, setJob] = useState({
    job_title: "",
    job_description: "",
    job_experience: "",
    job_qualification: "",
    salary_range: "",
    work_type: "",
    job_benefit: "",
    job_skills: "",
    job_responsibilities: "",
    company_name: "",
    seuil: 0.5,
  });
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post("/api/add-job/", job);
      toast.success("Job added successfully.");
      navigate("/jobs");
    } catch (error) {
      console.error("Error adding job:", error);
      toast.error("Error adding job.");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setJob({ ...job, [name]: value });
  };

  return (
    <div className="absolute right-0 top-0  rounded-none  h-full max-sm:w-full w-[35%] overflow-auto">
      <ToastContainer />
      <Card className="p-6  rounded-none">
        <div className="flex justify-between items-center mb-4 border-b border-gray-300 pb-3">
          <CardTitle className=" font-semibold text-[20px]">Add Job</CardTitle>
          <button onClick={() => setOpenSidebar(false)}>
            <img src={close} alt="" />
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full relative pb-[15%] gap-4"
        >
          <div class="form__div">
            <input
              class="form__input w-full"
              type="text"
              name="job_title"
              value={job.job_title}
              onChange={handleChange}
              placeholder=" "
            />
            <label for="" class="form__label">
              Job Title
            </label>
          </div>
          <div class="form__div text-area mt-4">
            <textarea
              name="job_description"
              value={job.job_description}
              class="form__input w-full"
              onChange={handleChange}
            />
            <label for="" class="form__label">
              Job Description
            </label>
          </div>

          <div class="form__div">
            <input
              class="form__input w-full"
              type="text"
              name="job_experience"
              value={job.job_experience}
              onChange={handleChange}
              placeholder=" "
            />
            <label for="" class="form__label">
              Job Experience
            </label>
          </div>

          <div class="form__div">
            <input
              class="form__input w-full"
              type="text"
              name="job_qualification"
              value={job.job_qualification}
              onChange={handleChange}
              placeholder=" "
            />
            <label for="" class="form__label">
              Job Qualification
            </label>
          </div>

          <div class="form__div">
            <input
              class="form__input w-full"
              type="text"
              name="salary_range"
              value={job.salary_range}
              onChange={handleChange}
              placeholder=" "
            />
            <label for="" class="form__label">
              Salary Range
            </label>
          </div>

          <div class="form__div">
            <input
              class="form__input w-full"
              type="text"
              name="work_type"
              value={job.work_type}
              onChange={handleChange}
              placeholder=" "
            />
            <label for="" class="form__label">
              Work Type
            </label>
          </div>

          <div class="form__div text-area mt-4">
            <textarea
              name="job_benefit"
              value={job.job_benefit}
              class="form__input w-full"
              onChange={handleChange}
            />
            <label for="" class="form__label">
              Job Benefit
            </label>
          </div>

          <div class="form__div text-area mt-4">
            <textarea
              name="job_skills"
              value={job.job_skills}
              class="form__input w-full"
              onChange={handleChange}
            />
            <label for="" class="form__label">
              Job Skills
            </label>
          </div>

          <div class="form__div text-area mt-4">
            <textarea
              name="job_responsibilities"
              value={job.job_responsibilities}
              class="form__input w-full"
              onChange={handleChange}
            />
            <label for="" class="form__label">
              Job Responsibilities
            </label>
          </div>

          <div class="form__div">
            <input
              class="form__input w-full"
              type="text"
              name="company_name"
              value={job.company_name}
              onChange={handleChange}
              placeholder=" "
            />
            <label for="" class="form__label">
              Company Name
            </label>
          </div>
          <div class="form__div">
            <input
              class="form__input w-full"
              type="number"
              name="seuil"
              value={job.seuil}
              step="0.01"
              onChange={handleChange}
              placeholder=" "
            />
            <label for="" class="form__label">
              Seuil
            </label>
          </div>

          <div className="fixed bottom-0 py-2 right-[0.3%] w-[34%] max-sm:w-full shadow-lg flex justify-center items-center gap-4 z-10  bg-white">
            <button
              type="button"
              className="btn cancel-btn w-[40%] "
              onClick={() => setOpenSidebar(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn submit-btn  w-[40%]">
              Add Job
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AddJobForm;
