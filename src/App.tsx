// import thu vien
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//import chuong trinh
import Taskbar from './components/Navbar';
import Home from './pages/Home';
import News from './pages/News';
import Action from './pages/Action';
import AnotherAction from './pages/AnotherAction';
import Something from './pages/Something';
import SeparatedLink from './pages/SeparatedLink';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Aside from './pages/Aside';
import Footer from './pages/Footer';

// import css bo cuc
import './styles/Navbar.css';
import './styles/Footer.css';
import './styles/WebForm.css';

// import css trang
import './styles/Home.css';
import './styles/SignIn.css';
import './styles/SignUp.css';

function App() {
  return (
    <Router>
      <div className="parent-container">
        <Taskbar />
        <div className="separator"></div>
        <div className="content-container">
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/news" element={<News />} />
              <Route path="/action" element={<Action />} />
              <Route path="/another-action" element={<AnotherAction />} />
              <Route path="/something" element={<Something />} />
              <Route path="/separated-link" element={<SeparatedLink />} />
              <Route path="/login" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </div>
          <aside className="side-content">
            <Aside />
          </aside>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
