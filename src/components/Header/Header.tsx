import { useState, useEffect } from 'react';
import './Header.css';
import Logo from '../../assets/avatar-header.png';

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
        <a
          className="header_brand"
          href="#section_home"
          aria-label="Olivia Gautheron — Where I shatter, I shine"
          onClick={closeMenu}
        >
          <span className="header_avatar" aria-hidden="true">
            <span className="header_img_ring" />
            <img className="header_img" src={Logo} alt="" />
          </span>
          <span className="header_brand_text">
            <span className="header_brand_name">Creator</span>
            <span className="header_brand_tagline">
              Where I shatter, I{' '}
              <span className="header_brand_shine">
                shine
                <svg
                  className="header_shine_star header_shine_star--1"
                  width="11"
                  height="11"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M8 0.6L9.35 6.65L15.4 8L9.35 9.35L8 15.4L6.65 9.35L0.6 8L6.65 6.65Z" />
                </svg>
                <svg
                  className="header_shine_star header_shine_star--2"
                  width="8"
                  height="8"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M8 1.2L8.95 6.2L13.9 5.05L10.2 8L13.9 10.95L8.95 9.8L8 14.8L7.05 9.8L2.1 10.95L5.8 8L2.1 5.05L7.05 6.2Z" />
                </svg>
                <svg
                  className="header_shine_star header_shine_star--3"
                  width="9"
                  height="9"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M8 1.4c.2 2.4 1.2 4.2 3.6 5.2-2.4 1-3.4 2.8-3.6 5.2-.2-2.4-1.2-4.2-3.6-5.2C6.8 5.6 7.8 3.8 8 1.4Z" />
                </svg>
              </span>
            </span>
          </span>
        </a>
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
