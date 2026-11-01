import bgImage from "../assets/Home/homeBackground.png"
import { ArrowRight, ArrowLeft } from "lucide-react"

function Home() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[100dvh] w-full flex-col justify-end bg-cover bg-center bg-no-repeat pb-10 md:justify-center md:pb-0"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* 
        Overlay optimizado: 
        En móvil oscurece mucho más la parte inferior para que el texto resalte. 
      */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-black/50 to-black/10 md:bg-gradient-to-r md:from-black/80 md:via-black/40 md:to-transparent" />

      <div className="relative z-10 flex w-full flex-col justify-end px-6 pb-20 pt-32 md:justify-center md:px-12 md:pb-0 md:pt-20 lg:px-20">
        
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-[#e4cdb9] md:mb-4 md:text-xs">
          Arquitectura que perdura
        </p>

        <h1 className="mb-5 max-w-2xl font-serif text-[2.75rem] leading-[1.05] text-white md:mb-6 md:text-6xl lg:text-7xl">
          Espacios <br />
          con <span className="font-light italic">propósito</span>
        </h1>

        <p className="mb-8 max-w-md text-sm leading-relaxed text-gray-300 md:mb-12 md:text-base">
          Diseñamos espacios que conectan con las personas, el entorno y el tiempo, creando experiencias que trascienden.
        </p>

        {/* Botones rediseñados para Móvil y Escritorio */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <a
            href="#proyectos"
            className="group flex w-full items-center justify-center gap-3 rounded-full bg-[#e4cdb9] px-8 py-4 text-sm font-semibold text-black shadow-lg shadow-[#e4cdb9]/20 transition-all hover:scale-[1.02] hover:bg-white sm:w-auto md:py-3"
          >
            Ver proyectos
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </a>

          <a
            href="#nosotros"
            className="flex w-full items-center justify-center gap-3 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-medium text-white backdrop-blur-md transition-all hover:bg-white/10 sm:w-auto md:py-3"
          >
            Nuestra filosofía
          </a>
        </div>
      </div>

      {/* Controles inferiores (Slider) */}
      <div className="relative z-10 mt-12 flex w-full items-end justify-between px-6 md:absolute md:bottom-12 md:left-0 md:right-0 md:mt-0 md:px-12 lg:px-20">
        
        <div className="flex items-center gap-4 text-white">
          <span className="text-xs font-semibold tracking-widest md:text-sm">01</span>
          <div className="h-[1px] w-12 bg-white/20 md:w-16">
            <div className="h-full w-1/3 bg-[#e4cdb9]" />
          </div>
          <span className="text-xs tracking-widest text-white/40 md:text-sm">03</span>
        </div>

        {/* Info y navegación (Solo PC) */}
        <div className="hidden flex-col items-end gap-4 md:flex">
          <div className="text-right">
            <p className="text-[11px] font-bold uppercase tracking-widest text-white">
              Casa Mirador
            </p>
            <p className="mt-1 text-[10px] uppercase tracking-wider text-gray-400">
              Valle de Elqui, Chile
            </p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Proyecto anterior"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-all hover:border-white hover:bg-white hover:text-black"
            >
              <ArrowLeft size={18} />
            </button>

            <button
              type="button"
              aria-label="Proyecto siguiente"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-all hover:border-white hover:bg-white hover:text-black"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home