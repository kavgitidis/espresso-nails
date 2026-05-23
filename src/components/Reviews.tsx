import { Star } from 'lucide-react';
import { motion } from 'motion/react';

const reviews = [
  {
    id: 1,
    name: "Maria K.",
    rating: 5,
    text: "Absolutely stunning work! The attention to detail is unmatched, and the atmosphere is so relaxing. Best manicure I've had in Athens.",
    time: "2 weeks ago"
  },
  {
    id: 2,
    name: "Eleni T.",
    rating: 5,
    text: "I always look forward to my appointments. The staff is professional, and my nails last for weeks without chipping. Highly recommend!",
    time: "1 month ago"
  },
  {
    id: 3,
    name: "Sophia P.",
    rating: 5,
    text: "Beautiful salon and excellent service. They understood exactly what I wanted and executed it perfectly. The Acrygel application is flawless.",
    time: "3 days ago"
  },
  {
    id: 4,
    name: "Katerina D.",
    rating: 5,
    text: "Such a premium experience. From the coffee offered upon arrival to the meticulous cuticle work. Espresso Nails is my new go-to spot.",
    time: "2 months ago"
  },
  {
    id: 5,
    name: "Anna M.",
    rating: 5,
    text: "Clean, elegant, and the nail art is always on point. I showed them a reference picture and they recreated it even better. 10/10.",
    time: "1 week ago"
  }
];

export function Reviews() {
  // Duplicate array to create a seamless loop
  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <section className="py-24 bg-espresso-50 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center relative">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-serif text-espresso-900 mb-6"
          >
            Client Love
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-16 h-[1px] bg-espresso-400 mx-auto"
          />
        </div>
      </div>

      {/* Marquee Container */}
      <div className="relative flex overflow-x-hidden group">
        {/* Left Gradient Fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-r from-espresso-50 to-transparent z-10 pointer-events-none" />
        
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 40,
            repeat: Infinity,
          }}
          className="flex gap-8 px-4 w-max group-hover:[animation-play-state:paused]"
        >
          {duplicatedReviews.map((review, index) => (
            <div 
              key={`${review.id}-${index}`}
              className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-espresso-100/50 w-[300px] sm:w-[350px] shrink-0 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 mb-4 text-yellow-500">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="text-espresso-700 italic text-sm leading-relaxed mb-6 font-serif">
                  "{review.text}"
                </p>
              </div>
              <div className="flex items-center justify-between border-t border-espresso-100 pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-espresso-200 flex items-center justify-center text-espresso-800 font-serif text-sm">
                    {review.name.charAt(0)}
                  </div>
                  <span className="font-medium text-espresso-900 text-sm">{review.name}</span>
                </div>
                <span className="text-xs text-espresso-400">{review.time}</span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Right Gradient Fade */}
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-l from-espresso-50 to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
}
