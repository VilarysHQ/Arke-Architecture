import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home'
import InfoCards from './components/InfoCards/InfoCards'
import About from './pages/About'
import Projects from './pages/Projects'

function App() {
  return (
    <div className="min-h-screen bg-[#0c0c0c]">
      <Navbar />
      <main>
        <Home />
        <InfoCards />
        <About />
        <Projects />
      </main>
    </div>
  )
}

export default App