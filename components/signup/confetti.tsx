"use client"

import { useEffect, useState } from "react"

export default function Confetti() {
  const [particles, setParticles] = useState<
    Array<{ id: number; left: number; delay: number; color: string; size: number }>
  >([])

  useEffect(() => {
    const colors = ["#10b981", "#34d399", "#6ee7b7", "#a7f3d0", "#ffffff"]
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 4,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute animate-confetti"
          style={{
            left: `${particle.left}%`,
            top: "-20px",
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            animationDelay: `${particle.delay}s`,
            borderRadius: Math.random() > 0.5 ? "50%" : "0",
          }}
        />
      ))}
      <style jsx>{`
        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-confetti {
          animation: confetti 3s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
