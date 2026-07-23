import React from 'react';
import Header from '@/components/Header';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="flex-1 overflow-x-hidden pt-24">
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
