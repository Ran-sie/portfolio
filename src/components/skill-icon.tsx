import type { IconType } from "react-icons";
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiPhp,
  SiDotnet,
  SiPython,
  SiPostgresql,
  SiMariadb,
  SiSupabase,
  SiGit,
  SiGithub,
  SiXampp,
  SiTypescript,
  SiUnity,
  SiClaude,
  SiGooglegemini,
  SiFlutter,
  SiNodedotjs,
  SiFlask,
  SiOpenjdk,
  SiMysql,
  SiAndroidstudio,
  SiBlender,
} from "react-icons/si";
import { TbBrandCSharp, TbBrandVscode, TbBrandOpenai, TbBrandVisualStudio } from "react-icons/tb";
import { FaDatabase, FaCode } from "react-icons/fa6";

// Skill name -> icon and brand color. Add new skills here.
const icons: Record<string, { icon: IconType; color: string }> = {
  HTML: { icon: SiHtml5, color: "#E34F26" },
  CSS: { icon: SiCss, color: "#663399" },
  JavaScript: { icon: SiJavascript, color: "#F7DF1E" },
  TypeScript: { icon: SiTypescript, color: "#3178C6" },
  React: { icon: SiReact, color: "#61DAFB" },
  "Next.js": { icon: SiNextdotjs, color: "currentColor" },
  PHP: { icon: SiPhp, color: "#8892BF" },
  "C#": { icon: TbBrandCSharp, color: "#A179DC" },
  "ASP.NET": { icon: SiDotnet, color: "#7A6FF0" },
  "ASP.NET Core": { icon: SiDotnet, color: "#7A6FF0" },
  Flutter: { icon: SiFlutter, color: "#02569B" },
  "Node.js": { icon: SiNodedotjs, color: "#5FA04E" },
  Flask: { icon: SiFlask, color: "currentColor" },
  Java: { icon: SiOpenjdk, color: "#E76F00" },
  MySQL: { icon: SiMysql, color: "#4479A1" },
  "Visual Studio": { icon: TbBrandVisualStudio, color: "#865FC5" },
  "Android Studio": { icon: SiAndroidstudio, color: "#3DDC84" },
  Blender: { icon: SiBlender, color: "#E87D0D" },
  "VB.NET": { icon: SiDotnet, color: "#7A6FF0" },
  Python: { icon: SiPython, color: "#4B8BBE" },
  PostgreSQL: { icon: SiPostgresql, color: "#699ECA" },
  MariaDB: { icon: SiMariadb, color: "#C49A6C" },
  Oracle: { icon: FaDatabase, color: "#F80000" },
  Supabase: { icon: SiSupabase, color: "#3ECF8E" },
  Git: { icon: SiGit, color: "#F05032" },
  GitHub: { icon: SiGithub, color: "currentColor" },
  XAMPP: { icon: SiXampp, color: "#FB7A24" },
  "VS Code": { icon: TbBrandVscode, color: "#3BA5F0" },
  Unity: { icon: SiUnity, color: "currentColor" },
  "Claude Pro": { icon: SiClaude, color: "#D97757" },
  "Claude Code": { icon: SiClaude, color: "#D97757" },
  ChatGPT: { icon: TbBrandOpenai, color: "currentColor" },
  Gemini: { icon: SiGooglegemini, color: "#8E75B2" },
};

export function SkillIcon({ name, className = "" }: { name: string; className?: string }) {
  const entry = icons[name] ?? { icon: FaCode, color: "currentColor" };
  const Icon = entry.icon;
  return <Icon aria-hidden="true" className={className} style={{ color: entry.color }} />;
}
