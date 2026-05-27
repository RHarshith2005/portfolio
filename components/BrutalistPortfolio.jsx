import React, { useRef, useEffect } from 'react';
import { motion, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Star, Hexagon, Zap } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const cn = (...classes) => classes.filter(Boolean).join(' ');

export const BrutalReveal = ({ text, className = "", delay = 0 }) => {
    const elRef = useRef(null);
    useEffect(() => {
        const el = elRef.current;
        if (!el) return;
        const words = el.querySelectorAll('.brutal-word');
        gsap.fromTo(words,
            { opacity: 0, y: 50, rotateX: -90, transformOrigin: "0% 50% -50%" },
            {
                opacity: 1, y: 0, rotateX: 0,
                duration: 0.9, stagger: 0.05, delay, ease: "power4.out",
                scrollTrigger: { trigger: el, start: "top 90%" }
            }
        );
    }, [delay]);
    return (
        <div ref={elRef} className={cn("inline-block", className)} style={{ perspective: "1000px" }}>
            {text.split(' ').map((word, i) => (
                <span key={i} className="brutal-word opacity-0 inline-block mr-[0.3em] font-black uppercase tracking-tighter">
                    {word}
                </span>
            ))}
        </div>
    );
};

export function NoiseOverlay() {
    return (
        <div className="pointer-events-none fixed inset-0 z-[100] opacity-[0.04] mix-blend-difference">
            <svg className="h-full w-full">
                <filter id="noiseFilter">
                    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch" />
                </filter>
                <rect width="100%" height="100%" filter="url(#noiseFilter)" />
            </svg>
        </div>
    );
}

export function BrutalButton({ children, className }) {
    return (
        <motion.button
            whileHover={{ scale: 1.02, x: -4, y: -4, boxShadow: '8px 8px 0px 0px rgba(0,0,0,1)' }}
            whileTap={{ scale: 0.98, x: 0, y: 0, boxShadow: '2px 2px 0px 0px rgba(0,0,0,1)' }}
            className={cn(
                "relative flex items-center justify-center gap-2 border-4 border-black bg-[#ff4800] px-8 py-4 font-black uppercase tracking-widest text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all",
                className
            )}
        >
            {children}
            <ArrowRight strokeWidth={3} />
        </motion.button>
    );
}

export function TiltCard({ photoSrc }) {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const ySpring = useSpring(y, { stiffness: 300, damping: 30 });
    const rotateX = useTransform(ySpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };
    const handleMouseLeave = () => { x.set(0); y.set(0); };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transformStyle: "preserve-3d", rotateX, rotateY }}
            className="relative aspect-square w-full max-w-md rounded-none border-4 border-black bg-white p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] transition-shadow duration-300 z-10"
        >
            <div style={{ transform: "translateZ(60px)" }} className="flex h-full flex-col justify-between border-4 border-black bg-[#ff4800] p-6 overflow-hidden">
                {photoSrc ? (
                    <>
                        <div className="w-full flex-1 overflow-hidden border-4 border-black mb-4">
                            <img
                                src={photoSrc}
                                alt="Harshith R"
                                className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
                            />
                        </div>
                        <div>
                            <h3 className="text-3xl font-black uppercase leading-[0.9] tracking-tighter text-black">
                                HARSHITH R<br />
                                <span className="text-xl">FULL STACK &</span><br />
                                <span className="text-xl">AI ENGINEER</span>
                            </h3>
                        </div>
                    </>
                ) : (
                    <>
                        <Hexagon size={64} fill="black" className="text-black" strokeWidth={1.5} />
                        <div>
                            <h3 className="text-5xl font-black uppercase leading-[0.9] tracking-tighter text-black">
                                FULL<br />STACK<br />AI ENG.
                            </h3>
                        </div>
                    </>
                )}
            </div>
        </motion.div>
    );
}

export function Marquee({ text = "RAW POWER", bg = "bg-white", color = "text-black" }) {
    return (
        <div className={cn("relative flex overflow-x-hidden border-y-4 border-black py-4", bg)}>
            <motion.div
                className="flex whitespace-nowrap"
                animate={{ x: "-50%" }}
                transition={{ repeat: Infinity, ease: "linear", duration: 8 }}
            >
                {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-8 px-8">
                        <span className={cn("text-5xl md:text-7xl font-black uppercase italic tracking-tighter", color)}>
                            {text}
                        </span>
                        <Star className={cn("fill-current", color)} size={48} />
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

function BrutalHero({ title, subtitle, photoSrc }) {
    return (
        <section className="relative min-h-screen flex flex-col md:flex-row items-center justify-center p-6 md:p-12 overflow-hidden bg-[#E0E0E0] z-10 pt-24 border-b-8 border-black">
            <div className="absolute top-0 w-full p-6 flex justify-between items-center border-b-4 border-black text-black z-50 bg-[#E0E0E0]">
                <span className="font-black text-2xl uppercase tracking-tighter">HR.DEV</span>
                <div className="flex gap-4">
                    <a href="https://github.com/RHarshith2005" target="_blank" rel="noopener noreferrer"
                        className="font-bold uppercase border-2 border-black px-4 py-1 hover:bg-black hover:text-white transition-colors cursor-pointer text-sm">
                        GITHUB
                    </a>
                    <a href="https://www.linkedin.com/in/harshith-r-a2b18921a/" target="_blank" rel="noopener noreferrer"
                        className="font-bold uppercase border-2 border-black px-4 py-1 hover:bg-black hover:text-white transition-colors cursor-pointer text-sm">
                        LINKEDIN
                    </a>
                </div>
            </div>

            <div className="w-full md:w-1/2 flex flex-col justify-center space-y-8 z-20 mix-blend-exclusion text-white">
                <h1 className="text-7xl md:text-[8rem] leading-[0.85]"><BrutalReveal text={title} /></h1>
                <p className="font-mono text-xl md:text-2xl font-bold uppercase tracking-widest max-w-lg border-l-4 border-white pl-4">
                    {subtitle}
                </p>
                <div className="pt-8">
                    <a href="mailto:rharshith576@gmail.com">
                        <BrutalButton className="bg-white text-black border-white hover:bg-[#ff4800]">HIRE ME NOW</BrutalButton>
                    </a>
                </div>
            </div>

            <div className="w-full md:w-1/2 flex justify-center mt-12 md:mt-0">
                <TiltCard photoSrc={photoSrc} />
            </div>

            <div className="absolute bottom-6 left-6 font-mono font-bold uppercase text-xs hidden md:block mix-blend-exclusion text-white">
                <div>JAIN UNIVERSITY • CSE-AI • 2024–2028</div>
                <div>CGPA: 8.0 / 10.0</div>
            </div>
        </section>
    );
}

function BrutalStatement({ statement }) {
    const sectionRef = useRef(null);
    return (
        <section ref={sectionRef} className="bg-black text-white px-6 py-32 md:p-32 border-b-8 border-[#ff4800]">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl md:text-7xl font-black uppercase leading-[1.1] tracking-tighter">
                    <BrutalReveal text={statement} />
                </h2>
                <div className="mt-16 w-full h-8 border-4 border-white overflow-hidden relative">
                    <motion.div
                        initial={{ width: "0%" }}
                        whileInView={{ width: "100%" }}
                        transition={{ duration: 1.5, ease: "circOut" }}
                        className="absolute top-0 left-0 h-full bg-[#ff4800]"
                    />
                </div>
            </div>
        </section>
    );
}

function CinematicStack({ pillars }) {
    return (
        <section className="relative bg-[#E0E0E0] py-32 px-6 md:px-12">
            <h2 className="text-6xl md:text-9xl font-black uppercase mb-24 border-b-8 border-black pb-8 flex items-center justify-between">
                <span>CORE STACK</span>
                <span className="text-[#ff4800]">***</span>
            </h2>
            <div className="w-full max-w-5xl mx-auto relative pb-[20vh]">
                {pillars.map((card, i) => (
                    <div
                        key={i}
                        className={cn(
                            "sticky border-8 border-black p-8 md:p-16 flex flex-col justify-between shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] min-h-[50vh] transition-transform duration-300",
                            card.bg, card.text
                        )}
                        style={{ top: `calc(15vh + ${i * 40}px)` }}
                    >
                        <div className="flex justify-between items-start">
                            <span className="font-mono text-2xl md:text-4xl font-bold uppercase border-2 p-2 px-4 shadow-[4px_4px_0px_0px_currentColor]">0{i + 1}</span>
                            <Zap size={64} className="stroke-current" />
                        </div>
                        <div>
                            <h3 className="text-7xl md:text-[10rem] font-black tracking-tighter uppercase leading-[0.8]">{card.title}</h3>
                            <p className="font-mono text-xl md:text-3xl font-bold uppercase mt-8 border-l-8 pl-6 border-current">{card.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

function PinnedFeatures({ features }) {
    const containerRef = useRef(null);
    const scrollContainerRef = useRef(null);

    useEffect(() => {
        const pinScroll = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=2000",
                pin: true,
                scrub: 1,
            }
        });
        pinScroll.to(scrollContainerRef.current, { x: "-66.66%", ease: "none" });
    }, []);

    return (
        <section ref={containerRef} className="h-screen bg-black overflow-hidden flex items-center border-y-8 border-white relative z-20">
            <div className="absolute top-12 left-12 text-white font-mono z-50 uppercase text-2xl font-bold border-2 border-[#ff4800] px-4 py-2 bg-black shadow-[4px_4px_0px_0px_#ff4800]">
                EXPERTISE.SYS
            </div>
            <div ref={scrollContainerRef} className="flex h-[75vh] w-[300vw] px-12 gap-12 items-center">
                {features.map((f, i) => (
                    <div key={i} className={cn(
                        "w-[90vw] md:w-[60vw] h-full border-8 border-black p-12 flex flex-col justify-between shadow-[24px_24px_0px_0px_rgba(255,255,255,1)] flex-shrink-0 transition-all hover:scale-[1.02]",
                        f.bg
                    )}>
                        <div className="flex justify-between font-mono text-4xl font-bold uppercase border-b-8 border-black pb-8 text-black">
                            <span>{f.num}</span>
                            <span>{i + 1}/3</span>
                        </div>
                        <div>
                            <h3 className="text-7xl md:text-[9rem] font-black text-black uppercase tracking-tighter leading-[0.8] break-words">{f.title}</h3>
                            <p className="font-mono text-xl font-bold uppercase text-black mt-6 border-l-8 border-black pl-4">{f.stack}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

function ManifestoGrid({ rules }) {
    const gridRef = useRef(null);
    useEffect(() => {
        const cells = gsap.utils.toArray('.rule-cell');
        gsap.fromTo(cells,
            { opacity: 0, scale: 0.8, filter: 'blur(10px)' },
            {
                opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.8, stagger: 0.1, ease: 'back.out(1.5)',
                scrollTrigger: { trigger: gridRef.current, start: "top 75%" }
            }
        );
    }, []);

    return (
        <section className="bg-black py-32 px-6 md:px-12 border-b-8 border-white">
            <h2 className="text-[#ff4800] text-5xl md:text-8xl font-black uppercase tracking-tighter mb-16 underline decoration-white decoration-8 underline-offset-8">
                THE MANIFESTO
            </h2>
            <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-0 border-8 border-white bg-white">
                {rules.map((rule, i) => (
                    <div key={i} className="rule-cell bg-black border-[4px] border-white p-12 flex items-center justify-center min-h-[300px] hover:bg-[#ff4800] transition-colors group">
                        <p className="text-white text-3xl md:text-4xl font-black uppercase text-center leading-[1] group-hover:text-black">{rule}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

function BrutalProjects({ projects }) {
    const ref = useRef(null);
    useEffect(() => {
        const triggers = gsap.utils.toArray('.img-block');
        triggers.forEach((el) => {
            gsap.fromTo(el,
                { scale: 0.85, filter: 'grayscale(100%) contrast(200%)' },
                {
                    scale: 1, filter: 'grayscale(0%) contrast(100%)', duration: 1.2, ease: 'expo.out',
                    scrollTrigger: { trigger: el, start: "top 80%", scrub: 1 }
                }
            );
        });
    }, []);

    return (
        <section className="bg-[#E0E0E0] py-32 px-6 md:px-12">
            <h2 className="text-6xl md:text-[8rem] font-black uppercase text-center mb-24 border-y-8 border-black py-8 bg-white shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] tracking-tighter">
                PROJECTS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 max-w-7xl mx-auto" ref={ref}>
                {projects.map((proj, i) => (
                    <div key={i} className={cn("img-block relative border-8 border-black bg-white p-4 shadow-[24px_24px_0px_0px_rgba(0,0,0,1)]", i % 2 !== 0 ? "md:mt-48" : "")}>
                        <div className="w-full aspect-[3/4] bg-black flex flex-col justify-between p-8 relative overflow-hidden group cursor-pointer"
                            onClick={() => proj.link && window.open(proj.link, '_blank')}
                        >
                            <div className="absolute inset-0 bg-[#ff4800] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />
                            <div className="relative z-10">
                                <p className="font-mono text-[#ff4800] group-hover:text-black text-sm font-bold uppercase tracking-widest mb-4 transition-colors">{proj.tech}</p>
                                {proj.status === 'working' && (
                                    <span className="inline-block border-4 border-[#ff4800] group-hover:border-black text-[#ff4800] group-hover:text-black font-black uppercase text-xs px-3 py-1 mb-4 transition-colors">
                                        ⚡ IN PROGRESS
                                    </span>
                                )}
                            </div>
                            <div className="relative z-10">
                                <h3 className="text-4xl md:text-5xl font-black uppercase text-white group-hover:text-black leading-[0.9] tracking-tighter transition-colors">{proj.title}</h3>
                                <p className="font-mono text-sm text-gray-400 group-hover:text-black mt-4 transition-colors leading-relaxed">{proj.desc}</p>
                            </div>
                        </div>
                        <div className="absolute top-0 right-0 bg-[#ff4800] text-black font-black text-3xl p-4 border-l-8 border-b-8 border-black z-10">
                            {String(i + 1).padStart(2, '0')}
                        </div>
                        {proj.link && (
                            <a href={proj.link} target="_blank" rel="noopener noreferrer"
                                className="block w-full mt-0 border-t-4 border-black bg-black text-white font-black uppercase text-center py-4 tracking-widest hover:bg-[#ff4800] hover:text-black transition-colors text-sm"
                            >
                                VIEW PROJECT →
                            </a>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}

function BrutalFooter({ links }) {
    return (
        <footer className="bg-black text-white pt-32 overflow-hidden border-t-8 border-[#ff4800]">
            <div className="px-6 md:px-12 flex flex-col lg:flex-row justify-between pb-32 border-b-8 border-white gap-16">
                <h2 className="text-[15vw] lg:text-[10vw] font-black uppercase leading-[0.8] tracking-tighter">
                    <span className="text-[#ff4800]">LET'S</span><br />BUILD.
                </h2>
                <div className="flex flex-col justify-end font-mono text-3xl md:text-5xl font-bold uppercase space-y-6">
                    {links.map((link, i) => (
                        <a key={i} href={link.href} target={link.external ? "_blank" : undefined}
                            rel={link.external ? "noopener noreferrer" : undefined}
                            className="flex items-center gap-4 hover:text-[#ff4800] hover:pl-8 transition-all group border-b-4 border-transparent hover:border-[#ff4800] pb-2">
                            {link.label} <ArrowRight className="hidden group-hover:block" size={40} />
                        </a>
                    ))}
                </div>
            </div>
            <Marquee text="HARSHITH R — FULL STACK AI ENGINEER — BANGALORE — 2026" bg="bg-[#ff4800]" color="text-black" />
        </footer>
    );
}

export default function BrutalistPortfolio({
    photoSrc = "/profile-photo.jpg"
} = {}) {
    const pillars = [
        {
            title: 'FULL STACK',
            desc: 'React 19 + Vite. FastAPI. Express. Production-grade from day one.',
            bg: 'bg-white',
            text: 'text-black'
        },
        {
            title: 'AI/ML',
            desc: 'CrewAI multi-agent pipelines. LLM routing. Claude Vision. scikit-learn.',
            bg: 'bg-[#ff4800]',
            text: 'text-black'
        },
        {
            title: 'SHIPPED',
            desc: 'Real clients. Real deploys. Vercel, Render, Hostinger — zero downtime.',
            bg: 'bg-black',
            text: 'text-white border-white'
        },
    ];

    const features = [
        {
            num: 'DESIGN',
            title: 'Build',
            stack: 'React / Vite / Tailwind / Three.js / GSAP / Framer Motion',
            bg: 'bg-[#E0E0E0]'
        },
        {
            num: 'ENGINEER',
            title: 'Deploy',
            stack: 'FastAPI / Node.js / MongoDB / Firebase / JWT / Cloudinary',
            bg: 'bg-white'
        },
        {
            num: 'AUTOMATE',
            title: 'Evolve',
            stack: 'CrewAI / OpenRouter / Claude Vision API / scikit-learn / LDA / PCA',
            bg: 'bg-[#ff4800]'
        },
    ];

    const manifesto = [
        "SHIP TO PRODUCTION. NOT TO LOCALHOST.",
        "AI IS A TOOL. ARCHITECTURE IS THE ART.",
        "MULTI-AGENT OR SINGLE FUNCTION — MAKE IT WORK.",
        "CLEAN CODE IS NON-NEGOTIABLE.",
        "EVERY PROJECT IS A CLIENT. EVERY CLIENT IS A DEADLINE.",
        "IEEE-PUBLISHED. BATTLE-TESTED.",
        "JAIN UNIVERSITY. NEURON CLUB. CO-LEAD.",
        "REAL STACK. REAL DEPLOYS. REAL RESULTS.",
        "BANGALORE-BUILT. WORLD-READY."
    ];

    const projects = [
        {
            title: "TRUTH ENGINE",
            tech: "CrewAI · FastAPI · React · Firebase · OpenRouter",
            desc: "Five-agent AI pipeline: Claim Extractor → Web Researcher → Bias Analyzer → Fact Verifier → Verdict Judge. Ingests any article, returns a sourced verdict.",
            link: "https://github.com/RHarshith2005",
            status: "live"
        },
        {
            title: "ADHVAGA HOLIDAYS",
            tech: "React 19 · Vite 7 · Express.js · MongoDB · Hostinger",
            desc: "Production travel agency platform for a live Bangalore client. Custom design system, AI chatbot 'Vega', full auth, CDN-deployed. Live at adhvaga.in.",
            link: "https://adhvaga.in",
            status: "live"
        },
        {
            title: "CODE CLASH KINGDOMS",
            tech: "React · GSAP · Three.js · tsparticles · WebSockets",
            desc: "Multiplayer strategy game (Clash of Clans-inspired) purpose-built for Neuron Club events at Jain University. Cyberpunk-gaming-noir UI with real-time leaderboard.",
            link: null,
            status: "working"
        },
        {
            title: "IEEE ML PAPER",
            tech: "scikit-learn · PCA · LDA · Python · Matplotlib",
            desc: "Comparative analysis of 7 ML classifiers on health datasets. 16 figures, 18 citations. Second Prize at Research Poster Day 2026 — accepted for JU conference proceedings.",
            link: null,
            status: "live"
        }
    ];

    const footerLinks = [
        { label: "GITHUB", href: "https://github.com/RHarshith2005", external: true },
        { label: "LINKEDIN", href: "https://www.linkedin.com/in/harshith-r-a2b18921a/", external: true },
        { label: "EMAIL ME", href: "mailto:rharshith576@gmail.com", external: false },
    ];

    return (
        <div className="relative bg-[#E0E0E0] min-h-screen text-black selection:bg-[#ff4800] selection:text-black font-sans">
            <NoiseOverlay />
            <BrutalHero
                title="HARSHITH R"
                subtitle="Full Stack Developer & AI Engineer. Production apps. Multi-agent systems. Shipped to real clients."
                photoSrc={photoSrc}
            />
            <Marquee text="FULL STACK · AI ENGINEER · CREWAI · REACT · FASTAPI · IEEE PUBLISHED · BANGALORE" />
            <BrutalStatement statement="I BUILD AI-POWERED PRODUCTION APPS, MULTI-AGENT PIPELINES, AND IMMERSIVE WEB EXPERIENCES — SHIPPED TO REAL CLIENTS WITH ZERO DOWNTIME." />
            <CinematicStack pillars={pillars} />
            <PinnedFeatures features={features} />
            <ManifestoGrid rules={manifesto} />
            <BrutalProjects projects={projects} />
            <BrutalFooter links={footerLinks} />
        </div>
    );
}
