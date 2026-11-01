
import { motion, useReducedMotion } from "motion/react"
import { processData } from "../data/processData"

// Animaciones de entrada
const revealVariants = {
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

const staggerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.15,
    },
  },
}

const LIGHT_DURATION = 4

// Línea luminosa horizontal para tablet y desktop
function HorizontalTrack({ reduceMotion }) {
  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        absolute left-6 right-6 top-6
        z-0 h-px
        bg-white/15
      "
    >
      <div className="absolute inset-0 bg-[#e4cdb9]/10" />

      <motion.div
        className="
          absolute -top-[2px]
          h-[5px] w-[14%]
          rounded-full
          bg-gradient-to-r
          from-transparent
          via-[#e4cdb9]
          to-white

          shadow-[0_0_12px_2px_rgba(228,205,185,0.6)]
        "
        initial={{ left: "0%", opacity: 0 }}
        animate={
          reduceMotion
            ? { left: "43%", opacity: 0.5 }
            : {
                left: ["0%", "86%"],
                opacity: [0, 1, 1, 0],
              }
        }
        transition={
          reduceMotion
            ? { duration: 0 }
            : {
                duration: LIGHT_DURATION,
                ease: "linear",
                repeat: Infinity,
                repeatDelay: 0.8,
              }
        }
      />
    </div>
  )
}

// Línea luminosa vertical para celular
function VerticalTrack({ reduceMotion }) {
  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        absolute bottom-6 left-[23px]
        top-6 z-0 w-px
        bg-white/15
      "
    >
      <motion.div
        className="
          absolute -left-[2px]
          h-14 w-[5px]
          rounded-full
          bg-gradient-to-b
          from-transparent
          via-[#e4cdb9]
          to-white

          shadow-[0_0_12px_2px_rgba(228,205,185,0.55)]
        "
        initial={{ top: "0%", opacity: 0 }}
        animate={
          reduceMotion
            ? { top: "40%", opacity: 0.5 }
            : {
                top: ["0%", "calc(100% - 56px)"],
                opacity: [0, 1, 1, 0],
              }
        }
        transition={
          reduceMotion
            ? { duration: 0 }
            : {
                duration: 5,
                ease: "linear",
                repeat: Infinity,
                repeatDelay: 0.8,
              }
        }
      />
    </div>
  )
}

// Tarjeta para la línea de tiempo horizontal
function HorizontalStep({ step, reduceMotion }) {
  return (
    <motion.div
      variants={reduceMotion ? undefined : revealVariants}
      className="
        group relative z-10
        flex min-w-0 flex-col
        items-start
      "
    >
      {/* Marcador */}
      <div
        className="
          flex h-12 w-12
          shrink-0
          items-center justify-center
          rounded-full
          border border-[#e4cdb9]/45
          bg-[#0c0c0c]
          text-[#e4cdb9]

          transition-[border-color,box-shadow,transform]
          duration-500

          group-hover:scale-105
          group-hover:border-[#e4cdb9]
          group-hover:shadow-[0_0_20px_rgba(228,205,185,0.15)]

          motion-reduce:transition-none
        "
      >
        <span className="font-serif text-xl">
          {step.id}
        </span>
      </div>

      {/* Contenido */}
      <div className="mt-8 min-w-0 pr-5 lg:pr-8">
        <h3
          className="
            mb-3
            font-serif
            text-xl leading-snug
            text-white

            lg:text-2xl
          "
        >
          {step.title}
        </h3>

        <p
          className="
            max-w-sm
            text-sm leading-7
            text-gray-400
          "
        >
          {step.description}
        </p>
      </div>
    </motion.div>
  )
}

// Paso para línea vertical móvil
function MobileStep({ step, reduceMotion }) {
  return (
    <motion.div
      variants={reduceMotion ? undefined : revealVariants}
      className="
        relative z-10
        flex min-w-0
        items-start gap-5
      "
    >
      <div
        className="
          flex h-12 w-12
          shrink-0
          items-center justify-center
          rounded-full

          border border-[#e4cdb9]/50
          bg-[#0c0c0c]
          text-[#e4cdb9]
        "
      >
        <span className="font-serif text-xl">
          {step.id}
        </span>
      </div>

      <div
        className="
          min-w-0 flex-1
          pb-2 pt-1
        "
      >
        <h3
          className="
            mb-2
            font-serif
            text-xl leading-tight
            text-white
          "
        >
          {step.title}
        </h3>

        <p
          className="
            text-[13px]
            leading-6
            text-gray-400
            sm:text-sm
          "
        >
          {step.description}
        </p>
      </div>
    </motion.div>
  )
}

function Process() {
  const reduceMotion = useReducedMotion()

  // Dos pasos por fila en tablet
  const tabletRows = []

  for (let i = 0; i < processData.length; i += 2) {
    tabletRows.push(processData.slice(i, i + 2))
  }

  return (
    <section
      id="proceso"
      aria-labelledby="process-heading"
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
          variants={reduceMotion ? undefined : staggerVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.3,
          }}
          className="
            mb-14 flex min-w-0
            flex-col gap-4
            border-b border-white/10
            pb-6

            md:mb-16
            md:flex-row
            md:items-end
            md:justify-between
            md:gap-8
          "
        >
          <motion.h2
            id="process-heading"
            variants={reduceMotion ? undefined : revealVariants}
            className="
              min-w-0
              font-serif font-normal
              text-[clamp(2rem,8vw,3rem)]
              leading-[1.1]
              text-white

              sm:text-5xl
              lg:text-6xl
            "
          >
            Nuestro proceso
          </motion.h2>

          <motion.p
            variants={reduceMotion ? undefined : revealVariants}
            className="
              flex min-w-0
              items-center gap-3

              text-[10px] font-bold
              uppercase tracking-[0.18em]
              leading-relaxed
              text-[#e4cdb9]

              md:max-w-xs
              md:gap-4
              md:pb-2
              md:text-[11px]
              md:tracking-[0.22em]
            "
          >
            <span
              aria-hidden="true"
              className="
                hidden h-px w-8
                shrink-0
                bg-[#e4cdb9]
                md:block
              "
            />

            Un camino claro hacia grandes espacios.
          </motion.p>
        </motion.div>

        {/* ===================================== */}
        {/* MÓVIL — TIMELINE VERTICAL */}
        {/* ===================================== */}
        <motion.div
          variants={reduceMotion ? undefined : staggerVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.12,
          }}
          className="
            relative flex flex-col
            gap-12
            md:hidden
          "
        >
          <VerticalTrack reduceMotion={reduceMotion} />

          {processData.map((step) => (
            <MobileStep
              key={step.id}
              step={step}
              reduceMotion={reduceMotion}
            />
          ))}
        </motion.div>

        {/* ===================================== */}
        {/* TABLET — DOS PASOS POR FILA */}
        {/* ===================================== */}
        <div className="hidden md:flex md:flex-col md:gap-16 lg:hidden">
          {tabletRows.map((row, rowIndex) => (
            <motion.div
              key={row[0]?.id ?? rowIndex}
              variants={reduceMotion ? undefined : staggerVariants}
              initial={reduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.25,
              }}
              className="
                relative grid
                grid-cols-2 gap-8
              "
            >
              <HorizontalTrack reduceMotion={reduceMotion} />

              {row.map((step) => (
                <HorizontalStep
                  key={step.id}
                  step={step}
                  reduceMotion={reduceMotion}
                />
              ))}
            </motion.div>
          ))}
        </div>

        {/* ===================================== */}
        {/* DESKTOP — CUATRO PASOS EN LÍNEA */}
        {/* ===================================== */}
        <motion.div
          variants={reduceMotion ? undefined : staggerVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2,
          }}
          className="
            relative hidden
            lg:grid
            lg:grid-cols-4
            lg:gap-8
          "
        >
          <HorizontalTrack reduceMotion={reduceMotion} />

          {processData.map((step) => (
            <HorizontalStep
              key={step.id}
              step={step}
              reduceMotion={reduceMotion}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Process
