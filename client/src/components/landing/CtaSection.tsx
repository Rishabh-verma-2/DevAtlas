"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Github, ArrowRight } from "lucide-react";

export default function CtaSection() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { left, top } = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
    };

    const background = useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, rgba(37,99,235,0.15), transparent 80%)`;

    const particles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 5 + 4,
        delay: Math.random() * 3,
    }));

    return (
        <section className="relative py-32 bg-[#0D1117] border-t border-[#30363D] overflow-hidden">
            {/* Static gradient backdrop */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10 pointer-events-none" />

            {/* Floating ambient particles */}
            {particles.map(p => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full bg-white/10"
                    style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
                    animate={{ y: [0, -30, 0], opacity: [0.1, 0.4, 0.1] }}
                    transition={{ repeat: Infinity, duration: p.duration, delay: p.delay, ease: "easeInOut" }}
                />
            ))}

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    onMouseMove={handleMouseMove}
                    style={{ background }}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="relative rounded-3xl border border-white/10 bg-[#161B22]/80 backdrop-blur-lg p-10 md:p-16 text-center overflow-hidden group"
                >
                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-blue-500/20 rounded-tl-3xl pointer-events-none" />
                    <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-purple-500/20 rounded-br-3xl pointer-events-none" />

                    {/* Top gradient line */}
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

                    {/* GitHub octocat watermark */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] scale-150">
                        <Github className="w-96 h-96 text-white" />
                    </div>

                    {/* Badge */}
                    <motion.div
                        animate={{ y: [0, -4, 0] }}
                        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium mb-8"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400" />
                        </span>
                        14,823 developers and counting
                    </motion.div>

                    <h2 className="text-4xl md:text-6xl font-black text-[#F0F6FC] mb-6 leading-tight">
                        Ready to join the{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">
                            Atlas?
                        </span>
                    </h2>
                    <p className="text-lg text-[#8B949E] mb-10 max-w-xl mx-auto leading-relaxed">
                        Connect your GitHub in one click. No forms, no manual data entry. Just your code, your community, and the whole world to discover.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.97 }}
                            className="group relative flex items-center gap-3 bg-[#2563EB] hover:bg-blue-500 text-white px-10 py-4 rounded-xl text-lg font-bold transition-colors shadow-[0_0_50px_rgba(37,99,235,0.4)] hover:shadow-[0_0_70px_rgba(37,99,235,0.6)] overflow-hidden"
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                            <Github className="h-6 w-6" />
                            Sign in with GitHub
                            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                    </div>

                    <p className="mt-6 text-xs text-[#484F58]">
                        Free forever · No credit card required · OAuth-secured
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
