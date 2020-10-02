import React from "react";
import {Container, Navbar} from "reactstrap";
import AuthNav from "./AuthNav";
import "./NavBar.css"

const NavBar = () => {
    return (
            <Navbar color="light" className="nav-bar">
                <Container className="nav-bar-container">
                    <AuthNav />
                </Container>
            </Navbar>
    );
};

export default NavBar;