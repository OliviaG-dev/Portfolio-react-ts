import './Home.css';
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
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  // const [showModal, setShowModal] = useState(false);

  // const openModal = () => {
  //   setShowModal(true);
  // }

  // const closeModal = () => {
  //   setShowModal(false);
  // }


  const filterProjectsByTags = () => {
    if (selectedTags.length === 0) {
      return dataProjects;
    }
  
    const filteredProjects = dataProjects.filter(project => {
      return project.tags.some(tag => selectedTags.includes(tag.item));
    });
  
    return filteredProjects;
  };

  const handleTagClick = (tag: string) => {
    console.log(tag);
    // const tags = document.querySelectorAll('.button_tag'); // Sélectionne tous les tags
    // tags.forEach(tagElement => {
    //   if (tagElement.textContent === tag) {
    //     tagElement.classList.toggle('active_tag'); // Ajoute ou retire la classe .activeTag
    //   }
    // });

    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(item => item !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const filteredProjects = filterProjectsByTags();

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
              <button className={`black ${selectedTags.includes("#HTML/CSS") ? 'active_tag' : 'button_tag'}`} onClick={() => handleTagClick("#HTML/CSS")}>HTML/CSS</button>
              <button className={`red ${selectedTags.includes("#FIGMA") ? 'active_tag' : 'button_tag'}`} onClick={() => handleTagClick("#FIGMA")}>FIGMA</button>
              <button className={`blue ${selectedTags.includes("#JAVASCRIPT") ? 'active_tag' : 'button_tag'}`} onClick={() => handleTagClick("#JAVASCRIPT")}>JAVASCRIPT</button>
              <button className={`green ${selectedTags.includes("#REACT") ? 'active_tag' : 'button_tag'}`} onClick={() => handleTagClick("#REACT")}>REACT</button>
              <button className={`violet ${selectedTags.includes("#BOOTSTRAP") ? 'active_tag' : 'button_tag'}`} onClick={() => handleTagClick("#BOOTSTRAP")}>BOOTSTRAP</button>
              <button className={`orange ${selectedTags.includes("#TAILWIND") ? 'active_tag' : 'button_tag'}`} onClick={() => handleTagClick("#TAILWIND")}>TAILWIND</button>
              <button className={`pink ${selectedTags.includes("#VUEJS") ? 'active_tag' : 'button_tag'}`} onClick={() => handleTagClick("#VUEJS")}>VUEJS</button>
            </div>
            <div className="project_tag">
              <p>PROJECTS</p>
            </div>
          </div>

          <div className="project_container">
            {filteredProjects.length === 0 ? (
              <p>Je n'ai pas de project...</p>
            ) : (
              filteredProjects.map((project: DataProjects) => (
                
                  <div className="project_wrapper" key={project.id}>
                    <div className="project">

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

                      <article className="project_back">
                        <div className="back_container">
                          <img
                            src={project.imagePortrait}
                            alt={project.title}
                          />
                        </div>
                      </article>
                    </div>
                    <div></div>
                    <div className="project_button">
                      <button className="project_link">Voir +</button>
                    </div>
                  </div>
                
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
