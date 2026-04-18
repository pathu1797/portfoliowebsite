'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null)
    const trailRef = useRef<HTMLDivElement>(null)
    const posRef = useRef({ x: 0, y: 0 })
    const trailPosRef = useRef({ x: 0, y: 0 })

    useEffect(() => {
        const cursor = cursorRef.current
        const trail = trailRef.current
        if (!cursor || !trail) return

        const onMove = (e: MouseEvent) => {
            posRef.current = { x: e.clientX, y: e.clientY }
            cursor.style.transform = `translate(${e.clientX - 8}px, ${e.clientY - 8}px)`
        }

        const animate = () => {
            trailPosRef.current.x += (posRef.current.x - trailPosRef.current.x) * 0.12
            trailPosRef.current.y += (posRef.current.y - trailPosRef.current.y) * 0.12
            trail.style.transform = `translate(${trailPosRef.current.x - 20}px, ${trailPosRef.current.y - 20}px)`
            requestAnimationFrame(animate)
        }

        const onEnter = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            if (target.closest('a, button, [role="button"]')) {
                cursor.classList.add('cursor-hover')
            }
        }

        const onLeave = () => {
            cursor.classList.remove('cursor-hover')
        }

        document.addEventListener('mousemove', onMove)
        document.addEventListener('mouseover', onEnter)
        document.addEventListener('mouseout', onLeave)

        const animId = requestAnimationFrame(animate)

        return () => {
            document.removeEventListener('mousemove', onMove)
            document.removeEventListener('mouseover', onEnter)
            document.removeEventListener('mouseout', onLeave)
        }
    }, [])

    return (
        <>
            <style>{`
        .custom-cursor {
          position: fixed;
          width: 16px;
          height: 16px;
          pointer-events: none;
          z-index: 99999;
          top: 0; left: 0;
          will-change: transform;
        }
        .cursor-dot {
          width: 100%;
          height: 100%;
          background: #FF0000;
          clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
          transition: transform 0.15s ease, background 0.15s ease;
          animation: spin-slow 4s linear infinite;
          box-shadow: 0 0 10px rgba(255, 0, 0, 0.8);
        }
        .cursor-hover .cursor-dot {
          transform: scale(1.8);
          background: #00D4FF;
        }
        .cursor-trail {
          position: fixed;
          width: 40px;
          height: 40px;
          pointer-events: none;
          z-index: 99998;
          top: 0; left: 0;
          will-change: transform;
        }
        .trail-ring {
          width: 100%;
          height: 100%;
          border: 1px solid rgba(255, 0, 0, 0.4);
          border-radius: 50%;
          transition: border-color 0.2s ease;
        }
        @media (max-width: 768px) {
          .custom-cursor, .cursor-trail { display: none; }
        }
      `}</style>
            <div ref={trailRef} className="cursor-trail">
                <div className="trail-ring" />
            </div>
            <div ref={cursorRef} className="custom-cursor">
                <div className="cursor-dot" />
            </div>
        </>
    )
}
