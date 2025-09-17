import React, { useState, useEffect } from 'react';
import '../styles/Navbar.css';
import logo from '../icons/logo.png';

interface NavbarProps {
  onNavigate?: (section: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (section: string) => {
    const element = document.getElementById(section.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(section);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo/Image Section */}
        <div className="navbar-brand">
          <img 
            src={logo}
            alt="Ankit" 
            className="navbar-logo"
          />
          <span className="navbar-name">Ankit Sinha</span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="navbar-menu">
          <button 
            className="navbar-link"
            onClick={() => handleNavClick('home')}
          >
            Home
          </button>
          <button 
            className="navbar-link"
            onClick={() => handleNavClick('about')}
          >
            About
          </button>
          <button 
            className="navbar-link"
            onClick={() => handleNavClick('contact')}
          >
            Contact
          </button>
                    <button 
            className="navbar-link"
          >
            <a href='https://www.linkedin.com/in/ankitsinha62' target='_blank'>LinkedIn</a>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="mobile-menu-button" onClick={toggleMobileMenu}>
          <div className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <button 
            className="mobile-nav-link"
            onClick={() => handleNavClick('home')}
          >
            Home
          </button>
          <button 
            className="mobile-nav-link"
            onClick={() => handleNavClick('about')}
          >
            About
          </button>
          <button 
            className="mobile-nav-link"
            onClick={() => handleNavClick('contact')}
          >
            Contact
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
