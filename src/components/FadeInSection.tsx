
import { ReactNode } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils';

interface FadeInSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
  duration?: number;
}

export default function FadeInSection({
  children,
  className,
  delay = 0,
  direction = 'up',
  duration = 600
}: FadeInSectionProps) {
  const { elementRef, isVisible } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  const directionClasses = {
    up: 'translate-y-8',
    down: '-translate-y-8',
    left: 'translate-x-8',
    right: '-translate-x-8',
    scale: 'scale-95'
  };

  return (
    <div
      ref={elementRef}
      className={cn(
        'transition-all ease-out',
        !isVisible && `opacity-0 ${directionClasses[direction]}`,
        isVisible && 'opacity-100 translate-y-0 translate-x-0 scale-100',
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
}
