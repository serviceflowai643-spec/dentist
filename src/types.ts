export interface Dentist {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  availableDays?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  category: 'General' | 'Cosmetic' | 'Restorative' | 'Preventive' | 'Specialised';
  benefits: string[];
  durationEstimate?: string;
}

export interface OpeningHourItem {
  day: string;
  hours: string;
  isOpen: boolean;
}

export interface PatientReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  source: string;
  text: string;
  verified: boolean;
}

export interface BookingRequest {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  reason: string;
  preferredDate: string;
  preferredTime: string;
  preferredDentist?: string;
  notes?: string;
  createdAt: string;
  status: 'Pending Confirmation' | 'Contacted';
}

export interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  quickActions?: { label: string; action: string }[];
}
