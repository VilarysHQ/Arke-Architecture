import { MapPin, Mail, Phone, ArrowRight } from "lucide-react"
import { contactData } from "../data/contactData"

// Importamos la imagen de fondo
import contactBg from "../assets/Contact/contactBg.png"

function Contact() {
  // Función para evitar que la página se recargue al enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar los datos
    console.log("Formulario enviado")
  }

  // Función auxiliar para renderizar el ícono correcto
  const renderIcon = (type) => {
    switch (type) {
      case "location": return <MapPin size={20} className="text-[#e4cdb9]" />
      case "email": return <Mail size={20} className="text-[#e4cdb9]" />
      case "phone": return <Phone size={20} className="text-[#e4cdb9]" />
      default: return null
    }
  }

  return (
    <section 
      className="relative w-full bg-cover bg-center bg-no-repeat py-24 text-white"
      style={{ backgroundImage: `url(${contactBg})` }}
    >
      {/* Overlay oscuro para que el texto resalte */}
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 md:px-12 lg:px-20">
        
        {/* Grid Principal: Texto a la izquierda, Formulario a la derecha */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          
          {/* COLUMNA IZQUIERDA: Información */}
          <div className="flex flex-col justify-center">
            <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-[#e4cdb9] uppercase">
              {contactData.subtitle}
            </p>
            
            <h2 className="mb-6 font-serif text-4xl leading-tight text-white md:text-5xl lg:text-6xl">
              {contactData.title}
            </h2>
            
            <p className="mb-16 max-w-md text-sm leading-relaxed text-gray-300 md:text-base">
              {contactData.description}
            </p>

            {/* Info de Contacto (Ubicación, Correo, Teléfono) */}
            <div className="flex flex-col gap-8 md:flex-row md:gap-12">
              {contactData.info.map((item) => (
                <div key={item.id} className="flex flex-col gap-3">
                  {renderIcon(item.type)}
                  <div>
                    <h4 className="text-sm font-medium text-white">{item.title}</h4>
                    {/* Usamos whitespace-pre-line para respetar el salto de línea (\n) de nuestra data */}
                    <p className="mt-1 whitespace-pre-line text-xs leading-relaxed text-gray-400">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* COLUMNA DERECHA: Formulario */}
          <div className="flex items-center">
            {/* Contenedor del formulario con fondo semi-transparente y blur */}
            <div className="w-full rounded-xl border border-white/10 bg-black/40 p-8 backdrop-blur-md md:p-10">
              
              <h3 className="mb-8 font-serif text-2xl text-white">
                Inicia tu proyecto
              </h3>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                
                {/* Fila 1: Nombre y Correo */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] uppercase tracking-widest text-gray-400">Nombre completo</label>
                    <input 
                      type="text" 
                      placeholder="Tu nombre"
                      className="w-full border-b border-white/20 bg-transparent pb-2 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-[#e4cdb9]"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] uppercase tracking-widest text-gray-400">Correo electrónico</label>
                    <input 
                      type="email" 
                      placeholder="tu@correo.com"
                      className="w-full border-b border-white/20 bg-transparent pb-2 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-[#e4cdb9]"
                    />
                  </div>
                </div>

                {/* Fila 2: Teléfono y Tipo de Proyecto */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] uppercase tracking-widest text-gray-400">Teléfono</label>
                    <input 
                      type="tel" 
                      placeholder="+56 9"
                      className="w-full border-b border-white/20 bg-transparent pb-2 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-[#e4cdb9]"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] uppercase tracking-widest text-gray-400">Tipo de proyecto</label>
                    <select className="w-full border-b border-white/20 bg-transparent pb-2 text-sm text-white/70 outline-none transition-colors focus:border-[#e4cdb9] [&>option]:bg-[#0c0c0c]">
                      <option value="">Selecciona una opción</option>
                      <option value="residencial">Residencial</option>
                      <option value="comercial">Comercial</option>
                      <option value="interiorismo">Interiorismo</option>
                    </select>
                  </div>
                </div>

                {/* Fila 3: Mensaje */}
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] uppercase tracking-widest text-gray-400">Cuéntanos sobre tu proyecto</label>
                  <textarea 
                    rows="4"
                    placeholder="Describe tu idea, terreno, o cualquier detalle que nos ayude..."
                    className="w-full resize-none border-b border-white/20 bg-transparent pb-2 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-[#e4cdb9]"
                  ></textarea>
                </div>

                {/* Botón de Enviar */}
                <button 
                  type="submit" 
                  className="mt-4 flex w-full items-center justify-center gap-3 rounded-md bg-[#e4cdb9] py-4 text-sm font-semibold text-black transition-colors hover:bg-white"
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