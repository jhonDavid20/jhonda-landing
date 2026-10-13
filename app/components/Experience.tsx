'use client'

import { useLanguage } from '../contexts/LanguageContext'
import { translations, stack } from '../translations/translations'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

export default function Experience() {
    const { language } = useLanguage()
    const t = translations[language].experience

    return (
        <section id="experience" className="py-20 sm:py-28">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <SectionHeading eyebrow={t.eyebrow} title={t.title} />

                <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
                    <ol className="relative space-y-10 border-l border-white/10 pl-6 sm:pl-8">
                        {t.items.map((item, i) => (
                            <Reveal key={item.role} as="li" delay={0.06 * i} className="relative">
                                <span
                                    className={`absolute -left-[31px] sm:-left-[39px] top-1.5 h-3.5 w-3.5 rounded-full border-2 ${
                                        i === 0 ? 'border-primary bg-primary shadow-[0_0_0_4px_rgba(255,107,91,0.2)]' : 'border-zinc-600 bg-ink-950'
                                    }`}
                                    aria-hidden
                                />
                                <p className="text-sm font-medium text-primary">{item.period}</p>
                                <h3 className="mt-1 font-display text-xl font-semibold text-white">{item.role}</h3>
                                <p className="text-sm text-zinc-500">{item.company}</p>
                                <ul className="mt-4 space-y-2 text-zinc-400">
                                    {item.points.map((point) => (
                                        <li key={point} className="flex gap-3 leading-relaxed">
                                            <span className="mt-2.5 h-1 w-3 shrink-0 rounded-full bg-zinc-700" aria-hidden />
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </Reveal>
                        ))}
                    </ol>

                    <Reveal className="lg:sticky lg:top-28 h-fit rounded-3xl border border-white/10 bg-ink-900 p-6 sm:p-8">
                        <h3 className="font-display text-lg font-semibold text-white">{t.stackTitle}</h3>
                        <ul className="mt-5 flex flex-wrap gap-2">
                            {stack.map((tool) => (
                                <li
                                    key={tool}
                                    className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-sm text-zinc-300 transition hover:border-primary/40 hover:text-white"
                                >
                                    {tool}
                                </li>
                            ))}
                        </ul>
                    </Reveal>
                </div>
            </div>
        </section>
    )
}
