"use client";

import {
    motion, useMotionValue, useTransform, animate, useSpring,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
    Github, ArrowRight, Users, Globe, Code2, Star, MapPin, Terminal,
} from "lucide-react";

// ── Particle network background ────────────────────────────────────────────────
function ParticleCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        let id: number;
        const pts: { x: number; y: number; vx: number; vy: number; r: number; a: number; hue: number }[] = [];

        const resize = () => {
            canvas.width = canvas.offsetWidth * devicePixelRatio;
            canvas.height = canvas.offsetHeight * devicePixelRatio;
            ctx.scale(devicePixelRatio, devicePixelRatio);
        };
        const spawn = () => {
            const { offsetWidth: w, offsetHeight: h } = canvas;
            for (let i = 0; i < 130; i++) pts.push({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35, r: Math.random() * 1.8 + .4, a: Math.random() * .55 + .1, hue: Math.random() > .5 ? 220 : 270 });
        };
        resize(); spawn();
        window.addEventListener("resize", resize);

        const draw = () => {
            const { offsetWidth: w, offsetHeight: h } = canvas;
            ctx.clearRect(0, 0, w, h);
            for (let i = 0; i < pts.length; i++) {
                for (let j = i + 1; j < pts.length; j++) {
                    const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, d = Math.hypot(dx, dy);
                    if (d < 130) { ctx.beginPath(); ctx.strokeStyle = `rgba(99,130,255,${.13 * (1 - d / 130)})`; ctx.lineWidth = .5; ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke(); }
                }
            }
            for (const p of pts) {
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0 || p.x > w) p.vx *= -1;
                if (p.y < 0 || p.y > h) p.vy *= -1;
                ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${p.hue},80%,72%,${p.a})`; ctx.fill();
            }
            id = requestAnimationFrame(draw);
        };
        draw();
        return () => { cancelAnimationFrame(id); window.removeEventListener("resize", resize); };
    }, []);
    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-70" />;
}

// ── Inline count-up ────────────────────────────────────────────────────────────
function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
    const mv = useMotionValue(0);
    const rounded = useTransform(mv, Math.round);
    const [display, setDisplay] = useState("0");
    useEffect(() => {
        const c = animate(mv, to, { duration: 2.5, ease: "easeOut" });
        const u = rounded.on("change", v => setDisplay(v.toLocaleString()));
        return () => { c.stop(); u(); };
    }, [to]);
    return <span>{display}{suffix}</span>;
}

// ── Floating ambient badge ─────────────────────────────────────────────────────
function FloatingBadge({ icon, text, className, delay = 0 }: { icon: React.ReactNode; text: string; className?: string; delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: [0, 1, 1, 1], y: [8, 0, -5, 0] }}
            transition={{ duration: 3, delay, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            className={`absolute hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-xl glass-card border border-white/10 shadow-2xl text-sm font-medium text-[#F0F6FC] ${className}`}
        >
            <span className="text-white/60">{icon}</span>
            {text}
        </motion.div>
    );
}

// ── Shimmering gradient text word (react-bits "ShimmerText" pattern) ───────────
function ShimmerWord({ word, delay }: { word: string; delay: number }) {
    return (
        <span className="relative inline-block overflow-hidden">
            {/* Base text */}
            <motion.span
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
                className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 inline-block"
            >
                {word}
            </motion.span>
            {/* Shimmer sweep */}
            <motion.span
                aria-hidden
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{ duration: 1.5, delay: delay + 0.7, ease: "easeInOut", repeat: Infinity, repeatDelay: 4 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 pointer-events-none"
            />
        </span>
    );
}

export default function HeroSection() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const sX = useSpring(mouseX, { stiffness: 50, damping: 22 });
    const sY = useSpring(mouseY, { stiffness: 50, damping: 22 });
    const orbX = useTransform(sX, [0, 1], ["-4%", "4%"]);
    const orbY = useTransform(sY, [0, 1], ["-4%", "4%"]);
    const orbX2 = useTransform(sX, [0, 1], ["4%", "-4%"]);
    const orbY2 = useTransform(sY, [0, 1], ["4%", "-4%"]);

    const onMove = (e: React.MouseEvent<HTMLElement>) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        mouseX.set((e.clientX - left) / width);
        mouseY.set((e.clientY - top) / height);
    };

    const line1 = ["Map", "the", "World's"].map((w, i) => ({ w, d: 0.15 + i * 0.09 }));
    const line2 = ["Developer", "Atlas"].map((w, i) => ({ w, d: 0.45 + i * 0.1 }));

    return (
        <section
            onMouseMove={onMove}
            className="relative min-h-[100dvh] flex items-center justify-center bg-[#0D1117]"
            style={{ isolation: "isolate" }}
        >
            <ParticleCanvas />

            {/* Background orbs — parallax */}
            <motion.div style={{ x: orbX, y: orbY }} className="absolute top-1/4 right-1/4 w-[700px] h-[700px] rounded-full pointer-events-none">
                <div className="w-full h-full rounded-full bg-blue-600/18 blur-[130px]" />
            </motion.div>
            <motion.div style={{ x: orbX2, y: orbY2 }} className="absolute bottom-1/4 left-1/4 w-[520px] h-[520px] rounded-full pointer-events-none">
                <div className="w-full h-full rounded-full bg-purple-600/15 blur-[110px]" />
            </motion.div>

            {/* Subtle grid */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.035]"
                style={{ backgroundImage: "linear-gradient(#6366f1 1px, transparent 1px),linear-gradient(to right, #6366f1 1px, transparent 1px)", backgroundSize: "64px 64px" }} />

            {/* Ambient floating badges – Lucide icons only, no emojis */}
            <FloatingBadge icon={<Terminal className="w-3.5 h-3.5" />} text="@torvalds is active" className="top-[20%] left-[7%]" delay={0} />
            <FloatingBadge icon={<Star className="w-3.5 h-3.5 text-yellow-400" />} text="3.2k stars today" className="top-[34%] right-[7%]" delay={0.7} />
            <FloatingBadge icon={<MapPin className="w-3.5 h-3.5 text-red-400" />} text="Berlin, Germany" className="bottom-[32%] left-[6%]" delay={1.6} />
            <FloatingBadge icon={<Code2 className="w-3.5 h-3.5 text-blue-400" />} text="TypeScript · #1" className="bottom-[22%] right-[8%]" delay={0.4} />

            {/* ── Main content ── */}
            <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-28 text-center">

                {/* Live-count pill */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: "backOut" }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium mb-10"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400" />
                    </span>
                    Now mapping 14,800+ developers worldwide
                    <ArrowRight className="w-3.5 h-3.5" />
                </motion.div>

                {/* Headline — word-level reveal */}
                <h1 className="font-black tracking-tight leading-[1.05] mb-0">
                    {/* Line 1 – white */}
                    <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl flex flex-wrap justify-center gap-x-4 gap-y-1 mb-1">
                        {line1.map(({ w, d }) => (
                            <div key={w} className="overflow-hidden pb-4 -mb-4 pt-2 -mt-2">
                                <motion.span
                                    initial={{ y: "110%", opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.7, delay: d, ease: [0.22, 1, 0.36, 1] }}
                                    className="text-[#F0F6FC] inline-block"
                                >
                                    {w}
                                </motion.span>
                            </div>
                        ))}
                    </div>
                    {/* Line 2 – shimmer gradient */}
                    <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl flex flex-wrap justify-center gap-x-4 gap-y-1">
                        {line2.map(({ w, d }) => (
                            <div key={w} className="overflow-hidden pb-4 -mb-4 pt-2 -mt-2">
                                <ShimmerWord word={w} delay={d} />
                            </div>
                        ))}
                    </div>
                </h1>

                {/* Subheading — fully visible, not clipped */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 1.0, ease: "easeOut" }}
                    className="mt-8 text-base sm:text-lg md:text-xl text-[#8B949E] max-w-2xl mx-auto leading-relaxed"
                >
                    Discover developers across the globe, explore live GitHub activity, and forge connections that go beyond the terminal.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 1.2 }}
                    className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        className="relative group p-[2px] rounded-xl overflow-hidden shadow-[0_0_40px_rgba(37,99,235,0.45)]"
                    >
                        {/* React Bits: Rotating gradient glow border */}
                        <div className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0D1117_0%,#2563EB_50%,#0D1117_100%)] group-hover:bg-[conic-gradient(from_90deg_at_50%_50%,#0D1117_0%,#60A5FA_50%,#0D1117_100%)] transition-colors duration-500" />
                        <div className="relative flex items-center gap-2.5 bg-[#0D1117] group-hover:bg-[#161B22] text-white px-8 py-4 rounded-xl text-base font-semibold transition-colors backdrop-blur-xl">
                            <span className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />
                            <Github className="h-5 w-5" />
                            Sign in with GitHub
                        </div>
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center gap-2.5 border border-white/10 hover:border-white/20 bg-white/[0.04] hover:bg-white/[0.07] text-white px-8 py-4 rounded-xl text-base font-semibold transition-all backdrop-blur-sm"
                    >
                        <Globe className="h-5 w-5 text-[#22D3EE]" />
                        Explore the Map
                    </motion.button>
                </motion.div>

                {/* Stats row */}
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.5 }}
                    className="mt-16 grid grid-cols-3 gap-3 sm:gap-4 max-w-md mx-auto"
                >
                    {[
                        { icon: <Users className="w-4 h-4 text-blue-400" />, value: 14823, suffix: "+", label: "Developers" },
                        { icon: <Globe className="w-4 h-4 text-purple-400" />, value: 94, suffix: "", label: "Countries" },
                        { icon: <Code2 className="w-4 h-4 text-cyan-400" />, value: 68, suffix: "", label: "Languages" },
                    ].map(({ icon, value, suffix, label }) => (
                        <div key={label} className="glass-card rounded-2xl p-4 text-center border border-white/[0.07]">
                            <div className="flex justify-center mb-1.5">{icon}</div>
                            <div className="text-xl sm:text-2xl font-black text-white leading-tight">
                                <CountUp to={value} suffix={suffix} />
                            </div>
                            <div className="text-[11px] text-[#8B949E] mt-1">{label}</div>
                        </div>
                    ))}
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.2 }}
                    className="mt-14 flex justify-center"
                >
                    <div className="flex flex-col items-center gap-2 text-[#484F58] text-xs select-none">
                        <span>Scroll to explore</span>
                        <motion.div
                            animate={{ y: [0, 7, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                            className="w-5 h-9 rounded-full border border-white/10 flex items-start justify-center pt-1.5"
                        >
                            <div className="w-1 h-2 rounded-full bg-white/30" />
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
