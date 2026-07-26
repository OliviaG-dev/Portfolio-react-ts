import React, { useState, useEffect } from 'react';
import './PresentationCard.css';

const CLOSE_ANIMATION_MS = 450;

const PresentationCard: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const [animate, setAnimate] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    if (!onClose) return;
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, CLOSE_ANIMATION_MS);
  };

  const panelClassName = [
    'presentation_ui',
    animate && !isClosing ? 'presentation_open' : '',
    isClosing ? 'presentation_closing' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={`presentation_overlay ${isClosing ? 'presentation_overlay_closing' : ''}`}
      onClick={handleClose}
      role="presentation"
    >
      <div
        className={panelClassName}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Présentation"
      >
        {onClose && (
          <button
            type="button"
            className="presentation_icon-close"
            onClick={handleClose}
            aria-label="Fermer"
          >
            ×
          </button>
        )}

        <div className="presentation_header">
          <p className="presentation_eyebrow">Fiche personnage</p>
          <div className="presentation_header_badge">
            <span className="presentation_header_badge-word">Gameuse</span>
            <span className="presentation_header_badge-separator">•</span>
            <span className="presentation_header_badge-word">Front-end</span>
            <span className="presentation_header_badge-separator">•</span>
            <span className="presentation_header_badge-word">IA</span>
          </div>
        </div>

        <div className="presentation_body">
          <p className="presentation_lead">
            Une idée. Un build. Une version de plus. ⚔️
          </p>
          <p>
            Je build, je casse, j’itère ⚡ et je recommence 🔁 jusqu’à ce que
            le produit tienne debout.
          </p>
          <p>
            J’ai mille idées 💡
            <br />
            Je les transforme en apps concrètes
            <br />
            React, Angular, TypeScript, Node.js et zéro peur d’apprendre en live
            😉
          </p>
          <p>
            Front-end ? Mon laboratoire. 🖥️
            <br />
            Back-end ? Mon atelier. ⚙️
            <br />
            Techs émergentes ? Mon terrain de jeu 🚀
            <br />
            L’IA ? Mon heal quand le code crash. 🤖
          </p>
          <p>
            Logout IDE → login WoW : raids et donjons 🎮
            <br />
            Support main : anticiper, soutenir, improviser.
            <br />
            Même logique en équipe tech : stratégie, action, adaptation.
          </p>
          <p>
            Les outils évoluent. Moi aussi.
            <br />
            Je préfère avancer avec eux plutôt que de les fuir ⏳
          </p>
          <p>
            Je build mon futur.
            <br />
            En ligne. Dans le code. Et dans le jeu 🔥
          </p>
          <p className="presentation_body_text">
            💖 Forger du code avec l’âme d’une gameuse : telle est ma quête
            légendaire. 💖
          </p>
        </div>

        <div className="presentation_reward">
          <strong className="presentation_reward_title">Talents spéciaux</strong>
          <ul>
            <li>⚡ +100 motivation</li>
            <li>🎯 Maîtrise de React, TypeScript, NestJS & IA</li>
            <li>🧠 Curiosité : mon cheat code pour progresser</li>
            <li>🎮 Esprit d&apos;équipe (support main !)</li>
          </ul>
        </div>

        {onClose && (
          <div className="presentation_actions">
            <button
              type="button"
              className="presentation_close-btn"
              onClick={handleClose}
            >
              Fermer
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PresentationCard;
