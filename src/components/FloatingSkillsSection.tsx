import React, { useState, useRef, useEffect } from 'react';
import AnimatedSection from './AnimatedSection';
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
import '../styles/FloatingSkillsSection.css';

interface Skill {
  icon: string;
  name: string;
  color: string;
}

interface Position {
  x: number;
  y: number;
}

interface SkillItem extends Skill {
  id: number;
  position: Position;
  isDragging: boolean;
  velocity: Position;
}

const FloatingSkillsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [skills, setSkills] = useState<SkillItem[]>([]);
  const [draggedSkill, setDraggedSkill] = useState<number | null>(null);
  const [draggedRocket, setDraggedRocket] = useState<string | null>(null);
  const [rocketWarning, setRocketWarning] = useState<boolean>(false);
  const [ufoWarning, setUfoWarning] = useState<boolean>(false);
  const [earthWarning, setEarthWarning] = useState<boolean>(false);
  const [rocketFrozen, setRocketFrozen] = useState<boolean>(false);
  const [currentWarningMessage, setCurrentWarningMessage] = useState<string>('');
  const [currentUfoMessage, setCurrentUfoMessage] = useState<string>('');
  const [currentEarthMessage, setCurrentEarthMessage] = useState<string>('');

  const skillsData: Skill[] = [
    { icon: reactIcon, name: "React JS", color: "#61DAFB" },
    { icon: javascriptIcon, name: "Javascript (ES6)", color: "#F7DF1E" },
    { icon: typescriptIcon, name: "Typescript", color: "#3178C6" },
    { icon: html5Icon, name: "HTML5", color: "#E34F26" },
    { icon: css3Icon, name: "CSS3", color: "#1572B6" },
    { icon: pythonIcon, name: "Python", color: "#3776AB" },
    { icon: gitIcon, name: "Git", color: "#F05032" },
    { icon: reactIcon, name: "React Native", color: "#61DAFB" },
    { icon: nodejsIcon, name: "Node.js", color: "#339933" },
    { icon: expressIcon, name: "Express", color: "#000000" },
    { icon: sqlIcon, name: "SQL", color: "#4479A1" },
  ];

  const rocketWarningMessages = [
    "⚠️ ABORT! DON'T INTERRUPT ONGOING MISSION",
    "🚫 WARNING: TRAJECTORY INTERFERENCE DETECTED",
    "⛔ MISSION CRITICAL: RELEASE SPACECRAFT NOW",
    "🔴 ALERT: UNAUTHORIZED FLIGHT PATH ALTERATION",
    "🚨 CAUTION: SPACE TRAFFIC CONTROL VIOLATION",
    "⚡ DANGER: PROPULSION SYSTEM COMPROMISED",
    "🛑 STOP: ORBITAL MECHANICS DISRUPTED",
  ];

  const ufoWarningMessages = [
    "👽 ALIEN TRANSMISSION: RELEASE OUR SCOUT VESSEL IMMEDIATELY",
    "🛸 WARNING: UNAUTHORIZED CONTACT WITH EXTRATERRESTRIAL CRAFT",
    "⚡ ALIEN THREAT: YOUR SPECIES WILL FACE CONSEQUENCES",
    "🌌 TRANSMISSION DETECTED: WE ARE NOT ALONE - UNHAND OUR SHIP",
    "👾 GALACTIC COMMAND: INTERFERENCE WITH UFO WILL RESULT IN ABDUCTION",
    "🔮 PSYCHIC MESSAGE: YOUR MIND WILL BE PROBED IF YOU CONTINUE",
    "🌠 ALIEN WARNING: PREPARE FOR IMMEDIATE TELEPORTATION TO MOTHERSHIP",
    "⭐ INTERGALACTIC LAW: TOUCHING UFO VIOLATES TREATY OF ZETA RETICULI",
    "🚀 UNKNOWN SPECIES ALERT: RELEASE OR FACE PLANETARY INVASION",
    "👽 TELEPATHIC THREAT: WE HAVE BEEN WATCHING YOU... LET GO NOW",
    "🛸 AREA 51 CLASSIFIED: UFO RETRIEVAL TEAM EN ROUTE TO YOUR LOCATION",
    "⚠️ ALIEN PROTOCOL: HUMAN INTERFERENCE TRIGGERS DEFENSE SYSTEMS",
    "🌌 COSMIC WARNING: YOUR PRIMITIVE HANDS CONTAMINATE OUR TECHNOLOGY",
    "👾 EXTRATERRESTRIAL DEMAND: RELEASE UFO OR FACE MIND CONTROL",
    "🔮 ALIEN ULTIMATUM: 10 SECONDS TO COMPLY OR BE VAPORIZED"
  ];

  const earthWarningMessages = [
    "🌍 CATASTROPHIC WARNING: PLANETARY DISPLACEMENT DETECTED",
    "⚠️ ALERT: MOVING EARTH WILL DESTROY ALL LIFE",
    "🚨 DANGER: GRAVITATIONAL FIELD DISRUPTION IMMINENT",
    "💀 CRITICAL: 8 BILLION LIVES AT STAKE",
    "☄️ WARNING: ASTEROID BELT COLLISION INEVITABLE",
    "🌊 ALERT: TIDAL FORCES WILL OBLITERATE OCEANS",
    "🔥 DANGER: SOLAR DISTANCE CHANGE = EXTINCTION",
    "❄️ WARNING: ICE AGE OR GLOBAL BURNING AHEAD",
  ];

  // Generate random positions across the entire space
  const generateRandomPosition = (existingPositions: Position[]): Position => {
    const skillSize = 80;
    const padding = 100;
    let attempts = 0;
    let position: Position;

    do {
      position = {
        x: Math.random() * (window.innerWidth - skillSize - padding * 2) + padding,
        y: Math.random() * 400 + 150,
      };
      attempts++;
    } while (
      attempts < 50 &&
      existingPositions.some(
        (pos) =>
          Math.sqrt(Math.pow(pos.x - position.x, 2) + Math.pow(pos.y - position.y, 2)) < skillSize + 40
      )
    );

    return position;
  };

  // Generate stars dynamically
  const generateStars = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 0.5,
      opacity: Math.random() * 0.8 + 0.2,
      animationDelay: Math.random() * 3,
    }));
  };

  const [stars] = useState(generateStars(200));

  // Initialize skills positions
  useEffect(() => {
    const initialSkills: SkillItem[] = [];
    
    skillsData.forEach((skill, index) => {
      const position = generateRandomPosition(initialSkills.map(s => s.position));
      
      initialSkills.push({
        ...skill,
        id: index,
        position,
        isDragging: false,
        velocity: { 
          x: (Math.random() - 0.5) * 0.5, 
          y: (Math.random() - 0.5) * 0.5 
        },
      });
    });
    
    setSkills(initialSkills);
  }, []);

  // Rocket warning message rotation
  useEffect(() => {
    let warningInterval: NodeJS.Timeout;
    
    if (rocketWarning) {
      setCurrentWarningMessage(rocketWarningMessages[0]);
      
      warningInterval = setInterval(() => {
        setCurrentWarningMessage(prev => {
          const currentIndex = rocketWarningMessages.indexOf(prev);
          const nextIndex = (currentIndex + 1) % rocketWarningMessages.length;
          return rocketWarningMessages[nextIndex];
        });
      }, 2500);
    }

    return () => {
      if (warningInterval) {
        clearInterval(warningInterval);
      }
    };
  }, [rocketWarning]);

  // UFO warning message rotation
  useEffect(() => {
    let ufoWarningInterval: NodeJS.Timeout;
    
    if (ufoWarning) {
      setCurrentUfoMessage(ufoWarningMessages[0]);
      
      ufoWarningInterval = setInterval(() => {
        setCurrentUfoMessage(prev => {
          const currentIndex = ufoWarningMessages.indexOf(prev);
          const nextIndex = (currentIndex + 1) % ufoWarningMessages.length;
          return ufoWarningMessages[nextIndex];
        });
      }, 2500);
    }

    return () => {
      if (ufoWarningInterval) {
        clearInterval(ufoWarningInterval);
      }
    };
  }, [ufoWarning]);

  // Earth warning message rotation
  useEffect(() => {
    let earthWarningInterval: NodeJS.Timeout;
    
    if (earthWarning) {
      setCurrentEarthMessage(earthWarningMessages[0]);
      
      earthWarningInterval = setInterval(() => {
        setCurrentEarthMessage(prev => {
          const currentIndex = earthWarningMessages.indexOf(prev);
          const nextIndex = (currentIndex + 1) % earthWarningMessages.length;
          return earthWarningMessages[nextIndex];
        });
      }, 2500);
    }

    return () => {
      if (earthWarningInterval) {
        clearInterval(earthWarningInterval);
      }
    };
  }, [earthWarning]);

  // Physics simulation
  useEffect(() => {
    const interval = setInterval(() => {
      if (draggedSkill === null) {
        setSkills(prevSkills =>
          prevSkills.map(skill => {
            let newX = skill.position.x + skill.velocity.x;
            let newY = skill.position.y + skill.velocity.y;
            let newVelX = skill.velocity.x;
            let newVelY = skill.velocity.y;

            if (newX <= 40 || newX >= window.innerWidth - 120) {
              newVelX = -newVelX * 0.8;
              newX = Math.max(40, Math.min(newX, window.innerWidth - 120));
            }
            
            if (newY <= 120 || newY >= 520) {
              newVelY = -newVelY * 0.8;
              newY = Math.max(120, Math.min(newY, 520));
            }

            newVelX *= 0.99;
            newVelY *= 0.99;

            return {
              ...skill,
              position: { x: newX, y: newY },
              velocity: { x: newVelX, y: newVelY },
            };
          })
        );
      }
    }, 16);

    return () => clearInterval(interval);
  }, [draggedSkill]);

  // Collision and scatter logic
  const scatterSkills = (centerPos: Position, excludeId: number) => {
    setSkills(prevSkills =>
      prevSkills.map(skill => {
        if (skill.id === excludeId) return skill;
        
        const distance = Math.sqrt(
          Math.pow(skill.position.x - centerPos.x, 2) + 
          Math.pow(skill.position.y - centerPos.y, 2)
        );
        
        if (distance < 100) {
          const angle = Math.atan2(
            skill.position.y - centerPos.y,
            skill.position.x - centerPos.x
          );
          
          const force = 4;
          return {
            ...skill,
            velocity: {
              x: Math.cos(angle) * force,
              y: Math.sin(angle) * force,
            },
          };
        }
        
        return skill;
      })
    );
  };

  // Handle rocket interaction
  const handleRocketMouseDown = (e: React.MouseEvent, rocketId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDraggedRocket(rocketId);
    
    if (rocketId === 'rocket-1') {
      setRocketWarning(true);
    } else if (rocketId === 'rocket-2') {
      setUfoWarning(true);
    }
    
    setRocketFrozen(true);
  };

  const handleRocketMouseUp = () => {
    setDraggedRocket(null);
    setRocketWarning(false);
    setUfoWarning(false);
    setRocketFrozen(false);
    setCurrentWarningMessage('');
    setCurrentUfoMessage('');
  };

  // Handle Earth planet interaction
  const handleEarthMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setEarthWarning(true);
  };

  const handleEarthMouseUp = () => {
    setEarthWarning(false);
    setCurrentEarthMessage('');
  };

  const handleMouseDown = (e: React.MouseEvent, skillId: number) => {
    e.preventDefault();
    setDraggedSkill(skillId);
    setSkills(prev =>
      prev.map(skill =>
        skill.id === skillId 
          ? { ...skill, isDragging: true, velocity: { x: 0, y: 0 } } 
          : skill
      )
    );
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggedSkill !== null) {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      const newPos = {
        x: e.clientX - rect.left - 40,
        y: e.clientY - rect.top - 40,
      };
      
      setSkills(prev =>
        prev.map(skill => {
          if (skill.id === draggedSkill) {
            scatterSkills(newPos, draggedSkill);
            return { ...skill, position: newPos };
          }
          return skill;
        })
      );
    }
  };

  const handleMouseUp = () => {
    setDraggedSkill(null);
    setSkills(prev =>
      prev.map(skill => ({ 
        ...skill, 
        isDragging: false,
        velocity: skill.isDragging 
          ? { x: (Math.random() - 0.5) * 2, y: (Math.random() - 0.5) * 2 }
          : skill.velocity
      }))
    );
    
    handleRocketMouseUp();
    handleEarthMouseUp();
  };

  return (
    <AnimatedSection
      animationType="fadeInLeft"
      className="skills-section space-skills"
      delay={200}
    >
      <h2>Technical Skills</h2>
      <p className="skills-subtitle">🪐 Drag the tech planets around the galaxy! 🌟</p>
      
      {/* Rocket Warning Display */}
      {rocketWarning && (
        <div className="rocket-warning">
          <div className="warning-console rocket-console">
            <div className="warning-header">⚠️ SPACE MISSION CONTROL ⚠️</div>
            <div className="warning-text">
              {currentWarningMessage}
            </div>
            <div className="warning-footer">RELEASE TO CONTINUE MISSION</div>
          </div>
        </div>
      )}

      {/* UFO Warning Display */}
      {ufoWarning && (
        <div className="ufo-warning">
          <div className="warning-console ufo-console">
            <div className="warning-header">👽 ALIEN TRANSMISSION DETECTED 👽</div>
            <div className="warning-text">
              {currentUfoMessage}
            </div>
            <div className="warning-footer">COMPLY OR FACE ABDUCTION!</div>
          </div>
        </div>
      )}

      {/* Earth Warning Display */}
      {earthWarning && (
        <div className="earth-warning">
          <div className="warning-console earth-console">
            <div className="warning-header">🌍 PLANETARY PROTECTION AGENCY 🌍</div>
            <div className="warning-text">
              {currentEarthMessage}
            </div>
            <div className="warning-footer">RELEASE EARTH IMMEDIATELY!</div>
          </div>
        </div>
      )}
      
      <div
        ref={containerRef}
        className="space-container"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Enhanced Space Background Elements */}
        <div className="space-elements">
          {/* Enhanced Stars */}
          {stars.map((star) => (
            <div
              key={`star-${star.id}`}
              className="star"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: star.opacity,
                animationDelay: `${star.animationDelay}s`,
              }}
            ></div>
          ))}
          
          {/* Enhanced Rockets with proper event handling */}
          <div 
            className={`rocket rocket-1 ${rocketFrozen && draggedRocket === 'rocket-1' ? 'frozen' : ''}`}
            onMouseDown={(e) => handleRocketMouseDown(e, 'rocket-1')}
            style={{ pointerEvents: 'auto' }}
          >
            🚀
          </div>
          <div 
            className={`rocket rocket-2 ${rocketFrozen && draggedRocket === 'rocket-2' ? 'frozen' : ''}`}
            onMouseDown={(e) => handleRocketMouseDown(e, 'rocket-2')}
            style={{ pointerEvents: 'auto' }}
          >
            🛸
          </div>
          
          {/* Asteroids */}
          <div className="asteroid asteroid-1">☄️</div>
          <div className="asteroid asteroid-2">🪨</div>
          <div className="asteroid asteroid-3">💫</div>
          
          {/* Planets - Earth is special */}
          <div className="planet planet-1">🪐</div>
          <div 
            className={`planet planet-2 earth-planet ${earthWarning ? 'earth-danger' : ''}`}
            onMouseDown={handleEarthMouseDown}
            style={{ pointerEvents: 'auto', cursor: 'grab' }}
          >
            🌍
          </div>
          <div className="planet planet-3">🌙</div>
          
          {/* Enhanced Nebula effects */}
          <div className="nebula nebula-1"></div>
          <div className="nebula nebula-2"></div>
          <div className="nebula nebula-3"></div>
          <div className="nebula nebula-4"></div>
        </div>

        {/* Planet-like Floating Skills */}
        {skills.map((skill) => (
          <div
            key={skill.id}
            className={`floating-skill ${skill.isDragging ? 'dragging' : ''}`}
            style={{
              '--skill-color': skill.color,
              transform: `translate(${skill.position.x}px, ${skill.position.y}px)`,
            } as React.CSSProperties}
            onMouseDown={(e) => handleMouseDown(e, skill.id)}
          >
            <div className="skill-planet">
              <div className="planet-surface">
                <div className="planet-core">
                  <img src={skill.icon} alt={skill.name} className="skill-icon" />
                </div>
                <div className="planet-atmosphere"></div>
                <div className="planet-rings"></div>
                <div className="planet-shadow"></div>
              </div>
            </div>
            
            <div className="skill-tooltip">
              {skill.name}
            </div>
          </div>
        ))}
      </div>
    </AnimatedSection>
  );
};

export default FloatingSkillsSection;

