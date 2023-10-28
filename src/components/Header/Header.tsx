import { useState } from 'react';
import './Header.css';
import Logo from '../../assets/Logo.svg';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  window.addEventListener('scroll', handleScroll);

  return (
    <header className={isScrolled ? 'header_shrink' : ''}>
      <div className="header_container">
        <img className="header_img" src={Logo} alt="Logo de mon portfolio" />
        <ul className="header_list">
          <li className="header_item">
            <a className="header_link" href="#section_home">About</a>
          </li>
          <li className="header_item">
            <a className="header_link" href="#section_projects">Projets</a>
          </li>
          <li className="header_item">
            <a className="header_link" href="#section_contact">Contact</a>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
