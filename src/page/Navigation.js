import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoImage from '../assets/logo.png';

function Navigation() {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const isMobile = window.innerWidth < 600;
    return (
        <nav
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                background: 'linear-gradient(265.9deg, #1D1515 16.75%, #342020 57.09%, #1D1515 97.42%)',
                boxShadow: '0 2px 12px 0 rgba(0,0,0,0.08)',
                zIndex: 100,
                padding: '0 clamp(8px, 4vw, 32px)',
                height: 'clamp(56px, 8vw, 80px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <div style={{
                width: '100%',
                maxWidth: 1440,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 'clamp(8px, 2vw, 16px)',
            }}>
                {/* Logo */}
                <div
                    onClick={() => navigate('/')}
                    style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                >
                    <img
                        src={logoImage}
                        alt="Logo"
                        style={{
                            marginTop: 'clamp(8px, 2vw, 20px)',
                            width: 'clamp(90px, 18vw, 207px)',
                            objectFit: 'cover',
                            height: 'clamp(36px, 7vw, 60px)',
                            maxWidth: '100%',
                        }}
                    />
                </div>
                {/* Mobile Menu Button */}
                {isMobile && (
                    <button
                        onClick={() => setMenuOpen(m => !m)}
                        style={{
                            background: 'none',
                            border: 'none',
                            padding: 0,
                            marginLeft: 8,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            zIndex: 101,
                        }}
                        aria-label="Menu"
                    >
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <line x1="3" y1="12" x2="21" y2="12" />
                            <line x1="3" y1="18" x2="21" y2="18" />
                        </svg>
                    </button>
                )}
                {/* Nav Items */}
                <div style={{
                    display: isMobile ? (menuOpen ? 'flex' : 'none') : 'flex',
                    gap: isMobile ? 'clamp(8px, 2vw, 16px)' : 'clamp(16px, 5vw, 48px)',
                    alignItems: isMobile ? 'flex-start' : 'center',
                    flexDirection: isMobile ? 'column' : 'row',
                    flexWrap: 'wrap',
                    justifyContent: isMobile ? 'flex-start' : 'center',
                    width: isMobile ? '100%' : 'auto',
                    overflowX: isMobile ? 'auto' : 'visible',
                    position: isMobile ? 'absolute' : 'static',
                    top: isMobile ? 'clamp(56px, 8vw, 80px)' : undefined,
                    left: isMobile ? 0 : undefined,
                    background: isMobile ? 'linear-gradient(265.9deg, #1D1515 16.75%, #342020 57.09%, #1D1515 97.42%)' : undefined,
                    boxShadow: isMobile ? '0 2px 12px 0 rgba(0,0,0,0.08)' : undefined,
                    zIndex: isMobile ? 100 : undefined,
                    padding: isMobile ? 'clamp(8px, 4vw, 32px)' : 0,
                }}>
                    <span
                        style={{
                            fontFamily: 'Instrument Sans',
                            fontWeight: 600,
                            fontSize: 'clamp(13px, 2vw, 16px)',
                            lineHeight: 'clamp(18px, 2vw, 20px)',
                            color: window.location.pathname === '/' ? '#BA3D01' : '#FFFFFF',
                            cursor: 'pointer',
                            padding: 'clamp(6px, 1vw, 8px) 0',
                            borderBottom: window.location.pathname === '/' ? '2px solid #BA3D01' : '2px solid transparent',
                            transition: 'color 0.2s, border-bottom 0.2s',
                        }}
                        onClick={() => navigate('/')}
                    >
                        About me
                    </span>
                    <span
                        style={{
                            fontFamily: 'Instrument Sans',
                            fontWeight: 600,
                            fontSize: 'clamp(13px, 2vw, 16px)',
                            lineHeight: 'clamp(18px, 2vw, 20px)',
                            color: (window.location.pathname === '/journey' || window.location.pathname === '/education') ? '#BA3D01' : '#FFFFFF',
                            cursor: 'pointer',
                            padding: 'clamp(6px, 1vw, 8px) 0',
                            borderBottom: (window.location.pathname === '/journey' || window.location.pathname === '/education') ? '2px solid #BA3D01' : '2px solid transparent',
                            transition: 'color 0.2s, border-bottom 0.2s',
                        }}
                        onClick={() => navigate('/journey')}
                    >
                        My Journey
                    </span>
                    <span
                        style={{
                            fontFamily: 'Instrument Sans',
                            fontWeight: 600,
                            fontSize: 'clamp(13px, 2vw, 16px)',
                            lineHeight: 'clamp(18px, 2vw, 20px)',
                            color: (window.location.pathname === '/project' || window.location.pathname === '/projects') ? '#BA3D01' : '#FFFFFF',
                            cursor: 'pointer',
                            padding: 'clamp(6px, 1vw, 8px) 0',
                            borderBottom: (window.location.pathname === '/project' || window.location.pathname === '/projects') ? '2px solid #BA3D01' : '2px solid transparent',
                            transition: 'color 0.2s, border-bottom 0.2s',
                        }}
                        onClick={() => navigate('/projects')}
                    >
                        Projects
                    </span>                    
                    <span
                        style={{
                            fontFamily: 'Instrument Sans',
                            fontWeight: 600,
                            fontSize: 'clamp(13px, 2vw, 16px)',
                            lineHeight: 'clamp(18px, 2vw, 20px)',
                            color: window.location.pathname === '/contact' ? '#BA3D01' : '#FFFFFF',
                            cursor: 'pointer',
                            padding: 'clamp(6px, 1vw, 8px) 0',
                            borderBottom: window.location.pathname === '/contact' ? '2px solid #BA3D01' : '2px solid transparent',
                            transition: 'color 0.2s, border-bottom 0.2s',
                        }}
                        onClick={() => navigate('/contact')}
                    >
                        Contact
                    </span>

                    <a
                        href={require('../assets/resume.pdf')}
                        download
                        style={{
                            fontFamily: 'Instrument Sans',
                            fontWeight: 600,
                            fontSize: 'clamp(13px, 2vw, 16px)',
                            lineHeight: 'clamp(18px, 2vw, 20px)',
                            color: '#FFFFFF',
                            background: '#BA3D01',
                            borderRadius: 20,
                            padding: 'clamp(8px, 1vw, 12px) clamp(18px, 4vw, 25px)',
                            textDecoration: 'none',
                            transition: 'background 0.2s',
                        }}
                    >
                        Resume
                    </a>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;