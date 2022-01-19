import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavButtons = () => {

  const navigate = useNavigate()
  return (
    <div className='NavButtons'>

      <div className='NavButtonsBox' onClick={e => navigate("/")}>
        <p>
          Accueil
        </p>
      </div>

      <div className='NavButtonsBox' onClick={e => navigate("/galleries")}>
        <div className='NavButtonsBoxBg'>
        </div>
        <p>
          Galleries
        </p>
      </div>

      <div className='NavButtonsBox' onClick={e => navigate("/a-propos")}>
        <div className='NavButtonsBoxBg'>
        </div>
        <p>
          A propos
        </p>
      </div>

    </div>
  );
};

export default NavButtons;