
import { useState } from "react"
import {
  MapPin,
  Mail,
  Phone,
  ArrowRight,
  ArrowUpRight,
  Check,
} from "lucide-react"
import {
  motion,
  useReducedMotion,
} from "motion/react"

import { contactData } from "../data/contactData"
import contactBg from "../assets/Contact/contactBg.png"

// Animaciones
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.12,
    },
  },
}

const revealVariants = {
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

const photoVariants = {
  hidden: {
    opacity: 0,
    scale: 1.06,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const fieldClass = `
  w-full min-w-0
  rounded-none
  border-0 border-b border-white/20
  bg-transparent
  px-0 pb-3 pt-2
  text-[14px] text-white
  placeholder:text-white/30
  outline-none
  transition-colors duration-300
  focus:border-[#e4cdb9]
  focus-visible:border-[#e4cdb9]
`

const labelClass = `
  text-[10px] font-medium
  uppercase tracking-[0.17em]
  text-white/55
`

const iconComponents = {
  location: MapPin,
  email: Mail,
  phone: Phone,
}

// Bloque de información de contacto
function ContactInfo({ item }) {
  const Icon = iconComponents[item.type]

  return (
    <div className="flex min-w-0 items-start gap-4">
      <div
        className="
          flex h-11 w-11 shrink-0
          items-center justify-center
          rounded-full
          border border-white/25
          bg-black/25
          text-[#e4cdb9]
          backdrop-blur-md
        "
      >
        {Icon && <Icon size={19} strokeWidth={1.5} />}
      </div>

      <div className="min-w-0 pt-0.5">
        <h3
          className="
            mb-1 text-[10px]
            font-medium uppercase
            tracking-[0.16em]
            text-[#e4cdb9]
          "
        >
          {item.title}
        </h3>

        <p
          className="
            whitespace-pre-line
            break-words
            text-[13px]
            leading-6
            text-white/85
          "
        >
          {item.value}
        </p>
      </div>
    </div>
  )
}

function Contact() {
  const reduceMotion = useReducedMotion()
  const [notice, setNotice] = useState("")

  // Utilizamos el correo existente en contactData.
  // No necesitamos inventar una dirección nueva.
  const emailInfo = contactData.info.find(
    (item) => item.type === "email"
  )

  const recipient =
    String(emailInfo?.value ?? "")
      .match(/[^\s@]+@[^\s@]+\.[^\s@]+/)?.[0] ?? ""

  const handleSubmit = (event) => {
    event.preventDefault()

    const form = event.currentTarget
    const data = new FormData(form)

    if (!form.reportValidity()) return

    // El diseño funciona sin backend.
    // Se prepara un correo, pero NO se simula un envío.
    if (!recipient) {
      setNotice(
        "No hay un correo de destino configurado. Revisa contactData.js."
      )
      return
    }

    const name = String(data.get("name") ?? "").trim()
    const email = String(data.get("email") ?? "").trim()
    const phone = String(data.get("phone") ?? "").trim()
    const type = String(data.get("type") ?? "").trim()
    const message = String(data.get("message") ?? "").trim()

    const subject = `Nueva consulta de proyecto — ${name}`

    const body = [
      "Hola ARKÉ,",
      "",
      "Me gustaría consultar sobre un proyecto.",
      "",
      `Nombre: ${name}`,
      `Correo: ${email}`,
      `Teléfono: ${phone || "No indicado"}`,
      `Tipo de proyecto: ${type}`,
      "",
      "Descripción:",
      message,
      "",
      "Enviado desde el formulario de ARKÉ.",
    ].join("\n")

    const mailto = `mailto:${recipient}?${new URLSearchParams({
      subject,
      body,
    }).toString()}`

    setNotice(
      "Se intentará abrir tu aplicación de correo. Revisa el borrador y pulsa Enviar para completar la solicitud."
    )

    window.location.href = mailto
  }

  return (
    <section
      id="contacto"
      aria-labelledby="contact-heading"
      className="
        relative w-full min-w-0
        bg-[#0c0c0c]
        py-20 text-white
        md:py-28
        xl:py-32
      "
    >
      {/* Contenedor general */}
      <div
        className="
          mx-auto w-full min-w-0
          max-w-[1500px]
          px-5
          min-[390px]:px-6
          md:px-12
          xl:px-20
        "
      >
        {/* Encabezado editorial */}
        <motion.div
          variants={
            reduceMotion ? undefined : containerVariants
          }
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.25,
          }}
          className="
            mb-10 flex min-w-0
            flex-col gap-5
            md:mb-14
            md:flex-row
            md:items-end
            md:justify-between
          "
        >
          <div className="min-w-0">
            <motion.p
              variants={
                reduceMotion ? undefined : revealVariants
              }
              className="
                mb-5 flex items-center gap-3
                text-[10px] font-semibold
                uppercase tracking-[0.24em]
                text-[#e4cdb9]
                md:text-[11px]
              "
            >
              <span
                aria-hidden="true"
                className="h-px w-8 shrink-0 bg-[#e4cdb9]"
              />
              {contactData.subtitle}
            </motion.p>

            <motion.h2
              id="contact-heading"
              variants={
                reduceMotion ? undefined : revealVariants
              }
              className="
                max-w-3xl
                font-serif font-normal
                text-[clamp(2.15rem,8vw,3.5rem)]
                leading-[1.08]
                tracking-tight
                [overflow-wrap:anywhere]
                sm:text-6xl
                xl:text-7xl
              "
            >
              {contactData.title}
            </motion.h2>
          </div>

          <motion.p
            variants={
              reduceMotion ? undefined : revealVariants
            }
            className="
              w-full max-w-sm
              text-[13px] leading-7
              text-white/55
              md:pb-2
              md:text-sm
            "
          >
            {contactData.description}
          </motion.p>
        </motion.div>

        {/* Composición principal */}
        <div
          className="
            grid w-full min-w-0
            grid-cols-[minmax(0,1fr)]
            gap-0
            lg:grid-cols-2
          "
        >
          {/* ================================== */}
          {/* LADO IZQUIERDO - FOTOGRAFÍA */}
          {/* ================================== */}
          <motion.div
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.12,
            }}
            className="
              relative isolate
              flex min-h-[440px]
              w-full min-w-0
              flex-col justify-end
              overflow-hidden
              bg-[#181818]

              sm:min-h-[500px]
              lg:min-h-[710px]
            "
          >
            <motion.img
              src={contactBg}
              alt="Arquitectura contemporánea de ARKÉ"
              loading="lazy"
              variants={
                reduceMotion ? undefined : photoVariants
              }
              className="
                absolute inset-0 -z-20
                h-full w-full
                object-cover
                object-center
              "
            />

            {/* Gradientes */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute inset-0 -z-10
                bg-gradient-to-t
                from-[#090909]/95
                via-[#090909]/45
                to-black/15
              "
            />

            <div
              className="
                pointer-events-none
                absolute inset-0 -z-10
                bg-gradient-to-r
                from-black/20 to-transparent
              "
            />

            {/* Marca decorativa */}
            <span
              aria-hidden="true"
              className="
                absolute left-6 top-7
                font-serif
                text-[11px]
                tracking-[0.35em]
                text-white/75

                md:left-10 md:top-10
              "
            >
              ARKÉ / ESTUDIO
            </span>

            {/* Contenido sobre foto */}
            <motion.div
              variants={
                reduceMotion ? undefined : containerVariants
              }
              initial={reduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.15,
              }}
              className="
                relative z-10
                w-full min-w-0
                px-6 pb-8 pt-28

                sm:px-10 sm:pb-10
                xl:px-14 xl:pb-14
              "
            >
              <motion.p
                variants={
                  reduceMotion ? undefined : revealVariants
                }
                className="
                  mb-4 text-[10px]
                  font-medium uppercase
                  tracking-[0.23em]
                  text-[#e4cdb9]
                "
              >
                Hablemos de tu visión
              </motion.p>

              <motion.h3
                variants={
                  reduceMotion ? undefined : revealVariants
                }
                className="
                  mb-8 max-w-lg
                  font-serif
                  text-[clamp(1.8rem,6vw,2.8rem)]
                  leading-[1.15]
                  text-white
                  sm:mb-10
                  xl:text-5xl
                "
              >
                Todo gran espacio
                <br />
                comienza con una
                <br />
                <span className="italic text-[#e4cdb9]">
                  conversación.
                </span>
              </motion.h3>

              {/* Información de contacto */}
              <motion.div
                variants={
                  reduceMotion ? undefined : containerVariants
                }
                className="
                  grid w-full min-w-0
                  grid-cols-1
                  gap-5
                  border-t border-white/25
                  pt-7

                  sm:grid-cols-2
                  sm:gap-x-5
                  sm:gap-y-7

                  lg:grid-cols-1
                  xl:grid-cols-2
                "
              >
                {contactData.info.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={
                      reduceMotion
                        ? undefined
                        : revealVariants
                    }
                    className="min-w-0"
                  >
                    <ContactInfo item={item} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* ================================== */}
          {/* LADO DERECHO - FORMULARIO */}
          {/* ================================== */}
          <motion.div
            initial={
              reduceMotion
                ? false
                : { opacity: 0, y: 30 }
            }
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.1,
            }}
            transition={{
              duration: reduceMotion ? 0 : 0.85,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              flex w-full min-w-0
              items-center
              border border-white/10
              bg-[#141414]

              px-5 py-10
              min-[390px]:px-6

              sm:px-10
              sm:py-12

              lg:px-10
              lg:py-14

              xl:px-14
              xl:py-16
            "
          >
            <div className="w-full min-w-0">
              {/* Cabecera del formulario */}
              <div
                className="
                  mb-9 flex
                  items-start
                  justify-between
                  gap-4
                  border-b border-white/10
                  pb-7
                "
              >
                <div className="min-w-0">
                  <p
                    className="
                      mb-3 text-[10px]
                      font-medium uppercase
                      tracking-[0.2em]
                      text-[#e4cdb9]
                    "
                  >
                    Cuéntanos tu idea
                  </p>

                  <h3
                    className="
                      font-serif
                      text-[clamp(1.65rem,5vw,2.25rem)]
                      leading-tight
                      text-white
                    "
                  >
                    Inicia tu proyecto.
                  </h3>

                  <p
                    className="
                      mt-3 max-w-sm
                      text-[13px] leading-6
                      text-white/45
                    "
                  >
                    Comparte algunos detalles y preparemos
                    juntos el primer paso.
                  </p>
                </div>

                <div
                  aria-hidden="true"
                  className="
                    hidden h-12 w-12
                    shrink-0
                    items-center justify-center
                    rounded-full
                    border border-[#e4cdb9]/30
                    text-[#e4cdb9]
                    sm:flex
                  "
                >
                  <ArrowUpRight size={22} />
                </div>
              </div>

              {/* Formulario */}
              <form
                onSubmit={handleSubmit}
                className="
                  flex w-full min-w-0
                  flex-col gap-7
                "
              >
                {/* Fila 1 */}
                <div
                  className="
                    grid grid-cols-1
                    gap-7
                    sm:grid-cols-2
                    lg:grid-cols-1
                    xl:grid-cols-2
                  "
                >
                  <div className="flex min-w-0 flex-col gap-2">
                    <label
                      htmlFor="contact-name"
                      className={labelClass}
                    >
                      Nombre completo *
                    </label>

                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      maxLength={100}
                      placeholder="Tu nombre"
                      className={fieldClass}
                    />
                  </div>

                  <div className="flex min-w-0 flex-col gap-2">
                    <label
                      htmlFor="contact-email"
                      className={labelClass}
                    >
                      Correo electrónico *
                    </label>

                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      maxLength={150}
                      placeholder="tu@correo.com"
                      className={fieldClass}
                    />
                  </div>
                </div>

                {/* Fila 2 */}
                <div
                  className="
                    grid grid-cols-1
                    gap-7
                    sm:grid-cols-2
                    lg:grid-cols-1
                    xl:grid-cols-2
                  "
                >
                  <div className="flex min-w-0 flex-col gap-2">
                    <label
                      htmlFor="contact-phone"
                      className={labelClass}
                    >
                      Teléfono
                    </label>

                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      maxLength={30}
                      placeholder="+56 9..."
                      className={fieldClass}
                    />
                  </div>

                  <div className="flex min-w-0 flex-col gap-2">
                    <label
                      htmlFor="contact-type"
                      className={labelClass}
                    >
                      Tipo de proyecto *
                    </label>

                    <select
                      id="contact-type"
                      name="type"
                      required
                      defaultValue=""
                      className={`
                        ${fieldClass}
                        [&>option]:bg-[#141414]
                      `}
                    >
                      <option value="" disabled>
                        Selecciona una opción
                      </option>
                      <option value="Residencial">
                        Residencial
                      </option>
                      <option value="Comercial">
                        Comercial
                      </option>
                      <option value="Interiorismo">
                        Interiorismo
                      </option>
                      <option value="Otro">
                        Otro
                      </option>
                    </select>
                  </div>
                </div>

                {/* Descripción */}
                <div className="flex min-w-0 flex-col gap-2">
                  <label
                    htmlFor="contact-message"
                    className={labelClass}
                  >
                    Cuéntanos sobre tu proyecto *
                  </label>

                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    minLength={10}
                    maxLength={3000}
                    rows={5}
                    placeholder="Háblanos de tu idea, ubicación, necesidades o cualquier detalle importante..."
                    className={`
                      ${fieldClass}
                      resize-y
                      leading-relaxed
                    `}
                  />
                </div>

                {/* Enviar */}
                <button
                  type="submit"
                  className="
                    group mt-2
                    flex min-h-[54px]
                    w-full min-w-0
                    items-center justify-between
                    gap-3
                    rounded-full

                    bg-[#e4cdb9]
                    px-6 py-3.5
                    text-sm font-semibold
                    text-[#111111]

                    transition-[background-color,transform]
                    duration-300
                    hover:bg-white
                    hover:scale-[1.01]
                    active:scale-[0.99]

                    focus-visible:outline-2
                    focus-visible:outline-offset-4
                    focus-visible:outline-[#e4cdb9]

                    motion-reduce:transition-none
                  "
                >
                  <span>Preparar solicitud</span>

                  <span
                    aria-hidden="true"
                    className="
                      flex h-8 w-8
                      items-center justify-center
                      rounded-full
                      bg-black/10
                    "
                  >
                    <ArrowRight
                      size={18}
                      className="
                        transition-transform duration-300
                        group-hover:translate-x-1
                        motion-reduce:transition-none
                      "
                    />
                  </span>
                </button>

                {/* Aviso */}
                <div
                  className="
                    flex items-start gap-2.5
                    text-[11px] leading-5
                    text-white/40
                  "
                >
                  <Check
                    size={15}
                    aria-hidden="true"
                    className="
                      mt-0.5 shrink-0
                      text-[#e4cdb9]/70
                    "
                  />

                  <p>
                    Se abrirá tu aplicación de correo para
                    revisar y enviar la solicitud.
                    No se enviará automáticamente.
                  </p>
                </div>

                {notice && (
                  <p
                    role="status"
                    aria-live="polite"
                    className="
                      border-l-2 border-[#e4cdb9]
                      pl-3 text-[12px]
                      leading-6 text-[#e4cdb9]
                    "
                  >
                    {notice}
                  </p>
                )}
              </form>
            </div>
          </motion.div>
        </div>

        {/* Pie editorial */}
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
            duration: reduceMotion ? 0 : 0.75,
          }}
          className="
            mt-8 flex
            flex-col gap-3
            border-t border-white/10
            pt-6

            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <p
            className="
              text-[10px] uppercase
              tracking-[0.18em]
              text-white/35
            "
          >
            ARKÉ — Arquitectura que perdura
          </p>

          <p
            className="
              text-[11px]
              text-white/35
            "
          >
            Cada proyecto comienza con una idea.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
