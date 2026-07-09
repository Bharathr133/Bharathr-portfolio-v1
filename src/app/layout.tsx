import type { Metadata } from "next";
import { Fraunces, JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import "./design-tokens.css"; // design tokens for theming

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bharath R - Java Full Stack Developer Portfolio",
  description: "Bharath R - Java Full Stack Developer & Machine Learning Enthusiast. 5+ projects, 8 certifications, Java Spring Boot, React.js, Python",
  keywords: ["Java Full Stack Developer In Bangalore", "Java Developer", "React Developer", "Python", "Machine Learning", "Bangalore", "Spring Boot", "Web Developer"],
  authors: [{ name: "Bharath R" }],
  robots: "index, follow",
  openGraph: {
    title: "Bharath R - Java Full Stack Developer Portfolio",
    description: "Computer Science Engineer specializing in modern web applications and machine learning solutions",
    url: "https://bharathr-portfolio.netlify.app/",
    siteName: "Bharath R Portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} ${jetbrainsMono.variable} scroll-smooth`}>
      <body className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased font-sans flex flex-col min-h-screen transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
