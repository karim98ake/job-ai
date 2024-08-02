import React from 'react';
import { Card, CardContent, CardFooter } from './ui/card';
import './IntegrationCard.css'; 

const IntegrationCard = ({ imgSrc, title, subtitle, description, installedCount, isActive }) => {
    return (
        <Card className="p-3">
            <CardContent className="flex flex-col gap-4">
                <div className="d-flex flex-row mb-3">
                    <img src={imgSrc} width="70" alt={title} />
                    <div className="d-flex flex-column ml-2">
                        <span>{title}</span>
                        <span className="text-black-50">{subtitle}</span>
                        <span className="ratings">
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                        </span>
                    </div>
                    <div className="status-badge ml-auto">
                        {isActive ? (
                            <span className="badge-new">New</span>
                        ) : (
                            <span className="badge-hired">Hired</span>
                        )}
                    </div>
                </div>
                <h6>{description}</h6>
                <CardFooter className="d-flex justify-content-between install mt-3">
                    <span>Installed {installedCount} times</span>
                    <span className="text-primary">View <i className="fa fa-angle-right"></i></span>
                </CardFooter>
            </CardContent>
        </Card>
    );
};

export default IntegrationCard;
