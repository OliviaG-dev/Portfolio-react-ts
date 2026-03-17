import React, { useState, useEffect } from 'react';
import './PresentationCard.css';

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
    setIsClosing(true);
    setTimeout(() => {
      if (onClose) onClose();
    }, 500);
  };

  const renderContent = () => (
    <>
      <div className="presentation_header">
        <div className="presentation_header_badge">
          <span className="presentation_header_badge-word">Gameuse</span>
          <span className="presentation_header_badge-separator">•</span>
          <span className="presentation_header_badge-word">Front-end</span>
          <span className="presentation_header_badge-separator">•</span>
          <span className="presentation_header_badge-word">IA</span>
        </div>
      </div>
      <div className="presentation_body">
        <p>Je ne suis pas là pour coder “parfait”. ❌</p>
        <p>
          Je préfère expérimenter ⚡, me tromper 💥 et recommencer 🔁 pendant
          que d’autres hésitent à pull le boss final.
        </p>
        <p>
          J’ai mille idées 💡
          <br />
          Je fonce parfois dans tous les sens
          <br />
          Et non, je ne vais pas me "calmer". 😉
        </p>
        <p>
          Front-end ? Mon laboratoire. 🖥️
          <br />
          Techs émergentes ? Mon terrain de jeu 🚀
          <br />
          L’IA ? Mon superpouvoir 🤖✨
        </p>
        <p>
          Quand je ne suis pas devant mon code, je suis en raid ou en donjons
          sur World of Warcraft 🎮
          <br />
          Soutenir mon équipe, anticiper, improviser, trouver des solutions.
          <br />
          Même logique que dans le code : stratégie, action, adaptation.
        </p>
        <p>
          Si tu crois que je “triche” avec l’IA ou les nouvelles technos, tu es
          déjà dépassé ⏳
        </p>
        <p>
          Moi, je build mon futur.
          <br />
          En ligne. Dans le code. Et dans le jeu 🔥
          <br />
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
          <li>🎮 Esprit d'équipe (support main !)</li>
        </ul>
      </div>
      {onClose && (
        <button className="presentation_close-btn" onClick={handleClose}>
          Fermer
        </button>
      )}
    </>
  );

  if (isClosing) {
    return (
      <div className="presentation_ui presentation_closing">
        {renderContent()}
      </div>
    );
  }

  return (
    <div className={`presentation_ui ${animate ? 'presentation_open' : ''}`}>
      {renderContent()}
    </div>
  );
};

export default PresentationCard;
