import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { TextReveal } from './TextReveal';

const imageModules = import.meta.glob('../assets/gallery/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' });
const workImages = Object.values(imageModules) as string[];

export function OurWork() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % workImages.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + workImages.length) % workImages.length);
    }
  };

  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24 relative flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-16 h-[1px] bg-espresso-400 mx-auto mb-8"
          />
          <h2 className="text-4xl md:text-5xl font-serif text-espresso-900 mb-6 flex justify-center">
             <TextReveal delay={0.1}>Our Work</TextReveal>
          </h2>
        </div>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {workImages.map((src, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
              className="relative overflow-hidden group shadow-sm bg-espresso-100 rounded-lg cursor-pointer break-inside-avoid"
              onClick={() => setSelectedImage(index)}
            >
              <div className="absolute inset-0 bg-espresso-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
              <img
                src={src}
                alt={`Our Work ${index + 1}`}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-espresso-900/90 backdrop-blur-md"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-6 right-6 text-white/70 hover:text-white p-2" onClick={() => setSelectedImage(null)}>
              <X size={32} strokeWidth={1.5} />
            </button>
            
            <button className="absolute left-6 text-white/70 hover:text-white p-4 hidden md:block" onClick={prevImage}>
              <ChevronLeft size={48} strokeWidth={1} />
            </button>

            <motion.img
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              src={workImages[selectedImage]}
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-sm shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />

            <button className="absolute right-6 text-white/70 hover:text-white p-4 hidden md:block" onClick={nextImage}>
              <ChevronRight size={48} strokeWidth={1} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
