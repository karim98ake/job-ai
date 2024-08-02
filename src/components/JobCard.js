import React from 'react';
import send from '../assets/send.svg';
import jobIcon from '../assets/job.svg';

function JobCard({ job, handleApply, chatBot }) {
  // Log the job object to the console
  console.log("Job data:", job);

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
      } ${job.featured ? 'featured' : ''} ${chatBot && "w-full"}`}
    >
      <article className="bg-white flex p-2 px-3 w-fit gap-2 font-semibold text-sm rounded-full">
        <img src={jobIcon} className="h-[18px] w-[18px]" alt="" />
        {job.work_type}
      </article>
      <h3 className="text-bold">{job.job_title}</h3>
      <p className="">{job.job_description}</p>
      <div className="flex flex-wrap items-center gap-1">
        <article>{job.job_qualification && tags(job.job_qualification)}</article>
      </div>
      <p>{applicationCount} personne(s) applied for this job</p>
      {job.featured && (
        <div className="job-status featured">
          <p>Featured</p>
        </div>
      )}
      {job.is_active ? (
        <div className="job-status">
          <p>New</p>
        </div>
      ) : (
        <div className="job-status">
          <p>Hired</p>
        </div>
      )}
      {!chatBot && (
        <button
          onClick={() => handleApply(job.job_id)}
          className="bg-black w-full flex items-center justify-center gap-3 text-white px-10 mt-auto rounded-lg"
        >
          <img src={send} alt="" />
          Apply here!
        </button>
      )}
    </div>
  );
}

export default JobCard;
