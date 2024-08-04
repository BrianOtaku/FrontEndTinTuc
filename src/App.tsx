// import thu vien
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//import chuong trinh
import Home from './pages/Home';
import Political from './pages/Political';
import Populace from './pages/Populace';
import Labour from './pages/Labour';
import Transport from './pages/Transport';
import Taskbar from './components/Navbar';
import Footer from './pages/Footer';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import OffcanvasComponent from './components/Offcanvas';
import NewsDetail from './template/newsDetail';
import NewsDetailByType from './template/newsDetailByType';
import SearchResults from './template/searchResults';

// import css bo cuc
import './styles/WebForm.css';
import './styles/formNews.css';

// import css component
import './styles/Navbar.css';
import './styles/Footer.css';
import './styles/Offcanvas.css';
import './styles/loadMoreButton.css'
import './styles/Comment.css';
import './styles/CommentForPage.css';

// import css trang
import './styles/SignIn.css';
import './styles/SignUp.css';
// import './styles/Home.css';

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
              <Route path="/political" element={<Political />} />
              <Route path="/populace" element={<Populace />} />
              <Route path="/labour" element={<Labour />} />
              <Route path="/transport" element={<Transport />} />
              <Route path="/login" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/news/:id" element={<NewsDetail />} />
              <Route path="/news-detail-by-type/:type/:id" element={<NewsDetailByType />} />
              <Route path="/search-results" element={<SearchResults />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
