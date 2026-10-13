'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Language = 'en' | 'es'

interface LanguageContextType {
    language: Language
    setLanguage: (lang: Language) => void
    toggleLanguage: () => void
    mounted: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>('en')
    const [mounted, setMounted] = useState(false)

    // Load saved language preference on mount
    useEffect(() => {
        let savedLanguage: string | null = null
        try {
            savedLanguage = localStorage.getItem('language')
        } catch {}
        if (savedLanguage === 'en' || savedLanguage === 'es') {
            setLanguageState(savedLanguage)
        } else if (navigator.language?.toLowerCase().startsWith('es')) {
            // First visit: follow the browser's language
            setLanguageState('es')
        }
        setMounted(true)
    }, [])

    useEffect(() => {
        document.documentElement.lang = language
    }, [language])

    // Save language preference to localStorage
    const setLanguage = (lang: Language) => {
        setLanguageState(lang)
        try {
            localStorage.setItem('language', lang)
        } catch {}
    }

    const toggleLanguage = () => {
        const newLanguage = language === 'en' ? 'es' : 'en'
        setLanguage(newLanguage)
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, mounted }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider')
    }
    return context
}
