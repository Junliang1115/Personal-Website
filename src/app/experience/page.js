"use client";

import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import experienceImage from '@/assets/experience.jpg';

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

export default function ExperiencePage() {
    const expRef = useRef(null);
    const [scrolling, setScrolling] = useState(true);
    const waitingRef = useRef(false);
    const router = useRouter();

    useEffect(() => {
        let interval;
        let timeout;
        if (scrolling) {
            const startScroll = () => {
                interval = setInterval(() => {
                    if (expRef.current) {
                        if (expRef.current.scrollTop + expRef.current.clientHeight < expRef.current.scrollHeight) {
                            expRef.current.scrollTop += 1;
                        } else {
                            expRef.current.scrollTop = 0;
                        }
                    }
                }, 20);
            };
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
                        <h1 className="text-4xl sm:text-6xl font-black tracking-tighter">Experience</h1>
                        <p className="text-[#BA3D01] font-bold uppercase tracking-[0.3em] text-xs mt-2">Professional Journey & Roles</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                {/* Left Column: Experience Details */}
                <div className="lg:col-span-8">
                    <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-4 sm:p-10 shadow-3xl relative overflow-hidden group">
                        <div
                            ref={expRef}
                            className="h-[650px] overflow-y-auto pr-6 no-scrollbar border-t border-b border-white/5 py-6"
                        >
                            <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
                            <div className="space-y-12">
                                {[
                                    {
                                        title: "AI Engineer Intern",
                                        company: "AIngineer SDN. BHD.",
                                        date: "March 2026 - Aug 2026",
                                        location: "Kuala Lumpur, Malaysia",
                                        description: [
                                            "Design, develop and maintain end-to-end AI systems pipelines",
                                            "Develop and integrate APIs, microservices and frontend components to deliver AI-powered applications",
                                            "Design and implement efficient, scalable data pipelines for data processing and model training",
                                            "Optimize system performance across frontend, backend and AI components for scalability, security and reliability",
                                            "Work with cloud-based platforms to manage data flow, model deployment and application delivery"
                                        ]
                                    },
                                    {
                                        title: "Head Executive of Sponsorship Department",
                                        company: "V HACK 2025",
                                        date: "2024 - 2025",
                                        location: "USM, Penang",
                                        description: [
                                            "Leading a team to secure high-value corporate sponsorships for a flagship hackathon.",
                                            "Managing stakeholder relations and negotiating partnership agreements.",
                                            "Coordinating sponsorship fulfillment and budget allocation."
                                        ]
                                    },
                                    {
                                        title: "Associate Director of Growth Marketing",
                                        company: "CS Society USM",
                                        date: "2023 - 2024",
                                        location: "USM, Penang",
                                        description: [
                                            "Driving community engagement and digital presence for the Computer Science society.",
                                            "Implementing data-driven marketing strategies to increase event participation.",
                                            "Managing social media channels and content creation workflows."
                                        ]
                                    },
                                    {
                                        title: "Sponsorship Lead",
                                        company: "Google Developer Group George Town",
                                        date: "2024",
                                        location: "George Town, Penang",
                                        description: [
                                            "Connecting local tech communities with Google Developer Group initiatives.",
                                            "Securing venue and catering partnerships for large-scale developer events.",
                                            "Facilitating networking opportunities for local talent and industry leaders."
                                        ]
                                    }
                                ].map((exp, idx) => (
                                    <div key={idx} className="group/item relative pl-8 border-l border-white/10 hover:border-[#BA3D01]/50 transition-colors pb-4">
                                        {/* Timeline Dot */}
                                        <div className="absolute left-[-5px] top-2 w-2.5 h-2.5 rounded-full bg-[#BA3D01] shadow-[0_0_15px_#BA3D01] group-hover/item:scale-150 transition-transform"></div>

                                        <div className="flex flex-col gap-1 mb-4">
                                            <h3 className="text-2xl sm:text-3xl font-black text-white group-hover/item:text-[#BA3D01] transition-colors tracking-tight">{exp.title}</h3>
                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-400 font-bold uppercase tracking-widest">
                                                <span className="text-white">{exp.company}</span>
                                                <span className="hidden sm:inline w-1.5 h-1.5 rounded-full bg-white/20"></span>
                                                <span className="text-gray-500">{exp.date}</span>
                                            </div>
                                            <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] italic">{exp.location}</p>
                                        </div>

                                        <ul className="space-y-4">
                                            {exp.description.map((desc, i) => (
                                                <li key={i} className="flex items-start gap-3 text-base text-gray-300 leading-relaxed font-medium">
                                                    <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[#BA3D01]/40 shrink-0"></span>
                                                    <span>{desc}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Visual */}
                <div className="lg:col-span-4 sticky top-32 flex flex-col items-center">
                    <div className="relative group w-full max-w-sm">
                        {/* Orbiting Ring Effect */}
                        <div className="absolute -inset-4 border border-[#BA3D01]/10 rounded-[3rem] animate-[spin_10s_linear_infinite] pointer-events-none">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#BA3D01] rounded-full blur-[2px]"></div>
                        </div>

                        <div className="absolute -inset-2 bg-gradient-to-r from-[#BA3D01] via-blue-600 to-purple-600 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                        <div className="aspect-w-1 aspect-h-1 relative w-full overflow-hidden rounded-[2rem] border border-white/10 shadow-3xl bg-black">
                            <Image
                                src={experienceImage}
                                alt="Experience"
                                fill
                                className="rounded-3xl object-cover border border-white/10 shadow-2xl group-hover:scale-105 transition-transform duration-[2000ms]"
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
                            A curated timeline of professional roles and contributions.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
