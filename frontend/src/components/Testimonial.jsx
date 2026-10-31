import { testimonialData } from "../data/testimonialData"

import testimonialImage from "../assets/Testimonial/testimonialImage.png" 

function Testimonial() {
  return (
    <section className="w-full bg-[#0c0c0c] text-white">
      
      {/* Grid Container: 1 columna en móvil, 2 columnas (50/50) en escritorio */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        
        {/* Left Column: Image */}
        <div className="h-[50vh] w-full lg:h-auto">
          <img
            src={testimonialImage}
            alt="Interior de Casa Mirador"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right Column: Quote & Stats */}
        <div className="flex flex-col justify-center px-8 py-16 md:px-16 lg:px-20 lg:py-24">
          
          {/* Quote */}
          <blockquote className="relative">
            <p className="font-serif text-2xl leading-snug text-white md:text-3xl">
              “{testimonialData.quote}”
            </p>
            
            {/* Author */}
            <footer className="mt-6 flex items-center gap-3 text-xs uppercase tracking-widest text-gray-400">
              <span className="h-[1px] w-8 bg-gray-600"></span>
              <span>{testimonialData.author}</span>
              <span className="text-gray-600">|</span>
              <span>{testimonialData.project}</span>
            </footer>
          </blockquote>

          {/* Stats Grid */}
          <div className="mt-16 grid grid-cols-3 border-t border-white/10 pt-8">
            {testimonialData.stats.map((stat, index) => (
              <div 
                key={index} 
                className={`flex flex-col ${
                  index !== 0 ? "border-l border-white/10 pl-6" : ""
                }`}
              >
                <span className="font-serif text-4xl text-white md:text-5xl">
                  {stat.value}
                </span>
                <span className="mt-2 text-[10px] uppercase tracking-widest text-gray-500">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

export default Testimonial