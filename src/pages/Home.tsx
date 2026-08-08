import './Home.css';
import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Icon_email from '../assets/images/Icons/Icon_email.svg';
import Icon_github from '../assets/images/Icons/Icon_github.svg';
import Icon_linkedin from '../assets/images/Icons/Icon_linkedin.svg';
import Icon_cv from '../assets/images/Icons/Icon_cv.svg';
import Icon_lotus from '../assets/images/Icons/Icon_lotus.png';
import { Data } from '../services/data';
import { DataProjects } from '../services/inteface';
import Modal from '../components/Modal/Modal';
import QuestCard from '../components/QuestCard/QuestCard';
import PresentationCard from '../components/PresentationCard/PresentationCard';
import AboutConstellation from '../components/AboutConstellation/AboutConstellation';

const CONTACT_ORBIT_REVEAL_THRESHOLD = 0.25;

function Home() {
  const data = new Data();
  const dataProjects = data.getDataProjects();

  const [selectedProject, setSelectedProject] = useState<DataProjects | null>(
    null
  );
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showQuest, setShowQuest] = useState<boolean>(false);
  const [showPresentation, setShowPresentation] = useState<boolean>(false);
  const [showAllProjects, setShowAllProjects] = useState<boolean>(false);
  const [flippedProjectId, setFlippedProjectId] = useState<string | null>(null);
  const [isContactOrbitVisible, setIsContactOrbitVisible] = useState(false);
  const contactOrbitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const contactOrbitElement = contactOrbitRef.current;
    if (!contactOrbitElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setIsContactOrbitVisible(true);
        observer.disconnect();
      },
      { threshold: CONTACT_ORBIT_REVEAL_THRESHOLD }
    );

    observer.observe(contactOrbitElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  const openModal = (project: DataProjects) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const canHoverFlip = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  const toggleProjectFlip = (projectId: string) => {
    setFlippedProjectId((currentId) =>
      currentId === projectId ? null : projectId
    );
  };

  const handleProjectCardClick = (projectId: string) => {
    if (canHoverFlip()) return;
    toggleProjectFlip(projectId);
  };

  const handleProjectCardKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
    projectId: string
  ) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    toggleProjectFlip(projectId);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const filterProjectsByTags = () => {
    if (selectedTags.length === 0) {
      return showAllProjects ? dataProjects : dataProjects.slice(0, 6);
    }

    const filteredProjects = dataProjects.filter((project) => {
      const hasSelectedTag = project.tags.some((tag) =>
        selectedTags.includes(tag.item)
      );
      return hasSelectedTag;
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

  const handleEmailClick = () => {
    const mailtoLink = 'mailto:oxtramag@gmail.com';
    const gmailComposeUrl =
      'https://mail.google.com/mail/?view=cm&fs=1&to=oxtramag@gmail.com';

    window.location.href = mailtoLink;

    // Fallback: if no default mail client handles mailto, open Gmail compose.
    window.setTimeout(() => {
      if (document.hasFocus()) {
        window.open(gmailComposeUrl, '_blank', 'noopener,noreferrer');
      }
    }, 500);
  };

  const filteredProjects = filterProjectsByTags();

  return (
    <>
      {!showModal && <Header />}
      <main className="home">
        <section id="section_home" className="home_about">
          <div className="home_box">
            <div className="about_intro">
              <p className="about_greeting">
                Enchantée !
                <img
                  className="about_greeting_icon"
                  src={Icon_lotus}
                  alt=""
                  aria-hidden="true"
                />
              </p>
              <p className="about_lead">Je suis</p>
              <h1 className="about_name">
                <span
                  className="egg_trigger"
                  onClick={() => setShowPresentation(!showPresentation)}
                  title="Un secret t'attend…"
                >
                  Olivia Gautheron
                </span>
              </h1>
              <p className="about_role">Fullstack builder</p>
              <p className="about_stack">front · back · IA</p>
              <p
                className="about_fun egg_trigger"
                onClick={() => setShowQuest(!showQuest)}
                title="Un secret t'attend…"
              >
                et rêveuse de mondes virtuels
              </p>
            </div>

            <div className="about_visual" aria-hidden="true">
              <AboutConstellation />
            </div>
          </div>

          <div className="card_container">
            {showPresentation && (
              <PresentationCard onClose={() => setShowPresentation(false)} />
            )}
            {showQuest && <QuestCard onClose={() => setShowQuest(false)} />}
          </div>

          <div className="about_tag">
            <p>
              ABOUT<span className="tag_anim">_</span>
            </p>
          </div>
        </section>

        <section id="section_projects" className="home_project">
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
                  selectedTags.includes('#REACT NATIVE')
                    ? 'active_tag'
                    : 'button_tag'
                }`}
                onClick={() => handleTagClick('#REACT NATIVE')}
              >
                REACT NATIVE
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
                  selectedTags.includes('#REACT') ? 'active_tag' : 'button_tag'
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
                  selectedTags.includes('#NODEJS') ? 'active_tag' : 'button_tag'
                }`}
                onClick={() => handleTagClick('#NODEJS')}
              >
                NODEJS
              </button>
              <button
                className={`pink ${
                  selectedTags.includes('#VUEJS') ? 'active_tag' : 'button_tag'
                }`}
                onClick={() => handleTagClick('#VUEJS')}
              >
                VUEJS
              </button>
              <button
                className={`angular ${
                  selectedTags.includes('#ANGULAR')
                    ? 'active_tag'
                    : 'button_tag'
                }`}
                onClick={() => handleTagClick('#ANGULAR')}
              >
                ANGULAR
              </button>
              <button
                className={`nx ${
                  selectedTags.includes('#NX') ? 'active_tag' : 'button_tag'
                }`}
                onClick={() => handleTagClick('#NX')}
              >
                NX
              </button>
              <button
                className={`supabase ${
                  selectedTags.includes('#SUPABASE')
                    ? 'active_tag'
                    : 'button_tag'
                }`}
                onClick={() => handleTagClick('#SUPABASE')}
              >
                SUPABASE
              </button>
              <button
                className={`ia ${
                  selectedTags.includes('#IA') ? 'active_tag' : 'button_tag'
                }`}
                onClick={() => handleTagClick('#IA')}
              >
                IA
              </button>
              <button
                className={`tailwind ${
                  selectedTags.includes('#TAILWIND')
                    ? 'active_tag'
                    : 'button_tag'
                }`}
                onClick={() => handleTagClick('#TAILWIND')}
              >
                TAILWIND
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
                {filteredProjects.map((project: DataProjects) => {
                  const isFlipped = flippedProjectId === project.id;

                  return (
                    <div
                      className={`project_wrapper${isFlipped ? ' is-flipped' : ''}`}
                      key={project.id}
                    >
                      <div
                        className="project"
                        onClick={() => handleProjectCardClick(project.id)}
                        onKeyDown={(event) =>
                          handleProjectCardKeyDown(event, project.id)
                        }
                        role="button"
                        tabIndex={0}
                        aria-pressed={isFlipped}
                        aria-label={
                          isFlipped
                            ? `${project.title}, afficher le résumé`
                            : `${project.title}, afficher l'image`
                        }
                      >
                        <article className="project_front">
                          <div className="front_up">
                            <div className="front_up_content">
                              <div className="front_up_sakura" aria-hidden="true">
                                <span className="sakura sakura-1">❀</span>
                                <span className="sakura sakura-2">✿</span>
                                <span className="sakura sakura-3">❀</span>
                                <span className="sakura sakura-4">❁</span>
                                <span className="sakura sakura-5">✿</span>
                                <span className="sakura sakura-6">❀</span>
                                <span className="sakura sakura-7">✿</span>
                                <span className="sakura sakura-8">❀</span>
                                <span className="sakura sakura-9">❁</span>
                                <span className="sakura sakura-10">✿</span>
                              </div>
                              <h2 className="up_title">{project.title}</h2>
                              <p className="up_describe">{project.describe}</p>
                            </div>
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
                      <div className="project_button">
                        <button
                          className="project_link"
                          onClick={() => openModal(project)}
                        >
                          Voir +
                        </button>
                      </div>
                    </div>
                  );
                })}
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
        </section>

        <section id="section_contact" className="home_contact">
          <div className="tag_container">
            <div className="contact_tag">
              <p>
                CONTACT<span className="tag_anim">_</span>
              </p>
            </div>
          </div>

          <div
            ref={contactOrbitRef}
            className={`contact_orbit${isContactOrbitVisible ? ' is-visible' : ''}`}
          >
            <div className="contact_row">
              <a
                className="contact_orb"
                href="https://www.linkedin.com/in/olivia-gautheron-dev/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn — Profil"
              >
                <span className="contact_orb_ring">
                  <img src={Icon_linkedin} alt="" aria-hidden="true" />
                </span>
                <span className="contact_orb_label">Profil</span>
              </a>

              <a
                className="contact_orb"
                href="https://github.com/OliviaG-dev"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub — Code"
              >
                <span className="contact_orb_ring">
                  <img src={Icon_github} alt="" aria-hidden="true" />
                </span>
                <span className="contact_orb_label">Code</span>
              </a>

              <button
                type="button"
                className="contact_orb"
                onClick={handleEmailClick}
                aria-label="Envoyer un courriel"
              >
                <span className="contact_orb_ring">
                  <img src={Icon_email} alt="" aria-hidden="true" />
                </span>
                <span className="contact_orb_label">Courriel</span>
              </button>

              <a
                className="contact_orb"
                href="https://drive.google.com/file/d/1zA-Luy33oieZgSUJuNw_KFg66x9CJGvi/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Voir le parcours — CV"
              >
                <span className="contact_orb_ring">
                  <img src={Icon_cv} alt="" aria-hidden="true" />
                </span>
                <span className="contact_orb_label">Parcours</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      {showModal && <Modal closeModal={closeModal} project={selectedProject} />}
      <Footer />
    </>
  );
}

export default Home;
