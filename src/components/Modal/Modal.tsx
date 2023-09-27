import './Modal.css';
import { ModalProps } from '../../services/inteface';
import { useState } from 'react';

const Modal: React.FC<ModalProps> = ({ closeModal, project }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeDot, setActiveDot] = useState(0);

  const handleClose = () => {
    closeModal();
  };

  const handlePrev = () => {
    if (project) {
      setCurrentSlide((prevSlide) =>
        prevSlide === 0 ? project.imagesSlide.length - 1 : prevSlide - 1
      );
      setActiveDot((prevDot) =>
      prevDot === 0 ? project.imagesSlide.length - 1 : prevDot - 1
    );
    }
  };

  const handleNext = () => {
    if (project) {
      setCurrentSlide((prevSlide) =>
        prevSlide === project.imagesSlide.length - 1 ? 0 : prevSlide + 1
      );
      setActiveDot((prevDot) =>
      prevDot === project.imagesSlide.length - 1 ? 0 : prevDot + 1
    );
    }
  };

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
    setActiveDot(index);
  };

  const dots = project ? project.imagesSlide.length : 0;


  const dotIndicators = Array.from({ length: dots }, (_, i) => (
    <span
      key={i}
      className={i === activeDot ? 'dot active' : 'dot'}
      onClick={() => handleDotClick(i)}
    />
  ));


  return (
    <div className="modal" onClick={handleClose}>
      <div className="modal_content" onClick={(e) => e.stopPropagation()}>
        <span className="modal_close" onClick={closeModal}>
          x
        </span>

        {project && (
          <>
            <div className="modal_slider">
              <button className="prev" onClick={handlePrev}>
                &#10094;
              </button>
              <div className='slider'>
                <img
                  className="slider_img"
                  src={project.imagesSlide[currentSlide].src}
                  alt={project.imagesSlide[currentSlide].alt}
                />
              </div>
              <button className="next" onClick={handleNext}>
                &#10095;
              </button>
            </div>

            <div className="slider_dots">{dotIndicators}</div>

            <h2>{project.title}</h2>
            <span>{project.link}</span>
            <p>{project.id}</p>
            <div className="modal_text">
              <p>{project.text}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
