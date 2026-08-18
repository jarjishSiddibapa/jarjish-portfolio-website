import { useEffect } from 'react'
import { useLenis } from '@/hooks/useLenis'
import { profile } from '@/data/profile'
import { AmbientBackground } from '@/components/ui/AmbientBackground'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { EasterEgg } from '@/components/ui/EasterEgg'
import { SEO } from '@/components/layout/SEO'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/sections/Hero'
import { About } from '@/sections/About'
import { Skills } from '@/sections/Skills'
import { Experience } from '@/sections/Experience'
import { Education } from '@/sections/Education'
import { Interests } from '@/sections/Interests'
import { Projects } from '@/sections/Projects'
import { GithubStats } from '@/sections/GithubStats'
import { Contact } from '@/sections/Contact'

function App() {
  useLenis()

  useEffect(() => {
    console.log(
      `%c${profile.name}`,
      'font-size: 20px; font-weight: 700; color: #5b8def;',
    )
    console.log(
      `%c${profile.role}. Open to remote, hybrid & full-time roles across Thane, Navi Mumbai & Mumbai.\nHiring? ${profile.email}\nPS: try the Konami code ↑ ↑ ↓ ↓ ← → ← → b a`,
      'font-size: 13px; color: #9aa3b8;',
    )
  }, [])

  return (
    <>
      <SEO />
      <AmbientBackground />
      <CustomCursor />
      <EasterEgg />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Education />
        <Interests />
        <Projects />
        <GithubStats />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
