import React, { useState, useEffect } from "react";
import "../styles/Navbar.css";
import logo from "../icons/logo.png";

interface NavbarProps {
  onNavigate?: (section: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Handle scroll effect and active section detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);

      // Detect active section based on scroll position
      const sections = ["home", "skills", "experience", "contact"];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section.toLowerCase());
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });

      if (currentSection && currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initial check
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const navbar = document.querySelector(".navbar");
      const target = event.target as Node;

      if (navbar && !navbar.contains(target) && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Prevent body scroll when mobile menu is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [isMobileMenuOpen]);

  const handleNavClick = (section: string) => {
    const element = document.getElementById(section.toLowerCase());
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    setIsMobileMenuOpen(false);
    setActiveSection(section);

    if (onNavigate) {
      onNavigate(section);
    }
  };

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveSection("home");
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav
      className={`navbar ${isScrolled ? "scrolled" : ""} ${
        isMobileMenuOpen ? "menu-open" : ""
      }`}
    >
      <div className="navbar-container">
        {/* Logo/Brand Section - Logo only */}
        <div
          className="navbar-brand"
          onClick={handleLogoClick}
          role="button"
          tabIndex={0}
          aria-label="Go to top of page"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleLogoClick();
            }
          }}
        >
          <img src={logo} alt="Ankit Sinha Logo" className="navbar-logo" />
        </div>

        {/* Desktop Navigation Links */}
        <div className="navbar-menu">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`navbar-link ${
                activeSection === item.id ? "active" : ""
              }`}
              onClick={() => handleNavClick(item.id)}
              aria-label={`Navigate to ${item.label} section`}
              type="button"
            >
              {item.label}
            </button>
          ))}

          {/* LinkedIn External Link */}
          <a
            href="https://www.linkedin.com/in/ankitsinha62"
            target="_blank"
            rel="noopener noreferrer"
            className="navbar-link external-link"
            aria-label="Visit LinkedIn Profile (opens in new tab)"
          >
            LinkedIn
            <svg
              className="external-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15,3 21,3 21,9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-button"
          onClick={toggleMobileMenu}
          aria-label={
            isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"
          }
          aria-expanded={isMobileMenuOpen}
          type="button"
        >
          <div className={`hamburger ${isMobileMenuOpen ? "active" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>

        {/* Mobile Menu */}
        <div
          className={`mobile-menu ${isMobileMenuOpen ? "active" : ""}`}
          role="navigation"
          aria-label="Mobile navigation menu"
        >
          {navItems.map((item, index) => (
            <button
              key={item.id}
              className={`mobile-nav-link ${
                activeSection === item.id ? "active" : ""
              }`}
              onClick={() => handleNavClick(item.id)}
              type="button"
              style={{
                animationDelay: isMobileMenuOpen ? `${index * 0.1}s` : "0s",
              }}
            >
              {item.label}
            </button>
          ))}

          {/* Mobile LinkedIn Link */}
          <a
            href="https://www.linkedin.com/in/ankitsinha62"
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-nav-link external-link"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
              animationDelay: isMobileMenuOpen
                ? `${navItems.length * 0.1}s`
                : "0s",
            }}
          >
            LinkedIn
            <svg
              className="external-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15,3 21,3 21,9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="mobile-menu-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </nav>
  );
};

export default Navbar;
