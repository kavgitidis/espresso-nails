import { Instagram, MapPin, Phone, Clock } from 'lucide-react';
import { salonInfo, workingHours } from '../data';

export function Footer() {
  return (
    <footer className="bg-espresso-900 text-espresso-50 pt-20 pb-10 border-t-4 border-espresso-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24 mb-16">
          
          {/* About & Contact */}
          <div>
            <h3 className="text-2xl font-serif mb-6">{salonInfo.name}</h3>
            <ul className="space-y-4 text-espresso-200">
              <li className="flex items-start gap-3">
                <MapPin className="shrink-0 mt-1" size={20} />
                <a href={salonInfo.maps} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  {salonInfo.address}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="shrink-0" size={20} />
                <a href={`tel:${salonInfo.phone}`} className="hover:text-white transition-colors">
                  {salonInfo.phone}
                </a>
              </li>
              <li className="flex items-center gap-3 mt-6">
                <Instagram className="shrink-0" size={20} />
                <a href={salonInfo.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  @espressonailsss
                </a>
              </li>
            </ul>
          </div>

          {/* Working Hours */}
          <div className="md:col-span-2 lg:col-span-1">
             <h3 className="text-xl font-serif mb-6 flex items-center gap-2">
                <Clock size={20} /> Working Hours
             </h3>
             <ul className="space-y-2 text-espresso-200">
               {workingHours.map((wh) => (
                 <li key={wh.day} className="flex justify-between items-center border-b border-espresso-800 pb-2 mb-2 last:border-0">
                   <span className="font-medium">{wh.day}</span>
                   <span>{wh.hours}</span>
                 </li>
               ))}
             </ul>
          </div>
          
          {/* Brand Philosophy */}
          <div className="lg:col-span-1">
             <h3 className="text-xl font-serif mb-6">Our Philosophy</h3>
             <p className="text-espresso-200 leading-relaxed font-sans text-sm">
                At Espresso Nails, we believe that nail care is an art form. We combine meticulous technique with premium products to ensure every client leaves feeling refreshed, confident, and beautiful. 
             </p>
          </div>

        </div>
        
        <div className="text-center text-espresso-400 text-sm border-t border-espresso-800 pt-8 mt-8">
          <p>&copy; {new Date().getFullYear()} {salonInfo.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
