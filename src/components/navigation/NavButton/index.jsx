import React from 'react';
import { Link } from 'react-router-dom';

const NavButton = () => {
  return (
    <div className='NavButton'>

      <div className='NavButtonBox'>
        <Link to="/" >
          Accueil
        </Link>
      </div>

      <div className='NavButtonBox'>
        <Link to="/galeries">
          Galeries
        </Link>
      </div>

      <div className='NavButtonBox'>
        <Link to="/a-propos" >
          A propos
        </Link>
      </div>

    </div>
  );
};

export default NavButton;