import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FallbackPanel } from './FallbackPanel.tsx';

interface SetupCard {
  id: string;
  num: string;
  title: string;
  imageSrc: string;
  today: string;
  withNero: string;
}

const CARDS: SetupCard[] = [
  {
    id: 'form',
    num: '01',
    title: 'A simple form',
    imageSrc: '/work-1.jpg',
    today: 'Enquiries come in through calls and phone messages while you work.',
    withNero: 'Your customers fill in one form with what they need.',
  },
  {
    id: 'list',
    num: '02',
    title: 'A plain list',
    imageSrc: '/work-2.jpg',
    today: 'Repair notes get buried in chats and notebooks.',
    withNero: 'Every enquiry and repair shows in one plain list.',
  },
  {
    id: 'handover',
    num: '03',
    title: 'Handover and upkeep',
    imageSrc: '/work-3.jpg',
    today: 'Tools you try are hard to run and someone else owns them.',
    withNero: 'I set it up, hand it over to you, and keep it running each month.',
  },
];

export const WhatIDoSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);

  const shouldReduceMotion = useReducedMotion();
  const [maxScrollDistance, setMaxScrollDistance] = useState(1600);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  // Measure exact horizontal distance needed so card 03 is 100% visible
  useEffect(() => {
    const calculateDistance = () => {
      if (trackRef.current && viewportRef.current) {
        const trackW = trackRef.current.scrollWidth;
        const viewW = viewportRef.current.clientWidth;
        // Total translation so the last card aligns comfortably inside viewport
        const distance = Math.max(0, trackW - viewW + 48);
        setMaxScrollDistance(distance);
      }
    };

    calculateDistance();
    window.addEventListener('resize', calculateDistance);
    return () => window.removeEventListener('resize', calculateDistance);
  }, []);

  // Scroll progress for pinned horizontal translation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Slide cards from 0 to 0.78, then hold card 03 fully in view from 0.78 to 1.0
  const translateX = useTransform(
    scrollYProgress,
    [0, 0.78, 1],
    [0, -maxScrollDistance, -maxScrollDistance]
  );

  // Track active card index for controls
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (latest < 0.35) {
        setActiveCardIndex(0);
      } else if (latest < 0.7) {
        setActiveCardIndex(1);
      } else {
        setActiveCardIndex(2);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Jump to specific card by scrolling the pinned container
  const scrollToCard = (index: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const containerTop = window.scrollY + rect.top;
    const scrollableRange = rect.height - window.innerHeight;

    // Progress points: card 0 at 0, card 1 at 0.42, card 2 at 0.82
    const targetProgress = index === 0 ? 0.05 : index === 1 ? 0.44 : 0.85;
    const targetScrollY = containerTop + targetProgress * scrollableRange;

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth',
    });
  };

  // Mobile horizontal scroll tracking for dot indicators
  const handleMobileScroll = () => {
    if (!mobileScrollRef.current) return;
    const scrollLeft = mobileScrollRef.current.scrollLeft;
    const cardWidth = mobileScrollRef.current.clientWidth * 0.85;
    const idx = Math.round(scrollLeft / cardWidth);
    setActiveCardIndex(Math.min(2, Math.max(0, idx)));
  };

  const scrollMobileToIndex = (index: number) => {
    if (!mobileScrollRef.current) return;
    const cardWidth = mobileScrollRef.current.clientWidth * 0.86;
    mobileScrollRef.current.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth',
    });
  };

  return (
    <section id="what-i-do" className="relative bg-[#F6F1E7]">
      {/* Desktop View: Pinned horizontal scrolling container */}
      {!shouldReduceMotion ? (
        <div className="hidden md:block">
          {/* Scroll track with 320vh height to give ample room to view all 3 cards */}
          <div ref={containerRef} className="h-[340vh] relative">
            <div
              ref={viewportRef}
              className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden py-8 px-6 lg:px-12"
            >
              {/* Pinned Heading & Card Controls */}
              <div className="max-w-7xl mx-auto w-full mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#1F2429]/60">
                    What I set up
                  </span>
                  <h2 className="font-serif text-5xl lg:text-7xl text-[#1F2429] mt-1 tracking-tight">
                    What I do
                  </h2>
                </div>

                {/* Step indicator pills with click-to-jump */}
                <div className="flex items-center gap-3 bg-[#1F2429]/5 p-1.5 rounded-full border border-[rgba(31,36,41,0.1)]">
                  {CARDS.map((c, i) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => scrollToCard(i)}
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer ${
                        activeCardIndex === i
                          ? 'bg-[#1F2429] text-[#F6F1E7] shadow-xs'
                          : 'text-[#1F2429]/70 hover:text-[#1F2429]'
                      }`}
                    >
                      {c.num} {c.title}
                    </button>
                  ))}

                  {/* Left / Right arrows */}
                  <div className="flex items-center gap-1 pl-1 border-l border-[rgba(31,36,41,0.15)]">
                    <button
                      type="button"
                      disabled={activeCardIndex === 0}
                      onClick={() => scrollToCard(activeCardIndex - 1)}
                      aria-label="Previous card"
                      className="w-7 h-7 rounded-full flex items-center justify-center text-[#1F2429] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#1F2429]/10 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      disabled={activeCardIndex === 2}
                      onClick={() => scrollToCard(activeCardIndex + 1)}
                      aria-label="Next card"
                      className="w-7 h-7 rounded-full flex items-center justify-center text-[#1F2429] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#1F2429]/10 transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Sliding Card Carousel Track */}
              <div className="w-full">
                <motion.div
                  ref={trackRef}
                  style={{ x: translateX }}
                  className="flex gap-8 items-stretch will-change-transform pr-16"
                >
                  {CARDS.map((card, idx) => (
                    <div
                      key={card.id}
                      className={`w-[68vw] max-w-[800px] shrink-0 bg-[#F6F1E7] border rounded-[28px] overflow-hidden flex flex-col shadow-xs transition-colors duration-300 ${
                        activeCardIndex === idx
                          ? 'border-[rgba(31,36,41,0.25)] ring-1 ring-[#E8A33D]/30'
                          : 'border-[rgba(31,36,41,0.12)]'
                      }`}
                      style={{ height: 'calc(100vh - 250px)', maxHeight: '600px', minHeight: '460px' }}
                    >
                      {/* Top 60%: Work Picture / Rich Fallback Panel */}
                      <div className="h-[60%] w-full relative overflow-hidden">
                        <FallbackPanel
                          imageSrc={card.imageSrc}
                          altText={card.title}
                          outlineText={card.num}
                          className="h-full w-full rounded-none"
                        />
                      </div>

                      {/* Bottom 40%: Info */}
                      <div className="h-[40%] p-6 lg:p-8 flex flex-col justify-center bg-[#F6F1E7]">
                        <div className="flex items-baseline gap-4 mb-3">
                          <span className="font-serif text-3xl font-light text-[#E8A33D]">
                            {card.num}
                          </span>
                          <h3 className="font-serif text-2xl lg:text-3xl font-medium text-[#1F2429]">
                            {card.title}
                          </h3>
                        </div>

                        <div className="space-y-2 text-[16px] lg:text-[17px] leading-relaxed max-w-[68ch]">
                          <p className="text-[#1F2429]/70">
                            <span className="font-semibold text-[#1F2429]">Today:</span>{' '}
                            {card.today}
                          </p>
                          <p className="text-[#1F2429]">
                            <span className="font-semibold text-[#E8A33D]">With Nero:</span>{' '}
                            {card.withNero}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* Mobile view OR when reduced motion is preferred */}
      <div
        className={`${
          shouldReduceMotion ? 'block' : 'block md:hidden'
        } py-16 px-5 sm:px-8 max-w-7xl mx-auto`}
      >
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#1F2429]/60">
              What I set up
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#1F2429] mt-1 tracking-tight">
              What I do
            </h2>
          </div>

          {/* Mobile dot indicators */}
          <div className="flex items-center gap-1.5 pb-1">
            {CARDS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollMobileToIndex(i)}
                aria-label={`Go to card ${i + 1}`}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                  activeCardIndex === i
                    ? 'w-6 bg-[#E8A33D]'
                    : 'bg-[#1F2429]/25 hover:bg-[#1F2429]/40'
                }`}
              />
            ))}
          </div>
        </div>

        {/* On phone: swipe sideways cleanly across all 3 cards with snap points */}
        <div
          ref={mobileScrollRef}
          onScroll={handleMobileScroll}
          className="flex md:flex-col gap-5 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-none -mx-5 px-5 sm:-mx-8 sm:px-8"
        >
          {CARDS.map((card) => (
            <div
              key={card.id}
              className="w-[84vw] max-w-[420px] md:max-w-none md:w-full shrink-0 snap-center bg-[#F6F1E7] border border-[rgba(31,36,41,0.12)] rounded-[28px] overflow-hidden flex flex-col shadow-xs"
            >
              <div className="h-60 sm:h-72 w-full relative">
                <FallbackPanel
                  imageSrc={card.imageSrc}
                  altText={card.title}
                  outlineText={card.num}
                  className="h-full w-full rounded-none"
                />
              </div>
              <div className="p-6 flex flex-col justify-center">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="font-serif text-2xl font-light text-[#E8A33D]">
                    {card.num}
                  </span>
                  <h3 className="font-serif text-2xl font-medium text-[#1F2429]">
                    {card.title}
                  </h3>
                </div>
                <div className="space-y-2 text-[15px] sm:text-[16px] leading-relaxed">
                  <p className="text-[#1F2429]/75">
                    <span className="font-semibold text-[#1F2429]">Today:</span>{' '}
                    {card.today}
                  </p>
                  <p className="text-[#1F2429]">
                    <span className="font-semibold text-[#E8A33D]">With Nero:</span>{' '}
                    {card.withNero}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
