import React from 'react';
import Header from '@/components/Header';
import About from '@/components/About';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="flex-1 overflow-x-hidden pt-24">
        <About />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
