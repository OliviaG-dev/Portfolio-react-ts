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
        <h2>Présentation : Olivia Gautheron</h2>
      </div>
      <div className="presentation_body">
        <p>
          <strong>Hey ! 👋</strong>
          <br />
          Je suis une développeuse front-end passionnée de web et de jeux vidéo
          ! 🎮
        </p>
        <p>
          Mais avant ça, j'ai forgé mon sens du service dans
          l'hôtellerie-restauration. Mon cœur battait déjà pour le code, et
          C'est mon entourage – deux devs talentueux – qui m'a initiée au monde
          du web.
        </p>
        <p>
          En 2015, j'ai suivi une première formation avant de plonger dans
          l’univers d’une entreprise tech en Pologne, où j'ai affiné mes skills
          et mon anglais.
        </p>
        <p>
          Après une parenthèse pleine de câlins et de biberons 🍼, j'ai repris
          ma formation en autodidacte puis en ligne via OpenClassrooms. J'ai
          ensuite intégré en 2023 <strong>{`<Alt/>`}</strong> pour bosser en
          équipe sur une plateforme de partage de données, en React & NestJS.
        </p>
        <p>
          En parallèle, je suis une gameuse invétérée 🎮 : WoW, LoL, Skyrim,
          Pokémon, Ark… Et devine mon rôle préféré ? Support, évidemment ! 🧙‍♀️
          Soutien, coordination, entraide — "Seul on va plus vite, ensemble on
          va plus loin." — C’est ma philosophie, que ce soit en jeu ou en
          développement.
        </p>
        <p className="presentation_body_text">
          💖 Forger du code avec l’âme d’une gameuse : telle est ma quête légendaire.
        </p>
      </div>
      <div className="presentation_reward">
        <strong className="presentation_reward_title">Talents spéciaux :</strong>
        <ul>
          <li>⚡ +100 motivation</li>
          <li>🎯 Maîtrise de React, TypeScript, NestJS</li>
          <li>🧠 Apprentissage en autodidacte</li>
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
