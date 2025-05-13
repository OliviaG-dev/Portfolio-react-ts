import { useState, useEffect } from 'react';
import './Header.css';
import Logo from '../../assets/Logo.svg';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={isScrolled ? 'header_shrink' : ''}>
      <div className="header_container">
        <img className="header_img" src={Logo} alt="Logo de mon portfolio" />
        <div
          className={`burger_menu ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
        >
          <div className="burger_line"></div>
          <div className="burger_line"></div>
          <div className="burger_line"></div>
        </div>
        <ul className={`header_list ${isMenuOpen ? 'active' : ''}`}>
          <li className="header_item">
            <a className="header_link" href="#section_home" onClick={closeMenu}>
              About
            </a>
          </li>
          <li className="header_item">
            <a
              className="header_link"
              href="#section_projects"
              onClick={closeMenu}
            >
              Projets
            </a>
          </li>
          <li className="header_item">
            <a
              className="header_link"
              href="#section_contact"
              onClick={closeMenu}
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
