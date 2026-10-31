
import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import {
  X,
  ArrowLeft,
  ArrowRight,
  MapPin,
  CalendarDays,
  Ruler,
  UserRound,
} from "lucide-react"

function ProjectModal({
  project,
  onClose,
  onPrevious,
  onNext,
}) {
  const modalRef = useRef(null)
  const closeRef = useRef(null)
  const headingId = "arke-project-modal-title"

  useEffect(() => {
    if (!project) return

    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = "hidden"

    closeRef.current?.focus()

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose()
      }

      if (event.key === "ArrowLeft") {
        onPrevious()
      }

      if (event.key === "ArrowRight") {
        onNext()
      }

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
        } else if (
          !event.shiftKey &&
          document.activeElement === last
        ) {
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

  if (!project) return null

  return createPortal(
    <div
      className="
        fixed inset-0 z-[100]
        flex items-center justify-center
        bg-black/90
        p-0
        backdrop-blur-xl
        md:p-6
      "
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        className="
          relative flex h-full w-full
          max-w-[1400px] flex-col
          overflow-y-auto
          bg-[#111111] text-white
          shadow-2xl
          md:max-h-[94vh]
          md:rounded-lg
        "
      >
        {/* Cerrar */}
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Cerrar detalles del proyecto"
          className="
            absolute right-5 top-5 z-30
            flex h-11 w-11
            items-center justify-center
            rounded-full
            border border-white/30
            bg-black/50
            text-white
            backdrop-blur-lg
            transition-all duration-300
            hover:border-[#e4cdb9]
            hover:bg-[#e4cdb9]
            hover:text-black
            md:right-8 md:top-8
          "
        >
          <X size={20} />
        </button>

        {/* Hero del modal */}
        <div
          className="
            relative min-h-[360px]
            h-[52vh] w-full shrink-0
            overflow-hidden
            md:min-h-[450px]
            md:h-[60vh]
          "
        >
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover"
          />

          <div
            className="
              absolute inset-0
              bg-gradient-to-t
              from-black/90
              via-black/20
              to-black/10
            "
          />

          <div
            className="
              absolute bottom-8 left-6 right-6
              md:bottom-12 md:left-14 md:right-14
            "
          >
            <p
              className="
                mb-4 text-[10px]
                font-medium uppercase
                tracking-[0.28em]
                text-[#e4cdb9]
              "
            >
              Proyecto seleccionado
            </p>

            <h2
              id={headingId}
              className="
                max-w-3xl font-serif
                text-4xl leading-tight
                md:text-6xl
                lg:text-7xl
              "
            >
              {project.title}
            </h2>

            <div
              className="
                mt-5 flex flex-wrap
                items-center gap-4
                text-xs uppercase
                tracking-widest
                text-white/70
              "
            >
              <span>{project.category}</span>
              <span className="h-1 w-1 rounded-full bg-[#e4cdb9]" />
              <span>{project.location}</span>
            </div>
          </div>
        </div>

        {/* Contenido editorial */}
        <div
          className="
            grid grid-cols-1
            gap-12 px-6 py-12
            md:grid-cols-[1.3fr_1fr]
            md:gap-20
            md:px-14 md:py-16
          "
        >
          {/* Descripción */}
          <div>
            <p
              className="
                mb-5 text-[11px]
                font-medium uppercase
                tracking-[0.25em]
                text-[#e4cdb9]
              "
            >
              Sobre el proyecto
            </p>

            <h3
              className="
                mb-6 font-serif text-3xl
                leading-tight text-white
                md:text-4xl
              "
            >
              Diseño que dialoga
              <br />
              con su entorno.
            </h3>

            <p
              className="
                max-w-xl text-sm
                leading-8 text-white/55
                md:text-base
              "
            >
              {project.description}
            </p>
          </div>

          {/* Ficha técnica */}
          <div>
            <p
              className="
                mb-6 text-[11px]
                font-medium uppercase
                tracking-[0.25em]
                text-[#e4cdb9]
              "
            >
              Ficha del proyecto
            </p>

            <div className="divide-y divide-white/10">
              <div className="flex items-start gap-5 py-5">
                <MapPin
                  size={19}
                  className="shrink-0 text-[#e4cdb9]"
                />

                <div>
                  <p className="mb-1 text-xs text-white/40">
                    Ubicación
                  </p>
                  <p className="text-sm">
                    {project.location}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5 py-5">
                <CalendarDays
                  size={19}
                  className="shrink-0 text-[#e4cdb9]"
                />

                <div>
                  <p className="mb-1 text-xs text-white/40">
                    Año
                  </p>
                  <p className="text-sm">
                    {project.year || "No especificado"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5 py-5">
                <Ruler
                  size={19}
                  className="shrink-0 text-[#e4cdb9]"
                />

                <div>
                  <p className="mb-1 text-xs text-white/40">
                    Superficie
                  </p>
                  <p className="text-sm">
                    {project.area || "No especificada"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5 py-5">
                <UserRound
                  size={19}
                  className="shrink-0 text-[#e4cdb9]"
                />

                <div>
                  <p className="mb-1 text-xs text-white/40">
                    Arquitecto
                  </p>
                  <p className="text-sm">
                    {project.architect || "No especificado"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navegación inferior */}
        <div
          className="
            flex flex-col gap-6
            border-t border-white/10
            px-6 py-7
            sm:flex-row
            sm:items-center
            sm:justify-between
            md:px-14
          "
        >
          <p
            className="
              text-[11px] uppercase
              tracking-[0.22em]
              text-white/40
            "
          >
            Explora nuestros proyectos
          </p>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onPrevious}
              aria-label="Proyecto anterior"
              className="
                flex h-11 w-11
                items-center justify-center
                rounded-full
                border border-white/20
                text-white
                transition-colors duration-300
                hover:bg-[#e4cdb9]
                hover:text-black
              "
            >
              <ArrowLeft size={18} />
            </button>

            <button
              type="button"
              onClick={onNext}
              aria-label="Proyecto siguiente"
              className="
                flex h-11 w-11
                items-center justify-center
                rounded-full
                border border-white/20
                text-white
                transition-colors duration-300
                hover:bg-[#e4cdb9]
                hover:text-black
              "
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default ProjectModal
