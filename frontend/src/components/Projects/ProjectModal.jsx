import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import {
  X,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  MapPin,
  CalendarDays,
  Ruler,
  UserRound,
} from "lucide-react"

const headingId = "arke-project-modal-title"

function ProjectModal({ project, onClose, onPrevious, onNext, onExited }) {
  const modalRef = useRef(null)
  const closeRef = useRef(null)
  const scrollRef = useRef(null)
  const reduceMotion = useReducedMotion()

  const [scrollState, setScrollState] = useState({ projectId: null, scrolled: false })
  const isOpen = Boolean(project)
  const showScrollTop = scrollState.projectId === project?.id && scrollState.scrolled

  // 1. Bloquear el scroll del body
  useEffect(() => {
    if (!isOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  // 2. Accesibilidad (Teclado y Focus Trap)
  useEffect(() => {
    if (!isOpen) return

    closeRef.current?.focus()

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault()
        onClose()
        return
      }

      const target = event.target
      const isEditable =
        target instanceof HTMLElement &&
        (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))

      if (!isEditable && event.key === "ArrowLeft") {
        event.preventDefault()
        onPrevious()
        return
      }

      if (!isEditable && event.key === "ArrowRight") {
        event.preventDefault()
        onNext()
        return
      }

      if (event.key !== "Tab") return

      const focusableElements = modalRef.current?.querySelectorAll(
        'a[href], button:not([disabled]):not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])'
      )

      if (!focusableElements?.length) {
        event.preventDefault()
        modalRef.current?.focus()
        return
      }

      const first = focusableElements[0]
      const last = focusableElements[focusableElements.length - 1]
      const active = document.activeElement

      if (event.shiftKey && (active === first || !modalRef.current?.contains(active))) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && (active === last || !modalRef.current?.contains(active))) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose, onPrevious, onNext])

  // 3. Reiniciar el scroll al cambiar de proyecto
  useEffect(() => {
    if (!project || !scrollRef.current) return
    scrollRef.current.scrollTop = 0
  }, [project])

  const handleScroll = (event) => {
    if (!project) return
    const scrolled = event.currentTarget.scrollTop > 200
    
    setScrollState((current) => {
      if (current.projectId === project.id && current.scrolled === scrolled) return current
      return { projectId: project.id, scrolled }
    })
  }

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ top: 0, behavior: reduceMotion ? "instant" : "smooth" })
  }

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: reduceMotion ? 0 : 0.35 } },
    exit: { opacity: 0, transition: { duration: reduceMotion ? 0 : 0.3 } },
  }

  const dialogVariants = {
    hidden: { opacity: 0, scale: reduceMotion ? 1 : 0.98, y: reduceMotion ? 0 : 18 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      opacity: 0,
      scale: reduceMotion ? 1 : 0.985,
      y: reduceMotion ? 0 : 10,
      transition: { duration: reduceMotion ? 0 : 0.25 },
    },
  }

  return createPortal(
    <AnimatePresence initial={false} onExitComplete={onExited}>
      {project && (
        <motion.div
          key="arke-project-modal"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-0 backdrop-blur-xl md:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose()
          }}
        >
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={headingId}
            tabIndex={-1}
            variants={dialogVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="
              relative flex h-full w-full min-w-0 max-w-[1400px] flex-col overflow-hidden
              bg-[#111111] text-white shadow-2xl
              md:h-auto md:max-h-[94dvh] md:rounded-lg
            "
          >
            {/* Botón Cerrar */}
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Cerrar detalles del proyecto"
              className="
                absolute right-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-full
                border border-white/30 bg-black/60 text-white backdrop-blur-lg
                transition-all duration-300 hover:border-[#e4cdb9] hover:bg-[#e4cdb9] hover:text-black
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e4cdb9]
                md:right-8 md:top-8 motion-reduce:transition-none
              "
            >
              <X size={19} />
            </button>

            {/* Área Desplazable */}
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex h-full w-full min-h-0 flex-col overflow-x-hidden overflow-y-auto overscroll-contain"
            >
              {/* Imagen Hero */}
              <div className="relative h-[42svh] min-h-[250px] w-full shrink-0 overflow-hidden md:h-[60vh] md:min-h-[450px]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.img
                    key={project.id}
                    src={project.image}
                    alt={project.title}
                    initial={{ opacity: 0, scale: reduceMotion ? 1 : 1.035 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </AnimatePresence>

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#111111] via-black/40 to-black/10 md:from-black/90 md:via-black/20"
                />

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
                    <span aria-hidden="true" className="h-1 w-1 shrink-0 rounded-full bg-[#e4cdb9]" />
                    <span>{project.location}</span>
                  </div>
                </div>
              </div>

              {/* Contenido Editorial */}
              <div className="grid grid-cols-1 gap-10 px-5 py-10 md:grid-cols-[1.3fr_1fr] md:gap-20 md:px-14 md:py-16">
                <div className="min-w-0">
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

                <div className="min-w-0">
                  <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.25em] text-[#e4cdb9] md:mb-6 md:text-[11px]">
                    Ficha del proyecto
                  </p>
                  <div className="divide-y divide-white/10">
                    <div className="flex items-start gap-4 py-4 md:gap-5 md:py-5">
                      <MapPin size={18} className="shrink-0 text-[#e4cdb9]" />
                      <div>
                        <p className="mb-1 text-[11px] text-white/40 md:text-xs">Ubicación</p>
                        <p className="text-sm">{project.location}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 py-4 md:gap-5 md:py-5">
                      <CalendarDays size={18} className="shrink-0 text-[#e4cdb9]" />
                      <div>
                        <p className="mb-1 text-[11px] text-white/40 md:text-xs">Año</p>
                        <p className="text-sm">{project.year ?? "No especificado"}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 py-4 md:gap-5 md:py-5">
                      <Ruler size={18} className="shrink-0 text-[#e4cdb9]" />
                      <div>
                        <p className="mb-1 text-[11px] text-white/40 md:text-xs">Superficie</p>
                        <p className="text-sm">{project.area ?? "No especificada"}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 py-4 md:gap-5 md:py-5">
                      <UserRound size={18} className="shrink-0 text-[#e4cdb9]" />
                      <div>
                        <p className="mb-1 text-[11px] text-white/40 md:text-xs">Arquitecto</p>
                        <p className="text-sm">{project.architect ?? "No especificado"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navegación Inferior */}
              <div className="mt-auto flex flex-col gap-6 border-t border-white/10 px-5 py-6 sm:flex-row sm:items-center sm:justify-between md:px-14 md:py-7">
                <p className="text-[10px] uppercase tracking-[0.22em] text-white/40 md:text-[11px]">
                  Explora nuestros proyectos
                </p>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={onPrevious}
                    aria-label="Proyecto anterior"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors duration-300 hover:bg-[#e4cdb9] hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e4cdb9]"
                  >
                    <ArrowLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={onNext}
                    aria-label="Proyecto siguiente"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors duration-300 hover:bg-[#e4cdb9] hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e4cdb9]"
                  >
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Botón Volver Arriba */}
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Volver arriba"
              tabIndex={showScrollTop ? 0 : -1}
              aria-hidden={!showScrollTop}
              className={`
                absolute bottom-5 right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full
                border border-white/20 bg-black/70 text-white shadow-lg backdrop-blur-md
                transition-all duration-300 hover:bg-[#e4cdb9] hover:text-black md:bottom-8 md:right-8
                ${showScrollTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}
              `}
            >
              <ArrowUp size={20} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

export default ProjectModal