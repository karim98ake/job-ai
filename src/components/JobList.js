import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ReactPaginate from "react-paginate";
import axios from "axios";
import "./JobList.css";
import Navbar from "./Navbar";
import searchGray from "../assets/search-gray.svg";
import student from "../assets/student.svg";

import JobCard from "./JobCard";

function JobList() {
  const [jobs, setJobs] = useState([
    {
      job_id: 1,
      job_title: "Software Engineer",
      job_description: "Develop and maintain web applications.",
      work_type: "Full-time",
      job_qualification: "JavaScript, React, Node.js, CSS",
      new: true,
      featured: true,
    },
    {
      job_id: 2,
      job_title: "Product Manager",
      job_description: "Lead product development teams.",
      work_type: "Full-time",
      job_qualification: "Leadership, Agile, Communication",
      new: true,
      featured: false,
    },
    {
      job_id: 3,
      job_title: "UI/UX Designer",
      job_description: "Design user interfaces and experiences.",
      work_type: "Part-time",
      job_qualification: "Sketch, Figma, Adobe XD, CSS",
      new: false,
      featured: true,
    },
    {
      job_id: 4,
      job_title: "Data Scientist",
      job_description: "Analyze and interpret complex data sets.",
      work_type: "Full-time",
      job_qualification: "Python, R, SQL, Machine Learning",
      new: false,
      featured: false,
    },
    {
      job_id: 5,
      job_title: "DevOps Engineer",
      job_description: "Manage and automate cloud infrastructure.",
      work_type: "Contract",
      job_qualification: "AWS, Docker, Kubernetes, Terraform",
      new: true,
      featured: true,
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const jobsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    // const fetchJobs = async () => {
    //   const token = localStorage.getItem('token');
    //   if (token) {
    //     try {
    //       const response = await fetch('http://localhost:8000/api/jobs/', {
    //         method: 'GET',
    //       });
    //       const data = await response.json();
    //       setJobs(data);
    //     } catch (error) {
    //       console.error('Error fetching jobs:', error);
    //     }
    //   } else {
    //     navigate('./login');
    //   }
    // };
    // fetchJobs();
  }, [navigate]);

  const handleApply = async (jobId) => {
    // const token = localStorage.getItem("token");
    // try {
    //   const response = await axios.post(
    //     "http://localhost:8000/api/apply/",
    //     { job_id: `${jobId}` },
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${token}`,
    //       },
    //     }
    //   );
    //   console.log(response.data);
    //   navigate("/chatbot-interface", { state: { jobId } });
    // } catch (error) {
    //   console.error("Error applying for job:", error);
    //   if (error.response) {
    //     console.error("Response data:", error.response.data);
    //   }
    // }
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  // const pageCount = Math.ceil(jobs.length / jobsPerPage);
  // const offset = currentPage * jobsPerPage;

  // const filteredJobs = jobs.filter(
  //   (job) =>
  //     job.job_title.toLowerCase().includes(searchTerm.toLowerCase()) &&
  //     job.work_type.toLowerCase().includes(location.toLowerCase()) &&
  //     job.job_qualification.toLowerCase().includes(experience.toLowerCase())
  // );

  // const currentJobs = filteredJobs.slice(offset, offset + jobsPerPage);

  return (
    <>
      <Navbar />

      <div className="w-full">
        <main className="py-10">
          <div className="search-job fixed left-0 h-[100vh] top-0 z-[10] pt-[35%]  text-center flex flex-col bg-white max-sm:relative ">
            <h2 className="text-start ">
              Are you ready to find your dream job?
            </h2>
            <p className="text-start text-gray-400">
              Search for jobs and internships. Discover the companies and roles
              that are right for you.
            </p>
            <div className="form-input flex items-center">
              <img src={searchGray} alt="" />
              <input
                id="search"
                placeholder="Job , Skills"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="form-input flex items-center">
              <img src={searchGray} alt="" />
              <input
                id="location"
                placeholder="Remote , On site"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="form-input flex items-center">
              <img src={student} alt="" />
              <input
                id="experience"
                placeholder="master , Bachelor"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              />
            </div>

            <button
              className="w-full bg-black text-white"
              onClick={() => setSearchTerm(searchTerm)}
            >
              Search
            </button>
          </div>

          <div className="cards-section flex flex-wrap gap-3 items-center ml-[30%] mt-[5%]">
            {jobs.length > 0 ? (
              jobs.map((job) => <JobCard job={job} />)
            ) : (
              <p className="text-center">No jobs available.</p>
            )}
          </div>
          <div className="mt-8">
            {/* <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          /> */}
          </div>
        </main>
      </div>
    </>
  );
}

export default JobList;
