import React from 'react';
import NavButton from '../NavButton';
import NavTitle from '../NavTitle';

const NavBar = () => {
  return (
    <div className='NavBar'>
      <NavTitle />
      <NavButton />
    </div>
  );
};

export default NavBar;