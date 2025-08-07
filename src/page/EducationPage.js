import React, { useRef, useState, useEffect } from 'react';
import educationSide from '../assets/education-side.png';

function EducationPage() {
    const descRef = useRef(null);
    const [scrolling, setScrolling] = useState(true);

    useEffect(() => {
        let interval;
        let timeout;
        let waiting = false;
        if (scrolling) {
            // Wait 1s before starting auto-scroll
            const startScroll = () => {
                interval = setInterval(() => {
                    if (descRef.current) {
                        if (descRef.current.scrollTop + descRef.current.clientHeight < descRef.current.scrollHeight) {
                            descRef.current.scrollTop += 1;
                        } else if (!waiting) {
                            // At bottom, pause 1s, then reset to top and continue
                            waiting = true;
                            clearInterval(interval);
                            setTimeout(() => {
                                if (descRef.current) descRef.current.scrollTop = 0;
                                waiting = false;
                                startScroll();
                            }, 1000);
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
            {/* Responsive Education Title */}
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
                Education
            </div>
            {/* Responsive Content container with background */}
            <div
                style={{
                    position: 'absolute',
                    left: '8vw',
                    top: '28vh',
                    width: '52vw',
                    minWidth: 320,
                    maxWidth: 751,
                    height: '62vh',
                    minHeight: 320,
                    maxHeight: 643,
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
                        overflowY: 'auto', // ensure auto-scroll works
                        paddingRight: '2vw',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                    }}
                >
                    <style>{`
                        div::-webkit-scrollbar { display: none; }
                    `}</style>
                    {/* Bachelor Section */}
                    <div style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '1.2vw', marginBottom: '1vh' }}>2023 - 2027</div>
                    <div style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '1.6vw', marginBottom: '1vh' }}>Universiti Sains Malaysia</div>
                    <div style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '1.2vw', marginBottom: '1vh' }}>Bachelor of Computer Science<br />Major in Intelligence Computing</div>
                    <div style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '1.2vw', marginBottom: '5vh' }}>CGPA: 3.65 (Dean’s List)</div>
                    {/* Matriculation Section */}
                    <div style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '1.2vw', marginBottom: '1vh' }}>2022 - 2023</div>
                    <div style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '1.6vw', marginBottom: '1vh' }}>Kedah Engineering Matriculation College</div>
                    <div style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '1.2vw', marginBottom: '1vh' }}>Matriculation in Engineering</div>
                    <div style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '1.2vw', marginBottom: '5vh' }}>CGPA: 4.00</div>
                    {/* SPM Section */}
                    <div style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '1.2vw', marginBottom: '1vh' }}>2017 - 2021</div>
                    <div style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '1.6vw', marginBottom: '1vh' }}>SMJK Phor Tay</div>
                    <div style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '1.2vw', marginBottom: '1vh' }}>Pure Science ( Physic, Chemistry, Biology )</div>
                    <div style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '1.2vw', marginBottom: '2vh' }}>SPM: 2A+ 5A 3B+</div>
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
                    src={educationSide}
                    alt="Side"
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
                        Education - Jun Liang
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
        </div>
    );
}

export default EducationPage;
