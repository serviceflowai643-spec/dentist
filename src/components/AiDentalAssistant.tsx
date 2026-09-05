import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  Calendar, 
  Phone, 
  Clock, 
  MapPin, 
  Users, 
  AlertTriangle,
  Smile,
  CheckCircle2,
  Minimize2,
  ArrowRight,
  ShieldAlert,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PRACTICE_INFO, OPENING_HOURS, DENTISTS, SERVICES } from '../data/practiceData';
import { ChatMessage } from '../types';

interface AiDentalAssistantProps {
  onOpenBooking: (serviceId?: string, dentistId?: string) => void;
}

interface BookingState {
  isBooking: boolean;
  step: 'date' | 'time' | 'name' | 'phone' | 'email' | 'reason' | 'dentist' | 'confirming' | 'submitted';
  data: {
    fullName?: string;
    phone?: string;
    email?: string;
    preferredDate?: string;
    preferredTime?: string;
    reason?: string;
    preferredDentist?: string;
  };
}

export const AiDentalAssistant: React.FC<AiDentalAssistantProps> = ({ onOpenBooking }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isSubmittingBooking, setIsSubmittingBooking] = useState<boolean>(false);
  
  // Conversational Booking State Machine
  const [bookingState, setBookingState] = useState<BookingState>({
    isBooking: false,
    step: 'date',
    data: {},
  });

  // Conversation Context Memory
  const [conversationContext, setConversationContext] = useState<{
    lastTopic?: 'emergency' | 'booking' | 'hours' | 'dentist' | 'location' | 'service' | 'pricing' | 'kids' | 'cosmetic' | 'whitening';
    serviceMentioned?: string;
    dentistMentioned?: string;
  }>({});

  const initialMessage: ChatMessage = {
    id: 'msg-welcome',
    sender: 'ai',
    text: "Hello! Welcome to Camberwell Junction Dental. I'm your virtual dental receptionist.\n\nHow can I help you today? You can ask about appointments, treatments, our six dentists, clinic hours, or location.",
    timestamp: 'Just now',
    quickActions: [
      { label: 'Book an Appointment', action: 'start_booking' },
      { label: 'Opening Hours', action: 'hours' },
      { label: 'Our Services', action: 'services' },
      { label: 'Meet Our Dentists', action: 'dentists' },
      { label: 'Location & Parking', action: 'location' },
      { label: 'Call Reception (03) 9882 1187', action: 'call' },
    ],
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  // Submit collected booking directly to the backend API
  const submitBookingToServer = async (bookingData: BookingState['data']) => {
    setIsSubmittingBooking(true);
    try {
      const response = await fetch('/api/appointments/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: bookingData.fullName || 'Patient',
          email: bookingData.email || 'camberwelljunctiondental@gmail.com',
          phone: bookingData.phone || '(03) 9882 1187',
          preferredDate: bookingData.preferredDate || 'Next Available Date',
          preferredTime: bookingData.preferredTime || 'Morning (8:15 AM – 12:00 PM)',
          reason: bookingData.reason || 'General Dental Consultation',
          preferredDentist: bookingData.preferredDentist || 'Any Available Dentist',
          notes: 'Requested via Camberwell Dental Assistant conversational chat',
        }),
      });

      const result = await response.json();
      setIsSubmittingBooking(false);

      if (response.ok && result.success) {
        setBookingState({ isBooking: false, step: 'submitted', data: {} });
        return {
          success: true,
          bookingId: result.bookingId,
        };
      } else {
        return {
          success: false,
          error: result.error || 'Server submission error',
        };
      }
    } catch (err) {
      setIsSubmittingBooking(false);
      return {
        success: false,
        error: 'Network connection issue',
      };
    }
  };

  // Conversational response generation with context awareness
  const handleIntelligentResponse = async (rawInput: string) => {
    const text = rawInput.toLowerCase().trim();
    
    // --- 1. CONVERSATIONAL BOOKING INTAKE FLOW ---
    if (bookingState.isBooking) {
      const currentData = { ...bookingState.data };

      // Step: Date
      if (bookingState.step === 'date') {
        currentData.preferredDate = rawInput.trim();
        setBookingState({
          isBooking: true,
          step: 'time',
          data: currentData,
        });
        return {
          text: `Got it, ${rawInput.trim()} sounds great. What time of day works best for you?\n\n• Morning (8:15 AM – 12:00 PM)\n• Early Afternoon (12:00 PM – 3:00 PM)\n• Late Afternoon (3:00 PM – 5:15 PM)`,
          actions: [
            { label: 'Morning (8:15am–12pm)', action: 'time_morning' },
            { label: 'Afternoon (12pm–3pm)', action: 'time_afternoon' },
            { label: 'Late Afternoon (3pm–5:15pm)', action: 'time_late' },
          ],
        };
      }

      // Step: Time
      if (bookingState.step === 'time') {
        currentData.preferredTime = rawInput.trim();
        setBookingState({
          isBooking: true,
          step: 'name',
          data: currentData,
        });
        return {
          text: `Perfect. May I please have your full name?`,
        };
      }

      // Step: Full Name
      if (bookingState.step === 'name') {
        currentData.fullName = rawInput.trim();
        setBookingState({
          isBooking: true,
          step: 'phone',
          data: currentData,
        });
        return {
          text: `Nice to meet you, ${rawInput.trim()}! What is the best contact phone number for our reception team to reach you on?`,
        };
      }

      // Step: Phone Number
      if (bookingState.step === 'phone') {
        currentData.phone = rawInput.trim();
        setBookingState({
          isBooking: true,
          step: 'email',
          data: currentData,
        });
        return {
          text: `Thank you. And what is your email address so we can send you the appointment details?`,
        };
      }

      // Step: Email
      if (bookingState.step === 'email') {
        currentData.email = rawInput.trim();
        setBookingState({
          isBooking: true,
          step: 'reason',
          data: currentData,
        });
        return {
          text: `Almost done! What is the main reason for your visit?\n(e.g., General Check-up & Clean, Tooth Pain, Teeth Whitening, Broken Tooth, Child Check-up)`,
          actions: [
            { label: 'Check-up & Clean', action: 'reason_checkup' },
            { label: 'Tooth Pain / Discomfort', action: 'reason_pain' },
            { label: 'Teeth Whitening / Cosmetic', action: 'reason_cosmetic' },
            { label: 'Children’s Dental', action: 'reason_child' },
          ],
        };
      }

      // Step: Reason -> Trigger Server Submission
      if (bookingState.step === 'reason') {
        currentData.reason = rawInput.trim();
        if (conversationContext.dentistMentioned) {
          currentData.preferredDentist = conversationContext.dentistMentioned;
        }

        // Send to backend
        const result = await submitBookingToServer(currentData);

        if (result.success) {
          return {
            text: `✅ Thank you, ${currentData.fullName}! Your appointment request has been submitted directly to our practice reception at camberwelljunctiondental@gmail.com.\n\n📋 Summary of your request:\n• Date: ${currentData.preferredDate}\n• Time: ${currentData.preferredTime}\n• Reason: ${currentData.reason}\n• Contact: ${currentData.phone} | ${currentData.email}\n\n⚠️ Please note: This is an appointment request. Our reception team will review our schedule and contact you shortly by phone or email to confirm your exact time slot.`,
            actions: [
              { label: 'Call Practice (03) 9882 1187', action: 'call' },
              { label: 'Ask Another Question', action: 'welcome' },
            ],
          };
        } else {
          return {
            text: `We received your details, but had a slight delay connecting to the server. You can also submit directly using our main booking form or call our team directly at (03) 9882 1187!`,
            actions: [
              { label: 'Open Booking Form', action: 'book' },
              { label: 'Call (03) 9882 1187', action: 'call' },
            ],
          };
        }
      }
    }

    // --- 2. DENTAL EMERGENCY INTELLIGENCE ---
    if (
      text.includes('emergency') || 
      text.includes('bleed') || 
      text.includes('severe pain') || 
      text.includes('hurts badly') || 
      text.includes('knocked out') || 
      text.includes('swollen') || 
      text.includes('swelling') || 
      text.includes('broken tooth') || 
      text.includes('chipped tooth') || 
      text.includes('abscess') || 
      text.includes('throbbing') ||
      text.includes('infection') ||
      text.includes('trauma')
    ) {
      setConversationContext(prev => ({ ...prev, lastTopic: 'emergency' }));
      return {
        text: `⚠️ If you are experiencing acute dental pain, swelling, continuous bleeding, or dental trauma, please contact our clinic immediately on (03) 9882 1187 so our team can accommodate you as soon as possible.\n\n• For knocked-out permanent teeth: Keep the tooth moist in cold milk or saliva and seek dental care immediately.\n• For severe facial swelling affecting swallowing or breathing, or life-threatening symptoms, please call 000 or visit your nearest hospital emergency department.\n\nWould you like to request an emergency appointment request or call right now?`,
        actions: [
          { label: 'Call Now: (03) 9882 1187', action: 'call' },
          { label: 'Request Emergency Slot', action: 'start_booking' },
        ],
      };
    }

    // --- 3. INITIATE APPOINTMENT BOOKING ---
    if (
      text.includes('book') || 
      text.includes('appointment') || 
      text.includes('schedule') || 
      text.includes('wanna book') || 
      text.includes('need a dentist') || 
      text.includes('need dentist') || 
      text.includes('tomorrow') || 
      text.includes('consultation') || 
      text.includes('check up') ||
      text.includes('see dr')
    ) {
      // Check if a specific dentist was mentioned
      let foundDentist = '';
      if (text.includes('jessica')) foundDentist = 'Dr Jessica Li';
      else if (text.includes('michael')) foundDentist = 'Dr Michael Chan';
      else if (text.includes('ronald')) foundDentist = 'Dr Ronald Chan';
      else if (text.includes('linda')) foundDentist = 'Dr Linda Huang';
      else if (text.includes('lili') || text.includes('zhi li')) foundDentist = 'Dr Zhi Li (Lili) Lau';
      else if (text.includes('chris') || text.includes('choi')) foundDentist = 'Dr Chris Choi';

      setBookingState({
        isBooking: true,
        step: 'date',
        data: {
          preferredDentist: foundDentist || 'Any Available Dentist',
        },
      });
      setConversationContext(prev => ({ 
        ...prev, 
        lastTopic: 'booking',
        dentistMentioned: foundDentist || prev.dentistMentioned 
      }));

      return {
        text: `I'd be glad to help you request an appointment${foundDentist ? ` with ${foundDentist}` : ''}!\n\nWhat day would you prefer to come in? (e.g., Tomorrow, Monday, Next Wednesday, or a specific date)`,
        actions: [
          { label: 'Next Available Day', action: 'date_next_available' },
          { label: 'This Week', action: 'date_this_week' },
          { label: 'Saturday Appointment', action: 'date_saturday' },
          { label: 'Open Full Booking Form', action: 'book' },
        ],
      };
    }

    // --- 4. PRICING & HEALTH FUNDS / HICAPS / MEDICARE CDBS ---
    if (
      text.includes('cost') || 
      text.includes('price') || 
      text.includes('how much') || 
      text.includes('fee') || 
      text.includes('expensive') || 
      text.includes('insurance') || 
      text.includes('hicaps') || 
      text.includes('bupa') || 
      text.includes('medibank') || 
      text.includes('hcf') || 
      text.includes('nib') || 
      text.includes('cdbs') || 
      text.includes('medicare') || 
      text.includes('bulk bill')
    ) {
      setConversationContext(prev => ({ ...prev, lastTopic: 'pricing' }));
      return {
        text: `At Camberwell Junction Dental:\n\n• Health Funds: We provide instant on-the-spot claiming via HICAPS for all Australian health funds (Bupa, Medibank, HCF, NIB, CBHS, Teachers Health, etc.).\n• Children's CDBS: We participate in the Medicare Child Dental Benefits Schedule (CDBS) with bulk billing for eligible children up to $1,095 over 2 calendar years.\n• Transparent Pricing: Because dental treatments depend on your unique clinical needs and tooth condition, our dentists provide a clear, itemized treatment quote after a comprehensive examination.\n\nPlease call our reception at (03) 9882 1187 for specific fee inquiries.`,
        actions: [
          { label: 'Book Examination', action: 'start_booking' },
          { label: 'Call Reception', action: 'call' },
        ],
      };
    }

    // --- 5. OPENING HOURS & DAYS ---
    if (
      text.includes('hour') || 
      text.includes('open') || 
      text.includes('close') || 
      text.includes('time') || 
      text.includes('saturday') || 
      text.includes('weekend') || 
      text.includes('sunday') || 
      text.includes('when are you open')
    ) {
      setConversationContext(prev => ({ ...prev, lastTopic: 'hours' }));
      return {
        text: `Our practice hours are:\n\n• Monday to Friday: 8:15 AM – 5:15 PM\n• Saturday: 8:45 AM – 3:30 PM\n• Sunday: Closed\n\nWould you like to request an appointment during these times?`,
        actions: [
          { label: 'Book for Saturday', action: 'date_saturday' },
          { label: 'Book Weekday Slot', action: 'start_booking' },
          { label: 'Call (03) 9882 1187', action: 'call' },
        ],
      };
    }

    // --- 6. LOCATION, ADDRESS & PARKING ---
    if (
      text.includes('where') || 
      text.includes('address') || 
      text.includes('location') || 
      text.includes('park') || 
      text.includes('tram') || 
      text.includes('train') || 
      text.includes('station') || 
      text.includes('prospect hill') || 
      text.includes('junction')
    ) {
      setConversationContext(prev => ({ ...prev, lastTopic: 'location' }));
      return {
        text: `📍 Practice Location:\n1/2 Prospect Hill Road, Camberwell VIC 3124, Australia\n(Directly at Camberwell Junction, steps from Camberwell Railway Station and Tram Routes 70 & 75).\n\n🚗 Parking: Ample street parking is available on Prospect Hill Road and nearby side streets, plus multistory parking at The Well shopping centre just across the junction.`,
        actions: [
          { label: 'Open Google Maps', action: 'directions' },
          { label: 'Book an Appointment', action: 'start_booking' },
        ],
      };
    }

    // --- 7. DENTISTS & PRACTITIONER TEAM ---
    if (
      text.includes('dentist') || 
      text.includes('doctor') || 
      text.includes('dr ') || 
      text.includes('who works') || 
      text.includes('team') || 
      text.includes('jessica') || 
      text.includes('michael') || 
      text.includes('ronald') || 
      text.includes('linda') || 
      text.includes('lili') || 
      text.includes('lau') || 
      text.includes('choi')
    ) {
      setConversationContext(prev => ({ ...prev, lastTopic: 'dentist' }));
      return {
        text: `We have six registered dental practitioners at Camberwell Junction Dental:\n\n1. Dr Jessica Li — Principal Dentist (Gentle family & preventive care)\n2. Dr Michael Chan — General Dentistry & Restorations\n3. Dr Ronald Chan — Restorative & Preventative Care\n4. Dr Linda Huang — Comprehensive Family Dentistry\n5. Dr Zhi Li (Lili) Lau — Gentle & Compassionate Care\n6. Dr Chris Choi — General & Cosmetic Procedures\n\nWould you like to book with a specific doctor?`,
        actions: [
          { label: 'Book with Dr Jessica Li', action: 'dentist_jessica' },
          { label: 'Book with Dr Michael Chan', action: 'dentist_michael' },
          { label: 'Book with Dr Ronald Chan', action: 'dentist_ronald' },
          { label: 'Book with Dr Linda Huang', action: 'dentist_linda' },
          { label: 'Book with Dr Zhi Li Lau', action: 'dentist_lili' },
          { label: 'Book with Dr Chris Choi', action: 'dentist_chris' },
        ],
      };
    }

    // --- 8. TEETH WHITENING & COSMETIC ---
    if (
      text.includes('whiten') || 
      text.includes('whitening') || 
      text.includes('cosmetic') || 
      text.includes('veneer') || 
      text.includes('smile') || 
      text.includes('bleach')
    ) {
      setConversationContext(prev => ({ ...prev, lastTopic: 'whitening', serviceMentioned: 'Teeth Whitening' }));
      return {
        text: `✨ We offer professional teeth whitening and cosmetic dental solutions:\n\n• In-Chair Whitening: Fast, safe, clinically supervised treatment for noticeable brightening in a single visit.\n• Take-Home Custom Trays: Custom-fitted dental trays with dentist-grade whitening gel for gradual, comfortable results at home.\n• Cosmetic Veneers & Bonding: Porcelain and composite options to repair chips, gaps, and discoloration.\n\nWould you like to request a cosmetic dental consultation?`,
        actions: [
          { label: 'Book Whitening Consultation', action: 'start_booking' },
          { label: 'Ask About Veneers', action: 'ask_veneers' },
          { label: 'Call Practice', action: 'call' },
        ],
      };
    }

    // --- 9. ROOT CANALS & WISDOM TEETH ---
    if (
      text.includes('root canal') || 
      text.includes('wisdom') || 
      text.includes('extraction') || 
      text.includes('pull tooth') || 
      text.includes('remove tooth')
    ) {
      setConversationContext(prev => ({ ...prev, lastTopic: 'service', serviceMentioned: 'Root Canal / Wisdom Teeth' }));
      return {
        text: `Yes, we provide gentle root canal therapy and wisdom tooth assessments/removals at Camberwell Junction Dental:\n\n• Root Canal Therapy: Modern techniques to relieve pain, eliminate infection, and save your natural tooth.\n• Wisdom Teeth Care: Digital x-rays and clinical evaluations to manage impactions, pain, or crowding with gentle surgical removal when indicated.\n\nAre you currently experiencing pain with a tooth?`,
        actions: [
          { label: 'I Have Tooth Pain', action: 'emergency_pain' },
          { label: 'Request an Assessment', action: 'start_booking' },
          { label: 'Call (03) 9882 1187', action: 'call' },
        ],
      };
    }

    // --- 10. CHILDREN'S DENTISTRY & CDBS ---
    if (
      text.includes('child') || 
      text.includes('kid') || 
      text.includes('toddler') || 
      text.includes('baby tooth') || 
      text.includes('paediatric') || 
      text.includes('pediatric') || 
      text.includes('cdbs')
    ) {
      setConversationContext(prev => ({ ...prev, lastTopic: 'kids', serviceMentioned: 'Children’s Dentistry' }));
      return {
        text: `👶 We love welcoming children and families! Our practice focuses on making kids feel relaxed, calm, and positive about dental visits.\n\n• First dental visits & check-ups\n• Gentle cleans and fluoride treatments\n• Fissure sealants for cavity prevention\n• Custom sports mouthguards\n• Medicare Child Dental Benefits Schedule (CDBS) eligible services bulk-billed.`,
        actions: [
          { label: 'Book Child’s Appointment', action: 'start_booking' },
          { label: 'Check CDBS Info', action: 'faq_cdbs' },
        ],
      };
    }

    // --- 11. ORTHODONTICS / BRACES (Honesty Check) ---
    if (
      text.includes('braces') || 
      text.includes('invisalign') || 
      text.includes('orthodontic') || 
      text.includes('aligners')
    ) {
      return {
        text: `Camberwell Junction Dental focuses primarily on general, family, preventive, restorative, and cosmetic dentistry. For complex orthodontic cases, our dentists can perform an initial assessment and refer you to trusted specialist orthodontists if required.\n\nWould you like to schedule an examination with one of our dentists?`,
        actions: [
          { label: 'Book an Examination', action: 'start_booking' },
          { label: 'Call Reception', action: 'call' },
        ],
      };
    }

    // --- 12. GENERAL SERVICES LIST ---
    if (
      text.includes('service') || 
      text.includes('treatment') || 
      text.includes('what do you do') || 
      text.includes('clean') || 
      text.includes('filling') || 
      text.includes('implant') || 
      text.includes('crown') || 
      text.includes('denture')
    ) {
      setConversationContext(prev => ({ ...prev, lastTopic: 'service' }));
      return {
        text: `Our clinical services include:\n\n• General & Preventive Care (Check-ups, cleans, digital x-rays, fillings)\n• Children's Dentistry & CDBS\n• Dental Implants, Crowns & Bridges\n• Root Canal Therapy & Wisdom Teeth\n• Cosmetic Dentistry & Teeth Whitening\n• Full & Partial Dentures\n• Gum (Periodontal) Care & Custom Mouthguards\n\nWhich service can I provide more details on?`,
        actions: [
          { label: 'Book an Appointment', action: 'start_booking' },
          { label: 'Teeth Whitening', action: 'ask_whitening' },
          { label: 'Check-ups & Cleans', action: 'ask_checkup' },
          { label: 'Dental Implants', action: 'ask_implants' },
        ],
      };
    }

    // --- 13. CONVERSATIONAL SHORT QUERIES & FOLLOW-UPS ---
    if (text === 'yes' || text === 'sure' || text === 'ok' || text === 'okay' || text === 'yeah' || text === 'please') {
      if (conversationContext.lastTopic === 'emergency') {
        return {
          text: `Please call our clinic directly at (03) 9882 1187 so we can fit you in urgently, or I can take your details right now to submit an urgent appointment request.`,
          actions: [
            { label: 'Call (03) 9882 1187', action: 'call' },
            { label: 'Submit Urgent Request', action: 'start_booking' },
          ],
        };
      }
      // Start booking
      setBookingState({ isBooking: true, step: 'date', data: {} });
      return {
        text: `Wonderful! What day would you prefer to come in? (e.g. Tomorrow, Monday, Next Wednesday)`,
        actions: [
          { label: 'Next Available Date', action: 'date_next_available' },
          { label: 'This Saturday', action: 'date_saturday' },
        ],
      };
    }

    if (text.includes('thank') || text.includes('thanks') || text.includes('bye') || text.includes('goodbye')) {
      return {
        text: `You're very welcome! If you ever need anything else or wish to book an appointment, we're here to help. Have a wonderful day from the Camberwell Junction Dental team! 😊`,
        actions: [
          { label: 'Book an Appointment', action: 'start_booking' },
          { label: 'Call Practice', action: 'call' },
        ],
      };
    }

    // --- 14. DEFAULT INTELLIGENT HELPER FALLBACK ---
    return {
      text: `I'm here to help with all questions about Camberwell Junction Dental! I can assist you with:\n\n• Requesting an appointment\n• Clinic opening hours & location at 1/2 Prospect Hill Rd\n• Our six registered dental practitioners\n• General, children's, and cosmetic dental treatments\n• Dental emergency advice & contact details\n\nWhat would you like assistance with?`,
      actions: [
        { label: 'Book an Appointment', action: 'start_booking' },
        { label: 'Opening Hours', action: 'hours' },
        { label: 'Our Dentists', action: 'dentists' },
        { label: 'Call (03) 9882 1187', action: 'call' },
      ],
    };
  };

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    const response = await handleIntelligentResponse(text);

    setTimeout(() => {
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: response.text,
        timestamp: 'Just now',
        quickActions: response.actions,
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 400);
  };

  const handleActionClick = (action: string) => {
    if (action === 'start_booking') {
      handleSend('I would like to book an appointment');
    } else if (action === 'book') {
      onOpenBooking();
      setIsOpen(false);
    } else if (action === 'call') {
      window.location.href = `tel:${PRACTICE_INFO.phoneClean}`;
    } else if (action === 'hours') {
      handleSend('What are your opening hours?');
    } else if (action === 'dentists') {
      handleSend('Who are the dentists at your practice?');
    } else if (action === 'location') {
      handleSend('Where is your clinic located and what are the parking options?');
    } else if (action === 'services') {
      handleSend('What dental services do you offer?');
    } else if (action === 'directions') {
      window.open(PRACTICE_INFO.address.googleMapsDirectLink, '_blank');
    } else if (action === 'dentist_jessica') {
      handleSend('I want to book with Dr Jessica Li');
    } else if (action === 'dentist_michael') {
      handleSend('I want to book with Dr Michael Chan');
    } else if (action === 'dentist_ronald') {
      handleSend('I want to book with Dr Ronald Chan');
    } else if (action === 'dentist_linda') {
      handleSend('I want to book with Dr Linda Huang');
    } else if (action === 'dentist_lili') {
      handleSend('I want to book with Dr Zhi Li Lau');
    } else if (action === 'dentist_chris') {
      handleSend('I want to book with Dr Chris Choi');
    } else if (action === 'date_next_available') {
      handleSend('Next available date please');
    } else if (action === 'date_this_week') {
      handleSend('This week');
    } else if (action === 'date_saturday') {
      handleSend('Upcoming Saturday');
    } else if (action === 'time_morning') {
      handleSend('Morning (8:15 AM – 12:00 PM)');
    } else if (action === 'time_afternoon') {
      handleSend('Early Afternoon (12:00 PM – 3:00 PM)');
    } else if (action === 'time_late') {
      handleSend('Late Afternoon (3:00 PM – 5:15 PM)');
    } else if (action === 'reason_checkup') {
      handleSend('Routine Check-up & Clean');
    } else if (action === 'reason_pain') {
      handleSend('Tooth pain and discomfort');
    } else if (action === 'reason_cosmetic') {
      handleSend('Teeth Whitening and Cosmetic consultation');
    } else if (action === 'reason_child') {
      handleSend('Children dental examination');
    } else if (action === 'ask_whitening') {
      handleSend('How does teeth whitening work?');
    } else if (action === 'ask_checkup') {
      handleSend('Tell me about regular check-ups and cleans');
    } else if (action === 'ask_implants') {
      handleSend('Do you do dental implants?');
    } else if (action === 'ask_veneers') {
      handleSend('Can you tell me about dental veneers?');
    } else if (action === 'faq_cdbs') {
      handleSend('How does the Medicare CDBS scheme work?');
    } else if (action === 'emergency_pain') {
      handleSend('I have severe tooth pain and need help');
    } else if (action === 'welcome') {
      handleSend('Hi');
    }
  };

  return (
    <>
      {/* Floating Circular Trigger Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, delay: 0.8, ease: 'easeOut' }}
            className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40"
          >
            <div className="relative">
              {/* Subtle ambient pulse ring */}
              <span className="absolute -inset-1 rounded-full bg-[#5B827F]/25 animate-ping pointer-events-none" />

              <button
                id="ai-assistant-toggle-btn"
                onClick={() => setIsOpen(true)}
                aria-label="Open Camberwell Dental Assistant"
                className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#5B827F] text-white shadow-xl hover:bg-[#4A6B68] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#5B827F]/30"
              >
                {/* Smile / Dental Icon */}
                <div className="relative">
                  <Smile className="w-7 h-7 sm:w-8 sm:h-8" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full border-2 border-[#5B827F]" />
                </div>

                {/* Hover Tooltip (desktop) */}
                <span className="absolute right-full mr-3 px-3.5 py-1.5 rounded-full bg-[#1A1A1A] text-white text-xs font-semibold whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-md hidden sm:block">
                  Camberwell Dental Assistant 👋
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[390px] md:w-[410px] h-[540px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-[#E5E2DA] flex flex-col overflow-hidden"
          >
            {/* Assistant Header */}
            <div className="p-4 bg-[#5B827F] text-white flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-full bg-white/15 flex items-center justify-center border border-white/20">
                  <Smile className="w-5 h-5 text-white" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#5B827F]" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold leading-tight">
                    Camberwell Dental Assistant
                  </h4>
                  <p className="text-[11px] text-[#D1CEC6]">
                    Virtual Receptionist • (03) 9882 1187
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full hover:bg-white/15 text-white/80 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close chat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Chat Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#F9F8F6]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#5B827F] text-white rounded-br-xs shadow-xs'
                        : 'bg-white text-[#1A1A1A] border border-[#E5E2DA] rounded-bl-xs shadow-xs whitespace-pre-line'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Quick action buttons attached to message */}
                  {msg.quickActions && msg.quickActions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2 max-w-[95%]">
                      {msg.quickActions.map((action, i) => (
                        <button
                          key={i}
                          onClick={() => handleActionClick(action.action)}
                          className="px-3 py-1 rounded-full text-[11px] font-semibold bg-white hover:bg-[#5B827F] text-[#5B827F] hover:text-white border border-[#E5E2DA] transition-colors shadow-2xs cursor-pointer"
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-white border border-[#E5E2DA] w-16 text-[#5B827F]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5B827F] animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5B827F] animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5B827F] animate-bounce [animation-delay:0.4s]" />
                </div>
              )}

              {isSubmittingBooking && (
                <div className="flex items-center gap-2 p-3 rounded-2xl bg-white border border-[#E5E2DA] text-xs text-[#5B827F]">
                  <Loader2 className="w-4 h-4 animate-spin text-[#5B827F]" />
                  <span>Submitting your appointment request to reception...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Action Footer Bar */}
            <div className="px-3.5 py-2 bg-[#F0EEE9] border-t border-[#E5E2DA] flex items-center justify-between text-[11px] text-[#666666]">
              <span className="truncate">Need urgent help? Call (03) 9882 1187</span>
              <button
                onClick={() => {
                  onOpenBooking();
                  setIsOpen(false);
                }}
                className="font-bold text-[#5B827F] hover:underline shrink-0 cursor-pointer"
              >
                Book Form →
              </button>
            </div>

            {/* Input Box */}
            <div className="p-3 bg-white border-t border-[#E5E2DA]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  placeholder={bookingState.isBooking ? "Type your response..." : "Ask about appointments, dentists, treatments..."}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-full bg-[#F9F8F6] border border-[#E5E2DA] focus:outline-none focus:ring-2 focus:ring-[#5B827F]/30 focus:border-[#5B827F] text-xs sm:text-sm text-[#1A1A1A]"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isSubmittingBooking}
                  className="p-2.5 rounded-full bg-[#5B827F] hover:bg-[#4A6B68] disabled:opacity-40 text-white transition-colors cursor-pointer"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
