// All the text on the portfolio lives here.
// Edit this file to update your info — no need to touch the page code.

export const profile = {
  name: "Ransie F. Arboleda",
  initials: "RA", // shown until you add a photo
  headline: "Junior Full-Stack & Game Developer",
  roles: ["Full-Stack", "Web", "Mobile", "Game Dev"],
  // Words for the typing effect in the hero: "I build ___"
  typing: ["full-stack web apps", "mobile apps", "games", "clean user interfaces"],
  location: "Quezon City, Philippines",
  openToWork: true, // shows the green "Open to opportunities" badge
  intro:
    "4th-year BSIT student and junior full-stack developer. I build products end to end — from the database to the interface — and I care about making them fast, clean, and easy to use.",
  about: [
    "I'm a 4th-year BSIT student at Quezon City University who builds full-stack web, mobile, and game projects.",
    "I've led three team projects as lead developer: a hospital management system secured with MFA and encryption, an AI-assisted mobile app for community issue reporting, and a booking platform evaluated with timed experiments.",
    "I enjoy turning ideas into working software, whether that's a web app, a mobile app, or a game. I use AI tools like Claude every day to plan, debug, and ship faster, while still understanding and owning the code I write.",
    "I'm looking for a junior developer role where I can ship real products and keep growing.",
  ],
  facts: [
    { label: "Education", value: "BSIT, Quezon City University (4th year)" },
    { label: "Experience", value: "Lead Developer, 3 team projects" },
    { label: "Focus", value: "Web · Mobile · Games" },
  ],
};

export const skills = [
  { group: "Frontend & Mobile", items: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Flutter"] },
  { group: "Backend", items: ["C#", "ASP.NET Core", "Node.js", "Python", "Flask", "Java"] },
  { group: "Database", items: ["PostgreSQL", "MySQL", "MariaDB", "Supabase"] },
  { group: "Tools & Game Dev", items: ["Git", "GitHub", "VS Code", "Visual Studio", "Android Studio", "Unity", "Blender"] },
];

// AI tools you use, shown under Skills.
export const aiTools = [
  { name: "Claude Pro", note: "Daily driver for coding, planning, and debugging" },
  { name: "Claude Code", note: "AI pair programmer inside VS Code" },
  { name: "ChatGPT", note: "Research and quick explanations" },
  { name: "Gemini", note: "Second opinions and research" },
];

// Your itch.io games, shown in the Arcade section.
// To add a cover image: put it in the /public/games folder (e.g. public/games/my-game.png)
// and set image: "/games/my-game.png". Leave link "" to show "Coming soon".
export const games = [
  {
    title: "Game One",
    description: "Short description of the game: genre, what you do, what makes it fun.",
    tags: ["Unity", "C#", "2D"],
    image: "",
    link: "",
  },
  {
    title: "Game Two",
    description: "Short description of the game: genre, what you do, what makes it fun.",
    tags: ["Unity", "C#", "3D"],
    image: "",
    link: "",
  },
  {
    title: "Game Three",
    description: "Short description of the game: genre, what you do, what makes it fun.",
    tags: ["Game Jam", "Pixel Art"],
    image: "",
    link: "",
  },
];

// Your projects. Add github/live links when available ("" hides the link).
export const projects = [
  {
    title: "Secure Hospital Management System",
    type: "Web App",
    role: "Lead Developer · Group Project",
    period: "Apr 2026 – May 2026",
    description:
      "A web system for patient records, appointments, and hospital operations. Sensitive health data is protected with role-based access control, multi-factor authentication, encryption, and audit logging.",
    tech: ["React", "ASP.NET Core", "PostgreSQL", "REST API", "EmailJS"],
    github: "",
    live: "",
  },
  {
    title: "CivicConnect",
    type: "Mobile App",
    role: "Lead Developer · Group Project",
    period: "Feb 2026 – May 2026",
    description:
      "An AI-driven mobile app where citizens report community issues with photos and track government responses. AI categorizes and prioritizes reports to speed up handling.",
    tech: ["Flutter", "Python", "SQL", "AI"],
    github: "",
    live: "",
  },
  {
    title: "InstaStay",
    type: "Desktop App",
    role: "Lead Developer · Group Project",
    period: "Mar 2025 – May 2025",
    description:
      "An instant reservation platform covering the full flow from search to completed booking. Booking time was measured through timed experiments and user feedback.",
    tech: ["VB.NET", "MariaDB", "Visual Studio"],
    github: "",
    live: "",
  },
];

// Fill these in. Leave a value as "" to hide it from the page.
export const contact = {
  email: "arboleda.ransie.ferreras@gmail.com",
  github: "https://github.com/Ran-sie",
  itch: "", // your itch.io profile URL, e.g. https://name.itch.io
  linkedin: "", // add later when your profile is ready
  facebook: "",
  // Put your PDF in the /public folder and name it resume.pdf.
  // Set this to "" to hide the Resume buttons.
  resume: "/resume.pdf",
};
