import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import ProjectCarousel from './components/ProjectCarousel'
import Footer from './components/Footer'

export default function Home() {
    return (
        <main className="bg-black pt-20">
            <HeroSection />
            <AboutSection />
            <ProjectCarousel />
            <Footer />
        </main>
    )
}