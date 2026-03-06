"use client";

import { motion } from "framer-motion";
import { Code2, MapPin, Star, Activity } from "lucide-react";

const developers = [
    { username: "torvalds", name: "Linus Torvalds", location: "Finland", lang: "C", color: "from-yellow-500 to-orange-400", followers: "240k" },
    { username: "gaearon", name: "Dan Abramov", location: "London", lang: "JS", color: "from-blue-500 to-cyan-400", followers: "82k" },
    { username: "sindresorhus", name: "Sindre Sorhus", location: "Thailand", lang: "TS", color: "from-purple-500 to-pink-400", followers: "60k" },
    { username: "tj", name: "TJ Holowaychuk", location: "Canada", lang: "Go", color: "from-cyan-500 to-teal-400", followers: "47k" },
    { username: "yyx990803", name: "Evan You", location: "Singapore", lang: "TS", color: "from-green-500 to-emerald-400", followers: "95k" },
    { username: "gvanrossum", name: "Guido van Rossum", location: "US", lang: "Py", color: "from-blue-400 to-indigo-500", followers: "35k" },
    { username: "dhh", name: "David H. Hansson", location: "Denmark", lang: "Ruby", color: "from-red-500 to-rose-400", followers: "55k" },
    { username: "nicoleishere", name: "Nicole Forsgren", location: "US", lang: "Data", color: "from-violet-500 to-fuchsia-400", followers: "28k" },
];

function DevCard({ dev }: { dev: typeof developers[0] }) {
    return (
        <motion.div
            whileHover={{ scale: 1.04, y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex-shrink-0 w-56 rounded-2xl border border-white/[0.07] bg-[#161B22] p-4 cursor-default group relative overflow-hidden"
        >
            {/* Ambient glow */}
            <div className={`absolute -inset-px rounded-2xl bg-gradient-to-br ${dev.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-sm`} />

            <div className="relative flex items-center gap-3 mb-4">
                <div className="relative flex-shrink-0">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${dev.color} flex items-center justify-center text-white font-black text-lg shadow-lg`}>
                        {dev.username.charAt(0).toUpperCase()}
                    </div>
                    {/* Language badge */}
                    <div className="absolute -bottom-1 -right-1 bg-[#0D1117] border border-[#30363D] rounded px-1 text-[9px] font-bold text-[#F0F6FC]">
                        {dev.lang}
                    </div>
                </div>
                <div className="min-w-0">
                    <div className="font-bold text-sm text-[#F0F6FC] truncate group-hover:text-white transition-colors">{dev.name}</div>
                    <div className="text-xs text-[#8B949E]">@{dev.username}</div>
                </div>
            </div>

            <div className="flex items-center justify-between text-xs text-[#8B949E]">
                <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {dev.location}
                </span>
                <span className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-400" />{dev.followers}
                </span>
            </div>

            <div className="mt-3 flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
                </span>
                <span className="text-[10px] text-[#3FB950] flex items-center gap-1">
                    <Activity className="w-2.5 h-2.5" /> Active on GitHub
                </span>
            </div>
        </motion.div>
    );
}

export default function DeveloperShowcase() {
    const doubled = [...developers, ...developers];

    return (
        <section className="py-28 bg-[#0D1117] overflow-hidden relative border-t border-[#30363D]">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14 text-center">
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-sm font-semibold text-emerald-400 uppercase tracking-[0.15em] mb-3"
                >
                    Developer Community
                </motion.p>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-5xl font-black text-[#F0F6FC] leading-tight"
                >
                    Join the world&apos;s best developers <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
                        already on the Atlas
                    </span>
                </motion.h2>
            </div>

            {/* Row 1 – scroll left */}
            <div className="relative overflow-hidden mb-4">
                <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-[#0D1117] to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-[#0D1117] to-transparent z-10 pointer-events-none" />
                <motion.div
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 38 }}
                    className="flex gap-4 px-4 min-w-max"
                >
                    {doubled.map((dev, i) => <DevCard key={i} dev={dev} />)}
                </motion.div>
            </div>

            {/* Row 2 – scroll right (reversed) */}
            <div className="relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-[#0D1117] to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-[#0D1117] to-transparent z-10 pointer-events-none" />
                <motion.div
                    animate={{ x: ["-50%", "0%"] }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 38 }}
                    className="flex gap-4 px-4 min-w-max"
                >
                    {[...doubled].reverse().map((dev, i) => <DevCard key={i} dev={dev} />)}
                </motion.div>
            </div>
        </section>
    );
}
