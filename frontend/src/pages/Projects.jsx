import { useState, useRef } from "react"
import { ArrowUpRight, ArrowRight } from "lucide-react"
import { projectsData } from "../data/projectsData"
import ProjectModal from "../components/Projects/ProjectModal"

function ProjectCard({ project, index, featured, onOpen }) {
  const buttonRef = useRef(null)

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={() => onOpen(project, buttonRef.current)}
      aria-label={`Explorar proyecto ${project.title}`}
      className={`
        group relative block w-full cursor-pointer
        text-left outline-none
        focus-visible:ring-2 focus-visible:ring-[#e4cdb9]
        focus-visible:ring-offset-4
        focus-visible:ring-offset-[#0c0c0c]
        ${featured ? "lg:col-span-2" : ""}
      `}
    >
      <div
        className={`
          relative w-full overflow-hidden bg-[#1a1a1a]
          ${featured ? "aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]" : "aspect-[4/3]"}
        `}
      >
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045] group-focus-visible:scale-[1.045] motion-reduce:transition-none"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Número */}
        <span className="absolute left-5 top-5 text-[10px] font-medium tracking-[0.25em] text-white/90 md:left-8 md:top-8 md:text-xs">
          0{index + 1} / 03
        </span>

        {/* Botón visual */}
        <span className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-black/20 text-white backdrop-blur-md transition-all duration-300 group-hover:border-[#e4cdb9] group-hover:bg-[#e4cdb9] group-hover:text-[#111] md:right-8 md:top-8 md:h-11 md:w-11">
          <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none md:w-[19px] md:h-[19px]" />
        </span>

        {/* Etiqueta inferior */}
        <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 md:bottom-8 md:left-8 md:right-8">
          <div>
            <p className="mb-1.5 text-[9px] font-medium uppercase tracking-[0.23em] text-[#e4cdb9] md:mb-2 md:text-[10px]">
              {project.category} — {project.location}
            </p>
            <h3 className={`font-serif font-normal leading-tight text-white ${featured ? "text-2xl sm:text-3xl md:text-5xl" : "text-xl sm:text-2xl md:text-3xl"}`}>
              {project.title}
            </h3>
          </div>
          <ArrowRight size={20} className="hidden shrink-0 text-white transition-transform duration-300 group-hover:translate-x-2 sm:block" />
        </div>
      </div>
    </button>
  )
}

function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const triggerRef = useRef(null)

  const featured = projectsData[0]
  const secondary = projectsData.slice(1)

  const openProject = (project, trigger) => {
    triggerRef.current = trigger
    setSelectedIndex(projectsData.findIndex((item) => item.id === project.id))
    setSelectedProject(project)
  }

  const closeProject = () => {
    setSelectedProject(null)
    requestAnimationFrame(() => {
      triggerRef.current?.focus()
    })
  }

  const navigateProject = (direction) => {
    const nextIndex = (selectedIndex + direction + projectsData.length) % projectsData.length
    setSelectedIndex(nextIndex)
    setSelectedProject(projectsData[nextIndex])
  }

  return (
    <>
      <section id="proyectos" className="relative w-full scroll-mt-[76px] bg-[#0c0c0c] py-20 text-white md:py-32">
        <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12 lg:px-20">
          
          <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between md:gap-8">
            <div className="max-w-3xl">
              <p className="mb-4 flex items-center gap-4 text-[10px] font-medium uppercase tracking-[0.28em] text-[#e4cdb9] md:mb-5 md:text-[11px]">
                <span className="h-px w-8 bg-[#e4cdb9]" />
                Nuestro portafolio
              </p>
              <h2 className="font-serif text-4xl font-normal leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
                Espacios que<br />
                <span className="italic text-[#e4cdb9]">cuentan historias.</span>
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-white/50 md:pb-2">
              Cada proyecto nace de una visión única. Exploramos la relación entre arquitectura, naturaleza y personas para crear espacios que trascienden el tiempo.
            </p>
          </div>

          {featured && (
            <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
              <ProjectCard project={featured} index={0} featured onOpen={openProject} />
              {secondary.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index + 1} featured={false} onOpen={openProject} />
              ))}
            </div>
          )}

          <div className="mt-16 flex flex-col gap-5 border-t border-white/10 pt-8 md:mt-20 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <span className="font-serif text-3xl text-[#e4cdb9]">ARKÉ</span>
              <span className="h-8 w-px bg-white/15" />
              <p className="max-w-[200px] text-xs leading-5 text-white/45">
                Arquitectura que conecta espacios, personas y emociones.
              </p>
            </div>
            <a href="#contacto" className="group inline-flex w-fit items-center gap-3 text-sm font-medium text-white transition-colors hover:text-[#e4cdb9]">
              ¿Tienes un proyecto en mente?
              <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </div>
        </div>
      </section>

      <ProjectModal
        project={selectedProject}
        onClose={closeProject}
        onPrevious={() => navigateProject(-1)}
        onNext={() => navigateProject(1)}
      />
    </>
  )
}

export default Projects