import React, { useState, useMemo } from 'react';
import { X, ArrowLeft, Check, Calendar, Clock, MapPin, ChevronRight, ChevronLeft } from 'lucide-react';
import { servicesData, salonInfo } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { Service } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'category' | 'service' | 'datetime' | 'details' | 'success';

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState<Step>('category');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [monthOffset, setMonthOffset] = useState(0);
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = useMemo(() => Array.from(new Set(servicesData.map(s => s.category))), []);

  const resetFlow = () => {
    setStep('category');
    setSelectedCategory(null);
    setSelectedService(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setMonthOffset(0);
  };

  const handleClose = () => {
    onClose();
    setTimeout(resetFlow, 300);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setStep('service');
  };

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setStep('datetime');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('success');
    }, 1500);
  };

  const currentMonthData = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // First day of target month
    const targetDate = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
    const targetYear = targetDate.getFullYear();
    const targetMonth = targetDate.getMonth();
    
    // 0 = Sunday, 1 = Monday ... 6 = Saturday (JS). We want Monday=0, Sunday=6
    const startingDayOfWeek = targetDate.getDay() === 0 ? 6 : targetDate.getDay() - 1; 

    // Total days in month
    const daysInMonth = new Date(targetYear, targetMonth + 1, 0).getDate();
    
    const days = [];
    
    // Blank padding before 1st day
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Actual days
    for (let i = 1; i <= daysInMonth; i++) {
       const d = new Date(targetYear, targetMonth, i);
       days.push({
         date: d,
         isPast: d.getTime() < today.getTime(),
       });
    }
    
    return {
      monthLabel: targetDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      days,
    }
  }, [monthOffset]);

  const timeSlots = [
    '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', 
    '13:00', '14:00', '14:30', '15:00', '16:00', '16:30', '17:00'
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex md:items-center md:justify-center overflow-hidden">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-espresso-900/40 backdrop-blur-sm"
            onClick={handleClose}
          ></motion.div>
          
          {/* Modal Container */}
          <motion.div 
            initial={{ opacity: 0, y: 100, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.98 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0 }}
            className="relative bg-white w-full h-full md:h-auto md:max-h-[90vh] md:w-[900px] md:rounded-xl flex flex-col md:flex-row z-10 shadow-2xl overflow-hidden"
          >
            {/* Left Sidebar - Summary (Hidden on Mobile unless success, or collapsed) */}
            <div className="hidden md:flex w-1/3 bg-espresso-50 p-8 flex-col border-r border-espresso-100 overflow-y-auto custom-scrollbar">
              <div className="mb-10">
                <img src={salonInfo.logo} alt="Logo" className="w-16 h-16 rounded-full border border-espresso-200 mb-6 object-cover" />
                <h3 className="text-2xl font-serif text-espresso-900 mb-2">{salonInfo.name}</h3>
                <p className="text-espresso-600 font-light text-sm flex items-start gap-2">
                  <MapPin size={16} className="shrink-0 mt-0.5" />
                  <span>{salonInfo.address}</span>
                </p>
              </div>

              <div className="flex-grow space-y-6">
                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase text-espresso-400 mb-2">Service</p>
                  {selectedService ? (
                    <div>
                      <p className="font-medium text-espresso-900 text-lg">{selectedService.name}</p>
                      <p className="text-espresso-600 font-light mt-1">{selectedService.duration}</p>
                    </div>
                  ) : (
                    <p className="text-espresso-300 font-light italic">Not selected</p>
                  )}
                </div>

                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase text-espresso-400 mb-2">Date & Time</p>
                  {selectedDate && selectedTime ? (
                    <div>
                      <p className="font-medium text-espresso-900 text-lg flex items-center gap-2">
                        <Calendar size={18} />
                        {selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                      </p>
                      <p className="text-espresso-600 font-light mt-1 flex items-center gap-2">
                        <Clock size={16} />
                        {selectedTime}
                      </p>
                    </div>
                  ) : (
                    <p className="text-espresso-300 font-light italic">Not selected</p>
                  )}
                </div>
              </div>

              {selectedService && (
                <div className="pt-6 border-t border-espresso-200">
                  <div className="flex justify-between items-end">
                    <p className="text-espresso-500 text-sm">Total due at venue</p>
                    <p className="text-2xl font-serif text-espresso-900">{selectedService.price.replace(' ', '\u00A0')}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Right Side - Interactive Content */}
            <div className="w-full md:w-2/3 flex flex-col flex-1 min-h-0 bg-white relative">
               {/* Mobile Header elements, Close Button */}
               <div className="flex shrink-0 items-center justify-between px-6 py-4 md:px-8 md:py-6 border-b border-espresso-100/50 bg-white z-10 relative">
                  {/* Mobile Progress Bar (absolute to bottom of header) */}
                  <div className="absolute bottom-0 left-0 h-[2px] bg-espresso-200 w-full">
                     <motion.div 
                       className="h-full bg-espresso-900"
                       initial={{ width: 0 }}
                       animate={{ 
                         width: step === 'category' ? '20%' : 
                                step === 'service' ? '40%' : 
                                step === 'datetime' ? '60%' : 
                                step === 'details' ? '80%' : '100%' 
                       }}
                       transition={{ duration: 0.3 }}
                     />
                  </div>
                  
                  <div className="flex items-center gap-4">
                    {step !== 'category' && step !== 'success' && (
                      <button 
                        onClick={() => {
                          if (step === 'service') setStep('category');
                          if (step === 'datetime') setStep('service');
                          if (step === 'details') setStep('datetime');
                        }}
                        className="p-2 -ml-2 text-espresso-500 hover:bg-espresso-50 rounded-full transition-colors"
                      >
                        <ArrowLeft size={20} strokeWidth={2} />
                      </button>
                    )}
                    <h2 className="text-xl md:text-2xl font-serif text-espresso-900">
                      {step === 'category' && "What would you like?"}
                      {step === 'service' && "Select Service"}
                      {step === 'datetime' && "Choose Date & Time"}
                      {step === 'details' && "Your Details"}
                      {step === 'success' && "Booking Confirmed"}
                    </h2>
                  </div>
                  <button 
                    onClick={handleClose}
                    className="text-espresso-400 hover:bg-espresso-50 rounded-full p-2 transition-colors -mr-2"
                  >
                    <X size={20} strokeWidth={2} />
                  </button>
               </div>

               {/* Add simple mobile total summary bar if a service is selected and we're not on success */}
               <div className="md:hidden flex-shrink-0">
                 {selectedService && step !== 'success' && step !== 'category' && step !== 'service' && (
                   <div className="bg-espresso-50 px-6 py-3 border-b border-espresso-100 flex justify-between items-center text-sm shadow-inner overflow-hidden">
                     <div className="truncate pr-4 flex-1">
                       <span className="font-medium text-espresso-900 truncate block">{selectedService.name}</span>
                       {selectedDate && selectedTime ? (
                         <span className="text-espresso-600 block text-xs">{selectedDate.toLocaleDateString('en-US', {month: 'short', day: 'numeric'})} at {selectedTime}</span>
                       ) : (
                         <span className="text-espresso-600 block text-xs">{selectedService.duration}</span>
                       )}
                     </div>
                     <span className="font-serif font-medium text-espresso-900 whitespace-nowrap">{selectedService.price}</span>
                   </div>
                 )}
               </div>

               {/* Form Steps */}
               <div className="flex-1 overflow-y-auto overflow-x-hidden px-6 py-6 md:p-8 custom-scrollbar">
                  <AnimatePresence mode="wait">
                    
                    {/* STEP 1: CATEGORY */}
                    {step === 'category' && (
                      <motion.div 
                        key="step-category"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-3"
                      >
                        {categories.map((catName) => (
                          <button
                            key={catName}
                            onClick={() => handleCategorySelect(catName)}
                            className="w-full text-left p-5 rounded-lg border border-espresso-100 hover:border-espresso-300 hover:bg-espresso-50/50 transition-all group flex justify-between items-center"
                          >
                            <span className="text-lg text-espresso-800 font-medium group-hover:text-espresso-900">{catName}</span>
                            <ChevronRight size={20} className="text-espresso-300 group-hover:text-espresso-600 group-hover:translate-x-1 transition-all" />
                          </button>
                        ))}
                      </motion.div>
                    )}

                    {/* STEP 2: SERVICE */}
                    {step === 'service' && selectedCategory && (
                      <motion.div 
                        key="step-service"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                      >
                        {servicesData.filter(s => s.category === selectedCategory).map((service) => (
                          <button
                            key={service.id}
                            onClick={() => handleServiceSelect(service)}
                            className="w-full text-left p-5 rounded-lg border border-espresso-100 hover:border-espresso-400 hover:shadow-md transition-all group focus:outline-none focus:ring-2 focus:ring-espresso-800 focus:border-transparent flex flex-col"
                          >
                            <div className="flex justify-between items-start w-full">
                              <span className="text-lg text-espresso-900 pr-4 font-medium leading-tight">{service.name}</span>
                              <span className="font-serif text-espresso-900 min-w-[80px] text-right">{service.price}</span>
                            </div>
                            <span className="text-espresso-500 text-sm mt-3 flex items-center gap-1.5"><Clock size={14}/> {service.duration}</span>
                          </button>
                        ))}
                      </motion.div>
                    )}

                    {/* STEP 3: DATETIME */}
                    {step === 'datetime' && (
                      <motion.div 
                        key="step-datetime"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col"
                      >
                        <div className="mb-8">
                           <div className="flex justify-between items-center mb-6">
                             <button 
                               onClick={() => setMonthOffset((m) => Math.max(0, m - 1))}
                               disabled={monthOffset === 0}
                               className="p-2 rounded-lg text-espresso-800 hover:bg-espresso-50 disabled:opacity-30 disabled:hover:bg-transparent"
                             >
                               <ChevronLeft size={20} />
                             </button>
                             <div className="text-base font-serif font-medium text-espresso-900">
                               {currentMonthData.monthLabel}
                             </div>
                             <button 
                               onClick={() => setMonthOffset((m) => m + 1)}
                               className="p-2 rounded-lg text-espresso-800 hover:bg-espresso-50"
                             >
                               <ChevronRight size={20} />
                             </button>
                           </div>
                           
                           <div className="grid grid-cols-7 mb-3 text-center text-xs tracking-widest text-espresso-400 font-medium font-sans">
                             {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(d => <div key={d}>{d}</div>)}
                           </div>
                           
                           <div className="grid grid-cols-7 gap-y-2 gap-x-1 sm:gap-x-2">
                             {currentMonthData.days.map((dayObj, i) => {
                               if (!dayObj) return <div key={`empty-${i}`} className="p-2"></div>;
                               const { date, isPast } = dayObj;
                               const isSelected = selectedDate?.getTime() === date.getTime();
                               return (
                                 <button
                                   key={i}
                                   disabled={isPast}
                                   onClick={() => { setSelectedDate(date); setSelectedTime(null); }}
                                   className={`h-9 w-9 sm:h-10 sm:w-10 mx-auto rounded-full flex items-center justify-center text-sm transition-all focus:outline-none ${
                                     isSelected 
                                       ? 'bg-espresso-900 text-white shadow-md font-medium scale-105' :
                                     isPast 
                                       ? 'text-espresso-300 font-light cursor-not-allowed' : 
                                       'bg-transparent text-espresso-800 hover:bg-espresso-100 font-light'
                                   }`}
                                 >
                                    {date.getDate()}
                                 </button>
                               )
                             })}
                           </div>
                        </div>

                        {selectedDate && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex-grow flex flex-col"
                          >
                             <h4 className="text-sm font-semibold tracking-widest text-espresso-800 uppercase mb-4">Time</h4>
                             <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-3">
                               {timeSlots.map(time => {
                                 const isSelected = selectedTime === time;
                                 return (
                                   <button
                                     key={time}
                                     onClick={() => setSelectedTime(time)}
                                     className={`py-3 rounded-lg border transition-all text-center focus:outline-none ${
                                       isSelected
                                        ? 'bg-espresso-900 border-espresso-900 text-white shadow-md'
                                        : 'bg-white border-espresso-200 text-espresso-800 hover:border-espresso-400 hover:bg-espresso-50'
                                     }`}
                                   >
                                     {time}
                                   </button>
                                 )
                               })}
                             </div>
                          </motion.div>
                        )}
                      </motion.div>
                    )}

                    {/* STEP 4: DETAILS */}
                    {step === 'details' && (
                      <motion.div 
                        key="step-details"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <form id="booking-form" onSubmit={handleSubmit} className="space-y-6">
                           <div>
                            <label htmlFor="name" className="block text-xs uppercase tracking-widest font-medium text-espresso-800 mb-2">First & Last Name</label>
                            <input 
                              type="text" 
                              id="name" 
                              required
                              autoFocus
                              placeholder="e.g. Maria Ioannou"
                              className="w-full px-5 py-4 rounded-lg bg-white border border-espresso-200 focus:outline-none focus:border-espresso-900 focus:ring-0 text-espresso-900 font-light transition-colors"
                            />
                          </div>
                          <div>
                            <label htmlFor="phone" className="block text-xs uppercase tracking-widest font-medium text-espresso-800 mb-2">Phone Number</label>
                            <div className="flex rounded-lg border border-espresso-200 bg-white overflow-hidden focus-within:border-espresso-900 transition-colors">
                              <span className="flex-shrink-0 inline-flex items-center px-4 bg-espresso-50 text-espresso-500 font-light border-r border-espresso-200">
                                +30
                              </span>
                              <input 
                                type="tel" 
                                id="phone" 
                                required
                                placeholder="69XXXXXXXX"
                                className="w-full px-4 py-4 focus:outline-none text-espresso-900 font-light bg-transparent"
                              />
                            </div>
                          </div>
                          <div>
                            <label htmlFor="email" className="block text-xs uppercase tracking-widest font-medium text-espresso-800 mb-2">Email (Optional)</label>
                            <input 
                              type="email" 
                              id="email" 
                              placeholder="For booking confirmation"
                              className="w-full px-5 py-4 rounded-lg bg-white border border-espresso-200 focus:outline-none focus:border-espresso-900 focus:ring-0 text-espresso-900 font-light transition-colors"
                            />
                          </div>
                          <div>
                             <label htmlFor="notes" className="block text-xs uppercase tracking-widest font-medium text-espresso-800 mb-2">Booking Notes (Optional)</label>
                             <textarea 
                               id="notes" 
                               rows={3}
                               placeholder="Any special requests or removal needed?"
                               className="w-full px-5 py-4 rounded-lg bg-white border border-espresso-200 focus:outline-none focus:border-espresso-900 focus:ring-0 text-espresso-900 font-light transition-colors resize-none"
                             ></textarea>
                          </div>
                        </form>
                      </motion.div>
                    )}

                    {/* STEP 5: SUCCESS */}
                    {step === 'success' && (
                      <motion.div 
                        key="step-success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-6 md:py-16 flex flex-col items-center min-h-full justify-center"
                      >
                        <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-8 mx-auto ring-8 ring-emerald-50/50">
                          <Check size={40} strokeWidth={2} />
                        </div>
                        <h3 className="text-3xl font-serif text-espresso-900 mb-4">Request sent!</h3>
                        <p className="text-espresso-600 font-light leading-relaxed mb-10 max-w-sm mx-auto">
                           Thank you! Your appointment request has been submitted. We will contact you shortly to confirm the details.
                        </p>
                        
                        <div className="bg-espresso-50 rounded-xl p-6 text-left w-full max-w-sm mx-auto border border-espresso-100 shadow-sm">
                           <p className="text-espresso-900 font-medium mb-1 truncate">{selectedService?.name}</p>
                           <p className="text-espresso-600 text-sm mb-4">{selectedDate?.toLocaleDateString('el-GR', { weekday: 'long', day: 'numeric', month: 'long' })} at {selectedTime}</p>
                           
                           <div className="flex items-start gap-2 pt-4 border-t border-espresso-200 mt-4">
                             <MapPin size={16} className="text-espresso-500 mt-0.5 shrink-0" />
                             <div>
                               <p className="text-sm font-medium text-espresso-900 mb-0.5">{salonInfo.name}</p>
                               <p className="text-xs text-espresso-500">{salonInfo.address}</p>
                             </div>
                           </div>
                        </div>

                        <button
                          onClick={handleClose}
                          className="mt-10 px-8 py-4 bg-espresso-900 text-white rounded-lg text-sm font-medium tracking-wide w-full max-w-sm hover:bg-espresso-800 transition-colors"
                        >
                          Close & Return to Site
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
               </div>

               {/* Sticky Bottom Bar for Next Steps */}
               {step === 'datetime' && selectedDate && selectedTime && (
                 <div className="flex-shrink-0 w-full p-4 pb-8 md:pb-6 md:p-6 bg-white border-t border-espresso-100/50 z-20">
                    <button
                      onClick={() => setStep('details')}
                      className="w-full bg-espresso-900 text-white rounded-lg tracking-widest uppercase text-xs font-medium py-4 px-6 hover:bg-espresso-800 focus:outline-none transition-colors shadow-lg"
                    >
                      Continue
                    </button>
                 </div>
               )}
               {step === 'details' && (
                 <div className="flex-shrink-0 w-full p-4 pb-8 md:pb-6 md:p-6 bg-white border-t border-espresso-100/50 z-20">
                    <button
                      form="booking-form"
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-espresso-900 text-white rounded-lg tracking-widest uppercase text-xs font-medium py-4 px-6 hover:bg-espresso-800 focus:outline-none transition-colors disabled:opacity-70 flex items-center justify-center gap-3 shadow-lg"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        'Confirm Request'
                      )}
                    </button>
                 </div>
               )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
