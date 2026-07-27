import { useState, useEffect, type ReactNode, type SVGProps } from 'react';
import './QuestCard.css';
import { QuestCardProps, Quest } from '../../services/inteface';
import questsData from '../../assets/data/quests.json';

const QUESTS: Quest[] = questsData;
const CLOSE_ANIMATION_MS = 450;
const QUEST_SWAP_MS = 50;

type IconProps = SVGProps<SVGSVGElement>;

const IconBase = ({
  children,
  className,
  ...props
}: IconProps & { children: ReactNode }) => (
  <svg
    className={`quest_icon ${className ?? ''}`.trim()}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    {children}
  </svg>
);

const IconClose = (props: IconProps) => (
  <IconBase {...props}>
    <path
      d="M6 6l12 12M18 6L6 18"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </IconBase>
);

const IconTarget = (props: IconProps) => (
  <IconBase {...props}>
    <circle cx="12" cy="12" r="7.5" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
  </IconBase>
);

const IconScroll = (props: IconProps) => (
  <IconBase {...props}>
    <path
      d="M7 5.5h9.5A2.5 2.5 0 0 1 19 8v10.5a1.5 1.5 0 0 1-1.5 1.5H8.5A2.5 2.5 0 0 1 6 17.5V7A1.5 1.5 0 0 1 7.5 5.5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path
      d="M9.5 9.5h6M9.5 13h6M9.5 16.5h3.5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </IconBase>
);

const IconGem = (props: IconProps) => (
  <IconBase {...props}>
    <path
      d="M8 4.5h8l3.5 5.5L12 20 4.5 10 8 4.5z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M4.5 10h15M9.2 4.7l-1.5 5.3L12 20M14.8 4.7l1.5 5.3L12 20"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
  </IconBase>
);

const IconSpark = (props: IconProps) => (
  <IconBase {...props}>
    <path
      d="M12 3l1.4 5.1L18.5 9.5 13.4 11 12 16.2 10.6 11 5.5 9.5l5.1-1.4L12 3z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
  </IconBase>
);

const IconRefresh = (props: IconProps) => (
  <IconBase {...props}>
    <path
      d="M3.5 12a8.5 8.5 0 0 1 14-6.5M20.5 12a8.5 8.5 0 0 1-14 6.5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <path
      d="M17 3.5v4h4M7 20.5v-4H3"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </IconBase>
);

const IconCheck = (props: IconProps) => (
  <IconBase {...props}>
    <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="M8.5 12.2l2.3 2.3 4.7-4.8"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </IconBase>
);

const IconStarLike = (props: IconProps) => (
  <IconBase {...props}>
    <path
      d="M12 3.5l2.1 5.3 5.7.5-4.3 3.7 1.3 5.5L12 15.8 7.2 18.5l1.3-5.5L4.2 9.3l5.7-.5L12 3.5z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </IconBase>
);

const IconEmblem = () => (
  <svg
    className="quest_emblem"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    <circle
      cx="32"
      cy="32"
      r="28"
      stroke="currentColor"
      strokeOpacity="0.35"
      strokeWidth="1.5"
    />
    <circle
      cx="32"
      cy="32"
      r="22"
      stroke="currentColor"
      strokeOpacity="0.55"
      strokeWidth="1.2"
      strokeDasharray="3 4"
    />
    <path
      d="M32 18 L35.23 27.55 L45.31 27.67 L37.23 33.7 L40.23 43.33 L32 37.5 L23.77 43.33 L26.77 33.7 L18.69 27.67 L28.77 27.55 Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
      fill="rgba(232, 213, 224, 0.18)"
    />
  </svg>
);

const getRandomQuest = (): Quest => {
  const index = Math.floor(Math.random() * QUESTS.length);
  return QUESTS[index];
};

const QuestCard = ({ onClose }: QuestCardProps) => {
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
            <IconClose />
          </button>
        )}

        <div className="quest_header">
          <p className="quest_eyebrow">Quête disponible</p>
          <IconEmblem />
          <h2>{quest.title}</h2>
        </div>

        <div className="quest_body">
          <section className="quest_section">
            <span className="quest_title">
              <IconTarget className="quest_icon--accent" />
              Objectif
            </span>
            <p>{quest.objective}</p>
          </section>

          <section className="quest_section">
            <span className="quest_title">
              <IconScroll className="quest_icon--pearl" />
              Description
            </span>
            <p>{quest.description}</p>
          </section>

          <div className="quest_reward">
            <span className="quest_reward_label">Récompenses</span>
            <ul>
              {quest.rewards.map((reward: string, index: number) => (
                <li key={`${reward}-${index}`}>
                  <span className="quest_reward_icon">
                    {index === 0 ? (
                      <IconGem className="quest_icon--gold" />
                    ) : index === 1 ? (
                      <IconSpark className="quest_icon--pearl" />
                    ) : (
                      <IconStarLike className="quest_icon--violet" />
                    )}
                  </span>
                  <span>{reward}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="quest_actions">
            <button
              type="button"
              className="quest_new-btn"
              onClick={handleNewQuest}
            >
              <IconRefresh className="quest_icon--mint" />
              Nouvelle quête
            </button>

            {onClose && (
              <button
                type="button"
                className="quest_close-btn"
                onClick={handleClose}
              >
                <IconCheck className="quest_icon--accent" />
                Terminer
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestCard;
