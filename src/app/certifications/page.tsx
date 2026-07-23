import React from 'react';
import Header from '@/components/Header';
import Certifications from '@/components/Certifications';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

export default function CertificationsPage() {
  return (
    <>
      <Header />
      <main className="flex-1 overflow-x-hidden pt-24">
        <Certifications />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
