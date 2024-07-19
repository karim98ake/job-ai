import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './navbarHR';
import searchGray from '../assets/search-gray.svg';
import student from '../assets/student.svg';
import JobCardWithModifyDelete from './JobCardWithModifyDelete';
import { ChatContext } from '../App';
import './JobList.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactPaginate from 'react-paginate';

function JobListWithModifyDelete() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [experience, setExperience] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const jobsPerPage = 10;
  const navigate = useNavigate();
  const { showChat, toggleChat } = useContext(ChatContext);

  useEffect(() => {
    const fetchJobs = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch('http://localhost:8000/api/jobs/', {
            method: 'GET',
          });
          const data = await response.json();
          // Filter jobs that are ready
          const readyJobs = data.filter(job => job.is_ready);
          setJobs(readyJobs);
        } catch (error) {
          console.error('Error fetching jobs:', error);
        }
      } else {
        navigate('./login');
      }
    };
    fetchJobs();
    toggleChat(false)
  }, [navigate]);

  const editJob = (jobId) => {
    navigate(`/edit-job/${jobId}`);
  };

  const deleteJob = (jobId) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
        axios.delete(`/api/delete-job/${jobId}/`)
            .then(response => {
                setJobs(jobs.filter(job => job.job_id !== jobId));
                toast.success("Job deleted successfully.");
            })
            .catch(error => {
                console.error("There was an error deleting the job!", error);
                toast.error("Error deleting job.");
            });
    }
  };

  const checkCandidates = (jobId, seuil) => {
    axios.get(`/jobs/${jobId}/candidates/?seuil=${seuil}`)
        .then(response => {
            if (response.data.length === 0) {
                toast.info(`Aucun candidat n'a un score supérieur à ${seuil}.`);
            } else {
                navigate(`/jobs/${jobId}/candidates/`);
            }
        })
        .catch(error => console.error(error));
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

  const toastContainerStyle = {
    zIndex: 9999, // Ensure it's above other elements
    marginTop: '5rem' // Adjust this value based on the height of your navbar
  };

  return (
    <>
      <Navbar />
      <div className="w-full">
        <ToastContainer style={toastContainerStyle} />
        <main className="py-10">
          <div className="search-job fixed left-0 h-[100vh] top-0 z-[10] pt-[35%] text-center flex flex-col bg-white max-sm:relative">
            <h2 className="text-start">Are you ready to find your dream job?</h2>
            <p className="text-start text-gray-400">
              Search for jobs and internships. Discover the companies and roles that are right for you.
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
            <button className="w-full bg-black text-white" onClick={() => setSearchTerm(searchTerm)}>
              Search
            </button>
          </div>

          <div className="cards-section flex flex-wrap gap-3 items-center ml-[30%] mt-[5%]">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <JobCardWithModifyDelete
                  key={job.job_id}
                  job={job}
                  editJob={() => editJob(job.job_id)}
                  deleteJob={() => deleteJob(job.job_id)}
                  checkCandidates={() => checkCandidates(job.job_id, job.seuil)}
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

export default JobListWithModifyDelete;
