import whiteLogo from "../../assets/Navbar/arke-logo-white.svg"
import { MoveRight } from "lucide-react"

function Navbar() {
    return (
        <div className="fixed top-0 left-0 right-0 z-50 flex w-full items-center justify-between px-6 py-7 text-white md:px-12 lg:px-20">
            
            {/* Logo */}
            <a href="/" className="shrink-0 transition-opacity duration-300 hover:opacity-80">
                <img src={whiteLogo} alt="Arke logo" className="h-7 w-auto md:h-8" />
            </a>

            {/* Links */}
            <nav className="hidden items-center gap-8 text-[13px] font-medium tracking-widest text-white/70 md:flex">
                <a href="/" className="transition-colors duration-300 hover:text-white">Inicio</a>
                <a href="/" className="transition-colors duration-300 hover:text-white">Proyectos</a>
                <a href="/" className="transition-colors duration-300 hover:text-white">Servicios</a>
                <a href="/" className="transition-colors duration-300 hover:text-white">Nosotros</a>
                <a href="/" className="transition-colors duration-300 hover:text-white">Contacto</a>
            </nav>

            {/* Button */}
            <button className="group flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-6 py-2 text-[13px] font-medium tracking-wide text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-black md:text-sm">
                Hablemos
                <MoveRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
        </div>
    )
}

export default Navbar