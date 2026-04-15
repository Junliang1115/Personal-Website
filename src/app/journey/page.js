"use client";

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import educationImage from '@/assets/education.jpg';
import experienceImage from '@/assets/experience.jpg';
import skillImage from '@/assets/skill.jpg';
import hackathonImage from '@/assets/hackathon.jpg';

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
        marginLeft: '-3vw', zIndex: 6,
        path: '/experience',
    },
    {
        img: skillImage,
        name: 'Skills',
        rotate: -4.3,
        marginLeft: '-3vw', zIndex: 7,
        path: '/skills',
    },
    {
        img: hackathonImage,
        name: 'Hackathons',
        rotate: 5.11,
        marginLeft: '-3vw', zIndex: 8,
        path: '/hackathon',
    },
];

export default function JourneyPage() {
    const router = useRouter();
    const [showSubtitle, setShowSubtitle] = useState(false);
    const [isHoverEnabled, setIsHoverEnabled] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [isMounted, setIsMounted] = useState(false);
    const controls = useAnimation();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;

        const sequence = async () => {
            try {
                await controls.start('noOverlap');
                await new Promise(res => setTimeout(res, 600));
                await controls.start('visible');
                setShowSubtitle(true);
                setIsHoverEnabled(true);
            } catch (error) {
                console.warn("Animation sequence interrupted:", error);
            }
        };
        sequence();
    }, [controls, isMounted]);

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        noOverlap: (i) => {
            const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
            return {
                x: 0,
                y: 0,
                rotate: isMobile ? 0 : cardData[i].rotate,
                opacity: 1,
                scale: 1,
                transition: { type: 'spring', bounce: 0.4, delay: i * 0.15, duration: 0.8 },
            };
        },
        visible: (i) => {
            const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
            return {
                x: 0,
                y: 0,
                rotate: isMobile ? 0 : cardData[i].rotate,
                scale: 1,
                zIndex: cardData[i].zIndex,
                marginLeft: isMobile ? 0 : (cardData[i].marginLeft === '0vw' ? '0vw' : '-3vw'),
                transition: { type: 'spring', bounce: 0.3, duration: 0.5 },
            };
        },
        hover: (i) => ({
            y: -40,
            scale: 1.1,
            zIndex: 50,
            rotate: 0,
            transition: { type: 'spring', bounce: 0.4, duration: 0.4 },
        }),
    };

    const nameVariants = {
        initial: { opacity: 0, y: 20 },
        hover: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-transparent overflow-hidden px-6 pt-20 pb-32 font-instrument">
            {/* Header Text */}
            <div className="text-center mb-10 lg:mb-14 z-20 mt-12 lg:mt-24">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
                        A Chapter from My Memory
                    </h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={showSubtitle ? { opacity: 1 } : {}}
                        className="text-lg sm:text-xl text-gray-400 font-medium"
                    >
                        Pick a piece of my memory and press play.
                    </motion.p>
                </motion.div>
            </div>

            {/* Cards Container */}
            <div className="relative w-full max-w-5xl grid grid-cols-2 lg:flex lg:flex-row items-center justify-center gap-x-4 gap-y-16 lg:gap-0 mt-8 pb-32 lg:pb-0 min-h-[500px] lg:min-h-0">
                {cardData.map((card, i) => (
                    <motion.div
                        key={card.name}
                        custom={i}
                        variants={cardVariants}
                        initial="hidden"
                        animate={hoveredIndex === i ? "hover" : (isHoverEnabled ? "visible" : controls)}
                        onHoverStart={() => isHoverEnabled && setHoveredIndex(i)}
                        onHoverEnd={() => isHoverEnabled && setHoveredIndex(null)}
                        className="relative cursor-pointer transition-shadow mx-auto lg:mx-0"
                        style={{
                            width: 'min(160px, 40vw)', // Smaller for 2x2 grid
                            aspectRatio: '1/1',
                            boxShadow: '0px 20px 40px -10px rgba(0,0,0,0.5)',
                            zIndex: hoveredIndex === i ? 50 : card.zIndex,
                        }}
                        onClick={() => isHoverEnabled && router.push(card.path)}
                    >
                        {/* Mobile Text Label (Optimized for Grid) */}
                        <div className="absolute -bottom-10 left-0 right-0 text-center lg:hidden">
                            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-[#BA3D01] block mb-0.5">
                                Track 0{i + 1}
                            </span>
                            <h4 className="text-[13px] font-black text-white tracking-tight leading-none uppercase">{card.name}</h4>
                        </div>

                        <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 group shadow-2xl">
                            <Image
                                src={card.img}
                                alt={card.name}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>

                            {/* CD Hole Effect for more Music Vibe */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-[#BA3D01]"></div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {hoveredIndex !== null && (
                <div className="fixed bottom-[16vh] left-0 right-0 flex justify-center pointer-events-none z-[110]">
                    <motion.div
                        variants={nameVariants}
                        initial="initial"
                        animate="hover"
                        className="bg-black/40 backdrop-blur-2xl border border-white/10 px-8 py-3 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                    >
                        <span className="text-white font-black uppercase tracking-[0.3em] text-xs">
                            {cardData[hoveredIndex].name}
                        </span>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
