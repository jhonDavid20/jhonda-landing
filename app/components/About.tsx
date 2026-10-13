'use client'

import { Heart, MessageCircle, Layers } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { translations, contactInfo } from '../translations/translations'
import Reveal from './Reveal'

const valueIcons = [Heart, MessageCircle, Layers]

export default function About() {
    const { language } = useLanguage()
    const t = translations[language].about

    return (
        <section id="about" className="border-y border-white/5 bg-ink-900/50 py-20 sm:py-28">
            <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
                <Reveal>
                    <p className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.18em] text-primary">
                        <span className="h-px w-6 bg-primary" aria-hidden />
                        {t.eyebrow}
                    </p>
                    <h2 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white text-balance">
                        {t.title}
                    </h2>
                </Reveal>

                <div>
                    <div className="space-y-5 text-base sm:text-lg leading-relaxed text-zinc-400">
                        {t.paragraphs.map((paragraph, i) => (
                            <Reveal key={i} delay={0.06 * i}>
                                <p>
                                    {i === t.paragraphs.length - 1
                                        ? paragraph.split('ClutchDevs').map((part, j, arr) => (
                                              <span key={j}>
                                                  {part}
                                                  {j < arr.length - 1 && (
                                                      <a
                                                          href={contactInfo.company}
                                                          target="_blank"
                                                          rel="noopener noreferrer"
                                                          className="font-medium text-white underline decoration-primary/60 underline-offset-4 hover:decoration-primary"
                                                      >
                                                          ClutchDevs
                                                      </a>
                                                  )}
                                              </span>
                                          ))
                                        : paragraph}
                                </p>
                            </Reveal>
                        ))}
                    </div>

                    <ul className="mt-10 grid gap-4 sm:grid-cols-3">
                        {t.values.map((value, i) => {
                            const Icon = valueIcons[i]
                            return (
                                <Reveal key={value.title} as="li" delay={0.08 * i}>
                                    <div className="h-full rounded-2xl border border-white/10 bg-ink-950/60 p-5">
                                        <Icon size={20} className="text-primary" aria-hidden />
                                        <h3 className="mt-3 font-semibold text-white">{value.title}</h3>
                                        <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{value.description}</p>
                                    </div>
                                </Reveal>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </section>
    )
}
