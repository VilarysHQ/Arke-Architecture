import aboutImage from "../assets/About/aboutImage.png"
import { aboutContent } from "../data/aboutData"
import { MoveRight } from "lucide-react"

function About() {
  return (
    // Section wrapper: full width, no padding so the image touches the left edge.
    // Added id="nosotros" so the Hero button can scroll to this section.
    <section id="nosotros" className="w-full bg-[#0c0c0c] text-white">
      
      {/* Grid container: 1 column on mobile, 2 columns on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        
        {/* Left Column: Image */}
        <div className="h-[50vh] w-full lg:h-auto">
          <img
            src={aboutImage}
            alt="Interior de una casa con un árbol y ventanales"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right Column: Text Content */}
        <div className="flex flex-col justify-center px-8 py-16 md:px-16 lg:px-20 lg:py-24">
          
          {/* Subtitle */}
          <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-[#e4cdb9] uppercase">
            {aboutContent.subtitle}
          </p>

          {/* Main Title */}
          <h2 className="mb-8 max-w-lg font-serif text-4xl leading-tight text-white md:text-5xl">
            {aboutContent.title}
          </h2>

          {/* Paragraphs */}
          <div className="mb-10 flex flex-col gap-6">
            {aboutContent.paragraphs.map((paragraph, index) => (
              <p key={index} className="max-w-md text-sm leading-relaxed text-gray-400 md:text-base">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Button */}
          <a 
            href="#contacto" // Cambié el "/" por "#contacto" para que baje al formulario
            className="group flex w-fit items-center gap-3 text-sm font-medium text-white transition-colors hover:text-[#e4cdb9]"
          >
            {aboutContent.buttonText}
            <MoveRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>

        </div>
      </div>
    </section>
  )
}

export default About