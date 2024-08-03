import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function Taskbar() {
    const token = localStorage.getItem('token')
    return (
        <Navbar expand="lg" className="bg-gray">
            <Container>
                <Navbar.Brand as={Link} to="/" className='logo'>The 3TN-News</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/" >Trang Chủ</Nav.Link>
                        <NavDropdown title="Thể Loại" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/political">Chính trị</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/populace">Dân sinh</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/labour">Lao động việc làm</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/transport">Giao thông</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav className="mr-auto">
                        {!token && (
                            <Nav.Link as={Link} to="/login">
                                <Button variant="outline-dark">Đăng Nhập</Button>
                            </Nav.Link>
                        )}
                    </Nav>
                    <Form className="d-flex">
                        <FormControl
                            type="search"
                            placeholder="Tìm kiếm"
                            className="mr-2 form-control-md"
                            aria-label="Search"
                        />
                        <Button variant="outline-dark" size="sm">
                            <FontAwesomeIcon icon={faSearch} className='iconSearch' />
                        </Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Taskbar;
