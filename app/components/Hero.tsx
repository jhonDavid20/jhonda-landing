'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ArrowDown, MapPin, Github, Linkedin, Mail } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { translations, contactInfo } from '../translations/translations'

export default function Hero() {
    const { language } = useLanguage()
    const t = translations[language].hero
    const stats = translations[language].stats
    const reduce = useReducedMotion()

    const fadeUp = (delay: number) => ({
        initial: reduce ? false : { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
    })

    return (
        <section id="top" className="relative overflow-hidden pt-28 sm:pt-36 pb-16 sm:pb-24">
            {/* Background decoration */}
            <div className="pointer-events-none absolute inset-0 bg-grid" aria-hidden />
            <div
                className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]"
                aria-hidden
            />

            <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.25fr_1fr] lg:gap-10">
                <div>
                    <motion.div {...fadeUp(0)}>
                        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs sm:text-sm font-medium text-emerald-300">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                            </span>
                            {t.badge}
                        </span>
                    </motion.div>

                    <motion.p {...fadeUp(0.08)} className="mt-6 text-lg text-zinc-400">
                        {t.greeting} 👋
                    </motion.p>

                    <motion.h1
                        {...fadeUp(0.14)}
                        className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight text-white text-balance"
                    >
                        {t.titleA}{' '}
                        <span className="bg-gradient-to-r from-primary via-orange-300 to-amber-200 bg-clip-text text-transparent">
                            {t.titleB}
                        </span>
                    </motion.h1>

                    <motion.p {...fadeUp(0.22)} className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-zinc-400">
                        {t.subtitle}{' '}
                        <a
                            href={contactInfo.company}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-medium text-white underline decoration-primary/60 underline-offset-4 hover:decoration-primary"
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/favicon.ico" alt="" className="h-4 w-4" />
                            ClutchDevs
                        </a>
                        .
                    </motion.p>

                    <motion.div {...fadeUp(0.3)} className="mt-8 flex flex-col sm:flex-row gap-3">
                        <a
                            href="#contact"
                            className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-semibold text-ink-950 shadow-lg shadow-primary/25 transition hover:bg-white"
                        >
                            {t.primaryCta}
                            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" aria-hidden />
                        </a>
                        <a
                            href="#work"
                            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 font-semibold text-white transition hover:border-white/30 hover:bg-white/10"
                        >
                            {t.secondaryCta}
                            <ArrowDown size={18} aria-hidden />
                        </a>
                    </motion.div>

                    <motion.div {...fadeUp(0.38)} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-zinc-500">
                        <span className="inline-flex items-center gap-1.5">
                            <MapPin size={16} aria-hidden />
                            {t.location}
                        </span>
                        <span className="flex items-center gap-1">
                            {[
                                { href: contactInfo.github, icon: Github, label: 'GitHub' },
                                { href: contactInfo.linkedin, icon: Linkedin, label: 'LinkedIn' },
                                { href: `mailto:${contactInfo.email}`, icon: Mail, label: 'Email' },
                            ].map(({ href, icon: Icon, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target={href.startsWith('http') ? '_blank' : undefined}
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="grid h-9 w-9 place-items-center rounded-full text-zinc-400 transition hover:bg-white/10 hover:text-white"
                                >
                                    <Icon size={18} />
                                </a>
                            ))}
                        </span>
                    </motion.div>
                </div>

                {/* Portrait card */}
                <motion.div
                    initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="relative mx-auto w-full max-w-[340px] lg:max-w-[380px]"
                >
                    <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-primary/40 via-transparent to-amber-200/20 blur-xl" aria-hidden />
                    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-ink-800">
                        <Image
                            src="/jbarrios.jpg"
                            alt={t.photoAlt}
                            width={300}
                            height={400}
                            priority
                            className="aspect-[3/4] w-full object-cover grayscale-[20%]"
                        />
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink-950 via-ink-950/60 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-5">
                            <p className="font-display text-xl font-semibold text-white">Jhonathan Barrios</p>
                            <p className="text-sm text-zinc-300">Frontend Developer · ClutchDevs</p>
                        </div>
                    </div>

                    <motion.div
                        initial={reduce ? false : { opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 }}
                        className="absolute -right-3 sm:-right-8 top-8 rounded-2xl border border-white/10 bg-ink-900/90 px-4 py-3 shadow-2xl backdrop-blur"
                    >
                        <p className="font-display text-2xl font-semibold text-white">{stats[0].value}</p>
                        <p className="text-xs text-zinc-400 max-w-[8rem]">{stats[0].label}</p>
                    </motion.div>
                    <motion.div
                        initial={reduce ? false : { opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.85 }}
                        className="absolute -left-3 sm:-left-8 top-1/2 rounded-2xl border border-white/10 bg-ink-900/90 px-4 py-3 shadow-2xl backdrop-blur"
                    >
                        <p className="text-xs text-zinc-400">Stack</p>
                        <p className="text-sm font-semibold text-white">React · Next.js · TS</p>
                    </motion.div>
                </motion.div>
            </div>

            {/* Stats strip */}
            <div className="relative mx-auto mt-20 max-w-6xl px-4 sm:px-6">
                <dl className="grid grid-cols-2 lg:grid-cols-4 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={reduce ? false : { opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.08 * i }}
                            className={`p-6 sm:p-8 ${i % 2 === 1 ? 'border-l' : ''} ${i >= 2 ? 'border-t lg:border-t-0' : ''} ${
                                i === 2 ? 'lg:border-l' : ''
                            } border-white/10`}
                        >
                            <dt className="text-sm text-zinc-400">{stat.label}</dt>
                            <dd className="order-first font-display text-3xl sm:text-4xl font-semibold text-white">{stat.value}</dd>
                        </motion.div>
                    ))}
                </dl>
            </div>
        </section>
    )
}
