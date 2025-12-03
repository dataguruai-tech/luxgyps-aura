import { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import FeaturedWorks from '@/components/FeaturedWorks';
import VideoGallery from '@/components/VideoGallery';
import BeforeAfter from '@/components/BeforeAfter';
import Process from '@/components/Process';
import About from '@/components/About';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import SampleKitModal from '@/components/SampleKitModal';
import LookbookPopup from '@/components/LookbookPopup';
import Archive from '@/components/Archive';

const Index = () => {
  const [isSampleKitOpen, setIsSampleKitOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero onSampleKitClick={() => setIsSampleKitOpen(true)} />
        <Stats />
        <FeaturedWorks />
        <Archive />
        <VideoGallery />
        <BeforeAfter />
        <About />
        <Process />
      </main>
      <Footer />
      <Chatbot />
      <SampleKitModal isOpen={isSampleKitOpen} onClose={() => setIsSampleKitOpen(false)} />
      <LookbookPopup />
    </div>
  );
};

export default Index;
