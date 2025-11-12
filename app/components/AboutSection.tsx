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

    // Parallax transformations - subtle and smooth
    const titleY = useTransform(scrollYProgress, [0, 1], [50, -50])
    const contentY = useTransform(scrollYProgress, [0, 1], [60, -20])
    const buttonsY = useTransform(scrollYProgress, [0, 1], [70, -30])

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
        <section ref={sectionRef} className="relative min-h-[100dvh] flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
            <div className="max-w-3xl w-full">
                <motion.h2
                    style={{ y: titleY }}
                    className={`text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-10 md:mb-12 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0 delay-[100ms]' : 'opacity-0 translate-y-4'}`}
                >
                    {t.title}
                </motion.h2>

                <motion.div
                    style={{ y: contentY }}
                    className="space-y-4 sm:space-y-6 text-gray-300 text-center leading-relaxed"
                >
                    <p className={`text-sm sm:text-base md:text-lg transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0 delay-[200ms]' : 'opacity-0 translate-y-4'}`}>
                        {t.paragraph1}
                    </p>

                    <p className={`text-sm sm:text-base md:text-lg transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0 delay-[300ms]' : 'opacity-0 translate-y-4'}`}>
                        {t.paragraph2}
                    </p>

                    <p className={`text-sm sm:text-base md:text-lg transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0 delay-[400ms]' : 'opacity-0 translate-y-4'}`}>
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

                    <p className={`text-sm sm:text-base md:text-lg transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0 delay-[500ms]' : 'opacity-0 translate-y-4'}`}>
                        {t.paragraph4}
                    </p>
                </motion.div>

                {/* Contact Buttons */}
                <motion.div
                    style={{ y: buttonsY }}
                    className={`flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 mt-12 sm:mt-14 md:mt-16 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0 delay-[600ms]' : 'opacity-0 translate-y-4'}`}
                >
                    <a
                        href="mailto:jhonps396@gmail.com"
                        className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg flex items-center justify-center gap-3 transition-colors"
                    >
                        <Mail size={20} className="sm:w-6 sm:h-6" />
                        <span className="text-base sm:text-lg font-medium">{btn.email}</span>
                    </a>

                    <a
                        href="https://github.com/jhonDavid20"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg flex items-center justify-center gap-3 transition-colors"
                    >
                        <Github size={20} className="sm:w-6 sm:h-6" />
                        <span className="text-base sm:text-lg font-medium">{btn.github}</span>
                    </a>

                    <a
                        href="https://www.linkedin.com/in/jhondavidbp/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg flex items-center justify-center gap-3 transition-colors"
                    >
                        <Linkedin size={20} className="sm:w-6 sm:h-6" />
                        <span className="text-base sm:text-lg font-medium">{btn.linkedin}</span>
                    </a>
                </motion.div>

                {/* Footer */}
                <motion.footer
                    style={{ y: buttonsY }}
                    className={`mt-12 sm:mt-14 md:mt-16 pt-6 sm:pt-8 border-t border-gray-800 text-center text-gray-500 text-xs sm:text-sm transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0 delay-[700ms]' : 'opacity-0 translate-y-4'}`}
                >
                    <p>{footer}</p>
                </motion.footer>
            </div>
        </section>
    )
}
