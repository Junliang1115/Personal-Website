"use client";

import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import skillImage from '@/assets/skill.jpg';

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

export default function SkillPage() {
    const descRef = useRef(null);
    const certRef = useRef(null);
    const [scrolling, setScrolling] = useState(true);
    const waitingRef = useRef(false);
    const router = useRouter();

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
        <div className="min-h-screen w-full text-white pt-24 pb-32 px-6 sm:px-12 lg:px-24 font-instrument overflow-x-hidden relative">
            {/* Ambient Background Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#BA3D01]/5 blur-[120px] rounded-full -z-10 animate-pulse"></div>
            <div className="absolute bottom-20 left-10 w-[300px] h-[300px] bg-blue-600/5 blur-[100px] rounded-full -z-10"></div>

            {/* Title Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mt-12 mb-16">
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
                        <h1 className="text-4xl sm:text-6xl font-black tracking-tighter">Skills</h1>
                        <p className="text-[#BA3D01] font-bold uppercase tracking-[0.3em] text-xs mt-2">Technical Arsenal & Certs</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                {/* Left Column: Skills & Certificates */}
                <div className="lg:col-span-8 order-2 lg:order-1 flex flex-col gap-12">
                    {/* Skills Box */}
                    <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-4 sm:p-10 rounded-[2.5rem] shadow-3xl">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] mb-10 text-[#BA3D01] bg-[#BA3D01]/5 inline-block px-4 py-1.5 rounded-full border border-[#BA3D01]/20">Core Competencies</h2>
                        <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
                        <div
                            ref={descRef}
                            className="h-[300px] overflow-y-auto pr-4 no-scrollbar space-y-10 border-t border-b border-white/5 py-8"
                        >
                            <div className="group/skill">
                                <h3 className="text-sm font-bold uppercase tracking-widest text-[#BA3D01] mb-3 transition-all">Programming Languages</h3>
                                <p className="text-white text-2xl font-bold tracking-tighter group-hover/skill:text-[#BA3D01] transition-colors duration-500">Python, JavaScript, C++, Java, SQL, R, HTML, CSS</p>
                            </div>
                            <div className="group/skill">
                                <h3 className="text-sm font-bold uppercase tracking-widest text-blue-500 mb-3 transition-all">Frameworks & Libraries</h3>
                                <p className="text-white text-2xl font-bold tracking-tighter group-hover/skill:text-blue-500 transition-colors duration-500">React, Next.js, Node.js, FastAPI, Flutter, Tailwind CSS, TensorFlow, PyTorch</p>
                            </div>
                            <div className="group/skill">
                                <h3 className="text-sm font-bold uppercase tracking-widest text-purple-500 mb-3 transition-all">Tools & Platforms</h3>
                                <p className="text-white text-2xl font-bold tracking-tighter group-hover/skill:text-purple-500 transition-colors duration-500">Git, Docker, Firebase, PostgreSQL, Andriod Studio, GCP, Github, Hermes Agent</p>
                            </div>
                            <div className="group/skill">
                                <h3 className="text-sm font-bold uppercase tracking-widest text-green-500 mb-3 transition-all">Design & Soft Skills</h3>
                                <p className="text-white text-2xl font-bold tracking-tighter group-hover/skill:text-green-500 transition-colors duration-500">UI/UX Design (Figma), Scrum Methodology, Team Leadership, Problem Solving</p>
                            </div>
                        </div>
                    </div>

                    {/* Certificate Box */}
                    <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-4 sm:p-10 rounded-[2.5rem] shadow-3xl">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] mb-10 text-[#BA3D01] bg-[#BA3D01]/5 inline-block px-4 py-1.5 rounded-full border border-[#BA3D01]/20">Certifications</h2>
                        <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
                        <div
                            ref={certRef}
                            className="h-[180px] overflow-y-auto pr-4 no-scrollbar space-y-12 border-t border-b border-white/5"
                        >
                            <div className="relative pl-10 border-l border-white/10">
                                <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] group-hover/cert:scale-150 transition-transform"></div>
                                <h3 className="text-2xl font-black text-white group-hover/cert:text-blue-500 transition-colors tracking-tight leading-none mb-2">ACA Cloud Computing</h3>
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 italic">Alibaba Cloud • 2024</p>
                            </div>
                            <div className="relative pl-10 border-l border-white/10">
                                <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)] group-hover/cert:scale-150 transition-transform"></div>
                                <h3 className="text-2xl font-black text-white group-hover/cert:text-purple-500 transition-colors tracking-tight leading-none mb-2">HCIA-AI Specialist</h3>
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 italic">Huawei • 2025</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Visual & Controls */}
                <div className="lg:col-span-4 order-1 lg:order-2 sticky top-32 flex flex-col items-center">
                    <div className="relative group w-full max-w-[280px] sm:max-w-sm">
                        {/* Orbiting Ring Effect */}
                        <div className="absolute -inset-4 border border-[#BA3D01]/10 rounded-[3rem] animate-[spin_10s_linear_infinite] pointer-events-none">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#BA3D01] rounded-full blur-[2px]"></div>
                        </div>

                        <div className="absolute -inset-2 bg-gradient-to-r from-[#BA3D01] via-blue-600 to-green-500 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                        <div className="aspect-w-1 aspect-h-1 relative w-full overflow-hidden rounded-[2rem] border border-white/10 shadow-3xl bg-black">
                            <Image
                                src={skillImage}
                                alt="Skills"
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
                            A comprehensive map of technical proficiencies and industry recognized certifications.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
