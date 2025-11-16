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
    },
    {
        id: 'coming-soon',
        title: {
            en: 'More Coming Soon',
            es: 'Más Próximamente'
        },
        description: {
            en: 'Always building, always improving. New projects are in development.',
            es: 'Siempre construyendo, siempre mejorando. Nuevos proyectos en desarrollo.'
        },
        fullDescription: {
            en: `I'm constantly working on new projects and exploring innovative solutions. Whether it's a new web application, a mobile app, or an experimental tool, I'm always pushing my skills forward.

Stay tuned for upcoming projects that will showcase new technologies, creative solutions, and continued growth as a developer. The best is yet to come.`,
            es: `Estoy constantemente trabajando en nuevos proyectos y explorando soluciones innovadoras. Ya sea una nueva aplicación web, una app móvil o una herramienta experimental, siempre estoy llevando mis habilidades más allá.

Mantente atento a los próximos proyectos que mostrarán nuevas tecnologías, soluciones creativas y crecimiento continuo como desarrollador. Lo mejor está por venir.`
        },
        image: '',
        imageAlt: {
            en: 'Coming Soon',
            es: 'Próximamente'
        },
        tags: ['In Progress', 'Innovation', 'Growth'],
        features: {
            en: [
                'New technologies being explored',
                'Creative problem-solving',
                'Continuous learning',
                'Building for the future'
            ],
            es: [
                'Nuevas tecnologías siendo exploradas',
                'Resolución creativa de problemas',
                'Aprendizaje continuo',
                'Construyendo para el futuro'
            ]
        },
        links: {}
    }
]
