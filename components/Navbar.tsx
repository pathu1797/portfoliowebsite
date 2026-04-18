'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Activity, Menu, X } from 'lucide-react'

interface NavbarProps {
    raceMode: boolean
    perfMode: boolean
    onToggleRace: () => void
    onTogglePerf: () => void
}

const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Timeline', href: '#timeline' },
    { label: 'Contact', href: '#contact' },
]

export default function Navbar({ raceMode, perfMode, onToggleRace, onTogglePerf }: NavbarProps) {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [activeSection, setActiveSection] = useState('')

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 40)
            const sections = navLinks.map(l => l.href.slice(1))
            const active = sections.find(id => {
                const el = document.getElementById(id)
                if (!el) return false
                const rect = el.getBoundingClientRect()
                return rect.top <= 100 && rect.bottom >= 100
            })
            if (active) setActiveSection(active)
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                padding: '0 2rem',
                height: '70px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: scrolled ? 'rgba(5, 5, 7, 0.92)' : 'transparent',
                backdropFilter: scrolled ? 'blur(20px)' : 'none',
                borderBottom: scrolled ? '1px solid rgba(255, 0, 0, 0.15)' : '1px solid transparent',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
        >
            {/* Logo */}
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                    width: '32px',
                    height: '32px',
                    background: 'var(--accent-red)',
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 0 20px rgba(255,0,0,0.5)',
                    fontSize: '0.65rem', fontWeight: 900, color: '#fff',
                    fontFamily: 'var(--font-display)',
                    flexShrink: 0,
                }}>PJ</div>
                <span style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    letterSpacing: '0.1em',
                    color: 'var(--text-primary)',
                }}>
                    PRATHAMESH
                    <span style={{ color: 'var(--accent-red)', marginLeft: '0.25rem' }}>JOSHI</span>
                </span>
            </a>

            {/* Desktop Nav */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="desktop-nav">
                {navLinks.map((link) => (
                    <a
                        key={link.href}
                        href={link.href}
                        style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '0.65rem',
                            fontWeight: 600,
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                            color: activeSection === link.href.slice(1) ? 'var(--accent-red)' : 'var(--text-secondary)',
                            transition: 'color 0.2s ease',
                            position: 'relative',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                        onMouseLeave={e => (e.currentTarget.style.color = activeSection === link.href.slice(1) ? 'var(--accent-red)' : 'var(--text-secondary)')}
                    >
                        {link.label}
                        {activeSection === link.href.slice(1) && (
                            <motion.div
                                layoutId="navIndicator"
                                style={{
                                    position: 'absolute', bottom: '-4px', left: 0, right: 0,
                                    height: '2px', background: 'var(--accent-red)',
                                    boxShadow: '0 0 8px rgba(255,0,0,0.6)',
                                }}
                            />
                        )}
                    </a>
                ))}
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {/* Race Mode */}
                <button
                    onClick={onToggleRace}
                    title="Race Mode"
                    style={{
                        display: 'flex', alignItems: 'center', gap: '0.4rem',
                        padding: '0.4rem 0.8rem',
                        border: `1px solid ${raceMode ? 'var(--accent-red)' : 'rgba(255,255,255,0.15)'}`,
                        borderRadius: '4px',
                        background: raceMode ? 'rgba(255,0,0,0.15)' : 'transparent',
                        color: raceMode ? 'var(--accent-red)' : 'var(--text-muted)',
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.55rem',
                        letterSpacing: '0.1em',
                        fontWeight: 700,
                        transition: 'all 0.2s ease',
                        cursor: 'none',
                    }}
                >
                    <Zap size={11} />
                    RACE
                </button>

                {/* Performance Mode */}
                <button
                    onClick={onTogglePerf}
                    title="Performance Mode (reduces animations)"
                    style={{
                        display: 'flex', alignItems: 'center', gap: '0.4rem',
                        padding: '0.4rem 0.8rem',
                        border: `1px solid ${perfMode ? 'var(--accent-blue)' : 'rgba(255,255,255,0.15)'}`,
                        borderRadius: '4px',
                        background: perfMode ? 'rgba(0,212,255,0.1)' : 'transparent',
                        color: perfMode ? 'var(--accent-blue)' : 'var(--text-muted)',
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.55rem',
                        letterSpacing: '0.1em',
                        fontWeight: 700,
                        transition: 'all 0.2s ease',
                        cursor: 'none',
                    }}
                >
                    <Activity size={11} />
                    PERF
                </button>

                {/* Hamburger */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="hamburger"
                    style={{ color: 'var(--text-primary)', display: 'none', cursor: 'none' }}
                >
                    {menuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            position: 'absolute',
                            top: '70px',
                            left: 0,
                            right: 0,
                            background: 'rgba(5, 5, 7, 0.97)',
                            backdropFilter: 'blur(20px)',
                            borderBottom: '1px solid rgba(255,0,0,0.15)',
                            padding: '1.5rem 2rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.5rem',
                        }}
                    >
                        {navLinks.map(link => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={() => setMenuOpen(false)}
                                style={{
                                    fontFamily: 'var(--font-display)',
                                    fontSize: '0.8rem',
                                    letterSpacing: '0.15em',
                                    textTransform: 'uppercase',
                                    color: 'var(--text-secondary)',
                                }}
                            >
                                {link.label}
                            </a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: block !important; }
        }
      `}</style>
        </motion.nav>
    )
}
