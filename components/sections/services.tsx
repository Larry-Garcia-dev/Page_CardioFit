"use client"

import { motion } from "framer-motion"
import { Activity, Heart, Sparkles, Utensils, Bike, FootprintsIcon } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const serviceCategories = [
  {
    id: "biomecanica",
    title: "Biomecánica",
    icon: Activity,
    services: [
      { name: "Análisis Running", price: "$650.000" },
      { name: "Análisis Marcha", price: "$400.000" },
    ],
  },
  {
    id: "cardiologia",
    title: "Cardiología",
    icon: Heart,
    services: [
      { name: "Consulta Especializada", price: "$300.000" },
      { name: "Ecocardiograma", price: "$250.000" },
      { name: "Holter 24h", price: "$200.000" },
      { name: "MAPA Presión Arterial", price: "$200.000" },
      { name: "ECG 12 Derivaciones", price: "$50.000" },
    ],
  },
  {
    id: "recuperacion",
    title: "Recuperación & Spa",
    icon: Sparkles,
    services: [
      { name: "Terapia Física (10 sesiones)", price: "$650.000" },
      { name: "Circuito Recuperación", price: "$220.000" },
      { name: "Masaje Terapéutico", price: "$120.000" },
      { name: "Baño Terapéutico / Jacuzzi", price: "$100.000" },
    ],
  },
  {
    id: "otros",
    title: "Otros Servicios",
    icon: Utensils,
    services: [
      { name: "Consulta Nutrición", price: "$300.000" },
      { name: "Entrenamiento Simulador (4 sesiones)", price: "$200.000" },
    ],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

export function ServicesSection() {
  return (
    <section id="servicios" className="py-24 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#00041c] via-[#001030] to-[#00041c]" />
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(0,255,253,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,253,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#00fffd] text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">
            Servicios Especializados
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Protocolos de Intervención Específica
          </h2>
          <p className="text-[#68d2df] text-lg max-w-2xl mx-auto">
            Tecnología de vanguardia al servicio de tu salud y rendimiento
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {serviceCategories.map((category) => (
              <motion.div key={category.id} variants={itemVariants}>
                <AccordionItem
                  value={category.id}
                  className="glass rounded-xl border border-[#00fffd]/20 overflow-hidden data-[state=open]:border-[#00fffd]/50 transition-all duration-300"
                >
                  <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-[#00fffd]/5 transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-[#00fffd]/10 group-hover:bg-[#00fffd]/20 transition-colors">
                        <category.icon className="w-6 h-6 text-[#00fffd]" />
                      </div>
                      <span className="text-lg font-semibold text-foreground">{category.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-5">
                    <div className="space-y-3 pt-2">
                      {category.services.map((service) => (
                        <div
                          key={service.name}
                          className="flex items-center justify-between py-3 px-4 rounded-lg bg-[#00041c]/50 hover:bg-[#00fffd]/5 transition-colors group/item"
                        >
                          <span className="text-foreground/90 group-hover/item:text-foreground transition-colors">
                            {service.name}
                          </span>
                          <span className="text-[#00fffd] font-semibold">{service.price}</span>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        {/* Quick service icons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 flex flex-wrap justify-center gap-8"
        >
          {[
            { icon: Heart, label: "Cardiología" },
            { icon: Activity, label: "Biomecánica" },
            { icon: Bike, label: "Bike Fit" },
            { icon: FootprintsIcon, label: "Running" },
            { icon: Sparkles, label: "Recuperación" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center gap-2 text-[#68d2df] hover:text-[#00fffd] transition-colors cursor-default"
            >
              <div className="p-4 rounded-full border border-[#00fffd]/20 hover:border-[#00fffd]/50 hover:neon-glow transition-all duration-300">
                <item.icon className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium">{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
