export interface PersonalInfo {
  name: string;
  titles: string[];
  subtitle: string;
  email: string;
  github: string;
  linkedin: string;
  location: string;
  locationLink: string;
  bioSummary: string;
  bioDetails: string[];
}

export interface Stat {
  value: string;
  label: string;
}

export interface Skill {
  name: string;
  progress: number; // 0-100
  color: string; // Accent color
  iconKey: string; // Identifier for official SVG icon
}

export interface SkillCategory {
  title: string;
  icon: string; // lucide icon name
  skills: Skill[];
}

export type ProjectTheme = 'cyberpunk' | 'corporate' | 'sunset' | 'emerald' | 'minimal';

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link: string;
  image: string;
  theme: ProjectTheme;
}

export interface Internship {
  title: string;
  company: string;
  date: string;
  description: string;
  highlights: string[];
  skills: string[];
}

export interface Certification {
  title: string;
  issueYear: string;
  image: string;
}

export interface Education {
  date: string;
  degree: string;
  school: string;
  description: string;
}

export const personalInfo: PersonalInfo = {
  name: "Bharath R",
  titles: [
    "Java Full Stack Developer",
    "Microservices Developer",
    "Computer Science Engineer",
    "Problem Solver",
    "Tech Enthusiast"
  ],
  subtitle: "Java Full Stack Developer | Microservices Specialist | Computer Science Engineer",
  email: "12345bharathr.com@gmail.com",
  github: "https://github.com/bharathr133",
  linkedin: "https://www.linkedin.com/in/bharathr13",
  location: "Bangalore, India",
  locationLink: "https://maps.app.goo.gl/C9Gg3JRi9vVYfH3b7",
  bioSummary: "I'm Bharath R, a Computer Science Engineering professional based in Bangalore, India. Currently, I work as a Java Full Stack Developer at Swajyot Technologies, where I build and maintain end-to-end web applications used by real clients.",
  bioDetails: [
    "My core tech stack includes Java (8/11), Spring Boot, Spring MVC, and Hibernate (JPA) for backend development. On the frontend, I work with HTML5, CSS3, JavaScript, and React.js to create responsive user interfaces. I also use RESTful APIs, MySQL, PostgreSQL, and MongoDB for database integration. For version control, I'm proficient with Git, GitHub, and GitLab.",
    "I have hands-on experience deploying applications using Apache Tomcat and writing unit tests with JUnit & Mockito. I follow Agile/Scrum methodologies and use tools like Postman, Swagger (OpenAPI), and Maven/Gradle. I'm also familiar with basic CI/CD pipelines (Jenkins) and Docker for containerization.",
    "When I'm not coding, I explore new tech trends, contribute to open-source projects, and continuously improve my problem-solving skills through competitive programming."
  ]
};

export const stats: Stat[] = [
  { value: "8+", label: "Certifications" },
  { value: "6+", label: "Projects" },
  { value: "3", label: "Internships" },
  { value: "15+", label: "Technologies" }
];

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    icon: "Laptop",
    skills: [
      { name: "React.js", progress: 90, color: "#61dafb", iconKey: "react" },
      { name: "Next.js", progress: 85, color: "#ffffff", iconKey: "nextjs" },
      { name: "Tailwind CSS", progress: 88, color: "#38b2ac", iconKey: "tailwind" },
      { name: "JavaScript", progress: 90, color: "#f7df1e", iconKey: "javascript" },
      { name: "HTML5", progress: 98, color: "#e34f26", iconKey: "html5" },
      { name: "CSS3", progress: 95, color: "#1572b6", iconKey: "css3" }
    ]
  },
  {
    title: "Backend & Microservices",
    icon: "Server",
    skills: [
      { name: "Java (8/11)", progress: 92, color: "#007396", iconKey: "java" },
      { name: "Spring Boot", progress: 90, color: "#6db33f", iconKey: "springboot" },
      { name: "Microservices", progress: 88, color: "#0052cc", iconKey: "microservices" },
      { name: "Spring Cloud", progress: 80, color: "#3fa037", iconKey: "springcloud" },
      { name: "Hibernate / JPA", progress: 88, color: "#59666c", iconKey: "hibernate" },
      { name: "PostgreSQL", progress: 88, color: "#336791", iconKey: "postgresql" },
      { name: "SQL", progress: 90, color: "#00758f", iconKey: "sql" }
    ]
  },
  {
    title: "DevOps & Tools",
    icon: "Cpu",
    skills: [
      { name: "Docker", progress: 82, color: "#2496ed", iconKey: "docker" },
      { name: "Railway / Vercel", progress: 85, color: "#0b0b0f", iconKey: "railway" },
      { name: "Git & GitHub", progress: 92, color: "#f05032", iconKey: "git" },
      { name: "CI / CD", progress: 78, color: "#11b981", iconKey: "cicd" },
      { name: "Postman", progress: 88, color: "#ff6c37", iconKey: "postman" },
      { name: "AI Prompting", progress: 92, color: "#8b5cf6", iconKey: "prompt" }
    ]
  }
];

export const projects: Project[] = [
  {
    id: "dox-app",
    title: "DOX-APP – Secure Document System",
    description: "A secure, enterprise-level document management and exchange system. Features drag-and-drop uploads, folder-level sharing permission gates, role-based JWT authentication, and file tagging/searching.",
    tags: ["React.js", "Tailwind CSS", "Spring Boot", "Hibernate", "MySQL", "Microservices"],
    link: "https://github.com/Bharathr133/",
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80",
    theme: "cyberpunk" // Glowing neon-cyan/purple theme
  },
  {
    id: "pneumonia-detection",
    title: "Pneumonia Detection System",
    description: "A deep learning model that analyzes chest X-ray images to detect pneumonia with 94% accuracy, assisting doctors in early diagnosis.",
    tags: ["Python", "TensorFlow", "CNN", "OpenCV", "Flask"],
    link: "https://github.com/Bharathr133/",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    theme: "emerald" // Glowing medical-green theme
  },
  {
    id: "kodbook",
    title: "KodBook – Social Media Web App",
    description: "Developed a responsive social networking platform where users can create profiles, post content, interact through likes/comments, and share multimedia.",
    tags: ["Spring Boot", "SQL", "React", "HTML/CSS"],
    link: "https://github.com/Bharathr133/KodBook",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80",
    theme: "corporate" // Modern blue solid border theme
  },
  {
    id: "meal-mate",
    title: "Meal-Mate – Restaurant App",
    description: "A full-stack restaurant companion application with real-time ordering, table reservation, and food recommendations.",
    tags: ["Python", "HTML", "CSS", "JavaScript"],
    link: "https://github.com/Bharathr133/meal-mate-app",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80",
    theme: "sunset" // Warm orange/sunset theme
  },
  {
    id: "blood-group",
    title: "Blood Group Detection",
    description: "An innovative system that predicts blood groups by analyzing fingerprint patterns using machine learning with 87% accuracy.",
    tags: ["Python", "Scikit-learn", "Image Processing", "Flask"],
    link: "https://github.com/Bharathr133/",
    image: "https://images.unsplash.com/photo-1579684453423-f84349ef60b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1386&q=80",
    theme: "emerald" // Green/teal medical theme
  },
  {
    id: "portfolio-website",
    title: "Portfolio Website – Interactive Portfolio",
    description: "A modern, responsive portfolio website with animations and interactive features to showcase work and skills.",
    tags: ["HTML5", "CSS3", "JavaScript", "GSAP"],
    link: "#",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=1364&q=80",
    theme: "minimal" // Sleek slate theme
  }
];

export const internships: Internship[] = [
  {
    title: "Java Full Stack Developer Intern",
    company: "Swajyot Technologies Pvt. Ltd.",
    date: "March 2026 – Present",
    description: "Contributing to enterprise web solutions using Java, Spring Boot, React, and PostgreSQL. Gained hands-on experience in REST APIs, layered microservice design, containerization with Docker, and cloud deployments.",
    highlights: [
      "Develop and maintain enterprise web applications using Spring Boot & React.js",
      "Design PostgreSQL database schemas and build optimized query structures",
      "Containerize microservices with Docker and deploy to Railway/Vercel platforms",
      "Integrate secure JWT authentication, document gates, and automated PDF builders"
    ],
    skills: ["Java", "Spring Boot", "React.js", "PostgreSQL", "Microservices", "Docker", "DevOps", "REST APIs", "Tailwind CSS", "Git"]
  },
  {
    title: "Full Stack Development Training",
    company: "KodNest",
    date: "6 Months",
    description: "Completed a comprehensive six-month training program in Java and Python full stack development, covering competitive programming, web development, SQL, and testing.",
    highlights: [
      "Mastered Java Spring Boot and Microservices basics for backend development",
      "Developed proficiency in frontend technologies (React.js, HTML, CSS, JavaScript)",
      "Gained expertise in database management with SQL",
      "Implemented testing methodologies for robust applications",
      "Participated in competitive programming challenges"
    ],
    skills: ["Java", "Python", "Spring Boot", "SQL", "React.js", "HTML/CSS", "JavaScript"]
  },
  {
    title: "Internship 2.0 Program",
    company: "ParvaM ConsulTech Pvt. Ltd.",
    date: "Oct 2023 – Nov 2023",
    description: "Participated in an intensive internship program focused on business innovation and sustainability solutions.",
    highlights: [
      "Designed and presented the sustainability-focused business idea 'Bio Gas Plantation'",
      "Collaborated with a team to prepare presentations and reports evaluated by industry experts",
      "Developed business strategy and implementation plans for sustainable energy solutions"
    ],
    skills: ["Business Strategy", "Sustainability", "Team Collaboration", "Presentation Skills", "Project Planning"]
  }
];

export const certifications: Certification[] = [
  { title: "KodNest Full Stack", issueYear: "2025", image: "kodNestCertificate.png" },
  { title: "AWS Summit Attendee", issueYear: "2025", image: "aws summit (2025).jpg" },
  { title: "Coddy Tech Certification", issueYear: "2024", image: "coddy_tech (2024).jpg" },
  { title: "HackerRank Certification", issueYear: "2025", image: "HackerRank certificate.png" },
  { title: "IBM Professional", issueYear: "2025", image: "IBM Certification (2025).jpg" },
  { title: "Skilected Certified", issueYear: "2025", image: "skilected certificate(2025).jpg" },
  { title: "TCS ION Certified", issueYear: "2025", image: "tcs ion (2025).jpg" },
  { title: "Udemy Professional", issueYear: "2025", image: "Udemy_Certificate(2025).jpg" },
  { title: "Besant Technologies", issueYear: "2025", image: "Besant Technologies Certificate(2025).jpg" }
];

export const educations: Education[] = [
  {
    date: "2017 - 2019",
    degree: "Secondary School",
    school: "Adharsha High School, Rayalapad",
    description: "Completed 10th grade. Developed foundational knowledge in science and mathematics."
  },
  {
    date: "2019 - 2021",
    degree: "Higher Secondary",
    school: "AECS Magnolia PU College, Mulbagal",
    description: "Completed 12th grade in Science stream (PCMB). Developed interest in computer science during this period."
  },
  {
    date: "2021 - 2025",
    degree: "Bachelor of Engineering",
    school: "Dr. Sri Shivakumara Mahaswamy College Of Engineering, Bangalore",
    description: "B.E. in Computer Science and Engineering | CGPA: 8.01"
  }
];
