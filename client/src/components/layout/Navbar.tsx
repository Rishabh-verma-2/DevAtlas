"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Github } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { scrollY } = useScroll();

    useEffect(() => {
        const unsub = scrollY.on("change", v => setScrolled(v > 20));
        return unsub;
    }, [scrollY]);

    const navLinks = ["Map", "Trending", "Stats", "Nearby"];

    return (
        <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? "bg-[#0D1117]/90 backdrop-blur-xl border-b border-[#30363D] shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
                : "bg-transparent border-b border-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="relative w-8 h-8 flex items-center justify-center">
                            <Image src="/favicon.png" alt="DevAtlas Logo" width={32} height={32} className="relative z-10 drop-shadow-[0_0_10px_rgba(96,165,250,0.5)] group-hover:scale-110 transition-transform duration-300" />
                            <motion.div
                                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                                transition={{ repeat: Infinity, duration: 2.5 }}
                                className="absolute inset-0 rounded-full bg-blue-400/30"
                            />
                        </div>
                        <span className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                            DevAtlas
                        </span>
                    </Link>

                    {/* Desktop links */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map(link => (
                            <Link
                                key={link}
                                href={`/${link.toLowerCase()}`}
                                className="relative text-[#8B949E] hover:text-[#F0F6FC] px-4 py-2 rounded-lg text-sm font-medium transition-colors group"
                            >
                                {link}
                                <span className="absolute bottom-1 left-4 right-4 h-px bg-gradient-to-r from-blue-400 to-purple-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                            </Link>
                        ))}
                    </div>

                    {/* Desktop CTA */}
                    <div className="hidden md:flex items-center gap-3">
                        <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            className="flex items-center gap-2 bg-[#2563EB] hover:bg-blue-500 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                        >
                            <Github className="h-4 w-4" />
                            Sign in
                        </motion.button>
                    </div>

                    {/* Mobile burger */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-lg text-[#8B949E] hover:text-[#F0F6FC] hover:bg-white/5 transition-colors"
                    >
                        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile drawer */}
            <motion.div
                initial={false}
                animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                className="md:hidden overflow-hidden bg-[#0D1117]/95 backdrop-blur-xl border-b border-[#30363D]"
            >
                <div className="px-4 py-3 space-y-1">
                    {navLinks.map(link => (
                        <Link
                            key={link}
                            href={`/${link.toLowerCase()}`}
                            className="block px-4 py-2.5 rounded-lg text-[#8B949E] hover:text-[#F0F6FC] hover:bg-white/5 text-sm font-medium transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            {link}
                        </Link>
                    ))}
                    <div className="pt-2 pb-1">
                        <button className="flex w-full items-center justify-center gap-2 bg-[#2563EB] text-white px-4 py-2.5 rounded-lg text-sm font-semibold">
                            <Github className="h-4 w-4" />
                            Sign in with GitHub
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.nav>
    );
}
