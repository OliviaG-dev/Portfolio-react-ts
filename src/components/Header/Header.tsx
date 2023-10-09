import './Header.css';
import Logo from '../../assets/Logo.svg';

function Header() {
  return (
    <header>
      <div className="header_container">
        <img className="header_img" src={Logo} alt="Logo de mon portfolio" />
        <ul className="header_list">
          <li className="header_item">
            <a href="#section_home">About</a>
          </li>
          <li className="header_item">
            <a href="#section_projects">Projets</a>
          </li>
          <li className="header_item">
            <a href="#section_contact">Contact</a>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
