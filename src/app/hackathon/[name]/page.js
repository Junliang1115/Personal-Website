"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { FaGithub } from 'react-icons/fa';

export default function HackathonDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const [hackathon, setHackathon] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!params.name) return;
        const formattedName = decodeURIComponent(params.name).replace(/-/g, ' ');
        fetch(`/api/hackathons/${formattedName}`)
            .then(res => {
                if (!res.ok) throw new Error('Hackathon not found');
                return res.json();
            })
            .then(data => setHackathon(data))
            .catch(err => setError(err.message));
    }, [params.name]);

    if (error) return (
        <div className="min-h-screen flex items-center justify-center text-white p-6">
            <div className="text-center bg-red-500/10 border border-red-500/20 p-12 rounded-3xl max-w-lg">
                <h2 className="text-3xl font-bold mb-4">Error</h2>
                <p className="text-xl text-gray-400">{error}</p>
                <button onClick={() => router.back()} className="mt-8 px-8 py-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors font-bold uppercase tracking-widest text-sm">Go Back</button>
            </div>
        </div>
    );

    if (!hackathon) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-pulse flex flex-col items-center">
                <div className="w-16 h-16 bg-[#BA3D01]/20 rounded-full mb-4"></div>
                <div className="h-4 w-32 bg-white/10 rounded-full"></div>
            </div>
        </div>
    );

    let embedUrl = '';
    if (hackathon.driveUrl) {
        if (hackathon.driveUrl.includes('/presentation/d/e/')) {
            embedUrl = hackathon.driveUrl;
        } else {
            const match = hackathon.driveUrl.match(/\/d\/(.*?)(\/|$)/);
            if (match && match[1]) {
                const fileId = match[1];
                embedUrl = `https://drive.google.com/file/d/${fileId}/preview`;
            }
        }
    } else if (hackathon.youtubeUrl) {
        embedUrl = hackathon.youtubeUrl.replace("watch?v=", "embed/");
    }

    return (
        <div className="min-h-screen w-full text-white pt-24 pb-32 px-4 sm:px-12 lg:px-24 font-instrument">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8 relative">
                    <button
                        onClick={() => router.back()}
                        className="absolute -top-12 -left-4 md:-left-8 p-3 hover:bg-white/5 rounded-full transition-colors text-white/40 hover:text-white"
                        aria-label="Back"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="19" y1="12" x2="5" y2="12" />
                            <polyline points="12 19 5 12 12 5" />
                        </svg>
                    </button>

                    <div className="flex-1">
                        <span className="text-[#BA3D01] font-bold uppercase tracking-[0.2em] text-sm mb-4 block">{hackathon.name}</span>
                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-4">{hackathon.projectname}</h1>
                        <div className="flex flex-wrap items-center gap-4 text-gray-400">
                            {hackathon.teamname && (
                                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg border border-white/5">
                                    <span className="text-xs uppercase font-bold text-gray-500">Team</span>
                                    <span className="font-semibold text-white">{hackathon.teamname}</span>
                                </div>
                            )}
                            {hackathon.link && (
                                <a href={hackathon.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group hover:text-white transition-colors">
                                    <FaGithub className="text-2xl" />
                                    <span className="font-medium underline underline-offset-4 decoration-white/20">Source Code</span>
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Media Container */}
                    <div className="lg:col-span-12 xl:col-span-8">
                        {embedUrl ? (
                            <div className="relative aspect-video rounded-3xl overflow-hidden bg-white/5 border border-white/10 shadow-2xl group animate-in fade-in zoom-in duration-700">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                <iframe
                                    src={embedUrl}
                                    title={hackathon.name}
                                    className="w-full h-full relative z-10"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        ) : (
                            <div className="aspect-video flex items-center justify-center rounded-3xl bg-white/5 border border-dashed border-white/20 text-gray-500 italic">
                                No presentation media available
                            </div>
                        )}
                    </div>

                    {/* Team Members Column (Hidden if empty) */}
                    {hackathon.teammate && hackathon.teammate.length > 0 && (
                        <div className="lg:col-span-12 xl:col-span-4 bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                                <span className="w-2 h-6 bg-[#BA3D01] rounded-full"></span>
                                Core Team
                            </h3>
                            <ul className="space-y-4">
                                {hackathon.teammate.map((member, idx) => (
                                    <li key={idx} className="flex items-center gap-4 py-3 border-b border-white/5 last:border-0 group">
                                        <div className="w-10 h-10 rounded-full bg-[#BA3D01]/10 flex items-center justify-center group-hover:bg-[#BA3D01]/30 transition-colors">
                                            <span className="font-bold text-[#BA3D01]">{member[0].toUpperCase()}</span>
                                        </div>
                                        <span className="text-lg font-medium text-gray-200 group-hover:text-white transition-colors">{member}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Detailed Content */}
                    <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-start mt-12 pt-12 border-t border-white/5">
                        <div className="space-y-12">
                            {/* Description Section */}
                            <section>
                                <h3 className="text-base uppercase font-bold tracking-widest text-[#BA3D01] mb-6">Overview</h3>
                                <h4 className="text-3xl font-bold mb-6 text-white">The Project Journey</h4>
                                <div className="text-xl text-gray-300 leading-relaxed space-y-6">
                                    <p>{hackathon.description}</p>
                                </div>
                            </section>

                            {/* Features Section */}
                            {hackathon.corefeature && hackathon.corefeature.length > 0 && (
                                <section>
                                    <h3 className="text-base uppercase font-bold tracking-widest text-[#BA3D01] mb-6">Capabilities</h3>
                                    <h4 className="text-3xl font-bold mb-8 text-white">Core Innovations</h4>
                                    <ul className="space-y-6">
                                        {hackathon.corefeature.map((feature, idx) => (
                                            <li key={idx} className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                                                <h5 className="text-xl font-bold text-white mb-2">{feature.name}</h5>
                                                <p className="text-gray-400 leading-relaxed font-medium">{feature.details}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            )}
                        </div>

                        {/* Tech Stack Column */}
                        <div className="bg-[#BA3D01]/5 rounded-[3rem] p-8 sm:p-12 border border-[#BA3D01]/10 self-start">
                            <h3 className="text-3xl font-bold mb-10 text-white flex items-center gap-4">
                                Stack Build
                            </h3>
                            <div className="space-y-10">
                                {Object.entries(hackathon.techstack || {}).map(([category, techs]) => (
                                    techs && techs.length > 0 && (
                                        <div key={category}>
                                            <h4 className="text-sm uppercase font-bold text-[#BA3D01] tracking-widest mb-4 flex items-center gap-3">
                                                <span>{category.replace('_', '/')}</span>
                                            </h4>
                                            <div className="flex flex-wrap gap-2.5">
                                                {techs.map(tech => (
                                                    <span key={tech} className="bg-white/10 text-white px-4 py-2 rounded-xl text-sm font-semibold border border-white/5 hover:bg-[#BA3D01]/30 hover:border-[#BA3D01]/30 transition-all cursor-default">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
