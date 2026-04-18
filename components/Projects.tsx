'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, Filter } from 'lucide-react'

const filters = ['All', 'AI/ML', 'Web', 'IoT']

const projects = [
  {
    id: 1,
    title: 'Mandatory Hygiene Gateway',
    desc: 'An IoT-integrated smart sanitation enforcement system that uses computer vision and sensor fusion to detect and ensure hand-hygiene compliance in public and institutional spaces. Combines real-time AI inference, embedded systems, and a monitoring dashboard.',
    tags: ['IoT', 'Hardware'],
    tech: ['Arduino', 'Tinkercad', 'C++ (Basic)', 'Servo Motor', 'IR Sensor'],
    github: '',
    live: '#',
    accent: 'var(--accent-red)',
    featured: true,
  },
  {
    id: 2,
    title: 'F1 Portfolio — Portfolio OS',
    desc: 'This very portfolio — a premium, Formula 1–inspired web experience engineered from scratch. Features a race-countdown preloader, canvas particle trails, scroll-reactive speedometer HUD, telemetry skill dashboard, and Race/Performance mode toggles.',
    tags: ['Web'],
    tech: ['Next.js 14', 'TypeScript', 'Framer Motion', 'CSS3'],
    github: '#',
    live: '#',
    accent: 'var(--accent-neon)',
    featured: true,
  },
  {
    id: 3,
    title: 'PROJECT APEX // CLASSIFIED',
    desc: 'Next-generation AI/ML telemetry pipeline currently in the wind tunnel. Model architecture and capabilities are under embargo until the next season. STATUS: COMING SOON.',
    tags: ['AI/ML'],
    tech: ['In Development', 'Neural Networks', 'Heavy Compute'],
    github: '',
    live: '',
    accent: 'var(--accent-blue)',
    featured: false,
  },
]

function ProjectCard({
  project,
  index,
  inView,
}: {
  project: (typeof projects)[0]
  index: number
  inView: boolean
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        background: 'var(--bg-glass)',
        border: `1px solid ${hovered ? project.accent + '66' : 'var(--border-subtle)'}`,
        borderRadius: 'var(--radius-md)',
        padding: '2rem',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: hovered ? 'translateY(-6px) scale(1.01)' : 'none',
        boxShadow: hovered ? `0 20px 60px ${project.accent}22, 0 0 0 1px ${project.accent}33` : 'none',
        overflow: 'hidden',
      }}
    >
      {/* Glow top border */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, height: '2px',
        background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
        opacity: hovered ? 1 : 0.3,
        transition: 'opacity 0.3s ease',
      }} />

      {/* Featured badge */}
      {project.featured && (
        <div style={{
          position: 'absolute', top: '1rem', right: '1rem',
          fontFamily: 'var(--font-display)', fontSize: '0.5rem', letterSpacing: '0.2em',
          color: project.accent, border: `1px solid ${project.accent}55`,
          padding: '0.2rem 0.6rem', borderRadius: '99px',
          background: `${project.accent}11`,
        }}>FEATURED</div>
      )}

      {/* Header */}
      <div style={{ marginBottom: '1rem' }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1rem', fontWeight: 800,
          color: 'var(--text-primary)',
          marginBottom: '0.75rem',
          letterSpacing: '0.02em',
        }}>
          {project.title}
        </div>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '0.875rem',
          lineHeight: 1.65,
        }}>
          {project.desc}
        </p>
      </div>

      {/* Tech stack */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
        {project.tech.map(t => (
          <span key={t} className="tech-chip">{t}</span>
        ))}
      </div>

      {/* Links */}
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        {project.github && (
          <a
            href={project.github}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.35rem',
              fontFamily: 'var(--font-display)', fontSize: '0.6rem',
              letterSpacing: '0.15em', fontWeight: 700,
              color: 'var(--text-muted)',
              border: '1px solid var(--border-subtle)',
              padding: '0.4rem 0.8rem', borderRadius: '4px',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.3)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-subtle)' }}
          >
            <Github size={11} /> Code
          </a>
        )}
        {project.live && (
          <a
            href={project.live}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.35rem',
              fontFamily: 'var(--font-display)', fontSize: '0.6rem',
              letterSpacing: '0.15em', fontWeight: 700,
              color: project.accent,
              border: `1px solid ${project.accent}44`,
              padding: '0.4rem 0.8rem', borderRadius: '4px',
              background: `${project.accent}0d`,
              transition: 'all 0.2s ease',
            }}
          >
            <ExternalLink size={11} /> Live
          </a>
        )}
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.tags.includes(activeFilter))

  return (
    <section id="projects" className="section carbon-bg" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '3rem' }}
        >
          <div className="section-label">Racing Garage</div>
          <h2 className="section-title" style={{ marginBottom: '1rem' }}>
            My <span>Machines</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '540px', lineHeight: 1.8 }}>
            Each project is a finely tuned machine — engineered for purpose, tested under pressure, and built to win.
          </p>
        </motion.div>

        {/* Filter bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '3rem' }}
        >
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.6rem',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                padding: '0.5rem 1.2rem',
                borderRadius: '4px',
                border: `1px solid ${activeFilter === f ? 'var(--accent-red)' : 'var(--border-subtle)'}`,
                background: activeFilter === f ? 'rgba(255,0,0,0.12)' : 'transparent',
                color: activeFilter === f ? 'var(--accent-red)' : 'var(--text-muted)',
                cursor: 'none',
                transition: 'all 0.2s ease',
              }}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} inView={inView} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
