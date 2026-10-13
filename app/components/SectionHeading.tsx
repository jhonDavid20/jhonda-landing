import Reveal from './Reveal'

interface SectionHeadingProps {
    eyebrow: string
    title: string
    subtitle?: string
    align?: 'left' | 'center'
}

export default function SectionHeading({ eyebrow, title, subtitle, align = 'left' }: SectionHeadingProps) {
    const centered = align === 'center'
    return (
        <Reveal className={`mb-12 sm:mb-16 ${centered ? 'text-center mx-auto' : ''} max-w-2xl`}>
            <p className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.18em] text-primary">
                <span className="h-px w-6 bg-primary" aria-hidden />
                {eyebrow}
            </p>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white text-balance">
                {title}
            </h2>
            {subtitle && <p className="mt-4 text-base sm:text-lg text-zinc-400 leading-relaxed">{subtitle}</p>}
        </Reveal>
    )
}
