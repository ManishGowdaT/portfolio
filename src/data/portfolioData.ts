export const MOTION_TOKENS = {
  easeExpoCss: 'cubic-bezier(0.16, 1, 0.3, 1)',
  easeExpoGsap: 'power3.out',
  easeExitGsap: 'power2.in',
  durations: {
    micro: 0.25,
    reveal: 0.65,
    handoff: 0.85,
  },
  stagger: {
    text: 0.05,
    card: 0.08,
  },
} as const;

export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  domain: string;
  summary: string;
  stack: string[];
  architecture: {
    layer: string;
    detail: string;
  }[];
  highlights: string[];
  securityAndReliability: string[];
  visualType: 'trading' | 'legal' | 'forecasting';
}

export const PROFILE = {
  name: 'Manish Gowda T',
  initials: 'MG',
  role: 'Full Stack Developer',
  location: 'Bengaluru, India',
  email: 'tgowda4707@gmail.com',
  phone: '+91 9483724707',
  linkedin: 'https://www.linkedin.com/in/manish-gowda-t',
  linkedinLabel: 'linkedin.com/in/manish-gowda-t',
  github: 'https://github.com/ManishGowdaT',
  githubLabel: 'github.com/ManishGowdaT',
  currentRole: 'Developer Intern at Ellipsonic',
  heroLead:
    'Building reliable full-stack platforms, AI-powered backend workflows, and security-conscious web systems.',
  summary:
    'Full Stack Developer with hands-on experience in Python, Flask, FastAPI, Node.js, and AI-powered application development, with a solid understanding of how frontend and backend work together. Interested in cybersecurity, secure coding, and application security, with a strong focus on building reliable, user-friendly software and scalable data-driven solutions.',
  aboutPillars: [
    {
      code: '01',
      title: 'Full-Stack Architecture',
      description:
        'Connecting maintainable React.js, Next.js, and TypeScript interfaces cleanly with validated REST APIs across Python and Node.js.',
    },
    {
      code: '02',
      title: 'AI & Data Workflows',
      description:
        'Integrating machine learning models, time-series forecasting pipelines, and third-party AI services with logging, rate limiting, and async execution.',
    },
    {
      code: '03',
      title: 'Application Security',
      description:
        'Applying secure coding principles: account-isolated sessions, encrypted credentials, organization-scoped RBAC, and auditable signing trails.',
    },
  ],
};

export const SKILLS = [
  {
    id: 'languages',
    category: 'Languages',
    items: ['Java', 'Python', 'JavaScript', 'TypeScript', 'C', 'SQL', 'HTML5', 'CSS3'],
  },
  {
    id: 'backend',
    category: 'Backend & APIs',
    items: [
      'Flask',
      'FastAPI',
      'Django REST Framework',
      'Node.js',
      'Express',
      'REST APIs',
      'SQLAlchemy',
      'Prisma',
      'JWT Authentication',
      'DBMS',
    ],
  },
  {
    id: 'frontend',
    category: 'Frontend',
    items: ['React.js', 'Next.js', 'Bootstrap'],
  },
  {
    id: 'databases',
    category: 'Databases',
    items: ['PostgreSQL', 'MySQL', 'MongoDB'],
  },
  {
    id: 'tools',
    category: 'Tools & Systems',
    items: ['Git', 'GitHub', 'Linux', 'Ubuntu'],
  },
];

export const EXPERIENCE = [
  {
    role: 'Developer Intern',
    company: 'Ellipsonic',
    period: 'Present',
    location: 'Bengaluru, India',
    summary:
      'Contributing across frontend interfaces, REST API services, and production-ready AI/ML backend workflows.',
    responsibilities: [
      {
        title: 'Responsive Frontend Engineering',
        detail:
          'Develop responsive interfaces with React.js and Next.js, focusing on usability, performance, and maintainable component design.',
      },
      {
        title: 'Python & Django REST APIs',
        detail:
          'Build and support REST APIs with Python and Django REST Framework, including database operations, authentication, and strict input validation.',
      },
      {
        title: 'AI & ML Service Integration',
        detail:
          'Integrate machine learning models and third-party AI services into backend workflows with structured logging, rate limiting, and asynchronous processing.',
      },
    ],
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'optionalgo',
    index: '01',
    title: 'OptionAlgo',
    subtitle: 'Algorithmic Trading & Options Research Platform',
    domain: 'FinTech · Multi-Service System',
    summary:
      'Multi-user trading and options spread research platform integrating Angel One SmartAPI market data, interactive charts, strategy monitoring, and quantitative spread scans.',
    stack: [
      'React',
      'TypeScript',
      'Node.js',
      'Express',
      'Python',
      'FastAPI',
      'MongoDB',
      'Angel One SmartAPI',
    ],
    architecture: [
      {
        layer: 'Frontend Workspace',
        detail: 'React + TypeScript dashboard for interactive market charts, strategy monitoring, and ranked scan results.',
      },
      {
        layer: 'Auth & Gateway',
        detail: 'Node.js + Express handling account-isolated sessions, encrypted credential storage, and validated REST APIs.',
      },
      {
        layer: 'Quant Compute Service',
        detail: 'Python + FastAPI running multi-stock Bull Put / Bear Call spread scans, decimal payoff math, and volatility analytics.',
      },
    ],
    highlights: [
      'Integrated live Angel One SmartAPI market data with interactive charting and live strategy monitoring.',
      'Engineered Bull Put and Bear Call spread research with multi-stock scans, decimal-based payoff and volatility analytics, and ranked outputs.',
      'Added cancellable background jobs, failure isolation between services, and automated cross-service regression tests.',
    ],
    securityAndReliability: [
      'Account-isolated user sessions',
      'Encrypted broker credential storage',
      'Input-validated REST API boundaries',
      'Cancellable async jobs with failure isolation',
      'Automated cross-service regression tests',
    ],
    visualType: 'trading',
  },
  {
    id: 'lexdraft',
    index: '02',
    title: 'LexDraft',
    subtitle: 'Legal Workflow & Document Management Platform',
    domain: 'LegalTech · RBAC & E-Signature',
    summary:
      'Multi-role legal operations platform connecting client, lawyer, and partner workspaces across matter intake, document drafting, review, approvals, sequential e-signatures, and delivery.',
    stack: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Prisma', 'JWT'],
    architecture: [
      {
        layer: 'Multi-Role Client',
        detail: 'Dedicated React + TypeScript workspaces tailored for clients, lawyers, and partners.',
      },
      {
        layer: 'Workflow & Access API',
        detail: 'Node.js + Express + JWT enforcing organization-scoped access control and sequential token-based signing.',
      },
      {
        layer: 'Persistence & PDF Store',
        detail: 'PostgreSQL + Prisma managing versioned documents, explicit consent records, and generated, released, and signed PDFs.',
      },
    ],
    highlights: [
      'Connected client, lawyer, and partner workspaces across matter intake, drafting, review, approvals, e-signatures, and final delivery.',
      'Implemented organization-scoped access controls, versioned documents, and sequential token-based signing with explicit consent capture.',
      'Built persistent storage for generated, released, and signed PDFs backed by PostgreSQL and Prisma.',
    ],
    securityAndReliability: [
      'Organization-scoped RBAC access control',
      'Sequential token-based signing flow',
      'Explicit signer consent capture',
      'Document versioning and audit trail',
      'Persistent storage for signed PDFs',
    ],
    visualType: 'legal',
  },
  {
    id: 'sales-forecasting',
    index: '03',
    title: 'Sales Forecasting System',
    subtitle: 'Multi-State Time-Series ML & FastAPI Platform',
    domain: 'Machine Learning · Forecasting API',
    summary:
      'Weekly sales forecasting system spanning 43 US states that benchmarks multiple statistical and deep-learning time-series models and serves 8-week predictions via FastAPI.',
    stack: ['Python', 'Time-Series Forecasting', 'SARIMA', 'Prophet', 'XGBoost', 'LSTM', 'FastAPI'],
    architecture: [
      {
        layer: 'Model Benchmarking',
        detail: 'Evaluates SARIMA, Prophet, XGBoost, and LSTM per state using MAPE, RMSE, and MAE error metrics.',
      },
      {
        layer: 'Automated Selection',
        detail: 'Selects the best-performing model per US state across 43 regional time series.',
      },
      {
        layer: 'Inference API',
        detail: 'FastAPI service exposing 8-week forward weekly sales predictions cleanly over REST.',
      },
    ],
    highlights: [
      'Built weekly sales forecasting pipelines covering 43 US states.',
      'Benchmarked SARIMA, Prophet, XGBoost, and LSTM models using MAPE, RMSE, and MAE.',
      'Implemented automated best-model selection per state and served 8-week predictions through FastAPI.',
    ],
    securityAndReliability: [
      'Objective multi-metric evaluation (MAPE, RMSE, MAE)',
      'Per-state automated model selection',
      'Typed FastAPI prediction endpoints',
    ],
    visualType: 'forecasting',
  },
];

export const ACHIEVEMENTS = [
  {
    index: '01',
    title: 'First Place — UI/UX Design Competition',
    organization: 'Atria Institute of Technology',
    tag: '1st Place',
    detail: 'Awarded first place for interface clarity, visual hierarchy, and user-centered interaction design.',
  },
  {
    index: '02',
    title: 'Smart India Hackathon 2025',
    organization: 'College-Level Selection',
    tag: 'Selected 2025',
    detail: 'Selected at the institutional level for Smart India Hackathon 2025.',
  },
  {
    index: '03',
    title: 'Entrepreneurship & Innovation IDE Boot Camp',
    organization: 'Program Selection',
    tag: '2024 & 2026',
    detail: 'Selected twice (2024 and 2026) for the Entrepreneurship & Innovation IDE Boot Camp.',
  },
];

export const EDUCATION = [
  {
    degree: 'B.E. in Information Science & Engineering',
    institution: 'Atria Institute of Technology, Bengaluru',
    period: '2023 – 2027',
    metric: 'CGPA 8.32',
    status: 'Pursuing',
  },
  {
    degree: 'Pre-University — Science (PCMB)',
    institution: 'MS Ramaiah Pre-University College',
    period: '2021 – 2023',
    metric: '89%',
    status: 'Completed',
  },
];

export const CERTIFICATIONS = [
  {
    name: 'Java Fundamentals',
    issuer: 'Oracle Academy',
  },
  {
    name: 'Fundamentals of DevOps',
    issuer: 'Infosys Springboard',
  },
];

