import { ArrowRight } from "lucide-react"
import { servicesData } from "../data/servicesData"

function Services() {
  return (
    <section id="servicios" className="w-full bg-[#0c0c0c] py-20 text-white md:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12 lg:px-20">
        
        <div className="mb-12 flex flex-col gap-6 border-b border-white/10 pb-8 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.25em] text-[#e4cdb9] md:text-[11px]">
              <span className="h-[1px] w-8 bg-[#e4cdb9]" />
              Lo que hacemos
            </p>
            <h2 className="font-serif text-4xl font-normal leading-[1.1] md:text-5xl lg:text-6xl">
              Servicios
            </h2>
          </div>
          
          <a 
            href="#contacto" 
            className="group hidden items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-[#e4cdb9] md:flex"
          >
            Conoce todos nuestros servicios
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {servicesData.map((service) => {
            const Icon = service.icon

            return (
              <div 
                key={service.id} 
                className="group flex flex-col gap-6 rounded-xl border border-white/5 bg-[#111111] p-8 transition-all duration-500 hover:-translate-y-1 hover:border-[#e4cdb9]/30 hover:bg-[#161616] hover:shadow-2xl hover:shadow-[#e4cdb9]/5"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e4cdb9]/10 text-[#e4cdb9] transition-transform duration-500 group-hover:scale-110">
                  <Icon size={28} strokeWidth={1.5} />
                </div>

                <div>
                  <h3 className="mb-3 font-serif text-xl text-white">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-400">
                    {service.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-10 flex justify-center md:hidden">
          <a 
            href="#contacto" 
            className="flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-4 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-[#e4cdb9] hover:text-black"
          >
            Conoce todos nuestros servicios
            <ArrowRight size={16} />
          </a>
        </div>

      </div>
    </section>
  )
}

export default Services