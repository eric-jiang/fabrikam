import {useAuth0} from "@auth0/auth0-react";
import {Nav} from "reactstrap";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";
import React from "react";

const AuthNav = () => {
    const { isAuthenticated } = useAuth0();

    return (
        <div className="nav-container">
            <Nav className="justify-content-end">
                {isAuthenticated ? <LogoutButton /> : <LoginButton />}
            </Nav>
        </div>
    );
};

export default AuthNav;