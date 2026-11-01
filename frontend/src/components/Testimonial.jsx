
import { useEffect, useRef, useState } from "react"
import { Quote } from "lucide-react"
import {
  motion,
  useInView,
  useReducedMotion,
} from "motion/react"

import { testimonialData } from "../data/testimonialData"
import testimonialImage from "../assets/Testimonial/testimonialImage.png"

// Animación del contenido editorial
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.12,
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

const imageVariants = {
  hidden: {
    opacity: 0,
    scale: 1.065,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

// Función de suavizado para el contador
function easeOutCubic(progress) {
  return 1 - Math.pow(1 - progress, 3)
}

// Extraer número y texto complementario
function parseStatValue(value) {
  const original = String(value)

  const match = original.match(
    /^(\s*)(\d[\d.,]*)(.*)$/
  )

  if (!match) return null

  const [, leading, numericText, suffix] = match

  // Soporta agrupación de miles: 1,500 o 1.500
  const groupingPattern = /^\d{1,3}([.,]\d{3})+$/

  let target
  let decimals = 0
  let decimalSeparator = "."
  let groupingSeparator = ""

  if (groupingPattern.test(numericText)) {
    groupingSeparator = numericText.includes(",")
      ? ","
      : "."

    target = Number(
      numericText.replace(/[.,]/g, "")
    )
  } else {
    const decimalMatch = numericText.match(
      /^(\d+)([.,](\d+))?$/
    )

    if (!decimalMatch) return null

    decimals = decimalMatch[3]?.length ?? 0
    decimalSeparator = numericText.includes(",")
      ? ","
      : "."

    target = Number(
      numericText.replace(",", ".")
    )
  }

  if (!Number.isFinite(target)) return null

  return {
    leading,
    target,
    suffix,
    decimals,
    decimalSeparator,
    groupingSeparator,
  }
}

function formatStatNumber(value, stat) {
  const fixed = value.toFixed(stat.decimals)
  const [integer, fraction] = fixed.split(".")

  let formattedInteger = integer

  if (stat.groupingSeparator) {
    formattedInteger = integer.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      stat.groupingSeparator
    )
  }

  if (fraction !== undefined) {
    return (
      formattedInteger +
      stat.decimalSeparator +
      fraction
    )
  }

  return formattedInteger
}

// Contador progresivo individual
function AnimatedCounter({ value, active, reduceMotion }) {
  const parsedValue = parseStatValue(value)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!active || reduceMotion || !parsedValue) return

    let frameId
    let startTime = null

    const duration = 2600

    const animate = (timestamp) => {
      if (startTime === null) {
        startTime = timestamp
      }

      const elapsed = timestamp - startTime
      const nextProgress = Math.min(
        elapsed / duration,
        1
      )

      setProgress(easeOutCubic(nextProgress))

      if (nextProgress < 1) {
        frameId = requestAnimationFrame(animate)
      }
    }

    frameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(frameId)
    }
  }, [
    active,
    reduceMotion,
    parsedValue?.target,
    parsedValue?.decimals,
    parsedValue?.groupingSeparator,
  ])

  if (!parsedValue) {
    return <span>{value}</span>
  }

  if (reduceMotion) {
    return <span>{value}</span>
  }

  const currentValue = parsedValue.target * progress
  const displayValue = formatStatNumber(
    currentValue,
    parsedValue
  )

  return (
    <span
      aria-label={String(value)}
      className="tabular-nums"
    >
      <span aria-hidden="true">
        {parsedValue.leading}
        {displayValue}
        {parsedValue.suffix}
      </span>
    </span>
  )
}

function Testimonial() {
  const reduceMotion = useReducedMotion()
  const statsRef = useRef(null)

  const statsInView = useInView(statsRef, {
    once: true,
    amount: 0.4,
  })

  return (
    <section
      id="testimonios"
      aria-label="Testimonio de nuestros clientes"
      className="
        w-full min-w-0
        bg-[#0c0c0c]
        text-white
      "
    >
      <div
        className="
          mx-auto grid
          w-full min-w-0
          max-w-[1600px]
          grid-cols-[minmax(0,1fr)]
          lg:grid-cols-2
        "
      >
        {/* Fotografía */}
        <motion.div
          initial={reduceMotion ? false : "hidden"}
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
            src={testimonialImage}
            alt="Interior de Casa Mirador"
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

        {/* Contenido */}
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

            px-5 py-16
            min-[390px]:px-6

            sm:px-10
            md:px-16 md:py-20
            lg:px-16 lg:py-28
            xl:px-24 xl:py-32
          "
        >
          {/* Testimonio */}
          <blockquote className="relative min-w-0">
            {/* Comillas decorativas */}
            <motion.div
              variants={
                reduceMotion
                  ? undefined
                  : itemVariants
              }
              aria-hidden="true"
              className="
                pointer-events-none
                absolute -left-2 -top-9
                text-[#e4cdb9]/10

                md:-left-8
                md:-top-12
              "
            >
              <Quote
                size={64}
                className="rotate-180 md:h-24 md:w-24"
              />
            </motion.div>

            {/* Cita */}
            <motion.p
              variants={
                reduceMotion
                  ? undefined
                  : itemVariants
              }
              className="
                relative z-10
                min-w-0 max-w-full
                font-serif
                text-[clamp(1.5rem,6vw,2rem)]
                leading-[1.3]
                text-white
                [overflow-wrap:anywhere]

                sm:text-3xl
                lg:text-[2.1rem]
              "
            >
              “{testimonialData.quote}”
            </motion.p>

            {/* Autor */}
            <motion.footer
              variants={
                reduceMotion
                  ? undefined
                  : itemVariants
              }
              className="
                mt-8 flex min-w-0
                flex-wrap items-center
                gap-x-3 gap-y-2

                text-[10px]
                uppercase
                tracking-[0.15em]
                text-gray-400

                md:text-xs
                md:tracking-[0.2em]
              "
            >
              <span
                aria-hidden="true"
                className="
                  h-px w-8 shrink-0
                  bg-[#e4cdb9]
                "
              />

              <span className="font-medium text-white">
                {testimonialData.author}
              </span>

              <span
                aria-hidden="true"
                className="text-gray-600"
              >
                |
              </span>

              <span className="text-[#e4cdb9]">
                {testimonialData.project}
              </span>
            </motion.footer>
          </blockquote>

          {/* Estadísticas animadas */}
          <motion.div
            ref={statsRef}
            variants={
              reduceMotion
                ? undefined
                : containerVariants
            }
            className="
              mt-14 grid
              w-full min-w-0
              grid-cols-3

              border-t border-white/10
              pt-8

              md:mt-20
              md:pt-10
            "
          >
            {testimonialData.stats.map(
              (stat, index) => (
                <motion.div
                  key={index}
                  variants={
                    reduceMotion
                      ? undefined
                      : itemVariants
                  }
                  className={`
                    flex min-w-0
                    flex-col

                    ${
                      index !== 0
                        ? "border-l border-white/10 pl-3 sm:pl-4 md:pl-8"
                        : "pr-2"
                    }
                  `}
                >
                  {/* Valor */}
                  <span
                    className="
                      font-serif
                      text-[clamp(1.4rem,6vw,2rem)]
                      leading-none
                      text-white

                      sm:text-3xl
                      md:text-5xl
                      lg:text-5xl
                      xl:text-6xl
                    "
                  >
                    <AnimatedCounter
                      value={stat.value}
                      active={statsInView}
                      reduceMotion={reduceMotion}
                    />
                  </span>

                  {/* Etiqueta */}
                  <span
                    className="
                      mt-3
                      text-[8px]
                      uppercase
                      leading-relaxed
                      tracking-[0.08em]
                      text-gray-500
                      [overflow-wrap:anywhere]

                      sm:text-[9px]
                      sm:tracking-widest

                      md:text-[10px]
                    "
                  >
                    {stat.label}
                  </span>
                </motion.div>
              )
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonial
