import { MapPin, Mail, Phone } from "lucide-react"
import { footerData } from "../data/footerData"
import { InstagramIcon, LinkedinIcon, YoutubeIcon } from "../components/SocialIcons/SocialIcons"

function Footer() {
  const renderContactIcon = (type) => {
    switch (type) {
      case "location": return <MapPin size={18} strokeWidth={1.5} className="text-[#e4cdb9]" />
      case "email": return <Mail size={18} strokeWidth={1.5} className="text-[#e4cdb9]" />
      case "phone": return <Phone size={18} strokeWidth={1.5} className="text-[#e4cdb9]" />
      default: return null
    }
  }

  const renderSocialIcon = (type) => {
    switch (type) {
      case "instagram": return <InstagramIcon size={18} />
      case "linkedin": return <LinkedinIcon size={18} />
      case "youtube": return <YoutubeIcon size={18} />
      default: return null
    }
  }

  return (
    <footer className="w-full border-t border-white/5 bg-[#0c0c0c] text-white">
      <div className="mx-auto w-full max-w-[1400px] px-6 py-16 md:px-12 lg:px-20 lg:py-20">
        
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          
          <div className="flex flex-col gap-4 lg:col-span-4">
            <h2 className="font-serif text-3xl tracking-[0.25em] text-white">
              {footerData.brand.name}
            </h2>
            <p className="max-w-xs text-sm leading-relaxed text-gray-400">
              {footerData.brand.tagline}
            </p>
          </div>

          {footerData.links.map((column, index) => (
            <div key={index} className="flex flex-col gap-5 lg:col-span-2">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                {column.title}
              </h3>
              <ul className="flex flex-col gap-4">
                {column.items.map((link, i) => (
                  <li key={i}>
                    <a 
                      href={link.href} 
                      className="text-sm text-gray-400 transition-colors hover:text-[#e4cdb9]"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="flex flex-col gap-5 lg:col-span-3">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
              Contacto
            </h3>
            <ul className="flex flex-col gap-4">
              {footerData.contact.map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-sm text-gray-400">
                  {renderContactIcon(item.type)}
                  {item.href ? (
                    <a href={item.href} className="transition-colors hover:text-white">
                      {item.text}
                    </a>
                  ) : (
                    <span>{item.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-5 lg:col-span-1">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 lg:text-right">
              Redes
            </h3>
            <div className="flex items-start justify-start gap-3 lg:justify-end">
              {footerData.socials.map((social, index) => (
                <a 
                  key={index} 
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visita nuestro ${social.type}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-gray-400 transition-all duration-300 hover:border-[#e4cdb9] hover:bg-[#e4cdb9] hover:text-black"
                >
                  {renderSocialIcon(social.type)}
                </a>
              ))}
            </div>
          </div>

        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row lg:mt-24">
          <p className="text-[11px] uppercase tracking-widest text-gray-500">
            {footerData.legal.copyright}
          </p>
          
          <div className="flex gap-6">
            {footerData.legal.links.map((link, index) => (
              <a 
                key={index} 
                href={link.href}
                className="text-[11px] uppercase tracking-widest text-gray-500 transition-colors hover:text-white"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer