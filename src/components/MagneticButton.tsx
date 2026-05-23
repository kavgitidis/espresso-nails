import { useRef, useState, MouseEvent, ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface MagneticButtonProps extends HTMLMotionProps<"button"> {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

export function MagneticButton({ children, className, intensity = 40, ...props }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX / (width / intensity), y: middleY / (height / intensity) });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className={twMerge(
        clsx(
          "relative overflow-hidden",
          className
        )
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
