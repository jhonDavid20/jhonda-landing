'use client'

import { useLanguage } from '../contexts/LanguageContext'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function LanguageToggle() {
    const { language, toggleLanguage, mounted } = useLanguage()
    const [supportsEmoji, setSupportsEmoji] = useState(true)

    useEffect(() => {
        // Check if browser is Chrome on Windows (doesn't render flag emojis properly)
        const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)
        const isWindows = /Win/.test(navigator.platform)
        setSupportsEmoji(!(isChrome && isWindows))
    }, [])

    const getDisplayContent = () => {
        if (supportsEmoji) {
            return language === 'en' ? '🇺🇸' : '🇪🇸'
        }
        return language === 'en' ? 'EN' : 'ES'
    }

    const textClass = supportsEmoji ? 'text-3xl' : 'text-2xl font-bold text-white'

    if (!mounted) {
        return (
            <button className="fixed top-6 left-6 z-50 w-14 h-14 rounded-full bg-gray-800/70 backdrop-blur-md shadow-xl flex items-center justify-center">
                <span className="text-2xl font-bold text-white">EN</span>
            </button>
        )
    }

    return (
        <motion.button
            onClick={toggleLanguage}
            className="fixed top-6 left-6 z-50 w-14 h-14 rounded-full bg-gray-800/70 backdrop-blur-md hover:bg-gray-700/80 shadow-xl flex items-center justify-center transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
        >
            <span
                className={textClass}
                role="img"
                aria-label={language === 'en' ? 'English' : 'Spanish'}
            >
                {getDisplayContent()}
            </span>
        </motion.button>
    )
}
