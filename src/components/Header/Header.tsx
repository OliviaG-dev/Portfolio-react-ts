import './Header.css';
import Logo from '../../assets/Logo.svg';

function Header() {
  return (
    <header>
      <div className="header_container">
        <img className="header_img" src={Logo} alt="Logo de mon portfolio" />
        <ul className="header_list">
          <li>About</li>
          <li>Projets</li>
          <li>Contact</li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
