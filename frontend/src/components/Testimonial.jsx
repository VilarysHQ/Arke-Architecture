import { Quote } from "lucide-react"
import { testimonialData } from "../data/testimonialData"
import testimonialImage from "../assets/Testimonial/testimonialImage.png" 

function Testimonial() {
  return (
    <section id="testimonios" className="w-full bg-[#0c0c0c] text-white">
      <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 lg:grid-cols-2">
        
        <div className="group relative h-[45vh] w-full overflow-hidden md:h-[60vh] lg:h-auto">
          <img
            src={testimonialImage}
            alt="Interior de Casa Mirador"
            className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-transparent" />
        </div>

        <div className="flex flex-col justify-center px-6 py-16 md:px-16 md:py-20 lg:px-24 lg:py-32">
          
          <blockquote className="relative">
            <Quote 
              size={64} 
              className="absolute -left-4 -top-10 rotate-180 text-[#e4cdb9]/10 md:-left-8 md:-top-12 md:h-24 md:w-24" 
            />
            
            <p className="relative z-10 font-serif text-2xl leading-snug text-white md:text-3xl lg:text-[2.1rem]">
              “{testimonialData.quote}”
            </p>
            
            <footer className="mt-8 flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-gray-400 md:text-xs">
              <span className="h-[1px] w-8 bg-[#e4cdb9]" />
              <span className="font-medium text-white">{testimonialData.author}</span>
              <span className="text-gray-600">|</span>
              <span className="text-[#e4cdb9]">{testimonialData.project}</span>
            </footer>
          </blockquote>

          <div className="mt-16 grid grid-cols-3 border-t border-white/10 pt-10 md:mt-20">
            {testimonialData.stats.map((stat, index) => (
              <div 
                key={index} 
                className={`flex flex-col ${
                  index !== 0 ? "border-l border-white/10 pl-4 md:pl-8" : ""
                }`}
              >
                <span className="font-serif text-3xl text-white md:text-5xl lg:text-6xl">
                  {stat.value}
                </span>
                <span className="mt-3 text-[9px] uppercase leading-relaxed tracking-widest text-gray-500 md:text-[10px]">
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