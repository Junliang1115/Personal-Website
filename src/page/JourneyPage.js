import { useNavigate } from 'react-router-dom';
import bottomImage from '../assets/bottom-image.png';
import educationImage from '../assets/education.jpg';
import experienceImage from '../assets/experience.jpg';
import projectImage from '../assets/project.jpg';
import skillImage from '../assets/skill.jpg';
import hackathonImage from '../assets/hackathon.jpg';

function JourneyPage() {
    const navigate = useNavigate();
    return (
        <div className="custom-gradient font-instrument" style={{ position: 'relative', width: '100vw', minHeight: '100vh', overflow: 'hidden' }}>
            {/* Title */}
            <div style={{
                position: 'absolute', left: 0, right: 0, top: '18vh', textAlign: 'center',
                fontFamily: 'Instrument Sans', fontWeight: 600, fontSize: '2.8vw', lineHeight: '1.2', color: '#FFFFFF', zIndex: 2,
            }}>
                A Chapter from My Memory
            </div>
            {/* Subtitle */}
            <div style={{
                position: 'absolute', left: 0, right: 0, top: '27vh', textAlign: 'center',
                fontFamily: 'Instrument Sans', fontWeight: 600, fontSize: '1.2vw', lineHeight: '1.2', color: '#FFFFFF', zIndex: 2,
            }}>
                Pick a piece of my memory and press play.
            </div>
            {/* Card Row */}
            <div
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: '37vh',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    gap: 0, // Remove gap for overlap
                    zIndex: 2,
                    flexWrap: 'nowrap', // Prevent wrapping for overlap
                    pointerEvents: 'none', // Prevent parent from blocking pointer events
                }}
            >
                <div style={{ width: '16vw', minWidth: 120, maxWidth: 260, aspectRatio: '1/1', cursor: 'pointer', transform: 'rotate(-17.28deg)', boxShadow: '0px 10px 4px 0px rgba(0,0,0,0.25)', marginLeft: 0, pointerEvents: 'auto', zIndex: 5 }} onClick={() => navigate('/education')}>
                    <img
                        src={educationImage}
                        alt="Memory 1"
                        style={{ width: '100%', height: '100%', borderRadius: 15, objectFit: 'cover' }}
                    />
                </div>
                <div style={{ width: '16vw', minWidth: 120, maxWidth: 260, aspectRatio: '1/1', cursor: 'pointer', transform: 'rotate(-3.32deg)', boxShadow: '0px 10px 4px 0px rgba(0,0,0,0.25)', marginLeft: '-4vw', pointerEvents: 'auto', zIndex: 6 }} onClick={() => navigate('/experience')}>
                    <img
                        src={experienceImage}
                        alt="Memory 2"
                        style={{ width: '100%', height: '100%', borderRadius: 15, objectFit: 'cover' }}
                    />
                </div>
                <div style={{ width: '16vw', minWidth: 120, maxWidth: 260, aspectRatio: '1/1', cursor: 'pointer', transform: 'rotate(-4.3deg)', boxShadow: '0px 10px 4px 0px rgba(0,0,0,0.25)', marginLeft: '-4vw', pointerEvents: 'auto', zIndex: 7 }} onClick={() => navigate('/skills')}>
                    <img
                        src={skillImage}
                        alt="Memory 3"
                        style={{ width: '100%', height: '100%', borderRadius: 15, objectFit: 'cover' }}
                    />
                </div>
                <div style={{ width: '16vw', minWidth: 120, maxWidth: 260, aspectRatio: '1/1', cursor: 'pointer', transform: 'rotate(5.11deg)', boxShadow: '0px 10px 4px 0px rgba(0,0,0,0.25)', marginLeft: '-4vw', pointerEvents: 'auto', zIndex: 8 }} onClick={() => window.location.href = '/hackathon'}>
                    <img
                        src={hackathonImage}
                        alt="Memory 4"
                        style={{ width: '100%', height: '100%', borderRadius: 15, objectFit: 'cover' }}
                    />
                </div>
                <div style={{ width: '16vw', minWidth: 120, maxWidth: 260, aspectRatio: '1/1', cursor: 'pointer', transform: 'rotate(12.01deg)', boxShadow: '0px 10px 4px 0px rgba(0,0,0,0.25)', marginLeft: '-4vw', pointerEvents: 'auto', zIndex: 9 }} onClick={() => window.location.href = '/projects'}>
                    <img
                        src={projectImage}
                        alt="Memory 5"
                        style={{ width: '100%', height: '100%', borderRadius: 15, objectFit: 'cover' }}
                    />
                </div>
            </div>
            {/* Bottom image */}
            <img
                src={bottomImage}
                alt="Bottom design element"
                style={{ position: 'absolute', left: '50%', top: '70vh', transform: 'translateX(-50%)', width: '40vw', minWidth: 180, maxWidth: 600, height: 'auto', objectFit: 'cover', zIndex: 1 }}
            />
        </div>
    );
}

export default JourneyPage;