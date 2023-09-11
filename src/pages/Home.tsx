import './Home.css';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Frise from '../components/Frise/Frise';
import Icon_email from '../assets/images/Icons/Icon_email.svg';
import Icon_github from '../assets/images/Icons/Icon_github.svg';
import Icon_linkedin from '../assets/images/Icons/Icon_linkedin.svg';
import Icon_localisation from '../assets/images/Icons/Icon_localisation.svg';

function Home() {
  return (
    <>
      <Header />
      <main className="home">
        <section>
          <div className="home_container">
            <div className="home_box">
              <div className="home_title">
                <span className="title_color--code">{'<h1>'}</span>
                <span className="title_color--sec">je suis</span>
                <br />
                <span className="title_color--code">{"<p id='blue'>"}</span>
                <span className="title_color--blue">Olivia Gautheron </span>
                <span className="title_color--code">{'</p>'}</span>
                <span className="title_color--code">{'<span>'}</span>
                <span className="title_color--vio">Développeuse web</span>
                <span className="title_color--code">{'</span>'}</span>
                <br />
                <span className="title_color--sec">et une geek !</span>
                <span className="title_color--code">{'</h1>'}</span>
              </div>
            </div>
            <div className="home_tag">
              <p>ABOUT</p>
            </div>
          </div>
        </section>

        <div className="home_presentation">
          <p className="presentation_text">
            Hey ! 👋 <br />
            Je suis une geek passionnée 🎮 et une développeuse front-end
            enthousiaste 🌸. Le web, c'est vraiment ma tasse de thé ! 🍵 Mais
            avant d'en arriver là, j'ai fait mes armes dans le monde trépidant
            de l'hôtellerie-restauration. J'ai développée un sacré sens du
            service et une relation client aux petits oignons. Mais entre nous,
            mon cœur battait déjà pour l'informatique, et c'est grâce à mon
            entourage proche que j'ai été happée par l'univers du web.
          </p>
        </div>

        <Frise rotation={false} />

        <section className="home_project"></section>

        <Frise rotation />

        <section className="home_contact">
          <div className="contact_text">
            <div>
              <img src={Icon_linkedin} alt="icone linkedin" />
            </div>
            <div>
              <img src={Icon_github} alt="icone github" />
            </div>
            <h2>
              <img src={Icon_email} alt="icone email" />
            </h2>
            <div>
              <img src={Icon_localisation} alt="icone localisation" />
            </div>
          </div>
          <div className="home_tag">
            <p>CONTACT</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Home;
