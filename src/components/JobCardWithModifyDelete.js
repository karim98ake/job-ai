import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import send from '../assets/send.svg';
import jobIcon from '../assets/job.svg';

function JobCardWithModifyDelete({ job, editJob, deleteJob, checkCandidates, setOpenSidebar }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleEdit = (jobId) => {
    setOpenSidebar(true);   
  };

  const handleDelete = (jobId) => {
    deleteJob(jobId);
  };

  const tags = (job) => {
    let tags = job.split(',');
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
  const applicationCount = job.application_count;
  return (
    <div
      key={job.job_id}
      className={`job-card flex flex-col relative gap-2 ${
        job.new ? 'new' : ''
      } ${job.featured ? 'featured' : ''}`}
    >
      <div className="menu-container" style={{ position: 'absolute', top: 0, right: 0, margin: '2px', zIndex: 100 }}>
        <button onClick={toggleDropdown} className="flex items-center gap-2">
          <span className="font-bold">⋮</span>
        </button>
        {showDropdown && (
          <div className="dropdown-content" style={{ position: 'absolute', right: 0, marginTop: '2px', width: '150px', backgroundColor: 'white', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '4px', padding: '8px 0', zIndex: 200 }}>
            <button onClick={() => setOpenSidebar({ type: 'edit', job })} className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left">Modify</button>
            <button onClick={() => handleDelete(job.job_id)} className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left">Delete</button>
          </div>
        )}
      </div>
      <article className="bg-white flex p-2 px-3 w-fit gap-2 font-semibold text-sm rounded-full">
        <img src={jobIcon} className="h-[18px] w-[18px]" alt="" />
        {job.work_type}
      </article>
      <h3 className="text-bold">{job.job_title}</h3>
      <p className="">{job.job_description}</p>
      {!job.is_ready && (
        <>
          <div
            onClick={() => setOpenSidebar(false)}
            className="bg-black absolute h-full opacity-[0.6] top-0 left-0 w-full"
            style={{ zIndex: 50 }}
          ></div>
          <p className='z-[10000] text-white text-center'>
            Questions still in generation
          </p>
        </>
      )}
      <div className="flex flex-wrap items-center gap-1">
        <article>{job.job_qualification && tags(job.job_qualification)}</article>
      </div>
      <p>{applicationCount} personne(s) applied for this job</p>
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
      {job.is_active ? (
        <div className="job-status badge-new" style={{ zIndex: 50 }}>
          <p>New</p>
        </div>
      ) : (
        <div className="job-status badge-hired" style={{ zIndex: 50 }}>
          <p>Hired</p>
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
