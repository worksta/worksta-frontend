'use client'

import React, { useEffect, useState } from 'react'

export function AnimatedBackground() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Dark background */}
      <div className="absolute inset-0 bg-black"></div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full" 
          style={{
            backgroundImage: `linear-gradient(#6b21a8 0.5px, transparent 0.5px), linear-gradient(to right, #6b21a8 0.5px, transparent 0.5px)`,
            backgroundSize: '40px 40px'
          }}>
        </div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full animate-particle-float opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 6}s`,
              width: `${Math.max(1, Math.random() * 3)}px`,
              height: `${Math.max(1, Math.random() * 3)}px`,
            }}
          />
        ))}
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-pink-600/10"></div>

      {/* Animated blobs */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-3xl animate-blob" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-pink-500/5 rounded-full blur-3xl animate-blob" style={{animationDelay: '4s'}}></div>
      
      {/* Radial gradient for depth */}
      <div className="absolute inset-0 bg-radial-gradient"></div>
      
      {/* Subtle scan line effect */}
      <div className="absolute inset-0 bg-scan-line opacity-5"></div>
    </div>
  )
}
