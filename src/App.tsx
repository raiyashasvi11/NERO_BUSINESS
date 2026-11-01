import React from 'react';
import { TopBar } from './components/TopBar.tsx';
import { Hero } from './components/Hero.tsx';
import { ProblemSection } from './components/ProblemSection.tsx';
import { WhatIDoSection } from './components/WhatIDoSection.tsx';
import { BeforeAfterSection } from './components/BeforeAfterSection.tsx';
import { HowWeStartSection } from './components/HowWeStartSection.tsx';
import { AboutSection } from './components/AboutSection.tsx';
import { QuestionsSection } from './components/QuestionsSection.tsx';
import { FinalInvitationSection } from './components/FinalInvitationSection.tsx';
import { FooterSection } from './components/FooterSection.tsx';
import { PhoneStickyBar } from './components/PhoneStickyBar.tsx';

const DETAILS = {
  name: 'Yashasvi Rai',
  firstName: 'Yashasvi',
  businessName: 'Nero',
  city: 'Chennai',
  bookingLink: 'https://cal.com/yashasvi-rai/20-min-call',
  whatsappNumber: '9845654212',
  email: 'yashasvirai0987@gmail.com',
};

export default function App() {
  return (
    <div className="min-h-screen bg-[#F6F1E7] text-[#1F2429] selection:bg-[#E8A33D] selection:text-[#1F2429]">
      {/* 1. Top bar */}
      <TopBar bookingLink={DETAILS.bookingLink} />

      {/* 2. Hero */}
      <main>
        <Hero
          bookingLink={DETAILS.bookingLink}
          whatsappNumber={DETAILS.whatsappNumber}
        />

        {/* 3. The problem */}
        <ProblemSection />

        {/* 4. What I do */}
        <WhatIDoSection />

        {/* 5. Before and after */}
        <BeforeAfterSection />

        {/* 6. How we start */}
        <HowWeStartSection />

        {/* 7. About me */}
        <AboutSection bookingLink={DETAILS.bookingLink} />

        {/* 8. Questions */}
        <QuestionsSection />

        {/* 9. Final invitation */}
        <FinalInvitationSection
          bookingLink={DETAILS.bookingLink}
          whatsappNumber={DETAILS.whatsappNumber}
          email={DETAILS.email}
        />
      </main>

      {/* 10. Footer */}
      <FooterSection
        bookingLink={DETAILS.bookingLink}
        whatsappNumber={DETAILS.whatsappNumber}
        email={DETAILS.email}
        city={DETAILS.city}
        businessName={DETAILS.businessName}
      />

      {/* Phone sticky bottom booking bar */}
      <PhoneStickyBar bookingLink={DETAILS.bookingLink} />
    </div>
  );
}
