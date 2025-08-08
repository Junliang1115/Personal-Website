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
import profileImage from '../assets/profile-pic.png';
import bottomImage from '../assets/bottom-image.png';

// Rotating Navigation Component
function RotatingNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isDraggingRef = useRef(false);
  const imageRef = useRef(null);
  const [currentPage, setCurrentPage] = useState('about');
  const [rotationAngle, setRotationAngle] = useState(0);
  const [showPageName, setShowPageName] = useState(false);
  const [currentPageName, setCurrentPageName] = useState('');
  const [showNavigationFeedback, setShowNavigationFeedback] = useState(false);

  // Page mapping based on rotation angles
  const pageAngles = {
    about: 0,
    journey: 90,
    availability: 180,
    contact: 270,
  };

  // Page names for display
  const pageNames = {
    about: 'About Me',
    journey: 'My Journey',
    availability: 'Availability',
    contact: 'Contact',
  };

  // Sync current page and rotation with the route
  useEffect(() => {
    const path = location.pathname;
    let page = 'about';
    if (path === '/') page = 'about';
    else if (path === '/journey') page = 'journey';
    else if (path === '/availability') page = 'availability';
    else if (path === '/contact') page = 'contact';
    setCurrentPage(page);
    setRotationAngle(pageAngles[page]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle mouse down to start rotation
  const handleMouseDown = (event) => {
    event.preventDefault();
    setIsDragging(true);
    isDraggingRef.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Handle mouse move to rotate (immediate, no spring)
  const handleMouseMove = (event) => {
    if (!isDraggingRef.current) return;

    const imageElement = imageRef.current;
    if (!imageElement) return;

    const rect = imageElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = event.clientX - centerX;
    const deltaY = event.clientY - centerY;

    // Compute angle such that 0° is at the top and increases clockwise
    const angleFromTopClockwise = Math.atan2(deltaX, -deltaY) * (180 / Math.PI);
    const normalized = (angleFromTopClockwise + 360) % 360;

    setRotationAngle(normalized);

    // Show page name based on angle
    let targetPage = 'about';
    if (normalized >= 315 || normalized < 45) targetPage = 'about';
    else if (normalized >= 45 && normalized < 135) targetPage = 'journey';
    else if (normalized >= 135 && normalized < 225) targetPage = 'availability';
    else if (normalized >= 225 && normalized < 315) targetPage = 'contact';

    setCurrentPageName(pageNames[targetPage]);
    setShowPageName(true);
  };

  // Handle mouse up to end rotation and navigate (snap with spring)
  const handleMouseUp = () => {
    isDraggingRef.current = false;
    setIsDragging(false);
    setShowPageName(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);

    let targetPage = 'about';

    // Determine which page quadrant angle is in (0 top, clockwise)
    const angle = rotationAngle % 360;
    if (angle >= 315 || angle < 45) targetPage = 'about';
    else if (angle >= 45 && angle < 135) targetPage = 'journey';
    else if (angle >= 135 && angle < 225) targetPage = 'availability';
    else if (angle >= 225 && angle < 315) targetPage = 'contact';

    // Show navigation feedback
    console.log(`Navigating to: ${targetPage} at angle: ${angle}°`);

    // Show visual feedback
    setShowNavigationFeedback(true);
    setTimeout(() => setShowNavigationFeedback(false), 2000);

    // Navigate immediately
    if (targetPage === 'about') {
      navigate('/');
    } else {
      navigate(`/${targetPage}`);
    }

    // Snap to the exact page angle
    setRotationAngle(pageAngles[targetPage]);
  };

  // Optional: click to snap to current angle's page without drag
  const handleClick = () => {
    if (isDraggingRef.current) return;

    // Test navigation - cycle through pages
    const pages = ['about', 'journey', 'availability', 'contact'];
    const currentIndex = pages.indexOf(currentPage);
    const nextIndex = (currentIndex + 1) % pages.length;
    const nextPage = pages[nextIndex];

    console.log(`Click test: navigating from ${currentPage} to ${nextPage}`);

    if (nextPage === 'about') {
      navigate('/');
    } else {
      navigate(`/${nextPage}`);
    }

    setRotationAngle(pageAngles[nextPage]);
  };

  return (
    <div
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
          }}
        >
          Rotating to: {Math.round(rotationAngle)}°
        </motion.div>
      )}

      {/* Rotating Bottom Image - Sticky at bottom, half visible */}
      <div
        style={{
          width: isHovered ? '380px' : '260px',
          height: isHovered ? '380px' : '260px',
          userSelect: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
          transform: isHovered ? 'translateY(-70px)' : 'translateY(55%)',
          position: 'relative',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Direction Indicators (only visible when hovered) */}
        {isHovered && (
          <>
            <div style={{ position: 'absolute', top: '-36px', left: '50%', transform: 'translateX(-50%)', color: '#FFFFFF', fontFamily: 'Instrument Sans', fontWeight: 600, fontSize: '13px', opacity: 0.85, textAlign: 'center' }}>About</div>
            <div style={{ position: 'absolute', top: '50%', right: '-48px', transform: 'translateY(-50%)', color: '#FFFFFF', fontFamily: 'Instrument Sans', fontWeight: 600, fontSize: '13px', opacity: 0.85, textAlign: 'center' }}>Journey</div>
            <div style={{ position: 'absolute', bottom: '-36px', left: '50%', transform: 'translateX(-50%)', color: '#FFFFFF', fontFamily: 'Instrument Sans', fontWeight: 600, fontSize: '13px', opacity: 0.85, textAlign: 'center' }}>Availability</div>
            <div style={{ position: 'absolute', top: '50%', left: '-48px', transform: 'translateY(-50%)', color: '#FFFFFF', fontFamily: 'Instrument Sans', fontWeight: 600, fontSize: '13px', opacity: 0.85, textAlign: 'center' }}>Contact</div>
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
            cursor: isDragging ? 'grabbing' : 'grab',
            boxShadow: isDragging ? '0 10px 30px rgba(0,0,0,0.3)' : isHovered ? '0 18px 46px rgba(0,0,0,0.45)' : '0 5px 15px rgba(0,0,0,0.2)',
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
        }}
      >
        {isHovered ? 'Drag to rotate and navigate' : 'Hover to expand'}
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
          <Route
            path="/"
            element={
              <>
                {/* Profile Image */}
                <img
                  src={profileImage}
                  alt="Profile"
                  style={{
                    position: 'absolute',
                    width: 530,
                    height: 940,
                    left: 900,
                    top: 130,
                    objectFit: 'cover',
                  }}
                />
                {/* Greeting */}
                <div
                  style={{
                    position: 'absolute',
                    width: 330,
                    height: 124,
                    left: 230,
                    top: 200,
                    fontFamily: 'Instrument Sans',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    fontSize: 40,
                    lineHeight: '49px',
                    color: '#FFFFFF',
                  }}
                >
                  Greetings,<br />I'm Jun Liang
                </div>
                {/* Description */}
                <div
                  style={{
                    position: 'absolute',
                    width: 566,
                    height: 269,
                    left: 230,
                    top: 320,
                    fontFamily: 'Instrument Sans',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    fontSize: 17,
                    lineHeight: '21px',
                    color: '#FFFFFF',
                  }}
                >
                  A Computer Science student majoring in Intelligence Computing at
                  Universiti Sains Malaysia (USM) with a curious mind and a
                  builder's spirit. I'm passionate about technology, art, and
                  ideas that solve real problems.<br />
                  <br />
                  Right now, I'm sharpening my skills in AI, product design, and
                  system architecture — with a dream to launch my own startup in
                  the near future. Something that blends innovation with real
                  impact.<br />
                  <br />
                  This site is my digital lab — a space to explore, create, and
                  share the journey.
                  <br />
                  <br />
                  Let's make ideas real.
                </div>
              </>
            }
          />
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
