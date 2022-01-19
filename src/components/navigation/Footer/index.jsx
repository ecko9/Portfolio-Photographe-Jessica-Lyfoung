import React from 'react';
import Contact from '../Contact';
import NavLogos from '../NavLogos';

const Footer = () => {
  return (
    <div className='Footer'>
      <NavLogos />
      <Contact />
      <div className='FooterDesignBlock'></div>
    </div>
  );
};

export default Footer;