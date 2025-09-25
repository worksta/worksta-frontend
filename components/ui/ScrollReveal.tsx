'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'

type AnimationVariant = 'fadeIn' | 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight' | 'zoomIn' | 'scaleUp' | 'slideIn'

interface ScrollRevealProps {
  children: React.ReactNode
  variant?: AnimationVariant
  delay?: number
  duration?: number
  className?: string
  once?: boolean
}

const variants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  },
  fadeInDown: {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 }
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 }
  },
  zoomIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 }
  },
  slideIn: {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 }
  }
}

export function ScrollReveal({
  children,
  variant = 'fadeInUp',
  delay = 0,
  duration = 0.5,
  className = '',
  once = true
}: ScrollRevealProps) {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.1, once })
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (inView && !hasAnimated) {
      controls.start('visible')
      if (once) setHasAnimated(true)
    } else if (!inView && !once && hasAnimated) {
      controls.start('hidden')
      setHasAnimated(false)
    }
  }, [controls, inView, once, hasAnimated])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants[variant]}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function ScrollRevealGroup({
  children,
  variant = 'fadeInUp',
  staggerDelay = 0.1,
  duration = 0.5,
  className = '',
  once = true
}: ScrollRevealProps & { staggerDelay?: number }) {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.1, once })
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (inView && !hasAnimated) {
      controls.start('visible')
      if (once) setHasAnimated(true)
    } else if (!inView && !once && hasAnimated) {
      controls.start('hidden')
      setHasAnimated(false)
    }
  }, [controls, inView, once, hasAnimated])

  return (
    <div ref={ref} className={className}>
      {React.Children.map(children, (child, i) => (
        <motion.div
          initial="hidden"
          animate={controls}
          variants={variants[variant]}
          transition={{ duration, delay: i * staggerDelay, ease: 'easeOut' }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  )
}