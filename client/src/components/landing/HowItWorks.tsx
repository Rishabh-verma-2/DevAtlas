"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Github, Database, MapPin, Globe, ArrowRight } from "lucide-react";

const steps = [
    {
        icon: Github,
        number: "01",
        title: "Sign in with GitHub",
        description: "One click. OAuth-secured. We never see your password or private repositories.",
        color: "text-white",
        bg: "bg-[#24292e]",
        border: "border-white/10",
        glow: "shadow-[0_0_30px_rgba(255,255,255,0.05)]",
        line: "from-white/20",
    },
    {
        icon: Database,
        number: "02",
        title: "Profile built instantly",
        description: "We fetch your public repos, languages, activity history, stars, and follower graph.",
        color: "text-purple-400",
        bg: "bg-purple-500/10",
        border: "border-purple-500/30",
        glow: "shadow-[0_0_30px_rgba(139,92,246,0.15)]",
        line: "from-purple-500/40",
    },
    {
        icon: MapPin,
        number: "03",
        title: "Location is geocoded",
        description: "Your publicly listed city is converted to precise coordinates via Mapbox geocoding.",
        color: "text-pink-400",
        bg: "bg-pink-500/10",
        border: "border-pink-500/30",
        glow: "shadow-[0_0_30px_rgba(236,72,153,0.15)]",
        line: "from-pink-500/40",
    },
    {
        icon: Globe,
        number: "04",
        title: "You appear on the Atlas",
        description: "Your marker is live on the global map. 14,000+ developers can now discover you.",
        color: "text-blue-400",
        bg: "bg-blue-500/10",
        border: "border-blue-500/30",
        glow: "shadow-[0_0_30px_rgba(37,99,235,0.2)]",
        line: "from-blue-500/40",
    },
];

export default function HowItWorks() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section className="relative py-28 bg-[#161B22] overflow-hidden border-t border-[#30363D]">
            {/* Background radial glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-blue-600/5 rounded-full blur-[120px]" />
            </div>

            <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center mb-20">
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        className="text-sm font-semibold text-purple-400 uppercase tracking-[0.15em] mb-3"
                    >
                        How It Works
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-black text-[#F0F6FC] mb-5 leading-tight"
                    >
                        From GitHub to the Atlas <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">in under 10 seconds</span>
                    </motion.h2>
                </div>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                    {/* Connecting dashes on desktop */}
                    <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px">
                        {[1, 2, 3].map(i => (
                            <motion.div
                                key={i}
                                initial={{ scaleX: 0 }}
                                animate={inView ? { scaleX: 1 } : {}}
                                transition={{ duration: 0.6, delay: 0.3 + i * 0.2 }}
                                style={{ left: `${(i / 3) * 100 - 33.33 / 2}%`, originX: 0 }}
                                className="absolute top-0 w-1/3 h-px bg-gradient-to-r from-white/10 to-white/10"
                            >
                                <div className="absolute right-0 top-1/2 -translate-y-1/2">
                                    <ArrowRight className="w-3 h-3 text-white/20" />
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {steps.map((step, i) => {
                        const Icon = step.icon;
                        return (
                            <motion.div
                                key={step.number}
                                initial={{ opacity: 0, y: 40 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                                className="relative flex flex-col items-center text-center group"
                            >
                                {/* Number badge */}
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    className={`relative w-20 h-20 rounded-2xl ${step.bg} border ${step.border} ${step.glow} flex items-center justify-center mb-6 transition-all duration-300`}
                                >
                                    <Icon className={`w-8 h-8 ${step.color}`} />
                                    <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-[#0D1117] border border-[#30363D] flex items-center justify-center">
                                        <span className="text-xs font-black text-[#F0F6FC]">{i + 1}</span>
                                    </div>
                                </motion.div>

                                <h3 className="text-lg font-bold text-[#F0F6FC] mb-2 group-hover:text-white transition-colors">
                                    {step.title}
                                </h3>
                                <p className="text-sm text-[#8B949E] leading-relaxed max-w-[220px]">
                                    {step.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
