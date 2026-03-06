"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Globe, Search, Zap, MapPin, BarChart3, TrendingUp } from "lucide-react";
import { useRef } from "react";

const features = [
    {
        icon: Globe,
        title: "Interactive World Map",
        description: "Explore a real-time interactive globe with developer markers in every country. Zoom, pan, and click any marker to dive deep.",
        color: "text-blue-400",
        border: "group-hover:border-blue-500/50",
        glow: "group-hover:shadow-[0_8px_60px_rgba(37,99,235,0.15)]",
        bg: "group-hover:bg-blue-500/5",
    },
    {
        icon: Search,
        title: "Discover by Language",
        description: "Filter by programming language, country, or follower count. Pinpoint JavaScript devs in Berlin or Rustaceans in Tokyo.",
        color: "text-purple-400",
        border: "group-hover:border-purple-500/50",
        glow: "group-hover:shadow-[0_8px_60px_rgba(139,92,246,0.15)]",
        bg: "group-hover:bg-purple-500/5",
    },
    {
        icon: Zap,
        title: "Live GitHub Activity",
        description: "GitHub webhooks push real-time updates. Watch commits, new repos, and stars appear on the map as they happen.",
        color: "text-cyan-400",
        border: "group-hover:border-cyan-500/50",
        glow: "group-hover:shadow-[0_8px_60px_rgba(34,211,238,0.15)]",
        bg: "group-hover:bg-cyan-500/5",
    },
    {
        icon: MapPin,
        title: "Nearby Developers",
        description: "Find devs within a custom radius. Discover your local open-source community and collaborate IRL.",
        color: "text-emerald-400",
        border: "group-hover:border-emerald-500/50",
        glow: "group-hover:shadow-[0_8px_60px_rgba(52,211,153,0.15)]",
        bg: "group-hover:bg-emerald-500/5",
    },
    {
        icon: BarChart3,
        title: "Global Dev Statistics",
        description: "Platform-wide analytics on top languages, most active countries, and contribution trends across the globe.",
        color: "text-orange-400",
        border: "group-hover:border-orange-500/50",
        glow: "group-hover:shadow-[0_8px_60px_rgba(251,146,60,0.15)]",
        bg: "group-hover:bg-orange-500/5",
    },
    {
        icon: TrendingUp,
        title: "Trending Developers",
        description: "A live leaderboard based on real GitHub commits, stars, and activity scores. See who's rising fast.",
        color: "text-pink-400",
        border: "group-hover:border-pink-500/50",
        glow: "group-hover:shadow-[0_8px_60px_rgba(236,72,153,0.15)]",
        bg: "group-hover:bg-pink-500/5",
    },
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
    const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });
    const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
    const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    };
    const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

    const Icon = feature.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            style={{ perspective: 800 }}
        >
            <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ rotateX, rotateY }}
                className={`group relative p-6 rounded-2xl border border-white/[0.06] bg-[#161B22]/80 backdrop-blur-sm transition-all duration-500 cursor-default
          ${feature.border} ${feature.glow} ${feature.bg}`}
            >
                {/* Inner shine */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                    <motion.div
                        style={{
                            background: `radial-gradient(circle at ${useTransform(springX, [-0.5, 0.5], ["0%", "100%"])}px ${useTransform(springY, [-0.5, 0.5], ["0%", "100%"])}px, rgba(255,255,255,0.05), transparent 60%)`
                        }}
                        className="absolute inset-0"
                    />
                </div>

                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-[#0D1117] flex items-center justify-center mb-5 border border-white/[0.06] ${feature.color} transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className="w-5 h-5" />
                </div>

                <h3 className="text-lg font-bold text-[#F0F6FC] mb-2 group-hover:text-white transition-colors">
                    {feature.title}
                </h3>
                <p className="text-sm text-[#8B949E] leading-relaxed group-hover:text-[#a0aab5] transition-colors">
                    {feature.description}
                </p>

                {/* Bottom accent */}
                <div className={`absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            </motion.div>
        </motion.div>
    );
}

export default function FeaturesSection() {
    return (
        <section className="relative py-28 bg-[#0D1117] overflow-hidden">
            {/* Background grid */}
            <div className="absolute inset-0 opacity-[0.025]"
                style={{ backgroundImage: "radial-gradient(#6366f1 1px, transparent 1px)", backgroundSize: "40px 40px" }}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section header */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-sm font-semibold text-blue-400 uppercase tracking-[0.15em] mb-3"
                    >
                        Feature Suite
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-black text-[#F0F6FC] mb-5 leading-tight"
                    >
                        Everything you need to <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                            explore the ecosystem
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-[#8B949E] text-lg leading-relaxed"
                    >
                        A comprehensive platform for discovering, analyzing, and connecting with the global developer community.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {features.map((f, i) => (
                        <FeatureCard key={f.title} feature={f} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
