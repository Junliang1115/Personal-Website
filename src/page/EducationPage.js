import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import educationSide from '../assets/education-side.png';

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

function EducationPage() {
    const navigate = useNavigate();
    const descRef = useRef(null);
    const [scrolling, setScrolling] = useState(true);
    const { width } = useWindowSize();
    const isMobile = width <= 768;

    useEffect(() => {
        let interval;
        let timeout;
        if (scrolling) {
            const startScroll = () => {
                interval = setInterval(() => {
                    if (descRef.current) {
                        if (descRef.current.scrollTop + descRef.current.clientHeight < descRef.current.scrollHeight) {
                            descRef.current.scrollTop += 1;
                        } else {
                            descRef.current.scrollTop = descRef.current.scrollHeight / 2;
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
            gap: isMobile ? '2vw' : '1vw',
            position: 'absolute',
            left: isMobile ? '5vw' : '8vw',
            top: isMobile ? '8vh' : '15vh',
            zIndex: 3,
        },
        backButton: {
            background: 'none',
            border: 'none',
            padding: 0,
            marginRight: isMobile ? '2vw' : 'min(2vw, 1rem)',
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
        contentContainer: {
            position: isMobile ? 'static' : 'absolute',
            left: isMobile ? 'auto' : '8vw',
            top: isMobile ? 'auto' : '28vh',
            width: isMobile ? '90vw' : '52vw',
            height: isMobile ? 'auto' : '62vh',
            background: 'rgba(0, 0, 0, 0.33)',
            borderRadius: 5,
            zIndex: 2,
            overflow: 'auto',
            padding: '2vw',
            margin: isMobile ? '5vh auto' : '0',
        },
        scrollableContent: {
            position: 'relative',
            width: '100%',
            height: isMobile ? '40vh' : '100%',
            overflowY: 'auto',
            paddingRight: '2vw',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
        },
        educationItem: {
            color: '#FFFFFF',
            fontWeight: 600,
            fontSize: isMobile ? '3.5vw' : '1.2vw',
            marginBottom: '1vh',
        },
        educationInstitution: {
            color: '#FFFFFF',
            fontWeight: 600,
            fontSize: isMobile ? '4.5vw' : '1.6vw',
            marginBottom: '1vh',
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
            margin: isMobile ? '2vh auto' : '0',
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
            marginTop: isMobile ? '1vh' : '1vh',
        },
        subtitle: {
            color: '#E8DEDE',
            fontFamily: 'Instrument Sans',
            fontWeight: 600,
            fontSize: isMobile ? '3vw' : '1.2vw',
            lineHeight: '1.2',
            textAlign: 'center',
        },
        scrollButton: {
            width: isMobile ? '6vw' : '1.2vw',
            minWidth: isMobile ? 24 : 24,
            maxWidth: isMobile ? 32 : 32,
            height: isMobile ? '6vw' : '1.2vw',
            minHeight: isMobile ? 24 : 24,
            maxHeight: isMobile ? 32 : 32,
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
            fontSize: isMobile ? '3vw' : '1vw',
        },
        tip: {
            textAlign: 'center',
            color: '#E8DEDE',
            fontFamily: 'Instrument Sans',
            marginTop: '1vh',
            fontWeight: 500,
            fontSize: isMobile ? '2.5vw' : '0.8vw',
        },
    };

    return (
        <div style={styles.page}>
            <div style={styles.background} />
            <div style={styles.titleContainer}>
                <button onClick={() => navigate(-1)} style={styles.backButton} aria-label="Back">
                    <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12" />
                        <polyline points="12 19 5 12 12 5" />
                    </svg>
                </button>
                <span style={styles.title}>Education</span>
            </div>

            {isMobile ? (
                <div style={{ paddingTop: '12vh', paddingBottom: '5vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={styles.sideSection}>
                        <img src={educationSide} alt="Side" style={styles.sideImage} />
                        <div style={styles.subtitleContainer}>
                            <div style={styles.subtitle}>Education - Jun Liang</div>
                            <button style={styles.scrollButton} onClick={() => setScrolling(s => !s)} aria-label={scrolling ? 'Stop auto-scroll' : 'Start auto-scroll'}>
                                {scrolling ? (
                                    <span style={styles.scrollButtonIcon}>&#10073;&#10073;</span>
                                ) : (
                                    <span style={styles.scrollButtonIcon}>&#9654;</span>
                                )}
                            </button>
                        </div>
                        <div style={styles.tip}>Tip: Click the pause button to stop auto scrolling</div>
                    </div>
                    <div style={styles.contentContainer}>
                        <div ref={descRef} style={styles.scrollableContent}>
                            <style>{`div::-webkit-scrollbar { display: none; }`}</style>
                            {[...Array(3)].map((_, i) => (
                                <React.Fragment key={i}>
                                    <div style={styles.educationItem}>2023 - 2027</div>
                                    <div style={styles.educationInstitution}>Universiti Sains Malaysia</div>
                                    <div style={styles.educationItem}>Bachelor of Computer Science<br />Major in Intelligence Computing</div>
                                    <div style={{ ...styles.educationItem, marginBottom: '5vh' }}>CGPA: 3.65 (Dean’s List)</div>
                                    <div style={styles.educationItem}>2022 - 2023</div>
                                    <div style={styles.educationInstitution}>Kedah Engineering Matriculation College</div>
                                    <div style={styles.educationItem}>Matriculation in Engineering</div>
                                    <div style={{ ...styles.educationItem, marginBottom: '5vh' }}>CGPA: 4.00</div>
                                    <div style={styles.educationItem}>2017 - 2021</div>
                                    <div style={styles.educationInstitution}>SMJK Phor Tay</div>
                                    <div style={styles.educationItem}>Pure Science ( Physic, Chemistry, Biology )</div>
                                    <div style={{ ...styles.educationItem, marginBottom: '5vh' }}>SPM: 2A+ 5A 3B+</div>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div style={{...styles.contentContainer, left: '8vw', top: '28vh'}}>
                        <div ref={descRef} style={styles.scrollableContent}>
                            <style>{`div::-webkit-scrollbar { display: none; }`}</style>
                            {[...Array(3)].map((_, i) => (
                                <React.Fragment key={i}>
                                    <div style={styles.educationItem}>2023 - 2027</div>
                                    <div style={styles.educationInstitution}>Universiti Sains Malaysia</div>
                                    <div style={styles.educationItem}>Bachelor of Computer Science<br />Major in Intelligence Computing</div>
                                    <div style={{ ...styles.educationItem, marginBottom: '5vh' }}>CGPA: 3.65 (Dean’s List)</div>
                                    <div style={styles.educationItem}>2022 - 2023</div>
                                    <div style={styles.educationInstitution}>Kedah Engineering Matriculation College</div>
                                    <div style={styles.educationItem}>Matriculation in Engineering</div>
                                    <div style={{ ...styles.educationItem, marginBottom: '5vh' }}>CGPA: 4.00</div>
                                    <div style={styles.educationItem}>2017 - 2021</div>
                                    <div style={styles.educationInstitution}>SMJK Phor Tay</div>
                                    <div style={styles.educationItem}>Pure Science ( Physic, Chemistry, Biology )</div>
                                    <div style={{ ...styles.educationItem, marginBottom: '5vh' }}>SPM: 2A+ 5A 3B+</div>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                    <div style={{...styles.sideSection, left: '65vw', top: '35vh'}}>
                        <img src={educationSide} alt="Side" style={styles.sideImage} />
                        <div style={styles.subtitleContainer}>
                            <div style={styles.subtitle}>Education - Jun Liang</div>
                            <button style={styles.scrollButton} onClick={() => setScrolling(s => !s)} aria-label={scrolling ? 'Stop auto-scroll' : 'Start auto-scroll'}>
                                {scrolling ? (
                                    <span style={styles.scrollButtonIcon}>&#10073;&#10073;</span>
                                ) : (
                                    <span style={styles.scrollButtonIcon}>&#9654;</span>
                                )}
                            </button>
                        </div>
                        <div style={styles.tip}>Tip: Click the pause button to stop auto scrolling</div>
                    </div>
                </>
            )}
        </div>
    );
}

export default EducationPage;