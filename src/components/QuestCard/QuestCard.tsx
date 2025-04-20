import React, { useState, useEffect } from 'react';
import './QuestCard.css';
import hordeLogo from '../../assets/images/horde_logo.svg';
import { QuestCardProps, Quest } from '../../services/inteface';
import questsData from '../../assets/data/quests.json';

const QUESTS: Quest[] = questsData;

const getRandomQuest = () => {
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
    }, 50);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      if (onClose) onClose();
    }, 500);
  };

  if (isClosing) {
    return (
      <div className="quest quest_closing">
        <div className="quest_header">
          <img src={hordeLogo} alt="Horde Logo" className="horde_logo" />
          <h2>{quest.title}</h2>
        </div>
        <div className="quest_body">
          <p>
            <strong>Objectif :</strong>
            <br />
            {quest.objective}
          </p>
          <p>
            <strong>Description :</strong>
            <br />
            {quest.description}
          </p>
          <div className="quest_reward">
            <strong>Récompenses :</strong>
            <ul>
              {quest.rewards.map((reward: string, index: number) => (
                <li key={index}>{reward}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div key={key} className={`quest ${animate ? 'quest_open' : ''}`}>
      <div className="quest_header">
        <img src={hordeLogo} alt="Horde Logo" className="horde_logo" />
        <h2>{quest.title}</h2>
      </div>

      <div className="quest_body">
        <p>
          <span className='quest_title'>Objectif :</span>
          <br />
          {quest.objective}
        </p>
        <p>
          <span className='quest_title'>Description :</span>
          <br />
          {quest.description}
        </p>

        <div className="quest_reward">
          <span className='quest_title'>Récompenses :</span>
          <ul>
            {quest.rewards.map((reward: string, index: number) => (
              <li key={index}>{reward}</li>
            ))}
          </ul>
        </div>

        <button className="quest_new-btn" onClick={handleNewQuest}>
          Nouvelle quête
        </button>

        {onClose && (
          <button className="quest_close-btn" onClick={handleClose}>
            Terminer la quête
          </button>
        )}
      </div>
    </div>
  );
};

export default QuestCard;
