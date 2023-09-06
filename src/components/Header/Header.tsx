import './Header.css';
import Logo from '../../assets/Logo.svg';

function Header() {
  return (
    <header className="header">
      <div className="header_container">
        <img src={Logo} alt="Logo de mon portfolio" />
        <ul className="header_list">
          <li>About</li>
          <li>Projets</li>
          <li>Contact</li>
        </ul>
      </div>
      <div className="header_line"></div>
    </header>
  );
}

export default Header;
