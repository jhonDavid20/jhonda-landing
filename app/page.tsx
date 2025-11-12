import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'

export default function Home() {
    return (
        <main className="bg-black">
            <HeroSection />
            <AboutSection />
        </main>
    )
}