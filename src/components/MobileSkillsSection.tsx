import React, { useState, useEffect, useRef } from "react";
import "../styles/MobileSkillsSection.css";

// Import your skill icons
import reactIcon from "../icons/tech-icons/react.svg";
import javascriptIcon from "../icons/tech-icons/javascript.svg";
import typescriptIcon from "../icons/tech-icons/typescript.svg";
import html5Icon from "../icons/tech-icons/html5.svg";
import css3Icon from "../icons/tech-icons/css3.svg";
import pythonIcon from "../icons/tech-icons/python.svg";
import gitIcon from "../icons/tech-icons/git.svg";
import nodejsIcon from "../icons/tech-icons/nodejs.svg";
import expressIcon from "../icons/tech-icons/express.svg";
import sqlIcon from "../icons/tech-icons/sql.svg";

// Import social media icons
import linkedinIcon from "../icons/linkedin.png";
import instagramIcon from "../icons/instagram.png";
import facebookIcon from "../icons/facebook.png";

interface Skill {
  icon: string;
  name: string;
  color: string;
  type: "skill";
}

interface SocialApp {
  icon: string;
  name: string;
  color: string;
  type: "social";
  url: string;
}

type AppItem = Skill | SocialApp;

const MobileSkillsSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentScreen, setCurrentScreen] = useState(0);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Define all skills
  const skillsData: Skill[] = [
    { icon: reactIcon, name: "React", color: "#61DAFB", type: "skill" },
    {
      icon: javascriptIcon,
      name: "JavaScript",
      color: "#F7DF1E",
      type: "skill",
    },
    {
      icon: typescriptIcon,
      name: "TypeScript",
      color: "#3178C6",
      type: "skill",
    },
    { icon: html5Icon, name: "HTML5", color: "#E34F26", type: "skill" },
    { icon: css3Icon, name: "CSS3", color: "#1572B6", type: "skill" },
    { icon: nodejsIcon, name: "Node.js", color: "#339933", type: "skill" },
    { icon: expressIcon, name: "Express", color: "#68D391", type: "skill" },
    { icon: pythonIcon, name: "Python", color: "#3776AB", type: "skill" },
    { icon: reactIcon, name: "React Native", color: "#61DAFB", type: "skill" },
    { icon: sqlIcon, name: "SQL", color: "#4479A1", type: "skill" },
    { icon: gitIcon, name: "Git", color: "#F05032", type: "skill" },
  ];

  // Define social apps
  const socialApps: SocialApp[] = [
    {
      icon: linkedinIcon,
      name: "LinkedIn",
      color: "#0A66C2",
      type: "social",
      url: "https://www.linkedin.com/in/ankitsinha62",
    },
    {
      icon: instagramIcon,
      name: "Instagram",
      color: "#E4405F",
      type: "social",
      url: "https://www.instagram.com/viper_blaze/",
    },
    {
      icon: facebookIcon,
      name: "Facebook",
      color: "#1877F2",
      type: "social",
      url: "https://www.facebook.com/profile.php?id=100008067193422",
    },
  ];

  // Combine all apps
  const allApps: AppItem[] = [...skillsData, ...socialApps];

  // Filter apps based on search term
  const filteredApps = searchTerm
    ? allApps.filter((app) =>
        app.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : allApps;

  // Split apps into screens (8 apps per screen)
  const appsPerScreen = 8;
  const screens = [];
  for (let i = 0; i < filteredApps.length; i += appsPerScreen) {
    screens.push(filteredApps.slice(i, i + appsPerScreen));
  }

  const totalScreens = screens.length || 1;

  // Touch handlers for swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentScreen < totalScreens - 1) {
      setCurrentScreen((prev) => prev + 1);
    } else if (isRightSwipe && currentScreen > 0) {
      setCurrentScreen((prev) => prev - 1);
    }
  };

  // Reset to first screen when searching
  useEffect(() => {
    setCurrentScreen(0);
  }, [searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setIsSearchActive(false);
    setCurrentScreen(0);
  };

  const handleAppTap = (app: AppItem) => {
    // Add haptic feedback for touch devices
    if ("vibrate" in navigator) {
      navigator.vibrate(50);
    }

    if (app.type === "social") {
      // Open social media profile
      window.open(app.url, "_blank", "noopener,noreferrer");
    } else {
      // Handle skill tap (you can add more interaction here)
      console.log(`Tapped on ${app.name} skill`);
    }
  };

  const goToScreen = (screenIndex: number) => {
    setCurrentScreen(screenIndex);
  };

  // Debug logging
  console.log("All apps:", allApps.length);
  console.log("Filtered apps:", filteredApps.length);
  console.log("Screens:", screens.length);
  console.log("Current screen:", currentScreen);

  return (
    <section className="mobile-skills-section">
      <div className="mobile-skills-container">
        {/* Header */}
        <div className="skills-header">
          <h2>Skills & Social</h2>
          <p>
            {searchTerm
              ? `${filteredApps.length} ${
                  filteredApps.length === 1 ? "result" : "results"
                }`
              : `${allApps.length} apps`}
          </p>
        </div>

        {/* Search Bar */}
        <div className="search-container">
          <div className={`search-bar ${isSearchActive ? "active" : ""}`}>
            <div className="search-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8" />
                <path d="21 21l-4.35-4.35" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search skills and social..."
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={() => setIsSearchActive(true)}
              onBlur={() => setIsSearchActive(false)}
              className="search-input"
            />
            {searchTerm && (
              <button onClick={clearSearch} className="clear-button">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Apps Container - Show single grid when searching */}
        {searchTerm ? (
          // Single grid view for search results
          <div className="search-results-grid">
            {filteredApps.map((app, index) => (
              <div
                key={`search-${app.name}-${index}`}
                className={`skill-app ${
                  app.type === "social" ? "social-app" : ""
                }`}
                onClick={() => handleAppTap(app)}
                style={
                  {
                    "--skill-color": app.color,
                    "--animation-delay": `${index * 0.05}s`,
                  } as React.CSSProperties
                }
              >
                <div className="app-icon">
                  <img src={app.icon} alt={app.name} />
                  <div className="icon-shine"></div>
                  {app.type === "social" && (
                    <div className="external-indicator">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15,3 21,3 21,9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </div>
                  )}
                </div>
                <span className="app-label">{app.name}</span>
              </div>
            ))}
          </div>
        ) : (
          // Swipeable screens view for normal display
          <div
            className="apps-container"
            ref={containerRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="apps-screens"
              style={{
                transform: `translateX(-${currentScreen * 100}%)`,
              }}
            >
              {screens.map((screenApps, screenIndex) => (
                <div key={screenIndex} className="app-screen">
                  <div className="skills-grid">
                    {screenApps.map((app, index) => (
                      <div
                        key={`screen-${screenIndex}-${app.name}-${index}`}
                        className={`skill-app ${
                          app.type === "social" ? "social-app" : ""
                        }`}
                        onClick={() => handleAppTap(app)}
                        style={
                          {
                            "--skill-color": app.color,
                            "--animation-delay": `${index * 0.08}s`,
                          } as React.CSSProperties
                        }
                      >
                        <div className="app-icon">
                          <img src={app.icon} alt={app.name} />
                          <div className="icon-shine"></div>
                          {app.type === "social" && (
                            <div className="external-indicator">
                              <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                              >
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                <polyline points="15,3 21,3 21,9" />
                                <line x1="10" y1="14" x2="21" y2="3" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <span className="app-label">{app.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredApps.length === 0 && searchTerm && (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <h3>No apps found</h3>
            <p>Try searching for something else</p>
            <button onClick={clearSearch} className="clear-search-btn">
              Clear search
            </button>
          </div>
        )}

        {/* Page Dots - Only show when not searching */}
        {!searchTerm && totalScreens > 1 && (
          <div className="page-indicator">
            {Array.from({ length: totalScreens }, (_, index) => (
              <button
                key={index}
                className={`dot ${currentScreen === index ? "active" : ""}`}
                onClick={() => goToScreen(index)}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Swipe Hint - Only show when not searching */}
        {!searchTerm && totalScreens > 1 && currentScreen === 0 && (
          <div className="swipe-hint">
            <div className="swipe-arrow">←</div>
            <span>Swipe left for more apps</span>
          </div>
        )}
      </div>
    </section>
  );
};

export default MobileSkillsSection;
