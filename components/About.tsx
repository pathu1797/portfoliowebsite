'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Cpu, Brain, Target, GitBranch } from 'lucide-react'

const stats = [
    { value: '9.86', label: 'CGPA', suffix: '/10' },
  { value: '2', label: 'Projects & Counting', suffix: '' },
    { value: '1st', label: 'Year B.Tech', suffix: '' },
    { value: 'AI/ML', label: 'Specialization', suffix: '' },
]

const traits = [
    { icon: '⚡', title: 'Speed Thinker', desc: 'Rapid prototyping and problem decomposition in competitive environments.' },
    { icon: '🎯', title: 'Precision Engineer', desc: 'Data-driven decisions, zero-defect mindset, and surgical code quality.' },
    { icon: '🧠', title: 'AI Architect', desc: 'Designing intelligent systems from concept to deployment.' },
    { icon: '🏎️', title: 'Race Mentality', desc: 'School cricket team. Won interschool district level, played at zonal level. Always iterating to win.' },
]

export default function About() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-100px' })

    return (
        <section id="about" className="section carbon-bg" ref={ref}>
            <div className="container">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <div className="section-label">Engine Profile</div>
                    <h2 className="section-title" style={{ marginBottom: '1rem' }}>
                        The <span>Driver</span> Behind the Machine
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', lineHeight: 1.8, marginBottom: '4rem' }}>
                        A first-year B.Tech student at Vidya Pratishthan's Kamalnayan Bajaj Institute of Engineering & Technology, specializing in Computer Engineering. I approach every problem
            like a race engineer — with telemetry, strategy, and relentless execution.
                    </p>
                </motion.div>

                {/* Stats row */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                    gap: '1rem',
                    marginBottom: '4rem',
                }}>
                    {stats.map((s, i) => (
                        <motion.div
                            key={s.label}
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className="glass-card"
                            style={{ padding: '1.5rem', textAlign: 'center' }}
                        >
                            <div style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '2rem',
                                fontWeight: 900,
                                color: 'var(--text-primary)',
                                lineHeight: 1,
                            }}>
                                {s.value}
                                <span style={{ fontSize: '0.8rem', color: 'var(--accent-red)' }}>{s.suffix}</span>
                            </div>
                            <div style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '0.55rem',
                                letterSpacing: '0.2em',
                                color: 'var(--text-muted)',
                                marginTop: '0.4rem',
                                textTransform: 'uppercase',
                            }}>{s.label}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Trait cards */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                    gap: '1.5rem',
                }}>
                    {traits.map((t, i) => (
                        <motion.div
                            key={t.title}
                            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 0.2 + i * 0.12, duration: 0.6 }}
                            className="glass-card"
                            style={{ padding: '2rem', display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}
                        >
                            <div style={{
                                fontSize: '1.8rem',
                                flexShrink: 0,
                                width: '48px', height: '48px',
                                background: 'rgba(255, 0, 0, 0.08)',
                                border: '1px solid rgba(255, 0, 0, 0.2)',
                                borderRadius: '8px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                                {t.icon}
                            </div>
                            <div>
                                <div style={{
                                    fontFamily: 'var(--font-display)',
                                    fontWeight: 700,
                                    fontSize: '0.85rem',
                                    marginBottom: '0.5rem',
                                    color: 'var(--text-primary)',
                                }}>{t.title}</div>
                                <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6 }}>
                                    {t.desc}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
