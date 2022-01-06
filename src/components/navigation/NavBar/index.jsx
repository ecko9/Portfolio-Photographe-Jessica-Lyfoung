import React from 'react';
import NavButtons from '../NavButtons';
import NavLogos from '../NavLogos';
import NavTitle from '../NavTitle';

const NavBar = () => {
  return (
    <div className='NavBar'>
      <NavTitle />
      <NavButtons />
      <NavLogos />
    </div>
  );
};

export default NavBar;