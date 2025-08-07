import React from 'react';
import { useNavigate } from 'react-router-dom';
import logoImage from '../assets/logo.png';

function Navigation() {
    const navigate = useNavigate();
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
                padding: '0 48px',
                height: 80,
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
            }}>
                {/* Logo */}
                <img
                    src={logoImage}
                    alt="Logo"
                    style={{ marginTop: 20, width: 207 }}
                />
                {/* Nav Items */}
                <div style={{ display: 'flex', gap: 48, alignItems: 'center' }}>
                    <span
                        style={{
                            fontFamily: 'Instrument Sans',
                            fontWeight: 600,
                            fontSize: 16,
                            lineHeight: '20px',
                            color: window.location.pathname === '/' ? '#BA3D01' : '#FFFFFF',
                            cursor: 'pointer',
                            padding: '8px 0',
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
                            fontSize: 16,
                            lineHeight: '20px',
                            color: (window.location.pathname === '/journey' || window.location.pathname === '/education') ? '#BA3D01' : '#FFFFFF',
                            cursor: 'pointer',
                            padding: '8px 0',
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
                            fontSize: 16,
                            lineHeight: '20px',
                            color: window.location.pathname === '/availability' ? '#BA3D01' : '#FFFFFF',
                            cursor: 'pointer',
                            padding: '8px 0',
                            borderBottom: window.location.pathname === '/availability' ? '2px solid #BA3D01' : '2px solid transparent',
                            transition: 'color 0.2s, border-bottom 0.2s',
                        }}
                        onClick={() => navigate('/availability')}
                    >
                        Availability
                    </span>
                    <span
                        style={{
                            fontFamily: 'Instrument Sans',
                            fontWeight: 600,
                            fontSize: 16,
                            lineHeight: '20px',
                            color: window.location.pathname === '/contact' ? '#BA3D01' : '#FFFFFF',
                            cursor: 'pointer',
                            padding: '8px 0',
                            borderBottom: window.location.pathname === '/contact' ? '2px solid #BA3D01' : '2px solid transparent',
                            transition: 'color 0.2s, border-bottom 0.2s',
                        }}
                        onClick={() => navigate('/contact')}
                    >
                        Contact
                    </span>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;