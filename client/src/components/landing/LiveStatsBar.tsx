"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { animate } from "framer-motion";
import { Globe, MapPin, Code2, Package } from "lucide-react";

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true });
    useEffect(() => {
        if (!inView || !ref.current) return;
        const controls = animate(0, to, {
            duration: 2.5, ease: "easeOut",
            onUpdate(v) { if (ref.current) ref.current.textContent = Math.round(v).toLocaleString() + suffix; },
        });
        return controls.stop;
    }, [inView, to, suffix]);
    return <span ref={ref}>0{suffix}</span>;
}

const stats = [
    {
        icon: Globe,
        value: 14823, suffix: "",
        label: "Developers Mapped",
        color: "text-blue-400",
        barColor: "from-blue-500 to-cyan-400",
    },
    {
        icon: MapPin,
        value: 94, suffix: "",
        label: "Countries Represented",
        color: "text-purple-400",
        barColor: "from-purple-500 to-pink-400",
    },
    {
        icon: Code2,
        value: 68, suffix: "",
        label: "Programming Languages",
        color: "text-emerald-400",
        barColor: "from-emerald-500 to-teal-400",
    },
    {
        icon: Package,
        value: 482000, suffix: "+",
        label: "Repositories Tracked",
        color: "text-orange-400",
        barColor: "from-orange-500 to-yellow-400",
    },
];

export default function LiveStatsBar() {
    return (
        <section className="relative border-y border-[#30363D] bg-[#161B22] overflow-hidden py-16">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
                    {stats.map((s, i) => {
                        const Icon = s.icon;
                        return (
                            <motion.div
                                key={s.label}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                                className="flex flex-col items-center text-center group"
                            >
                                <div className={`mb-3 p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.07] ${s.color} group-hover:scale-110 transition-transform duration-300`}>
                                    <Icon className="w-5 h-5" />
                                </div>
                                <div className={`text-4xl md:text-5xl font-black bg-gradient-to-r ${s.barColor} bg-clip-text text-transparent`}>
                                    <CountUp to={s.value} suffix={s.suffix} />
                                </div>
                                <div className="mt-2 text-[#8B949E] text-sm font-medium">{s.label}</div>
                                <div className={`mt-3 h-0.5 w-10 rounded-full bg-gradient-to-r ${s.barColor} opacity-50 group-hover:w-20 transition-all duration-500`} />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
