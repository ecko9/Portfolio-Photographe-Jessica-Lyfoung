import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const NavButtons = () => {

  const navigate = useNavigate()
  const location = useLocation()
  const [splitLocation, setSplitLocation] = React.useState(null)
  const { pathname } = location


  React.useEffect(
    () => {
      setSplitLocation(pathname.split("/"));
      return;
    }, [location, pathname]
  )

  return (
    <div className='NavButtons'>

      {splitLocation !== null &&
        <div className={splitLocation[1] === "" ? 'NavButtonsBox active-nav link' : 'NavButtonsBox link'} onClick={e => navigate("/")}>
          <h3>
            Accueil
          </h3>
        </div>
      }
      {splitLocation !== null &&
        <div className={splitLocation[1] === "galleries" ? 'NavButtonsBox active-nav link' : 'NavButtonsBox link'} onClick={e => navigate("/galleries")}>
          <div className='NavButtonsBoxBg'>
          </div>
          <h3>
            Galeries
          </h3>
        </div>
      }
      {splitLocation !== null &&
        <div className={splitLocation[1] === "a-propos" ? 'NavButtonsBox active-nav link' : 'NavButtonsBox link'} onClick={e => navigate("/a-propos")}>
          <div className='NavButtonsBoxBg'>
          </div>
          <h3>
            A propos
          </h3>
        </div>
      }
    </div>
  );
};

export default NavButtons;