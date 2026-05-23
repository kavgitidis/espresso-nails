import { Service, WorkingHour } from './types';
import logo from './assets/logo.jpg';
import gallery1 from './assets/gallery-1.jpg';
import gallery2 from './assets/gallery-2.jpg';
import gallery3 from './assets/gallery-3.jpg';
import gallery4 from './assets/gallery-4.jpg';
import gallery5 from './assets/gallery-5.jpg';
import gallery6 from './assets/gallery-6.jpg';
import gallery7 from './assets/gallery-7.jpg';
import gallery8 from './assets/gallery-8.jpg';

export const servicesData: Service[] = [
  // Τεχνητά Νύχια
  { id: 'tn1', category: 'Τεχνητά Νύχια', name: 'Επιμήκυνση με Ακρυλικό', duration: '2 ώρες', price: '40.00 EUR' },
  { id: 'tn2', category: 'Τεχνητά Νύχια', name: 'Επιμήκυνση με Acrygel', duration: '2 ώρες', price: '40.00 EUR' },
  { id: 'tn3', category: 'Τεχνητά Νύχια', name: 'Αφαίρεση Τεχνητών Νυχιών', duration: '20 λεπτά', price: '10.00 EUR' },
  { id: 'tn4', category: 'Τεχνητά Νύχια', name: 'Αφαίρεση Ακρυλικού & Τοποθέτηση', duration: '2 ώρες 30 λεπτά', price: '50.00 EUR' },
  { id: 'tn5', category: 'Τεχνητά Νύχια', name: 'Αφαίρεση Acrygel & Τοποθέτηση', duration: '2 ώρες 30 λεπτά', price: '50.00 EUR' },
  { id: 'tn6', category: 'Τεχνητά Νύχια', name: 'Συντήρηση με Acrygel', duration: '1 ώρα 30 λεπτά', price: '35.00 EUR' },
  { id: 'tn7', category: 'Τεχνητά Νύχια', name: 'Συντήρηση με Ακρυλικό', duration: '1 ώρα 30 λεπτά', price: '35.00 EUR' },
  { id: 'tn8', category: 'Τεχνητά Νύχια', name: 'Φυσική Ενίσχυση (acrylic, gel, acrygel)', duration: '1 ώρα', price: '25.00 EUR' },
  // Μανικιούρ & Πεντικιούρ
  { id: 'mp1', category: 'Μανικιούρ & Πεντικιούρ', name: 'Γαλλικό Μανικιούρ ημιμόνιμο', duration: '1 ώρα', price: '25.00 EUR' },
  { id: 'mp2', category: 'Μανικιούρ & Πεντικιούρ', name: 'Πεντικιούρ Αντρικό', duration: '35 λεπτά', price: '22.00 EUR' },
  { id: 'mp3', category: 'Μανικιούρ & Πεντικιούρ', name: 'Αφαίρεση Ημιμόνιμου', duration: '10 λεπτά', price: '5.00 EUR' },
  { id: 'mp4', category: 'Μανικιούρ & Πεντικιούρ', name: 'Μανικιούρ απλό & Πεντικιούρ Θεραπευτικό', duration: '1 ώρα 30 λεπτά', price: '45.00 EUR' },
  { id: 'mp5', category: 'Μανικιούρ & Πεντικιούρ', name: 'Ημιμόνιμο Βάψιμο', duration: '45 λεπτά', price: '15.00 EUR' }, // Price assumed 15 since it was missing
  { id: 'mp6', category: 'Μανικιούρ & Πεντικιούρ', name: 'Ημιμόνιμο Βάψιμο Πόδια', duration: '45 λεπτά', price: '25.00 EUR' },
  { id: 'mp7', category: 'Μανικιούρ & Πεντικιούρ', name: 'Μανικιούρ με Απλό Βερνίκι', duration: '35 λεπτά', price: '15.00 EUR' },
  { id: 'mp8', category: 'Μανικιούρ & Πεντικιούρ', name: 'Μανικιούρ Αντρικό', duration: '30 λεπτά', price: '15.00 EUR' },
  { id: 'mp9', category: 'Μανικιούρ & Πεντικιούρ', name: 'Μανικιούρ Ημιμόνιμο', duration: '45 λεπτά', price: '20.00 EUR' },
  { id: 'mp10', category: 'Μανικιούρ & Πεντικιούρ', name: 'Πεντικιούρ με Απλό Βερνίκι', duration: '40 λεπτά', price: '22.00 EUR' },
  { id: 'mp11', category: 'Μανικιούρ & Πεντικιούρ', name: 'Μανικιούρ Russian (extra)', duration: '20 λεπτά', price: '5.00 EUR' },
  { id: 'mp12', category: 'Μανικιούρ & Πεντικιούρ', name: 'Μανικιούρ & Πεντικιούρ Αντρικό', duration: '1 ώρα', price: '37.00 EUR' },
  { id: 'mp13', category: 'Μανικιούρ & Πεντικιούρ', name: 'Αφαίρεση Ημιμόνιμου & Μανικιούρ απλό', duration: '40 λεπτά', price: '20.00 EUR' },
  { id: 'mp14', category: 'Μανικιούρ & Πεντικιούρ', name: 'Μανικιούρ με Ενισχυμένη Βάση (rubber base)', duration: '45 λεπτά', price: '22.00 EUR' },
  { id: 'mp15', category: 'Μανικιούρ & Πεντικιούρ', name: 'Πεντικιούρ Θεραπευτικό (jelly spa) Ημιμόνιμο ή απλό', duration: '1 ώρα', price: '30.00 EUR' },
  { id: 'mp16', category: 'Μανικιούρ & Πεντικιούρ', name: 'Πεντικιούρ Russian (extra)', duration: '20 λεπτά', price: '5.00 EUR' },
  { id: 'mp17', category: 'Μανικιούρ & Πεντικιούρ', name: 'Πεντικιούρ Ημιμόνιμο', duration: '45 λεπτά', price: '25.00 EUR' },
  { id: 'mp18', category: 'Μανικιούρ & Πεντικιούρ', name: 'Μανικιούρ απλό + θεραπευτικό πεντικιούρ', duration: '2 ώρες', price: '40.00 EUR' },
  { id: 'mp19', category: 'Μανικιούρ & Πεντικιούρ', name: 'Μανικιούρ + Πεντικιούρ ημιμόνιμο', duration: '2 ώρες', price: '38.25 EUR' },
  { id: 'mp20', category: 'Μανικιούρ & Πεντικιούρ', name: 'Μανικιούρ με την μέθοδο σταγόνα (hard gel)', duration: '1 ώρα', price: '25.00 EUR' },
  // Classic Massages
  { id: 'cm1', category: 'Classic Massages', name: 'Μασάζ Χεριών με κερί (extra)', duration: '10 λεπτά', price: '5.00 EUR' },
  { id: 'cm2', category: 'Classic Massages', name: 'Μασάζ Ποδιών με κερί (extra)', duration: '10 λεπτά', price: '5.00 EUR' },
  // Nail Extras
  { id: 'ne1', category: 'Nail Extras', name: 'Nail Art Σύνθετα', duration: '25 λεπτά', price: '10.00 EUR' },
  { id: 'ne2', category: 'Nail Extras', name: 'Θεραπεία Jelly Spa Χέρια (extra)', duration: '15 λεπτά', price: '5.00 EUR' },
  { id: 'ne3', category: 'Nail Extras', name: 'Μικρά Σχέδια (γαλλικό, ομπρέ)', duration: '15 λεπτά', price: '5.00 EUR' },
  // Φρύδια & Βλεφαρίδες
  { id: 'fb1', category: 'Φρύδια & Βλεφαρίδες', name: 'Σχηματισμός Φρυδιών', duration: '10 λεπτά', price: '8.00 EUR' },
  { id: 'fb2', category: 'Φρύδια & Βλεφαρίδες', name: 'Καθαρισμός φρυδιών', duration: '10 λεπτά', price: '5.00 EUR' },
];

export const workingHours: WorkingHour[] = [
  { day: 'Δευτέρα', hours: '09:00–19:00' },
  { day: 'Τρίτη', hours: '09:00–23:00' },
  { day: 'Τετάρτη', hours: '09:00–23:00' },
  { day: 'Πέμπτη', hours: '09:00–23:00' },
  { day: 'Παρασκευή', hours: '09:00–23:00' },
  { day: 'Σάββατο', hours: '09:00–23:00' },
  { day: 'Κυριακή', hours: '10:00–19:00' },
];

export const galleryImages = [
  gallery1,
  gallery2,
  gallery3,
  gallery4,
  gallery5,
  gallery6,
  gallery7,
  gallery8,
];

export const salonInfo = {
  name: 'Espresso Nails',
  phone: '2110088135',
  logo: logo,
  address: 'Φιλολάου 114-118, Αθήνα',
  instagram: 'https://www.instagram.com/espressonailsss',
  maps: 'https://maps.app.goo.gl/whCKuxdd2zwk7uqM7',
};
