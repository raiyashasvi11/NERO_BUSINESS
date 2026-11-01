import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Plus } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: 'Who is this for?',
    answer: 'It is for business owens in Chennai who want every enquiry and repair in one place.',
  },
  {
    question: 'What exactly do you set up?',
    answer:
      'I build a simple form and a plain list that shows every enquiry and repair in one place, then hand it over for a one time setup fee and a small monthly fee to keep it running.',
  },
  {
    question: 'How long does setup take?',
    answer: 'The setup timeline is agreed during our 20 minute call based on what your business needs.',
  },
  {
    question: 'What does it cost?',
    answer: 'Rs 15,000 setup + Rs 3,000 a month.',
  },
  {
    question: 'How do we start?',
    answer: 'Book a 20 minute call with me or message me on WhatsApp.',
  },
];

export const QuestionsSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 sm:py-28 md:py-36 px-5 sm:px-8 max-w-4xl mx-auto bg-[#F6F1E7]">
      <div className="mb-12">
        <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#1F2429]/60">
          Clear answers
        </span>
        <h2 className="font-serif text-4xl sm:text-6xl text-[#1F2429] mt-2 tracking-tight">
          Questions
        </h2>
      </div>

      <div className="border-t border-[rgba(31,36,41,0.12)]">
        {FAQS.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="border-b border-[rgba(31,36,41,0.12)] transition-colors"
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full py-6 sm:py-8 flex items-center justify-between gap-6 text-left cursor-pointer group"
                aria-expanded={isOpen}
              >
                <span className="font-serif text-2xl sm:text-[28px] text-[#1F2429] font-medium leading-snug group-hover:text-[#E8A33D] transition-colors">
                  {item.question}
                </span>

                <motion.div
                  animate={
                    shouldReduceMotion
                      ? {}
                      : { rotate: isOpen ? 45 : 0 }
                  }
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="shrink-0 w-8 h-8 rounded-full border border-[rgba(31,36,41,0.18)] flex items-center justify-center text-[#1F2429]"
                >
                  <Plus className="w-5 h-5 stroke-[1.75]" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={
                      shouldReduceMotion
                        ? false
                        : { height: 0, opacity: 0 }
                    }
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 sm:pb-8 text-[17px] sm:text-[18px] leading-[1.65] text-[#1F2429]/80 max-w-[68ch]">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
};
