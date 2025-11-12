'use client'

import { Mail, Github, Linkedin } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../translations/translations'

export default function AboutSection() {
    const [isVisible, setIsVisible] = useState(false)
    const sectionRef = useRef<HTMLElement>(null)
    const { language } = useLanguage()
    const t = translations[language].about
    const btn = translations[language].buttons
    const footer = translations[language].footer

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    })

    // Parallax transformations
    const titleY = useTransform(scrollYProgress, [0, 1], [100, -100])
    const contentY = useTransform(scrollYProgress, [0, 1], [150, -50])
    const buttonsY = useTransform(scrollYProgress, [0, 1], [200, -100])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    setIsVisible(entry.isIntersecting)
                })
            },
            { threshold: 0.2 }
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current)
            }
        }
    }, [])

    return (
        <section ref={sectionRef} className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
            <div className="max-w-3xl">
                <motion.h2
                    style={{ y: titleY }}
                    className={`text-4xl md:text-5xl font-bold text-center mb-12 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0 delay-[100ms]' : 'opacity-0 translate-y-4'}`}
                >
                    {t.title}
                </motion.h2>

                <motion.div
                    style={{ y: contentY }}
                    className="space-y-6 text-gray-300 text-center leading-relaxed"
                >
                    <p className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0 delay-[200ms]' : 'opacity-0 translate-y-4'}`}>
                        {t.paragraph1}
                    </p>

                    <p className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0 delay-[300ms]' : 'opacity-0 translate-y-4'}`}>
                        {t.paragraph2}
                    </p>

                    <p className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0 delay-[400ms]' : 'opacity-0 translate-y-4'}`}>
                        {t.paragraph3}{' '}
                        <a
                            href="https://clutchdevs.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-red-500 hover:underline"
                        >
                            ClutchDevs
                        </a>{' '}
                        {t.paragraph3After}
                    </p>

                    <p className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0 delay-[500ms]' : 'opacity-0 translate-y-4'}`}>
                        {t.paragraph4}
                    </p>
                </motion.div>

                {/* Contact Buttons */}
                <motion.div
                    style={{ y: buttonsY }}
                    className={`flex flex-wrap justify-center gap-6 mt-16 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0 delay-[600ms]' : 'opacity-0 translate-y-4'}`}
                >
                    <a
                        href="mailto:jhonps396@gmail.com"
                        className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-lg flex items-center gap-3 transition-colors"
                    >
                        <Mail size={24} />
                        <span className="text-lg font-medium">{btn.email}</span>
                    </a>

                    <a
                        href="https://github.com/jhonDavid20"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-lg flex items-center gap-3 transition-colors"
                    >
                        <Github size={24} />
                        <span className="text-lg font-medium">{btn.github}</span>
                    </a>

                    <a
                        href="https://www.linkedin.com/in/jhondavidbp/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-lg flex items-center gap-3 transition-colors"
                    >
                        <Linkedin size={24} />
                        <span className="text-lg font-medium">{btn.linkedin}</span>
                    </a>
                </motion.div>

                {/* Footer */}
                <motion.footer
                    style={{ y: buttonsY }}
                    className={`mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0 delay-[700ms]' : 'opacity-0 translate-y-4'}`}
                >
                    <p>{footer}</p>
                </motion.footer>
            </div>
        </section>
    )
}
