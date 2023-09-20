import './Home.css';
//import { Link } from 'react-router-dom';
import { useState } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Frise from '../components/Frise/Frise';
import Icon_email from '../assets/images/Icons/Icon_email.svg';
import Icon_github from '../assets/images/Icons/Icon_github.svg';
import Icon_linkedin from '../assets/images/Icons/Icon_linkedin.svg';
import Icon_localisation from '../assets/images/Icons/Icon_localisation.svg';
import Data from '../services/data';
import { DataProjects } from '../services/inteface';

function Home() {
  const data = new Data();
  const dataProjects = data.getDataProjects();

  console.log(dataProjects);
  // const [showModal, setShowModal] = useState(false);

  // const openModal = () => {
  //   setShowModal(true);
  // }

  // const closeModal = () => {
  //   setShowModal(false);
  // }

  return (
    <>
      <Header />
      <main className="home">
        <section>
          <div className="home_container">
            <div className="home_box">
              <h1 className="home_title">
                <span className="title_color--code">{'<h1>'}</span>
                <span className="title_color--sec">je suis</span>
                <br />
                <span className="title_color--code">{"<p class='blue'>"}</span>
                <span className="title_color--blue">Olivia Gautheron </span>
                <span className="title_color--code">{'</p>'}</span>
                <span className="title_color--code">{'<span>'}</span>
                <span className="title_color--vio">Développeuse web</span>
                <span className="title_color--code">{'</span>'}</span>
                <br />
                <span className="title_color--sec">et une geek !</span>
                <span className="title_color--code">{'</h1>'}</span>
              </h1>
            </div>
            <div className="home_tag">
              <p>ABOUT</p>
            </div>
          </div>

          <div className="home_presentation">
            <p className="presentation_text">
              Hey ! 👋 <br />
              Je suis une geek passionnée 🎮 et une développeuse front-end
              enthousiaste 🌸. <br /> Le web, c'est vraiment ma tasse de thé !
              🍵 Mais avant d'en arriver là, j'ai fait mes armes dans le monde
              trépidant de l'hôtellerie-restauration. J'ai développée un sacré
              sens du service et une relation client aux petits oignons. Mais
              entre nous, mon cœur battait déjà pour l'informatique, et c'est
              grâce à mon entourage proche que j'ai été happée par l'univers du
              web.
            </p>
          </div>
        </section>

        <Frise rotation={false} />

        <section className="home_project">
          <div className="project_tag_container">
            <div className="button_container">
              <button className="button_tag black">HTML/CSS</button>
              <button className="button_tag red">FIGMA</button>
              <button className="button_tag blue">JAVASCRIPT</button>
              <button className="button_tag green">REACT</button>
              <button className="button_tag violet">BOOTSTRAP</button>
              <button className="button_tag orange">TAILWIND</button>
              <button className="button_tag pink">VUEJS</button>
            </div>
            <div className="project_tag">
              <p>PROJECTS</p>
            </div>
          </div>

          <div className="project_container">
            {dataProjects.length === 0 ? (
              <p>Je n'ai pas de project...</p>
            ) : (
              dataProjects.map((project: DataProjects) => (
                <>
                  <div className="project_wrapper">
                    <div className="project" key={project.id}>
                      
                      <article className="project_front">
                        <div className="front_up">
                          <h2 className="up_title">{project.title}</h2>
                          <p className="up_describe">{project.describe}</p>
                        </div>
                        <div className="front_down">
                          <span>
                            <ul className="down_list">
                              {project.tags.map((tag) => (
                                <li key={tag.item} style={{ color: tag.style }}>
                                  {tag.item}
                                </li>
                              ))}
                            </ul>
                          </span>
                        </div>
                      </article>
                  
                      <article className="project_back" >
                        <div className="back_container">
                          <img
                            src={project.imagePortrait}
                            alt={project.title}
                          />
                        </div>
                      </article>

                    </div>
                    <div className="project_link">Voir +</div>
                  </div>
                </>
              ))
            )}
          </div>
        </section>

        <Frise rotation />

        <section className="home_contact">
          <div className="tag_container">
            <div className="home_tag">
              <p>CONTACT</p>
            </div>
          </div>

          <div className="contact_text">
            <div className="contact_item">
              <img src={Icon_linkedin} alt="icone linkedin" />
              <a
                className="contact_link"
                href="https://www.linkedin.com/in/olivia-gautheron-dev/"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.linkedin.com/in/olivia-gautheron-dev/
              </a>
            </div>
            <div className="contact_item">
              <img src={Icon_github} alt="icone github" />
              <a
                className="contact_link"
                href="https://github.com/OliviaG-dev"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://github.com/OliviaG-dev
              </a>
            </div>
            <div className="contact_item">
              <img src={Icon_email} alt="icone email" />
              <a
                className="contact_link"
                href="mailto:oliviagautherondev@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                oliviagautherondev@gmail.com
              </a>
            </div>
            <div className="contact_item last_item">
              <img src={Icon_localisation} alt="icone localisation" />
              <p className="contact_link">Auvergne-Rhône-Alpes</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Home;
