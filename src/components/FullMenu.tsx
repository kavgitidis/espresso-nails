import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { servicesData } from '../data';
import { ChevronDown, Clock } from 'lucide-react';
import { TextReveal } from './TextReveal';

export function FullMenu() {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const categories = Array.from(new Set(servicesData.map(s => s.category)));

  return (
    <section id="full-menu" className="py-32 bg-espresso-50 flex flex-col items-center">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-16 flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-16 h-[1px] bg-espresso-400 mx-auto mb-8"
          />
          <h2 className="text-3xl md:text-4xl font-serif text-espresso-900 mb-6 flex justify-center">
            <TextReveal delay={0.1}>Full Menu</TextReveal>
          </h2>
        </div>

        <div className="space-y-4">
          {categories.map((category) => (
            <div key={category} className="border-b border-espresso-200 last:border-0">
              <button
                onClick={() => setOpenCategory(openCategory === category ? null : category)}
                className="w-full py-6 flex justify-between items-center focus:outline-none group"
              >
                <span className="text-xl font-serif text-espresso-900 group-hover:text-espresso-600 transition-colors">{category}</span>
                <motion.div
                  animate={{ rotate: openCategory === category ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="text-espresso-400" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openCategory === category && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6 space-y-4">
                      {servicesData.filter(s => s.category === category).map(service => (
                        <div key={service.id} className="flex justify-between items-start group">
                          <div className="flex-1 pr-4">
                            <p className="font-medium text-espresso-900">{service.name}</p>
                            <p className="text-sm text-espresso-600 font-light flex items-center gap-1.5 mt-1">
                              <Clock size={14} /> {service.duration}
                            </p>
                          </div>
                          <span className="font-serif text-espresso-900 font-medium whitespace-nowrap">{service.price}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
