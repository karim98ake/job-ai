import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import Navbar from './Navbar';
import searchGray from '../assets/search-gray.svg';
import student from '../assets/student.svg';
import JobCard from './JobCard';
import { ChatContext } from '../App';
import './JobList.css';

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [experience, setExperience] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const jobsPerPage = 21;
  const navigate = useNavigate();
  const { showChat, toggleChat } = useContext(ChatContext);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/jobs/', {
          method: 'GET',
        });
        const data = await response.json();
        const activeReadyJobs = data.filter(job => job.is_ready === true && job.is_active === true);
        setJobs(activeReadyJobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    fetchJobs();
    toggleChat(false);
  }, [toggleChat]);

  const handleApply = async (job) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to apply for a job.');
      navigate('/login', { state: { from: window.location.pathname } });
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:8000/api/apply/',
        { job_id: job.job_id },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      navigate(`/chatbot-interface`, { state: { job } });
    } catch (error) {
      console.error('Error applying for job:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
      }
    }
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const filteredJobs = jobs.filter(
    (job) =>
      job.job_title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      job.work_type.toLowerCase().includes(location.toLowerCase()) &&
      job.job_qualification.toLowerCase().includes(experience.toLowerCase())
  );

  const start = currentPage * jobsPerPage;
  const end = start + jobsPerPage;
  const paginatedJobs = filteredJobs.slice(start, end);

  return (
    <>
      <Navbar />
      <div className="w-full">
        <main className="py-10">
          <div className="search-job fixed left-0 h-[100vh] top-0 z-[10] pt-[35%] text-center flex flex-col bg-white max-sm:relative ">
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
          <div className="cards-section flex flex-wrap gap-3 items-center ml-[30%] mt-[5%]">
            {paginatedJobs.length > 0 ? (
              paginatedJobs.map((job) => (
                <JobCard key={job.job_id} job={job} handleApply={() => handleApply(job)} />
              ))
            ) : (
              <p className="text-center">No jobs available.</p>
            )}
          </div>
          <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={'...'}
            pageCount={Math.ceil(filteredJobs.length / jobsPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            activeClassName={'active'}
          />
        </main>
      </div>
    </>
  );
}

export default JobList;
