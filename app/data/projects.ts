export interface Project {
    id: string
    title: {
        en: string
        es: string
    }
    description: {
        en: string
        es: string
    }
    fullDescription: {
        en: string
        es: string
    }
    image: string
    imageAlt: {
        en: string
        es: string
    }
    tags: string[]
    features: {
        en: string[]
        es: string[]
    }
    links: {
        github?: string
        live?: string
    }
}

export const projects: Project[] = [
    {
        id: 'steady-vitality',
        title: {
            en: 'Steady Vitality Platform',
            es: 'Plataforma Steady Vitality'
        },
        description: {
            en: 'Built to help people find sustainable progress without the restrictive diet cycle. Education first, results second.',
            es: 'Diseñado para ayudar a las personas a lograr un progreso sostenible sin el ciclo restrictivo de las dietas. Primero la educación, luego los resultados.'
        },
        fullDescription: {
            en: `Your complete fitness coaching platform. Personalized training, nutrition guidance, and progress tracking—designed to build sustainable habits, not restrictions. Real coaching for real results.

Built with React for the frontend UI, TypeScript for type safety.`,
            es: `Tu plataforma integral de entrenamiento físico. Entrenamiento personalizado, asesoramiento nutricional y seguimiento del progreso, diseñado para crear hábitos sostenibles, no restricciones. Entrenamiento real para resultados reales.

Construida con React para la interfaz de usuario, TypeScript para seguridad de tipos.`
        },
        image: '/steadyvitality.png',
        imageAlt: {
            en: 'Steady Vitality Platform Dashboard',
            es: 'Dashboard de la Plataforma Steady Vitality'
        },
        tags: ['React', 'TypeScript'],
        features: {
            en: [
                'Personalized Coaching Programs',
                'Progress Tracking & Analytics',
                'Client Dashboard & Communication',
                'Sustainable Habit Formation'
            ],
            es: [
                'Programas de Coaching Personalizados',
                'Seguimiento de Progreso y Analíticas',
                'Dashboard de Cliente y Comunicación',
                'Formación de Hábitos Sostenibles'
            ]
        },
        links: {
            github: 'https://github.com/jhonDavid20/steady-vitality',
            live: 'https://coaching-landing-kappa.vercel.app/en'
        }
    }
]
