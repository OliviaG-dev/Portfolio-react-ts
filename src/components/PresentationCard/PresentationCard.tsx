import { useState, useEffect, type ReactNode, type SVGProps } from 'react';
import './PresentationCard.css';

const CLOSE_ANIMATION_MS = 450;

type IconProps = SVGProps<SVGSVGElement>;

const IconBase = ({ children, className, ...props }: IconProps & { children: ReactNode }) => (
  <svg
    className={`presentation_icon ${className ?? ''}`.trim()}
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

const IconSword = (props: IconProps) => (
  <IconBase {...props}>
    <path
      d="M14.5 4.5l5 5M13 6l5 5M4 20l7.5-7.5M11.5 12.5l2 2M9 9l2 2"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4 20l3-1 1-3"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </IconBase>
);

const IconBolt = (props: IconProps) => (
  <IconBase {...props}>
    <path
      d="M13 2L5 13h6l-1 9 8-11h-6l1-9z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </IconBase>
);

const IconCycle = (props: IconProps) => (
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

const IconMonitor = (props: IconProps) => (
  <IconBase {...props}>
    <rect
      x="3.5"
      y="4.5"
      width="17"
      height="11.5"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <path
      d="M8 20h8M12 16v4"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </IconBase>
);

const IconGear = (props: IconProps) => (
  <IconBase {...props}>
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2M6.1 6.1l1.6 1.6M16.3 16.3l1.6 1.6M17.9 6.1l-1.6 1.6M7.7 16.3l-1.6 1.6"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </IconBase>
);

const IconRocket = (props: IconProps) => (
  <IconBase {...props}>
    <path
      d="M14.5 4.5c2.8 1.2 5 3.8 5.5 6.7-2.9.5-5.5 2.7-6.7 5.5-2.1-.9-3.9-2.7-4.8-4.8 2.8-1.2 5.4-3.8 6-6.7z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M9 15l-3.5 1.2L7 12.5M12.5 8.8a1.2 1.2 0 1 1-1.7 1.7"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </IconBase>
);

const IconBot = (props: IconProps) => (
  <IconBase {...props}>
    <rect
      x="5"
      y="8"
      width="14"
      height="10"
      rx="3"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <path
      d="M12 4v4M9 12.5h.01M15 12.5h.01M9.5 15.5h5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </IconBase>
);

const IconGamepad = (props: IconProps) => (
  <IconBase {...props}>
    <path
      d="M7.5 8.5h9a4.5 4.5 0 0 1 4.3 5.8l-.7 2.2a2.8 2.8 0 0 1-4.4 1.3l-1.2-1.1a2 2 0 0 0-2.6 0l-1.2 1.1a2.8 2.8 0 0 1-4.4-1.3l-.7-2.2A4.5 4.5 0 0 1 7.5 8.5z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M9 12.5h3M10.5 11v3M15.2 11.8h.01M16.8 13.5h.01"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </IconBase>
);

const IconHourglass = (props: IconProps) => (
  <IconBase {...props}>
    <path
      d="M7 4h10M7 20h10M8 4c0 3.5 2 5 4 6s4 2.5 4 6M16 4c0 3.5-2 5-4 6s-4 2.5-4 6"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </IconBase>
);

const IconFlame = (props: IconProps) => (
  <IconBase {...props}>
    <path
      d="M12 3c2 3 1.5 5 1.5 5S16 7.5 17 10.5 15.5 18 12 20c-3.5-2-5-6.5-4-9.5S10 8 10.5 8 10 6 12 3z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </IconBase>
);

const IconHeart = (props: IconProps) => (
  <IconBase {...props}>
    <path
      d="M12 19s-7-4.4-7-9.2A3.8 3.8 0 0 1 12 7a3.8 3.8 0 0 1 7 2.8C19 14.6 12 19 12 19z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
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

const IconBrain = (props: IconProps) => (
  <IconBase {...props}>
    <path
      d="M9.5 5.5a2.8 2.8 0 0 1 5 0 2.8 2.8 0 0 1 3.2 3.8A3 3 0 0 1 19 14a3 3 0 0 1-2 2.8V18a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 7 18v-1.2A3 3 0 0 1 5 14a3 3 0 0 1 1.3-4.7A2.8 2.8 0 0 1 9.5 5.5z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M12 5.5V19"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </IconBase>
);

const IconUsers = (props: IconProps) => (
  <IconBase {...props}>
    <circle cx="9" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="16" cy="9" r="2" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="M4.5 17.5c.7-2.4 2.5-3.5 4.5-3.5s3.8 1.1 4.5 3.5M13.5 15.2c1.1-.5 2.3-.5 3.5.2 1.2.8 1.9 2.1 2.1 3.6"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </IconBase>
);

const IconStar = (props: IconProps) => (
  <IconBase {...props}>
    <path
      d="M12 3.5l2.1 5.3 5.7.5-4.3 3.7 1.3 5.5L12 15.8 7.2 18.5l1.3-5.5L4.2 9.3l5.7-.5L12 3.5z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </IconBase>
);

type Talent = {
  icon: ReactNode;
  label: string;
};

const TALENTS: Talent[] = [
  {
    icon: <IconBolt className="presentation_icon--gold" />,
    label: '+100 motivation',
  },
  {
    icon: <IconTarget className="presentation_icon--accent" />,
    label: 'Maîtrise de React, TypeScript, NestJS & IA',
  },
  {
    icon: <IconBrain className="presentation_icon--violet" />,
    label: 'Curiosité : mon cheat code pour progresser',
  },
  {
    icon: <IconUsers className="presentation_icon--mint" />,
    label: "Esprit d'équipe (support main !)",
  },
];

const PresentationCard = ({ onClose }: { onClose?: () => void }) => {
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
            <IconClose />
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
            <IconSword className="presentation_icon--gold" />
            <span>Une idée. Un build. Une version de plus.</span>
          </p>

          <p>
            Je build, je casse, j’itère
            <IconBolt className="presentation_icon--inline presentation_icon--gold" />
            et je recommence
            <IconCycle className="presentation_icon--inline presentation_icon--mint" />
            jusqu’à ce que le produit tienne debout.
          </p>

          <p>
            J’ai mille idées
            <IconSpark className="presentation_icon--inline presentation_icon--pearl" />
            <br />
            Je les transforme en apps concrètes
            <br />
            React, Angular, TypeScript, Node.js et zéro peur d’apprendre en live.
          </p>

          <ul className="presentation_traits">
            <li>
              <IconMonitor className="presentation_icon--accent" />
              <span>
                <strong>Front-end</strong> — mon laboratoire
              </span>
            </li>
            <li>
              <IconGear className="presentation_icon--soft" />
              <span>
                <strong>Back-end</strong> — mon atelier
              </span>
            </li>
            <li>
              <IconRocket className="presentation_icon--violet" />
              <span>
                <strong>Techs émergentes</strong> — mon terrain de jeu
              </span>
            </li>
            <li>
              <IconBot className="presentation_icon--mint" />
              <span>
                <strong>L’IA</strong> — mon heal quand le code crash
              </span>
            </li>
          </ul>

          <p>
            Logout IDE → login WoW : raids et donjons
            <IconGamepad className="presentation_icon--inline presentation_icon--violet" />
            <br />
            Support main : anticiper, soutenir, improviser.
            <br />
            Même logique en équipe tech : stratégie, action, adaptation.
          </p>

          <p>
            Les outils évoluent. Moi aussi.
            <br />
            Je préfère avancer avec eux plutôt que de les fuir
            <IconHourglass className="presentation_icon--inline presentation_icon--soft" />
          </p>

          <p>
            Je build mon futur.
            <br />
            En ligne. Dans le code. Et dans le jeu
            <IconFlame className="presentation_icon--inline presentation_icon--rose" />
          </p>

          <p className="presentation_body_text">
            <IconHeart className="presentation_icon--rose" />
            <span>
              Forger du code avec l’âme d’une gameuse : telle est ma quête
              légendaire.
            </span>
            <IconStar className="presentation_icon--gold" />
          </p>
        </div>

        <div className="presentation_reward">
          <strong className="presentation_reward_title">Talents spéciaux</strong>
          <ul>
            {TALENTS.map((talent) => (
              <li key={talent.label}>
                <span className="presentation_reward_icon">{talent.icon}</span>
                <span>{talent.label}</span>
              </li>
            ))}
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
