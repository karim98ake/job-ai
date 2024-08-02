import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from './ui/card';
import Navbar from './navbarHR';
import './List_Candidat.css';
import { DatePickerDemo } from './DatePickerDemo';
import { format } from 'date-fns';

const CandidateList = () => {
    const { jobId } = useParams();
    const [candidates, setCandidates] = useState([]);
    const [jobTitle, setJobTitle] = useState('');
    const [seuil, setSeuil] = useState(null);
    const [hiredCount, setHiredCount] = useState(0);
    const [requiredCandidates, setRequiredCandidates] = useState(5);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const navigate = useNavigate();

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

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (checkTokenExpiration(token)) {
            navigate('/login', { replace: true });
            return;
        }

        axios.get(`/jobs/${jobId}/candidates/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                const { job_title, candidates, seuil, hired_count, required_candidates } = response.data;
                setJobTitle(job_title);
                setSeuil(seuil);
                setHiredCount(hired_count || 0);
                setRequiredCandidates(required_candidates || 5);
                if (candidates.length === 0) {
                    toast.info("Aucun candidat n'a un score supérieur au seuil.");
                }
                setCandidates(candidates);
            })
            .catch(error => {
                console.error(error);
                toast.error("Error fetching candidates.");
            });
    }, [jobId, navigate]);

    const formatScoreAsPercentage = (score) => {
        return `${score.toFixed(2)}%`;
    };

    const handleHire = async (userId, candidateEmail) => {
        const token = localStorage.getItem('token');
        const formattedDate = selectedDate.toISOString();
        const displayDate = format(new Date(selectedDate), "yyyy-MM-dd 'at' HH:mm");

        try {
            const response = await axios.post(`/jobs/${jobId}/hire/${userId}/`, {
                candidate_email: candidateEmail,
                interview_date: formattedDate,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });

            toast.success(`Hired candidate and scheduled interview on ${displayDate}.`);
            setHiredCount(hiredCount + 1);
            if (hiredCount + 1 >= requiredCandidates) {
                await axios.patch(`/jobs/${jobId}/disable/`, null, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                toast.info("The job has been disabled as the required number of candidates have been hired.");
            }
        } catch (error) {
            console.error("Error in handleHire:", error);
            toast.error("Error hiring candidate.");
        }
    };

    return (
        <>
            <Navbar />
            <div className="profile-page">
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    style={{ marginTop: '60px' }}
                />
                <Card className="profile-card" style={{ marginTop: '60px' }}>
                    <CardHeader>
                        <CardTitle className="profile-title">Candidates for Job: {jobTitle}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="candidate-list">
                            {candidates.map((candidate, index) => (
                                <li key={index} className="candidate-item">
                                    <Card className="candidate-card">
                                        <CardContent>
                                            <p><strong>Name:</strong> {candidate.first_name} {candidate.last_name}</p>
                                            <p><strong>Email:</strong> {candidate.email}</p>
                                            <p><strong>Score:</strong> {formatScoreAsPercentage(candidate.global_score)}</p>
                                            <DatePickerDemo selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                                        </CardContent>
                                        <CardFooter className="flex justify-end">
                                            <button
                                                className="btn submit-btn"
                                                onClick={() => handleHire(candidate.user_id, candidate.email)}
                                                disabled={hiredCount >= requiredCandidates}
                                            >
                                                Hire
                                            </button>
                                        </CardFooter>
                                    </Card>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default CandidateList;
