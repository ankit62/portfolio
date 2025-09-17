import React, { useRef, ReactNode } from 'react';
import useOnScreen from '../hooks/useOnScreen';
import '../styles/AnimatedSection.css';

interface AnimatedSectionProps {
  children: ReactNode;
  animationType?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn' | 'slideUp' | 'rotateIn';
  rootMargin?: string;
  className?: string;
  delay?: number;
  threshold?: number;
  id?: string;  // Add ID prop
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  animationType = 'fadeInUp',
  rootMargin = '-100px',
  className = '',
  delay = 0,
  threshold = 0.1,
  id  // Add ID prop
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref, rootMargin);

  return (
    <div
      ref={ref}
      id={id}  // Add ID to div
      className={`animated-section ${animationType} ${isVisible ? 'animate' : ''} ${className}`}
      style={{ 
        animationDelay: `${delay}ms`,
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
