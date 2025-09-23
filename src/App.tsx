import React, { FormEvent, useState, useRef } from "react";
import Navbar from "./components/Navbar";
import AnimatedSection from "./components/AnimatedSection";
import emailjs from "@emailjs/browser";
import { Alert, Snackbar, CircularProgress } from "@mui/material";
import image from "./icons/image.png";
import facebook from "./icons/facebook.png";
import instagram from "./icons/instagram.png";
import linkedin from "./icons/linkedin.png";
import { useVisibilityAnimation } from "./hooks/useVisibilityAnimation";
import reactIcon from "./icons/tech-icons/react.svg";
import javascriptIcon from "./icons/tech-icons/javascript.svg";
import typescriptIcon from "./icons/tech-icons/typescript.svg";
import html5Icon from "./icons/tech-icons/html5.svg";
import css3Icon from "./icons/tech-icons/css3.svg";
import pythonIcon from "./icons/tech-icons/python.svg";
import gitIcon from "./icons/tech-icons/git.svg";
import nodejsIcon from "./icons/tech-icons/nodejs.svg";
import expressIcon from "./icons/tech-icons/express.svg";
import sqlIcon from "./icons/tech-icons/sql.svg";
import "./App.css";

const App: React.FC = () => {
  // Email states
  const [isLoading, setIsLoading] = useState(false);
  const [alertState, setAlertState] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  // Create refs for each experience item
  const seniorEngRef = useVisibilityAnimation();
  const softwareEngRef = useVisibilityAnimation();
  const softwareAnalystRef = useVisibilityAnimation();
  const programmerAnalystRef = useVisibilityAnimation();

  // State to track which cards are expanded
  const [expandedCards, setExpandedCards] = React.useState<{
    [key: string]: boolean;
  }>({});

  // Function to toggle card expansion
  const toggleCard = (cardId: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  const contactHandler = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="app">
      {/* Navigation Bar */}
      <Navbar />

      {/* Hero Section */}
      <AnimatedSection
        animationType="fadeInUp"
        className="hero-section"
        delay={0}
        id="home"
      >
        <h1>Welcome to My Portfolio</h1>
        <p>
          I'm a developer passionate about creating amazing experiences with
          modern web technologies
        </p>
        <button onClick={contactHandler}>Get In Touch</button>
      </AnimatedSection>

      {/* About Section */}
      <AnimatedSection
        animationType="fadeInLeft"
        className="about-section"
        delay={100}
        id="about"
      >
        <div className="about-container">
          <div className="about-content">
            <h2>Ankit Sinha</h2>
            <p className="about-subtitle">React web developer</p>
            <p className="about-description">
              A passionate individual who always thrives to work on end to end
              products which develop sustainable and scalable social and
              technical systems to create impact.
            </p>

            {/* Social Links */}
            <div className="social-links">
              <a
                className="social-link"
                href="https://www.linkedin.com/in/ankitsinha62"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={linkedin} alt="linkedin" height={45} width={45} />
              </a>
              <a
                className="social-link"
                href="https://www.facebook.com/profile.php?id=100008067193422"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={facebook} alt="facebook" height={45} width={45} />
              </a>
              <a
                className="social-link"
                href="https://www.instagram.com/viper_blaze/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={instagram} alt="instagram" height={45} width={45} />
              </a>
            </div>
          </div>

          <div className="about-illustration">
            <img
              className="animated-image"
              src={image}
              alt="about"
              height={600}
              width={600}
            />
          </div>
        </div>
      </AnimatedSection>

      {/* Skills Section */}
      <AnimatedSection
        animationType="fadeInRight"
        className="skills-section"
        delay={200}
      >
        <h2>Technical Skills</h2>
        <div className="skills-grid">
          <div className="skill-item">
            <img src={reactIcon} alt="React" className="skill-icon" />
            <span>React JS</span>
          </div>
          <div className="skill-item">
            <img src={javascriptIcon} alt="JavaScript" className="skill-icon" />
            <span>Javascript (ES6)</span>
          </div>
          <div className="skill-item">
            <img src={typescriptIcon} alt="TypeScript" className="skill-icon" />
            <span>Typescript</span>
          </div>
          <div className="skill-item">
            <div className="combined-icons">
              <img src={html5Icon} alt="HTML5" className="skill-icon" />
              <img src={css3Icon} alt="CSS3" className="skill-icon" />
            </div>
            <span>HTML5 & CSS3</span>
          </div>
          <div className="skill-item">
            <img src={pythonIcon} alt="Python" className="skill-icon" />
            <span>Python</span>
          </div>
          <div className="skill-item">
            <img src={gitIcon} alt="Git" className="skill-icon" />
            <span>Git</span>
          </div>
          <div className="skill-item">
            <img src={reactIcon} alt="React Native" className="skill-icon" />
            <span>React Native</span>
          </div>
          <div className="skill-item">
            <div className="combined-icons">
              <img src={nodejsIcon} alt="Node.js" className="skill-icon" />
              <img src={expressIcon} alt="Express" className="skill-icon" />
            </div>
            <span>Node.js & Express</span>
          </div>
          <div className="skill-item">
            <img src={sqlIcon} alt="SQL" className="skill-icon" />
            <span>SQL</span>
          </div>
        </div>
      </AnimatedSection>

      {/* Experience Section */}
      <AnimatedSection
        animationType="scaleIn"
        className="experience-section"
        delay={300}
      >
        <div className="experience-section-content">
          <div className="section-header">
            <h2>Work Experience</h2>
            <p className="section-subtitle">
              Building impactful solutions across diverse tech stacks
            </p>
          </div>

          <div className="experience-timeline">
            {/* Senior Software Engineer */}
            <div className="experience-item" ref={seniorEngRef}>
              <div className="timeline-marker"></div>
              <div className="experience-content">
                <div className="experience-header">
                  <div className="position-info">
                    <h3 className="position-title">Senior Software Engineer</h3>
                    <h4 className="company-name">Axtria</h4>
                    <div className="meta-info">
                      <span className="duration">01/2024 - Current</span>
                      <span className="separator">•</span>
                      <span className="location">Bengaluru, India</span>
                    </div>
                  </div>
                  <button
                    className="toggle-button"
                    onClick={() => toggleCard("senior-eng")}
                    aria-label={
                      expandedCards["senior-eng"]
                        ? "Collapse details"
                        : "Expand details"
                    }
                  >
                    {expandedCards["senior-eng"] ? "−" : "+"}
                  </button>
                </div>

                <div className="experience-description">
                  {expandedCards["senior-eng"] && (
                    <div className="achievements">
                      <div className="achievement-item">
                        <span>
                          Designed and built from scratch an admin web
                          application using React MVC for the unified
                          representative experience mobile application,
                          collaborating closely with the mobile application team
                        </span>
                      </div>
                      <div className="achievement-item">
                        <span>
                          Responsible for developing responsive pages/features,
                          with routine integration of REST APIs from backend
                          services
                        </span>
                      </div>
                      <div className="achievement-item">
                        <span>
                          Enhanced software functionality by identifying and
                          resolving complex technical issues
                        </span>
                      </div>
                      <div className="achievement-item">
                        <span>
                          Maintained test coverage of 90%+ throughout
                          development using Vitest and React Testing Library for
                          unit and integration testing
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="tech-stack">
                    <span className="tech-tag">React</span>
                    <span className="tech-tag">TypeScript</span>
                    <span className="tech-tag">Vitest</span>
                    <span className="tech-tag">REST APIs</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Software Engineer */}
            <div className="experience-item" ref={softwareEngRef}>
              <div className="timeline-marker"></div>
              <div className="experience-content">
                <div className="experience-header">
                  <div className="position-info">
                    <h3 className="position-title">Software Engineer</h3>
                    <h4 className="company-name">Axtria</h4>
                    <div className="meta-info">
                      <span className="duration">04/2023 - 12/2023</span>
                      <span className="separator">•</span>
                      <span className="location">Bengaluru, India</span>
                    </div>
                  </div>
                  <button
                    className="toggle-button"
                    onClick={() => toggleCard("software-eng")}
                    aria-label={
                      expandedCards["software-eng"]
                        ? "Collapse details"
                        : "Expand details"
                    }
                  >
                    {expandedCards["software-eng"] ? "−" : "+"}
                  </button>
                </div>

                <div className="experience-description">
                  {expandedCards["software-eng"] && (
                    <div className="achievements">
                      <div className="achievement-item">
                        <span>
                          Continued working on the Field Intelligence web
                          application as a frontend developer to build more
                          modules and scale the application based on client
                          requests
                        </span>
                      </div>
                      <div className="achievement-item">
                        <span>
                          Implemented multilingual capability, enabling the site
                          to support multiple languages and enhancing
                          accessibility for a broader user base
                        </span>
                      </div>
                      <div className="achievement-item">
                        <span>
                          Contributed to backend development by designing and
                          implementing API services in Python for frontend
                          features and the custom analytics module
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="tech-stack">
                    <span className="tech-tag">React</span>
                    <span className="tech-tag">Python</span>
                    <span className="tech-tag">SQL</span>
                    <span className="tech-tag">API Development</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Software Analyst */}
            <div className="experience-item" ref={softwareAnalystRef}>
              <div className="timeline-marker"></div>
              <div className="experience-content">
                <div className="experience-header">
                  <div className="position-info">
                    <h3 className="position-title">Software Analyst</h3>
                    <h4 className="company-name">Axtria</h4>
                    <div className="meta-info">
                      <span className="duration">06/2022 - 03/2023</span>
                      <span className="separator">•</span>
                      <span className="location">Bengaluru, India</span>
                    </div>
                  </div>
                  <button
                    className="toggle-button"
                    onClick={() => toggleCard("software-analyst")}
                    aria-label={
                      expandedCards["software-analyst"]
                        ? "Collapse details"
                        : "Expand details"
                    }
                  >
                    {expandedCards["software-analyst"] ? "−" : "+"}
                  </button>
                </div>

                <div className="experience-description">
                  {expandedCards["software-analyst"] && (
                    <div className="achievements">
                      <div className="achievement-item">
                        <span>
                          Contributed as part of the product development team,
                          working on a multi-tenant React + Webpack web
                          application that delivers data insights and field
                          intelligence to field representatives
                        </span>
                      </div>
                      <div className="achievement-item">
                        <span>
                          Power BI report embedding into the application with
                          features such as save filters, FAQs and rule-based
                          chatbot for best user experience
                        </span>
                      </div>
                      <div className="achievement-item">
                        <span>
                          Built an extensive admin web app for the above product
                          which offers entire headless configuration into an
                          user friendly UI interface along with custom built
                          Usage Analytics
                        </span>
                      </div>
                      <div className="achievement-item">
                        <span>
                          Leveraged Ant Design for UI development, ensuring
                          responsive layouts and seamless usability across
                          desktops and tablets
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="tech-stack">
                    <span className="tech-tag">React</span>
                    <span className="tech-tag">Webpack</span>
                    <span className="tech-tag">Power BI</span>
                    <span className="tech-tag">Ant Design</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Programmer Analyst */}
            <div className="experience-item" ref={programmerAnalystRef}>
              <div className="timeline-marker"></div>
              <div className="experience-content">
                <div className="experience-header">
                  <div className="position-info">
                    <h3 className="position-title">Programmer Analyst</h3>
                    <h4 className="company-name">
                      Cognizant Technologies Solutions
                    </h4>
                    <div className="meta-info">
                      <span className="duration">09/2020 - 05/2022</span>
                      <span className="separator">•</span>
                      <span className="location">Chennai, India (Remote)</span>
                    </div>
                  </div>
                  <button
                    className="toggle-button"
                    onClick={() => toggleCard("programmer-analyst")}
                    aria-label={
                      expandedCards["programmer-analyst"]
                        ? "Collapse details"
                        : "Expand details"
                    }
                  >
                    {expandedCards["programmer-analyst"] ? "−" : "+"}
                  </button>
                </div>

                <div className="experience-description">
                  {expandedCards["programmer-analyst"] && (
                    <div className="achievements">
                      <div className="achievement-item">
                        <span>
                          Worked as a Drupal Web Developer, building scalable
                          web solutions for leading US healthcare companies
                        </span>
                      </div>
                      <div className="achievement-item">
                        <span>
                          Specialized in extending Drupal's core with custom PHP
                          modules, developing themes with Twig, and managing
                          complex content architectures using Content Types and
                          Views
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="tech-stack">
                    <span className="tech-tag">Drupal</span>
                    <span className="tech-tag">PHP</span>
                    <span className="tech-tag">Twig</span>
                    <span className="tech-tag">Content Management</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Contact Section */}
      <AnimatedSection
        animationType="slideUp"
        className="contact-section"
        delay={400}
        id="contact"
      >
        <h2>Let's Work Together</h2>
        <p>
          Ready to bring your next project to life? Let's discuss how we can
          collaborate!
        </p>
        <form
          className="contact-form"
          ref={useRef<HTMLFormElement>(null)}
          onSubmit={async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const form = e.currentTarget;
            const formData = new FormData(form);

            // Log form data
            console.log({
              name: formData.get("user_name"),
              email: formData.get("user_email"),
              message: formData.get("message"),
            });

            setIsLoading(true);

            try {
              // Initialize EmailJS
              emailjs.init("47ffJpzLcbOgGg16F");

              // Send email - auto-reply will be handled by EmailJS template
              await emailjs.send("service_uxaz3fq", "template_a3k82vi", {
                name: formData.get('user_name'),
                email: formData.get('user_email'),
                message: formData.get("message"),
              });

              setAlertState({
                open: true,
                message:
                  "Thank you for your message! Check your email for confirmation.",
                severity: "success",
              });
              form.reset();
            } catch (error) {
              console.error("Error:", error);
              setAlertState({
                open: true,
                message:
                  "Sorry, there was an error sending your message. Please try again.",
                severity: "error",
              });
            } finally {
              setIsLoading(false);
            }
          }}
        >
          <input
            type="text"
            name="user_name"
            placeholder="Your Name"
            required
          />
          <input
            type="email"
            name="user_email"
            placeholder="Your Email"
            required
          />
          <textarea
            name="message"
            placeholder="Tell me about your project..."
            required
          ></textarea>
          <button type="submit" disabled={isLoading}>
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Send Message"
            )}
          </button>
        </form>

        {/* Alert Component */}
        <Snackbar
          open={alertState.open}
          autoHideDuration={3000}
          onClose={() => setAlertState((prev) => ({ ...prev, open: false }))}
        >
          <Alert
            onClose={() => setAlertState((prev) => ({ ...prev, open: false }))}
            severity={alertState.severity}
            sx={{ width: "100%" }}
          >
            {alertState.message}
          </Alert>
        </Snackbar>
      </AnimatedSection>
    </div>
  );
};

export default App;
