'use client'

import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../translations/translations'

export default function LanguageToggle() {
    const { language, setLanguage } = useLanguage()
    const t = translations[language].nav

    return (
        <div
            role="group"
            aria-label={t.switchLang}
            className="relative flex items-center rounded-full border border-white/10 bg-white/5 p-1 text-xs font-semibold"
        >
            {(['en', 'es'] as const).map((lang) => (
                <button
                    key={lang}
                    type="button"
                    onClick={() => setLanguage(lang)}
                    aria-pressed={language === lang}
                    className={`rounded-full px-2.5 py-1 uppercase transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary ${
                        language === lang ? 'bg-white text-ink-950' : 'text-zinc-400 hover:text-white'
                    }`}
                >
                    {lang}
                </button>
            ))}
        </div>
    )
}
