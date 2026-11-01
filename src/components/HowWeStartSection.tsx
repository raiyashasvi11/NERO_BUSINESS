import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';

interface Step {
  num: string;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    num: '01',
    title: 'A 20 minute call',
    description: 'We talk through how your business handles enquiries and repairs today.',
  },
  {
    num: '02',
    title: 'A plan for your business',
    description: 'I map out the simple form and the plain list tailored for your workflow.',
  },
  {
    num: '03',
    title: 'I set it up and show your team',
    description: 'I build everything, hand it over to you, and walk through how to use it.',
  },
];

export const HowWeStartSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.7', 'end 0.6'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      id="how-we-start"
      ref={containerRef}
      className="py-20 sm:py-28 md:py-36 px-5 sm:px-8 max-w-4xl mx-auto bg-[#F6F1E7]"
    >
      <div className="text-center mb-16">
        <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#1F2429]/60">
          The process
        </span>
        <h2 className="font-serif text-4xl sm:text-6xl text-[#1F2429] mt-2 tracking-tight">
          How we start
        </h2>
      </div>

      <div className="relative pl-8 sm:pl-12">
        {/* Vertical line track */}
        <div className="absolute left-3.5 sm:left-5 top-4 bottom-4 w-[2px] bg-[rgba(31,36,41,0.12)]">
          {/* Animated fill line with accent amber */}
          <motion.div
            style={shouldReduceMotion ? { height: '100%' } : { height: lineHeight }}
            className="w-full bg-[#E8A33D] origin-top"
          />
        </div>

        {/* Steps */}
        <div className="space-y-16 sm:space-y-20">
          {STEPS.map((step, idx) => (
            <div key={idx} className="relative flex items-start gap-6 sm:gap-8">
              {/* Step indicator node on line */}
              <div className="absolute -left-8 sm:-left-12 top-1.5 w-7 sm:w-10 h-7 sm:h-10 rounded-full bg-[#F6F1E7] border-2 border-[#1F2429] flex items-center justify-center z-10">
                <span className="font-serif text-xs sm:text-sm font-semibold text-[#1F2429]">
                  {step.num}
                </span>
              </div>

              {/* Step content */}
              <div className="pt-1">
                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#1F2429] mb-2">
                  {step.title}
                </h3>
                <p className="text-[17px] sm:text-[18px] leading-[1.6] text-[#1F2429]/80 max-w-[68ch]">
                  {step.description}
                </p>

                {/* Price line sits under step 3 */}
                {idx === 2 && (
                  <div className="mt-8 pt-6 border-t border-[rgba(31,36,41,0.12)]">
                    <p className="text-xs font-semibold tracking-widest uppercase text-[#1F2429]/60 mb-1">
                      Price
                    </p>
                    <p className="font-serif text-2xl sm:text-3xl text-[#1F2429] font-medium">
                      Rs 15,000 setup + Rs 3,000 a month
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
