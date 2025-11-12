'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function ScrollIndicator() {
    const [activeSection, setActiveSection] = useState(0)

    useEffect(() => {
        const sections = document.querySelectorAll('section')

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const sectionIndex = Array.from(sections).indexOf(entry.target as HTMLElement)
                        setActiveSection(sectionIndex)
                    }
                })
            },
            {
                threshold: 0.5,
                rootMargin: '-50px 0px -50px 0px'
            }
        )

        sections.forEach((section) => observer.observe(section))

        return () => {
            sections.forEach((section) => observer.unobserve(section))
        }
    }, [])

    const scrollToSection = (index: number) => {
        const sections = document.querySelectorAll('section')
        sections[index]?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-4">
            {[0, 1].map((index) => (
                <motion.button
                    key={index}
                    onClick={() => scrollToSection(index)}
                    className="group relative"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={index === 0 ? 'Go to Hero section' : 'Go to About section'}
                >
                    <div
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            activeSection === index
                                ? 'bg-white scale-100'
                                : 'bg-gray-500 scale-75 group-hover:bg-gray-400'
                        }`}
                    />
                </motion.button>
            ))}
        </div>
    )
}
