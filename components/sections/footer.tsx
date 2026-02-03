"use client"

import { motion } from "framer-motion"
import { Heart, Instagram, Facebook, MessageCircle } from "lucide-react"
import Image from "next/image"

const footerLinks = {
  servicios: [
    { label: "Planes Fitness", href: "#planes" },
    { label: "Bike Fit", href: "#planes" },
    { label: "Cardiología", href: "#servicios" },
    { label: "Recuperación", href: "#servicios" },
  ],
  empresa: [
    { label: "Nuestro Equipo", href: "#equipo" },
    { label: "Contacto", href: "#contacto" },
  ],
}

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: MessageCircle, href: "https://wa.me/573155774777", label: "WhatsApp" },
]

export function Footer() {
  const scrollToSection = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <footer className="relative pt-16 pb-8 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#00041c]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00fffd]/50 to-transparent" />

      <div className="container mx-auto relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-1"
          >
            <a href="#" className="inline-block mb-4">
              <Image
                src="/images/cardiofit-logo.png"
                alt="CardioFit Lab"
                width={150}
                height={45}
                className="h-12 w-auto"
              />
            </a>
            <p className="text-[#68d2df] text-sm leading-relaxed mb-4">
              Ingeniería de precisión para el rendimiento humano. Fusionamos cardiología y biomecánica.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={social.label}
                  className="p-2 rounded-lg border border-[#00fffd]/20 hover:border-[#00fffd]/50 hover:bg-[#00fffd]/10 transition-all duration-300"
                >
                  <social.icon className="w-5 h-5 text-[#68d2df] hover:text-[#00fffd]" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Links - Servicios */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-foreground font-semibold mb-4">Servicios</h4>
            <ul className="space-y-3">
              {footerLinks.servicios.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-[#68d2df] hover:text-[#00fffd] transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Links - Empresa */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-foreground font-semibold mb-4">Empresa</h4>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-[#68d2df] hover:text-[#00fffd] transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-foreground font-semibold mb-4">Contacto</h4>
            <ul className="space-y-3 text-sm">
              <li className="text-[#68d2df]">
                Av. Ambalá Carrera 14 #44-63
                <br />
                Local 2, Ibagué
              </li>
              <li>
                <a
                  href="tel:+573155774777"
                  className="text-[#68d2df] hover:text-[#00fffd] transition-colors"
                >
                  315 577 4777
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-8 border-t border-[#00fffd]/10"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#68d2df]">
            <p>© {new Date().getFullYear()} CardioFit Lab. Todos los derechos reservados.</p>
            <p className="flex items-center gap-1">
              Diseñado con <Heart className="w-4 h-4 text-[#00fffd] inline" /> en Ibagué, Colombia
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
