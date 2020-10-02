import React from 'react';
import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import Meetings from "./containers/Meetings/Meetings";
import NewMeetingForm from "./containers/NewMeetingForm/NewMeetingForm";
import NavBar from "./components/NavBar";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div className="App">
        <h3 className="header-title">Fabrikam Meetings</h3>
        <NavBar />
        <Router>
            <div>
              <PrivateRoute exact path="/" component={Meetings} />
              <PrivateRoute path="/meetings/schedule" component={NewMeetingForm} />
            </div>
          </Router>
    </div>
  );
}

export default App;
