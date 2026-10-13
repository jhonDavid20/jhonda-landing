'use client'

import { ArrowUp } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../translations/translations'

export default function Footer() {
    const { language } = useLanguage()
    const t = translations[language].footer

    return (
        <footer className="border-t border-white/5">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-zinc-500 sm:flex-row sm:px-6">
                <p>
                    © {new Date().getFullYear()} Jhonathan Barrios. {t.rights}
                </p>
                <p className="hidden md:block">{t.built}</p>
                <a href="#top" className="inline-flex items-center gap-1.5 transition hover:text-white">
                    {t.top}
                    <ArrowUp size={14} aria-hidden />
                </a>
            </div>
        </footer>
    )
}
