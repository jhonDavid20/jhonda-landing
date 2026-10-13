'use client'

import { LayoutTemplate, AppWindow, PenTool, Gauge, Check, LucideIcon } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../translations/translations'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

const icons: Record<string, LucideIcon> = {
    layout: LayoutTemplate,
    app: AppWindow,
    pen: PenTool,
    gauge: Gauge,
}

export default function Services() {
    const { language } = useLanguage()
    const t = translations[language].services

    return (
        <section id="services" className="py-20 sm:py-28">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

                <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
                    {t.items.map((service, i) => {
                        const Icon = icons[service.icon]
                        return (
                            <Reveal key={service.title} delay={0.06 * i} as="article">
                                <div className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-ink-900 p-6 sm:p-8 transition-colors hover:border-primary/40">
                                    <div
                                        className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-primary/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                                        aria-hidden
                                    />
                                    <div className="flex items-start justify-between">
                                        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20">
                                            <Icon size={22} aria-hidden />
                                        </span>
                                        <span className="font-display text-sm text-zinc-600">0{i + 1}</span>
                                    </div>
                                    <h3 className="mt-6 font-display text-xl sm:text-2xl font-semibold text-white">{service.title}</h3>
                                    <p className="mt-3 text-zinc-400 leading-relaxed">{service.description}</p>
                                    <ul className="mt-6 space-y-2.5">
                                        {service.points.map((point) => (
                                            <li key={point} className="flex items-center gap-3 text-sm text-zinc-300">
                                                <Check size={16} className="shrink-0 text-primary" aria-hidden />
                                                {point}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </Reveal>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
