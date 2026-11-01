import { MapPin, Mail, Phone, ArrowRight } from "lucide-react"
import { contactData } from "../data/contactData"
import contactBg from "../assets/Contact/contactBg.png"

function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Formulario enviado")
  }

  const renderIcon = (type) => {
    switch (type) {
      case "location": return <MapPin size={22} strokeWidth={1.5} className="text-[#e4cdb9]" />
      case "email": return <Mail size={22} strokeWidth={1.5} className="text-[#e4cdb9]" />
      case "phone": return <Phone size={22} strokeWidth={1.5} className="text-[#e4cdb9]" />
      default: return null
    }
  }

  return (
    <section 
      id="contacto"
      className="relative w-full bg-cover bg-center bg-no-repeat py-24 text-white md:py-32"
      style={{ backgroundImage: `url(${contactBg})` }}
    >
      <div className="absolute inset-0 bg-[#0c0c0c]/85 backdrop-blur-sm" />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 md:px-12 lg:px-20">
        
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          
          <div className="flex flex-col justify-center">
            <p className="mb-6 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.25em] text-[#e4cdb9] md:mb-8 md:text-[11px]">
              <span className="h-[1px] w-8 bg-[#e4cdb9]" />
              {contactData.subtitle}
            </p>
            
            <h2 className="mb-6 font-serif text-4xl font-normal leading-[1.1] text-white md:text-5xl lg:text-6xl">
              {contactData.title}
            </h2>
            
            <p className="mb-14 max-w-md text-sm leading-relaxed text-gray-300 md:mb-16 md:text-base">
              {contactData.description}
            </p>

            <div className="flex flex-col gap-10 md:flex-row md:gap-12">
              {contactData.info.map((item) => (
                <div key={item.id} className="flex flex-col gap-3">
                  {renderIcon(item.type)}
                  <div>
                    <h4 className="text-sm font-medium text-white">{item.title}</h4>
                    <p className="mt-1 whitespace-pre-line text-[13px] leading-relaxed text-gray-400">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-full rounded-2xl border border-white/10 bg-[#0c0c0c]/60 p-6 backdrop-blur-xl md:p-10">
              
              <h3 className="mb-8 font-serif text-2xl text-white md:text-3xl">
                Inicia tu proyecto
              </h3>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-400">Nombre completo</label>
                    <input 
                      type="text" 
                      placeholder="Tu nombre"
                      className="w-full border-b border-white/20 bg-transparent pb-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-[#e4cdb9]"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-400">Correo electrónico</label>
                    <input 
                      type="email" 
                      placeholder="tu@correo.com"
                      className="w-full border-b border-white/20 bg-transparent pb-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-[#e4cdb9]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-400">Teléfono</label>
                    <input 
                      type="tel" 
                      placeholder="+56 9"
                      className="w-full border-b border-white/20 bg-transparent pb-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-[#e4cdb9]"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-400">Tipo de proyecto</label>
                    <select className="w-full border-b border-white/20 bg-transparent pb-3 text-sm text-white/70 outline-none transition-colors focus:border-[#e4cdb9] [&>option]:bg-[#0c0c0c]">
                      <option value="">Selecciona una opción</option>
                      <option value="residencial">Residencial</option>
                      <option value="comercial">Comercial</option>
                      <option value="interiorismo">Interiorismo</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-widest text-gray-400">Cuéntanos sobre tu proyecto</label>
                  <textarea 
                    rows="4"
                    placeholder="Describe tu idea, terreno, o cualquier detalle que nos ayude..."
                    className="w-full resize-none border-b border-white/20 bg-transparent pb-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-[#e4cdb9]"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="mt-4 flex w-full items-center justify-center gap-3 rounded-full bg-[#e4cdb9] py-4 text-sm font-semibold text-black transition-all duration-300 hover:scale-[1.02] hover:bg-white"
                >
                  Enviar solicitud
                  <ArrowRight size={18} />
                </button>

                <p className="text-center text-[10px] text-gray-500">
                  Al enviar aceptas nuestra política de privacidad.
                </p>

              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Contact