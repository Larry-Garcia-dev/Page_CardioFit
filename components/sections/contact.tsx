"use client"

import { motion, AnimatePresence } from "framer-motion"
import { MapPin, Phone, Clock, Calendar, X } from "lucide-react"
import { ChatWidget } from "@/components/chat-widget"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState, useEffect } from "react"
import { QrCode } from "lucide-react" // Declare QrCode variable

const contactInfo = [
  {
    icon: MapPin,
    title: "Ubicación",
    content: "Av. Ambalá Carrera 14 #44-63 Local 2, Ibagué",
  },
  {
    icon: Phone,
    title: "Teléfono",
    content: "315 577 4777",
    href: "tel:+573155774777",
  },
  {
    icon: Clock,
    title: "Horario",
    content: "Lun - Sáb: 6:00 AM - 8:00 PM",
  },
]

const countryCodes = [
  { code: "+57", country: "Colombia", flag: "🇨🇴" },
  { code: "+1", country: "Estados Unidos", flag: "🇺🇸" },
  { code: "+52", country: "México", flag: "🇲🇽" },
  { code: "+34", country: "España", flag: "🇪🇸" },
  { code: "+54", country: "Argentina", flag: "🇦🇷" },
  { code: "+56", country: "Chile", flag: "🇨🇱" },
  { code: "+51", country: "Perú", flag: "🇵🇪" },
  { code: "+593", country: "Ecuador", flag: "🇪🇨" },
  { code: "+58", country: "Venezuela", flag: "🇻🇪" },
  { code: "+507", country: "Panamá", flag: "🇵🇦" },
]

export function ContactSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [countryCode, setCountryCode] = useState("+57")
  const [phoneNumber, setPhoneNumber] = useState("")

  // Preload the URL when phone number changes
  useEffect(() => {
    if (phoneNumber.length >= 10) {
      const fullPhone = `${countryCode}${phoneNumber}`.replace(/\+/g, "")
      const link = document.createElement("link")
      link.rel = "prefetch"
      link.href = `https://admin-cardiofit.online/${fullPhone}`
      document.head.appendChild(link)
      
      return () => {
        document.head.removeChild(link)
      }
    }
  }, [phoneNumber, countryCode])

  const handleSchedule = () => {
    if (phoneNumber.length >= 7) {
      const fullPhone = `${countryCode}${phoneNumber}`.replace(/\+/g, "")
      window.open(`https://admin-cardiofit.online/${fullPhone}`, "_blank")
      setIsModalOpen(false)
      setPhoneNumber("")
    }
  }

  return (
    <>
      <section id="contacto" className="py-24 px-4 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#00041c] via-[#001030] to-[#00041c]" />
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00fffd]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-[#00fffd] text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">
              Contacto
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
              Comienza tu Transformación
            </h2>
            <p className="text-[#68d2df] text-lg max-w-2xl mx-auto">
              Agenda tu diagnóstico inicial y descubre tu verdadero potencial
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Schedule Button Card + Chat */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Agendar Card */}
              <div className="glass rounded-2xl p-8 neon-border flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 rounded-full bg-[#00fffd]/10 flex items-center justify-center mb-6 neon-glow">
                  <Calendar className="w-10 h-10 text-[#00fffd]" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  ¿Listo para comenzar?
                </h3>
                <p className="text-[#68d2df] mb-8 max-w-sm">
                  Agenda tu cita ahora y da el primer paso hacia tu mejor versión
                </p>
                <Button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-[#00fffd] text-[#00041c] hover:bg-[#68d2df] font-bold py-6 px-12 rounded-xl neon-glow-strong transition-all duration-300 text-lg hover:scale-105"
                >
                  Agendar Cita
                </Button>
              </div>

              {/* Chat Widget */}
              <ChatWidget />
            </motion.div>

            {/* Contact Info & Map */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Contact Cards */}
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="glass rounded-xl p-6 neon-border hover:border-[#00fffd]/50 transition-all duration-300 group"
                >
                  {info.href ? (
                    <a href={info.href} className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-[#00fffd]/10 group-hover:bg-[#00fffd]/20 transition-colors">
                        <info.icon className="w-6 h-6 text-[#00fffd]" />
                      </div>
                      <div>
                        <p className="text-[#68d2df] text-sm">{info.title}</p>
                        <p className="text-foreground font-medium">{info.content}</p>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-[#00fffd]/10 group-hover:bg-[#00fffd]/20 transition-colors">
                        <info.icon className="w-6 h-6 text-[#00fffd]" />
                      </div>
                      <div>
                        <p className="text-[#68d2df] text-sm">{info.title}</p>
                        <p className="text-foreground font-medium">{info.content}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Map */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="glass rounded-xl overflow-hidden neon-border h-[400px]"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3977.8074791695403!2d-75.21011092528816!3d4.446894143806122!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e38c54d6ba3d76b%3A0xa03e31d369c55ca6!2sCardioFit%20Lab!5e0!3m2!1ses!2sco!4v1770090800334!5m2!1ses!2sco"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación CardioFit Lab"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Phone Number Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#00041c]/90 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative glass-strong rounded-2xl p-8 max-w-md w-full neon-border neon-glow"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-[#00fffd]/10 transition-colors"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5 text-[#68d2df]" />
              </button>

              {/* Modal Content */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-[#00fffd]/10 flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-[#00fffd]" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Ingresa tu Número
                </h3>
                <p className="text-[#68d2df] text-sm">
                  Te contactaremos para confirmar tu cita
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="country-code" className="text-foreground">
                    Indicativo de País
                  </Label>
                  <Select value={countryCode} onValueChange={setCountryCode}>
                    <SelectTrigger className="bg-[#00041c]/50 border-[#00fffd]/20 focus:border-[#00fffd] text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#001030] border-[#00fffd]/20">
                      {countryCodes.map((country) => (
                        <SelectItem
                          key={country.code}
                          value={country.code}
                          className="text-foreground focus:bg-[#00fffd]/20"
                        >
                          <span className="flex items-center gap-2">
                            <span>{country.flag}</span>
                            <span>{country.country}</span>
                            <span className="text-[#68d2df]">{country.code}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone-number" className="text-foreground">
                    Número de Teléfono
                  </Label>
                  <Input
                    id="phone-number"
                    type="tel"
                    placeholder="300 123 4567"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                    className="bg-[#00041c]/50 border-[#00fffd]/20 focus:border-[#00fffd] text-foreground placeholder:text-foreground/50 text-lg"
                  />
                </div>

                <Button
                  onClick={handleSchedule}
                  disabled={phoneNumber.length < 7}
                  className="w-full bg-[#00fffd] text-[#00041c] hover:bg-[#68d2df] font-bold py-6 rounded-xl neon-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continuar
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
