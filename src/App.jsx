import React from 'react';
import NavBar from 'components/navigation/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from 'pages/Home';
import Galleries from 'pages/Galleries';
import About from 'pages/About';
import NotFound from 'pages/NotFound';



const App = () => {
  return (
    <div className='App'>

      <Router>
        <NavBar />
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/galeries' exact element={<Galleries />} />
          <Route path='/a-propos' exact element={<About />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>

    </div>
  );
};

export default App;