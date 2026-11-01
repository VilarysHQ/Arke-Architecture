import { useCallback, useRef, useState } from "react"
import { ArrowUpRight, ArrowRight } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"

import { projectsData } from "../data/projectsData"
import ProjectModal from "../components/Projects/ProjectModal"

const revealVariants = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

const headingVariants = {
  hidden: {},
  visible: { transition: { delayChildren: 0.1, staggerChildren: 0.14 } },
}

const galleryVariants = {
  hidden: {},
  visible: { transition: { delayChildren: 0.12, staggerChildren: 0.17 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
}

function ProjectCard({ project, index, total, featured, onOpen, reduceMotion }) {
  const buttonRef = useRef(null)

  const number = String(index + 1).padStart(2, "0")
  const totalNumber = String(total).padStart(2, "0")

  return (
    <motion.button
      ref={buttonRef}
      type="button"
      variants={reduceMotion ? undefined : cardVariants}
      onClick={() => onOpen(index, buttonRef.current)}
      aria-label={`Explorar proyecto ${project.title}`}
      className={`
        group relative block w-full min-w-0 max-w-full touch-manipulation cursor-pointer text-left outline-none
        focus-visible:ring-2 focus-visible:ring-[#e4cdb9] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0c0c0c]
        ${featured ? "lg:col-span-2" : ""}
      `}
    >
      <div
        className={`
          relative w-full min-w-0 overflow-hidden bg-[#1a1a1a]
          ${featured ? "aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]" : "aspect-[4/3]"}
        `}
      >
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.055] group-focus-visible:scale-[1.055] motion-reduce:transition-none"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10 opacity-75 transition-opacity duration-700 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
        />

        <span className="absolute left-4 top-4 text-[10px] font-medium tracking-[0.2em] text-white/90 sm:left-5 sm:top-5 md:left-8 md:top-8 md:text-xs">
          {number} / {totalNumber}
        </span>

        <span className="absolute right-4 top-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/40 bg-black/20 text-white backdrop-blur-md transition-all duration-300 group-hover:border-[#e4cdb9] group-hover:bg-[#e4cdb9] group-hover:text-[#111111] group-focus-visible:border-[#e4cdb9] group-focus-visible:bg-[#e4cdb9] group-focus-visible:text-[#111111] sm:right-5 sm:top-5 md:right-8 md:top-8 md:h-11 md:w-11 motion-reduce:transition-none">
          <ArrowUpRight size={19} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none" />
        </span>

        <div className="absolute bottom-4 left-4 right-4 flex min-w-0 items-end justify-between gap-3 sm:bottom-5 sm:left-5 sm:right-5 md:bottom-8 md:left-8 md:right-8">
          <div className="min-w-0 max-w-full">
            <p className="mb-1.5 max-w-full text-[9px] font-medium uppercase tracking-[0.13em] leading-relaxed text-[#e4cdb9] [overflow-wrap:anywhere] md:mb-2 md:text-[10px] md:tracking-[0.23em]">
              {project.category} — {project.location}
            </p>
            <h3 className={`max-w-full font-serif font-normal leading-tight text-white [overflow-wrap:anywhere] ${featured ? "text-[clamp(1.35rem,6vw,1.8rem)] sm:text-3xl md:text-5xl" : "text-xl sm:text-2xl md:text-3xl"}`}>
              {project.title}
            </h3>
          </div>
          <ArrowRight size={20} aria-hidden="true" className="hidden shrink-0 text-white transition-transform duration-300 group-hover:translate-x-2 sm:block motion-reduce:transition-none" />
        </div>
      </div>
    </motion.button>
  )
}

function Projects() {
  const reduceMotion = useReducedMotion()
  const triggerRef = useRef(null)
  const [selectedIndex, setSelectedIndex] = useState(null)

  const selectedProject = selectedIndex === null ? null : projectsData[selectedIndex] ?? null
  const featured = projectsData[0]
  const secondary = projectsData.slice(1)

  const openProject = useCallback((index, trigger) => {
    triggerRef.current = trigger
    setSelectedIndex(index)
  }, [])

  const closeProject = useCallback(() => setSelectedIndex(null), [])

  const restoreFocus = useCallback(() => {
    triggerRef.current?.focus({ preventScroll: true })
  }, [])

  const navigateProject = useCallback((direction) => {
    setSelectedIndex((current) => {
      if (current === null || projectsData.length === 0) return current
      return (current + direction + projectsData.length) % projectsData.length
    })
  }, [])

  return (
    <>
      <section
        id="proyectos"
        aria-labelledby="projects-heading"
        className="relative w-full min-w-0 max-w-full scroll-mt-[76px] bg-[#0c0c0c] py-20 text-white md:py-32"
      >
        <div className="mx-auto w-full min-w-0 max-w-[1440px] px-5 min-[390px]:px-6 md:px-12 lg:px-20">
          
          <motion.div
            variants={reduceMotion ? undefined : headingVariants}
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mb-12 flex min-w-0 w-full flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between md:gap-8"
          >
            <div className="w-full min-w-0 max-w-3xl md:flex-1">
              <motion.p
                variants={reduceMotion ? undefined : revealVariants}
                className="mb-4 flex max-w-full items-center gap-3 text-[10px] font-medium uppercase tracking-[0.22em] text-[#e4cdb9] md:mb-5 md:gap-4 md:text-[11px] md:tracking-[0.28em]"
              >
                <span aria-hidden="true" className="h-px w-7 shrink-0 bg-[#e4cdb9] md:w-8" />
                Nuestro portafolio
              </motion.p>

              <motion.h2
                id="projects-heading"
                variants={reduceMotion ? undefined : revealVariants}
                className="w-full min-w-0 max-w-full font-serif font-normal text-[clamp(1.85rem,7.5vw,3rem)] leading-[1.12] tracking-tight [overflow-wrap:anywhere] sm:text-5xl lg:text-6xl"
              >
                Espacios que
                <br />
                <span className="italic text-[#e4cdb9]">cuentan historias.</span>
              </motion.h2>
            </div>

            <motion.p
              variants={reduceMotion ? undefined : revealVariants}
              className="w-full min-w-0 max-w-sm whitespace-normal break-words text-[13px] leading-6 text-white/50 sm:text-sm sm:leading-7 md:w-auto md:shrink md:pb-2"
            >
              Cada proyecto nace de una visión única. Exploramos la relación entre arquitectura, naturaleza y personas para crear espacios que trascienden el tiempo.
            </motion.p>
          </motion.div>

          {featured && (
            <motion.div
              variants={reduceMotion ? undefined : galleryVariants}
              initial={reduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.12 }}
              className="grid w-full min-w-0 grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2"
            >
              <ProjectCard
                project={featured}
                index={0}
                total={projectsData.length}
                featured
                onOpen={openProject}
                reduceMotion={reduceMotion}
              />
              {secondary.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index + 1}
                  total={projectsData.length}
                  featured={false}
                  onOpen={openProject}
                  reduceMotion={reduceMotion}
                />
              ))}
            </motion.div>
          )}

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: reduceMotion ? 0 : 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16 flex min-w-0 flex-col gap-5 border-t border-white/10 pt-8 md:mt-20 md:flex-row md:items-center md:justify-between"
          >
            <div className="flex min-w-0 items-center gap-4">
              <span className="shrink-0 font-serif text-3xl text-[#e4cdb9]">ARKÉ</span>
              <span aria-hidden="true" className="h-8 w-px shrink-0 bg-white/15" />
              <p className="min-w-0 max-w-[200px] text-xs leading-5 text-white/45">
                Arquitectura que conecta espacios, personas y emociones.
              </p>
            </div>

            <a
              href="#contacto"
              className="group inline-flex w-fit max-w-full items-center gap-3 text-sm font-medium text-white transition-colors duration-300 hover:text-[#e4cdb9] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e4cdb9]"
            >
              <span>¿Tienes un proyecto en mente?</span>
              <ArrowUpRight size={18} className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 motion-reduce:transition-none" />
            </a>
          </motion.div>
        </div>
      </section>

      <ProjectModal
        project={selectedProject}
        onClose={closeProject}
        onPrevious={() => navigateProject(-1)}
        onNext={() => navigateProject(1)}
        onExited={restoreFocus}
      />
    </>
  )
}

export default Projects