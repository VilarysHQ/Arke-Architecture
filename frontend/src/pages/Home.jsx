
import { useRef } from "react"
import { ArrowRight } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import HeroSlider from "../components/Home/HeroSlider"

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.16,
    },
  },
}

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

function Home() {
  const homeRef = useRef(null)
  const reduceMotion = useReducedMotion()

  return (
    <section
      ref={homeRef}
      id="inicio"
      aria-label="Inicio de ARKÉ"
      className="
        relative isolate flex
        min-h-[100svh] w-full
        min-w-0 max-w-full
        flex-col justify-center
        overflow-hidden
        bg-[#0c0c0c]
        text-white
        md:min-h-[100dvh]
      "
    >
      {/* Slider cinematográfico */}
      <HeroSlider containerRef={homeRef} />

      {/* Contenido principal */}
      <motion.div
        variants={
          reduceMotion ? undefined : containerVariants
        }
        initial={reduceMotion ? false : "hidden"}
        animate="visible"
        className="
          relative z-10
          flex w-full min-w-0 max-w-full
          flex-col justify-center
          px-5 pb-28 pt-28

          min-[390px]:px-6
          sm:px-10

          md:px-12
          md:pb-20
          md:pt-24

          lg:px-20
        "
      >
        {/* Subtítulo */}
        <motion.p
          variants={reduceMotion ? undefined : itemVariants}
          className="
            mb-3
            text-[10px] font-semibold
            uppercase tracking-[0.23em]
            text-[#e4cdb9]
            md:mb-4
            md:text-xs
          "
        >
          Arquitectura que perdura
        </motion.p>

        {/* Título principal */}
        <motion.h1
          variants={reduceMotion ? undefined : itemVariants}
          className="
            mb-5 max-w-2xl
            font-serif
            text-[clamp(2.3rem,9.5vw,3.5rem)]
            leading-[1.08]
            tracking-tight
            text-white

            sm:text-6xl
            md:mb-6
            lg:text-7xl
          "
        >
          Espacios
          <br />
          con{" "}
          <span className="font-light italic">
            propósito
          </span>
        </motion.h1>

        {/* Descripción */}
        <motion.p
          variants={reduceMotion ? undefined : itemVariants}
          className="
            mb-7 max-w-md
            text-[13px]
            leading-6
            text-white/80

            sm:text-sm
            md:mb-10
            md:text-base
            md:leading-relaxed
          "
        >
          Diseñamos espacios que conectan con las personas,
          el entorno y el tiempo, creando experiencias
          que trascienden.
        </motion.p>

        {/* CTA */}
        <motion.div
          variants={reduceMotion ? undefined : itemVariants}
          className="
            flex w-full min-w-0
            flex-col gap-3

            sm:flex-row
            sm:items-center
            sm:gap-5
          "
        >
          {/* Ver proyectos */}
          <a
            href="#proyectos"
            className="
              group flex min-h-12
              w-full min-w-0
              items-center justify-center
              gap-3 rounded-full
              bg-[#e4cdb9]
              px-6 py-3
              text-sm font-semibold
              text-[#111111]

              transition-colors duration-300
              hover:bg-white
              active:scale-[0.98]

              focus-visible:outline-2
              focus-visible:outline-offset-4
              focus-visible:outline-[#e4cdb9]

              motion-reduce:transition-none

              sm:w-auto
              md:px-8
            "
          >
            Ver proyectos

            <ArrowRight
              size={17}
              className="
                shrink-0
                transition-transform duration-300
                group-hover:translate-x-1
                motion-reduce:transition-none
              "
            />
          </a>

          {/* Nuestra filosofía */}
          <a
            href="#nosotros"
            className="
              flex min-h-12
              w-full min-w-0
              items-center justify-center
              rounded-full
              border border-white/30
              bg-white/10
              px-6 py-3
              text-sm font-medium
              text-white
              backdrop-blur-md

              transition-colors duration-300
              hover:bg-white/20

              focus-visible:outline-2
              focus-visible:outline-offset-4
              focus-visible:outline-[#e4cdb9]

              sm:w-auto
              md:px-8
            "
          >
            Nuestra filosofía
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Home
