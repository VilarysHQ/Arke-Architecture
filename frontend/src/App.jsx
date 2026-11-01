import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home'
import InfoCards from './components/InfoCards/InfoCards'
import About from './pages/About'
import Projects from './pages/Projects'
import Services from './components/Services'
import Contact from './pages/Contact'
import Footer from './pages/Footer'
import Process from './components/Process'
import Testimonial from './components/Testimonial'

function App() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#0c0c0c]">
      <Navbar />
      <main>
        <Home />
        <InfoCards />
        <Projects />
        <About />
        <Services />
        <Testimonial />
        <Process />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App