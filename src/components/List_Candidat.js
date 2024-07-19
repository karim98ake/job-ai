import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import Navbar from './navbarHR';
import './List_Candidat.css';

const CandidateList = () => {
    const { jobId } = useParams();
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        axios.get(`/jobs/${jobId}/candidates/`)
            .then(response => {
                if (response.data.length === 0) {
                    toast.info("Aucun candidat n'a un score supérieur à 0.5.");
                }
                setCandidates(response.data);
            })
            .catch(error => console.error(error));
    }, [jobId]);

    return (
        <>
            <Navbar />
            <div className="profile-page">
                <ToastContainer />
                <Card className="profile-card" style={{ marginTop: '60px' }}>
                    <CardHeader>
                        <CardTitle className="profile-title">Candidates for Job {jobId}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="candidate-list">
                            {candidates.map((candidate, index) => (
                                <li key={index} className="candidate-item">
                                    <Card className="candidate-card">
                                        <CardContent>
                                            <p><strong>Name:</strong> {candidate.first_name} {candidate.last_name}</p>
                                            <p><strong>Email:</strong> {candidate.email}</p>
                                            <p><strong>Score:</strong> {candidate.global_score}</p>
                                        </CardContent>
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
