import './Home.css';
import { useState } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Icon_email from '../assets/images/Icons/Icon_email.svg';
import Icon_github from '../assets/images/Icons/Icon_github.svg';
import Icon_linkedin from '../assets/images/Icons/Icon_linkedin.svg';
import Icon_cv from '../assets/images/Icons/Icon_cv.svg';
import Icon_date from '../assets/images/Icons/Icon_date.svg';
import Icon_notion from '../assets/images/Icons/Icon_notion.svg';
import { Data } from '../services/data';
import { DataProjects } from '../services/inteface';
import Modal from '../components/Modal/Modal';
import ScrollableAnchor from 'react-scrollable-anchor';
import QuestCard from '../components/QuestCard/QuestCard';
import PresentationCard from '../components/PresentationCard/PresentationCard';

function Home() {
  const data = new Data();
  const dataProjects = data.getDataProjects();

  console.log(dataProjects);
  const [selectedProject, setSelectedProject] = useState<DataProjects | null>(
    null
  );
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showQuest, setShowQuest] = useState<boolean>(false);
  const [showPresentation, setShowPresentation] = useState<boolean>(false);
  const [showAllProjects, setShowAllProjects] = useState<boolean>(false);

  const openModal = (project: DataProjects) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const filterProjectsByTags = () => {
    if (selectedTags.length === 0) {
      return showAllProjects ? dataProjects : dataProjects.slice(0, 6);
    }

    const filteredProjects = dataProjects.filter((project) => {
      return project.tags.some((tag) => selectedTags.includes(tag.item));
    });

    return showAllProjects ? filteredProjects : filteredProjects.slice(0, 6);
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
      {!showModal && <Header />}
      <main className="home">
        <ScrollableAnchor id={'section_home'}>
          <section className="home_about">
            <div className="home_box">
              <h1 className="home_title">
                <span className="title_color--code">
                  {'<section class="intro">'}
                </span>
                <div className="title_inline">
                  <span className="title_color--code">
                    {'<p class="greeting">'}
                  </span>
                  <p className="title_color--vio">Enchantée !👋</p>
                  <span className="title_color--code">{'</p>'}</span>
                </div>
                <br />
                <span className="title_color--code">{'<h1>'}</span> <br />
                <span className="title_color--sec">Je suis </span>
                <span className="title_color--code">
                  {'<span class="blue name"> '}
                </span>
                <span
                  className="title_color--blue egg_trigger"
                  onClick={() => setShowPresentation(!showPresentation)}
                >
                  Olivia Gautheron{' '}
                </span>
                <span className="title_color--code">{'</span>'}</span>
                <br />
                <span className="title_color--code">
                  {'<span class="role"> '}
                </span>
                <span className="title_color--vio">
                  Développeuse front-end 👩‍💻
                </span>
                <span className="title_color--code">{'</span>'}</span>
                <br />
                <span className="title_color--code">{'</h1>'}</span>
                <br />
                <br />
                <span className="title_color--code">{'<p class="fun"> '}</span>
                <span
                  className="title_color--sec egg_trigger"
                  onClick={() => setShowQuest(!showQuest)}
                >
                  et adepte des jeux vidéo 🧙‍♀️ !
                </span>
                <span className="title_color--code">{'</p>'}</span>
                <br />
                <span className="title_color--code">{'</section>'}</span>
              </h1>
              <div className="card_container">
                {showPresentation && (
                  <PresentationCard
                    onClose={() => setShowPresentation(false)}
                  />
                )}
                {showQuest && <QuestCard onClose={() => setShowQuest(false)} />}
              </div>
            </div>
            <div className="home_tag">
              <p>
                ABOUT<span className="tag_anim">_</span>
              </p>
            </div>
          </section>
        </ScrollableAnchor>

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
                    selectedTags.includes('#TYPESCRIPT')
                      ? 'active_tag'
                      : 'button_tag'
                  }`}
                  onClick={() => handleTagClick('#TYPESCRIPT')}
                >
                  TYPESCRIPT
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
                <>
                  {filteredProjects.map((project: DataProjects) => (
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
                                  <li
                                    key={tag.item}
                                    style={{ color: tag.style }}
                                  >
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
                  ))}
                </>
              )}
            </div>
            {dataProjects.length > 6 && (
              <div className="project_button show_all">
                <button
                  className="project_link"
                  onClick={() => setShowAllProjects(!showAllProjects)}
                >
                  {showAllProjects ? '-' : '+'}
                </button>
              </div>
            )}
            {showModal && (
              <Modal closeModal={closeModal} project={selectedProject} />
            )}
          </section>
        </ScrollableAnchor>

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
                    href="https://wandering-pancreas-05c.notion.site/Gautheron-Olivia-D-veloppeuse-frontend-React-39ec57aa8a274c3aa1a6af698fe077e2"
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
                    href="https://drive.google.com/file/d/1QwnqmNJUmOLv-ynpKBlrARNNJtjcr8KY/view?usp=sharing"
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
