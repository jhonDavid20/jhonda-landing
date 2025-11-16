'use client'

import { useEffect, useRef } from 'react'
import { X, Github, ExternalLink } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../translations/translations'
import { Project } from '../data/projects'

interface ProjectModalProps {
    project: Project
    isOpen: boolean
    onClose: () => void
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
    const modalRef = useRef<HTMLDivElement>(null)
    const { language } = useLanguage()
    const t = translations[language].projects

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleEscape)
            document.body.style.overflow = 'hidden'
        }

        return () => {
            document.removeEventListener('keydown', handleEscape)
            document.body.style.overflow = 'unset'
        }
    }, [isOpen, onClose])

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    if (!isOpen) return null

    return (
        <div
            onClick={handleOverlayClick}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
        >
            <div
                ref={modalRef}
                className="relative w-full max-w-3xl max-h-[90vh] bg-[#1a1a1a] rounded-xl overflow-y-auto animate-slide-up"
            >
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
                    aria-label="Close modal"
                >
                    <X size={20} className="text-white sm:w-6 sm:h-6" />
                </button>

                <div className="p-4 sm:p-6 md:p-8">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6 pr-8">{project.title[language]}</h2>

                    <div className="space-y-4 sm:space-y-6">
                        <div>
                            <p className="text-gray-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                                {project.fullDescription[language]}
                            </p>
                        </div>

                        <div>
                            <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">{t.techStack}</h3>
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-2 sm:px-3 py-1 bg-gray-700 text-gray-200 rounded-full text-xs sm:text-sm"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">{t.keyFeatures}</h3>
                            <ul className="space-y-1.5 sm:space-y-2">
                                {project.features[language].map((feature, index) => (
                                    <li key={index} className="text-gray-300 text-sm sm:text-base flex items-start gap-2">
                                        <span className="text-red-500 mt-0.5 sm:mt-1">•</span>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-2 sm:pt-4">
                            {project.links.github && (
                                <a
                                    href={project.links.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm sm:text-base"
                                >
                                    <Github size={18} className="sm:w-5 sm:h-5" />
                                    <span className="font-medium">{t.viewCode}</span>
                                </a>
                            )}
                            {project.links.live && (
                                <a
                                    href={project.links.live}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors text-sm sm:text-base"
                                >
                                    <ExternalLink size={18} className="sm:w-5 sm:h-5" />
                                    <span className="font-medium">{t.liveDemo}</span>
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
