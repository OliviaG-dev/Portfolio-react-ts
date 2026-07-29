import './Modal.css';
import { ModalProps } from '../../services/inteface';
import { useEffect, useRef, useState } from 'react';
import Icon_githubnoir from '../../assets/images/Icons/Icon_githubnoir.svg';
import Icon_internet from '../../assets/images/Icons/Icon_internet.svg';

const MIN_SWIPE_DISTANCE = 50;
const DENSE_DOTS_THRESHOLD = 10;
const MIN_ZOOM_SCALE = 1;
const MAX_ZOOM_SCALE = 4;
const ZOOM_SNAP_THRESHOLD = 1.05;
const DOUBLE_TAP_DELAY_MS = 280;
const DOUBLE_TAP_ZOOM = 2.4;

type ZoomState = {
  scale: number;
  x: number;
  y: number;
};

type ImageFit = {
  naturalWidth: number;
  naturalHeight: number;
  fitWidth: number;
  fitHeight: number;
};

type PinchSession = {
  startDistance: number;
  startScale: number;
  startX: number;
  startY: number;
};

type PanSession = {
  startX: number;
  startY: number;
  originX: number;
  originY: number;
};

const INITIAL_ZOOM: ZoomState = { scale: 1, x: 0, y: 0 };
const INITIAL_FIT: ImageFit = {
  naturalWidth: 0,
  naturalHeight: 0,
  fitWidth: 0,
  fitHeight: 0,
};

const getTouchDistance = (touchA: Touch, touchB: Touch): number => {
  const deltaX = touchA.clientX - touchB.clientX;
  const deltaY = touchA.clientY - touchB.clientY;
  return Math.hypot(deltaX, deltaY);
};

const computeContainFit = (
  naturalWidth: number,
  naturalHeight: number,
  frameWidth: number,
  frameHeight: number
): Pick<ImageFit, 'fitWidth' | 'fitHeight'> => {
  if (!naturalWidth || !naturalHeight || !frameWidth || !frameHeight) {
    return { fitWidth: frameWidth, fitHeight: frameHeight };
  }

  const ratio = Math.min(
    frameWidth / naturalWidth,
    frameHeight / naturalHeight
  );

  return {
    fitWidth: naturalWidth * ratio,
    fitHeight: naturalHeight * ratio,
  };
};

const getMaxZoomScale = (fit: ImageFit): number => {
  if (!fit.fitWidth || !fit.naturalWidth) return MAX_ZOOM_SCALE;
  const nativeScale = fit.naturalWidth / fit.fitWidth;
  return Math.max(MIN_ZOOM_SCALE, Math.min(MAX_ZOOM_SCALE, nativeScale));
};

const clampZoomOffset = (
  scale: number,
  x: number,
  y: number,
  fitWidth: number,
  fitHeight: number,
  frameWidth: number,
  frameHeight: number
): { x: number; y: number } => {
  if (scale <= 1) return { x: 0, y: 0 };

  const maxX = Math.max(0, (fitWidth * scale - frameWidth) / 2);
  const maxY = Math.max(0, (fitHeight * scale - frameHeight) / 2);

  return {
    x: Math.min(maxX, Math.max(-maxX, x)),
    y: Math.min(maxY, Math.max(-maxY, y)),
  };
};

const Modal: React.FC<ModalProps> = ({ closeModal, project }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoom, setZoom] = useState<ZoomState>(INITIAL_ZOOM);
  const [imageFit, setImageFit] = useState<ImageFit>(INITIAL_FIT);
  const dotsTrackRef = useRef<HTMLDivElement>(null);
  const lightboxFrameRef = useRef<HTMLDivElement>(null);
  const lightboxImgRef = useRef<HTMLImageElement>(null);
  const didSwipeRef = useRef(false);
  const zoomRef = useRef<ZoomState>(INITIAL_ZOOM);
  const imageFitRef = useRef<ImageFit>(INITIAL_FIT);
  const pinchRef = useRef<PinchSession | null>(null);
  const panRef = useRef<PanSession | null>(null);
  const slideSwipeStartXRef = useRef<number | null>(null);
  const slideSwipeEndXRef = useRef<number | null>(null);
  const lastTapRef = useRef(0);
  const gestureMovedRef = useRef(false);
  const handlePrevRef = useRef<() => void>(() => undefined);
  const handleNextRef = useRef<() => void>(() => undefined);

  const slideCount = project?.imagesSlide.length ?? 0;
  const isDenseDots = slideCount > DENSE_DOTS_THRESHOLD;
  const currentImage = project?.imagesSlide[currentSlide];
  const isZoomed = zoom.scale > ZOOM_SNAP_THRESHOLD;
  const displayWidth =
    imageFit.fitWidth > 0 ? imageFit.fitWidth * zoom.scale : undefined;
  const displayHeight =
    imageFit.fitHeight > 0 ? imageFit.fitHeight * zoom.scale : undefined;

  const syncZoom = (nextZoom: ZoomState) => {
    zoomRef.current = nextZoom;
    setZoom(nextZoom);
  };

  const syncImageFit = (nextFit: ImageFit) => {
    imageFitRef.current = nextFit;
    setImageFit(nextFit);
  };

  const resetZoom = () => {
    pinchRef.current = null;
    panRef.current = null;
    syncZoom(INITIAL_ZOOM);
  };

  const measureImageFit = () => {
    const frame = lightboxFrameRef.current;
    const img = lightboxImgRef.current;
    if (!frame || !img || !img.naturalWidth || !img.naturalHeight) return;

    const { fitWidth, fitHeight } = computeContainFit(
      img.naturalWidth,
      img.naturalHeight,
      frame.clientWidth,
      frame.clientHeight
    );

    syncImageFit({
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      fitWidth,
      fitHeight,
    });
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

  handlePrevRef.current = handlePrev;
  handleNextRef.current = handleNext;

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

  useEffect(() => {
    resetZoom();
    syncImageFit(INITIAL_FIT);
  }, [currentSlide]);

  useEffect(() => {
    if (!isLightboxOpen) {
      resetZoom();
      syncImageFit(INITIAL_FIT);
    }
  }, [isLightboxOpen]);

  useEffect(() => {
    if (!isLightboxOpen) return;

    measureImageFit();

    const frame = lightboxFrameRef.current;
    if (!frame || typeof ResizeObserver === 'undefined') return;

    const observer = new ResizeObserver(() => {
      measureImageFit();
      const fit = imageFitRef.current;
      const current = zoomRef.current;
      const clamped = clampZoomOffset(
        current.scale,
        current.x,
        current.y,
        fit.fitWidth,
        fit.fitHeight,
        frame.clientWidth,
        frame.clientHeight
      );
      syncZoom({ scale: current.scale, x: clamped.x, y: clamped.y });
    });

    observer.observe(frame);
    return () => observer.disconnect();
  }, [isLightboxOpen, currentImage?.src]);

  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        setIsLightboxOpen(false);
        return;
      }

      if (!project || project.imagesSlide.length <= 1) return;
      if (zoomRef.current.scale > ZOOM_SNAP_THRESHOLD) return;

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        setCurrentSlide((slide) =>
          slide === 0 ? project.imagesSlide.length - 1 : slide - 1
        );
        return;
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        setCurrentSlide((slide) =>
          slide === project.imagesSlide.length - 1 ? 0 : slide + 1
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLightboxOpen, project]);

  useEffect(() => {
    if (!isLightboxOpen) return;

    const frame = lightboxFrameRef.current;
    if (!frame) return;

    const applyClampedZoom = (scale: number, x: number, y: number) => {
      const fit = imageFitRef.current;
      const maxScale = getMaxZoomScale(fit);
      const nextScale = Math.min(maxScale, Math.max(MIN_ZOOM_SCALE, scale));
      const clamped = clampZoomOffset(
        nextScale,
        x,
        y,
        fit.fitWidth,
        fit.fitHeight,
        frame.clientWidth,
        frame.clientHeight
      );
      syncZoom({ scale: nextScale, x: clamped.x, y: clamped.y });
    };

    const onTouchStart = (event: TouchEvent) => {
      const touches = event.touches;
      gestureMovedRef.current = false;

      if (touches.length === 2) {
        panRef.current = null;
        slideSwipeStartXRef.current = null;
        slideSwipeEndXRef.current = null;
        pinchRef.current = {
          startDistance: getTouchDistance(touches[0], touches[1]),
          startScale: zoomRef.current.scale,
          startX: zoomRef.current.x,
          startY: zoomRef.current.y,
        };
        return;
      }

      if (touches.length === 1) {
        pinchRef.current = null;

        if (zoomRef.current.scale > ZOOM_SNAP_THRESHOLD) {
          panRef.current = {
            startX: touches[0].clientX,
            startY: touches[0].clientY,
            originX: zoomRef.current.x,
            originY: zoomRef.current.y,
          };
          slideSwipeStartXRef.current = null;
          slideSwipeEndXRef.current = null;
          return;
        }

        panRef.current = null;
        slideSwipeStartXRef.current = touches[0].clientX;
        slideSwipeEndXRef.current = null;
      }
    };

    const onTouchMove = (event: TouchEvent) => {
      const touches = event.touches;

      if (touches.length === 2 && pinchRef.current) {
        event.preventDefault();
        gestureMovedRef.current = true;
        const distance = getTouchDistance(touches[0], touches[1]);
        const ratio = distance / Math.max(pinchRef.current.startDistance, 1);
        const maxScale = getMaxZoomScale(imageFitRef.current);
        const nextScale = Math.min(
          maxScale,
          Math.max(MIN_ZOOM_SCALE, pinchRef.current.startScale * ratio)
        );
        applyClampedZoom(
          nextScale,
          pinchRef.current.startX,
          pinchRef.current.startY
        );
        return;
      }

      if (touches.length === 1 && panRef.current) {
        event.preventDefault();
        gestureMovedRef.current = true;
        const deltaX = touches[0].clientX - panRef.current.startX;
        const deltaY = touches[0].clientY - panRef.current.startY;
        applyClampedZoom(
          zoomRef.current.scale,
          panRef.current.originX + deltaX,
          panRef.current.originY + deltaY
        );
        return;
      }

      if (touches.length === 1 && slideSwipeStartXRef.current !== null) {
        slideSwipeEndXRef.current = touches[0].clientX;
        if (
          Math.abs(slideSwipeStartXRef.current - touches[0].clientX) >
          MIN_SWIPE_DISTANCE
        ) {
          gestureMovedRef.current = true;
        }
      }
    };

    const onTouchEnd = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        pinchRef.current = null;
        panRef.current = null;
        return;
      }

      const wasPinching = pinchRef.current !== null;
      const wasPanning = panRef.current !== null;
      pinchRef.current = null;
      panRef.current = null;

      if (wasPinching) {
        if (zoomRef.current.scale < ZOOM_SNAP_THRESHOLD) {
          resetZoom();
        } else {
          applyClampedZoom(
            zoomRef.current.scale,
            zoomRef.current.x,
            zoomRef.current.y
          );
        }
        return;
      }

      if (wasPanning) {
        applyClampedZoom(
          zoomRef.current.scale,
          zoomRef.current.x,
          zoomRef.current.y
        );
        return;
      }

      if (
        zoomRef.current.scale <= ZOOM_SNAP_THRESHOLD &&
        slideSwipeStartXRef.current !== null &&
        slideSwipeEndXRef.current !== null
      ) {
        const distance =
          slideSwipeStartXRef.current - slideSwipeEndXRef.current;
        slideSwipeStartXRef.current = null;
        slideSwipeEndXRef.current = null;

        if (distance > MIN_SWIPE_DISTANCE) {
          handleNextRef.current();
          return;
        }

        if (distance < -MIN_SWIPE_DISTANCE) {
          handlePrevRef.current();
          return;
        }
      }

      slideSwipeStartXRef.current = null;
      slideSwipeEndXRef.current = null;

      if (gestureMovedRef.current) return;

      const now = Date.now();
      const isDoubleTap = now - lastTapRef.current < DOUBLE_TAP_DELAY_MS;
      lastTapRef.current = now;

      if (!isDoubleTap) return;

      if (zoomRef.current.scale > ZOOM_SNAP_THRESHOLD) {
        resetZoom();
        return;
      }

      const doubleTapScale = Math.min(
        DOUBLE_TAP_ZOOM,
        getMaxZoomScale(imageFitRef.current)
      );
      applyClampedZoom(doubleTapScale, 0, 0);
    };

    frame.addEventListener('touchstart', onTouchStart, { passive: true });
    frame.addEventListener('touchmove', onTouchMove, { passive: false });
    frame.addEventListener('touchend', onTouchEnd);
    frame.addEventListener('touchcancel', onTouchEnd);

    return () => {
      frame.removeEventListener('touchstart', onTouchStart);
      frame.removeEventListener('touchmove', onTouchMove);
      frame.removeEventListener('touchend', onTouchEnd);
      frame.removeEventListener('touchcancel', onTouchEnd);
    };
  }, [isLightboxOpen]);

  const handleClose = () => {
    if (isLightboxOpen) {
      setIsLightboxOpen(false);
      return;
    }
    closeModal();
  };

  const openLightbox = () => {
    if (didSwipeRef.current) return;
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    didSwipeRef.current = false;
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    const currentX = e.targetTouches[0].clientX;
    setTouchEndX(currentX);

    if (touchStartX === null) return;
    if (Math.abs(touchStartX - currentX) > MIN_SWIPE_DISTANCE) {
      didSwipeRef.current = true;
    }
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

  const lightboxHint = isZoomed
    ? 'Glisse pour explorer · Double-tap pour réinitialiser'
    : slideCount > 1
      ? 'Pince pour zoomer · Swipe pour changer de photo'
      : 'Pince pour zoomer · Double-tap pour agrandir';

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

        {project && currentImage && (
          <>
            <div className="modal_slider">
              <button
                type="button"
                className="modal_nav prev"
                onClick={handlePrev}
                aria-label="Image précédente"
              >
                <span className="modal_nav_icon" aria-hidden="true">
                  ‹
                </span>
              </button>
              <div
                className="slider"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                <button
                  type="button"
                  className="slider_zoom_trigger"
                  onClick={openLightbox}
                  aria-label="Agrandir l'image"
                >
                  <img
                    className="slider_img"
                    src={currentImage.src}
                    alt={currentImage.alt}
                  />
                </button>
                <span className="swipe_hint">Swipe me</span>
              </div>
              <button
                type="button"
                className="modal_nav next"
                onClick={handleNext}
                aria-label="Image suivante"
              >
                <span className="modal_nav_icon" aria-hidden="true">
                  ›
                </span>
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

      {isLightboxOpen && currentImage && (
        <div
          className="lightbox"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image agrandie"
        >
          <button
            type="button"
            className="lightbox_close"
            onClick={closeLightbox}
            aria-label="Fermer l'image"
          >
            <svg
              className="lightbox_close_icon"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M6.4 6.4L17.6 17.6M17.6 6.4L6.4 17.6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <p className="lightbox_hint">{lightboxHint}</p>

          <div
            className={`lightbox_stage${isZoomed ? ' is-zoomed' : ''}`}
            onClick={(event) => event.stopPropagation()}
          >
            {slideCount > 1 && (
              <button
                type="button"
                className="lightbox_nav lightbox_nav--prev"
                onClick={handlePrev}
                aria-label="Image précédente"
              >
                <span className="lightbox_nav_icon" aria-hidden="true">
                  ‹
                </span>
              </button>
            )}

            <div ref={lightboxFrameRef} className="lightbox_frame">
              <img
                ref={lightboxImgRef}
                className="lightbox_img"
                src={currentImage.src}
                alt={currentImage.alt}
                draggable={false}
                onLoad={measureImageFit}
                style={{
                  width: displayWidth ? `${displayWidth}px` : undefined,
                  height: displayHeight ? `${displayHeight}px` : undefined,
                  maxWidth: displayWidth ? 'none' : undefined,
                  maxHeight: displayHeight ? 'none' : undefined,
                  transform: `translate3d(${zoom.x}px, ${zoom.y}px, 0)`,
                }}
              />
            </div>

            {slideCount > 1 && (
              <button
                type="button"
                className="lightbox_nav lightbox_nav--next"
                onClick={handleNext}
                aria-label="Image suivante"
              >
                <span className="lightbox_nav_icon" aria-hidden="true">
                  ›
                </span>
              </button>
            )}
          </div>

          {slideCount > 1 && (
            <p className="lightbox_counter" aria-live="polite">
              {currentSlide + 1} / {slideCount}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Modal;
