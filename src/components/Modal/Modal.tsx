import './Modal.css';
import { ModalProps } from '../../services/inteface';
import { useEffect, useRef, useState } from 'react';
import Icon_githubnoir from '../../assets/images/Icons/Icon_githubnoir.svg';
import Icon_internet from '../../assets/images/Icons/Icon_internet.svg';

const MIN_SWIPE_DISTANCE = 50;
const DENSE_DOTS_THRESHOLD = 10;

const Modal: React.FC<ModalProps> = ({ closeModal, project }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const dotsTrackRef = useRef<HTMLDivElement>(null);

  const slideCount = project?.imagesSlide.length ?? 0;
  const isDenseDots = slideCount > DENSE_DOTS_THRESHOLD;

  useEffect(() => {
    const track = dotsTrackRef.current;
    if (!track) return;

    const activeDot = track.querySelector<HTMLElement>('.dot.active');
    if (!activeDot) return;

    activeDot.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    });
  }, [currentSlide]);

  const handleClose = () => {
    closeModal();
  };

  const goToSlide = (index: number) => {
    if (!project || index < 0 || index >= project.imagesSlide.length) return;
    setCurrentSlide(index);
  };

  const handlePrev = () => {
    if (!project) return;
    goToSlide(
      currentSlide === 0 ? project.imagesSlide.length - 1 : currentSlide - 1
    );
  };

  const handleNext = () => {
    if (!project) return;
    goToSlide(
      currentSlide === project.imagesSlide.length - 1 ? 0 : currentSlide + 1
    );
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return;

    const distance = touchStartX - touchEndX;
    if (distance > MIN_SWIPE_DISTANCE) {
      handleNext();
      return;
    }

    if (distance < -MIN_SWIPE_DISTANCE) {
      handlePrev();
    }
  };

  const dotsClassName = [
    'slider_dots',
    isDenseDots ? 'slider_dots--dense' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="modal" onClick={handleClose} role="presentation">
      <div
        className="modal_content"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={project ? project.title : 'Détail du projet'}
      >
        <button
          type="button"
          className="modal_close"
          onClick={closeModal}
          aria-label="Fermer"
        >
          ×
        </button>

        {project && (
          <>
            <div className="modal_slider">
              <button
                type="button"
                className="modal_nav prev"
                onClick={handlePrev}
                aria-label="Image précédente"
              >
                ‹
              </button>
              <div
                className="slider"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                <img
                  className="slider_img"
                  src={project.imagesSlide[currentSlide].src}
                  alt={project.imagesSlide[currentSlide].alt}
                />
                <span className="swipe_hint">Swipe me</span>
              </div>
              <button
                type="button"
                className="modal_nav next"
                onClick={handleNext}
                aria-label="Image suivante"
              >
                ›
              </button>
            </div>

            <div className="slider_pagination">
              <div
                ref={dotsTrackRef}
                className={dotsClassName}
                role="tablist"
                aria-label="Navigation des images"
              >
                <div className="slider_dots_track">
                  {project.imagesSlide.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      className={index === currentSlide ? 'dot active' : 'dot'}
                      onClick={() => goToSlide(index)}
                      aria-label={`Image ${index + 1} sur ${slideCount}`}
                      aria-current={index === currentSlide}
                    />
                  ))}
                </div>
              </div>
              {slideCount > 1 && (
                <p className="slider_counter" aria-live="polite">
                  {currentSlide + 1} / {slideCount}
                </p>
              )}
            </div>

            <div className="modal_text">
              <h2>{project.title}</h2>
              <div className="text_link">
                {project.link && (
                  <a
                    className="link_slide"
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={Icon_internet} alt="" />
                    Voir la démo
                  </a>
                )}
                {project.linkGit && (
                  <a
                    className="link_slide"
                    href={project.linkGit}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={Icon_githubnoir} alt="" />
                    Voir le GitHub
                  </a>
                )}
              </div>
              <ul className="down_list">
                {project.tags.map((tag) => (
                  <li key={tag.item} style={{ color: tag.style }}>
                    {tag.item}
                  </li>
                ))}
              </ul>
              <p>{project.text}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
