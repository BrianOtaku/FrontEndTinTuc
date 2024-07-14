import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import BasicExample from './testContact';
import FluidExample from './testProfile';
import './App.css'; // Import file CSS

const Home = () => <div>Home Content</div>;
const Profile = () => (
    <div>
        <FluidExample />
    </div>
);
const Contact = () => (
    <div>
        <BasicExample />
    </div>
);

function TabNavigation() {
    const navigate = useNavigate();

    return (
        <div className="w-100">
            <Image src="/images/banner-1.jpg" fluid className="banner-image" />
            <Tabs
                defaultActiveKey="home"
                id="uncontrolled-tab-example"
                className="mb-3"
                onSelect={(k) => navigate(`/${k}`)}
            >
                <Tab eventKey="home" title="Home"></Tab>
                <Tab eventKey="profile" title="Profile"></Tab>
                <Tab eventKey="contact" title="Contact"></Tab>
            </Tabs>
        </div>
    );
}

function Switch() {
    return (
        <Router>
            <Container className="parent-container">
                <TabNavigation />
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </Container>
        </Router>
    );
}

export default Switch;
