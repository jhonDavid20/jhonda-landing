import Header from './components/Header'
import ScrollIndicator from './components/ScrollIndicator'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import ProjectCarousel from './components/ProjectCarousel'
import Footer from './components/Footer'

export default function Home() {
    return (
        <>
            <Header />
            <ScrollIndicator />
            <main className="bg-black pt-20">
                <HeroSection />
                <AboutSection />
                <ProjectCarousel />
                <Footer />
            </main>
        </>
    )
}
