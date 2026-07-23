import React from 'react';
import Header from '@/components/Header';
import Skills from '@/components/Skills';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

export default function SkillsPage() {
  return (
    <>
      <Header />
      <main className="flex-1 overflow-x-hidden pt-24">
        <Skills />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
