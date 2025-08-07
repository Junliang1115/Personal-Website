import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './Navigation';
import JourneyPage from './JourneyPage';
import EducationPage from './EducationPage';
import ExperiencePage from './ExperiencePage';
import SkillPage from './SkillPage';
import ContactPage from './ContactPage';
import profileImage from '../assets/profile-pic.png';
import bottomImage from '../assets/bottom-image.png';

function App() {
  const [activeSection, setActiveSection] = useState('about');

  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', width: '100vw', background: 'linear-gradient(265.9deg, #1D1515 16.75%, #342020 57.09%, #1D1515 97.42%)', position: 'relative', overflow: 'hidden' }}>
        <Navigation active={activeSection} onChange={setActiveSection} />
        <Routes>
          <Route path="/" element={(
            <>
              {/* Profile Image */}
              <img
                src={profileImage}
                alt="Profile"
                style={{ position: 'absolute', width: 530, height: 940, left: 900, top: 130, objectFit: 'cover' }}
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
                Greetings,<br />I’m Jun Liang
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
                A Computer Science student majoring in Intelligence Computing at Universiti Sains Malaysia (USM) with a curious mind and a builder’s spirit. I’m passionate about technology, art, and ideas that solve real problems.<br /><br />
                Right now, I’m sharpening my skills in AI, product design, and system architecture — with a dream to launch my own startup in the near future. Something that blends innovation with real impact.<br /><br />
                This site is my digital lab — a space to explore, create, and share the journey.<br /><br />
                Let’s make ideas real.
              </div>
              {/* Bottom Image */}
              <img
                src={bottomImage}
                alt="Bottom design element"
                style={{ position: 'absolute', width: 669, height: 669, left: 500, top: 550, objectFit: 'cover' }}
              />
            </>
          )} />
          <Route path="/journey" element={<JourneyPage />} />
          <Route path="/education" element={<EducationPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/skills" element={<SkillPage />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
