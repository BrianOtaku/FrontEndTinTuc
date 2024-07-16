import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Taskbar from './components/Taskbar';
import Home from './pages/Home';
import News from './pages/News';
import Action from './pages/Action';
import AnotherAction from './pages/AnotherAction';
import Something from './pages/Something';
import SeparatedLink from './pages/SeparatedLink';
// import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';

function App() {
  return (
    <Router>
      <div className="parent-container">
        <Taskbar />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/news" element={<News />} />
            <Route path="/action" element={<Action />} />
            <Route path="/another-action" element={<AnotherAction />} />
            <Route path="/something" element={<Something />} />
            <Route path="/separated-link" element={<SeparatedLink />} />
            <Route path="/login" element={<SignIn />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
