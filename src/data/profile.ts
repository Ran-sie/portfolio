// All the text on the portfolio lives here.
// Edit this file to update your info — no need to touch the page code.

export const profile = {
  name: "Ransie F. Arboleda",
  initials: "RA", // shown until you add a photo
  headline: "Full-Stack Developer · BSIT Student",
  roles: ["Full-Stack", "Web", "Mobile", "Game Dev"],
  // Words for the typing effect in the hero: "I build ___"
  typing: ["full-stack web apps", "mobile apps", "games", "clean user interfaces"],
  location: "Quezon City, Philippines",
  openToWork: true, // shows the green "Open to opportunities" badge
  intro:
    "BSIT student and Full-Stack Developer Intern. I build products end to end — from the database to the interface — and I care about making them fast, clean, and easy to use.",
  about: [
    "I'm a 4th-year BSIT student at Quezon City University and currently a Full-Stack Developer Intern, working on real production web apps.",
    "I enjoy turning ideas into working software, whether that's a web app, a mobile app, or a game. I use AI tools like Claude every day to plan, debug, and ship faster, while still understanding and owning the code I write.",
    "I'm looking for a junior developer role where I can ship real products and keep growing.",
  ],
  facts: [
    { label: "Education", value: "BSIT, Quezon City University (4th year)" },
    { label: "Experience", value: "Full-Stack Developer Intern" },
    { label: "Focus", value: "Web · Mobile · Games" },
  ],
};

export const skills = [
  { group: "Frontend", items: ["HTML", "CSS", "JavaScript", "React", "Next.js"] },
  { group: "Backend", items: ["PHP", "C#", "ASP.NET", "VB.NET", "Python"] },
  { group: "Database", items: ["PostgreSQL", "MariaDB", "Oracle", "Supabase"] },
  { group: "Tools", items: ["Git", "GitHub", "XAMPP", "VS Code"] },
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

// Placeholders — replace with your real projects later.
export const projects = [
  {
    title: "Project One",
    type: "Web App",
    description: "A full-stack web app. Short description of what it does and who it's for.",
    tech: ["Next.js", "TypeScript", "Supabase"],
    github: "",
    live: "",
  },
  {
    title: "Project Two",
    type: "Mobile App",
    description: "A mobile app. Short description of the problem it solves.",
    tech: ["React Native", "PostgreSQL"],
    github: "",
    live: "",
  },
  {
    title: "Project Three",
    type: "Game",
    description: "A game. Short description of the gameplay and what you built.",
    tech: ["C#", "Unity"],
    github: "",
    live: "",
  },
];

// Fill these in. Leave a value as "" to hide it from the page.
export const contact = {
  email: "your.email@example.com",
  github: "https://github.com/your-username",
  itch: "https://your-username.itch.io", // your games
  linkedin: "", // add later when your profile is ready
  facebook: "",
  // Put your PDF in the /public folder and name it resume.pdf.
  // Set this to "" to hide the Resume buttons.
  resume: "/resume.pdf",
};
