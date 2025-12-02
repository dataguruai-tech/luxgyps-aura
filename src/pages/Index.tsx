import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import FeaturedWorks from '@/components/FeaturedWorks';
import VideoGallery from '@/components/VideoGallery';
import BeforeAfter from '@/components/BeforeAfter';
import Process from '@/components/Process';
import About from '@/components/About';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Stats />
        <FeaturedWorks />
        <VideoGallery />
        <BeforeAfter />
        <About />
        <Process />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
