import React from 'react';
import Header from '@/components/Header';
import Projects from '@/components/Projects';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main className="flex-1 overflow-x-hidden pt-24">
        <Projects />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
