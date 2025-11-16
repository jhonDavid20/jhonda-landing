'use client'

import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../translations/translations'
import { motion } from 'framer-motion'
import { Download } from 'lucide-react'

export default function CVDownloadButton() {
    const { language, mounted } = useLanguage()
    const t = translations[language].buttons

    if (!mounted) {
        return (
            <a
                href="/jhonCV.pdf"
                download
                className="flex-shrink-0 h-12 sm:h-14 rounded-full bg-gray-800/70 backdrop-blur-md shadow-xl flex items-center justify-center px-4"
            >
                <Download className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </a>
        )
    }

    return (
        <div className="group flex-shrink-0 p-3 -m-3">
            <motion.a
                href="/jhonCV.pdf"
                download
                className="h-12 sm:h-14 rounded-full bg-gray-800/70 backdrop-blur-md group-hover:bg-gray-700/80 shadow-xl flex items-center justify-center transition-all duration-300 overflow-hidden w-12 sm:w-14 group-hover:w-auto group-hover:px-4"
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
            >
                <Download className="w-5 h-5 sm:w-6 sm:h-6 text-white flex-shrink-0" />
                <span className="text-white text-sm sm:text-base font-medium whitespace-nowrap max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300">
                    {t.downloadCV}
                </span>
            </motion.a>
        </div>
    )
}
