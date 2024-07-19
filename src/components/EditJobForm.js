import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import './profile.css';
import Navbar from './navbarHR';
const EditJobForm = () => {
    const { jobId } = useParams();
    const [job, setJob] = useState({
        job_title: '',
        job_description: '',
        job_experience: '',
        job_qualification: '',
        salary_range: '',
        work_type: '',
        job_benefit: '',
        job_skills: '',
        job_responsibilities: '',
        company_name: '',
        seuil: 0.5,
    });
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/api/get-job/${jobId}/`)
            .then(response => {
                setJob(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the job!", error);
                toast.error("Error fetching job.");
            });
    }, [jobId]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post(`/api/edit-job/${jobId}/`, job);
            toast.success("Job updated successfully.");
            navigate('/jobs', { state: { updateSuccess: true } }); 
        } catch (error) {
            console.error("There was an error updating the job!", error);
            toast.error("Error updating job.");
        }
    };
    



    const handleChange = (event) => {
        const { name, value } = event.target;
        setJob({ ...job, [name]: value });
    };

    return (
        <>
        <Navbar />
        <div>
            <ToastContainer />
            <div className="profile-page">
                <Card className="profile-card" style={{ marginTop: '60px' }}>
                    <CardHeader>
                        <CardTitle className="profile-title">Edit Job</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="profile-info">
                            <div className="form-group">
                                <label>Job Title:</label>
                                <input
                                    type="text"
                                    name="job_title"
                                    value={job.job_title}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Job Description:</label>
                                <textarea
                                    name="job_description"
                                    value={job.job_description}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Job Experience:</label>
                                <input
                                    type="text"
                                    name="job_experience"
                                    value={job.job_experience}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Job Qualification:</label>
                                <input
                                    type="text"
                                    name="job_qualification"
                                    value={job.job_qualification}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Salary Range:</label>
                                <input
                                    type="text"
                                    name="salary_range"
                                    value={job.salary_range}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Work Type:</label>
                                <input
                                    type="text"
                                    name="work_type"
                                    value={job.work_type}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Job Benefit:</label>
                                <textarea
                                    name="job_benefit"
                                    value={job.job_benefit}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Job Skills:</label>
                                <textarea
                                    name="job_skills"
                                    value={job.job_skills}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Job Responsibilities:</label>
                                <textarea
                                    name="job_responsibilities"
                                    value={job.job_responsibilities}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Company Name:</label>
                                <input
                                    type="text"
                                    name="company_name"
                                    value={job.company_name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Seuil:</label>
                                <input
                                    type="number"
                                    name="seuil"
                                    value={job.seuil}
                                    step="0.01"
                                    onChange={handleChange}
                                />
                            </div>
                            <CardFooter className="profile-footer">
                                <button type="submit" className="btn save-btn text-black">Update Job</button>
                                <button type="button" className="btn cancel-btn text-black" onClick={() => navigate('/jobs')}>Cancel</button>
                            </CardFooter>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
        </>
    );
    
};

export default EditJobForm;
