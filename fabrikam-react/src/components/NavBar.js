import React, {useState} from "react";
import {NavLink as RouterNavLink} from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";
import {
    Collapse,
    Container,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
    Button,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "reactstrap";
import "./NavBar.css"

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {
        user,
        isAuthenticated,
        loginWithRedirect,
        logout,
    } = useAuth0();
    const toggle = () => setIsOpen(!isOpen);

    const logoutWithRedirect = () =>
        logout({
            returnTo: window.location.origin,
        });

    return (
        <div className="nav-container">
            <Navbar expand="md">
                <Container>
                    <NavbarToggler onClick={toggle}/>
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <NavLink
                                    tag={RouterNavLink}
                                    to="/"
                                    exact
                                    activeClassName="router-link-exact-active"
                                >
                                    Home
                                </NavLink>
                            </NavItem>
                            {isAuthenticated && (
                                <NavItem>
                                    <NavLink
                                        tag={RouterNavLink}
                                        to="/meetings"
                                        exact
                                        activeClassName="router-link-exact-active"
                                    >
                                        Meetings
                                    </NavLink>
                                </NavItem>
                            )}
                        </Nav>
                        <Nav className="d-none d-md-block" navbar>
                            {!isAuthenticated && (
                                <NavItem>
                                    <Button
                                        id="qsLoginBtn"
                                        // color="primary"
                                        className="btn-margin"
                                        onClick={() => loginWithRedirect()}
                                    >
                                        Log in
                                    </Button>
                                </NavItem>
                            )}
                            {isAuthenticated && (
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret id="profileDropDown">
                                        <img
                                            src={user.picture}
                                            alt="Profile"
                                            className="nav-user-profile rounded-circle"
                                            width="50"
                                        />
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem header>{user.name}</DropdownItem>
                                        <DropdownItem
                                            tag={RouterNavLink}
                                            to="/meetings"
                                            className="dropdown-profile"
                                            activeClassName="router-link-exact-active"
                                        >
                                            Meetings
                                        </DropdownItem>
                                        <DropdownItem
                                            id="qsLogoutBtn"
                                            onClick={() => logoutWithRedirect()}
                                        >
                                            Log out
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            )}
                        </Nav>
                        {!isAuthenticated && (
                            <Nav className="d-md-none" navbar>
                                <NavItem>
                                    <Button
                                        id="qsLoginBtn"
                                        // color="primary"
                                        block
                                        onClick={() => loginWithRedirect({})}
                                    >
                                        Log in
                                    </Button>
                                </NavItem>
                            </Nav>
                        )}
                        {isAuthenticated && (
                            <Nav
                                className="d-md-none justify-content-between"
                                navbar
                                style={{minHeight: 170}}
                            >
                                <NavItem>
                                  <span className="user-info">
                                    <img
                                        src={user.picture}
                                        alt="Profile"
                                        className="nav-user-profile d-inline-block rounded-circle mr-3"
                                        width="50"
                                    />
                                    <h6 className="d-inline-block">{user.name}</h6>
                                  </span>
                                </NavItem>
                                <NavItem>
                                    <RouterNavLink
                                        to="/meetings"
                                        activeClassName="router-link-exact-active"
                                    >
                                        Meetings
                                    </RouterNavLink>
                                </NavItem>
                                <NavItem>
                                    <RouterNavLink
                                        to="#"
                                        id="qsLogoutBtn"
                                        onClick={() => logoutWithRedirect()}
                                    >
                                        Log out
                                    </RouterNavLink>
                                </NavItem>
                            </Nav>
                        )}
                    </Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default NavBar;
