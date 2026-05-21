'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';

interface RevealAnimationProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  once?: boolean;
  fill?: boolean;
}

export default function RevealAnimation({
  children,
  delay = 0,
  className,
  once = true,
  fill = false,
}: RevealAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: '-60px 0px' });
  const shouldReduceMotion = useReducedMotion();

  return (
    <div ref={ref} className={[fill ? 'h-full' : '', className].filter(Boolean).join(' ')}>
      <motion.div
        className={fill ? 'h-full' : undefined}
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
        animate={
          inView
            ? { opacity: 1, y: 0 }
            : shouldReduceMotion
              ? { opacity: 0 }
              : { opacity: 0, y: 24 }
        }
        transition={
          shouldReduceMotion
            ? { duration: 0.01, delay: 0 }
            : { duration: 0.75, delay, ease: [0.25, 0.46, 0.45, 0.94] }
        }
      >
        {children}
      </motion.div>
    </div>
  );
}
