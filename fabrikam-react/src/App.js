import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./containers/Home";
import Meetings from "./containers/Meetings/Meetings";
import NewMeetingForm from "./containers/NewMeetingForm/NewMeetingForm";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div className="App">
        <h3 className="header-title">Fabrikam Meetings</h3>
        <Router>
            <div>
                <Route exact path="/" component={Home} />
                <PrivateRoute exact path="/meetings" component={Meetings} />
              <PrivateRoute path="/meetings/schedule" component={NewMeetingForm} />
            </div>
          </Router>
    </div>
  );
}

export default App;
