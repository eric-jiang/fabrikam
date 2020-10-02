import React from "react";
import NavBar from "../components/NavBar";
import {useAuth0} from "@auth0/auth0-react";

const Home = () => {

    const {
        user,
        isAuthenticated,
    } = useAuth0();
    
    return (
        <>
            <NavBar />
            <div className="body-text-container">
                {isAuthenticated
                    ?(<h5>You're currently logged in as <b>{user.email}</b></h5>) 
                    : (<h5>Please Sign in with your Fabrikam account</h5>)
                }
            </div>
        </>
    );
}

export default Home