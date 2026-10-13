'use client'

import { useState } from 'react'
import { Mail, Copy, Check, Download, Github, Linkedin, ArrowRight } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { translations, contactInfo } from '../translations/translations'
import Reveal from './Reveal'

export default function Contact() {
    const { language } = useLanguage()
    const t = translations[language].contact
    const [copied, setCopied] = useState(false)

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(contactInfo.email)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch {
            window.location.href = `mailto:${contactInfo.email}`
        }
    }

    return (
        <section id="contact" className="py-20 sm:py-28">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <Reveal>
                    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-ink-800 via-ink-900 to-ink-950 px-6 py-14 sm:px-12 sm:py-20 text-center">
                        <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" aria-hidden />
                        <div
                            className="pointer-events-none absolute -bottom-32 left-1/2 h-72 w-[600px] -translate-x-1/2 rounded-full bg-primary/25 blur-[100px]"
                            aria-hidden
                        />

                        <div className="relative">
                            <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">{t.eyebrow}</p>
                            <h2 className="mx-auto mt-4 max-w-2xl font-display text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white text-balance">
                                {t.title}
                            </h2>
                            <p className="mx-auto mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-zinc-400">{t.subtitle}</p>

                            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                                <a
                                    href={`mailto:${contactInfo.email}`}
                                    className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 font-semibold text-ink-950 shadow-lg shadow-primary/25 transition hover:bg-white"
                                >
                                    <Mail size={18} aria-hidden />
                                    {t.emailCta}
                                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" aria-hidden />
                                </a>
                                <button
                                    type="button"
                                    onClick={copyEmail}
                                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-4 font-medium text-white transition hover:bg-white/10"
                                >
                                    {copied ? <Check size={18} className="text-emerald-400" aria-hidden /> : <Copy size={18} aria-hidden />}
                                    <span aria-live="polite">{copied ? t.copied : contactInfo.email}</span>
                                    <span className="sr-only">{!copied && t.copy}</span>
                                </button>
                            </div>

                            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                                {[
                                    { href: contactInfo.linkedin, icon: Linkedin, label: 'LinkedIn' },
                                    { href: contactInfo.github, icon: Github, label: 'GitHub' },
                                ].map(({ href, icon: Icon, label }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-zinc-400 transition hover:bg-white/5 hover:text-white"
                                    >
                                        <Icon size={16} aria-hidden />
                                        {label}
                                    </a>
                                ))}
                                <a
                                    href={contactInfo.resume}
                                    download
                                    className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-zinc-400 transition hover:bg-white/5 hover:text-white"
                                >
                                    <Download size={16} aria-hidden />
                                    {t.cv}
                                </a>
                            </div>

                            <p className="mt-8 text-sm text-zinc-500">{t.openTo}</p>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    )
}
