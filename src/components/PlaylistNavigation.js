"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaStepBackward, FaStepForward, FaPlay } from 'react-icons/fa';

const playlist = [
    { name: 'About me', path: '/' },
    { name: 'Journey', path: '/journey' },
    { name: 'Education', path: '/education' },
    { name: 'Experience', path: '/experience' },
    { name: 'Skills', path: '/skills' },
    { name: 'Hackathons', path: '/hackathon' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' }
];

export default function PlaylistNavigation() {
    const router = useRouter();
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            if (window.innerWidth < 1024) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        const handleMouseMove = (e) => {
            if (window.innerWidth >= 1024) {
                if (window.innerHeight - e.clientY < 150) {
                    setIsVisible(true);
                } else {
                    setIsVisible(false);
                }
            }
        };

        // Initial check
        checkMobile();

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', checkMobile);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    // Find current index with smarter matching
    const currentIndex = playlist.findIndex(item => {
        if (item.path === '/') return pathname === '/';
        return pathname.startsWith(item.path);
    });

    const activeIndex = currentIndex === -1 ? 0 : currentIndex;
    const prevIndex = (activeIndex - 1 + playlist.length) % playlist.length;
    const nextIndex = (activeIndex + 1) % playlist.length;

    const handleNavigation = (path) => {
        router.push(path);
    };

    return (
        <>
            {/* Minimalist Guide Bar - Absolute Centered relative to screen */}
            <div className="fixed bottom-0 left-0 right-0 z-[90] pointer-events-none pb-4">
                <motion.div
                    animate={{
                        opacity: isVisible ? 0 : 0.8,
                        y: isVisible ? 20 : 0
                    }}
                    className="flex flex-col items-center gap-2 pointer-events-auto cursor-help"
                >
                    <div className="flex gap-1 items-end h-3 mb-1">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <motion.div
                                key={i}
                                animate={{ height: [4, 12, 6, 14, 4] }}
                                transition={{ duration: 0.8 + (i * 0.1), repeat: Infinity, delay: i * 0.1 }}
                                className="w-1 bg-[#BA3D01] rounded-full"
                            />
                        ))}
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-[0.4em] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                        Hover to navigate
                    </span>
                    <div className="w-16 h-[2px] bg-white/20 rounded-full" />
                </motion.div>
            </div>

            <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-[100] w-full max-w-sm px-6 pb-6 pointer-events-none">
                <motion.div
                    initial={false}
                    animate={{
                        y: isVisible ? 0 : 150,
                        opacity: isVisible ? 1 : 0,
                        scale: isVisible ? 1 : 0.95
                    }}
                    transition={{
                        type: 'spring',
                        damping: 25,
                        stiffness: 200,
                        mass: 0.8
                    }}
                    className="bg-black/95 backdrop-blur-3xl border border-white/10 rounded-3xl p-5 flex flex-col gap-4 shadow-[0_30px_100px_rgba(0,0,0,0.8)] pointer-events-auto"
                >
                    {/* Header: Track Status */}
                    <div className="flex items-center justify-between border-b border-white/5 pb-3">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[#BA3D01]/10 flex items-center justify-center">
                                <FaPlay className="text-[10px] text-[#BA3D01]" />
                            </div>
                            <div>
                                <p className="text-[9px] uppercase font-black tracking-[0.3em] text-[#BA3D01]">Chapter</p>
                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Track 0{activeIndex + 1} of 0{playlist.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                        {/* Previous Button */}
                        <button
                            onClick={() => handleNavigation(playlist[prevIndex].path)}
                            className="p-3 text-gray-400 hover:text-[#BA3D01] hover:bg-white/5 rounded-2xl transition-all group lg:active:scale-95"
                            title={`Previous: ${playlist[prevIndex].name}`}
                        >
                            <FaStepBackward className="text-xl" />
                        </button>

                        {/* Track Info */}
                        <div className="flex flex-col items-center flex-1 min-w-0">
                            <div className="flex gap-1 items-end h-3 mb-1.5 min-h-[12px]">
                                {[1, 2, 3, 4, 5, 6].map(i => (
                                    <motion.div
                                        key={i}
                                        animate={{ height: [4, 12, 6, 14, 4] }}
                                        transition={{ duration: 0.8 + (i * 0.1), repeat: Infinity, delay: i * 0.1 }}
                                        className="w-1 bg-[#BA3D01] rounded-full"
                                    />
                                ))}
                            </div>
                            <h4 className="text-sm font-black text-white tracking-tight truncate w-full text-center uppercase">
                                {playlist[activeIndex].name}
                            </h4>
                        </div>

                        {/* Next Button */}
                        <button
                            onClick={() => handleNavigation(playlist[nextIndex].path)}
                            className="p-3 text-gray-400 hover:text-[#BA3D01] hover:bg-white/5 rounded-2xl transition-all group lg:active:scale-95"
                            title={`Next: ${playlist[nextIndex].name}`}
                        >
                            <FaStepForward className="text-xl" />
                        </button>
                    </div>

                    {/* Progress Visual */}
                    <div className="space-y-2">
                        <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: '0%' }}
                                animate={{ width: `${((activeIndex + 1) / playlist.length) * 100}%` }}
                                transition={{ type: 'spring', damping: 20 }}
                                className="h-full bg-gradient-to-r from-[#BA3D01]/50 to-[#BA3D01]"
                            />
                        </div>
                        <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-gray-600">
                            <span>Side A</span>
                            <span>USM/2026</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </>
    );
}
