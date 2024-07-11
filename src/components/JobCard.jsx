import React from "react";
import send from "../assets/send.svg";
import jobIcon from "../assets/job.svg";

function JobCard({ job, chatBot }) {
  const tags = (job) => {
    let tags = job.split(",");
    return (
      <div className="flex items-center gap-1 flex-wrap">
        {tags.map((tag) => (
          <article className="tag">{tag}</article>
        ))}
      </div>
    );
  };
  return (
    <div
      key={job.job_id}
      className={`job-card flex flex-col relative gap-2 ${
        job.new ? "new" : ""
      } ${job.featured ? "featured" : ""} ${chatBot && "w-full"}`}
    >
      <article className="bg-white flex p-2 px-3 w-fit gap-2 font-semibold text-sm rounded-full">
        <img src={jobIcon} className="h-[18px] w-[18px]" alt="" />
        {job.work_type}
      </article>
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
      {!chatBot && (
        <button className="bg-black w-full flex items-center justify-center gap-3 text-white  px-10 mt-auto rounded-lg">
          <img src={send} alt="" />
          Appy here !
        </button>
      )}
    </div>
  );
}

export default JobCard;
