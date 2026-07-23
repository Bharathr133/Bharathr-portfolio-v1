import React from 'react';
import Header from '@/components/Header';
import GitTimeline from '@/components/GitTimeline';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

export default function ExperiencePage() {
  return (
    <>
      <Header />
      <main className="flex-1 overflow-x-hidden pt-24">
        <GitTimeline />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
