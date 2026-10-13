'use client'

import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../translations/translations'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

export default function Process() {
    const { language } = useLanguage()
    const t = translations[language].process

    return (
        <section className="border-y border-white/5 bg-ink-900/50 py-20 sm:py-28">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <SectionHeading eyebrow={t.eyebrow} title={t.title} />
                <ol className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6 lg:before:absolute lg:before:inset-x-0 lg:before:top-5 lg:before:h-px lg:before:bg-gradient-to-r lg:before:from-primary/60 lg:before:via-white/10 lg:before:to-transparent">
                    {t.steps.map((step, i) => (
                        <Reveal key={step.title} as="li" delay={0.08 * i} className="relative">
                            <span className="relative z-10 grid h-10 w-10 place-items-center rounded-full border border-primary/40 bg-ink-950 font-display text-sm font-semibold text-primary">
                                {i + 1}
                            </span>
                            <h3 className="mt-5 font-display text-lg font-semibold text-white">{step.title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-zinc-400">{step.description}</p>
                        </Reveal>
                    ))}
                </ol>
            </div>
        </section>
    )
}
