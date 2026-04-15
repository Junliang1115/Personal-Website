"use client";

import { useState, useEffect } from 'react';
import { FaEnvelope, FaGithub, FaLinkedin, FaInstagram, FaDiscord, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        countryCode: '+60',
        phoneNumber: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null); // null, 'success', 'error'

    // Auto-clear status after 5 seconds
    useEffect(() => {
        if (status) {
            const timer = setTimeout(() => setStatus(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [status]);

    const countryCodes = [
        { code: '+60', country: 'MY', flag: '🇲🇾' },
        { code: '+65', country: 'SG', flag: '🇸🇬' },
        { code: '+62', country: 'ID', flag: '🇮🇩' },
        { code: '+66', country: 'TH', flag: '🇹🇭' },
        { code: '+1', country: 'US', flag: '🇺🇸' },
        { code: '+44', country: 'UK', flag: '🇬🇧' },
        { code: '+86', country: 'CN', flag: '🇨🇳' },
        { code: '+81', country: 'JP', flag: '🇯🇵' },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const finalData = {
            ...formData,
            phoneNumber: `${formData.countryCode} ${formData.phoneNumber}`
        };
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(finalData),
            });
            if (res.ok) {
                setFormData({ firstName: '', lastName: '', email: '', countryCode: '+60', phoneNumber: '', message: '' });
                setStatus('success');
            } else {
                setStatus('error');
            }
        } catch (err) {
            console.error(err);
            setStatus('error');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen w-full flex flex-col lg:flex-row items-center justify-center gap-16 px-6 py-32 sm:px-12 lg:px-24 font-instrument overflow-x-hidden relative">
            
            {/* Custom Alert Overlay */}
            <AnimatePresence>
                {status && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-black/40"
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-[#1D1515] border border-white/10 p-8 rounded-[2rem] shadow-3xl max-w-sm w-full text-center relative overflow-hidden"
                        >
                            {/* Decorative Sparkle */}
                            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 blur-3xl opacity-20 -mt-20 rounded-full ${status === 'success' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                            
                            <div className="relative z-10">
                                <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 ${status === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                    {status === 'success' ? <FaCheckCircle size={40} className="animate-bounce" /> : <FaExclamationCircle size={40} className="animate-pulse" />}
                                </div>
                                
                                <h3 className="text-2xl font-black text-white mb-2 tracking-tight">
                                    {status === 'success' ? "Message Sent!" : "System Busy"}
                                </h3>
                                <p className="text-gray-400 font-medium leading-relaxed mb-8">
                                    {status === 'success' 
                                        ? "I've received your inquiry and will reach out to you within 24 hours. Stay tuned!" 
                                        : "Something went wrong while processing your request. Please try again later or reach out via email."}
                                </p>
                                
                                <button 
                                    onClick={() => setStatus(null)}
                                    className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all active:scale-95 ${status === 'success' ? 'bg-[#BA3D01] hover:bg-[#d44501] text-white' : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'}`}
                                >
                                    Dismiss
                                </button>
                            </div>

                            {/* Self-destruct progress bar */}
                            <motion.div 
                                initial={{ width: "100%" }}
                                animate={{ width: "0%" }}
                                transition={{ duration: 5, ease: "linear" }}
                                className={`absolute bottom-0 left-0 h-1 ${status === 'success' ? 'bg-green-500/50' : 'bg-red-500/50'}`}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Info Section */}
            <div className="w-full lg:w-1/2 max-w-xl text-white">
                <h1 className="text-4xl sm:text-6xl font-black mb-8 leading-tight tracking-tight">
                    Let&apos;s <span className="text-[#BA3D01]">Connect</span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed mb-12">
                    Whether you&apos;re down to build something cool, collaborate on a wild idea, or just want to say hi — I’m all ears. Follow my journey on social media or drop a message here.
                </p>

                <div className="space-y-4">
                    {[
                        { icon: FaEnvelope, label: 'Email', value: 'junliang1115@gmail.com', href: 'mailto:junliang1115@gmail.com' },
                        { icon: FaGithub, label: 'GitHub', value: 'JunLiang1115', href: 'https://github.com/JunLiang1115' },
                        { icon: FaLinkedin, label: 'LinkedIn', value: 'Chew Jun Liang', href: 'https://linkedin.com/in/chewjunliang' },
                        { icon: FaInstagram, label: 'Instagram', value: 'junliang_chew', href: 'https://instagram.com/junliang_chew' },
                        { icon: FaDiscord, label: 'Discord', value: 'junliang_chew', href: '#' }
                    ].map((item, idx) => (
                        <a
                            key={idx}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-5 p-4 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all group"
                        >
                            <div className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-full group-hover:bg-[#BA3D01]/20 group-hover:text-[#BA3D01] transition-all">
                                <item.icon className="text-2xl" />
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">{item.label}</p>
                                <p className="text-lg font-bold group-hover:text-white transition-colors tracking-tight">{item.value}</p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>

            {/* Form Section */}
            <div className="w-full lg:w-1/2 flex justify-center">
                <div className="w-full max-w-lg bg-black/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 sm:p-12 shadow-3xl relative overflow-hidden">
                    {/* Decorative element */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#BA3D01] opacity-[0.05] blur-3xl -mr-10 -mt-10 rounded-full"></div>

                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">First Name</label>
                                <input
                                    type="text" name="firstName" required value={formData.firstName} onChange={handleChange}
                                    placeholder="John"
                                    className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-[#BA3D01]/50 focus:ring-1 focus:ring-[#BA3D01]/50 transition-all font-bold"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Last Name</label>
                                <input
                                    type="text" name="lastName" required value={formData.lastName} onChange={handleChange}
                                    placeholder="Doe"
                                    className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-[#BA3D01]/50 focus:ring-1 focus:ring-[#BA3D01]/50 transition-all font-bold"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Email Address</label>
                            <input
                                type="email" name="email" required value={formData.email} onChange={handleChange}
                                placeholder="name@example.com"
                                className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-[#BA3D01]/50 focus:ring-1 focus:ring-[#BA3D01]/50 transition-all font-bold"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Phone Number (Optional)</label>
                            <div className="flex gap-3">
                                <select
                                    name="countryCode"
                                    value={formData.countryCode}
                                    onChange={handleChange}
                                    className="w-28 px-2 py-4 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#BA3D01]/50 transition-all font-bold appearance-none cursor-pointer text-center"
                                >
                                    {countryCodes.map(c => (
                                        <option key={c.country} value={c.code} className="bg-[#1D1515] text-white">
                                            {c.flag} {c.code}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange}
                                    placeholder="12 345 6789"
                                    className="flex-1 px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-[#BA3D01]/50 focus:ring-1 focus:ring-[#BA3D01]/50 transition-all font-bold"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Your Message</label>
                            <textarea
                                name="message" required value={formData.message} onChange={handleChange}
                                placeholder="Express your thoughts here..."
                                className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-[#BA3D01]/50 focus:ring-1 focus:ring-[#BA3D01]/50 transition-all font-bold min-h-[150px] resize-none"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-5 bg-[#BA3D01] hover:bg-[#d44501] disabled:bg-gray-700 text-white font-black rounded-xl transition-all shadow-xl shadow-black/40 active:scale-[0.98] flex items-center justify-center gap-3 uppercase tracking-widest text-sm"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    Send Message
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="22" y1="2" x2="11" y2="13" />
                                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                    </svg>
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
