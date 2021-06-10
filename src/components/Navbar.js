import React, { useState } from 'react';
import { Button } from './Button';
import { Link, useHistory } from 'react-router-dom';
import './Navbar.css';
import Dropdown from './Dropdown';
import Media from "react-bootstrap/Media";

function Navbar() {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  let history = useHistory();

  function registerPath() {
    closeMobileMenu();
    history.push("/home");
  }

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  return (
    <>
      <nav className='navbar'>
        
        <div className="navbar-logo">
        <Media>
        <img
          width={64}
          height={64}
          className="mr-3"
          src="https://datastandard.blob.core.windows.net/botimg/5a04c6f7b93255412c784a4e.png"
          alt=""
        />
          </Media>
          </div>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link to='/' className='nav-links' onClick={registerPath}>
              ACCUEIL
            </Link>
          </li>
          <li
            className='nav-item'
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <Link
              className='nav-links'
            >
              CONSULTATIONS <i className='fas fa-caret-down' />
            </Link>
            {dropdown && <Dropdown />}
          </li>
          <li className='nav-item'>
            <Link
              to='/products'
              className='nav-links'
              onClick={registerPath}
            >
              OUTILS
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to='/contact-us'
              className='nav-links'
              onClick={registerPath}
            >
              ORGANES
            </Link>
          </li>
          <li>
            <Link
              to='/sign-up'
              className='nav-links-mobile'
              onClick={registerPath}
            >
              CONNEXION
            </Link>
          </li>
        </ul>
        <Button />
      </nav>
    </>
  );
}

export default Navbar;
