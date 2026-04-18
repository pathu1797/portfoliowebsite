'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const skillCategories = [
    {
        id: 'programming',
        label: 'Programming',
        icon: '💻',
        color: 'var(--accent-red)',
        skills: [
      { name: 'Python', level: 60 },
      { name: 'C', level: 50 },
      { name: 'HTML', level: 40 },
      { name: 'CSS', level: 40 },
      { name: 'JavaScript', level: 20 },
      { name: 'Java', level: 20 },
    ],
    },
    {
        id: 'aiml',
        label: 'AI / ML',
        icon: '🧠',
        color: 'var(--accent-blue)',
        skills: [
            { name: 'TensorFlow', level: 6 },
            { name: 'PyTorch', level: 8 },
            { name: 'Scikit-Learn', level: 10 },
            { name: 'OpenCV', level: 12 },
            { name: 'NLP / LLMs', level: 5 },
            { name: 'Data Analysis', level: 15 },
        ],
    },
    {
        id: 'aitools',
        label: 'AI Tools',
        icon: '🤖',
        color: 'var(--accent-gold)',
        skills: [
            { name: 'Google Gemini', level: 48 },
            { name: 'ChatGPT', level: 45 },
            { name: 'Claude', level: 42 },
            { name: 'Antigravity', level: 50 },
            { name: 'Cursor', level: 46 },
            { name: 'Claude Code', level: 43 },
        ],
    },
    {
        id: 'problem',
        label: 'Problem Solving',
        icon: '🎯',
        color: 'var(--accent-neon)',
        skills: [
      { name: 'Debugging', level: 55 },
      { name: 'DSA', level: 45 },
      { name: 'Research Skills', level: 40 },
      { name: 'Algorithm Design', level: 35 },
      { name: 'Competitive Prog.', level: 30 },
      { name: 'System Design', level: 15 },
    ],
    },
]

function GaugeBar({ level, color, delay = 0, inView }: { level: number; color: string; delay?: number; inView: boolean }) {
    return (
        <div style={{ position: 'relative', height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', overflow: 'hidden' }}>
            <motion.div
                initial={{ width: 0 }}
                animate={inView ? { width: `${level}%` } : {}}
                transition={{ duration: 1, delay: delay + 0.3, ease: [0.16, 1, 0.3, 1] }}
                style={{
                    height: '100%',
                    background: `linear-gradient(90deg, ${color}88, ${color})`,
                    borderRadius: '2px',
                    boxShadow: `0 0 8px ${color}66`,
                    position: 'relative',
                }}
            >
                <div style={{
                    position: 'absolute',
                    right: 0, top: '-2px',
                    width: '8px', height: '8px',
                    borderRadius: '50%',
                    background: color,
                    boxShadow: `0 0 6px ${color}`,
                }} />
            </motion.div>
        </div>
    )
}

function CircleGauge({ level, color, size = 80 }: { level: number; color: string; size?: number }) {
    const r = (size - 10) / 2
    const circ = 2 * Math.PI * r
    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
            <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="5" />
            <motion.circle
                cx={size / 2} cy={size / 2} r={r}
                fill="none"
                stroke={color}
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray={circ}
                initial={{ strokeDashoffset: circ }}
                animate={{ strokeDashoffset: circ - (circ * level / 100) }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                style={{ filter: `drop-shadow(0 0 4px ${color})` }}
            />
        </svg>
    )
}

export default function Skills() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-100px' })

    return (
        <section id="skills" className="section" ref={ref} style={{
            background: 'linear-gradient(to bottom, var(--bg-primary), var(--bg-secondary))',
        }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    style={{ marginBottom: '4rem' }}
                >
                    <div className="section-label">Telemetry Dashboard</div>
                    <h2 className="section-title">Technical <span>Performance</span></h2>
                </motion.div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '1.5rem',
                }}>
                    {skillCategories.map((cat, ci) => (
                        <motion.div
                            key={cat.id}
                            initial={{ opacity: 0, y: 40 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: ci * 0.12, duration: 0.6 }}
                            className="glass-card"
                            style={{ padding: '2rem' }}
                        >
                            {/* Category header */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: '1.5rem',
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <span style={{ fontSize: '1.4rem' }}>{cat.icon}</span>
                                    <div>
                                        <div style={{
                                            fontFamily: 'var(--font-display)',
                                            fontWeight: 700,
                                            fontSize: '0.8rem',
                                            color: 'var(--text-primary)',
                                            letterSpacing: '0.05em',
                                        }}>{cat.label}</div>
                                        <div style={{
                                            fontFamily: 'var(--font-display)',
                                            fontSize: '0.55rem',
                                            letterSpacing: '0.15em',
                                            color: cat.color,
                                            opacity: 0.8,
                                        }}>SECTOR {ci + 1}</div>
                                    </div>
                                </div>
                                <CircleGauge
                                    level={Math.round(cat.skills.reduce((a, s) => a + s.level, 0) / cat.skills.length)}
                                    color={cat.color}
                                    size={56}
                                />
                            </div>

                            {/* Skill bars */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {cat.skills.map((skill, si) => (
                                    <div key={skill.name}>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            marginBottom: '0.4rem',
                                        }}>
                                            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                                                {skill.name}
                                            </span>
                                            <span style={{ fontSize: '0.7rem', color: cat.color, fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                                                {skill.level}%
                                            </span>
                                        </div>
                                        <GaugeBar level={skill.level} color={cat.color} delay={ci * 0.1 + si * 0.06} inView={inView} />
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
