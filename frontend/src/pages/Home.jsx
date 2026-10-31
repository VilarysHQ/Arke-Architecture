import bgImage from "../assets/Home/homeBackground.png"
import { ArrowRight, ArrowLeft, ArrowUpRight } from "lucide-react"

function Home() {
  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }}
    >

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />


      <div className="relative z-10 flex min-h-screen flex-col justify-center px-6 md:px-12 lg:px-20 pt-20">
        

        {/* Small top subtitle */}
        <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-[#e4cdb9] uppercase">
          Arquitectura que perdura
        </p>

        {/* Main Title */}
        <h1 className="max-w-2xl font-serif text-5xl leading-tight text-white md:text-6xl lg:text-7xl">
          Espacios <br />
          con <span className="italic font-light">propósito</span>
        </h1>

        {/* Description */}
        <p className="mt-6 max-w-md text-sm leading-relaxed text-gray-300 md:text-base">
          Diseñamos espacios que conectan con las personas, el entorno y el tiempo, creando experiencias que trascienden.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-wrap items-center gap-6">
          <button className="flex items-center gap-3 rounded-full bg-[#e4cdb9] px-6 py-3 text-sm font-medium text-black transition-transform hover:scale-105">
            Ver proyectos
            <ArrowRight size={16} />
          </button>
          
          <button className="text-sm font-medium text-white underline-offset-4 hover:underline">
            Nuestra filosofía
          </button>
        </div>
      </div>

      {/* Bottom Items */}
      <div className="absolute bottom-10 left-0 right-0 z-10 flex items-end justify-between px-6 md:px-12 lg:px-20">
        
        {/* Slider indicator */}
        <div className="flex items-center gap-4 text-white">
          <span className="text-sm font-medium">01</span>
          <div className="h-[1px] w-12 bg-white/30">
            <div className="h-full w-1/3 bg-white"></div> {/* Active bar */}
          </div>
          <span className="text-sm text-white/50">03</span>
        </div>

        {/* Info and navigation arrows on the right */}
        <div className="hidden flex-col items-end gap-4 md:flex">
          <div className="text-right">
            <p className="text-xs font-semibold uppercase tracking-widest text-white">Casa Mirador</p>
            <p className="text-[10px] uppercase text-gray-400">Valle de Elqui, Chile</p>
          </div>
          <div className="flex gap-2">
            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white hover:text-black">
              <ArrowLeft size={16} />
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white hover:text-black">
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home