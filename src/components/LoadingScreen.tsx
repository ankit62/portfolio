import React, { useState, useEffect, useRef } from 'react';
import '../styles/LoadingScreen.css';

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const particlesBgRef = useRef<HTMLCanvasElement>(null);
  const particlesFgRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const duration = 3000; // 3 seconds
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = Math.min(prev + 2, 100);
        return newProgress;
      });
    }, duration / 50);

    const timer = setTimeout(() => {
      clearInterval(interval);
      setIsVisible(false);
      setTimeout(() => onLoadingComplete?.(), 300);
    }, duration);

    // Initialize particle systems
    if (particlesBgRef.current && particlesFgRef.current) {
      initParticles(particlesBgRef.current, {
        dotColor: 'rgba(255, 255, 255, 0.5)',
        lineColor: 'rgba(255, 255, 255, 0.05)',
        particleCount: 30,
        speed: 0.5
      });
      
      initParticles(particlesFgRef.current, {
        dotColor: 'rgba(255, 255, 255, 1)',
        lineColor: 'rgba(255, 255, 255, 0.1)',
        particleCount: 50,
        speed: 1
      });
    }

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onLoadingComplete]);

  const initParticles = (canvas: HTMLCanvasElement, config: any) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: any[] = [];

    // Create particles
    for (let i = 0; i < config.particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * config.speed,
        vy: (Math.random() - 0.5) * config.speed,
        radius: Math.random() * 3 + 1
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw particles and connections
      particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x <= 0 || particle.x >= canvas.width) particle.vx *= -1;
        if (particle.y <= 0 || particle.y >= canvas.height) particle.vy *= -1;

        // Draw particle
        ctx.fillStyle = config.dotColor;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();

        // Draw connections to nearby particles
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.strokeStyle = config.lineColor;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();
  };

  if (!isVisible) return null;

  return (
    <div className="prism-loading-screen">
      {/* Particle Background */}
      <canvas
        ref={particlesBgRef}
        className="particles-background"
      />
      <canvas
        ref={particlesFgRef}
        className="particles-foreground"
      />

      {/* Loading Content */}
      <div className="vertical-centered-box">
        <div className="content">
          <div className="loader-circle"></div>
          <div className="loader-line-mask">
            <div className="loader-line"></div>
          </div>
          <div className="loading-text">LOADING</div>
          <div className="progress-counter">{progress}%</div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
