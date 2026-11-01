
import { motion, useReducedMotion } from "motion/react"
import { cardsData } from "../../data/informationCards"

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

function InfoCards() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      aria-label="Nuestros valores"
      className="w-full bg-[#0c0c0c] py-12 text-white"
    >
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12 lg:px-20">
        <motion.div
          variants={
            reduceMotion ? undefined : containerVariants
          }
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2,
          }}
          className="
            grid grid-cols-1
            md:grid-cols-2
            lg:grid-cols-4
            lg:gap-0
            lg:divide-x
            lg:divide-white/10
          "
        >
          {cardsData.map((card) => {
            const Icon = card.icon

            return (
              <motion.div
                key={card.id}
                variants={
                  reduceMotion ? undefined : cardVariants
                }
                className="
                  group flex flex-col
                  items-center gap-3
                  border-b border-white/10
                  py-8 text-center
                  first:pt-0
                  last:border-b-0
                  last:pb-0

                  md:flex-row
                  md:items-start
                  md:gap-4
                  md:border-none
                  md:py-0
                  md:text-left

                  lg:px-8
                "
              >
                {/* Icono animado */}
                <motion.div
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          y: -4,
                          scale: 1.08,
                        }
                  }
                  transition={{
                    duration: 0.25,
                    ease: "easeOut",
                  }}
                  className="
                    shrink-0
                    text-[#e4cdb9]
                    transition-colors duration-300
                    group-hover:text-[#f3dfcc]
                  "
                >
                  <Icon
                    className="
                      h-7 w-7
                      md:h-6 md:w-6
                    "
                    strokeWidth={1.5}
                  />
                </motion.div>

                {/* Información */}
                <div className="flex flex-col gap-1.5">
                  <h3
                    className="
                      text-[15px]
                      font-semibold
                      tracking-wide
                      transition-colors duration-300
                      group-hover:text-[#e4cdb9]
                    "
                  >
                    {card.title}
                  </h3>

                  <p
                    className="
                      text-[13px]
                      leading-relaxed
                      text-gray-400
                    "
                  >
                    {card.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default InfoCards
