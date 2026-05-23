import { motion } from 'motion/react';
import { galleryImages } from '../data';
import { MagneticButton } from './MagneticButton';
import { TextReveal } from './TextReveal';

interface ServicesProps {
  onBookClick: () => void;
}

const highlightCategories = [
  {
    title: 'Τεχνητά Νύχια',
    subtitle: 'Artificial Nails',
    description: 'Flawless extensions, acrylics, and acrygel sculpted for enduring beauty and perfectly natural lines.',
    image: galleryImages[1],
  },
  {
    title: 'Μανικιούρ & Πεντικιούρ',
    subtitle: 'Manicure & Pedicure',
    description: 'Premium hand and foot care, from minimalist spa treatments to highly detailed techniques.',
    image: galleryImages[2],
  },
  {
    title: 'Nail Art & Details',
    subtitle: 'Expressive Additions',
    description: 'Bespoke designs, intricate artwork, and soothing spa therapies designed to elevate your style.',
    image: galleryImages[3],
  }
];

export function Services({ onBookClick }: ServicesProps) {
  return (
    <section id="services" className="py-32 bg-white flex flex-col items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-32 flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-16 h-[1px] bg-espresso-400 mx-auto mb-8"
          />
          <h2 className="text-4xl md:text-5xl font-serif text-espresso-900 mb-6 flex justify-center">
            <TextReveal delay={0.1}>Curated Services</TextReveal>
          </h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 text-espresso-600 max-w-2xl mx-auto font-light leading-relaxed text-lg"
          >
            Explore our defining collections of aesthetic treatments.
          </motion.p>
        </div>

        {/* Asymmetrical Highlights */}
        <div className="space-y-32 mb-32">
          {highlightCategories.map((cat, idx) => {
            const isEven = idx % 2 !== 0;
            return (
              <div key={idx} className={`flex flex-col ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 lg:gap-24`}>
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="w-full md:w-1/2"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden shadow-xl">
                    <motion.div 
                      initial={{ scale: 1.2 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      viewport={{ once: true }}
                      className="w-full h-full"
                    >
                      <img 
                        src={cat.image} 
                        alt={cat.title} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </motion.div>
                    <div className="absolute inset-0 bg-espresso-900/10 pointer-events-none" />
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                  className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left"
                >
                  <p className="text-xs tracking-[0.2em] uppercase text-espresso-400 mb-4">{cat.subtitle}</p>
                  <h3 className="text-3xl md:text-4xl font-serif text-espresso-900 mb-6 leading-tight">{cat.title}</h3>
                  <p className="text-espresso-600 font-light leading-relaxed text-lg max-w-md">{cat.description}</p>
                </motion.div>
              </div>
            );
          })}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center w-full flex justify-center"
        >
          <MagneticButton
            onClick={onBookClick}
            className="inline-flex justify-center items-center gap-3 px-12 py-5 bg-espresso-900 text-espresso-50 font-medium tracking-widest uppercase text-xs hover:bg-espresso-800 transition-colors duration-500 shadow-sm rounded-sm"
          >
            Book Your Session
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}

