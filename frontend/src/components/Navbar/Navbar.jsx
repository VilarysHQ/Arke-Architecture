
import { useEffect, useState } from "react"
import { MoveRight, Menu, X } from "lucide-react"
import whiteLogo from "../../assets/Navbar/arke-logo-white.svg"

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
]

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 72)
    }

    handleScroll()

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Cerrar menú móvil con Escape
  useEffect(() => {
    if (!isMenuOpen) return

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isMenuOpen])

  const showDarkGlass = isScrolled || isMenuOpen

  return (
    <header
      className={`
        fixed inset-x-0 top-0 z-50
        w-full text-white

        border-none

        transition-[background-color,backdrop-filter,box-shadow]
        duration-500 ease-in-out
        motion-reduce:transition-none

        ${
          showDarkGlass
            ? `
              bg-[#101010]/80
              backdrop-blur-2xl
              shadow-[0_12px_40px_rgba(0,0,0,0.12)]
            `
            : `
              bg-black/20
              backdrop-blur-md
            `
        }
      `}
    >
      {/* Contenedor principal */}
      <div
        className="
          mx-auto flex h-[76px] w-full
          max-w-[1600px]
          items-center justify-between
          px-6 md:px-12 lg:px-20
        "
      >
        {/* Logo */}
        <a
          href="#inicio"
          aria-label="ARKÉ - Ir al inicio"
          onClick={() => setIsMenuOpen(false)}
          className="
            relative z-10 shrink-0
            transition-opacity duration-300
            hover:opacity-80
          "
        >
          <img
            src={whiteLogo}
            alt="ARKÉ"
            className="h-7 w-auto md:h-8"
          />
        </a>

        {/* Navegación desktop */}
        <nav
          aria-label="Navegación principal"
          className="
            hidden items-center gap-8
            text-[13px] font-medium
            tracking-widest text-white/75
            md:flex
          "
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="
                relative
                transition-colors duration-300
                hover:text-white

                after:absolute
                after:bottom-[-6px]
                after:left-0
                after:h-px
                after:w-0
                after:bg-[#EAD6C0]
                after:transition-all
                after:duration-300
                hover:after:w-full
              "
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA desktop */}
        <a
          href="#contacto"
          className="
            group hidden items-center gap-2
            rounded-full
            border border-white/30
            bg-white/10
            px-6 py-2
            text-[13px] font-medium
            tracking-wide text-white

            backdrop-blur-md
            transition-all duration-300

            hover:border-[#EAD6C0]
            hover:bg-[#EAD6C0]
            hover:text-[#111111]

            md:flex md:text-sm
          "
        >
          Hablemos

          <MoveRight
            size={16}
            className="
              transition-transform duration-300
              group-hover:translate-x-1
            "
          />
        </a>

        {/* Botón menú móvil */}
        <button
          type="button"
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isMenuOpen}
          aria-controls="arke-mobile-menu"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="
            relative z-10
            flex h-10 w-10
            items-center justify-center
            rounded-full
            border border-white/25
            bg-white/10
            backdrop-blur-md
            text-white
            transition-colors duration-300
            hover:bg-white/20
            md:hidden
          "
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Navegación móvil */}
      {isMenuOpen && (
        <nav
          id="arke-mobile-menu"
          aria-label="Navegación móvil"
          className="
            border-t border-white/10
            bg-[#101010]/95
            px-6 pb-8 pt-5
            backdrop-blur-2xl
            md:hidden
          "
        >
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="
                  rounded-md px-3 py-3
                  text-sm tracking-wide
                  text-white/75
                  transition-colors duration-300
                  hover:bg-white/5
                  hover:text-white
                "
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA móvil */}
          <a
            href="#contacto"
            onClick={() => setIsMenuOpen(false)}
            className="
              mt-6 flex items-center
              justify-center gap-2
              rounded-full
              bg-[#EAD6C0]
              px-6 py-3
              text-sm font-medium
              text-[#111111]
              transition-colors duration-300
              hover:bg-white
            "
          >
            Hablemos
            <MoveRight size={16} />
          </a>
        </nav>
      )}
    </header>
  )
}

export default Navbar
