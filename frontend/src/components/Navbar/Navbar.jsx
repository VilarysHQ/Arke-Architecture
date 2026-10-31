import whiteLogo from "../../assets/Navbar/arke-logo-white.svg"
import { MoveRight } from "lucide-react"

function Navbar() {
    return (
        <div className="flex w-full items-center justify-between bg-gray-500 px-20 py-3 text-white">
            {/* Logo */}
            <a href="/">
                <img src={whiteLogo} alt="Arke logo" className="h-10 w-auto" />
            </a>

            {/* Links */}
            <nav className="flex gap-8">
                <a href="/" className="hover:opacity-80">Home</a>
                <a href="/" className="hover:opacity-80">Projects</a>
                <a href="/" className="hover:opacity-80">Services</a>
                <a href="/" className="hover:opacity-80">About Us</a>
                <a href="/" className="hover:opacity-80">Contact</a>
            </nav>

            {/* Button */}
            <button className="flex items-center gap-2 rounded-full bg-[#e4cdb9] px-6 py-2 text-black hover:opacity-90">
                Let's Talk
                <MoveRight size={18} />
            </button>
        </div>
    )
}

export default Navbar