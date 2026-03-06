"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Globe, MapPin, Users } from "lucide-react";

// Dot grid globe illusion using pure CSS + motion
function DotGlobe() {
    const rows = 14;
    const cols = 26;
    const dots: { row: number; col: number; visible: boolean; delay: number }[] = [];

    for (let r = 0; r < rows; r++) {
        const angle = (r / (rows - 1)) * Math.PI;
        const ringRadius = Math.sin(angle);
        const ringCols = Math.max(1, Math.round(cols * ringRadius));
        for (let c = 0; c < ringCols; c++) {
            const colFrac = c / (ringCols - 1 || 1);
            const colOffset = (cols - ringCols) / 2;
            dots.push({
                row: r,
                col: colOffset + c,
                visible: true,
                delay: (r * ringCols + c) * 0.003,
            });
        }
    }

    return (
        <div className="relative w-64 h-64 md:w-96 md:h-96">
            <div
                className="absolute inset-0 grid gap-2.5"
                style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)` }}
            >
                {dots.map((d, i) => {
                    const isHighlighted = Math.random() > 0.85;
                    return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: isHighlighted ? 1 : 0.25, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: d.delay }}
                            animate={isHighlighted ? {
                                opacity: [0.3, 1, 0.3],
                                scale: [1, 1.5, 1],
                            } : {}}
                            style={{
                                gridColumnStart: Math.round(d.col) + 1,
                                gridRowStart: d.row + 1,
                            }}
                            className={`w-1 h-1 rounded-full ${isHighlighted ? "bg-blue-400" : "bg-white/30"}`}
                        />
                    );
                })}
            </div>
            {/* Glow */}
            <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-2xl scale-75 pointer-events-none" />
        </div>
    );
}

export default function MapPreview() {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section ref={ref} className="relative py-28 bg-[#161B22] border-t border-[#30363D] overflow-hidden">
            {/* Background orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/8 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left text */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <p className="text-sm font-semibold text-blue-400 uppercase tracking-[0.15em] mb-4">
                            Global Map
                        </p>
                        <h2 className="text-4xl md:text-5xl font-black text-[#F0F6FC] leading-tight mb-6">
                            Every developer. <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                                Every coordinate.
                            </span>
                        </h2>
                        <p className="text-[#8B949E] text-lg leading-relaxed mb-8">
                            Our Mapbox-powered interactive globe renders thousands of developer markers in real time. Cluster views, custom filters, and popup profiles – built for exploration.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <motion.button
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.97 }}
                                className="flex items-center gap-2 bg-[#2563EB] hover:bg-blue-500 text-white px-7 py-3.5 rounded-xl font-semibold transition-colors shadow-[0_0_30px_rgba(37,99,235,0.3)]"
                            >
                                <Globe className="w-5 h-5" />
                                Open the Map
                                <ArrowRight className="w-4 h-4" />
                            </motion.button>
                        </div>

                        {/* Map feature bullets */}
                        <div className="mt-10 grid grid-cols-2 gap-3">
                            {[
                                "Mapbox GL dark theme",
                                "Real-time marker updates",
                                "Supercluster.js grouping",
                                "Filter by language & country",
                                "Popup profile cards",
                                "Geolocation — Locate Me",
                            ].map(feat => (
                                <div key={feat} className="flex items-center gap-2 text-sm text-[#8B949E]">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                                    {feat}
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right globe visual */}
                    <motion.div
                        style={{ y, opacity }}
                        className="flex items-center justify-center relative"
                    >
                        <div className="relative">
                            <DotGlobe />
                            {/* Floating stat overlays */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                                className="absolute -top-4 -right-8 glass-card rounded-xl px-3 py-2 border border-white/10 text-xs font-medium"
                            >
                                <div className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                    <span className="text-white">14,823 online</span>
                                </div>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.6 }}
                                className="absolute -bottom-4 -left-8 glass-card rounded-xl px-3 py-2 border border-white/10 text-xs font-medium"
                            >
                                <div className="flex items-center gap-1.5">
                                    <MapPin className="w-3 h-3 text-blue-400" />
                                    <span className="text-white">94 countries</span>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
