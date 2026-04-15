"use client";

import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import hackathonSide from '@/assets/hackathon.jpg';

// images are mapped in the component

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

export default function HackathonPage() {
    const router = useRouter();
    const descRef = useRef(null);
    const [scrolling, setScrolling] = useState(true);
    const [hackathonList, setHackathonList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/hackathons')
            .then(res => res.json())
            .then(data => {
                setHackathonList(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch hackathons:', err);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        let interval;
        let timeout;
        if (scrolling && !loading) {
            const startScroll = () => {
                interval = setInterval(() => {
                    if (descRef.current) {
                        if (descRef.current.scrollTop + descRef.current.clientHeight < descRef.current.scrollHeight) {
                            descRef.current.scrollTop += 1;
                        } else {
                            descRef.current.scrollTop = 0;
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
    }, [scrolling, loading]);

    return (
        <div className="min-h-screen w-full text-white pt-24 pb-32 px-6 sm:px-12 lg:px-24 font-instrument overflow-x-hidden relative">
            {/* Ambient Background Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#BA3D01]/5 blur-[120px] rounded-full -z-10 animate-pulse"></div>
            <div className="absolute bottom-20 left-10 w-[300px] h-[300px] bg-blue-600/5 blur-[100px] rounded-full -z-10 font-instrument"></div>

            {/* Title Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row md:items-center justify-between gap-6 mt-12 mb-16"
            >
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => router.back()}
                        className="p-4 rounded-2xl transition-all group active:scale-95"
                        aria-label="Back"
                    >
                        <svg className="group-hover:-translate-x-1 transition-transform" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="19" y1="12" x2="5" y2="12" />
                            <polyline points="12 19 5 12 12 5" />
                        </svg>
                    </button>
                    <div>
                        <h1 className="text-4xl sm:text-6xl font-black tracking-tighter">Hackathons</h1>
                        <p className="text-[#BA3D01] font-bold uppercase tracking-[0.3em] text-xs mt-2">Competing & Building at Scale</p>
                    </div>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                {/* Left Column: Hackathon List */}
                <div className="lg:col-span-8 order-2 lg:order-1">
                    <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-4 sm:p-8 shadow-3xl">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center h-full min-h-[500px] space-y-6">
                                <div className="w-16 h-16 border-4 border-[#BA3D01] border-t-transparent rounded-full animate-spin shadow-[0_0_30px_rgba(186,61,1,0.2)]"></div>
                                <p className="text-gray-500 font-bold uppercase tracking-[0.4em] text-xs">Retrieving Experiences</p>
                            </div>
                        ) : (
                            <div
                                ref={descRef}
                                className="h-[600px] overflow-y-auto pr-4 no-scrollbar border-t border-b border-white/5 py-6"
                            >
                                <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
                                <motion.div
                                    initial="hidden"
                                    animate="visible"
                                    variants={{
                                        visible: {
                                            transition: {
                                                staggerChildren: 0.15
                                            }
                                        }
                                    }}
                                    className="flex flex-col gap-8"
                                >
                                    {hackathonList.map((hackathon, index) => (
                                        <motion.div
                                            key={index}
                                            variants={{
                                                hidden: { opacity: 0, y: 20 },
                                                visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 20 } }
                                            }}
                                            className="group relative flex flex-col sm:flex-row items-center gap-4 p-6 rounded-[2rem] cursor-pointer bg-white/[0.03] border border-white/5 hover:border-[#BA3D01]/40 hover:bg-white/[0.06] transition-all duration-500 overflow-hidden shadow-xl"
                                            onClick={() => router.push(`/hackathon/${hackathon.name.replace(/\s/g, '-')}`)}
                                        >
                                            {/* Edge Shine Effect */}
                                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                                            {/* Info Content */}
                                            <div className="flex-1 w-full text-center sm:text-left space-y-4">
                                                <div className="flex flex-wrap justify-center sm:justify-start items-center gap-3">
                                                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#BA3D01] bg-[#BA3D01]/10 px-3 py-1 rounded-full border border-[#BA3D01]/20">
                                                        {hackathon.type || 'Hackathon'}
                                                    </span>
                                                    <span className="text-[9px] font-bold text-gray-500 uppercase tracking-[0.2em]">
                                                        {hackathon.teamname}
                                                    </span>
                                                </div>

                                                <h3 className="text-3xl sm:text-2xl font-black text-white group-hover:text-[#BA3D01] transition-colors leading-none tracking-tighter">
                                                    {hackathon.name}
                                                </h3>

                                                <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm">
                                                    <p className="text-gray-400 font-medium">
                                                        Project: <span className="text-white font-bold">{hackathon.projectname}</span>
                                                    </p>
                                                    <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-white/20"></div>
                                                    <p className="text-gray-500 italic">2024 - 2025</p>
                                                </div>
                                            </div>

                                            {/* Action Icon */}
                                            <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 group-hover:bg-[#BA3D01] group-hover:border-[#BA3D01] group-hover:rotate-12 transition-all duration-500 text-white shadow-2xl">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="9 18 15 12 9 6" />
                                                </svg>
                                            </div>
                                        </motion.div>
                                    ))}

                                    <div className="h-20"></div>
                                </motion.div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Visual */}
                <div className="lg:col-span-4 order-1 lg:order-2 sticky top-32 flex flex-col items-center">
                    <div className="relative group w-full max-w-[280px] sm:max-w-sm">
                        {/* Orbiting Ring Effect */}
                        <div className="absolute -inset-4 border border-[#BA3D01]/10 rounded-[3rem] animate-[spin_10s_linear_infinite] pointer-events-none">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#BA3D01] rounded-full blur-[2px]"></div>
                        </div>

                        <div className="absolute -inset-2 bg-gradient-to-r from-[#BA3D01] via-purple-600 to-blue-600 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                        <div className="aspect-w-1 aspect-h-1 relative w-full overflow-hidden rounded-[2rem] border border-white/10 shadow-3xl bg-black">
                            <Image
                                src={hackathonSide}
                                alt="Hackathons"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-[2000ms]"
                            />
                        </div>
                    </div>

                    <div className="mt-12 flex flex-col items-center text-center">
                        <div className="flex items-center gap-5 p-2 pr-6 bg-white/5 rounded-full border border-white/10 backdrop-blur-xl shadow-2xl group/toggle">
                            <button
                                className="w-12 h-12 rounded-full bg-[#BA3D01] hover:bg-[#d44501] flex items-center justify-center transition-all shadow-[0_0_20px_rgba(186,61,1,0.3)] active:scale-95 z-10"
                                onClick={() => setScrolling(s => !s)}
                            >
                                {scrolling ? (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
                                ) : (
                                    <svg className="ml-1" width="20" height="20" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                                )}
                            </button>
                            <div className="flex flex-col items-start">
                                <span className="font-black text-xs text-white uppercase tracking-widest leading-none">Auto Sequence</span>
                                <span className="text-[9px] text-gray-500 uppercase font-bold tracking-tighter mt-1">{scrolling ? 'Active System' : 'System Paused'}</span>
                            </div>
                        </div>
                        <p className="mt-6 text-[10px] text-gray-500 uppercase font-bold tracking-[0.2em] italic max-w-[200px] leading-relaxed">
                            A curated timeline of competitive building and algorithmic challenges.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
