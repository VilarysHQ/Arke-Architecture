import { useState, useEffect } from "react"
import { useReducedMotion } from "motion/react"
import { heroSlides } from "../../data/heroSlides"

const AUTOPLAY_DELAY = 5000

export function useHeroSlider(containerRef) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isTabVisible, setIsTabVisible] = useState(() => !document.hidden)

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

  // 1. Precargar imágenes
  useEffect(() => {
    heroSlides.forEach(({ image }) => {
      const img = new Image()
      img.src = image
    })
  }, [])

  // 2. Control de visibilidad de pestaña (evita que siga corriendo en background)
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabVisible(!document.hidden)
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [])

  // 3. Detectar visibilidad del contenedor (Intersection Observer)
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

  // 4. Reproducción automática
  useEffect(() => {
    if (!canAutoplay) return

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % totalSlides)
    }, AUTOPLAY_DELAY)

    return () => window.clearInterval(timer)
  }, [canAutoplay, activeIndex, totalSlides])

  const changeSlide = (direction) => {
    if (totalSlides <= 1) return
    setActiveIndex((current) => (current + direction + totalSlides) % totalSlides)
  }

  const userPaused = isPaused || motionDisabled

  return {
    activeIndex,
    activeSlide,
    totalSlides,
    motionDisabled,
    userPaused,
    setIsPaused,
    setIsHovered,
    setIsFocused,
    changeSlide
  }
}