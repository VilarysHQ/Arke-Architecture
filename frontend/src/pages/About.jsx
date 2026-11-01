import aboutImage from "../assets/About/aboutImage.png"
import { aboutContent } from "../data/aboutData"
import { MoveRight } from "lucide-react"

function About() {
  return (
    <section id="nosotros" className="w-full bg-[#0c0c0c] text-white">
      <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 lg:grid-cols-2">
        
        <div className="group relative h-[45vh] w-full overflow-hidden md:h-[60vh] lg:h-auto">
          <img
            src={aboutImage}
            alt="Interior de una casa con un árbol y ventanales"
            className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-transparent" />
        </div>

        <div className="flex flex-col justify-center px-6 py-16 md:px-16 md:py-20 lg:px-24 lg:py-32">
          
          <p className="mb-6 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.25em] text-[#e4cdb9] md:mb-8 md:text-xs">
            <span className="h-[1px] w-8 bg-[#e4cdb9]" />
            {aboutContent.subtitle}
          </p>

          <h2 className="mb-8 max-w-lg font-serif text-4xl font-normal leading-[1.1] text-white md:text-5xl lg:text-6xl">
            {aboutContent.title}
          </h2>

          <div className="mb-12 flex max-w-md flex-col gap-6">
            {aboutContent.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-sm leading-relaxed text-gray-400 md:text-[15px]">
                {paragraph}
              </p>
            ))}
          </div>

          <a 
            href="#contacto" 
            className="group flex w-fit items-center gap-3 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:border-[#e4cdb9] hover:bg-[#e4cdb9] hover:text-black"
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