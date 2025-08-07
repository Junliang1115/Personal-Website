import React, { useRef, useState, useEffect } from 'react';
import skillImage from '../assets/skill.jpg';
import bottomImage from '../assets/bottom-image.png';

function SkillPage() {
    const descRef = useRef(null);
    const certRef = useRef(null);
    const [scrolling, setScrolling] = useState(true);
    const waitingRef = useRef(false);

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
                // If both are at bottom, pause 1s then reset
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

    return (
        <div
            style={{
                position: 'relative',
                width: '100vw',
                minHeight: '100vh',
                maxHeight: '100vh',
                overflow: 'hidden',
                fontFamily: 'Instrument Sans',
                background: 'linear-gradient(265.9deg, #1D1515 16.75%, #342020 57.09%, #1D1515 97.42%)',
            }}
        >
            {/* Title */}
            <div
                style={{
                    position: 'absolute',
                    left: '8vw',
                    top: '15vh',
                    width: '32vw',
                    minWidth: 200,
                    maxWidth: 400,
                    color: '#FFFFFF',
                    fontFamily: 'Instrument Sans',
                    fontWeight: 600,
                    fontSize: '3vw',
                    lineHeight: '1.2',
                    zIndex: 3,
                }}
            >
                Skills
            </div>
            {/* Responsive Skill Content container with background */}
            <div
                style={{
                    position: 'absolute',
                    left: '8vw',
                    top: '25vh',
                    width: '52vw',
                    minWidth: 320,
                    maxWidth: 751,
                    height: '28vh',
                    minHeight: 180,
                    maxHeight: 304,
                    background: 'rgba(0, 0, 0, 0.33)',
                    borderRadius: 5,
                    zIndex: 2,
                    overflow: 'hidden',
                    padding: '2vw 2vw',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2vh',
                }}
            >
                <div
                    ref={descRef}
                    style={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        overflowY: 'auto',
                        paddingRight: '2vw',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                    }}
                >
                    <style>{`
                        div::-webkit-scrollbar { display: none; }
                    `}</style>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1vh', flex: 1 }}>
                        <div style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '1.6vw' }}>Programming Languages</div>
                        <div style={{ color: '#E8DEDE', fontWeight: 500, fontSize: '1.2vw' }}>Python, JavaScript, C++, Java</div>
                        <div style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '1.6vw', marginTop: '2vh' }}>Frameworks & Libraries</div>
                        <div style={{ color: '#E8DEDE', fontWeight: 500, fontSize: '1.2vw' }}>React, Node.js, Express, TensorFlow, PyTorch</div>
                        <div style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '1.6vw', marginTop: '2vh' }}>Tools & Platforms</div>
                        <div style={{ color: '#E8DEDE', fontWeight: 500, fontSize: '1.2vw' }}>Git, Firebase, MCP, Cursor</div>
                        <div style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '1.6vw', marginTop: '2vh' }}>Design & Soft Skills</div>
                        <div style={{ color: '#E8DEDE', fontWeight: 500, fontSize: '1.2vw' }}>UI/UX, Figma, Communication, Leadership</div>
                    </div>
                </div>
            </div>
            {/* Responsive Side Section: image, subtitle, button */}
            <div
                style={{
                    position: 'absolute',
                    left: '65vw',
                    top: '35vh',
                    width: '22vw',
                    minWidth: 120,
                    maxWidth: 327,
                    height: '28vw',
                    minHeight: 180,
                    maxHeight: 400,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    gap: '2vh',
                    zIndex: 2,
                }}
            >
                <img
                    src={skillImage}
                    alt="Skill Side"
                    style={{
                        width: '100%',
                        height: '22vw',
                        minHeight: 120,
                        maxHeight: 327,
                        borderRadius: 15,
                        boxShadow: '0px 10px 4px 0px rgba(0,0,0,0.25)',
                        objectFit: 'cover',
                    }}
                />
                {/* Subtitle and button in a flex row */}
                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '1vw',
                        marginTop: '1vh',
                    }}
                >
                    <div
                        style={{
                            color: '#E8DEDE',
                            fontFamily: 'Instrument Sans',
                            fontWeight: 600,
                            fontSize: '1.2vw',
                            lineHeight: '1.2',
                            textAlign: 'center',
                        }}
                    >
                        Skills - Jun Liang
                    </div>
                    <button
                        style={{
                            width: '1.2vw',
                            minWidth: 24,
                            maxWidth: 32,
                            height: '1.2vw',
                            minHeight: 24,
                            maxHeight: 32,
                            cursor: 'pointer',
                            background: '#BA3D01',
                            border: 'none',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                            marginLeft: '0.5vw',
                        }}
                        onClick={() => setScrolling(s => !s)}
                        aria-label={scrolling ? 'Stop auto-scroll' : 'Start auto-scroll'}
                    >
                        {scrolling ? (
                            <span style={{ color: '#fff', fontWeight: 700, fontSize: '1vw' }}>&#10073;&#10073;</span>
                        ) : (
                            <span style={{ color: '#fff', fontWeight: 700, fontSize: '1vw' }}>&#9654;</span>
                        )}
                    </button>
                </div>
            </div>
            {/* Bottom Image */}
            <img
                src={bottomImage}
                alt="Bottom design element"
                style={{ position: 'absolute', left: '27vw', top: '72vh', width: '46vw', height: '46vw', minWidth: 200, minHeight: 200, objectFit: 'cover', zIndex: 1 }}
            />
            {/* Certificate Section */}
            <div
                style={{
                    position: 'absolute',
                    left: '8vw',
                    top: '55vh',
                    width: '32vw',
                    minWidth: 200,
                    maxWidth: 400,
                    color: '#FFFFFF',
                    fontFamily: 'Instrument Sans',
                    fontWeight: 600,
                    fontSize: '2.5vw',
                    lineHeight: '1.2',
                    zIndex: 3,
                }}
            >
                Certificate
            </div>
            <div
                style={{
                    position: 'absolute',
                    left: '8vw',
                    top: '65vh',
                    width: '52vw',
                    minWidth: 320,
                    maxWidth: 751,
                    height: '28vh',
                    minHeight: 180,
                    maxHeight: 304,
                    background: 'rgba(0, 0, 0, 0.33)',
                    borderRadius: 5,
                    zIndex: 2,
                    overflow: 'hidden',
                    padding: '2vw 2vw',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2vh',
                }}
            >
                <div
                    ref={certRef}
                    style={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        overflowY: 'auto',
                        paddingRight: '2vw',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                    }}
                >
                    <style>{`
                        div::-webkit-scrollbar { display: none; }
                    `}</style>
                    <div style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '1.2vw', marginBottom: '1vh' }}>Google Data Analytics Professional Certificate</div>
                    <div style={{ color: '#E8DEDE', fontWeight: 500, fontSize: '1.2vw', marginBottom: '1vh' }}>Coursera, 2024</div>
                    <div style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '1.2vw', marginBottom: '1vh' }}>AWS Certified Cloud Practitioner</div>
                    <div style={{ color: '#E8DEDE', fontWeight: 500, fontSize: '1.2vw', marginBottom: '1vh' }}>Amazon Web Services, 2025</div>
                    <div style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '1.2vw', marginBottom: '1vh' }}>TensorFlow Developer Certificate</div>
                    <div style={{ color: '#E8DEDE', fontWeight: 500, fontSize: '1.2vw', marginBottom: '1vh' }}>Google, 2024</div>
                    <div style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '1.2vw', marginBottom: '1vh' }}>Figma UI/UX Design Certificate</div>
                    <div style={{ color: '#E8DEDE', fontWeight: 500, fontSize: '1.2vw', marginBottom: '1vh' }}>Figma, 2023</div>
                </div>
            </div>
        </div>
    );
}

export default SkillPage;
