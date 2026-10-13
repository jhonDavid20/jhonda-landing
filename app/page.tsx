import Hero from './components/Hero'
import Services from './components/Services'
import Process from './components/Process'
import Projects from './components/Projects'
import About from './components/About'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function Home() {
    return (
        <>
            <main>
                <Hero />
                <Services />
                <Process />
                <Projects />
                <About />
                <Experience />
                <Contact />
            </main>
            <Footer />
        </>
    )
}
