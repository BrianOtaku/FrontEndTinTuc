import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Taskbar() {
    return (
        <Navbar expand="lg" className="bg-gray">
            <Container>
                <Navbar.Brand as={Link} to="/" className='logo'>React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/" >Home</Nav.Link>
                        <Nav.Link as={Link} to="/news" >News</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/action">Action</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/another-action">Another action</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/something">Something</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/separated-link">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/login">
                            <Button variant="outline-dark">Sign in</Button>
                        </Nav.Link>
                    </Nav>
                    <Form className="d-flex">
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="mr-2 form-control-md"
                            aria-label="Search"
                        />
                        <Button variant="outline-dark" size="sm">
                            Search
                        </Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Taskbar;
