'use client'

import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../translations/translations'

export default function Footer() {
    const { language } = useLanguage()
    const footer = translations[language].footer

    return (
        <footer className="py-8 px-4 border-t border-gray-800 text-center text-gray-500 text-xs sm:text-sm">
            <p>{footer}</p>
        </footer>
    )
}
