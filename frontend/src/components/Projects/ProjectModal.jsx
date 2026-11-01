import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import {
  X,
  ArrowLeft,
  ArrowRight,
  ArrowUp, // <-- Nuevo icono
  MapPin,
  CalendarDays,
  Ruler,
  UserRound,
} from "lucide-react"

function ProjectModal({ project, onClose, onPrevious, onNext }) {
  const modalRef = useRef(null)
  const closeRef = useRef(null)
  const scrollRef = useRef(null) // <-- Referencia para controlar el scroll interno
  const [showScrollTop, setShowScrollTop] = useState(false) // <-- Estado del botón
  const headingId = "arke-project-modal-title"

  // Bloqueo de scroll y navegación por teclado
  useEffect(() => {
    if (!project) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeRef.current?.focus()

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose()
      if (event.key === "ArrowLeft") onPrevious()
      if (event.key === "ArrowRight") onNext()

      if (event.key === "Tab") {
        const focusableElements = modalRef.current?.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )

        if (!focusableElements?.length) return

        const first = focusableElements[0]
        const last = focusableElements[focusableElements.length - 1]

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [project, onClose, onPrevious, onNext])

  // Resetear el botón de "Volver arriba" cuando cambiamos de proyecto
  useEffect(() => {
    setShowScrollTop(false)
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0
    }
  }, [project])

  // Detectar cuando el usuario hace scroll dentro del modal
  const handleScroll = (e) => {
    // Si el usuario baja más de 200px, mostramos el botón
    if (e.target.scrollTop > 200) {
      setShowScrollTop(true)
    } else {
      setShowScrollTop(false)
    }
  }

  // Función para volver arriba suavemente
  const scrollToTop = () => {
    scrollRef.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  if (!project) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-0 backdrop-blur-xl md:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        className="relative flex h-full w-full max-w-[1400px] flex-col overflow-hidden bg-[#111111] text-white shadow-2xl md:max-h-[94vh] md:rounded-lg"
      >
        {/* Botón Cerrar */}
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Cerrar detalles del proyecto"
          className="absolute right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/50 text-white backdrop-blur-lg transition-all duration-300 hover:border-[#e4cdb9] hover:bg-[#e4cdb9] hover:text-black md:right-8 md:top-8 md:h-11 md:w-11"
        >
          <X size={18} className="md:w-5 md:h-5" />
        </button>

        {/* Contenedor con Scroll Interno */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex h-full w-full flex-col overflow-y-auto"
        >
          {/* Hero del modal */}
          <div className="relative h-[40vh] min-h-[300px] w-full shrink-0 overflow-hidden md:h-[60vh] md:min-h-[450px]">
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-black/40 to-black/10 md:from-black/90 md:via-black/20" />

            <div className="absolute bottom-6 left-5 right-5 md:bottom-12 md:left-14 md:right-14">
              <p className="mb-3 text-[9px] font-medium uppercase tracking-[0.28em] text-[#e4cdb9] md:mb-4 md:text-[10px]">
                Proyecto seleccionado
              </p>

              <h2
                id={headingId}
                className="max-w-3xl font-serif text-3xl leading-tight md:text-5xl lg:text-7xl"
              >
                {project.title}
              </h2>

              <div className="mt-4 flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-widest text-white/70 md:mt-5 md:gap-4 md:text-xs">
                <span>{project.category}</span>
                <span className="h-1 w-1 rounded-full bg-[#e4cdb9]" />
                <span>{project.location}</span>
              </div>
            </div>
          </div>

          {/* Contenido editorial */}
          <div className="grid grid-cols-1 gap-10 px-5 py-10 md:grid-cols-[1.3fr_1fr] md:gap-20 md:px-14 md:py-16">
            <div>
              <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.25em] text-[#e4cdb9] md:mb-5 md:text-[11px]">
                Sobre el proyecto
              </p>

              <h3 className="mb-5 font-serif text-2xl leading-tight text-white md:mb-6 md:text-4xl">
                Diseño que dialoga
                <br />
                con su entorno.
              </h3>

              <p className="max-w-xl text-sm leading-7 text-white/55 md:text-base md:leading-8">
                {project.description}
              </p>
            </div>

            <div>
              <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.25em] text-[#e4cdb9] md:mb-6 md:text-[11px]">
                Ficha del proyecto
              </p>

              <div className="divide-y divide-white/10">
                <div className="flex items-start gap-4 py-4 md:gap-5 md:py-5">
                  <MapPin size={18} className="shrink-0 text-[#e4cdb9]" />
                  <div>
                    <p className="mb-1 text-[11px] text-white/40 md:text-xs">
                      Ubicación
                    </p>
                    <p className="text-sm">{project.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 py-4 md:gap-5 md:py-5">
                  <CalendarDays size={18} className="shrink-0 text-[#e4cdb9]" />
                  <div>
                    <p className="mb-1 text-[11px] text-white/40 md:text-xs">
                      Año
                    </p>
                    <p className="text-sm">{project.year || "No especificado"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 py-4 md:gap-5 md:py-5">
                  <Ruler size={18} className="shrink-0 text-[#e4cdb9]" />
                  <div>
                    <p className="mb-1 text-[11px] text-white/40 md:text-xs">
                      Superficie
                    </p>
                    <p className="text-sm">{project.area || "No especificada"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 py-4 md:gap-5 md:py-5">
                  <UserRound size={18} className="shrink-0 text-[#e4cdb9]" />
                  <div>
                    <p className="mb-1 text-[11px] text-white/40 md:text-xs">
                      Arquitecto
                    </p>
                    <p className="text-sm">{project.architect || "No especificado"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navegación inferior (Dentro del scroll para que no tape el botón) */}
          <div className="mt-auto flex flex-col gap-6 border-t border-white/10 px-5 py-6 sm:flex-row sm:items-center sm:justify-between md:px-14 md:py-7">
            <p className="text-[10px] uppercase tracking-[0.22em] text-white/40 md:text-[11px]">
              Explora nuestros proyectos
            </p>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onPrevious}
                aria-label="Proyecto anterior"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors duration-300 hover:bg-[#e4cdb9] hover:text-black"
              >
                <ArrowLeft size={18} />
              </button>

              <button
                type="button"
                onClick={onNext}
                aria-label="Proyecto siguiente"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors duration-300 hover:bg-[#e4cdb9] hover:text-black"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* BOTÓN VOLVER ARRIBA (Flotante) */}
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Volver arriba"
          className={`
            absolute bottom-20 right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full 
            border border-white/20 bg-black/60 text-white shadow-lg backdrop-blur-md 
            transition-all duration-300 hover:bg-[#e4cdb9] hover:text-black md:bottom-24 md:right-8
            ${
              showScrollTop
                ? "translate-y-0 opacity-100"
                : "pointer-events-none translate-y-4 opacity-0"
            }
          `}
        >
          <ArrowUp size={20} />
        </button>
      </div>
    </div>,
    document.body
  )
}

export default ProjectModal