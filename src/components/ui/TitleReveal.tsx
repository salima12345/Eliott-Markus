'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface AnimatedTitleProps {
  text: string
  className?: string
  style?: React.CSSProperties
}

const AnimatedTitle: React.FC<AnimatedTitleProps> = ({ text, className, style }) => {
  const characters = Array.from(text)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.5 })

  return (
    <h1 ref={containerRef} className={`overflow-hidden ${className}`}
    style={{ ...style, position: 'relative' }}>
      {characters.map((char, index) => (
        <motion.span
        style={{  position: 'relative' }}

          key={index}
          className="inline-block"
          initial={{ opacity: 0, y: '50%' }}
          animate={isInView ? { opacity: 1, y: '0%' } : { opacity: 0, y: '50%' }}
          transition={{
            duration: 0.3,
            ease: [0.33, 1, 0.68, 1],
            delay: index * 0.02,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </h1>
  )
}

export default AnimatedTitle

