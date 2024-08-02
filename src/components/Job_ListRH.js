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
import Sidebar from './Sidebar';

function JobListWithModifyDelete() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [experience, setExperience] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [jobToEdit, setJobToEdit] = useState(null);
  const jobsPerPage = 21;
  const navigate = useNavigate();
  const { showChat, toggleChat } = useContext(ChatContext);

  const checkTokenExpiration = (token) => {
    if (!token) {
      return true;
    }

    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const exp = decodedToken.exp * 1000;
      return Date.now() >= exp;
    } catch (error) {
      console.error("Error decoding token:", error);
      return true;
    }
  };

  const getUserRoleFromToken = (token) => {
    if (!token) return null;
    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      return decodedToken.role;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchJobs = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        if (checkTokenExpiration(token)) {
          navigate('/login');
          return;
        }
        
        const userRole = getUserRoleFromToken(token);
        if (userRole !== 'professional' && userRole !== 'candidate') {
          navigate('/login');
          return;
        }

        try {
          const response = await fetch('http://localhost:8000/api/jobs/', {
            method: 'GET',
          });
          const data = await response.json();
          let readyJobs;
          if (userRole === 'professional') {
            readyJobs = data;
          } else if (userRole === 'candidate') {
            readyJobs = data.filter(job => job.is_ready);
          }
          setJobs(readyJobs);
        } catch (error) {
          console.error('Error fetching jobs:', error);
        }
      } else {
        navigate('/login');
      }
    };
    fetchJobs();
    toggleChat(false);
  }, [navigate]);

  const editJob = (job) => {
    setJobToEdit(job);
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

  const refreshJobs = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:8000/api/jobs/', {
        method: 'GET',
      });
      const data = await response.json();
      const readyJobs = data.filter(job => job.is_ready);
      setJobs(readyJobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const filteredJobs = jobs.filter(
    (job) =>
      job.job_title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      job.work_type.toLowerCase().includes(location.toLowerCase()) &&
      job.job_qualification.toLowerCase().includes(experience.toLowerCase())
  );

  const offset = currentPage * jobsPerPage;
  const currentJobs = filteredJobs.slice(offset, offset + jobsPerPage);

  const pageCount = Math.ceil(filteredJobs.length / jobsPerPage);

  const toastContainerStyle = {
    zIndex: 9999,
    marginTop: '5rem'
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

          <div className="cards-section flex justify-between items-center ml-[30%] mt-[5%]">
            <h2>All jobs</h2>
            <button
              className="gradiant cursor-pointer btn"
              onClick={() => setOpenSidebar({ type: 'add' })}
            >
              Add New Job
            </button>
          </div>
          {openSidebar.type === 'add' && (
            <Sidebar name="create" setOpenSidebar={setOpenSidebar} />
          )}
          {openSidebar.type === 'edit' && (
            <Sidebar name="edit" setOpenSidebar={setOpenSidebar} openSidebar={openSidebar} refreshJobs={refreshJobs} />
          )}

          <div className="cards-section flex flex-wrap gap-3 items-center justify-between ml-[31%] p-6 ">
            {currentJobs.length > 0 ? (
              currentJobs.map((job) => (
                <JobCardWithModifyDelete
                  key={job.job_id}
                  job={job}
                  editJob={() => editJob(job)}
                  deleteJob={() => deleteJob(job.job_id)}
                  checkCandidates={() => checkCandidates(job.job_id, job.seuil)}
                  setOpenSidebar={setOpenSidebar}
                />
              ))
            ) : (
              <p className="text-center">No jobs available.</p>
            )}
          </div>
          <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
          />
        </main>
      </div>
    </>
  );
}

export default JobListWithModifyDelete;
