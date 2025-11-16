'use client'

import Image from 'next/image'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../translations/translations'
import { Project } from '../data/projects'

interface ProjectCardProps {
    project: Project
    onClick: () => void
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
    const { language } = useLanguage()
    const t = translations[language].projects

    return (
        <div
            onClick={onClick}
            className="flex-shrink-0 w-full sm:w-[500px] md:w-[600px] max-w-[90vw] bg-[#1a1a1a] rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl group"
        >
            <div className="relative w-full h-[250px] sm:h-[350px] md:h-[400px] overflow-hidden">
                {project.image ? (
                    <Image
                        src={project.image}
                        alt={project.imageAlt[language]}
                        fill
                        className="object-cover transition-all duration-300 group-hover:brightness-110"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center transition-all duration-300 group-hover:brightness-110">
                        <div className="text-center p-4 sm:p-6">
                            <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4 opacity-50">
                                {project.tags[0]?.charAt(0) || 'P'}
                            </div>
                            <div className="text-gray-400 text-xs sm:text-sm">{project.imageAlt[language]}</div>
                        </div>
                    </div>
                )}
            </div>
            <div className="p-4 sm:p-5 md:p-6">
                <h3 className="text-white text-lg sm:text-xl font-bold mb-2">{project.title[language]}</h3>
                <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">{project.description[language]}</p>
                <div className="flex items-center gap-2 text-red-500 text-xs sm:text-sm font-medium">
                    <span>{t.clickToExpand}</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </div>
            </div>
        </div>
    )
}
