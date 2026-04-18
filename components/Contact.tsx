'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Send, Github, Linkedin, Mail, CheckCircle, AlertCircle } from 'lucide-react'

const socials = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/pathu1797', user: '@pathu1797' },
  { icon: Linkedin, label: 'LinkedIn', href: 'http://linkedin.com/in/prathamesh-joshi-1797psj', user: 'Prathamesh Joshi' },
  { icon: Mail, label: 'Email', href: 'mailto:prathameshjoshi1797@gmail.com', user: 'prathameshjoshi1797@gmail.com' },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [focused, setFocused] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setStatus('sending')
    
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || 'YOUR_ACCESS_KEY_HERE',
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      })
      
      const data = await res.json()
      
      if (data.success) {
        setStatus('sent')
        setForm({ name: '', email: '', message: '' })
      } else {
        console.error("Web3Forms error:", data)
        setStatus('error')
      }
    } catch (error) {
      console.error('Fetch error:', error)
      setStatus('error')
    }
    
    setTimeout(() => setStatus('idle'), 4000)
  }

  const inputStyle = (name: string) => ({
    width: '100%',
    padding: '1rem 1.25rem',
    background: 'rgba(255,255,255,0.03)',
    border: `1px solid ${focused === name ? 'var(--accent-red)' : 'var(--border-subtle)'}`,
    borderRadius: 'var(--radius-sm)',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'all 0.3s ease',
    boxShadow: focused === name ? '0 0 20px rgba(255,0,0,0.12), inset 0 0 20px rgba(255,0,0,0.03)' : 'none',
  } as React.CSSProperties)

  return (
    <section id="contact" className="section" ref={ref} style={{
      background: 'var(--bg-primary)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Animated grid background */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `
          radial-gradient(ellipse 60% 40% at 50% 100%, rgba(255,0,0,0.06) 0%, transparent 70%),
          linear-gradient(rgba(255, 0, 0, 0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 0, 0, 0.04) 1px, transparent 1px)
        `,
        backgroundSize: '100% 100%, 40px 40px, 40px 40px',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '4rem', textAlign: 'center' }}
        >
          <div className="section-label" style={{ justifyContent: 'center' }}>Control Center</div>
          <h2 className="section-title" style={{ marginBottom: '1rem' }}>
            Open a <span>Comm Channel</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '480px', margin: '0 auto', lineHeight: 1.8 }}>
            Whether you have a mission, a project, or just want to talk strategy — my comms are always open.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '3rem',
          alignItems: 'start',
        }}>
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--accent-red)', marginBottom: '0.5rem', fontWeight: 700 }}>
                  CALLSIGN (NAME)
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused(null)}
                  placeholder="Your name"
                  style={inputStyle('name')}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--accent-red)', marginBottom: '0.5rem', fontWeight: 700 }}>
                  FREQUENCY (EMAIL)
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                  placeholder="your@email.com"
                  style={inputStyle('email')}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--accent-red)', marginBottom: '0.5rem', fontWeight: 700 }}>
                  TRANSMISSION (MESSAGE)
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused(null)}
                  placeholder="Tell me about your mission..."
                  rows={5}
                  style={{ ...inputStyle('message'), resize: 'vertical', minHeight: '130px' }}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending' || status === 'sent'}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem',
                  padding: '1rem 2rem',
                  background: status === 'sent' ? 'rgba(57,255,20,0.15)' : 'var(--accent-red)',
                  border: `1px solid ${status === 'sent' ? '#39FF14' : 'transparent'}`,
                  color: status === 'sent' ? '#39FF14' : '#fff',
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em',
                  borderRadius: 'var(--radius-sm)',
                  cursor: status === 'sending' || status === 'sent' ? 'not-allowed' : 'none',
                  opacity: status === 'sending' ? 0.7 : 1,
                  transition: 'all 0.3s ease',
                  boxShadow: status !== 'sent' ? '0 0 20px rgba(255,0,0,0.3)' : '0 0 20px rgba(57,255,20,0.2)',
                }}
              >
                <AnimatePresence mode="wait">
                  {status === 'idle' && (
                    <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Send size={14} /> TRANSMIT MESSAGE
                    </motion.span>
                  )}
                  {status === 'sending' && (
                    <motion.span key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      SENDING...
                    </motion.span>
                  )}
                  {status === 'sent' && (
                    <motion.span key="sent" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <CheckCircle size={14} /> MESSAGE RECEIVED
                    </motion.span>
                  )}
                  {status === 'error' && (
                    <motion.span key="error" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <AlertCircle size={14} /> TRANSMISSION FAILED
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </form>
          </motion.div>

          {/* Right: Social links + status */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.6 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
          >
            {/* System status */}
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: '0.6rem',
                letterSpacing: '0.2em', color: 'var(--text-muted)', marginBottom: '1.25rem',
              }}>SYSTEM STATUS</div>
              {[
                { label: 'Available for Internship', status: true },
                { label: 'Open to Full-time Roles', status: false },
                { label: 'Research Collaboration', status: true },
                { label: 'Freelance Projects', status: true },
              ].map(s => (
                <div key={s.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.6rem 0', borderBottom: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{s.label}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <div style={{
                      width: '6px', height: '6px', borderRadius: '50%',
                      background: s.status ? '#39FF14' : 'var(--text-muted)',
                      boxShadow: s.status ? '0 0 8px #39FF14' : 'none',
                      animation: s.status ? 'blink 2s ease-in-out infinite' : 'none',
                    }} />
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.55rem', letterSpacing: '0.1em', color: s.status ? '#39FF14' : 'var(--text-muted)' }}>
                      {s.status ? 'ACTIVE' : 'CLOSED'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--text-muted)' }}>COMMUNICATION CHANNELS</div>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card"
                  style={{
                    padding: '1rem 1.25rem',
                    display: 'flex', alignItems: 'center', gap: '1rem',
                  }}
                >
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '8px',
                    background: 'rgba(255,0,0,0.1)',
                    border: '1px solid rgba(255,0,0,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <s.icon size={16} color="var(--accent-red)" />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.75rem', marginBottom: '0.2rem' }}>{s.label}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{s.user}</div>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
