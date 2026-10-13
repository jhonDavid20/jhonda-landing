'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Download } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { translations, contactInfo } from '../translations/translations'
import LanguageToggle from './LanguageToggle'

const sectionIds = ['services', 'work', 'about', 'experience'] as const

export default function Navbar() {
    const { language } = useLanguage()
    const t = translations[language].nav
    const [scrolled, setScrolled] = useState(false)
    const [open, setOpen] = useState(false)
    const [active, setActive] = useState<string>('')

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 16)
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    // Highlight the nav link of the section currently in view
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActive(entry.target.id)
                })
            },
            { rootMargin: '-45% 0px -50% 0px' }
        )
        ;[...sectionIds, 'contact', 'top'].forEach((id) => {
            const el = document.getElementById(id)
            if (el) observer.observe(el)
        })
        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : ''
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
        window.addEventListener('keydown', onKey)
        return () => {
            document.body.style.overflow = ''
            window.removeEventListener('keydown', onKey)
        }
    }, [open])

    const links = sectionIds.map((id) => ({ id, label: t[id] }))

    return (
        <header
            className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
                open
                    ? 'border-b border-white/10 bg-ink-950'
                    : scrolled
                    ? 'border-b border-white/10 bg-ink-950/80 backdrop-blur-xl' : 'border-b border-transparent'
            }`}
        >
            <nav className="mx-auto flex h-16 sm:h-20 max-w-6xl items-center justify-between px-4 sm:px-6">
                <a href="#top" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary font-display text-sm font-bold text-ink-950 transition-transform group-hover:rotate-6">
                        JB
                    </span>
                    <span className="hidden sm:block font-display font-semibold text-white">Jhonathan Barrios</span>
                </a>

                <ul className="hidden md:flex items-center gap-1">
                    {links.map((link) => (
                        <li key={link.id}>
                            <a
                                href={`#${link.id}`}
                                aria-current={active === link.id ? 'true' : undefined}
                                className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
                                    active === link.id ? 'text-white' : 'text-zinc-400 hover:text-white'
                                }`}
                            >
                                {active === link.id && (
                                    <motion.span
                                        layoutId="nav-pill"
                                        className="absolute inset-0 -z-10 rounded-full bg-white/10"
                                        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                                    />
                                )}
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-2 sm:gap-3">
                    <LanguageToggle />
                    <a
                        href={contactInfo.resume}
                        download
                        className="hidden lg:inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-zinc-300 hover:text-white transition-colors"
                    >
                        <Download size={16} aria-hidden />
                        {t.cv}
                    </a>
                    <a
                        href="#contact"
                        className="hidden md:inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink-950 transition hover:bg-primary"
                    >
                        {t.contact}
                    </a>
                    <button
                        type="button"
                        onClick={() => setOpen((v) => !v)}
                        aria-expanded={open}
                        aria-controls="mobile-menu"
                        aria-label={open ? t.close : t.menu}
                        className="md:hidden grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white"
                    >
                        {open ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </nav>

            <AnimatePresence>
                {open && (
                    <motion.div
                        id="mobile-menu"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'calc(100dvh - 4rem)' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="md:hidden overflow-hidden"
                    >
                        <ul className="flex flex-col gap-1 px-4 pt-4">
                            {links.map((link, i) => (
                                <motion.li
                                    key={link.id}
                                    initial={{ opacity: 0, x: -12 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.05 * i }}
                                >
                                    <a
                                        href={`#${link.id}`}
                                        onClick={() => setOpen(false)}
                                        className="block rounded-2xl px-4 py-4 font-display text-2xl font-semibold text-white hover:bg-white/5"
                                    >
                                        {link.label}
                                    </a>
                                </motion.li>
                            ))}
                        </ul>
                        <div className="flex flex-col gap-3 px-8 pt-8">
                            <a
                                href="#contact"
                                onClick={() => setOpen(false)}
                                className="rounded-full bg-primary py-3.5 text-center font-semibold text-ink-950"
                            >
                                {t.contact}
                            </a>
                            <a
                                href={contactInfo.resume}
                                download
                                className="flex items-center justify-center gap-2 rounded-full border border-white/15 py-3.5 text-white"
                            >
                                <Download size={18} aria-hidden />
                                {t.cv}
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}
