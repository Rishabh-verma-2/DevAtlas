import Link from "next/link";
import { Globe, Github } from "lucide-react";

export default function Footer() {
    const links = {
        Explore: [
            { label: "Global Map", href: "/map" },
            { label: "Trending Developers", href: "/trending" },
            { label: "Statistics", href: "/stats" },
            { label: "Nearby Developers", href: "/nearby" },
        ],
        Account: [
            { label: "Sign in with GitHub", href: "#" },
            { label: "Onboarding", href: "/onboarding" },
            { label: "Settings", href: "/settings" },
        ],
        Open: [
            { label: "GitHub Repository", href: "https://github.com" },
            { label: "API Docs", href: "#" },
        ],
    };

    return (
        <footer className="relative bg-[#161B22] border-t border-[#30363D] overflow-hidden">
            {/* Top gradient line */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

            {/* Background glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
                    {/* Brand column */}
                    <div className="md:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-5 w-fit">
                            <Globe className="h-6 w-6 text-blue-400" />
                            <span className="text-lg font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                                DevAtlas
                            </span>
                        </Link>
                        <p className="text-[#8B949E] text-sm leading-relaxed max-w-xs mb-6">
                            Map the world's developer community. Discover, connect, and collaborate with developers across the globe.
                        </p>
                        <div className="inline-flex items-center gap-2 text-xs text-[#484F58] border border-[#30363D] rounded-full px-3 py-1.5">
                            <span>Built with</span>
                            <span className="text-[#F0F6FC]">GitHub OAuth</span> ·
                            <span className="text-[#F0F6FC]">Mapbox</span> ·
                            <span className="text-[#F0F6FC]">OpenCage</span>
                        </div>
                    </div>

                    {/* Link columns */}
                    {Object.entries(links).map(([group, items]) => (
                        <div key={group}>
                            <h3 className="text-xs font-bold text-[#F0F6FC] uppercase tracking-[0.1em] mb-4">{group}</h3>
                            <ul className="space-y-3">
                                {items.map(item => (
                                    <li key={item.label}>
                                        <Link
                                            href={item.href}
                                            className="text-sm text-[#8B949E] hover:text-[#F0F6FC] transition-colors"
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div className="pt-8 border-t border-[#30363D] flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-[#484F58]">
                        &copy; {new Date().getFullYear()} DevAtlas. All rights reserved.
                    </p>
                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs text-[#8B949E] hover:text-[#F0F6FC] transition-colors"
                    >
                        <Github className="w-4 h-4" />
                        Open Source on GitHub
                    </a>
                </div>
            </div>
        </footer>
    );
}
