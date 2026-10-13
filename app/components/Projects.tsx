'use client'

import Image from 'next/image'
import { ExternalLink, Github, ArrowUpRight, Sparkles } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../translations/translations'
import { projects } from '../data/projects'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

export default function Projects() {
    const { language } = useLanguage()
    const t = translations[language].projects

    return (
        <section id="work" className="py-20 sm:py-28">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <SectionHeading eyebrow={t.eyebrow} title={t.title} />

                <div className="space-y-6">
                    {projects.map((project, i) => (
                        <Reveal key={project.id} as="article">
                            <div className="group grid overflow-hidden rounded-3xl border border-white/10 bg-ink-900 lg:grid-cols-[1.3fr_1fr]">
                                {/* Preview in a browser frame */}
                                <a
                                    href={project.links.live ?? project.links.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="relative block bg-gradient-to-br from-primary/20 via-ink-800 to-ink-900 p-4 sm:p-8"
                                    aria-label={`${project.title[language]} — ${t.liveDemo}`}
                                >
                                    <div className="overflow-hidden rounded-xl border border-white/10 bg-ink-950 shadow-2xl transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-[1.01]">
                                        <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2.5" aria-hidden>
                                            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                                            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                                            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                                        </div>
                                        <div className="relative aspect-[16/10]">
                                            <Image
                                                src={project.image}
                                                alt={project.imageAlt[language]}
                                                fill
                                                sizes="(min-width: 1024px) 640px, 100vw"
                                                className="object-cover object-top"
                                            />
                                        </div>
                                    </div>
                                </a>

                                <div className="flex flex-col p-6 sm:p-8">
                                    {i === 0 && (
                                        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                                            <Sparkles size={14} aria-hidden />
                                            {t.featured}
                                        </span>
                                    )}
                                    <h3 className="mt-4 font-display text-2xl sm:text-3xl font-semibold text-white">{project.title[language]}</h3>
                                    <p className="mt-3 leading-relaxed text-zinc-400">{project.description[language]}</p>

                                    <h4 className="mt-6 text-xs font-semibold uppercase tracking-wider text-zinc-500">{t.keyFeatures}</h4>
                                    <ul className="mt-3 grid gap-2 text-sm text-zinc-300">
                                        {project.features[language].map((feature) => (
                                            <li key={feature} className="flex gap-2">
                                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    <h4 className="sr-only">{t.techStack}</h4>
                                    <ul className="mt-6 flex flex-wrap gap-2">
                                        {project.tags.map((tag) => (
                                            <li key={tag} className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-300">
                                                {tag}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="mt-auto flex flex-wrap gap-3 pt-8">
                                        {project.links.live && (
                                            <a
                                                href={project.links.live}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink-950 transition hover:bg-primary"
                                            >
                                                {t.liveDemo}
                                                <ExternalLink size={16} aria-hidden />
                                            </a>
                                        )}
                                        {project.links.github && (
                                            <a
                                                href={project.links.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                                            >
                                                <Github size={16} aria-hidden />
                                                {t.viewCode}
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    ))}

                    <Reveal>
                        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-dashed border-white/15 p-6 sm:flex-row sm:items-center sm:p-8">
                            <div>
                                <h3 className="font-display text-xl font-semibold text-white">{t.moreTitle}</h3>
                                <p className="mt-2 max-w-xl text-zinc-400">{t.moreText}</p>
                            </div>
                            <a
                                href="#contact"
                                className="group inline-flex shrink-0 items-center gap-2 font-semibold text-primary"
                            >
                                {t.moreCta}
                                <ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                            </a>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    )
}
