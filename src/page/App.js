import './App.css';
import { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navigation from './Navigation';
import JourneyPage from './JourneyPage';
import EducationPage from './EducationPage';
import ExperiencePage from './ExperiencePage';
import SkillPage from './SkillPage';
import ContactPage from './ContactPage';
import AboutPage from './AboutPage';
import bottomImage from '../assets/bottom-image.png';

// Rotating Navigation Component
function RotatingNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDragging, setIsDragging] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const isDraggingRef = useRef(false);
  const imageRef = useRef(null);
  const containerRef = useRef(null); // Ref for the main container
  const [currentPage, setCurrentPage] = useState('about');
  const [rotationAngle, setRotationAngle] = useState(0);
  const angleRef = useRef(0);
  const [showPageName, setShowPageName] = useState(false);
  const [currentPageName, setCurrentPageName] = useState('');
  const [showNavigationFeedback, setShowNavigationFeedback] = useState(false);

  const pageAngles = {
    about: 0,
    journey: 90,
    availability: 180,
    contact: 270,
  };

  const pageNames = {
    about: 'About Me',
    journey: 'My Journey',
    availability: 'Availability',
    contact: 'Contact',
  };

  useEffect(() => {
    const path = location.pathname;
    let page = 'about';
    if (path === '/') page = 'about';
    else if (path === '/journey') page = 'journey';
    else if (path === '/availability') page = 'availability';
    else if (path === '/contact') page = 'contact';
    setCurrentPage(page);
    const newAngle = pageAngles[page];
    setRotationAngle(newAngle);
    angleRef.current = newAngle;
    setIsExpanded(false); // Collapse on route change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // Effect to handle clicks outside the component to collapse it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMouseDown = (event) => {
    event.preventDefault();
    if (!isExpanded) return; // Can only drag when expanded
    setIsDragging(true);
    isDraggingRef.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (event) => {
    if (!isDraggingRef.current) return;
    const imageElement = imageRef.current;
    if (!imageElement) return;
    const rect = imageElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = event.clientX - centerX;
    const deltaY = event.clientY - centerY;
    const angleFromTopClockwise = Math.atan2(deltaX, -deltaY) * (180 / Math.PI);
    const normalized = (angleFromTopClockwise + 360) % 360;
    setRotationAngle(normalized);
    angleRef.current = normalized;
    let targetPage = 'about';
    if (normalized >= 315 || normalized < 45) targetPage = 'about';
    else if (normalized >= 45 && normalized < 135) targetPage = 'journey';
    else if (normalized >= 135 && normalized < 225) targetPage = 'availability';
    else if (normalized >= 225 && normalized < 315) targetPage = 'contact';
    setCurrentPageName(pageNames[targetPage]);
    setShowPageName(true);
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    setIsDragging(false);
    setShowPageName(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    let targetPage = 'about';
    const angle = angleRef.current % 360;
    if (angle >= 315 || angle < 45) targetPage = 'about';
    else if (angle >= 45 && angle < 135) targetPage = 'journey';
    else if (angle >= 135 && angle < 225) targetPage = 'availability';
    else if (angle >= 225 && angle < 315) targetPage = 'contact';
    setShowNavigationFeedback(true);
    setTimeout(() => setShowNavigationFeedback(false), 2000);
    if (targetPage === 'about') {
      navigate('/');
    } else {
      navigate(`/${targetPage}`);
    }
    const newAngle = pageAngles[targetPage];
    setRotationAngle(newAngle);
    angleRef.current = newAngle;
    setIsExpanded(false); // Collapse after navigation
  };

  const handleClick = () => {
    if (isDraggingRef.current) return;

    if (!isExpanded) {
      setIsExpanded(true);
      return; // First click expands
    }

    // Second click navigates
    let targetPage = 'about';
    const angle = angleRef.current % 360;
    if (angle >= 315 || angle < 45) targetPage = 'about';
    else if (angle >= 45 && angle < 135) targetPage = 'journey';
    else if (angle >= 135 && angle < 225) targetPage = 'availability';
    else if (angle >= 225 && angle < 315) targetPage = 'contact';

    if (targetPage === 'about') {
      navigate('/');
    } else {
      navigate(`/${targetPage}`);
    }

    const newAngle = pageAngles[targetPage];
    setRotationAngle(newAngle);
    angleRef.current = newAngle;
    setIsExpanded(false); // Collapse after navigation
  };

  return (
    <div
      ref={containerRef} // Attach the ref here
      style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Page Name Display */}
      {showPageName && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          style={{
            color: '#FFFFFF',
            fontFamily: 'Instrument Sans',
            fontWeight: 600,
            fontSize: '18px',
            textAlign: 'center',
            marginBottom: '10px',
            textShadow: '0px 2px 4px rgba(0,0,0,0.5)',
            backgroundColor: 'rgba(0,0,0,0.3)',
            padding: '8px 16px',
            borderRadius: '20px',
            backdropFilter: 'blur(10px)',
            userSelect: 'none',
          }}
        >
          {currentPageName}
        </motion.div>
      )}

      {/* Rotation Direction Indicator */}
      {isDragging && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            color: '#FFFFFF',
            fontFamily: 'Instrument Sans',
            fontWeight: 500,
            fontSize: '12px',
            textAlign: 'center',
            marginBottom: '5px',
            opacity: 0.7,
            userSelect: 'none',
          }}
        >
          Rotating to: {Math.round(rotationAngle)}°
        </motion.div>
      )}

      {/* Rotating Bottom Image - Sticky at bottom, half visible */}
      <div
        style={{
          width: isExpanded ? '380px' : '500px',
          height: isExpanded ? '380px' : '500px',
          userSelect: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
          transform: isExpanded ? 'translateY(-70px)' : 'translateY(55%)',
          position: 'relative',
        }}
      >
        {/* Direction Indicators (only visible when hovered) */}
        {isExpanded && (
          <>
            <div style={{ position: 'absolute', top: '-36px', left: '50%', transform: 'translateX(-50%)', color: '#FFFFFF', fontFamily: 'Instrument Sans', fontWeight: 600, fontSize: '13px', opacity: 0.85, textAlign: 'center', userSelect: 'none' }}>About</div>
            <div style={{ position: 'absolute', top: '50%', right: '-53px', transform: 'translateY(-50%)', color: '#FFFFFF', fontFamily: 'Instrument Sans', fontWeight: 600, fontSize: '13px', opacity: 0.85, textAlign: 'center', userSelect: 'none' }}>Journey</div>
            <div style={{ position: 'absolute', bottom: '-36px', left: '50%', transform: 'translateX(-50%)', color: '#FFFFFF', fontFamily: 'Instrument Sans', fontWeight: 600, fontSize: '13px', opacity: 0.85, textAlign: 'center', userSelect: 'none' }}>Availability</div>
            <div style={{ position: 'absolute', top: '50%', left: '-53px', transform: 'translateY(-50%)', color: '#FFFFFF', fontFamily: 'Instrument Sans', fontWeight: 600, fontSize: '13px', opacity: 0.85, textAlign: 'center', userSelect: 'none' }}>Contact</div>
          </>
        )}
        <motion.img
          ref={imageRef}
          src={bottomImage}
          alt="Navigation Dial"
          draggable={false}
          onMouseDown={handleMouseDown}
          onClick={handleClick}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '50%',
            cursor: isExpanded ? (isDragging ? 'grabbing' : 'grab') : 'pointer',
            boxShadow: isDragging ? '0 10px 30px rgba(0,0,0,0.3)' : isExpanded ? '0 18px 46px rgba(0,0,0,0.45)' : '0 5px 15px rgba(0,0,0,0.2)',
            transition: 'box-shadow 0.2s ease',
          }}
          animate={{ rotate: rotationAngle }}
          transition={isDragging ? { duration: 0 } : { type: 'spring', stiffness: 300, damping: 30 }}
        />
      </div>

      {/* Rotation Instructions */}
      <div
        style={{
          color: '#FFFFFF',
          fontFamily: 'Instrument Sans',
          fontWeight: 500,
          fontSize: '12px',
          textAlign: 'center',
          opacity: 0.8,
          marginTop: '10px',
          marginBottom: '24px',
          userSelect: 'none',
        }}
      >
        {isExpanded ? 'Drag to rotate or click to navigate' : 'Click to expand'}
      </div>
    </div>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState('about');

  return (
    <BrowserRouter>
      <div
        style={{
          minHeight: '100vh',
          width: '100vw',
          background:
            'linear-gradient(265.9deg, #1D1515 16.75%, #342020 57.09%, #1D1515 97.42%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Navigation active={activeSection} onChange={setActiveSection} />
        <Routes>
          <Route path="/" element={<AboutPage />} />
          <Route path="/journey" element={<JourneyPage />} />
          <Route path="/education" element={<EducationPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/skills" element={<SkillPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route
            path="/availability"
            element={
              <div style={{ paddingTop: 100, color: '#FFFFFF', textAlign: 'center' }}>
                Availability Page
              </div>
            }
          />
          {/* Add more routes as needed */}
        </Routes>

        {/* Rotating Navigation */}
        <RotatingNavigation />
      </div>
    </BrowserRouter>
  );
}

export default App;