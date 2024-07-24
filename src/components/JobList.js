import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import axios from "axios";
import Navbar from "./Navbar";
import searchGray from "../assets/search-gray.svg";
import student from "../assets/student.svg";
import JobCard from "./JobCard";
import { ChatContext } from "../App";
import "./JobList.css";
import Sidebar from "./Sidebar";
import JobCardWithModifyDelete from "./JobCardWithModifyDelete";

function JobList() {
  const [jobs, setJobs] = useState([
    {
      job_id: 1,
      work_type: "Full-time",
      job_title: "Software Engineer",
      job_description:
        "We are looking for a skilled software engineer to join our team.",
      job_qualification: "JavaScript, React, Node.js, Python",
      new: true,
      featured: true,
    },
    {
      job_id: 2,
      work_type: "Part-time",
      job_title: "Product Manager",
      job_description:
        "Seeking an experienced product manager to lead our product team.",
      job_qualification: "Product Management, Agile, Scrum, Communication",
      new: false,
      featured: false,
    },
    {
      job_id: 3,
      work_type: "Contract",
      job_title: "Data Scientist",
      job_description:
        "Looking for a data scientist with experience in machine learning and data analysis.",
      job_qualification: "Python, R, Machine Learning, Data Analysis",
      new: true,
      featured: false,
    },
    {
      job_id: 4,
      work_type: "Full-time",
      job_title: "UI/UX Designer",
      job_description:
        "We need a creative UI/UX designer to enhance our user experience.",
      job_qualification: "UI/UX Design, Figma, Sketch, Adobe XD",
      new: false,
      featured: true,
    },
    {
      job_id: 5,
      work_type: "Internship",
      job_title: "Marketing Intern",
      job_description:
        "Join our marketing team and gain valuable industry experience.",
      job_qualification: "Marketing, Social Media, Communication, Creativity",
      new: true,
      featured: true,
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [openSidebar, setOpenSidebar] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const jobsPerPage = 10;
  const navigate = useNavigate();
  const { showChat, toggleChat } = useContext(ChatContext);

  useEffect(() => {
    // const fetchJobs = async () => {
    //   const token = localStorage.getItem("token");
    //   if (token) {
    //     try {
    //       const response = await fetch("http://localhost:8000/api/jobs/", {
    //         method: "GET",
    //       });
    //       const data = await response.json();
    //       // Filter jobs that are ready
    //       const readyJobs = data.filter((job) => job.is_ready);
    //       setJobs(readyJobs);
    //     } catch (error) {
    //       console.error("Error fetching jobs:", error);
    //     }
    //   } else {
    //     navigate("./login");
    //   }
    // };
    // fetchJobs();
    // toggleChat(false);
  }, []);

  const handleApply = async (job) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:8000/api/apply/",
        { job_id: job.job_id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      navigate(`/chatbot-interface`, { state: { job } });
    } catch (error) {
      console.error("Error applying for job:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
    }
  };

  const handlePageClick = (data) => {
    // setCurrentPage(data.selected);
  };

  const filteredJobs = jobs.filter(
    (job) =>
      job.job_title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      job.work_type.toLowerCase().includes(location.toLowerCase()) &&
      job.job_qualification.toLowerCase().includes(experience.toLowerCase())
  );

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
                placeholder="Job Title, Skills"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="form-input flex items-center">
              <img src={searchGray} alt="" />
              <input
                id="location"
                placeholder="Location (e.g., Remote, On-site)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="form-input flex items-center">
              <img src={student} alt="" />
              <input
                id="experience"
                placeholder="Experience Level (e.g., Master's, Bachelor's)"
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

          {/* // if the hr is on */}
          <div className="cards-section flex justify-between items-center ml-[30%] mt-[5%]">
            <h2>All jobs</h2>
            <button
              className="gradiant cursor-pointer btn "
              onClick={() => setOpenSidebar(true)}
            >
              Add New Job
            </button>
          </div>
          {openSidebar && (
            <Sidebar name="create" setOpenSidebar={setOpenSidebar} />
          )}
          {/* // if the hr is on */}
          <div className="cards-section flex flex-wrap gap-3 items-center ml-[30%] mt-[5%]">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <JobCardWithModifyDelete
                  key={job.job_id}
                  job={job}
                  handleApply={() => handleApply(job)}
                />
              ))
            ) : (
              <p className="text-center">No jobs available.</p>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

export default JobList;
