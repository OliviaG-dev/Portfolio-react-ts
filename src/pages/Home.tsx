import './Home.css';
import { useState } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Frise from '../components/Frise/Frise';
import Icon_email from '../assets/images/Icons/Icon_email.svg';
import Icon_github from '../assets/images/Icons/Icon_github.svg';
import Icon_linkedin from '../assets/images/Icons/Icon_linkedin.svg';
import Icon_cv from '../assets/images/Icons/Icon_cv.svg';
import Icon_date from '../assets/images/Icons/Icon_date.svg';
import Icon_notion from '../assets/images/Icons/Icon_notion.svg';
import Data from '../services/data';
import { DataProjects } from '../services/inteface';
import Modal from '../components/Modal/Modal';
import ScrollableAnchor from 'react-scrollable-anchor';

function Home() {
  const data = new Data();
  const dataProjects = data.getDataProjects();

  console.log(dataProjects);
  const [selectedProject, setSelectedProject] = useState<DataProjects | null>(
    null
  );
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);

  const openModal = (project: DataProjects) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const filterProjectsByTags = () => {
    if (selectedTags.length === 0) {
      return dataProjects;
    }

    const filteredProjects = dataProjects.filter((project) => {
      return project.tags.some((tag) => selectedTags.includes(tag.item));
    });

    return filteredProjects;
  };

  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((item) => item !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const filteredProjects = filterProjectsByTags();

  return (
    <>
      <Header />
      <main className="home">
        <ScrollableAnchor id={'section_home'}>
          <section className="home_about">
            <div className="home_box">
              <h1 className="home_title">
                <p className="title_color--vio">Hi ! 👋</p>
                <span className="title_color--code">{'<h1>'}</span>
                <span className="title_color--sec">je suis</span>
                <br />
                <span className="title_color--code">{"<p class='blue'>"}</span>
                <span className="title_color--blue">Olivia Gautheron </span>
                <span className="title_color--code">{'</p>'}</span>
                <span className="title_color--code">{'<span>'}</span>
                <span className="title_color--vio">
                  Développeuse front-end 👩‍💻
                </span>
                <span className="title_color--code">{'</span>'}</span>
                <br />
                <span className="title_color--sec">
                  et adepte des jeux vidéo 🧙‍♀️!
                </span>
                <span className="title_color--code">{'</h1>'}</span>
              </h1>
            </div>
            <div className="home_tag">
              <p>
                ABOUT<span className="tag_anim">_</span>
              </p>
            </div>
          </section>
        </ScrollableAnchor>

        <Frise rotation={false} />

        <ScrollableAnchor id={'section_projects'}>
          <section className="home_project">
            <div className="project_tag_container">
              <div className="button_container">
                <button
                  className={`black ${
                    selectedTags.includes('#HTML/CSS')
                      ? 'active_tag'
                      : 'button_tag'
                  }`}
                  onClick={() => handleTagClick('#HTML/CSS')}
                >
                  HTML/CSS
                </button>
                <button
                  className={`red ${
                    selectedTags.includes('#FIGMA')
                      ? 'active_tag'
                      : 'button_tag'
                  }`}
                  onClick={() => handleTagClick('#FIGMA')}
                >
                  FIGMA
                </button>
                <button
                  className={`blue ${
                    selectedTags.includes('#JAVASCRIPT')
                      ? 'active_tag'
                      : 'button_tag'
                  }`}
                  onClick={() => handleTagClick('#JAVASCRIPT')}
                >
                  JAVASCRIPT
                </button>
                <button
                  className={`green ${
                    selectedTags.includes('#REACT')
                      ? 'active_tag'
                      : 'button_tag'
                  }`}
                  onClick={() => handleTagClick('#REACT')}
                >
                  REACT
                </button>
                <button
                  className={`violet ${
                    selectedTags.includes('#BOOTSTRAP')
                      ? 'active_tag'
                      : 'button_tag'
                  }`}
                  onClick={() => handleTagClick('#BOOTSTRAP')}
                >
                  BOOTSTRAP
                </button>
                <button
                  className={`orange ${
                    selectedTags.includes('#TAILWIND')
                      ? 'active_tag'
                      : 'button_tag'
                  }`}
                  onClick={() => handleTagClick('#TAILWIND')}
                >
                  TAILWIND
                </button>
                <button
                  className={`pink ${
                    selectedTags.includes('#VUEJS')
                      ? 'active_tag'
                      : 'button_tag'
                  }`}
                  onClick={() => handleTagClick('#VUEJS')}
                >
                  VUEJS
                </button>
              </div>
              <div className="project_tag">
                <p>
                  PROJECTS<span className="tag_anim">_</span>
                </p>
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
                      <button
                        className="project_link"
                        onClick={() => openModal(project)}
                      >
                        Voir +
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            {showModal && (
              <Modal closeModal={closeModal} project={selectedProject} />
            )}
          </section>
        </ScrollableAnchor>

        <Frise rotation />

        <ScrollableAnchor id={'section_contact'}>
          <section className="home_contact">
            <div className="tag_container">
              <div className="home_tag">
                <p>
                  CONTACT<span className="tag_anim">_</span>
                </p>
              </div>
            </div>

            <div className="contact_text">
              <div className="text_contain line">
                <div className="contact_item">
                  <img src={Icon_linkedin} alt="icone linkedin" />
                  <a
                    className="contact_link"
                    href="https://www.linkedin.com/in/olivia-gautheron-dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Connectons-nous sur LinkedIn !
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
                    Explorez mes projets sur GitHub !
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
                    Voici mon adresse électronique !
                  </a>
                </div>
              </div>
              <div className="text_contain">
                <div className="contact_item">
                  <img src={Icon_notion} alt="icone notion" />
                  <a
                    className="contact_link"
                    href=""
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visitez mon CV sur notion !
                  </a>
                </div>
                <div className="contact_item">
                  <img src={Icon_date} alt="icone date" />
                  <a
                    className="contact_link"
                    href="https://calendly.com/olivia_gautheron/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Prenez un rendez-vous !
                  </a>
                </div>
                <div className="contact_item">
                  <img src={Icon_cv} alt="icone cv" />
                  <a
                    className="contact_link"
                    href=""
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Mon CV en pdf !
                  </a>
                </div>
              </div>
            </div>
          </section>
        </ScrollableAnchor>
      </main>
      <Footer />
    </>
  );
}

export default Home;
