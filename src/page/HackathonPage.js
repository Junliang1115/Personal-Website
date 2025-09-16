import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import hackathonSide from '../assets/hackathon.jpg';
import hackAttack from '../assets/hack attack.jpg';
import kitahack from '../assets/Kitahack.webp';
import bizmaker from '../assets/Bizmaker.jpg';
import umh from '../assets/umh.png';

const hackathons = [
    {
        name: 'Hack Attack 2.0',
        teamname: 'Haiya My Dad MVP',
        image: hackAttack,
        link: 'https://devpost.com/software/finanzer-6s27l0'
    },
    {
        name: 'Kitahack',
        teamname: 'Convert Directory',
        image: kitahack,
        link: 'https://devpost.com/software/career-canvas'
    },
    {
        name: 'UM Hackathon',
        teamname: 'Ne Zha Playing in Heaven',
        image: umh,
        link: 'https://devpost.com/software/studysync-ai'
    },

    {
        name: 'BizMaker',
        teamname: 'Horlicks',
        image: bizmaker,
        link: 'https://devpost.com/software/finanzer-6s27l0'
    }
];

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowSize;
};

function HackathonPage() {
    const navigate = useNavigate();
    const descRef = useRef(null);
    const [scrolling, setScrolling] = useState(true);
    const { width } = useWindowSize();
    const isMobile = width <= 768;

    useEffect(() => {
        let interval;
        let timeout;
        if (scrolling && !isMobile) {
            const startScroll = () => {
                interval = setInterval(() => {
                    if (descRef.current) {
                        if (descRef.current.scrollTop + descRef.current.clientHeight < descRef.current.scrollHeight) {
                            descRef.current.scrollTop += 1;
                        } else {
                            descRef.current.scrollTop = 0;
                        }
                    }
                }, 20);
            };
            timeout = setTimeout(startScroll, 1000);
        }
        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [scrolling, isMobile]);

    const styles = {
        page: {
            position: 'relative',
            width: '100vw',
            minHeight: '100vh',
            maxHeight: isMobile ? 'none' : '100vh',
            overflow: isMobile ? 'auto' : 'hidden',
            fontFamily: 'Instrument Sans',
            background: 'linear-gradient(265.9deg, #1D1515 16.75%, #342020 57.09%, #1D1515 97.42%)',
        },
        titleContainer: {
            display: 'flex',
            alignItems: 'center',
            gap: isMobile ? '4vw' : '1vw',
            position: 'absolute',
            left: isMobile ? '5vw' : '8vw',
            top: isMobile ? '8vh' : '15vh',
            zIndex: 3,
        },
        backButton: {
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
        },
        title: {
            color: '#FFFFFF',
            fontFamily: 'Instrument Sans',
            fontWeight: 600,
            fontSize: isMobile ? '6vw' : '3vw',
            lineHeight: '1.2',
        },
        hackathonContainer: {
            position: isMobile ? 'static' : 'absolute',
            left: isMobile ? 'auto' : '8vw',
            top: isMobile ? 'auto' : '28vh',
            width: isMobile ? '90vw' : '52vw',
            height: isMobile ? 'auto' : '62vh',
            background: 'rgba(0, 0, 0, 0.33)',
            borderRadius: 5,
            zIndex: 2,
            overflowY: 'auto',
            padding: '2vw',
            marginBottom: isMobile ? '8vh' : '0',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
        },
        sideSection: {
            position: isMobile ? 'static' : 'absolute',
            left: isMobile ? 'auto' : '65vw',
            top: isMobile ? 'auto' : '35vh',
            width: isMobile ? '90vw' : '22vw',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: '1vh',
            zIndex: 2,
            marginTop: isMobile ? '2vh' : '0',
            marginBottom: isMobile ? '3vh' : '0',
        },
        sideImage: {
            width: isMobile ? '80vw' : '100%',
            height: isMobile ? '80vw' : '22vw',
            borderRadius: 15,
            boxShadow: '0px 2px 4px 0px rgba(29, 28, 28, 0.25)',
            objectFit: 'cover',
        },
        subtitleContainer: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1vw',
            marginTop: '1vh',
        },
        subtitle: {
            color: '#E8DEDE',
            fontFamily: 'Instrument Sans',
            fontWeight: 600,
            fontSize: isMobile ? '4vw' : '1.2vw',
            lineHeight: '1.2',
            textAlign: 'center',
        },
        scrollButton: {
            width: isMobile ? '8vw' : '1.2vw',
            minWidth: 24,
            height: isMobile ? '8vw' : '1.2vw',
            minHeight: 24,
            cursor: 'pointer',
            background: '#BA3D01',
            border: 'none',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        },
        scrollButtonIcon: {
            color: '#fff',
            fontWeight: 700,
            fontSize: isMobile ? '4vw' : '1vw',
        },
        tip: {
            textAlign: 'center',
            color: '#E8DEDE',
            fontFamily: 'Instrument Sans',
            marginTop: '1vh',
            fontWeight: 500,
            fontSize: isMobile ? '3vw' : '0.8vw',
        },
    };

    return (
        <div style={styles.page}>
            <div style={styles.titleContainer}>
                <button onClick={() => navigate(-1)} style={styles.backButton} aria-label="Back">
                    <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12" />
                        <polyline points="12 19 5 12 12 5" />
                    </svg>
                </button>
                <span style={styles.title}>Hackathons</span>
            </div>

            {isMobile ? (
                <div style={{ paddingTop: '12vh', paddingBottom: '5vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={styles.sideSection}>
                        <img src={hackathonSide} alt="Side" style={styles.sideImage} />
                        <div style={styles.subtitleContainer}>
                            <div style={styles.subtitle}>Hackathon - Jun Liang</div>
                            <button style={styles.scrollButton} onClick={() => setScrolling(s => !s)} aria-label={scrolling ? 'Stop auto-scroll' : 'Start auto-scroll'}>
                                {scrolling ? <span style={styles.scrollButtonIcon}>&#10073;&#10073;</span> : <span style={styles.scrollButtonIcon}>&#9654;</span>}
                            </button>
                        </div>
                        <div style={styles.tip}>Tip: Click the pause button to stop auto scrolling</div>
                    </div>
                    <div className="hackathon-playlist" ref={descRef} style={styles.hackathonContainer}>
                        <style>{`div::-webkit-scrollbar { display: none; }`}</style>
                        {hackathons.map((hackathon, index) => (
                            <div key={index} className="hackathon-item" onClick={() => navigate(`/hackathon-details/${hackathon.name.replace(/\s/g, '-')}`)}>
                                <img src={hackathon.image} alt={hackathon.name} />
                                <div className="hackathon-details">
                                    <div className="name">{hackathon.name}</div>
                                    <div className="team-name">{hackathon.teamname}</div>
                                </div>
                                <div className="more-icon">&#x22EE;</div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <>
                    <div className="hackathon-playlist" ref={descRef} style={styles.hackathonContainer}>
                        <style>{`div::-webkit-scrollbar { display: none; }`}</style>
                        {hackathons.map((hackathon, index) => (
                            <div key={index} className="hackathon-item" onClick={() => navigate(`/hackathon-details/${hackathon.name.replace(/\s/g, '-')}`)}>
                                <img src={hackathon.image} alt={hackathon.name} />
                                <div className="hackathon-details">
                                    <div className="name">{hackathon.name}</div>
                                    <div className="team-name">{hackathon.teamname}</div>
                                </div>
                                <div className="more-icon">&#x22EE;</div>
                            </div>
                        ))}
                    </div>
                    <div style={styles.sideSection}>
                        <img src={hackathonSide} alt="Side" style={styles.sideImage} />
                        <div style={styles.subtitleContainer}>
                            <div style={styles.subtitle}>Hackathon - Jun Liang</div>
                            <button style={styles.scrollButton} onClick={() => setScrolling(s => !s)} aria-label={scrolling ? 'Stop auto-scroll' : 'Start auto-scroll'}>
                                {scrolling ? <span style={styles.scrollButtonIcon}>&#10073;&#10073;</span> : <span style={styles.scrollButtonIcon}>&#9654;</span>}
                            </button>
                        </div>
                        <div style={styles.tip}>Tip: Click the pause button to stop auto scrolling</div>
                    </div>
                </>
            )}
        </div>
    );
}

export default HackathonPage;
