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
  metadataBase: new URL("https://bharathr.vercel.app"),
  title: "Bharath R | Senior Java Full Stack Developer Portfolio",
  description: "Bharath R is a Senior Java Full Stack Developer in Bangalore specializing in Java 21, Spring Boot, microservices architecture, and clean React dashboards. View projects, certifications, and technical experience.",
  keywords: [
    "Bharath R",
    "bharath r",
    "Bharath R Portfolio",
    "bharath r portfolio",
    "Bharath R Developer",
    "bharath r developer",
    "Java Full Stack Developer In Bangalore",
    "Java Developer Bangalore",
    "Spring Boot Developer Bangalore",
    "React Developer Bangalore",
    "Java Spring Boot Microservices",
    "Computer Science Engineer Bangalore",
    "Web Developer Bangalore"
  ],
  authors: [{ name: "Bharath R" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Bharath R | Senior Java Full Stack Developer Portfolio",
    description: "Senior Java Full Stack Developer specializing in robust Spring Boot backends and clean React dashboards in Bangalore, India.",
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
    title: "Bharath R | Senior Java Full Stack Developer Portfolio",
    description: "Senior Java Full Stack Developer specializing in robust Spring Boot backends and clean React dashboards in Bangalore, India.",
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
        {children}
      </body>
    </html>
  );
}
