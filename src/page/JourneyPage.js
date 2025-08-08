import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import educationImage from '../assets/education.jpg';
import experienceImage from '../assets/experience.jpg';
import projectImage from '../assets/project.jpg';
import skillImage from '../assets/skill.jpg';
import hackathonImage from '../assets/hackathon.jpg';

const cardData = [
    {
        img: educationImage,
        alt: 'Memory 1',
        rotate: -17.28,
        marginLeft: 0, zIndex: 5,
        onClick: (navigate) => navigate('/education'),
    },
    {
        img: experienceImage,
        alt: 'Memory 2',
        rotate: -3.32,
        marginLeft: '-4vw', zIndex: 6,
        onClick: (navigate) => navigate('/experience'),
    },
    {
        img: skillImage,
        alt: 'Memory 3',
        rotate: -4.3,
        marginLeft: '-4vw', zIndex: 7,
        onClick: (navigate) => navigate('/skills'),
    },
    {
        img: hackathonImage,
        alt: 'Memory 4',
        rotate: 5.11,
        marginLeft: '-4vw', zIndex: 8,
        onClick: () => { window.location.href = '/hackathon'; },
    },
    {
        img: projectImage,
        alt: 'Memory 5',
        rotate: 12.01,
        marginLeft: '-4vw', zIndex: 9,
        onClick: () => { window.location.href = '/projects'; },
    },
];

const cardVariants = {
    hidden: (i) => ({ scale: 0.7, opacity: 0, y: 80, rotate: cardData[i].rotate }),
    visible: (i) => ({
        scale: 1,
        opacity: 1,
        y: 0,
        rotate: cardData[i].rotate,
        transition: {
            type: 'spring',
            bounce: 0.5,
            delay: i * 0.18,
            duration: 0.7,
        },
    }),
};

function JourneyPage() {
    const navigate = useNavigate();
    const [showSubtitle, setShowSubtitle] = useState(false);

    // Show subtitle after last card animates in
    const handleLastCardAnimationComplete = () => {
        setTimeout(() => setShowSubtitle(true), 150);
    };

    return (
        <div className="custom-gradient font-instrument" style={{ position: 'relative', width: '100vw', minHeight: '100vh', overflow: 'hidden' }}>
            {/* Title */}
            <div style={{
                position: 'absolute', left: 0, right: 0, top: '18vh', textAlign: 'center',
                fontFamily: 'Instrument Sans', fontWeight: 600, fontSize: '2.8vw', lineHeight: '1.2', color: '#FFFFFF', zIndex: 2,
            }}>
                A Chapter from My Memory
            </div>
            {/* Subtitle (animated) */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={showSubtitle ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0 }}
                style={{
                    position: 'absolute', left: 0, right: 0, top: '27vh', textAlign: 'center',
                    fontFamily: 'Instrument Sans', fontWeight: 600, fontSize: '1.2vw', lineHeight: '1.2', color: '#FFFFFF', zIndex: 2,
                }}
            >
                Pick a piece of my memory and press play.
            </motion.div>
            {/* Card Row (animated) */}
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
                    gap: 0,
                    zIndex: 2,
                    flexWrap: 'nowrap',
                    pointerEvents: 'none',
                }}
            >
                {cardData.map((card, i) => (
                    <motion.div
                        key={i}
                        custom={i}
                        initial="hidden"
                        animate="visible"
                        variants={cardVariants}
                        onAnimationComplete={i === cardData.length - 1 ? handleLastCardAnimationComplete : undefined}
                        style={{
                            width: '16vw', minWidth: 120, maxWidth: 260, aspectRatio: '1/1', cursor: 'pointer', boxShadow: '0px 10px 4px 0px rgba(0,0,0,0.25)', pointerEvents: 'auto', position: 'relative', ...card.style
                        }}
                        onClick={() => card.onClick(navigate)}
                    >
                        <img
                            src={card.img}
                            alt={card.alt}
                            style={{ width: '100%', height: '100%', borderRadius: 15, objectFit: 'cover' }}
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default JourneyPage;