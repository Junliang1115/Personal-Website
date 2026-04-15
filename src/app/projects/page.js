"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaCode, FaPause, FaPlay } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const ProjectCard = ({ project, index }) => {
  const router = useRouter();
  const techStack = project.techstack ? Object.values(project.techstack).flat().slice(0, 3) : [];

  return (
    <motion.div
      className="group relative bg-[#0A0A0A] border border-white/5 rounded-[2rem] overflow-hidden hover:border-[#BA3D01]/50 transition-all duration-500 flex flex-col h-full min-w-[350px] sm:min-w-[400px]"
    >
      {/* Glow Effect */}
      <div className="absolute -inset-px bg-gradient-to-br from-[#BA3D01]/0 via-[#BA3D01]/0 to-[#BA3D01]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

      {/* Header Info */}
      <div className="p-8 pb-4">
        <div className="flex justify-between items-start mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#BA3D01]/10 flex items-center justify-center text-[#BA3D01] group-hover:bg-[#BA3D01] group-hover:text-white transition-all duration-300">
            <FaCode size={24} />
          </div>
          <div className="flex gap-3">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                title="View Source"
              >
                <FaGithub size={20} />
              </a>
            )}
          </div>
        </div>

        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#BA3D01] transition-colors">
          {project.projectname}
        </h3>
        <span className="text-xs font-bold text-[#BA3D01] uppercase tracking-[0.2em] mb-4 block">
          {project.name}
        </span>

        <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 min-h-[4.5rem]">
          {project.description}
        </p>
      </div>

      {/* Tech Stack Pills */}
      <div className="px-8 mb-8 flex flex-wrap gap-2">
        {techStack.map((tech, i) => (
          <span key={i} className="px-3 py-1 bg-white/5 rounded-lg text-[10px] font-bold text-gray-500 uppercase tracking-wider border border-white/5">
            {tech}
          </span>
        ))}
      </div>

      {/* Footer / CTA */}
      <div className="mt-auto p-8 pt-0">
        <button
          onClick={() => router.push(`/hackathon/${project.name.replace(/\s/g, '-')}`)}
          className="w-full py-4 bg-white/5 hover:bg-[#BA3D01] rounded-2xl text-white font-bold transition-all duration-300 flex items-center justify-center gap-2 group/btn"
        >
          Explore Journey
          <FaExternalLinkAlt size={14} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [projectData, setProjectData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scrolling, setScrolling] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/hackathons');
        if (!response.ok) throw new Error('Network error');
        const data = await response.json();
        setProjectData(data.filter(p => p.link));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // Auto-scroll logic
  useEffect(() => {
    let interval;
    if (scrolling && !loading && scrollRef.current) {
      interval = setInterval(() => {
        if (scrollRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
          if (scrollLeft + clientWidth >= scrollWidth - 1) {
            scrollRef.current.scrollLeft = 0;
          } else {
            scrollRef.current.scrollLeft += 1;
          }
        }
      }, 30);
    }
    return () => clearInterval(interval);
  }, [scrolling, loading]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-32 space-y-6">
      <div className="w-16 h-16 border-4 border-[#BA3D01]/20 border-t-[#BA3D01] rounded-full animate-spin"></div>
      <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">Building Labs...</p>
    </div>
  );

  if (error) return (
    <div className="text-center py-20 text-red-400 bg-red-400/5 rounded-3xl border border-red-400/10">
      <p className="text-xl font-bold italic">Lab Encountered an Issue</p>
      <p className="text-sm mt-2 opacity-70 font-medium uppercase tracking-wider">{error}</p>
    </div>
  );

  return (
    <div className="relative">
      {/* Carousel Controls */}
      <div className="flex justify-between items-end mb-12">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[2px] w-12 bg-[#BA3D01]"></div>
            <span className="text-[#BA3D01] font-bold uppercase tracking-[0.3em] text-sm">Portfolio</span>
          </div>
          <h2 className="text-5xl sm:text-6xl font-bold text-white mb-4 tracking-tight">Project Showcase</h2>
          <p className="text-xl text-gray-500 font-medium max-w-xl">
            Auto-scrolling showcase of my latest experiments.
          </p>
        </div>

        <button
          onClick={() => setScrolling(!scrolling)}
          className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#BA3D01] transition-all group shadow-xl"
        >
          {scrolling ? <FaPause size={18} /> : <FaPlay size={18} className="ml-1" />}
        </button>
      </div>

      {/* Horizontal Carousel */}
      <div
        ref={scrollRef}
        className="flex gap-8 overflow-x-auto no-scrollbar pb-12 cursor-grab active:cursor-grabbing"
        onMouseEnter={() => setScrolling(false)}
        onMouseLeave={() => setScrolling(true)}
      >
        <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
        {/* Triple the data for seamless infinite loop effect if needed, but here we just scroll */}
        {projectData.map((project, index) => (
          <ProjectCard
            key={index}
            index={index}
            project={project}
          />
        ))}
      </div>
    </div>
  );
};

export default function ProjectPage() {
  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-center px-6 sm:px-12 lg:px-24 xl:px-48 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#BA3D01] opacity-[0.03] blur-[150px] -z-10"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600 opacity-[0.02] blur-[150px] -z-10"></div>

        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl sm:text-8xl lg:text-8xl font-bold text-white leading-[1] mb-12 tracking-tighter">
              Welcome to my<br />
              <span className="text-[#BA3D01]">digital lab</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <p className="text-xl sm:text-2xl lg:text-2xl font-medium text-gray-500 leading-relaxed max-w-2xl">
              — where experiments spark, ideas grow, and <span className="text-white">creations come alive</span>.
            </p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-30 cursor-pointer"
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-2">
            <div className="w-1 h-2 bg-white rounded-full"></div>
          </div>
        </motion.div>
      </section>

      {/* Showcase Section */}
      <section className="py-32 px-6 sm:px-12 lg:px-24 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <Projects />
        </div>
      </section>
    </div>
  );
}
