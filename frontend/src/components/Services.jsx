
import { ArrowRight } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import { servicesData } from "../data/servicesData"

// Animación escalonada del encabezado
const headerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
  },
}

// Animación de elementos
const itemVariants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

// Animación escalonada de tarjetas
const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 28,
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

function Services() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="servicios"
      aria-labelledby="services-heading"
      className="
        w-full min-w-0
        bg-[#0c0c0c]
        py-20 text-white
        md:py-32
      "
    >
      <div
        className="
          mx-auto w-full min-w-0
          max-w-[1400px]
          px-5
          min-[390px]:px-6
          md:px-12
          lg:px-20
        "
      >
        {/* Encabezado */}
        <motion.div
          variants={
            reduceMotion ? undefined : headerVariants
          }
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2,
          }}
          className="
            mb-12 flex min-w-0
            flex-col gap-6
            border-b border-white/10
            pb-8

            md:mb-16
            md:flex-row
            md:items-end
            md:justify-between
            md:gap-8
          "
        >
          <div className="min-w-0">
            {/* Etiqueta */}
            <motion.p
              variants={
                reduceMotion ? undefined : itemVariants
              }
              className="
                mb-4 flex
                items-center gap-3
                text-[10px] font-bold
                uppercase
                tracking-[0.22em]
                text-[#e4cdb9]

                md:gap-4
                md:text-[11px]
                md:tracking-[0.25em]
              "
            >
              <span
                aria-hidden="true"
                className="
                  h-px w-8 shrink-0
                  bg-[#e4cdb9]
                "
              />

              Lo que hacemos
            </motion.p>

            {/* Título */}
            <motion.h2
              id="services-heading"
              variants={
                reduceMotion ? undefined : itemVariants
              }
              className="
                max-w-full
                font-serif font-normal
                text-[clamp(2.25rem,9vw,3rem)]
                leading-[1.1]
                tracking-tight
                sm:text-5xl
                lg:text-6xl
              "
            >
              Servicios
            </motion.h2>
          </div>

          {/* CTA desktop */}
          <motion.a
            variants={
              reduceMotion ? undefined : itemVariants
            }
            href="#contacto"
            className="
              group hidden
              items-center gap-2
              text-sm font-medium
              text-white/70
              transition-colors duration-300
              hover:text-[#e4cdb9]

              focus-visible:outline-2
              focus-visible:outline-offset-4
              focus-visible:outline-[#e4cdb9]

              md:inline-flex
              md:shrink-0
            "
          >
            Conoce todos nuestros servicios

            <ArrowRight
              size={16}
              className="
                shrink-0
                transition-transform duration-300
                group-hover:translate-x-1
                motion-reduce:transition-none
              "
            />
          </motion.a>
        </motion.div>

        {/* Grid de servicios */}
        <motion.div
          variants={
            reduceMotion ? undefined : gridVariants
          }
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.12,
          }}
          className="
            grid w-full min-w-0
            grid-cols-[minmax(0,1fr)]
            gap-4

            md:grid-cols-2
            md:gap-5

            lg:grid-cols-4
            lg:gap-6
          "
        >
          {servicesData.map((service) => {
            const Icon = service.icon

            return (
              <motion.div
                key={service.id}
                variants={
                  reduceMotion ? undefined : cardVariants
                }
                className="
                  group flex
                  min-w-0 max-w-full
                  flex-col gap-6

                  rounded-xl
                  border border-white/5
                  bg-[#111111]

                  p-6
                  min-[390px]:p-7
                  md:p-8

                  transition-[background-color,border-color,box-shadow]
                  duration-500

                  hover:border-[#e4cdb9]/30
                  hover:bg-[#161616]
                  hover:shadow-2xl
                  hover:shadow-[#e4cdb9]/5

                  motion-reduce:transition-none
                "
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        y: -5,
                      }
                }
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                }}
              >
                {/* Icono */}
                <div
                  className="
                    flex h-14 w-14
                    shrink-0
                    items-center justify-center
                    rounded-full
                    bg-[#e4cdb9]/10
                    text-[#e4cdb9]

                    transition-transform duration-500
                    group-hover:scale-110
                    motion-reduce:transition-none
                  "
                >
                  <Icon
                    size={28}
                    strokeWidth={1.5}
                  />
                </div>

                {/* Contenido */}
                <div className="min-w-0">
                  <h3
                    className="
                      mb-3
                      font-serif
                      text-xl leading-snug
                      text-white
                      [overflow-wrap:anywhere]
                    "
                  >
                    {service.title}
                  </h3>

                  <p
                    className="
                      text-[13px]
                      leading-6
                      text-gray-400

                      md:text-sm
                      md:leading-relaxed
                    "
                  >
                    {service.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* CTA móvil */}
        <motion.div
          initial={
            reduceMotion
              ? false
              : { opacity: 0, y: 20 }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.5,
          }}
          transition={{
            duration: reduceMotion ? 0 : 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-10 flex w-full min-w-0 justify-center md:hidden"
        >
          <a
            href="#contacto"
            className="
              flex min-h-12
              w-full min-w-0
              items-center justify-center
              gap-2 rounded-full

              border border-white/20
              bg-white/5
              px-5 py-4

              text-center
              text-[13px] font-medium
              text-white
              backdrop-blur-md

              transition-colors duration-300
              hover:border-[#e4cdb9]
              hover:bg-[#e4cdb9]
              hover:text-black

              focus-visible:outline-2
              focus-visible:outline-offset-4
              focus-visible:outline-[#e4cdb9]

              motion-reduce:transition-none
            "
          >
            <span>
              Conoce todos nuestros servicios
            </span>

            <ArrowRight
              size={16}
              className="shrink-0"
            />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Services
