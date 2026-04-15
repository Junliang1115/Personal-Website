"use client";

import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import educationImage from '@/assets/education.jpg';

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

export default function EducationPage() {
    const router = useRouter();
    const descRef = useRef(null);
    const [scrolling, setScrolling] = useState(false);

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
    }, [scrolling]);

    return (
        <div className="min-h-screen w-full text-white pt-24 pb-32 px-6 sm:px-12 lg:px-24 font-instrument overflow-x-hidden relative">
            {/* Ambient Background Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#BA3D01]/5 blur-[120px] rounded-full -z-10 animate-pulse"></div>
            <div className="absolute bottom-20 left-10 w-[300px] h-[300px] bg-blue-600/5 blur-[100px] rounded-full -z-10"></div>

            {/* Title Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mt-12 mb-12">
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
                        <h1 className="text-4xl sm:text-6xl font-black tracking-tighter">Education</h1>
                        <p className="text-[#BA3D01] font-bold uppercase tracking-[0.3em] text-xs mt-2">Academic Foundation</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                {/* Left Column: Timeline */}
                <div className="lg:col-span-8 order-2 lg:order-1">
                    <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-4 sm:p-10 rounded-[2.5rem] shadow-3xl">
                        <div
                            ref={descRef}
                            className="h-[500px] overflow-y-auto pr-6 no-scrollbar border-t border-b border-white/5 py-6"
                        >
                            <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
                            <div className="space-y-12">
                                {[
                                    {
                                        year: "2023 - 2027",
                                        school: "Universiti Sains Malaysia",
                                        degree: "Bachelor of Computer Science",
                                        major: "Intelligence Computing",
                                        stats: "CGPA: 3.69 (First Class)"
                                    },
                                    {
                                        year: "2022 - 2023",
                                        school: "Kedah Engineering Matriculation College",
                                        degree: "Matriculation",
                                        major: "Engineering",
                                        stats: "CGPA: 4.00"
                                    },
                                    {
                                        year: "2017 - 2021",
                                        school: "SMJK Phor Tay",
                                        degree: "Pure Science",
                                        major: "Physic, Chemistry, Biology",
                                        stats: "SPM: 2A+ 5A 3B+"
                                    }
                                ].map((edu, i) => (
                                    <div key={i} className="group/item relative pl-10 border-l border-white/10 hover:border-[#BA3D01]/50 transition-colors">
                                        <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-[#BA3D01] shadow-[0_0_15px_rgba(186,61,1,0.5)] group-hover/item:scale-150 transition-transform"></div>
                                        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[#BA3D01] mb-2">{edu.year}</div>
                                        <h3 className="text-2xl sm:text-3xl font-black text-white group-hover/item:text-[#BA3D01] transition-colors tracking-tight leading-none mb-3">{edu.school}</h3>
                                        <div className="text-lg sm:text-xl text-gray-200 font-bold mb-1">{edu.degree} <span className="text-gray-500 font-medium">/ {edu.major}</span></div>
                                        <div className="text-sm font-bold uppercase tracking-widest text-gray-400 mt-2 italic">{edu.stats}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Visual */}
                <div className="lg:col-span-4 order-1 lg:order-2 sticky top-32 flex flex-col items-center">
                    <div className="relative group w-full max-w-[280px] sm:max-w-sm">
                        {/* Orbiting Ring Effect */}
                        <div className="absolute -inset-4 border border-[#BA3D01]/10 rounded-[3rem] animate-[spin_10s_linear_infinite] pointer-events-none">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#BA3D01] rounded-full blur-[2px]"></div>
                        </div>

                        <div className="absolute -inset-2 bg-gradient-to-r from-[#BA3D01] via-blue-600 to-purple-600 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                        <div className="aspect-w-1 aspect-h-1 relative w-full overflow-hidden rounded-[2rem] border border-white/10 shadow-3xl bg-black">
                            <Image
                                src={educationImage}
                                alt="Education"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-[2000ms]"
                            />
                        </div>
                    </div>

                    <div className="mt-12 flex flex-col items-center text-center">
                        <div className="flex items-center gap-5 p-2 pr-6 bg-white/5 rounded-full border border-white/10 backdrop-blur-xl shadow-2xl">
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
                            <div className="flex flex-col items-start text-left">
                                <span className="font-black text-xs text-white uppercase tracking-widest leading-none">Auto Sequence</span>
                                <span className="text-[9px] text-gray-500 uppercase font-bold tracking-tighter mt-1">{scrolling ? 'Active System' : 'System Paused'}</span>
                            </div>
                        </div>
                        <p className="mt-6 text-[10px] text-gray-500 uppercase font-bold tracking-[0.2em] italic max-w-[200px] leading-relaxed">
                            A track record of academic excellence and continuous growth.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
