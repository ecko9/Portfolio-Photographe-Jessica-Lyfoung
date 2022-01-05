import React from 'react';
import NavBar from 'components/navigation/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from 'pages/Home';
import NotFound from 'pages/NotFound';


const App = () => {
  return (
    <div className='App'>
      <NavBar />
      <Router>
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;