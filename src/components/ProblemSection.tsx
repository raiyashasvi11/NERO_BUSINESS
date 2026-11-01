import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';

const sentence =
  'You finish work for the day, sit down with your family, and spend the evening answering the same enquiry questions and checking repair notes across messages and notebooks.';

interface WordProps {
  word: string;
  index: number;
  total: number;
  progress: any;
  shouldReduceMotion: boolean | null;
}

const Word: React.FC<WordProps> = ({
  word,
  index,
  total,
  progress,
  shouldReduceMotion,
}) => {
  const start = index / total;
  const end = Math.min(1, start + 1.2 / total);
  const opacity = useTransform(progress, [start, end], [0.22, 1]);
  const color = useTransform(
    progress,
    [start, end],
    ['rgba(246, 241, 231, 0.22)', 'rgba(246, 241, 231, 1)']
  );

  if (shouldReduceMotion) {
    return <span className="inline-block text-[#F6F1E7] mr-[0.28em]">{word}</span>;
  }

  return (
    <motion.span
      style={{ opacity, color }}
      className="inline-block mr-[0.28em] transition-colors duration-75"
    >
      {word}
    </motion.span>
  );
};

export const ProblemSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.35'],
  });

  const words = sentence.split(' ');

  return (
    <section
      id="problem"
      ref={containerRef}
      data-theme="ink"
      className="relative w-full bg-[#1F2429] text-[#F6F1E7] film-grain py-20 sm:py-28 md:py-36 px-5 sm:px-8 border-y border-[rgba(246,241,231,0.08)]"
    >
      <div className="relative z-10 max-w-5xl mx-auto">
        <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#E8A33D] mb-8">
          The problem today
        </p>
        <p className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.12] tracking-tight">
          {words.map((w, i) => (
            <Word
              key={i}
              word={w}
              index={i}
              total={words.length}
              progress={scrollYProgress}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </p>
      </div>
    </section>
  );
};
