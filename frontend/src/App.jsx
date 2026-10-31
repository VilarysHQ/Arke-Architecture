import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home'
import InfoCards from './components/InfoCards/InfoCards'
import About from './pages/About'
import Projects from './pages/Projects'
import Services from './pages/Services'
import Contact from './pages/Contact'

// Components
import Process from './components/Process'
import Testiomonial from './components/Testimonial'

function App() {
  return (
    <div className="min-h-screen bg-[#0c0c0c]">
      <Navbar />
      <main>
        <Home />
        <InfoCards />
        <About />
        <Projects />
        <Services />
        <Testiomonial />
        <Process />
        <Contact />
      </main>
    </div>
  )
}

export default App