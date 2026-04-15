"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import logoImage from '@/assets/logo.png';

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

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="lg:hidden relative z-[110] p-2 text-white"
                    aria-label="Toggle Menu"
                >
                    <div className="w-8 h-6 flex flex-col justify-between">
                        <span className={`h-1 w-full bg-white rounded-full transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
                        <span className={`h-1 w-full bg-white rounded-full transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`h-1 w-full bg-white rounded-full transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
                    </div>
                </button>

                {/* Mobile Navigation Drawer */}
                <div className={`fixed inset-0 bg-[#1D1515] z-[100] transition-all duration-500 flex flex-col items-center justify-center gap-8 ${
                    menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            className={`text-3xl font-bold uppercase tracking-tighter transition-all ${
                                isLinkActive(link) ? 'text-[#BA3D01]' : 'text-gray-400'
                            }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <a
                        href="/resume.pdf"
                        download
                        onClick={() => setMenuOpen(false)}
                        className="mt-8 bg-[#BA3D01] text-white px-12 py-4 rounded-full text-xl font-bold uppercase tracking-widest"
                    >
                        Resume
                    </a>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;
