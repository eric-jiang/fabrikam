import React, { useState, useEffect } from 'react';
import { Button } from "reactstrap";
import Highlight from 'react-highlight';
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import NavBar from "../../components/NavBar";
import "./Meetings.css"

const Meetings = () => {
    const apiOrigin = "https://localhost:5001";

    const [meetings, setMeetings] = useState({});
    const [role, setRole] = useState('');

    const {
        user,
        getAccessTokenSilently,
        getIdTokenClaims
    } = useAuth0();

    const getRole = async () => {
        const claims = await getIdTokenClaims();
        setRole(claims["http://fabrikam.com/roles"][0]);
    }
    const getMeetings = async () => {
        const token = await getAccessTokenSilently();

        const response = await axios.get(`${apiOrigin}/meetings`, {
            headers: {
            Authorization: `Bearer ${token}`
            }
        });

        setMeetings(response.data);
    };
    
    useEffect(() => {
        getRole().then(getMeetings);
    }, []);

    return (
        <>
            <NavBar />
            <div className="body-text-container">
                <div className="body-text">
                    <p>You're logged in as <b>{user.email}</b></p>
                    <h5>
                        Schedulded meetings:
                        {role === "Recruiter" && (
                            <Link to="/meetings/schedule">
                                <Button className="btn-link" color="link">New meeting</Button>
                            </Link>
                            )}
                    </h5>
                    <Highlight>
                        {JSON.stringify(meetings, null, 2)}
                    </Highlight>
                </div>
            </div>
        </>
    );
};

export default Meetings;