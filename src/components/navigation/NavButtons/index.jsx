import React from 'react';
import { Link } from 'react-router-dom';

const NavButtons = () => {
  return (
    <div className='NavButtons'>

      <div className='NavButtonsBox'>
        <Link to="/" >
          Accueil
        </Link>
      </div>

      <div className='NavButtonsBox'>
        <Link to="/galeries">
          Galeries
        </Link>
      </div>

      <div className='NavButtonsBox'>
        <Link to="/a-propos" >
          A propos
        </Link>
      </div>

    </div>
  );
};

export default NavButtons;