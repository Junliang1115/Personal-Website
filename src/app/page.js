"use client";

import React from 'react';
import Image from 'next/image';
import profileImage from '@/assets/anime_profile.png';
import { motion } from 'framer-motion';
import { FaCode, FaLightbulb, FaRocket } from 'react-icons/fa';

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen w-full relative flex flex-col items-center justify-center text-white px-6 py-20 sm:py-24 lg:px-24 overflow-hidden mt-10 lg:mt-0">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[80%] sm:w-[50%] h-[50%] bg-[#BA3D01]/10 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[70%] sm:w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[90px] sm:blur-[120px] pointer-events-none"></div>

      {/* Main Content Wrapper */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-[90rem] flex flex-col"
      >
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 2xl:gap-24">
          {/* Text Section */}
          <div className="w-full lg:w-3/5 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
            {/* Status Pill */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gray-300">Open for collaboration</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-5xl xl:text-6xl 2xl:text-7xl font-black font-instrument mb-8 leading-[1.1] lg:leading-[0.95] tracking-tighter"
            >
              Hey there, <br />
              <span className="text-[#BA3D01] drop-shadow-[0_0_30px_rgba(186,61,1,0.2)]">I'm Jun Liang.</span>
            </motion.h1>

            <motion.div
              variants={itemVariants}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 xl:p-12 mb-10 shadow-2xl relative group overflow-hidden max-w-2xl lg:max-w-none"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#BA3D01]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative space-y-6 text-base sm:text-lg xl:text-xl 2xl:text-2xl font-instrument leading-relaxed text-gray-400 sm:text-gray-300">
                <p>
                  A Computer Science student at USM specializing in <span className="text-white font-semibold">Intelligent Computing</span>. I don't just write code; I craft digital experiences that balance raw power with elegant design.
                </p>
                <p>
                  Currently architecting solutions where AI meets intuition, while preparing to venture into the startup ecosystem. I believe the best products are born at the intersection of <span className="italic text-white">logic and imagination</span>.
                </p>
              </div>
            </motion.div>

            {/* Interests Icons */}
            <motion.div variants={itemVariants} className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4">
              {[
                { icon: <FaCode />, label: "AI Engineer" },
                { icon: <FaLightbulb />, label: "Web Developer" },
                { icon: <FaRocket />, label: "Startups" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl hover:bg-[#BA3D01]/20 hover:border-[#BA3D01]/40 transition-all duration-300 cursor-default group">
                  <span className="text-[#BA3D01] text-base lg:group-hover:scale-125 transition-transform">{item.icon}</span>
                  <span className="font-bold text-[9px] sm:text-[11px] uppercase tracking-widest">{item.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Profile Image Section */}
          <div className="w-full lg:w-2/5 flex justify-center order-1 lg:order-2 px-4 sm:px-0">
            <motion.div
              variants={itemVariants}
              className="relative group w-full max-w-[320px] sm:max-w-[450px] lg:max-w-none"
            >
              <div className="absolute -inset-8 sm:-inset-16 bg-gradient-to-tr from-[#BA3D01] to-[#6b2500] rounded-[3rem] blur-3xl opacity-10 group-hover:opacity-30 transition duration-1000"></div>
              
              <div className="relative rounded-[2.5rem] sm:rounded-[4rem] overflow-hidden border-2 border-white/10 p-2 sm:p-3 bg-white/5 backdrop-blur-lg shadow-2xl transition-all duration-500 group-hover:border-[#BA3D01]/30">
                <Image
                  src={profileImage}
                  alt="Jun Liang"
                  width={600}
                  height={800}
                  priority
                  className="rounded-[2.1rem] sm:rounded-[3.2rem] object-cover hover:scale-[1.05] transition-transform duration-700"
                  style={{
                    width: '100%',
                    height: 'auto',
                  }}
                />
              </div>

              {/* Float Widget */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -bottom-4 -right-2 sm:-bottom-8 sm:-right-8 lg:-right-12 xl:-right-16 bg-black/60 backdrop-blur-3xl border border-white/20 p-4 sm:p-8 rounded-[1.5rem] sm:rounded-[2.5rem] shadow-3xl z-20"
              >
                <p className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Based in</p>
                <p className="text-lg sm:text-2xl font-black text-white">Malaysia 🇲🇾</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
