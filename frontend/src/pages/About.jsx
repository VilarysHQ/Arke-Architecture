
import aboutImage from "../assets/About/aboutImage.png"
import { aboutContent } from "../data/aboutData"
import { MoveRight } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"

// Animación escalonada del contenido
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
  },
}

// Entrada individual de elementos
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

// Revelado cinematográfico de imagen
const imageVariants = {
  hidden: {
    opacity: 0,
    scale: 1.07,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.15,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

function About() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="nosotros"
      aria-label="Sobre ARKÉ"
      className="
        w-full min-w-0
        bg-[#0c0c0c]
        text-white
      "
    >
      <div
        className="
          mx-auto grid w-full min-w-0
          max-w-[1600px]
          grid-cols-[minmax(0,1fr)]
          lg:grid-cols-2
        "
      >
        {/* Imagen cinematográfica */}
        <motion.div
          initial={
            reduceMotion
              ? false
              : "hidden"
          }
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.15,
          }}
          className="
            group relative
            h-[42svh] min-h-[260px]
            w-full min-w-0
            overflow-hidden
            bg-[#161616]

            sm:h-[50svh]
            md:h-[60vh]

            lg:h-auto
            lg:min-h-[600px]
          "
        >
          <motion.img
            src={aboutImage}
            alt="Interior de una casa con un árbol y ventanales"
            loading="lazy"
            variants={
              reduceMotion
                ? undefined
                : imageVariants
            }
            className="
              h-full w-full
              object-cover
              object-center

              transition-transform
              duration-1000
              ease-out

              group-hover:scale-[1.035]
              motion-reduce:transition-none
            "
          />

          {/* Capa visual */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute inset-0
              bg-black/10

              transition-colors duration-700
              group-hover:bg-transparent
              motion-reduce:transition-none
            "
          />
        </motion.div>

        {/* Contenido editorial */}
        <motion.div
          variants={
            reduceMotion
              ? undefined
              : containerVariants
          }
          initial={
            reduceMotion
              ? false
              : "hidden"
          }
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.12,
          }}
          className="
            flex w-full min-w-0
            flex-col justify-center

            px-5 py-14
            min-[390px]:px-6

            sm:px-10
            sm:py-16

            md:px-16
            md:py-20

            lg:px-16
            lg:py-28

            xl:px-24
            xl:py-32
          "
        >
          {/* Subtítulo */}
          <motion.p
            variants={
              reduceMotion
                ? undefined
                : itemVariants
            }
            className="
              mb-5 flex
              min-w-0
              items-center gap-3

              text-[10px] font-bold
              uppercase
              tracking-[0.22em]
              text-[#e4cdb9]

              md:mb-8
              md:gap-4
              md:text-xs
              md:tracking-[0.25em]
            "
          >
            <span
              aria-hidden="true"
              className="
                h-px w-7
                shrink-0
                bg-[#e4cdb9]
                md:w-8
              "
            />

            {aboutContent.subtitle}
          </motion.p>

          {/* Título */}
          <motion.h2
            variants={
              reduceMotion
                ? undefined
                : itemVariants
            }
            className="
              mb-7 w-full
              min-w-0 max-w-lg

              font-serif font-normal
              text-[clamp(2rem,8.3vw,3rem)]
              leading-[1.12]
              tracking-tight
              text-white
              [overflow-wrap:anywhere]

              sm:text-5xl
              md:mb-8
              lg:text-5xl
              xl:text-6xl
            "
          >
            {aboutContent.title}
          </motion.h2>

          {/* Párrafos */}
          <div
            className="
              mb-9 flex
              w-full min-w-0 max-w-md
              flex-col gap-5

              md:mb-12
              md:gap-6
            "
          >
            {aboutContent.paragraphs.map(
              (paragraph, index) => (
                <motion.p
                  key={index}
                  variants={
                    reduceMotion
                      ? undefined
                      : itemVariants
                  }
                  className="
                    w-full min-w-0
                    text-[13px]
                    leading-6
                    text-gray-400

                    sm:text-sm
                    sm:leading-7

                    md:text-base
                    md:leading-relaxed
                  "
                >
                  {paragraph}
                </motion.p>
              )
            )}
          </div>

          {/* Botón CTA */}
          <motion.div
            variants={
              reduceMotion
                ? undefined
                : itemVariants
            }
            className="w-full min-w-0"
          >
            <a
              href="#contacto"
              className="
                group inline-flex
                min-h-12
                w-full min-w-0
                items-center justify-center
                gap-3 rounded-full

                border border-white/20
                bg-white/5
                px-6 py-3.5

                text-center
                text-sm font-medium
                text-white

                backdrop-blur-md
                transition-all duration-300

                hover:border-[#e4cdb9]
                hover:bg-[#e4cdb9]
                hover:text-black

                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-[#e4cdb9]

                motion-reduce:transition-none

                sm:w-fit
                sm:px-8
                sm:py-4
              "
            >
              <span>{aboutContent.buttonText}</span>

              <MoveRight
                size={18}
                className="
                  shrink-0
                  transition-transform duration-300
                  group-hover:translate-x-1
                  motion-reduce:transition-none
                "
              />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
