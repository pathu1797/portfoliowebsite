'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, ExternalLink, Mail } from 'lucide-react'

interface HeroProps {
    raceMode: boolean
}

export default function Hero({ raceMode }: HeroProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const mouseRef = useRef({ x: 0, y: 0 })
    const particlesRef = useRef<Array<{
        x: number; y: number; vx: number; vy: number;
        life: number; maxLife: number; size: number; color: string;
    }>>([])
    const isRaceModeRef = useRef(raceMode)

    useEffect(() => {
      isRaceModeRef.current = raceMode
    }, [raceMode])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resize()
        window.addEventListener('resize', resize)

        const onMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY }
            // Spawn particles near cursor
            for (let i = 0; i < 2; i++) {
                particlesRef.current.push({
                    x: e.clientX + (Math.random() - 0.5) * 20,
                    y: e.clientY + (Math.random() - 0.5) * 20,
                    vx: (Math.random() - 0.5) * 3,
                    vy: -Math.random() * 2 - 0.5,
                    life: 1,
                    maxLife: 40 + Math.random() * 40,
                    size: Math.random() * 2 + 0.5,
                    color: Math.random() > 0.5 ? '#FF0000' : '#00D4FF',
                })
            }
        }
        window.addEventListener('mousemove', onMouseMove)

        // Static speed streaks
        const streaks = Array.from({ length: 20 }, () => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            length: Math.random() * 200 + 60,
            speed: Math.random() * 4 + 2,
            opacity: Math.random() * 0.15 + 0.05,
            color: Math.random() > 0.7 ? 'rgba(255,0,0,' : 'rgba(0,212,255,',
        }))

        let animId: number
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            if (isRaceModeRef.current) {
                // Speed streaks
                streaks.forEach(s => {
                    s.x -= s.speed
                    if (s.x + s.length < 0) {
                        s.x = canvas.width + s.length
                        s.y = Math.random() * canvas.height
                    }
                    const grad = ctx.createLinearGradient(s.x, s.y, s.x + s.length, s.y)
                    grad.addColorStop(0, s.color + '0)')
                    grad.addColorStop(0.5, s.color + s.opacity + ')')
                    grad.addColorStop(1, s.color + '0)')
                    ctx.strokeStyle = grad
                    ctx.lineWidth = 1
                    ctx.beginPath()
                    ctx.moveTo(s.x, s.y)
                    ctx.lineTo(s.x + s.length, s.y)
                    ctx.stroke()
                })

                // Cursor particles
                particlesRef.current = particlesRef.current.filter(p => p.life > 0)
                particlesRef.current.forEach(p => {
                    p.life--
                    p.x += p.vx
                    p.y += p.vy
                    p.vy += 0.05
                    const alpha = p.life / p.maxLife
                    ctx.beginPath()
                    ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2)
                    ctx.fillStyle = p.color.replace(')', `, ${alpha})`).replace('#', 'rgba(').replace('FF0000', '255, 0, 0').replace('00D4FF', '0, 212, 255')
                    ctx.fill()
                })
            }

            animId = requestAnimationFrame(draw)
        }
        draw()

        return () => {
            cancelAnimationFrame(animId)
            window.removeEventListener('resize', resize)
            window.removeEventListener('mousemove', onMouseMove)
        }
    }, [])

    return (
        <section
            id="hero"
            style={{
                position: 'relative',
                height: '100vh',
                minHeight: '700px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(255, 0, 0, 0.08) 0%, transparent 65%), var(--bg-primary)',
            }}
        >
            {/* Grid */}
            <div className="grid-bg" style={{
                position: 'absolute', inset: 0,
                background: `
          radial-gradient(ellipse 80% 60% at 50% 40%, rgba(255, 0, 0, 0.08) 0%, transparent 65%),
          linear-gradient(rgba(255, 0, 0, 0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 0, 0, 0.04) 1px, transparent 1px)
        `,
                backgroundSize: '100% 100%, 60px 60px, 60px 60px',
            }} />

            {/* Canvas for particles & streaks */}
            <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />

            {/* Gradient overlays */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to bottom, transparent 60%, var(--bg-primary) 100%)',
                pointerEvents: 'none',
            }} />

            {/* Content */}
            <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
                {/* Status badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.4rem 1.2rem',
                        border: '1px solid rgba(57, 255, 20, 0.3)',
                        borderRadius: '99px',
                        marginBottom: '2rem',
                        background: 'rgba(57, 255, 20, 0.06)',
                    }}
                >
                    <div style={{
                        width: '6px', height: '6px',
                        borderRadius: '50%',
                        background: '#39FF14',
                        boxShadow: '0 0 8px #39FF14',
                        animation: 'blink 1.5s ease-in-out infinite',
                    }} />
                    <span style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.6rem',
                        letterSpacing: '0.25em',
                        color: '#39FF14',
                        fontWeight: 700,
                    }}>
                        OPEN TO OPPORTUNITIES
                    </span>
                </motion.div>

                {/* Main heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 900,
                        fontSize: 'clamp(2.5rem, 7vw, 6rem)',
                        lineHeight: 1.0,
                        letterSpacing: '-0.03em',
                        marginBottom: '1.5rem',
                    }}
                >
                    <span style={{
                        display: 'block',
                        background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.85) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                    }}>
                        PRATHAMESH
                    </span>
                    <span style={{
                        display: 'block',
                        background: 'linear-gradient(135deg, #FF0000 0%, #FF4444 60%, #FF0000 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        filter: 'drop-shadow(0 0 30px rgba(255,0,0,0.5))',
                    }}>
                        JOSHI
                    </span>
                </motion.h1>

                {/* Divider line */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    style={{
                        width: '120px',
                        height: '2px',
                        background: 'linear-gradient(90deg, transparent, var(--accent-red), transparent)',
                        margin: '0 auto 1.5rem',
                        boxShadow: '0 0 10px rgba(255,0,0,0.5)',
                    }}
                />

                {/* Sub-role */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                    style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(0.7rem, 2vw, 1rem)',
                        letterSpacing: '0.3em',
                        color: 'var(--accent-blue)',
                        textTransform: 'uppercase',
                        marginBottom: '1rem',
                        fontWeight: 600,
                    }}
                >
                    Future AI Engineer
                </motion.div>

                {/* Subheadline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.85, duration: 0.6 }}
                    style={{
                        fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
                        color: 'var(--text-secondary)',
                        maxWidth: '560px',
                        margin: '0 auto 3rem',
                        lineHeight: 1.7,
                        fontWeight: 400,
                    }}
                >
                    Engineering intelligent systems with{' '}
                    <span style={{ color: 'var(--accent-red)', fontWeight: 600 }}>speed</span>,{' '}
                    <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>precision</span>, and{' '}
                    <span style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>performance</span>
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.6 }}
                    style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
                >
                    <a href="#projects" className="btn-primary">
                        <ExternalLink size={14} />
                        Explore Projects
                    </a>
                    <a href="#contact" className="btn-outline">
                        <Mail size={14} />
                        Contact
                    </a>
                </motion.div>

                {/* Stat strip */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                    style={{
                        marginTop: '2rem',
                        display: 'flex',
                        gap: '3rem',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                    }}
                >
                    {[
                        { value: '9.86', label: 'CGPA' },
                        { value: '2', label: 'Projects & Counting' },
                        { value: '0', label: 'Publications' },
                        { value: '∞', label: 'Drive' },
                    ].map((stat) => (
                        <div key={stat.label} style={{ textAlign: 'center' }}>
                            <div style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '1.8rem',
                                fontWeight: 900,
                                color: 'var(--text-primary)',
                                lineHeight: 1,
                            }}>{stat.value}</div>
                            <div style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '0.55rem',
                                letterSpacing: '0.15em',
                                color: 'var(--text-muted)',
                                marginTop: '0.3rem',
                            }}>{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                style={{
                    position: 'absolute',
                    bottom: '1rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem',
                }}
            >
                <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.55rem',
                    letterSpacing: '0.25em',
                    color: 'var(--text-muted)',
                }}>SCROLL</span>
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                >
                    <ChevronDown size={18} color="var(--accent-red)" />
                </motion.div>
            </motion.div>
        </section>
    )
}
