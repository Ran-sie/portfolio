import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ransie F. Arboleda | Full-Stack Developer",
  description:
    "Portfolio of Ransie F. Arboleda, junior full-stack and game developer building web, mobile, and game projects.",
};

// Runs before the page paints, so the saved color and mode show instantly (no flash).
// First visit: dark mode + blue. After that, the visitor's own choice is remembered.
const themeScript = `(function(){try{var d=document.documentElement;var m=localStorage.getItem("mode")||"dark";var a=localStorage.getItem("accent")||"blue";d.setAttribute("data-mode",m);d.setAttribute("data-accent",a);}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-mode="dark"
      data-accent="blue"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
