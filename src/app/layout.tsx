import type { Metadata } from "next";
import { Fraunces, JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import "./design-tokens.css"; // design tokens for theming
import CustomCursor from "@/components/CustomCursor";
import TabTicker from "@/components/TabTicker";
import ContextMenu from "@/components/ContextMenu";
import TourGuide from "@/components/TourGuide";

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
  metadataBase: new URL("https://bharathr.vercel.app"),
  alternates: {
    canonical: "/",
  },
  title: "Bharath R | Java Full Stack Developer Portfolio",
  description: "Bharath R is a Java Full Stack Developer in Bangalore specializing in Java 21, Spring Boot, microservices architecture, and clean React dashboards. View projects, certifications, and technical experience.",
  keywords: [
    // === Name Variants — direct search ===
    "Bharath R",
    "bharath r",
    "bharathr",
    "bharath r dev",
    "bharathr dev",
    "bharath r developer",
    "bharathr developer",
    "bharath r me",
    "bharathr me",
    "bharath r portfolio",
    "bharathr portfolio",
    "bharath r .com",
    "bharathr .com",
    "bharathr.com",
    "bharath r .in",
    "bharathr .in",
    "bharathr.in",
    "bharath r website",
    "bharathr website",
    "bharath r java",
    "bharathr java",
    "bharath r bangalore",
    "bharathr bangalore",
    "bharath r engineer",
    "bharathr engineer",
    "bharath r cs",
    "bharathr133",
    "bharath r github",
    "bharathr github",
    "bharath r linkedin",
    "bharath r vercel",
    "bharathr vercel",

    // === Role & Stack Keywords ===
    "Java Full Stack Developer Bangalore",
    "Java Developer Bangalore",
    "Spring Boot Developer Bangalore",
    "React Developer Bangalore",
    "Java Spring Boot Microservices",
    "Computer Science Engineer Bangalore",
    "Web Developer Bangalore",
    "Java Backend Developer",
    "Full Stack Engineer India",
    "Spring Boot REST API Developer",
    "Microservices Developer India",
    "Next.js Developer Bangalore",
    "PostgreSQL Developer",
    "Docker Kubernetes Developer",
    "Spring Cloud Developer",

    // === Recruiter & Hire Intent ===
    "hire Java developer Bangalore",
    "hire full stack developer India",
    "hire Spring Boot engineer",
    "hire React developer portfolio",
    "best Java backend developer",
    "top software engineer portfolio",
    "senior java developer portfolio",
    "remote java full stack developer",
    "java developer portfolio India",
    "full stack engineer portfolio",
    "spring boot microservices expert",
    "enterprise java developer",
    "resilient backend api developer",
    "best software developer portfolio 2025",

    // === Portfolio Discovery ===
    "portfolio website nextjs developer",
    "java developer personal portfolio",
    "software engineer portfolio Bangalore",
    "full stack engineer portfolio website",
    "Bharath R portfolio website",
    "bharath r java spring boot portfolio"
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.jpg", type: "image/jpeg", sizes: "32x32" }
    ],
    shortcut: "/favicon.ico",
    apple: "/icon.jpg",
  },
  authors: [{ name: "Bharath R" }],
  verification: {
    google: "GFokI3e5TT5oG87YzmW9RaSabnfwegfjlWDYJG5Qtzk",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Bharath R | Java Full Stack Developer Portfolio",
    description: "Java Full Stack Developer specializing in robust Spring Boot backends and clean React dashboards in Bangalore, India.",
    url: "https://bharathr.vercel.app/",
    siteName: "Bharath R Portfolio",
    images: [
      {
        url: "/headshot.jpg",
        width: 1200,
        height: 630,
        alt: "Bharath R - Java Full Stack Developer",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bharath R | Java Full Stack Developer Portfolio",
    description: "Java Full Stack Developer specializing in robust Spring Boot backends and clean React dashboards in Bangalore, India.",
    images: ["/headshot.jpg"],
  },
};
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Bharath R",
  "jobTitle": "Java Full Stack Developer",
  "url": "https://bharathr.vercel.app",
  "image": "https://bharathr.vercel.app/headshot.jpg",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Bangalore",
    "addressRegion": "Karnataka",
    "addressCountry": "India"
  },
  "sameAs": [
    "https://github.com/Bharathr133",
    "https://www.linkedin.com/in/bharath-r-cs/"
  ],
  "knowsAbout": [
    "Java",
    "Spring Boot",
    "React.js",
    "Next.js",
    "Docker",
    "PostgreSQL",
    "Microservices",
    "Spring Cloud",
    "REST APIs"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} ${jetbrainsMono.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased font-sans flex flex-col min-h-screen transition-colors duration-300">
        <CustomCursor />
        <TabTicker />
        <ContextMenu />
        <TourGuide />
        {children}
      </body>
    </html>
  );
}
