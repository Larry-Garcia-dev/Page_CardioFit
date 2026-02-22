"use client"

import { motion } from "framer-motion"
import { Stethoscope } from "lucide-react"
import Image from "next/image"

const doctor = {
  name: "Dra. Lorena González",
  role: "Directora Médica",
  specialty: "Cardiología Deportiva",
  icon: Stethoscope,
  description:
    "Especialista en cardiología con enfoque en medicina deportiva. Experta en evaluación cardiovascular para atletas y personas activas.",
  image: "/images/doc.jpg.jpeg",
}

const team = [doctor]; // Declare the team variable

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
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

export function TeamSection() {
  return (
    <section id="equipo" className="py-24 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#00041c]" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#00fffd]/3 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#68d2df]/3 rounded-full blur-3xl -translate-y-1/2" />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#00fffd] text-sm font-medium md:font-semibold tracking-[0.2em] uppercase mb-4 block">
            Nuestra Directora
          </span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold md:font-bold text-foreground mb-4 text-balance">
            Liderazgo en Ciencia del Rendimiento
          </h2>
          <p className="text-[#68d2df] text-base md:text-lg max-w-2xl mx-auto font-normal">
            Medicina y tecnología al servicio de tu salud
          </p>
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="glass rounded-2xl overflow-hidden neon-border hover:border-[#00fffd]/50 transition-all duration-300 group flex flex-col md:flex-row"
          >
            {/* Photo - left side */}
            <div className="relative w-full md:w-[380px] shrink-0 overflow-hidden">
              <Image
                src={doctor.image || "/placeholder.svg"}
                alt={doctor.name}
                width={380}
                height={570}
                className="w-full h-80 md:h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Info - right side */}
            <div className="flex flex-col justify-center p-8 md:p-10">
              {/* Icon badge */}
              <div className="mb-6 p-3 w-fit rounded-full glass border border-[#00fffd]/30">
                <doctor.icon className="w-6 h-6 text-[#00fffd]" />
              </div>

              <h3 className="text-xl md:text-2xl font-semibold md:font-bold text-foreground mb-2">{doctor.name}</h3>
              <p className="text-[#00fffd] font-medium text-base md:text-lg mb-1">{doctor.role}</p>
              <p className="text-[#68d2df] text-sm md:text-base mb-6">{doctor.specialty}</p>
              <p className="text-foreground/70 text-sm md:text-base leading-relaxed font-normal">{doctor.description}</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
