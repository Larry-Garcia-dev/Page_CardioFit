"use client"

import { motion } from "framer-motion"
import { Check, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

const plans = [
  {
    name: "Experiencia Fitness",
    price: "$449.000",
    period: "/mes",
    note: "Primera mensualidad $549.000",
    features: [
      "Análisis biomecánico dinámico/estático",
      "Plan de entrenamiento personalizado",
      "4 clases semi-personalizadas/semana",
      "Control de sensores (2 meses)",
      "Uso de baño terapéutico (1 vez/mes)",
    ],
    highlighted: false,
  },
  {
    name: "Experiencia Fitness DE LUJO",
    price: "$549.000",
    period: "/mes",
    note: "Primera mensualidad $649.000",
    badge: "Más Completo",
    features: [
      "Todo lo de Experiencia Fitness",
      "Jugo de la vida (3 veces/sem)",
      "Uso de baño terapéutico o spa (1 vez/sem)",
      "Atención prioritaria",
      "Seguimiento nutricional básico",
    ],
    highlighted: true,
  },
  {
    name: "Bike Fit de Lujo",
    price: "$750.000",
    period: "",
    note: "Pago único • 2da bici o control: $450.000",
    features: [
      "Bike fit estático (Antropometría, medidas)",
      "Bike fit dinámico 3D",
      "Análisis de pedaleo y aerodinámica",
      "Electromiografía",
      "Umbral de fatiga",
      "Control sensores (2 meses)",
    ],
    highlighted: false,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

export function PricingSection() {
  return (
    <section id="planes" className="py-24 px-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[#00041c]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00fffd]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#68d2df]/5 rounded-full blur-3xl" />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#00fffd] text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">
            Planes
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Transforma tu Rendimiento
          </h2>
          <p className="text-[#68d2df] text-lg max-w-2xl mx-auto">
            Programas diseñados con precisión científica para maximizar tu potencial
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={cardVariants}
              whileHover={{ scale: 1.03, y: -5 }}
              className={`relative rounded-2xl p-8 transition-all duration-300 ${
                plan.highlighted
                  ? "glass-strong border-2 border-[#00fffd] neon-glow-strong"
                  : "glass neon-border hover:border-[#00fffd]/50"
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-[#00fffd] text-[#00041c] text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className={`text-4xl font-bold ${plan.highlighted ? "text-[#00fffd] neon-text" : "text-foreground"}`}>
                    {plan.price}
                  </span>
                  {plan.period && <span className="text-[#68d2df]">{plan.period}</span>}
                </div>
                <p className="text-[#68d2df]/70 text-sm mt-2">{plan.note}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.highlighted ? "text-[#00fffd]" : "text-[#68d2df]"}`} />
                    <span className="text-foreground/90 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full py-6 rounded-xl font-semibold transition-all duration-300 ${
                  plan.highlighted
                    ? "bg-[#00fffd] text-[#00041c] hover:bg-[#68d2df] neon-glow"
                    : "bg-transparent border border-[#00fffd] text-[#00fffd] hover:bg-[#00fffd]/10"
                }`}
                onClick={() => document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })}
              >
                Comenzar Ahora
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
