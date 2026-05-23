import { galleryImages } from '../data';
import { motion } from 'motion/react';

export function Gallery() {
  return (
    <section className="py-24 bg-espresso-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 relative">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-serif text-espresso-900 mb-6"
          >
            The Studio
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-16 h-[1px] bg-espresso-400 mx-auto"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryImages.slice(-4).map((src, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="relative overflow-hidden group aspect-[4/5] shadow-sm bg-espresso-200"
            >
              <div className="absolute inset-0 bg-espresso-900/10 opacity-100 group-hover:opacity-0 transition-opacity duration-700 z-10" />
              <img
                src={src}
                alt={`Studio Detail ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
