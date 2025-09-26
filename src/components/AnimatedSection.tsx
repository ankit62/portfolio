import React, { useRef, ReactNode, useEffect, useState } from 'react';
import '../styles/AnimatedSection.css';

interface AnimatedSectionProps {
  children: ReactNode;
  animationType?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn' | 'slideUp' | 'rotateIn';
  rootMargin?: string;
  className?: string;
  delay?: number;
  threshold?: number;
  id?: string;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  animationType = 'fadeInUp',
  rootMargin = '-100px',
  className = '',
  delay = 0,
  threshold = 0.1,
  id
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            // Apply delay before triggering animation
            setTimeout(() => {
              setIsVisible(true);
              setHasAnimated(true);
            }, delay);
            
            // Disconnect observer after first trigger to prevent re-animation
            observer.unobserve(entry.target);
          }
        });
      },
      { 
        threshold,
        rootMargin: `${rootMargin} 0px -50px 0px` // Enhanced root margin for better trigger control
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
      observer.disconnect();
    };
  }, [delay, threshold, rootMargin, hasAnimated]);

  // Generate class names more reliably
  const getAnimationClasses = () => {
    const baseClasses = ['animated-section', animationType];
    
    if (className) {
      baseClasses.push(className);
    }
    
    if (isVisible && hasAnimated) {
      baseClasses.push('animate');
    }
    
    return baseClasses.join(' ');
  };

  return (
    <div
      ref={ref}
      id={id}
      className={getAnimationClasses()}
      style={{ 
        animationDelay: isVisible ? '0ms' : `${delay}ms`,
        transitionDelay: isVisible ? '0ms' : `${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
