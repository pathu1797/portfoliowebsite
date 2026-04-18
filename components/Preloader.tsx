'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PreloaderProps {
    onComplete: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
    const [count, setCount] = useState(3)
    const [phase, setPhase] = useState<'counting' | 'go' | 'exiting'>('counting')
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const progressInterval = setInterval(() => {
            setProgress(p => Math.min(p + 1.2, 100))
        }, 40)

        const timer1 = setTimeout(() => setCount(2), 1000)
        const timer2 = setTimeout(() => setCount(1), 2000)
        const timer3 = setTimeout(() => setPhase('go'), 3000)
        const timer4 = setTimeout(() => {
            setPhase('exiting')
            setTimeout(onComplete, 600)
        }, 3800)

        return () => {
            clearInterval(progressInterval)
            clearTimeout(timer1)
            clearTimeout(timer2)
            clearTimeout(timer3)
            clearTimeout(timer4)
        }
    }, [onComplete])

    return (
        <motion.div
            className="preloader"
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                background: '#050507',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
            }}
        >
            {/* Animated grid background */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `
          linear-gradient(rgba(255, 0, 0, 0.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 0, 0, 0.06) 1px, transparent 1px)
        `,
                backgroundSize: '60px 60px',
                opacity: 0.8,
            }} />

            {/* Speed streaks */}
            {[...Array(8)].map((_, i) => (
                <div
                    key={i}
                    style={{
                        position: 'absolute',
                        height: '1px',
                        width: `${Math.random() * 200 + 100}px`,
                        background: `linear-gradient(90deg, transparent, rgba(255, 0, 0, ${0.3 + Math.random() * 0.5}), transparent)`,
                        top: `${10 + i * 12}%`,
                        left: 0,
                        animation: `streak ${0.8 + Math.random() * 0.6}s ease-in-out ${i * 0.15}s infinite`,
                    }}
                />
            ))}

            {/* Logo */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.7rem',
                    letterSpacing: '0.4em',
                    color: 'rgba(255,255,255,0.4)',
                    textTransform: 'uppercase',
                    marginBottom: '3rem',
                }}
            >
                Prathamesh Joshi — Portfolio
            </motion.div>

            {/* Countdown display */}
            <div style={{ position: 'relative', width: '200px', height: '200px' }}>
                {/* Ring */}
                <svg
                    width="200" height="200"
                    style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}
                >
                    <circle cx="100" cy="100" r="88" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
                    <motion.circle
                        cx="100" cy="100" r="88"
                        fill="none"
                        stroke="#FF0000"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray={553}
                        strokeDashoffset={553 - (553 * progress / 100)}
                        style={{
                            filter: 'drop-shadow(0 0 8px #FF0000)',
                            transition: 'stroke-dashoffset 0.04s linear',
                        }}
                    />
                </svg>

                {/* Center count/GO */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                }}>
                    <AnimatePresence mode="wait">
                        {phase === 'counting' && (
                            <motion.div
                                key={count}
                                initial={{ scale: 1.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.4, opacity: 0 }}
                                transition={{ duration: 0.35 }}
                                style={{
                                    fontFamily: 'var(--font-display)',
                                    fontSize: '5rem',
                                    fontWeight: 900,
                                    color: '#FF0000',
                                    lineHeight: 1,
                                    textShadow: '0 0 40px rgba(255,0,0,0.8)',
                                }}
                            >
                                {count}
                            </motion.div>
                        )}
                        {phase === 'go' && (
                            <motion.div
                                key="go"
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 1.5, opacity: 0 }}
                                transition={{ duration: 0.4, ease: 'easeOut' }}
                                style={{
                                    fontFamily: 'var(--font-display)',
                                    fontSize: '3rem',
                                    fontWeight: 900,
                                    color: '#39FF14',
                                    lineHeight: 1,
                                    textShadow: '0 0 40px rgba(57,255,20,0.8)',
                                    letterSpacing: '0.1em',
                                }}
                            >
                                GO!
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <div style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.55rem',
                        letterSpacing: '0.3em',
                        color: 'rgba(255,255,255,0.3)',
                        textTransform: 'uppercase',
                    }}>
                        {phase === 'go' ? 'Launching...' : 'Race Start'}
                    </div>
                </div>
            </div>

            {/* Progress bar */}
            <div style={{
                marginTop: '3rem',
                width: '300px',
                height: '2px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '1px',
                overflow: 'hidden',
            }}>
                <div style={{
                    height: '100%',
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, #FF0000, #FF4444)',
                    boxShadow: '0 0 10px rgba(255,0,0,0.6)',
                    transition: 'width 0.04s linear',
                    borderRadius: '1px',
                }} />
            </div>

            <div style={{
                marginTop: '1rem',
                fontFamily: 'var(--font-display)',
                fontSize: '0.55rem',
                letterSpacing: '0.3em',
                color: 'rgba(255,255,255,0.25)',
                textTransform: 'uppercase',
            }}>
                Initialising Systems — {Math.round(progress)}%
            </div>
        </motion.div>
    )
}
