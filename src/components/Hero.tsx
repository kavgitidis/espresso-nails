import { MapPin, Instagram } from 'lucide-react';
import { salonInfo, galleryImages } from '../data';
import { motion, useScroll, useTransform } from 'motion/react';
import { MagneticButton } from './MagneticButton';
import { TextReveal } from './TextReveal';

interface HeroProps {
  onBookClick: () => void;
}

export function Hero({ onBookClick }: HeroProps) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], ["0%", "30%"]);

  return (
    <section className="relative h-screen min-h-[700px] flex flex-col md:flex-row bg-espresso-50 overflow-hidden">
      {/* Text Content */}
      <div className="w-full md:w-[55%] flex items-center justify-center p-6 sm:p-12 lg:p-20 relative z-10 pt-32 md:pt-0">
        <div 
          className="max-w-xl w-full text-center md:text-left pt-20 md:pt-0"
        >
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
            className="mb-8 flex justify-center md:justify-start"
          >
            <div className="w-16 h-[1px] bg-espresso-400"></div>
          </motion.div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif text-espresso-900 mb-6 leading-tight tracking-tight flex flex-col items-center md:items-start">
            <TextReveal delay={0.1}>Elevate Your</TextReveal>
            <div className="italic text-espresso-600 font-light overflow-hidden">
               <motion.div
                 initial={{ y: "100%" }}
                 animate={{ y: "0%" }}
                 transition={{ duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9], delay: 0.5 }}
               >
                 Aesthetics
               </motion.div>
            </div>
          </h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg text-espresso-700 font-sans mb-12 leading-relaxed font-light max-w-md mx-auto md:mx-0"
          >
            An oasis of calm in Athens, redefining premium nail care and personalized beauty treatments. Step in, unwind, and let us craft your signature look.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mb-16"
          >
            <MagneticButton
              onClick={onBookClick}
              className="px-10 py-5 bg-espresso-900 text-espresso-50 font-medium tracking-widest uppercase text-xs hover:bg-espresso-800 transition-colors duration-500 w-full sm:w-auto shadow-sm rounded-sm"
            >
              Book an Appointment
            </MagneticButton>
          </motion.div>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-8 gap-y-4 text-espresso-800 border-t border-espresso-200/60 pt-8 mt-4">
            <a href={salonInfo.instagram} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 text-[10px] sm:text-xs uppercase tracking-[0.15em] font-medium hover:text-espresso-500 transition-colors">
              <Instagram size={16} strokeWidth={1.5} className="group-hover:-translate-y-1 transition-transform duration-300" />
              <span>Instagram</span>
            </a>
            <a href={salonInfo.maps} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 text-[10px] sm:text-xs uppercase tracking-[0.15em] font-medium hover:text-espresso-500 transition-colors">
              <MapPin size={16} strokeWidth={1.5} className="group-hover:-translate-y-1 transition-transform duration-300" />
              <span>Location</span>
            </a>
          </div>
        </div>
      </div>

      {/* Hero Image with Parallax */}
      <div className="w-full md:w-[45%] absolute md:relative inset-0 md:inset-auto h-full z-0 opacity-15 md:opacity-100 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          style={{ y }}
          className="w-full h-[120%] relative -top-[10%]"
        >
          <div className="absolute inset-0 bg-espresso-900/10 z-10 mix-blend-overlay"></div>
          <img
            src={galleryImages[0]}
            alt="Espresso Nails Interior"
            className="w-full h-full object-cover object-center filter saturate-75"
            loading="eager"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </div>
    </section>
  );
}
