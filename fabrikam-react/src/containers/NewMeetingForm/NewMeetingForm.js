import React, {useState} from 'react';
import {Form, Label, Input, Button} from "reactstrap";
import {Link, useHistory} from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";
import axios from "axios";
import DatePicker from 'react-datetime';
import moment from 'moment';
import {useInput} from '../../hooks/useInput';
import NavBar from "../../components/NavBar";
import "./NewMeetingForm.css";
import 'react-datetime/css/react-datetime.css';

const NewMeetingForm = () => {
    const apiOrigin = process.env.REACT_APP_MEETING_API_HOST;
    
    const {value: invitee, bind: bindInvitee, reset: resetInvitee} = useInput('');
    const [startTime, setStartTime] = useState(moment());
    const [endTime, setEndTime] = useState(moment());
    const { user, getAccessTokenSilently } = useAuth0();

    let history = useHistory();

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        const url = `${apiOrigin}/meetings`;
        const token = await getAccessTokenSilently();
        const requestBody = {
            startTime: startTime,
            endTime: endTime,
            inviter: user.email,
            invitee: invitee
        };
        const header = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        axios
            .post(url, requestBody, header)
            .then(() => {
                history.push("/meetings");
            })
            .catch(() => {
                resetInvitee();
                setStartTime(moment());
                setEndTime(moment());
            });
    }

    return (
        <>
            <NavBar />
            <div className="body-text-container">
                <div className="body-text">
                    <Form className="Input">
                        <h5>
                            Inviter: {user.email}
                        </h5>
    
                        <Label>
                            Start Time:
                        </Label>
                        <DatePicker
                            inputProps={{
                                style: {width: 250}
                            }}
                            value={startTime}
                            dateFormat="DD-MM-YYYY"
                            timeFormat="hh:mm A"
                            onChange={val => setStartTime(val)}
                        />
    
                        <Label>
                            End Time:
                        </Label>
                        <DatePicker
                            inputProps={{
                                style: {width: 250}
                            }}
                            value={endTime}
                            dateFormat="DD-MM-YYYY"
                            timeFormat="hh:mm A"
                            onChange={val => setEndTime(val)}
                        />
    
                        <Label>
                            Invitee:
                        </Label>
                        <Input type="text" {...bindInvitee} />
    
                        <Button type="cancel">
                            <Link to="/meetings">Cancel</Link>
                        </Button>
    
                        <Input type="submit" className="btn-link" value="Submit" onClick={handleSubmit}/>
                    </Form>
                </div>
            </div>
        </>   
    );
};

export default NewMeetingForm;