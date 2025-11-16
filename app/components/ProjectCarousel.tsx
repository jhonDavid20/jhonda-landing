'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../translations/translations'
import ProjectCard from './ProjectCard'
import ProjectModal from './ProjectModal'
import { projects, Project } from '../data/projects'

export default function ProjectCarousel() {
    const [isVisible, setIsVisible] = useState(false)
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)
    const [currentIndex, setCurrentIndex] = useState(0)

    const sectionRef = useRef<HTMLElement>(null)

    const { language } = useLanguage()
    const t = translations[language].projects

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    })

    const titleY = useTransform(scrollYProgress, [0, 1], [50, -50])
    const carouselY = useTransform(scrollYProgress, [0, 1], [60, -20])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    setIsVisible(entry.isIntersecting)
                })
            },
            { threshold: 0.2 }
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current)
            }
        }
    }, [])

    const goToProject = (index: number) => {
        setCurrentIndex(index)
    }

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1))
    }

    const goToNext = () => {
        setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1))
    }

    return (
        <>
            <section ref={sectionRef} className="relative min-h-[80dvh] flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-16 sm:py-20 md:py-24">
                <div className="w-full max-w-7xl">
                    <motion.h2
                        style={{ y: titleY }}
                        className={`text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-14 md:mb-16 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0 delay-[100ms]' : 'opacity-0 translate-y-4'}`}
                    >
                        {t.title}
                    </motion.h2>

                    <motion.div
                        style={{ y: carouselY }}
                        className={`relative transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0 delay-[200ms]' : 'opacity-0 translate-y-4'}`}
                    >
                        {/* Left Arrow */}
                        {projects.length > 1 && (
                            <button
                                onClick={goToPrevious}
                                className="absolute left-0 sm:-left-2 md:-left-8 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gray-800/80 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
                                aria-label="Previous project"
                            >
                                <ChevronLeft size={20} className="text-white sm:w-6 sm:h-6" />
                            </button>
                        )}

                        {/* Single Project Display */}
                        <div className="flex justify-center px-10 sm:px-12 md:px-0">
                            <ProjectCard
                                project={projects[currentIndex]}
                                onClick={() => setSelectedProject(projects[currentIndex])}
                            />
                        </div>

                        {/* Right Arrow */}
                        {projects.length > 1 && (
                            <button
                                onClick={goToNext}
                                className="absolute right-0 sm:-right-2 md:-right-8 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gray-800/80 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
                                aria-label="Next project"
                            >
                                <ChevronRight size={20} className="text-white sm:w-6 sm:h-6" />
                            </button>
                        )}

                        {/* Dot Indicators */}
                        {projects.length > 1 && (
                            <div className="flex justify-center gap-2 sm:gap-3 mt-6 sm:mt-8">
                                {projects.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => goToProject(index)}
                                        className="group relative p-1"
                                        aria-label={`Go to project ${index + 1}`}
                                    >
                                        <div
                                            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                                                currentIndex === index
                                                    ? 'bg-white scale-100'
                                                    : 'bg-gray-500 scale-75 group-hover:bg-gray-400'
                                            }`}
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* Project Modal */}
            {selectedProject && (
                <ProjectModal
                    project={selectedProject}
                    isOpen={!!selectedProject}
                    onClose={() => setSelectedProject(null)}
                />
            )}
        </>
    )
}
