
import { MapPin, Mail, Phone, ArrowUpRight } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"

import { footerData } from "../data/footerData"
import {
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
} from "../components/SocialIcons/SocialIcons"

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 22,
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

const contactIcons = {
  location: MapPin,
  email: Mail,
  phone: Phone,
}

const socialIcons = {
  instagram: InstagramIcon,
  linkedin: LinkedinIcon,
  youtube: YoutubeIcon,
}

const footerLinkClass = `
  group inline-flex w-fit max-w-full
  items-center gap-1
  text-sm leading-relaxed
  text-gray-400
  transition-colors duration-300
  hover:text-[#e4cdb9]
  focus-visible:rounded-sm
  focus-visible:outline-2
  focus-visible:outline-offset-4
  focus-visible:outline-[#e4cdb9]
  motion-reduce:transition-none
`

const headingClass = `
  text-[10px] font-bold
  uppercase tracking-[0.2em]
  text-gray-500
`

function ContactIcon({ type }) {
  const Icon = contactIcons[type]

  if (!Icon) return null

  return (
    <Icon
      size={18}
      strokeWidth={1.5}
      aria-hidden="true"
      className="shrink-0 text-[#e4cdb9]"
    />
  )
}

function Footer() {
  const reduceMotion = useReducedMotion()

  return (
    <footer
      className="
        relative w-full min-w-0
        border-t border-white/5
        bg-[#0c0c0c]
        text-white
      "
    >
      <div
        className="
          mx-auto w-full min-w-0
          max-w-[1400px]
          px-5 py-16
          min-[390px]:px-6
          md:px-12
          lg:px-20 lg:py-20
        "
      >
        {/* Columnas */}
        <motion.div
          variants={
            reduceMotion ? undefined : containerVariants
          }
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.12,
          }}
          className="
            grid w-full min-w-0
            grid-cols-1 gap-x-8 gap-y-12

            sm:grid-cols-2
            sm:gap-y-14

            lg:grid-cols-12
            lg:gap-x-6
            lg:gap-y-8
          "
        >
          {/* Marca */}
          <motion.div
            variants={
              reduceMotion ? undefined : itemVariants
            }
            className="
              flex min-w-0 flex-col gap-5
              sm:col-span-2
              lg:col-span-4
              lg:pr-8
            "
          >
            <a
              href="#inicio"
              aria-label="ARKÉ — Volver al inicio"
              className="
                group w-fit
                focus-visible:rounded-sm
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-[#e4cdb9]
              "
            >
              <span
                className="
                  block font-serif
                  text-[clamp(2.1rem,8vw,3.5rem)]
                  font-normal
                  tracking-[0.18em]
                  text-white
                  transition-colors duration-300
                  group-hover:text-[#e4cdb9]
                  motion-reduce:transition-none
                "
              >
                {footerData.brand.name}
              </span>
            </a>

            <p
              className="
                max-w-xs
                text-[13px]
                leading-7
                text-gray-400
                md:text-sm
              "
            >
              {footerData.brand.tagline}
            </p>

            <div
              aria-hidden="true"
              className="
                mt-1 h-px w-14
                bg-[#e4cdb9]/50
              "
            />
          </motion.div>

          {/* Navegación */}
          {footerData.links.map((column, index) => (
            <motion.div
              key={column.title ?? index}
              variants={
                reduceMotion ? undefined : itemVariants
              }
              className="
                flex min-w-0
                flex-col gap-5
                lg:col-span-2
              "
            >
              <h3 className={headingClass}>
                {column.title}
              </h3>

              <ul className="flex flex-col gap-4">
                {column.items.map((link, linkIndex) => (
                  <li
                    key={`${link.href}-${linkIndex}`}
                    className="min-w-0"
                  >
                    <a
                      href={link.href}
                      className={footerLinkClass}
                    >
                      <span
                        className="
                          relative
                          after:absolute
                          after:-bottom-1
                          after:left-0
                          after:h-px
                          after:w-0
                          after:bg-[#e4cdb9]
                          after:transition-[width]
                          after:duration-300
                          group-hover:after:w-full
                          group-focus-visible:after:w-full
                          motion-reduce:after:transition-none
                        "
                      >
                        {link.name}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Contacto */}
          <motion.div
            variants={
              reduceMotion ? undefined : itemVariants
            }
            className="
              flex min-w-0
              flex-col gap-5
              lg:col-span-3
            "
          >
            <h3 className={headingClass}>
              Contacto
            </h3>

            <ul className="flex flex-col gap-5">
              {footerData.contact.map((item, index) => (
                <li
                  key={`${item.type}-${index}`}
                  className="
                    flex min-w-0
                    items-start gap-3
                    text-sm
                    leading-6
                    text-gray-400
                  "
                >
                  <span className="mt-0.5 shrink-0">
                    <ContactIcon type={item.type} />
                  </span>

                  {item.href ? (
                    <a
                      href={item.href}
                      className="
                        min-w-0 break-words
                        transition-colors duration-300
                        hover:text-[#e4cdb9]
                        focus-visible:rounded-sm
                        focus-visible:outline-2
                        focus-visible:outline-offset-4
                        focus-visible:outline-[#e4cdb9]
                      "
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span className="min-w-0 break-words">
                      {item.text}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Redes */}
          <motion.div
            variants={
              reduceMotion ? undefined : itemVariants
            }
            className="
              flex min-w-0
              flex-col gap-5
              lg:col-span-1
            "
          >
            <h3
              className={`
                ${headingClass}
                lg:text-right
              `}
            >
              Redes
            </h3>

            <div
              className="
                flex flex-wrap
                items-start justify-start
                gap-3
                lg:justify-end
              "
            >
              {footerData.socials.map((social, index) => {
                const Icon = socialIcons[social.type]

                if (!Icon) return null

                return (
                  <motion.a
                    key={`${social.type}-${index}`}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visita nuestro ${social.type}`}
                    whileHover={
                      reduceMotion
                        ? undefined
                        : { y: -3 }
                    }
                    transition={{
                      duration: 0.25,
                      ease: "easeOut",
                    }}
                    className="
                      flex h-11 w-11 shrink-0
                      items-center justify-center
                      rounded-full
                      border border-white/15

                      text-gray-400

                      transition-[background-color,border-color,color]
                      duration-300

                      hover:border-[#e4cdb9]
                      hover:bg-[#e4cdb9]
                      hover:text-black

                      focus-visible:outline-2
                      focus-visible:outline-offset-4
                      focus-visible:outline-[#e4cdb9]

                      motion-reduce:transition-none
                    "
                  >
                    <Icon size={18} />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>
        </motion.div>

        {/* Franja editorial */}
        <motion.div
          initial={
            reduceMotion
              ? false
              : { opacity: 0, y: 16 }
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
          className="
            mt-14 flex min-w-0
            items-center justify-between
            gap-4
            border-t border-white/10
            pt-7

            lg:mt-20
          "
        >
          <p
            className="
              text-[10px]
              font-medium uppercase
              tracking-[0.18em]
              text-[#e4cdb9]/75
            "
          >
            Arquitectura que perdura
          </p>

          <a
            href="#inicio"
            aria-label="Volver al inicio"
            className="
              group inline-flex
              shrink-0 items-center gap-2
              text-[11px]
              text-gray-400
              transition-colors
              hover:text-[#e4cdb9]

              focus-visible:outline-2
              focus-visible:outline-offset-4
              focus-visible:outline-[#e4cdb9]
            "
          >
            Volver arriba

            <ArrowUpRight
              size={17}
              className="
                transition-transform duration-300
                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
                motion-reduce:transition-none
              "
            />
          </a>
        </motion.div>

        {/* Legal */}
        <div
          className="
            mt-8 flex min-w-0
            flex-col gap-5
            border-t border-white/10
            pt-7

            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          <p
            className="
              text-[10px]
              uppercase
              leading-6
              tracking-[0.12em]
              text-gray-500

              md:text-[11px]
              md:tracking-widest
            "
          >
            {footerData.legal.copyright}
          </p>

          <div
            className="
              flex flex-wrap
              items-center gap-x-6 gap-y-3
            "
          >
            {footerData.legal.links.map((link, index) => (
              <a
                key={`${link.href}-${index}`}
                href={link.href}
                className="
                  text-[10px]
                  uppercase
                  leading-6
                  tracking-[0.12em]
                  text-gray-500

                  transition-colors duration-300
                  hover:text-white

                  focus-visible:rounded-sm
                  focus-visible:outline-2
                  focus-visible:outline-offset-4
                  focus-visible:outline-[#e4cdb9]

                  md:text-[11px]
                  md:tracking-widest
                "
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
