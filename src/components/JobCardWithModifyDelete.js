import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import send from "../assets/send.svg";
import jobIcon from "../assets/job.svg";
import menu from "../assets/menu.svg";

function JobCardWithModifyDelete({ job, editJob, deleteJob, checkCandidates }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleEdit = (jobId) => {
    navigate(`/edit-job/${jobId}`);
  };

  const handleDelete = (jobId) => {
    deleteJob(jobId);
  };

  const tags = (job) => {
    let tags = job.split(",");
    return (
      <div className="flex items-center gap-1 flex-wrap">
        {tags.map((tag, index) => (
          <article key={index} className="tag">
            {tag}
          </article>
        ))}
      </div>
    );
  };

  return (
    <div
      key={job.job_id}
      className={`job-card flex flex-col relative gap-2 ${
        job.new ? "new" : ""
      } ${job.featured ? "featured" : ""}`}
    >
      <div className="flex justify-between items-center">
        <article className="bg-white flex p-2 px-3 w-fit gap-2 font-semibold text-sm rounded-full">
          <img src={jobIcon} className="h-[18px] w-[18px]" alt="" />
          {job.work_type}
        </article>
        <div className="">
          <button onClick={toggleDropdown} className="flex items-center gap-2">
            <img src={menu} alt="" />
          </button>
          {showDropdown && (
            <div className="dropdown-content absolute right-[10%]  w-36 p-2  bg-white shadow-md rounded-md  z-50">
              <button
                onClick={() => handleEdit(job.job_id)}
                className="block px-2 py-2 text-black  bg-gray-50 rounded-md w-full text-left text-[13px] font-medium"
              >
                Modify
              </button>
              <button
                onClick={() => handleDelete(job.job_id)}
                className="block px-2 py-2  text-red-500 mt-1  bg-gray-50 rounded-md w-full text-left text-[13px] font-medium"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <h3 className="text-bold">{job.job_title}</h3>
      <p className="">{job.job_description}</p>
      <div className="flex flex-wrap items-center gap-1">
        <article>
          {job.job_qualification && tags(job.job_qualification)}
        </article>
      </div>
      {job.featured && (
        <div className="job-status featured">
          <p>featured</p>
        </div>
      )}
      {job.new && (
        <div className="job-status">
          <p>New</p>
        </div>
      )}
      <button
        onClick={() => checkCandidates(job.job_id, job.seuil)}
        className="bg-black w-full flex items-center justify-center gap-3 text-white px-10 mt-auto rounded-lg"
      >
        <img src={send} alt="" />
        Visualize Applications
      </button>
    </div>
  );
}

export default JobCardWithModifyDelete;
