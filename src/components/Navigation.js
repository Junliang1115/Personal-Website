"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import logoImage from '@/assets/logo.png';
import { motion, AnimatePresence } from 'framer-motion';

function Navigation() {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);

    const navLinks = [
        { name: 'About me', href: '/' },
        { name: 'My Journey', href: '/journey', activePaths: ['/journey', '/education', '/experience', '/skills', '/hackathon'] },
        { name: 'Projects', href: '/projects' },
        { name: 'Contact', href: '/contact' },
    ];

    const isLinkActive = (link) => {
        if (link.href === '/' && pathname === '/') return true;
        if (link.activePaths && link.activePaths.some(p => pathname.startsWith(p))) return true;
        return pathname === link.href;
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-[100] bg-black/80 backdrop-blur-md border-b border-white/5 h-20 sm:h-24 flex items-center justify-center transition-all duration-300">
            <div className="w-full max-w-7xl px-6 sm:px-12 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="relative z-[110] flex items-center group">
                    <Image
                        src={logoImage}
                        alt="Logo"
                        width={200}
                        height={60}
                        className="w-32 sm:w-40 lg:w-48 h-auto object-contain transition-transform group-hover:scale-105"
                        priority
                    />
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`text-sm font-bold uppercase tracking-widest transition-all hover:text-[#BA3D01] py-2 relative group ${
                                isLinkActive(link) ? 'text-[#BA3D01]' : 'text-gray-300'
                            }`}
                        >
                            {link.name}
                            <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#BA3D01] transition-transform duration-300 origin-left ${
                                isLinkActive(link) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                            }`}></span>
                        </Link>
                    ))}
                    <a
                        href="/resume.pdf"
                        download
                        className="bg-[#BA3D01] hover:bg-[#d44501] text-white px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest transition-all shadow-lg shadow-black/20 active:scale-95"
                    >
                        Resume
                    </a>
                </div>

            </div>
        </nav>
    );
}

export default Navigation;
