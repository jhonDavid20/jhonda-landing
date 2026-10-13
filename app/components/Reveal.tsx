'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ReactNode } from 'react'

interface RevealProps {
    children: ReactNode
    delay?: number
    className?: string
    as?: 'div' | 'li' | 'article'
}

// Fades content up once when it enters the viewport. Respects reduced-motion.
export default function Reveal({ children, delay = 0, className, as = 'div' }: RevealProps) {
    const reduce = useReducedMotion()
    const Component = motion[as]

    return (
        <Component
            className={className}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </Component>
    )
}
