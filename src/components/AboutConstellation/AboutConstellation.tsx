import './AboutConstellation.css';

const AboutConstellation = () => {
  return (
    <svg
      className="about_constellation"
      viewBox="0 0 420 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="about_soft_glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(241, 228, 220, 0.35)" />
          <stop offset="45%" stopColor="rgba(56, 189, 248, 0.12)" />
          <stop offset="100%" stopColor="rgba(56, 189, 248, 0)" />
        </radialGradient>
        <radialGradient id="about_node_bloom" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(248, 250, 252, 0.95)" />
          <stop offset="40%" stopColor="rgba(241, 228, 220, 0.55)" />
          <stop offset="100%" stopColor="rgba(56, 189, 248, 0)" />
        </radialGradient>
      </defs>

      <circle
        className="about_constellation_halo"
        cx="210"
        cy="210"
        r="175"
        fill="url(#about_soft_glow)"
      />

      <g className="about_constellation_rings" stroke="currentColor">
        <circle cx="210" cy="210" r="168" strokeOpacity="0.22" strokeWidth="1.2" />
        <circle
          className="about_ring_dashed"
          cx="210"
          cy="210"
          r="128"
          strokeOpacity="0.35"
          strokeWidth="1.2"
          strokeDasharray="5 7"
        />
        <circle cx="210" cy="210" r="86" strokeOpacity="0.45" strokeWidth="1.4" />
        <circle
          className="about_ring_core"
          cx="210"
          cy="210"
          r="18"
          strokeOpacity="0.7"
          strokeWidth="1.5"
        />
        <circle cx="210" cy="210" r="4" fill="currentColor" stroke="none" />
      </g>

      <line
        className="about_constellation_axis"
        x1="210"
        y1="28"
        x2="210"
        y2="392"
        stroke="currentColor"
        strokeOpacity="0.28"
        strokeWidth="1"
        strokeDasharray="3 6"
      />

      <g className="about_constellation_mesh" stroke="currentColor" strokeWidth="1.2">
        <path
          className="about_mesh_fill"
          d="M132 150 L188 118 L248 138 L286 188 L262 248 L198 278 L142 236 L132 150 Z"
          strokeOpacity="0.55"
          fill="rgba(56, 189, 248, 0.04)"
        />
        <path className="about_mesh_line" d="M188 118 L210 210 L248 138" strokeOpacity="0.4" />
        <path className="about_mesh_line" d="M286 188 L210 210 L262 248" strokeOpacity="0.4" />
        <path className="about_mesh_line" d="M198 278 L210 210 L142 236" strokeOpacity="0.4" />
      </g>

      <g className="about_constellation_nodes" fill="currentColor">
        <circle className="about_node_bloom about_node_bloom--a" cx="132" cy="150" r="10" fill="url(#about_node_bloom)" />
        <circle className="about_node_bloom about_node_bloom--b" cx="188" cy="118" r="11" fill="url(#about_node_bloom)" />
        <circle className="about_node_bloom about_node_bloom--c" cx="248" cy="138" r="10" fill="url(#about_node_bloom)" />
        <circle className="about_node_bloom about_node_bloom--d" cx="286" cy="188" r="12" fill="url(#about_node_bloom)" />
        <circle className="about_node_bloom about_node_bloom--e" cx="262" cy="248" r="10" fill="url(#about_node_bloom)" />
        <circle className="about_node_bloom about_node_bloom--f" cx="198" cy="278" r="11" fill="url(#about_node_bloom)" />
        <circle className="about_node_bloom about_node_bloom--g" cx="142" cy="236" r="9" fill="url(#about_node_bloom)" />
        <circle className="about_node_bloom about_node_bloom--h" cx="210" cy="210" r="12" fill="url(#about_node_bloom)" />

        <circle className="about_node about_node--a" cx="132" cy="150" r="3.5" />
        <circle className="about_node about_node--b" cx="188" cy="118" r="4" />
        <circle className="about_node about_node--c" cx="248" cy="138" r="3.5" />
        <circle className="about_node about_node--d" cx="286" cy="188" r="4.2" />
        <circle className="about_node about_node--e" cx="262" cy="248" r="3.5" />
        <circle className="about_node about_node--f" cx="198" cy="278" r="4" />
        <circle className="about_node about_node--g" cx="142" cy="236" r="3.2" />
        <circle className="about_node about_node--h" cx="210" cy="210" r="3" />
      </g>

      <g className="about_constellation_sparkles" fill="currentColor">
        <path className="about_sparkle about_sparkle--1" d="M72 118 l2.2 5.2 5.2 2.2 -5.2 2.2 -2.2 5.2 -2.2-5.2 -5.2-2.2 5.2-2.2 z" />
        <path className="about_sparkle about_sparkle--2" d="M348 132 l1.8 4.2 4.2 1.8 -4.2 1.8 -1.8 4.2 -1.8-4.2 -4.2-1.8 4.2-1.8 z" />
        <path className="about_sparkle about_sparkle--3" d="M58 250 l1.6 3.8 3.8 1.6 -3.8 1.6 -1.6 3.8 -1.6-3.8 -3.8-1.6 3.8-1.6 z" />
        <path className="about_sparkle about_sparkle--4" d="M360 268 l2 4.6 4.6 2 -4.6 2 -2 4.6 -2-4.6 -4.6-2 4.6-2 z" />
        <path className="about_sparkle about_sparkle--5" d="M210 42 l1.5 3.4 3.4 1.5 -3.4 1.5 -1.5 3.4 -1.5-3.4 -3.4-1.5 3.4-1.5 z" />
        <path className="about_sparkle about_sparkle--6" d="M168 342 l1.4 3.2 3.2 1.4 -3.2 1.4 -1.4 3.2 -1.4-3.2 -3.2-1.4 3.2-1.4 z" />
      </g>

      <g className="about_constellation_marks" stroke="currentColor" strokeOpacity="0.45">
        <path className="about_mark about_mark--1" d="M68 96 h8 M72 92 v8" strokeWidth="1.2" />
        <path className="about_mark about_mark--2" d="M338 88 h8 M342 84 v8" strokeWidth="1.2" />
        <path className="about_mark about_mark--3" d="M78 320 h8 M82 316 v8" strokeWidth="1.2" />
        <path className="about_mark about_mark--4" d="M346 318 h8 M350 314 v8" strokeWidth="1.2" />
      </g>

      <g className="about_constellation_dots" fill="currentColor" fillOpacity="0.35">
        <circle className="about_dot about_dot--1" cx="96" cy="180" r="1.5" />
        <circle className="about_dot about_dot--2" cx="108" cy="196" r="1.5" />
        <circle className="about_dot about_dot--3" cx="120" cy="212" r="1.5" />
        <circle className="about_dot about_dot--4" cx="96" cy="212" r="1.5" />
        <circle className="about_dot about_dot--5" cx="108" cy="228" r="1.5" />
        <circle className="about_dot about_dot--6" cx="312" cy="176" r="1.5" />
        <circle className="about_dot about_dot--7" cx="324" cy="192" r="1.5" />
        <circle className="about_dot about_dot--8" cx="336" cy="208" r="1.5" />
        <circle className="about_dot about_dot--9" cx="312" cy="208" r="1.5" />
        <circle className="about_dot about_dot--10" cx="324" cy="224" r="1.5" />
      </g>
    </svg>
  );
};

export default AboutConstellation;
