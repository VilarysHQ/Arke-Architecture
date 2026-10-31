import { ArrowRight } from "lucide-react"
import { servicesData } from "../data/servicesData"

function Services() {
  return (
    <section className="w-full bg-[#0c0c0c] py-20 text-white">
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12 lg:px-20">
        
        {/* Header Section */}
        <div className="mb-10 flex items-end justify-between border-b border-white/10 pb-4">
          <h2 className="font-serif text-4xl md:text-5xl">Servicios</h2>
          
          <a 
            href="/" 
            className="hidden items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-white md:flex"
          >
            Conoce todos nuestros servicios
            <ArrowRight size={16} />
          </a>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {servicesData.map((service) => {
            // Asignamos el ícono a una variable en mayúscula para renderizarlo como componente
            const Icon = service.icon

            return (
              <div 
                key={service.id} 
                className="flex flex-col gap-5 rounded-sm border border-white/10 bg-[#151515] p-8 transition-colors hover:border-[#e4cdb9]/50"
              >
                
                {/* Icon */}
                <div className="text-[#e4cdb9]">
                  <Icon size={32} strokeWidth={1.2} />
                </div>

                {/* Title */}
                <h3 className="text-base font-medium tracking-wide text-white">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed text-gray-400">
                  {service.description}
                </p>

              </div>
            )
          })}
        </div>

        {/* Mobile "View All" Button (visible only on small screens) */}
        <div className="mt-8 flex justify-center md:hidden">
          <a 
            href="/" 
            className="flex items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
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