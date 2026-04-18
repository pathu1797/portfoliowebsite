'use client'

import { useEffect, useRef, useState } from 'react'

export default function Speedometer() {
    const [speed, setSpeed] = useState(0)
    const lastScrollY = useRef(0)
    const lastTime = useRef(Date.now())

    useEffect(() => {
        let decayTimer: ReturnType<typeof setInterval>
        const onScroll = () => {
            const now = Date.now()
            const dy = Math.abs(window.scrollY - lastScrollY.current)
            const dt = now - lastTime.current
            const px_per_ms = dy / (dt || 1)
            const newSpeed = Math.min(Math.round(px_per_ms * 150), 320)
            setSpeed(newSpeed)
            lastScrollY.current = window.scrollY
            lastTime.current = now
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        decayTimer = setInterval(() => {
            setSpeed(s => Math.max(0, s - 8))
        }, 60)
        return () => {
            window.removeEventListener('scroll', onScroll)
            clearInterval(decayTimer)
        }
    }, [])

    const angle = -135 + (speed / 320) * 270
    const color = speed < 100 ? '#00D4FF' : speed < 200 ? '#FFD700' : '#FF0000'

    return (
        <div style={{
            position: 'fixed',
            bottom: '1.5rem',
            right: '1.5rem',
            zIndex: 500,
            width: '80px',
            height: '80px',
        }}>
            <svg width="80" height="80" viewBox="0 0 80 80">
                {/* Background arc */}
                <path
                    d="M 10 65 A 35 35 0 1 1 70 65"
                    fill="none"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="4"
                    strokeLinecap="round"
                />
                {/* Speed arc */}
                <path
                    d="M 10 65 A 35 35 0 1 1 70 65"
                    fill="none"
                    stroke={color}
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray="188"
                    strokeDashoffset={188 - (188 * Math.min(speed, 320) / 320)}
                    style={{
                        filter: `drop-shadow(0 0 4px ${color})`,
                        transition: 'stroke-dashoffset 0.1s ease, stroke 0.2s ease',
                    }}
                />
                {/* Needle */}
                <line
                    x1="40" y1="40"
                    x2={40 + 22 * Math.cos((angle - 90) * Math.PI / 180)}
                    y2={40 + 22 * Math.sin((angle - 90) * Math.PI / 180)}
                    stroke={color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    style={{ transition: 'all 0.1s ease, stroke 0.2s ease', filter: `drop-shadow(0 0 3px ${color})` }}
                />
                {/* Center dot */}
                <circle cx="40" cy="40" r="3" fill={color} style={{ filter: `drop-shadow(0 0 4px ${color})` }} />
                {/* Speed text */}
                <text x="40" y="58" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="'Orbitron', monospace">
                    {speed}
                </text>
                <text x="40" y="67" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="5" fontFamily="'Orbitron', monospace">
                    KM/H
                </text>
            </svg>
        </div>
    )
}
