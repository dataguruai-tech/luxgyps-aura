import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useMode } from '@/context/ModeContext';
import { useLanguage } from '@/context/LanguageContext';
import { useState, useRef } from 'react';

const VideoGallery = () => {
  const { isGallery } = useMode();
  const { t } = useLanguage();

  const videos = [
    {
      id: 1,
      title: t.videos.video1Title,
      description: t.videos.video1Desc,
      src: "/videos/sculpture-process-1.mp4",
    },
    {
      id: 2,
      title: t.videos.video2Title,
      description: t.videos.video2Desc,
      src: "/videos/sculpture-process-2.mp4",
    },
    {
      id: 3,
      title: t.videos.video3Title,
      description: t.videos.video3Desc,
      src: "/videos/sculpture-process-3.mp4",
    },
  ];

  return (
    <section id="videos" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-1/3 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute top-1/2 right-0 w-1/3 h-px bg-gradient-to-l from-transparent via-primary/20 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="max-w-4xl mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-px bg-primary" />
            <p className="text-primary tracking-[0.3em] uppercase text-sm font-medium">
              {isGallery ? t.videos.eyebrowGallery : t.videos.eyebrowPro}
            </p>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            {isGallery ? (
              <>{t.videos.titleGallery} <span className="text-gradient-gold italic">Motion</span></>
            ) : (
              <>{t.videos.titlePro} <span className="text-gradient-gold italic">Process</span></>
            )}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
            {isGallery ? t.videos.descGallery : t.videos.descPro}
          </p>
        </motion.div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {videos.map((video, index) => (
            <VideoCard key={video.id} video={video} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const VideoCard = ({ video, index }: { video: { id: number; title: string; description: string; src: string }; index: number }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <motion.div
      className="group relative overflow-hidden rounded-xl cursor-pointer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={togglePlay}
    >
      <div className="aspect-[9/16] md:aspect-[3/4] relative overflow-hidden">
        {/* Video */}
        <video
          ref={videoRef}
          src={video.src}
          className="w-full h-full object-cover"
          loop
          muted={isMuted}
          playsInline
        />

        {/* Gold Frame on Hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-3 border border-primary/60 rounded-lg" />
        </motion.div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />

        {/* Play Button */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: isPlaying && !isHovered ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/20 backdrop-blur-md border border-primary/50 flex items-center justify-center"
            whileHover={{ scale: 1.1, backgroundColor: 'hsl(var(--primary) / 0.4)' }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 md:w-8 md:h-8 text-primary" fill="currentColor" />
            ) : (
              <Play className="w-6 h-6 md:w-8 md:h-8 text-primary ml-1" fill="currentColor" />
            )}
          </motion.div>
        </motion.div>

        {/* Mute Button */}
        <motion.button
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/30 backdrop-blur-sm border border-primary/30 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered || isPlaying ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          onClick={toggleMute}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-primary" />
          ) : (
            <Volume2 className="w-4 h-4 text-primary" />
          )}
        </motion.button>

        {/* Index Number */}
        <div className="absolute top-4 left-4">
          <span className="font-display text-5xl md:text-6xl text-primary/20 font-bold">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="font-display text-xl md:text-2xl text-foreground mb-2">
            {video.title}
          </h3>
          <motion.p
            className="text-muted-foreground text-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 10,
            }}
            transition={{ duration: 0.3 }}
          >
            {video.description}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

export default VideoGallery;
