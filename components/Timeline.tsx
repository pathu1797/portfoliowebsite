'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const events = [
  {
    year: '2022',
    title: 'School Cricket Team',
    org: 'District & Zonal Level',
    detail: 'Part of the school cricket team. Won at the interschool district level and played at the zonal level — demonstrating teamwork and competitive execution.',
    type: 'leadership',
    color: 'var(--accent-gold)',
  },
  {
    year: '2023',
    title: 'Secondary School Certificate (SSC)',
    org: 'Maharashtra State Board of Secondary and Higher Secondary Education',
    detail: 'Cleared 10th grade with an outstanding score of 91.20%.',
    type: 'education',
    color: 'var(--accent-blue)',
  },
  {
    year: '2024',
    title: 'Open Source Contributor',
    org: 'GitHub',
    detail: 'Active contributor and started working on my own projects.',
    type: 'achievement',
    color: 'var(--accent-blue)',
  },
  {
    year: '2025',
    title: 'Higher Secondary Certificate (HSC)',
    org: 'Maharashtra State Board of Secondary and Higher Secondary Education',
    detail: 'Cleared 12th grade with First Class.',
    type: 'education',
    color: 'var(--accent-blue)',
  },
  {
    year: '2025',
    title: 'B.Tech — Computer Engineering',
    org: "VPKBIET",
    detail: "Enrolled at Vidya Pratishthan's Kamalnayan Bajaj Institute of Engineering & Technology, pursuing B.Tech in Computer Engineering. CGPA: 9.86/10",
    type: 'education',
    color: 'var(--accent-blue)',
  },
  {
    year: '2026',
    title: 'IET KK WAGH EXPO 2026',
    org: 'KK WAGH Institute',
    detail: 'Showcasing the "Mandatory Hygiene Gateway" project at the IET KK WAGH EXPO 2026.',
    type: 'competition',
    color: 'var(--accent-neon)',
  },
]

const typeIcons: Record<string, string> = {
  education: '🎓',
  leadership: '🏏',
  competition: '⚡',
  research: '📄',
  achievement: '🏆',
  experience: '💼',
}

export default function Timeline() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="timeline" className="section" ref={ref} style={{
      background: 'linear-gradient(to bottom, var(--bg-secondary), var(--bg-primary))',
    }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '4rem' }}
        >
          <div className="section-label">Race Season</div>
          <h2 className="section-title">
            Season <span>Progression</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '540px', lineHeight: 1.8, marginTop: '1rem' }}>
            Every lap counts. Every sector sharpens the edge. Here's the race log.
          </p>
        </motion.div>

        {/* Timeline track */}
        <div style={{ position: 'relative', paddingLeft: '2rem' }}>
          {/* Vertical track line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute',
              left: '0',
              top: 0,
              bottom: 0,
              width: '2px',
              background: 'linear-gradient(to bottom, var(--accent-red), rgba(255,0,0,0.1))',
              boxShadow: '0 0 8px rgba(255,0,0,0.3)',
              transformOrigin: 'top',
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {events.map((ev, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                style={{
                  position: 'relative',
                  paddingLeft: '2rem',
                  paddingBottom: '2.5rem',
                }}
              >
                {/* Node */}
                <div style={{
                  position: 'absolute',
                  left: '-2.5rem',
                  top: '4px',
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  border: `2px solid ${ev.color}`,
                  background: 'var(--bg-primary)',
                  boxShadow: `0 0 12px ${ev.color}88`,
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.4rem',
                }}>
                  <div style={{
                    width: '5px', height: '5px',
                    borderRadius: '50%',
                    background: ev.color,
                    boxShadow: `0 0 6px ${ev.color}`,
                  }} />
                </div>

                {/* Card */}
                <div
                  className="glass-card"
                  style={{
                    padding: '1.5rem',
                    borderLeftColor: `${ev.color}44`,
                    borderLeftWidth: '3px',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.boxShadow = `0 0 20px ${ev.color}22`
                    el.style.borderLeftColor = `${ev.color}88`
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.boxShadow = ''
                    el.style.borderLeftColor = `${ev.color}44`
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                        <span style={{ fontSize: '1rem' }}>{typeIcons[ev.type]}</span>
                        <span style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 800,
                          fontSize: '0.9rem',
                          color: 'var(--text-primary)',
                        }}>{ev.title}</span>
                      </div>
                      <div style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.6rem',
                        letterSpacing: '0.15em',
                        color: ev.color,
                        marginBottom: '0.75rem',
                        fontWeight: 700,
                      }}>{ev.org}</div>
                      <p style={{
                        color: 'var(--text-secondary)',
                        fontSize: '0.875rem',
                        lineHeight: 1.65,
                      }}>{ev.detail}</p>
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 900,
                      fontSize: '1.4rem',
                      color: `${ev.color}44`,
                      letterSpacing: '-0.02em',
                      flexShrink: 0,
                    }}>{ev.year}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
