// import thu vien
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';

// import ham tu file khac
import BasicExample from './testContact';
import FluidExample from './testProfile';
import HomePage from './testHome';
import TestTittle from './testTittle';

// import css
import './App.css';


const Home = () => (
    <div>
        <HomePage />
    </div>
);
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
const Tittle = () => (
    <div>
        <TestTittle />
    </div>
);

function TabNavigation() {
    const navigate = useNavigate();

    return (
        <div className="w-100">
            <Image src="/images/banner-3.png" fluid className="banner-image" />
            <div className='tabs-container'>
                <Tabs
                    defaultActiveKey="home"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                    fill
                    onSelect={(k) => navigate(`/${k}`)}
                >
                    <Tab eventKey="home" title="Home"></Tab>
                    <Tab eventKey="profile" title="Profile"></Tab>
                    <Tab eventKey="contact" title="Contact"></Tab>
                    <Tab eventKey="Tittle" title="Tittle"></Tab>
                </Tabs>
            </div>
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
                    <Route path="/Tittle" element={<Tittle />} />
                </Routes>
            </Container>
        </Router>
    );
}

export default Switch;
