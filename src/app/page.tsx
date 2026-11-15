import type { ReactNode } from "react";
import {
  FaArrowRight,
  FaArrowUp,
  FaArrowUpRightFromSquare,
  FaBriefcase,
  FaDesktop,
  FaEnvelope,
  FaFacebook,
  FaGamepad,
  FaGithub,
  FaGlobe,
  FaGraduationCap,
  FaLayerGroup,
  FaItchIo,
  FaLinkedin,
  FaLocationDot,
  FaMobileScreen,
} from "react-icons/fa6";
import { profile, skills, aiTools, projects, contact } from "../data/profile";
import { Reveal } from "../components/reveal";
import { TypingText } from "../components/typing-text";
import { SkillIcon } from "../components/skill-icon";
import { ThemePicker } from "../components/theme-picker";
import { Achievements } from "../components/achievements";
import { Arcade } from "../components/arcade/arcade";
import { ResumeButton } from "../components/resume-button";
import { ContactForm } from "../components/contact-form";

const nav = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#arcade", label: "Arcade" },
  { href: "#contact", label: "Contact" },
];

const factIcons = [FaGraduationCap, FaBriefcase, FaLayerGroup];

const projectIcons: Record<string, typeof FaGlobe> = {
  "Web App": FaGlobe,
  "Mobile App": FaMobileScreen,
  "Desktop App": FaDesktop,
  Game: FaGamepad,
};

const socials = [
  { label: "GitHub", href: contact.github, icon: FaGithub },
  { label: "itch.io", href: contact.itch, icon: FaItchIo },
  { label: "LinkedIn", href: contact.linkedin, icon: FaLinkedin },
  { label: "Facebook", href: contact.facebook, icon: FaFacebook },
].filter((s) => s.href);

function SectionHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <Reveal className="mb-12 max-w-2xl">
      <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{title}</h2>
      {children && <p className="mt-4 text-lg leading-relaxed text-muted">{children}</p>}
    </Reveal>
  );
}

// Hero entrance: pure CSS, so it plays right away without waiting for JavaScript.
function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div className={`fade-up ${className}`} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

const btnPrimary =
  "inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-on-accent shadow-[0_0_24px_-6px_var(--accent)] transition hover:-translate-y-0.5 hover:brightness-110";
const btnSecondary =
  "inline-flex items-center gap-2 rounded-lg border border-line bg-surface/60 px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-on-accent"
      >
        Skip to content
      </a>

      {/* Top navigation */}
      <header className="sticky top-0 z-40 border-b border-line/70 bg-background/70 backdrop-blur-xl">
        <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <a href="#top" data-secret-logo className="flex items-center gap-2.5 font-semibold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent font-mono text-xs font-bold text-on-accent">
              {profile.initials}
            </span>
            <span className="hidden lg:inline">{profile.name}</span>
          </a>
          <div className="flex items-center gap-2 sm:gap-4">
          <ul className="hidden items-center gap-1 text-sm text-muted sm:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-md px-2.5 py-2 transition-colors hover:bg-surface hover:text-foreground sm:px-3"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <ThemePicker />
          </div>
        </nav>
      </header>

      <main id="main" className="flex-1">
        {/* ---------- Hero ---------- */}
        <section id="top" className="relative isolate overflow-hidden">
          {/* Background: faded grid + soft glow */}
          <div aria-hidden="true" className="hero-grid absolute inset-0 -z-10" />
          <div
            aria-hidden="true"
            className="absolute -top-40 left-1/2 -z-10 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-accent/15 blur-[120px]"
          />

          <div className="mx-auto grid lg:min-h-[calc(100svh-4rem)] max-w-6xl items-center gap-14 px-6 py-20 lg:grid-cols-[1.4fr_1fr]">
            <div>
              {profile.openToWork && (
                <FadeUp>
                  <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                    </span>
                    Open to opportunities
                  </p>
                </FadeUp>
              )}
              <FadeUp delay={80}>
                <h1 className="text-5xl font-bold tracking-tight text-balance sm:text-6xl lg:text-7xl">
                  {profile.name}
                </h1>
              </FadeUp>
              <FadeUp delay={160}>
                <p className="mt-5 text-2xl font-medium text-muted sm:text-3xl">
                  I build <TypingText words={profile.typing} />
                </p>
              </FadeUp>
              <FadeUp delay={240}>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{profile.intro}</p>
              </FadeUp>
              <FadeUp delay={320}>
                <div className="mt-9 flex flex-wrap gap-3">
                  <a href="#projects" className={btnPrimary}>
                    View my work <FaArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                  </a>
                  <a href="#contact" className={btnSecondary}>
                    Contact me
                  </a>
                  {contact.resume && <ResumeButton href={contact.resume} />}
                </div>
              </FadeUp>
              <FadeUp delay={400}>
                <div className="mt-10 flex items-center gap-5 text-sm text-muted">
                  <span className="inline-flex items-center gap-2">
                    <FaLocationDot aria-hidden="true" className="text-accent" /> {profile.location}
                  </span>
                  <span className="h-4 w-px bg-line" aria-hidden="true" />
                  {socials.map(({ label, href, icon: Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="transition-colors hover:text-accent"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </FadeUp>
            </div>

            {/* Photo card. To use a photo: put it in /public and swap the initials for
                <Image src="/photo.jpg" alt={profile.name} fill className="object-cover" /> */}
            <FadeUp delay={200} className="mx-auto w-full max-w-sm">
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-accent/30 via-transparent to-violet-500/20 blur-2xl"
                />
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-surface to-background">
                  <div className="hero-grid absolute inset-0 opacity-60" aria-hidden="true" />
                  <div className="relative flex h-full items-center justify-center">
                    <span className="bg-gradient-to-br from-accent to-violet-400 bg-clip-text font-mono text-8xl font-bold text-transparent">
                      {profile.initials}
                    </span>
                  </div>
                </div>
                <div className="float absolute -left-2 top-10 sm:-left-6 rounded-xl border border-line bg-surface/90 px-4 py-3 shadow-xl backdrop-blur">
                  <p className="text-xs text-muted">Currently</p>
                  <p className="text-sm font-semibold">Seeking junior dev roles</p>
                </div>
                <div
                  className="float absolute -right-2 bottom-12 sm:-right-4 rounded-xl border border-line bg-surface/90 px-4 py-3 shadow-xl backdrop-blur"
                  style={{ animationDelay: "-3s" }}
                >
                  <p className="text-xs text-muted">Studying</p>
                  <p className="text-sm font-semibold">BSIT · 4th Year</p>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-6">
          {/* ---------- About ---------- */}
          <section id="about" className="scroll-mt-16 py-24">
            <SectionHeader eyebrow="About" title="A developer who builds the whole thing." />
            <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
              <Reveal className="space-y-5 text-lg leading-relaxed text-muted">
                {profile.about.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </Reveal>
              <dl className="space-y-3">
                {profile.facts.map((fact, i) => {
                  const Icon = factIcons[i % factIcons.length];
                  return (
                    <Reveal key={fact.label} delay={i * 100}>
                      <div className="flex items-center gap-4 rounded-xl border border-line bg-surface p-4">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                          <Icon aria-hidden="true" />
                        </span>
                        <div>
                          <dt className="text-xs font-medium uppercase tracking-wider text-muted">
                            {fact.label}
                          </dt>
                          <dd className="mt-0.5 font-medium">{fact.value}</dd>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </dl>
            </div>
          </section>

          {/* ---------- Skills ---------- */}
          <section id="skills" className="scroll-mt-16 py-24">
            <SectionHeader eyebrow="Skills" title="Tech I work with.">
              From front-end interfaces to databases, these are the tools I use to ship.
            </SectionHeader>
            <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
              {skills.map((group, i) => (
                <Reveal key={group.group} delay={i * 100} className="h-full">
                  <div className="h-full rounded-2xl border border-line bg-surface p-4 sm:p-6">
                    <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-muted">
                      {group.group}
                    </h3>
                    <ul className="space-y-1">
                      {group.items.map((skill) => (
                        <li
                          key={skill}
                          className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-background"
                        >
                          <SkillIcon name={skill} className="h-5 w-5 shrink-0" />
                          <span className="text-sm font-medium">{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* AI-assisted workflow */}
            <Reveal className="mt-5">
              <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
                      AI-assisted workflow
                    </h3>
                    <p className="mt-2 max-w-xl text-foreground">
                      I use AI as a pair programmer to plan, debug, and ship faster, and I still
                      review and understand every line I ship.
                    </p>
                  </div>
                </div>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {aiTools.map((tool) => (
                    <li
                      key={tool.name}
                      className="flex items-start gap-3 rounded-xl border border-line bg-background p-4"
                    >
                      <SkillIcon name={tool.name} className="mt-0.5 h-5 w-5 shrink-0" />
                      <div>
                        <p className="text-sm font-semibold">{tool.name}</p>
                        <p className="mt-1 text-xs leading-relaxed text-muted">{tool.note}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </section>

          {/* ---------- Projects ---------- */}
          <section id="projects" className="scroll-mt-16 py-24">
            <SectionHeader eyebrow="Projects" title="Selected work.">
              Team projects I led as lead developer, from secure web systems to AI-powered mobile apps.
            </SectionHeader>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, i) => {
                const TypeIcon = projectIcons[project.type] ?? FaGlobe;
                return (
                  <Reveal key={project.title} delay={i * 100} className="h-full">
                    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_20px_50px_-20px_color-mix(in_oklab,var(--accent)_30%,transparent)]">
                      {/* Screenshot slot */}
                      <div className="relative flex aspect-video items-center justify-center overflow-hidden border-b border-line bg-gradient-to-br from-accent/10 via-background to-violet-500/10">
                        <div className="hero-grid absolute inset-0 opacity-50" aria-hidden="true" />
                        <TypeIcon
                          aria-hidden="true"
                          className="relative h-10 w-10 text-accent/70 transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <p className="text-xs font-medium uppercase tracking-wider text-accent">
                          {project.type}
                        </p>
                        <h3 className="mt-2 text-xl font-semibold">{project.title}</h3>
                        <p className="mt-1 text-sm text-muted">
                          {project.role} · {project.period}
                        </p>
                        <p className="mt-3 flex-1 leading-relaxed text-muted">{project.description}</p>
                        <ul className="mt-5 flex flex-wrap gap-2">
                          {project.tech.map((t) => (
                            <li
                              key={t}
                              className="rounded-md border border-line bg-background px-2 py-1 font-mono text-xs text-muted"
                            >
                              {t}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-6 flex gap-5 border-t border-line pt-5 text-sm font-medium">
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 hover:text-accent"
                            >
                              <FaGithub aria-hidden="true" /> Code
                            </a>
                          )}
                          {project.live && (
                            <a
                              href={project.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 hover:text-accent"
                            >
                              <FaArrowUpRightFromSquare aria-hidden="true" /> Live demo
                            </a>
                          )}
                          {!project.github && !project.live && (
                            <span className="text-muted">Academic project</span>
                          )}
                        </div>
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </section>

          {/* ---------- Arcade ---------- */}
          <section id="arcade" className="scroll-mt-16 py-24">
            <SectionHeader eyebrow="Arcade" title="Games I've made.">
              Games I&apos;ve built and published on itch.io.
            </SectionHeader>
            <Reveal>
              <Arcade />
            </Reveal>
          </section>

          {/* ---------- Contact ---------- */}
          <section id="contact" className="scroll-mt-16 py-24">
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl border border-line bg-surface px-6 py-12 sm:px-10 sm:py-14">
                <div
                  aria-hidden="true"
                  className="absolute -bottom-32 left-1/4 h-64 w-[600px] -translate-x-1/2 rounded-full bg-accent/15 blur-[100px]"
                />
                <div className="relative grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-14">
                  {/* Left: intro + other ways to reach me */}
                  <div>
                    <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent">
                      Contact
                    </p>
                    <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                      Let&apos;s build something together.
                    </h2>
                    <p className="mt-4 text-lg leading-relaxed text-muted">
                      I&apos;m open to junior developer roles, internships, and freelance work. Send me a
                      message and I&apos;ll get back to you.
                    </p>
                    <a
                      href={`mailto:${contact.email}`}
                      className="mt-8 inline-flex items-center gap-3 text-sm font-medium transition-colors hover:text-accent"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                        <FaEnvelope aria-hidden="true" />
                      </span>
                      {contact.email}
                    </a>
                    <div className="mt-6 flex flex-wrap gap-3">
                      {socials.map(({ label, href, icon: Icon }) => (
                        <a key={label} href={href} target="_blank" rel="noopener noreferrer" className={btnSecondary}>
                          <Icon aria-hidden="true" /> {label}
                        </a>
                      ))}
                      {contact.resume && <ResumeButton href={contact.resume} />}
                    </div>
                  </div>

                  {/* Right: message form */}
                  <ContactForm />
                </div>
              </div>
            </Reveal>
          </section>
        </div>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted sm:flex-row">
          <p>© 2026 {profile.name}. Built with Next.js &amp; Tailwind CSS.</p>
          <a href="#top" className="inline-flex items-center gap-2 transition-colors hover:text-accent">
            Back to top <FaArrowUp aria-hidden="true" className="h-3 w-3" />
          </a>
        </div>
      </footer>

      <Achievements />
    </>
  );
}
