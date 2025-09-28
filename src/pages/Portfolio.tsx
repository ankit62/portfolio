import React, { FormEvent, useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import AnimatedSection from "../components/AnimatedSection";
import emailjs from "@emailjs/browser";
import { Alert, Snackbar, CircularProgress } from "@mui/material";
import image from "../icons/image.png";
import facebook from "../icons/facebook.png";
import instagram from "../icons/instagram.png";
import linkedin from "../icons/linkedin.png";
import { useVisibilityAnimation } from "../hooks/useVisibilityAnimation";
import FloatingSkillsSection from "../components/FloatingSkillsSection";


const Portfolio = () => {
  const [isMobile, setIsMobile] = useState(false);
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

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <>
      {/* Navigation Bar */}
      <Navbar />
      {/* Hero Section - Option 1: Animated Typography */}
      <AnimatedSection
        animationType="fadeInUp"
        className="hero-section dynamic-hero"
        delay={0}
        id="home"
      >
        <div className="hero-content">
          <div className="hero-greeting">
            <span className="greeting-line">Hello, I'm</span>
            <h1 className="hero-name">
              <span className="name-part">Ankit</span>
              <span className="name-part">Sinha</span>
            </h1>
          </div>

          <div className="hero-role">
            <span className="role-prefix">I build</span>
            <div className="rotating-text">
              <span className="rotate-item active">
                amazing web experiences
              </span>
              <span className="rotate-item">scalable applications</span>
              <span className="rotate-item">modern user interfaces</span>
              <span className="rotate-item">digital solutions</span>
            </div>
          </div>

          <p className="hero-description">
            A passionate full-stack developer specializing in React, TypeScript,
            and modern web technologies. I love turning complex problems into
            simple, beautiful designs.
          </p>

          <div className="hero-actions">
            <button className="cta-primary" onClick={contactHandler}>
              <span>Get In Touch</span>
              <svg className="arrow-icon" viewBox="0 0 24 24">
                <path d="M5 12h14m-7-7l7 7-7 7" />
              </svg>
            </button>
            <button className="cta-secondary">
              <span>View My Work</span>
            </button>
          </div>
        </div>

        {/* Animated background elements */}
        <div className="hero-background">
          <div className="floating-shapes">
            {[...Array(6)].map((_, i) => (
              <div key={i} className={`shape shape-${i + 1}`}></div>
            ))}
          </div>
          <div className="code-lines">
            <div className="code-line">{"<Developer />"}</div>
            <div className="code-line">{"{ creativity: true }"}</div>
            <div className="code-line">{"console.log('Hello World!')"}</div>
          </div>
        </div>
      </AnimatedSection>

      {/* Skills Section - Option 2: 3D Flip Cards */}
      {!isMobile && <FloatingSkillsSection />}

      {/* Experience Section */}
      <AnimatedSection
        animationType="fadeInRight"
        className="experience-section"
        delay={300}
        id="experience"
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
                name: formData.get("user_name"),
                email: formData.get("user_email"),
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
    </>
  );
};

export default Portfolio;
