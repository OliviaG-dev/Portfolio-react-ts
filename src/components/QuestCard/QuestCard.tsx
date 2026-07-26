import React, { useState, useEffect } from 'react';
import './QuestCard.css';
import hordeLogo from '../../assets/images/horde_logo.svg';
import { QuestCardProps, Quest } from '../../services/inteface';
import questsData from '../../assets/data/quests.json';

const QUESTS: Quest[] = questsData;
const CLOSE_ANIMATION_MS = 450;
const QUEST_SWAP_MS = 50;

const getRandomQuest = (): Quest => {
  const index = Math.floor(Math.random() * QUESTS.length);
  return QUESTS[index];
};

const QuestCard: React.FC<QuestCardProps> = ({ onClose }) => {
  const [quest, setQuest] = useState<Quest>(getRandomQuest());
  const [animate, setAnimate] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleNewQuest = () => {
    setAnimate(false);
    setKey((prev) => prev + 1);

    setTimeout(() => {
      let newQuest: Quest;
      do {
        newQuest = getRandomQuest();
      } while (newQuest.title === quest.title);

      setQuest(newQuest);
      setAnimate(true);
    }, QUEST_SWAP_MS);
  };

  const handleClose = () => {
    if (!onClose) return;
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, CLOSE_ANIMATION_MS);
  };

  const panelClassName = [
    'quest',
    animate && !isClosing ? 'quest_open' : '',
    isClosing ? 'quest_closing' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={`quest_overlay ${isClosing ? 'quest_overlay_closing' : ''}`}
      onClick={handleClose}
      role="presentation"
    >
      <div
        key={key}
        className={panelClassName}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={quest.title}
      >
        {onClose && (
          <button
            type="button"
            className="quest_icon-close"
            onClick={handleClose}
            aria-label="Fermer"
          >
            ×
          </button>
        )}

        <div className="quest_header">
          <p className="quest_eyebrow">Quête disponible</p>
          <img src={hordeLogo} alt="" className="horde_logo" />
          <h2>{quest.title}</h2>
        </div>

        <div className="quest_body">
          <section className="quest_section">
            <span className="quest_title">Objectif</span>
            <p>{quest.objective}</p>
          </section>

          <section className="quest_section">
            <span className="quest_title">Description</span>
            <p>{quest.description}</p>
          </section>

          <div className="quest_reward">
            <span className="quest_reward_label">Récompenses</span>
            <ul>
              {quest.rewards.map((reward: string, index: number) => (
                <li key={`${reward}-${index}`}>{reward}</li>
              ))}
            </ul>
          </div>

          <div className="quest_actions">
            <button
              type="button"
              className="quest_new-btn"
              onClick={handleNewQuest}
            >
              Nouvelle quête
            </button>

            {onClose && (
              <button
                type="button"
                className="quest_close-btn"
                onClick={handleClose}
              >
                Terminer la quête
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestCard;
