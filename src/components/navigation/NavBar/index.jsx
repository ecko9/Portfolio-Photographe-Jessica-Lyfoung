import React from 'react';
import NavButtons from './NavButtons';
import NavTitle from './NavTitle';

const NavBar = () => {
  return (
    <div className='NavBar' id='NavBar'>
      <NavTitle />
      <NavButtons />
    </div>
  );
};

export default NavBar;