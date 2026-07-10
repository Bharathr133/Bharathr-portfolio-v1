import React from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import GitTimeline from '@/components/GitTimeline';
import Certifications from '@/components/Certifications';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Header />
      <main className="flex-1">
        <Hero />
        <Stats />
        <About />
        <Skills />
        <Projects />
        <GitTimeline />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
