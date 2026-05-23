/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Navbar, Hero, Services, Gallery, OurWork, FullMenu, Reviews, Footer, BookingModal } from './components';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="font-sans text-espresso-900 bg-white selection:bg-espresso-200 selection:text-espresso-900 relative">
      <div className="fixed inset-0 pointer-events-none z-[999] bg-noise opacity-[0.03] mix-blend-multiply"></div>
      <Navbar onBookClick={() => setIsBookingOpen(true)} />
      <Hero onBookClick={() => setIsBookingOpen(true)} />
      <Services onBookClick={() => setIsBookingOpen(true)} />
      <Gallery />
      <OurWork />
      <FullMenu />
      <Reviews />
      <Footer />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
}
