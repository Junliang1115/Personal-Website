import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import skillImage from '../assets/skill.jpg';

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

function SkillPage() {
    const descRef = useRef(null);
    const certRef = useRef(null);
    const [scrolling, setScrolling] = useState(true);
    const waitingRef = useRef(false);
    const navigate = useNavigate();
    const { width } = useWindowSize();
    const isMobile = width <= 768;

    useEffect(() => {
        let interval;
        let timeout;
        function startScroll() {
            interval = setInterval(() => {
                let scrolled = false;
                if (descRef.current) {
                    if (descRef.current.scrollTop + descRef.current.clientHeight < descRef.current.scrollHeight) {
                        descRef.current.scrollTop += 1;
                        scrolled = true;
                    } else {
                        descRef.current.scrollTop = 0;
                    }
                }
                if (certRef.current) {
                    if (certRef.current.scrollTop + certRef.current.clientHeight < certRef.current.scrollHeight) {
                        certRef.current.scrollTop += 1;
                        scrolled = true;
                    } else {
                        certRef.current.scrollTop = 0;
                    }
                }
                if (!scrolled && !waitingRef.current) {
                    waitingRef.current = true;
                    clearInterval(interval);
                    setTimeout(() => {
                        if (descRef.current) descRef.current.scrollTop = 0;
                        if (certRef.current) certRef.current.scrollTop = 0;
                        waitingRef.current = false;
                        startScroll();
                    }, 1000);
                }
            }, 20);
        }
        if (scrolling) {
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
        skillContainer: {
            position: isMobile ? 'static' : 'absolute',
            left: isMobile ? 'auto' : '8vw',
            top: isMobile ? 'auto' : '25vh',
            width: isMobile ? '90vw' : '52vw',
            height: isMobile ? 'auto' : '28vh',
            background: 'rgba(0, 0, 0, 0.33)',
            borderRadius: 5,
            zIndex: 2,
            overflow: 'hidden',
            padding: '2vw',
            marginBottom: isMobile ? '2vh' : '0',
        },
        certificateContainer: {
            position: isMobile ? 'static' : 'absolute',
            left: isMobile ? 'auto' : '8vw',
            top: isMobile ? 'auto' : '65vh',
            width: isMobile ? '90vw' : '52vw',
            height: isMobile ? 'auto' : '28vh',
            background: 'rgba(0, 0, 0, 0.33)',
            borderRadius: 5,
            zIndex: 2,
            overflow: 'hidden',
            padding: '2vw',
            marginTop: isMobile ? '2vh' : '0',
            marginBottom: isMobile ? '8vh' : '0',
        },
        scrollableContent: {
            width: '100%',
            height: isMobile ? '20vh' : '100%',
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
        sectionTitle: {
            color: '#FFFFFF',
            fontWeight: 600,
            fontSize: isMobile ? '4vw' : '1.6vw'
        },
        sectionText: {
            color: '#E8DEDE',
            fontWeight: 500,
            fontSize: isMobile ? '4vw' : '1.2vw'
        }
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
                <span style={styles.title}>Skills</span>
            </div>

            {isMobile ? (
                <div style={{ paddingTop: '12vh', paddingBottom: '5vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={styles.sideSection}>
                        <img src={skillImage} alt="Skill Side" style={styles.sideImage} />
                        <div style={styles.subtitleContainer}>
                            <div style={styles.subtitle}>Skills - Jun Liang</div>
                            <button style={styles.scrollButton} onClick={() => setScrolling(s => !s)} aria-label={scrolling ? 'Stop auto-scroll' : 'Start auto-scroll'}>
                                {scrolling ? <span style={styles.scrollButtonIcon}>&#10073;&#10073;</span> : <span style={styles.scrollButtonIcon}>&#9654;</span>}
                            </button>
                        </div>
                        <div style={styles.tip}>Tip: Click the pause button to stop auto scrolling</div>
                    </div>

                    <div style={styles.skillContainer}>
                        <div ref={descRef} style={styles.scrollableContent}>
                            <style>{`div::-webkit-scrollbar { display: none; }`}</style>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1vh' }}>
                                <div style={styles.sectionTitle}>Programming Languages</div>
                                <div style={styles.sectionText}>Python, JavaScript, C++, Java</div>
                                <div style={{...styles.sectionTitle, marginTop: '2vh'}}>Frameworks & Libraries</div>
                                <div style={styles.sectionText}>React, Node.js, Express, TensorFlow, PyTorch</div>
                                <div style={{...styles.sectionTitle, marginTop: '2vh'}}>Tools & Platforms</div>
                                <div style={styles.sectionText}>Git, Firebase, MCP, Cursor</div>
                                <div style={{...styles.sectionTitle, marginTop: '2vh'}}>Design & Soft Skills</div>
                                <div style={styles.sectionText}>UI/UX, Figma, Communication, Leadership</div>
                            </div>
                        </div>
                    </div>
                    <div style={{ color: '#FFFFFF', fontFamily: 'Instrument Sans', fontWeight: 600, fontSize: '6vw'}}>Certificate</div>
                    <div style={styles.certificateContainer}>
                        <div ref={certRef} style={styles.scrollableContent}>
                            <style>{`div::-webkit-scrollbar { display: none; }`}</style>
                            <div style={{...styles.sectionTitle, marginBottom: '1vh'}}>Google Data Analytics Professional Certificate</div>
                            <div style={{...styles.sectionText, color: 'rgba(232, 222, 222, 0.7)', marginBottom: '2vh'}}>Coursera, 2024</div>
                            <div style={{...styles.sectionTitle, marginBottom: '1vh'}}>AWS Certified Cloud Practitioner</div>
                            <div style={{...styles.sectionText, color: 'rgba(232, 222, 222, 0.7)', marginBottom: '2vh'}}>Amazon Web Services, 2025</div>
                            <div style={{...styles.sectionTitle, marginBottom: '1vh'}}>TensorFlow Developer Certificate</div>
                            <div style={{...styles.sectionText, color: 'rgba(232, 222, 222, 0.7)', marginBottom: '2vh'}}>Google, 2024</div>
                            <div style={{...styles.sectionTitle, marginBottom: '1vh'}}>Figma UI/UX Design Certificate</div>
                            <div style={{...styles.sectionText, color: 'rgba(232, 222, 222, 0.7)'}}>Figma, 2023</div>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div style={styles.skillContainer}>
                        <div ref={descRef} style={styles.scrollableContent}>
                            <style>{`div::-webkit-scrollbar { display: none; }`}</style>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1vh' }}>
                                <div style={styles.sectionTitle}>Programming Languages</div>
                                <div style={styles.sectionText}>Python, JavaScript, C++, Java</div>
                                <div style={{...styles.sectionTitle, marginTop: '2vh'}}>Frameworks & Libraries</div>
                                <div style={styles.sectionText}>React, Node.js, Express, TensorFlow, PyTorch</div>
                                <div style={{...styles.sectionTitle, marginTop: '2vh'}}>Tools & Platforms</div>
                                <div style={styles.sectionText}>Git, Firebase, MCP, Cursor</div>
                                <div style={{...styles.sectionTitle, marginTop: '2vh'}}>Design & Soft Skills</div>
                                <div style={styles.sectionText}>UI/UX, Figma, Communication, Leadership</div>
                            </div>
                        </div>
                    </div>
                    <div style={styles.sideSection}>
                        <img src={skillImage} alt="Skill Side" style={styles.sideImage} />
                        <div style={styles.subtitleContainer}>
                            <div style={styles.subtitle}>Skills - Jun Liang</div>
                            <button style={styles.scrollButton} onClick={() => setScrolling(s => !s)} aria-label={scrolling ? 'Stop auto-scroll' : 'Start auto-scroll'}>
                                {scrolling ? <span style={styles.scrollButtonIcon}>&#10073;&#10073;</span> : <span style={styles.scrollButtonIcon}>&#9654;</span>}
                            </button>
                        </div>
                        <div style={styles.tip}>Tip: Click the pause button to stop auto scrolling</div>
                    </div>
                    <div style={{ position: 'absolute', left: '8vw', top: '55vh', zIndex: 3 }}>
                        <div style={{...styles.title, fontSize: '2.5vw'}}>Certificate</div>
                    </div>
                    <div style={styles.certificateContainer}>
                        <div ref={certRef} style={styles.scrollableContent}>
                            <style>{`div::-webkit-scrollbar { display: none; }`}</style>
                            <div style={{...styles.sectionText, marginBottom: '1vh'}}>Google Data Analytics Professional Certificate</div>
                            <div style={{...styles.sectionText, color: 'rgba(232, 222, 222, 0.7)', marginBottom: '2vh'}}>Coursera, 2024</div>
                            <div style={{...styles.sectionText, marginBottom: '1vh'}}>AWS Certified Cloud Practitioner</div>
                            <div style={{...styles.sectionText, color: 'rgba(232, 222, 222, 0.7)', marginBottom: '2vh'}}>Amazon Web Services, 2025</div>
                            <div style={{...styles.sectionText, marginBottom: '1vh'}}>TensorFlow Developer Certificate</div>
                            <div style={{...styles.sectionText, color: 'rgba(232, 222, 222, 0.7)', marginBottom: '2vh'}}>Google, 2024</div>
                            <div style={{...styles.sectionText, marginBottom: '1vh'}}>Figma UI/UX Design Certificate</div>
                            <div style={{...styles.sectionText, color: 'rgba(232, 222, 222, 0.7)'}}>Figma, 2023</div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default SkillPage;