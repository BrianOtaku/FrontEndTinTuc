// import thu vien
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//import chuong trinh
import Action from './pages/Political';
import AnotherAction from './pages/Populace';
import Footer from './pages/Footer';
import Taskbar from './components/Navbar';
import Home from './pages/Home';
import Something from './pages/Labour';
import SeparatedLink from './pages/Transport';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import OffcanvasComponent from './components/Offcanvas';

// import css bo cuc
import './styles/Navbar.css';
import './styles/Footer.css';
import './styles/WebForm.css';
import './styles/Offcanvas.css';
import './styles/formNews.css';
import './styles/loadMoreButton.css'

// import css trang
import './styles/Home.css';
import './styles/SignIn.css';
import './styles/SignUp.css';

function App() {
  return (
    <Router>
      <div className="parent-container">
        <Taskbar />
        <div className="separator">
          <OffcanvasComponent />
        </div>
        <div className="content-container">
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/action" element={<Action />} />
              <Route path="/another-action" element={<AnotherAction />} />
              <Route path="/something" element={<Something />} />
              <Route path="/separated-link" element={<SeparatedLink />} />
              <Route path="/login" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
