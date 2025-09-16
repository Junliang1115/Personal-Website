import{ useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import experienceSide from '../assets/experience.jpg';

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

function ExperiencePage() {
    const expRef = useRef(null);
    const [scrolling, setScrolling] = useState(true);
    const waitingRef = useRef(false);
    const navigate = useNavigate();
    const { width } = useWindowSize();
    const isMobile = width <= 768;

    useEffect(() => {
        let interval;
        let timeout;
        if (scrolling) {
            const startScroll = () => {
                interval = setInterval(() => {
                    if (expRef.current) {
                        if (expRef.current.scrollTop + expRef.current.clientHeight < expRef.current.scrollHeight) {
                            expRef.current.scrollTop += 1;
                        } else {
                            expRef.current.scrollTop = expRef.current.scrollHeight / 2;
                        }
                    }
                }, 20);
            };
            timeout = setTimeout(startScroll, 1000);
        }
        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
            waitingRef.current = false;
        };
    }, [scrolling]);

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
        experienceContainer: {
            position: isMobile ? 'static' : 'absolute',
            left: isMobile ? 'auto' : '8vw',
            top: isMobile ? 'auto' : '25vh',
            width: isMobile ? '90vw' : '52vw',
            height: isMobile ? 'auto' : '62vh',
            background: 'rgba(0, 0, 0, 0.33)',
            borderRadius: 5,
            zIndex: 2,
            overflow: 'hidden',
            padding: '2vw',
            marginBottom: isMobile ? '8vh' : '0',
        },
        scrollableContent: {
            width: '100%',
            height: isMobile ? '40vh' : '100%',
            overflowY: 'auto',
            paddingRight: '2vw',
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
        experienceItem: {
            color: '#FFFFFF',
            fontWeight: 600,
            fontSize: isMobile ? '4vw' : '1.2vw',
            marginBottom: '1vh',
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
                <span style={styles.title}>Experience</span>
            </div>

            {isMobile ? (
                <div style={{ paddingTop: '12vh', paddingBottom: '5vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={styles.sideSection}>
                        <img src={experienceSide} alt="Experience Side" style={styles.sideImage} />
                        <div style={styles.subtitleContainer}>
                            <div style={styles.subtitle}>Experience - Jun Liang</div>
                            <button style={styles.scrollButton} onClick={() => setScrolling(s => !s)} aria-label={scrolling ? 'Stop auto-scroll' : 'Start auto-scroll'}>
                                {scrolling ? <span style={styles.scrollButtonIcon}>&#10073;&#10073;</span> : <span style={styles.scrollButtonIcon}>&#9654;</span>}
                            </button>
                        </div>
                        <div style={styles.tip}>Tip: Click the pause button to stop auto scrolling</div>
                    </div>

                    <div style={styles.experienceContainer}>
                        <div ref={expRef} style={styles.scrollableContent}>
                            <style>{`div::-webkit-scrollbar { display: none; }`}</style>
                            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                                <li style={styles.experienceItem}>Head Executive of Sponsorship Department in PIXEL 2024</li>
                                <li style={styles.experienceItem}>Associate Director of Growth Marketing Department CS Society USM</li>
                                <li style={styles.experienceItem}>Head Executive of Sponsorship Department in CSICX 2025</li>
                                <li style={styles.experienceItem}>Treasurer of International Varsity Hackathon 2024</li>
                                <li style={styles.experienceItem}>Head Executive of Sponsorship Department in V HACK 2025</li>
                                <li style={styles.experienceItem}>Sponsorship Lead in IO Extended George Town by GDG George Town</li>
                                <li style={{...styles.experienceItem, listStyleType: 'none'}}>And more...</li>
                            </ul>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div style={styles.experienceContainer}>
                        <div ref={expRef} style={styles.scrollableContent}>
                            <style>{`div::-webkit-scrollbar { display: none; }`}</style>
                            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                                <li style={styles.experienceItem}>Head Executive of Sponsorship Department in PIXEL 2024</li>
                                <li style={styles.experienceItem}>Associate Director of Growth Marketing Department CS Society USM</li>
                                <li style={styles.experienceItem}>Head Executive of Sponsorship Department in CSICX 2025</li>
                                <li style={styles.experienceItem}>Treasurer of International Varsity Hackathon 2024</li>
                                <li style={styles.experienceItem}>Head Executive of Sponsorship Department in V HACK 2025</li>
                                <li style={styles.experienceItem}>Sponsorship Lead in IO Extended George Town by GDG George Town</li>
                                <li style={{...styles.experienceItem, listStyleType: 'none'}}>And more...</li>
                            </ul>
                        </div>
                    </div>
                    <div style={styles.sideSection}>
                        <img src={experienceSide} alt="Experience Side" style={styles.sideImage} />
                        <div style={styles.subtitleContainer}>
                            <div style={styles.subtitle}>Experience - Jun Liang</div>
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

export default ExperiencePage;