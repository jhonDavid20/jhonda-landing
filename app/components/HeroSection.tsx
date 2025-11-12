'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../translations/translations'

export default function HeroSection() {
    const sectionRef = useRef<HTMLElement>(null)
    const { language } = useLanguage()
    const t = translations[language].hero

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    })

    // Parallax transformations
    const imageY = useTransform(scrollYProgress, [0, 1], [0, 200])
    const textY = useTransform(scrollYProgress, [0, 1], [0, 300])
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

    return (
        <section ref={sectionRef} className="relative min-h-[100dvh] flex flex-col items-center justify-center px-4 sm:px-6 md:px-8">
            <motion.div
                style={{ y: imageY, opacity }}
                className="flex flex-col items-center gap-6 sm:gap-8"
            >
                {/* Avatar Image */}
                {/* <motion.div
                    className="relative w-48 h-64"
                    style={{ y: imageY }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-40 rounded-3xl z-10"></div>
                    <Image
                        src="/jbarrios.jpg"
                        alt="Jhon"
                        width={200}
                        height={260}
                        className="w-full h-full object-cover rounded-3xl shadow-2xl"
                        priority
                    />
                </motion.div> */}

                {/* Hero Text */}
                <motion.div
                    className="text-center max-w-2xl"
                    style={{ y: textY }}
                >
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
                        {language === 'en' ? "I'm" : "Soy"} <span className="text-white">{t.name}</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-red-500 italic mb-3 sm:mb-4 px-4 sm:px-0">
                        {t.title}{' '}
                        <a
                            href="https://clutchdevs.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                        >
                            {t.company}
                        </a>
                    </p>
                    <p className="text-gray-300 text-base sm:text-lg px-4 sm:px-0">
                        {t.tagline}
                    </p>
                </motion.div>
            </motion.div>
        </section>
    )
}
