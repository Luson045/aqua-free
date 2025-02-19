// App.jsx
import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Contact from './Contact';
import Footer from './Footer';
import SponsorshipPage from './Sponsor';

// Create a ScrollToTop component that will scroll the window to the top on route changes
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

// This component handles the animation reset on route changes
function AnimationHandler() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    // Reset the animation state for all animated elements when route changes
    document.querySelectorAll('.animate-from-below').forEach(section => {
      section.classList.remove('animate-appear');
      section.classList.add('invisible-until-animated');
    });
    
    // Set up intersection observer again
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-appear');
          entry.target.classList.remove('invisible-until-animated');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.animate-from-below').forEach(section => {
      observer.observe(section);
    });
    
    return () => {
      document.querySelectorAll('.animate-from-below').forEach(section => {
        observer.unobserve(section);
      });
    };
  }, [pathname]); // Re-run this effect whenever the route changes
  
  return null;
}

const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['home', 'mission', 'vision', 'sponsors', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const bounds = element.getBoundingClientRect();
          return bounds.top <= 100 && bounds.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Router>
      <ScrollToTop />
      <AnimationHandler />
      <div className="min-h-screen bg-white">
        <Navbar scrolled={scrolled} activeSection={activeSection} scrollToSection={scrollToSection} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/sponsor" element={<SponsorshipPage />} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
};

export default App;