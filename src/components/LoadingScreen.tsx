import React, { useState, useEffect } from 'react';
import '../styles/LoadingScreen.css';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [displayText, setDisplayText] = useState<string>('');
  const [currentTextIndex, setCurrentTextIndex] = useState<number>(0);
  const [charIndex, setCharIndex] = useState<number>(0);
  const [showLoader, setShowLoader] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);

  const greetingTexts = [
    "Hey there, welcome!",
    "Loading something amazing...",
    "Just a moment please...",
    "Almost ready for you!"
  ];

  // Typewriter effect
  useEffect(() => {
    const currentText = greetingTexts[currentTextIndex];
    
    if (charIndex < currentText.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + currentText[charIndex]);
        setCharIndex(prev => prev + 1);
      }, 80);
      return () => clearTimeout(timer);
    } else {
      // Move to next text after pause
      setTimeout(() => {
        if (currentTextIndex < greetingTexts.length - 1) {
          setDisplayText('');
          setCharIndex(0);
          setCurrentTextIndex(prev => prev + 1);
        } else {
          // All texts completed, finish loading
          setTimeout(() => {
            setShowLoader(false);
            setTimeout(() => {
              onLoadingComplete();
            }, 500);
          }, 1000);
        }
      }, 1500);
    }
  }, [charIndex, currentTextIndex]);

  // Progress bar effect
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 3;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`loading-screen ${!showLoader ? 'fade-out' : ''}`}>
      {/* Background particles */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className={`particle particle-${i}`}></div>
        ))}
      </div>

      <div className="loading-container">
        {/* Animated character/mascot */}
        <div className="mascot">
          <div className="mascot-face">
            <div className="eye left-eye"></div>
            <div className="eye right-eye"></div>
            <div className="mouth"></div>
          </div>
          <div className="mascot-body"></div>
          <div className="wave-hand"></div>
        </div>

        {/* Greeting text with typewriter effect */}
        <div className="greeting-section">
          <h1 className="greeting-text">
            {displayText}
            <span className="cursor">|</span>
          </h1>
        </div>

        {/* Animated loader elements */}
        <div className="loader-section">
          <div className="spinner-container">
            <div className="spinner spinner-1"></div>
            <div className="spinner spinner-2"></div>
            <div className="spinner spinner-3"></div>
          </div>

          {/* Progress bar */}
          <div className="progress-container">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="progress-text">{Math.round(progress)}%</span>
          </div>

          {/* Loading dots */}
          <div className="loading-dots">
            <span>Loading</span>
            <div className="dots">
              <div className="dot dot-1"></div>
              <div className="dot dot-2"></div>
              <div className="dot dot-3"></div>
            </div>
          </div>
        </div>

        {/* Floating icons */}
        <div className="floating-icons">
          <div className="icon icon-1">💫</div>
          <div className="icon icon-2">⚡</div>
          <div className="icon icon-3">🚀</div>
          <div className="icon icon-4">✨</div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
