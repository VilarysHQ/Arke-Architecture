import { MapPin, Mail, Phone } from "lucide-react"
import { footerData } from "../data/footerData"
// Importamos nuestros íconos personalizados
import { InstagramIcon, LinkedinIcon, YoutubeIcon } from "../components/SocialIcons/SocialIcons"

function Footer() {
  // Función para renderizar los íconos de contacto (Lucide)
  const renderContactIcon = (type) => {
    switch (type) {
      case "location": return <MapPin size={16} className="text-[#e4cdb9]" />
      case "email": return <Mail size={16} className="text-[#e4cdb9]" />
      case "phone": return <Phone size={16} className="text-[#e4cdb9]" />
      default: return null
    }
  }

  // Función para renderizar los íconos de redes sociales (Nuestros SVGs)
  const renderSocialIcon = (type) => {
    switch (type) {
      case "instagram": return <InstagramIcon size={20} />
      case "linkedin": return <LinkedinIcon size={20} />
      case "youtube": return <YoutubeIcon size={20} />
      default: return null
    }
  }

  return (
    <footer className="w-full bg-[#0c0c0c] text-white">
      <div className="mx-auto w-full max-w-[1400px] px-6 py-16 md:px-12 lg:px-20">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          
          {/* Brand Column (Left) */}
          <div className="flex flex-col gap-3 lg:col-span-4">
            <h2 className="font-serif text-2xl tracking-[0.2em] text-white">
              {footerData.brand.name}
            </h2>
            <p className="text-xs text-gray-400">
              {footerData.brand.tagline}
            </p>
          </div>

          {/* Links Columns */}
          {footerData.links.map((column, index) => (
            <div key={index} className="flex flex-col gap-4 lg:col-span-2">
              <ul className="flex flex-col gap-3">
                {column.items.map((link, i) => (
                  <li key={i}>
                    <a 
                      href={link.href} 
                      className="text-sm text-gray-400 transition-colors hover:text-white"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Info Column */}
          <div className="flex flex-col gap-4 lg:col-span-3 lg:pl-8">
            <ul className="flex flex-col gap-3">
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

          {/* Social Media Icons (Right) */}
          <div className="flex items-start justify-start gap-5 lg:col-span-1 lg:justify-end">
            {footerData.socials.map((social, index) => (
              <a 
                key={index} 
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors hover:text-white"
              >
                {renderSocialIcon(social.type)}
              </a>
            ))}
          </div>

        </div>

        {/* Bottom Bar (Copyright & Legal) */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-xs text-gray-500">
            {footerData.legal.copyright}
          </p>
          
          <div className="flex gap-6">
            {footerData.legal.links.map((link, index) => (
              <a 
                key={index} 
                href={link.href}
                className="text-xs text-gray-500 transition-colors hover:text-white"
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