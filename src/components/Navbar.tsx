import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { salonInfo } from '../data';
import { MagneticButton } from './MagneticButton';

interface NavbarProps {
  onBookClick: () => void;
}

export function Navbar({ onBookClick }: NavbarProps) {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    // Ignore bounce effects on mobile devices (e.g. iOS rubber banding)
    if (latest < 0) return;

    if (latest > 150 && latest > previous) {
      setHidden(true);
    } else if (latest < previous) {
      setHidden(false);
    } else if (latest <= 150) {
      setHidden(false);
    }
    
    setHasScrolled(latest > 50);
  });

  return (
    <motion.nav
      variants={{
        visible: { y: "0%" },
        hidden: { y: "-100%" },
      }}
      initial="visible"
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-12 transition-[background-color,border-color,padding] duration-500 ease-in-out ${
        hasScrolled ? "bg-espresso-50/90 backdrop-blur-md shadow-sm border-b border-espresso-200/50 py-3" : "bg-transparent py-6 border-b border-transparent"
      }`}
    >
      <div className="flex items-center gap-3">
        <img 
          src={salonInfo.logo} 
          alt="Espresso Nails Logo" 
          className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border border-espresso-200" 
        />
        <span className="font-serif text-xl md:text-2xl tracking-wide text-espresso-900 hidden sm:block">
          {salonInfo.name}
        </span>
      </div>

      <div className="flex items-center gap-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: hasScrolled ? 1 : 0, y: hasScrolled ? 0 : -10 }}
          transition={{ duration: 0.3 }}
          className={hasScrolled ? "pointer-events-auto" : "pointer-events-none"}
        >
          <MagneticButton
            onClick={onBookClick}
            className="px-6 py-3 bg-espresso-900 text-espresso-50 font-medium tracking-widest uppercase text-[10px] md:text-xs hover:bg-espresso-800 transition-colors duration-500 shadow-sm rounded-sm"
          >
            Book Appointment
          </MagneticButton>
        </motion.div>
      </div>
    </motion.nav>
  );
}
