import React, { useState } from 'react';
import { OpeningAnimation } from './components/OpeningAnimation';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustStrip } from './components/TrustStrip';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { DentistTeam } from './components/DentistTeam';
import { PatientJourney } from './components/PatientJourney';
import { ChildrenDentistry } from './components/ChildrenDentistry';
import { CosmeticDentistry } from './components/CosmeticDentistry';
import { PatientReviews } from './components/PatientReviews';
import { AppointmentCtaBanner } from './components/AppointmentCtaBanner';
import { ContactAndLocation } from './components/ContactAndLocation';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { PatientInfoModal } from './components/PatientInfoModal';
import { LegalModals } from './components/LegalModals';
import { AiDentalAssistant } from './components/AiDentalAssistant';
import { MobileActionBar } from './components/MobileActionBar';
import { ServiceItem } from './types';
import { SERVICES } from './data/practiceData';

export default function App() {
  // Modal states
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined);
  const [selectedDentistId, setSelectedDentistId] = useState<string | undefined>(undefined);

  const [serviceForDetail, setServiceForDetail] = useState<ServiceItem | null>(null);
  const [isPatientInfoOpen, setIsPatientInfoOpen] = useState(false);
  const [legalType, setLegalType] = useState<'privacy' | 'terms' | 'accessibility' | null>(null);

  const handleOpenBooking = (serviceId?: string, dentistId?: string) => {
    setSelectedServiceId(serviceId);
    setSelectedDentistId(dentistId);
    setIsBookingOpen(true);
  };

  const handleOpenServiceModal = (serviceId: string) => {
    const s = SERVICES.find((item) => item.id === serviceId);
    if (s) {
      setServiceForDetail(s);
    }
  };

  const handleScrollToDentists = () => {
    const el = document.getElementById('dentists');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToReviews = () => {
    const el = document.getElementById('reviews');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F8F6] text-[#2D2D2D] selection:bg-[#5B827F]/20 selection:text-[#1A1A1A] font-sans antialiased">
      {/* Brand Intro Opening Animation Curtain */}
      <OpeningAnimation />

      {/* Navigation Header */}
      <Header
        onOpenBooking={() => handleOpenBooking()}
        onOpenPatientInfo={() => setIsPatientInfoOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onOpenReviews={handleScrollToReviews}
        />

        {/* 2. Trust Strip */}
        <TrustStrip />

        {/* 3. About Section */}
        <AboutSection
          onScrollToDentists={handleScrollToDentists}
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* 4. Services Grid (All 12 items) */}
        <ServicesSection
          onSelectService={(service) => setServiceForDetail(service)}
          onBookService={(serviceId) => handleOpenBooking(serviceId)}
        />

        {/* 5. Why Choose Us */}
        <WhyChooseUs />

        {/* 6. Dentist Team Section */}
        <DentistTeam
          onBookWithDentist={(dentistId) => handleOpenBooking(undefined, dentistId)}
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* 7. Patient Journey Sequence */}
        <PatientJourney
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* 8. Children's Dentistry Section */}
        <ChildrenDentistry
          onOpenBooking={(serviceId) => handleOpenBooking(serviceId || 'childrens-dentistry')}
          onOpenServiceModal={handleOpenServiceModal}
        />

        {/* 9. Cosmetic Dentistry Section */}
        <CosmeticDentistry
          onOpenBooking={(serviceId) => handleOpenBooking(serviceId || 'cosmetic-dentistry')}
          onOpenServiceModal={handleOpenServiceModal}
        />

        {/* 10. Patient Reviews Section */}
        <PatientReviews
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* 11. Appointment CTA Banner */}
        <AppointmentCtaBanner
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* 12. Contact, Hours & Map Section */}
        <ContactAndLocation
          onOpenBooking={() => handleOpenBooking()}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onOpenPatientInfo={() => setIsPatientInfoOpen(true)}
        onOpenLegal={(type) => setLegalType(type)}
      />

      {/* Fixed Bottom Mobile Action Bar ("Call" & "Book") */}
      <MobileActionBar
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Interactive AI Receptionist Assistant (Floating bottom-right button) */}
      <AiDentalAssistant
        onOpenBooking={(serviceId, dentistId) => handleOpenBooking(serviceId, dentistId)}
      />

      {/* Modals */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedServiceId={selectedServiceId}
        preselectedDentistId={selectedDentistId}
      />

      <ServiceDetailModal
        service={serviceForDetail}
        onClose={() => setServiceForDetail(null)}
        onBook={(serviceId) => handleOpenBooking(serviceId)}
      />

      <PatientInfoModal
        isOpen={isPatientInfoOpen}
        onClose={() => setIsPatientInfoOpen(false)}
        onOpenBooking={() => {
          setIsPatientInfoOpen(false);
          handleOpenBooking();
        }}
      />

      <LegalModals
        type={legalType}
        onClose={() => setLegalType(null)}
      />

    </div>
  );
}
