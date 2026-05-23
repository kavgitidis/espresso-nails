export interface Service {
  id: string;
  category: string;
  name: string;
  duration: string;
  price: string;
}

export interface WorkingHour {
  day: string;
  hours: string;
}

export interface BookingData {
  serviceId: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
}
