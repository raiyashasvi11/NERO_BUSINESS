import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { X, Check } from 'lucide-react';

const WITHOUT_LINES = [
  'You search phone messages to find who asked for a repair.',
  'You write customer names and repair notes on paper.',
  'You answer the same questions about open repairs late into the night.',
  'You wonder if an enquiry was forgotten.',
];

const WITH_LINES = [
  'You check one list on your phone to see all repairs and requests.',
  'You see the details your customer sent in the form.',
  'You know where each repair stands without searching messages.',
  'You close your phone and enjoy your evening.',
];

export const BeforeAfterSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'without' | 'with'>('without');
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-20 sm:py-28 md:py-36 px-5 sm:px-8 max-w-5xl mx-auto bg-[#F6F1E7]">
      <div className="text-center mb-10">
        <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#1F2429]/60">
          Your evening
        </span>
        <h2 className="font-serif text-4xl sm:text-6xl text-[#1F2429] mt-2 tracking-tight">
          A day in the life
        </h2>
      </div>

      {/* Two-position switch */}
      <div className="flex justify-center mb-12">
        <div className="relative inline-flex p-1.5 rounded-full bg-[#1F2429]/8 border border-[rgba(31,36,41,0.12)]">
          <button
            type="button"
            onClick={() => setActiveTab('without')}
            className={`relative z-10 px-6 py-2.5 rounded-full text-sm font-semibold transition-colors duration-200 cursor-pointer ${
              activeTab === 'without' ? 'text-[#F6F1E7]' : 'text-[#1F2429]/70 hover:text-[#1F2429]'
            }`}
          >
            Without Nero
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('with')}
            className={`relative z-10 px-6 py-2.5 rounded-full text-sm font-semibold transition-colors duration-200 cursor-pointer ${
              activeTab === 'with' ? 'text-[#1F2429]' : 'text-[#1F2429]/70 hover:text-[#1F2429]'
            }`}
          >
            With Nero
          </button>

          {/* Sliding active pill background */}
          <motion.div
            layout={!shouldReduceMotion}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            className={`absolute top-1.5 bottom-1.5 rounded-full shadow-xs ${
              activeTab === 'without'
                ? 'left-1.5 w-[calc(50%-6px)] bg-[#1F2429]'
                : 'left-[calc(50%+3px)] w-[calc(50%-6px)] bg-[#E8A33D]'
            }`}
          />
        </div>
      </div>

      {/* Stacked lists with crossfade */}
      <div className="relative border border-[rgba(31,36,41,0.12)] rounded-[28px] p-6 sm:p-10 md:p-12 bg-[#F6F1E7] shadow-xs min-h-[320px] flex items-center">
        <div className="grid grid-cols-1 grid-rows-1 w-full">
          {/* Without Nero list */}
          <motion.div
            initial={false}
            animate={{
              opacity: activeTab === 'without' ? 1 : 0,
              pointerEvents: activeTab === 'without' ? 'auto' : 'none',
            }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.35, ease: 'easeInOut' }}
            className="col-start-1 row-start-1 w-full space-y-6"
          >
            {WITHOUT_LINES.map((line, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <span className="shrink-0 w-7 h-7 rounded-full bg-[#1F2429]/10 text-[#1F2429]/70 flex items-center justify-center mt-0.5">
                  <X className="w-4 h-4" />
                </span>
                <p className="text-[17px] sm:text-[19px] leading-[1.6] text-[#1F2429]/80 font-normal">
                  {line}
                </p>
              </div>
            ))}
          </motion.div>

          {/* With Nero list */}
          <motion.div
            initial={false}
            animate={{
              opacity: activeTab === 'with' ? 1 : 0,
              pointerEvents: activeTab === 'with' ? 'auto' : 'none',
            }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.35, ease: 'easeInOut' }}
            className="col-start-1 row-start-1 w-full space-y-6"
          >
            {WITH_LINES.map((line, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <span className="shrink-0 w-7 h-7 rounded-full bg-[#E8A33D]/25 text-[#1F2429] flex items-center justify-center mt-0.5">
                  <Check className="w-4 h-4 text-[#1F2429]" />
                </span>
                <p className="text-[17px] sm:text-[19px] leading-[1.6] text-[#1F2429] font-medium">
                  {line}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
