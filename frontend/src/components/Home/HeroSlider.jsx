
import { useEffect, useState } from "react"
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react"
import {
  ArrowLeft,
  ArrowRight,
  Pause,
  Play,
} from "lucide-react"
import { heroSlides } from "../../data/heroSlides"

const AUTOPLAY_DELAY = 5000

const formatNumber = (value) =>
  String(value).padStart(2, "0")

const controlClass = `
  flex h-11 w-11 shrink-0
  items-center justify-center
  rounded-full border border-white/30
  bg-black/25 text-white
  backdrop-blur-md
  transition-colors duration-300
  hover:border-white
  hover:bg-white hover:text-black
  focus-visible:outline-2
  focus-visible:outline-offset-2
  focus-visible:outline-[#e4cdb9]
  disabled:cursor-not-allowed
  disabled:opacity-40
  motion-reduce:transition-none
`

function HeroSlider({ containerRef }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isTabVisible, setIsTabVisible] = useState(
    () => !document.hidden
  )

  const reduceMotion = useReducedMotion()

  const totalSlides = heroSlides.length
  const activeSlide = heroSlides[activeIndex]
  const motionDisabled = Boolean(reduceMotion)

  const canAutoplay =
    totalSlides > 1 &&
    !isPaused &&
    !isHovered &&
    !isFocused &&
    isVisible &&
    isTabVisible &&
    !motionDisabled

  // Precargar imágenes.
  useEffect(() => {
    heroSlides.forEach(({ image }) => {
      const img = new Image()
      img.src = image
    })
  }, [])

  // Control de visibilidad de pestaña.
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabVisible(!document.hidden)
    }

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    )

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      )
    }
  }, [])

  // Detectar visibilidad del Home.
  useEffect(() => {
    const element = containerRef?.current

    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.15 }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [containerRef])

  // Reproducción automática.
  useEffect(() => {
    if (!canAutoplay) return

    const timer = window.setInterval(() => {
      setActiveIndex((current) =>
        (current + 1) % totalSlides
      )
    }, AUTOPLAY_DELAY)

    return () => window.clearInterval(timer)
  }, [canAutoplay, activeIndex, totalSlides])

  const changeSlide = (direction) => {
    if (totalSlides <= 1) return

    setActiveIndex((current) =>
      (current + direction + totalSlides) % totalSlides
    )
  }

  if (!activeSlide) return null

  const userPaused = isPaused || motionDisabled

  return (
    <>
      {/* Imagen de fondo */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0 z-0
          overflow-hidden
        "
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={activeSlide.id}
            initial={{
              opacity: 0,
              scale: motionDisabled ? 1 : 1.025,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: motionDisabled ? 0 : 0.85,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute inset-0"
          >
            <img
              src={activeSlide.image}
              alt=""
              className="
                h-full w-full object-cover
                object-[position:var(--mobile-position)]
                md:object-[position:var(--desktop-position)]
              "
              style={{
                "--mobile-position":
                  activeSlide.mobilePosition || "65% center",
                "--desktop-position":
                  activeSlide.position || "center",
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Oscurecimiento */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0 z-[1]
          bg-gradient-to-t
          from-[#0c0c0c]
          via-black/60
          to-black/25
          md:bg-gradient-to-r
          md:from-black/80
          md:via-black/40
          md:to-transparent
        "
      />

      {/* Controles */}
      <div
        className="
          absolute bottom-5
          left-0 right-0 z-20
          flex w-full min-w-0
          items-center justify-between
          gap-2 px-5
          min-[390px]:px-6
          sm:px-10
          md:bottom-12
          md:px-12
          lg:px-20
        "
      >
        {/* Indicador */}
        <div
          aria-label={`Imagen ${activeIndex + 1} de ${totalSlides}`}
          className="
            flex shrink-0
            items-center gap-2
            text-white
            sm:gap-4
          "
        >
          <span className="text-xs font-semibold tracking-widest">
            {formatNumber(activeIndex + 1)}
          </span>

          <div
            aria-hidden="true"
            className="
              h-[2px] w-9
              overflow-hidden
              bg-white/20
              sm:w-16
            "
          >
            <motion.div
              className="h-full bg-[#e4cdb9]"
              animate={{
                width: `${
                  ((activeIndex + 1) / totalSlides) * 100
                }%`,
              }}
              transition={{
                duration: motionDisabled ? 0 : 0.4,
                ease: "easeOut",
              }}
            />
          </div>

          <span className="text-xs tracking-widest text-white/50">
            {formatNumber(totalSlides)}
          </span>
        </div>

        {/* Navegación */}
        <div
          className="
            flex items-end gap-3
            md:flex-col
            md:gap-4
          "
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocusCapture={() => setIsFocused(true)}
          onBlurCapture={(event) => {
            if (
              !event.currentTarget.contains(
                event.relatedTarget
              )
            ) {
              setIsFocused(false)
            }
          }}
        >
          {/* Información desktop */}
          <div
            className="hidden text-right md:block"
            aria-live="off"
          >
            <p
              className="
                text-[11px] font-bold
                uppercase tracking-widest
                text-white
              "
            >
              {activeSlide.title}
            </p>

            <p
              className="
                mt-1 text-[10px]
                uppercase tracking-wider
                text-gray-300
              "
            >
              {activeSlide.location}
            </p>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Pausa */}
            <button
              type="button"
              onClick={() =>
                setIsPaused((current) => !current)
              }
              disabled={motionDisabled || totalSlides <= 1}
              aria-label={
                motionDisabled
                  ? "Autoplay desactivado por accesibilidad"
                  : isPaused
                    ? "Reanudar presentación automática"
                    : "Pausar presentación automática"
              }
              aria-pressed={userPaused}
              className={controlClass}
            >
              {userPaused ? (
                <Play size={17} />
              ) : (
                <Pause size={17} />
              )}
            </button>

            {/* Anterior */}
            <button
              type="button"
              onClick={() => changeSlide(-1)}
              disabled={totalSlides <= 1}
              aria-label="Imagen anterior"
              className={controlClass}
            >
              <ArrowLeft size={18} />
            </button>

            {/* Siguiente */}
            <button
              type="button"
              onClick={() => changeSlide(1)}
              disabled={totalSlides <= 1}
              aria-label="Imagen siguiente"
              className={controlClass}
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default HeroSlider
