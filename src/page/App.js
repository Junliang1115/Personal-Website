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
import ProjectPage from './ProjectPage';
import bottomImage from '../assets/vinyl.png';
import HackathonPage from './HackathonPage';
import HackathonDetailsPage from './HackathonDetailsPage';

// Rotating Navigation Component
function RotatingNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDragging, setIsDragging] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const isDraggingRef = useRef(false);
  const imageRef = useRef(null);
  const containerRef = useRef(null); // Ref for the main container
  const [rotationAngle, setRotationAngle] = useState(0);
  const angleRef = useRef(0);
  const [showPageName, setShowPageName] = useState(false);
  const [currentPageName, setCurrentPageName] = useState('');

  const pageAngles = {
    about: 0,
    contact: 90,
    project: 180,
    journey: 270,
  };

  const pageNames = {
    about: 'About Me',
    contact: 'Contact',
    project: 'Projects',
    journey: 'My Journey',
  };

  useEffect(() => {
    const path = location.pathname;
    let page = 'about';
    if (path === '/') page = 'about';
    else if (path === '/journey') page = 'journey';
    else if (path === '/project' || path === '/projects') page = 'project';
    else if (path === '/contact') page = 'contact';
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
    if ((normalized >= 315 && normalized < 360) || (normalized >= 0 && normalized < 45)) targetPage = 'about';
    else if (normalized >= 45 && normalized < 135) targetPage = 'contact';
    else if (normalized >= 135 && normalized < 225) targetPage = 'project';
    else if (normalized >= 225 && normalized < 315) targetPage = 'journey';
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
    if ((angle >= 315 && angle < 360) || (angle >= 0 && angle < 45)) targetPage = 'about';
    else if (angle >= 45 && angle < 135) targetPage = 'contact';
    else if (angle >= 135 && angle < 225) targetPage = 'project';
    else if (angle >= 225 && angle < 315) targetPage = 'journey';
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
    if ((angle >= 315 && angle < 360) || (angle >= 0 && angle < 45)) targetPage = 'about';
    else if (angle >= 45 && angle < 135) targetPage = 'contact';
    else if (angle >= 135 && angle < 225) targetPage = 'project';
    else if (angle >= 225 && angle < 315) targetPage = 'journey';

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

  // Responsive dial size: clamp between 220px and 60vw
  const dialSize = isExpanded ? 'clamp(220px, 60vw, 380px)' : 'clamp(220px, 60vw, 500px)';
  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: isExpanded ? '50' : '0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transition: 'all 0.3s ease',
        width: '50vw',
        maxWidth: '50vw',
        maxHeight:'70vh',
        // pointerEvents removed to restore clickability
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
            textShadow: '0px 2px 4px rgba(0,0,0,0.5)',
            backgroundColor: 'rgba(0,0,0,0.3)',
            padding: '8px 16px',
            borderRadius: '20px',
            backdropFilter: 'blur(10px)',
            userSelect: 'none',
            zIndex: 10,
          }}
        >
          {currentPageName}
        </motion.div>
      )}


      {/* Rotating Bottom Image - Sticky at bottom, half visible */}
      <div
        style={{
          width: dialSize,
          height: dialSize,
          minWidth: '220px',
          minHeight: '220px',
          maxWidth: isExpanded ? '380px' : '500px',
          maxHeight: isExpanded ? '380px' : '500px',
          userSelect: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
          transform: isExpanded ? 'translateY(-7vw)' : 'translateY(70%)', // moved lower
          position: 'relative',
          pointerEvents: 'auto', // allow interaction with dial
        }}
      >
        {/* Direction Indicators (rotating with dial) */}
        {isExpanded && (
          <motion.div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: 0,
              left: 0,
              pointerEvents: 'none',
              zIndex: 2,
            }}
            animate={{ rotate: rotationAngle }}
            transition={isDragging ? { duration: 0 } : { type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Sticky edge labels using trigonometry */}
            {(() => {
              // Responsive label widths and font sizes
              const labels = [
                { text: 'About', angle: 0, rotate: 0, width: 'clamp(50px, 10vw, 65px)' },
                { text: 'Journey', angle: 90, rotate: 0, width: 'clamp(60px, 13vw, 86.37px)' },
                { text: 'Projects', angle: 180, rotate: 0, width: 'clamp(60px, 13vw, 86.37px)' },
                { text: 'Contact', angle: 270, rotate: 0, width: 'clamp(60px, 13vw, 86.37px)' },
              ];
              // Responsive radius based on dial size
              const dial = containerRef.current?.querySelector('div > img')?.offsetWidth || (isExpanded ? 380 : 500);
              const radius = dial / 2 - 30;
              return labels.map(({ text, angle, rotate, width }) => {
                const rad = (angle - 90) * (Math.PI / 180);
                const x = radius * Math.cos(rad);
                const y = radius * Math.sin(rad);
                return (
                  <motion.div
                    key={text}
                    style={{
                      position: 'absolute',
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      width: width,
                      height: 'clamp(18px, 3vw, 23px)',
                      fontFamily: 'Instrument Sans',
                      fontStyle: 'normal',
                      fontWeight: 600,
                      fontSize: 'clamp(13px, 2.5vw, 20px)',
                      lineHeight: 'clamp(18px, 3vw, 24px)',
                      color: '#FFFFFF',
                      textAlign: 'center',
                      userSelect: 'none',
                      pointerEvents: 'none',
                      letterSpacing: '0px',
                      textShadow: '0 2px 8px #000',
                      transform: `translate(-50%, -50%) rotate(${-rotationAngle}deg)`,
                    }}
                    transition={{ duration: 0 }}
                  >
                    {text}
                  </motion.div>
                );
              });
            })()}
          </motion.div>
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
            zIndex: 1,
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
          <Route path="/hackathon" element={<HackathonPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/project" element={<ProjectPage />} />
          <Route path="/projects" element={<ProjectPage />} />
          <Route path="/hackathon-details/:name" element={<HackathonDetailsPage />} />
          {/* Add more routes as needed */}
        </Routes>

        {/* Rotating Navigation */}
        <RotatingNavigation />
      </div>
    </BrowserRouter>
  );
}

export default App;