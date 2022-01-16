import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
const NavBar = () => {
  const { currentUser, logout } = useAuth();

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>
            <Nav.Link as={NavLink} to="/">
              Activity Management
            </Nav.Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className={
              window.innerWidth > 990 ? 'd-flex justify-content-end' : 'me-auto'
            }
          >
            <Nav>
              {currentUser ? (
                <>
                  <Nav.Link className="text-primary">
                    <i className="fas fa-user"></i> {currentUser.displayName}
                  </Nav.Link>{' '}
                  <Nav.Link
                    className="text-primary"
                    onClick={async () => await logout()}
                  >
                    LOGOUT <i className="fas fa-sign-out-alt"></i>
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link as={NavLink} to="/login">
                  <i className="fas fa-sign-in-alt"></i> SignUp Or Login
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="py-3">
        <Navbar bg="light" variant="light">
          <Container>
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/study">
                Study
              </Nav.Link>
              <Nav.Link as={NavLink} to="/target">
                Target
              </Nav.Link>
              <Nav.Link as={NavLink} to="/achievement">
                Achievement
              </Nav.Link>
              <Nav.Link as={NavLink} to="/students">
                Students
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </Container>
    </>
  );
};

export default NavBar;
