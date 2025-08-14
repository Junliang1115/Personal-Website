import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import educationImage from '../assets/education.jpg';
import experienceImage from '../assets/experience.jpg';
import projectImage from '../assets/project.jpg';
import skillImage from '../assets/skill.jpg';
import hackathonImage from '../assets/hackathon.jpg';

const cardData = [
    {
        img: educationImage,
        name: 'Education',
        rotate: -17.28,
        marginLeft: '0vw', zIndex: 5,
        path: '/education',
    },
    {
        img: experienceImage,
        name: 'Experience',
        rotate: -3.32,
        marginLeft: '-4vw', zIndex: 6,
        path: '/experience',
    },
    {
        img: skillImage,
        name: 'Skills',
        rotate: -4.3,
        marginLeft: '-4vw', zIndex: 7,
        path: '/skills',
    },
    {
        img: hackathonImage,
        name: 'Hackathons',
        rotate: 5.11,
        marginLeft: '-4vw', zIndex: 8,
        path: '/hackathon',
    },
    {
        img: projectImage,
        name: 'Projects',
        rotate: 12.01,
        marginLeft: '-4vw', zIndex: 9,
        path: '/projects',
    },
];

function JourneyPage() {
    const navigate = useNavigate();
    const [showSubtitle, setShowSubtitle] = useState(false);
    const [isHoverEnabled, setIsHoverEnabled] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const controls = useAnimation();

    const handleCardClick = (path) => {
        if (!isHoverEnabled) return;
        const clickedIndex = cardData.findIndex(card => card.path === path);
        controls.start(i => i === clickedIndex ? 'group' : 'hidden');
        setTimeout(() => navigate(path), 800);
    };

    useEffect(() => {
        const sequence = async () => {
            await controls.start('noOverlap');
            await new Promise(res => setTimeout(res, 600));
            await controls.start('visible');
            setShowSubtitle(true);
            setIsHoverEnabled(true);
        };
        sequence();
    }, []);

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.8, transition: { duration: 0.5 } },
        noOverlap: (i) => ({
            x: `${(i - (cardData.length - 1) / 2) * 7}vw`,
            y: 0,
            rotate: cardData[i].rotate,
            opacity: 1,
            scale: 1,
            transition: { type: 'spring', bounce: 0.4, delay: i * 0.2, duration: 0.8 },
        }),
        visible: (i) => ({
            x: 0,
            y: 0,
            rotate: cardData[i].rotate,
            scale: 1,
            transition: { type: 'spring', bounce: 0.3, duration: 0.5 },
        }),
        hover: (i) => ({
            y: -25,
            scale: 1.08,
            boxShadow: '0px 15px 30px 0px rgba(0,0,0,0.3)',
            zIndex: 10,
            rotate: cardData[i].rotate, // Keep the angle on hover
            transition: { type: 'spring', bounce: 0.4, duration: 0.5 },
        }),
        group: (i) => ({
            x: 0,
            y: 0,
            scale: 1.1,
            opacity: 1,
            zIndex: 10,
            transition: { type: 'spring', bounce: 0.3, duration: 0.8 },
        }),
    };

    const nameVariants = {
        initial: { opacity: 0, y: 20 },
        hover: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    };

    return (
        <div className="custom-gradient font-instrument" style={{ position: 'relative', width: '100vw', minHeight: '100vh', overflow: 'hidden' }}>
            {/* Title and Subtitle */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }} style={{ position: 'absolute', left: 0, right: 0, top: '18vh', textAlign: 'center', zIndex: 2 }}>
                <div style={{ fontFamily: 'Instrument Sans', fontWeight: 600, fontSize: '2.8vw', lineHeight: '1.2', color: '#FFFFFF' }}>A Chapter from My Memory</div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={showSubtitle ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} style={{ fontFamily: 'Instrument Sans', fontWeight: 600, fontSize: '1.2vw', lineHeight: '1.2', color: '#FFFFFF', marginTop: '2vh' }}>Pick a piece of my memory and press play.</motion.div>
            </motion.div>

            {/* Card Row */}
            <div style={{ position: 'absolute', left: 0, right: 0, top: '37vh', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', zIndex: 2 }}>
                {cardData.map((card, i) => (
                    <motion.div
                        key={card.name}
                        custom={i}
                        variants={cardVariants}
                        initial="hidden"
                        animate={!isHoverEnabled ? controls : (hoveredIndex === i ? "hover" : "visible")}
                        onHoverStart={() => isHoverEnabled && setHoveredIndex(i)}
                        onHoverEnd={() => isHoverEnabled && setHoveredIndex(null)}
                        style={{ width: '16vw', minWidth: 120, maxWidth: 260, aspectRatio: '1/1', cursor: 'pointer', boxShadow: '0px 10px 4px 0px rgba(0,0,0,0.25)', position: 'relative', marginLeft: card.marginLeft, zIndex: card.zIndex }}
                        onClick={() => handleCardClick(card.path)}
                    >
                        <img
                            src={card.img}
                            alt={card.name}
                            style={{ width: '100%', height: '100%', borderRadius: 15, objectFit: 'cover' }}
                        />
                    </motion.div>
                ))}
            </div>

            {/* Hover Name Display */}
            <motion.div
                variants={nameVariants}
                initial="initial"
                animate={hoveredIndex !== null ? "hover" : "initial"}
                style={{ position: 'absolute', bottom: '28vh', left: 0, right: 0, textAlign: 'center', color: 'white', fontWeight: 600, fontSize: '1.2vw', pointerEvents: 'none', zIndex: 10 }}
            >
                {hoveredIndex !== null && cardData[hoveredIndex].name}
            </motion.div>
        </div>
    );
}

export default JourneyPage;