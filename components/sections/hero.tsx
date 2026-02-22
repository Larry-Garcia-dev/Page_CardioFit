"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export function HeroSection() {
  const desktopVideoRef = useRef<HTMLVideoElement>(null)
  const mobileVideoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (desktopVideoRef.current) {
      desktopVideoRef.current.playbackRate = 0.75
    }
    if (mobileVideoRef.current) {
      mobileVideoRef.current.playbackRate = 0.75
    }
  }, [])

  const scrollToContact = () => {
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        {/* Horizontal video for desktop */}
        <video
          ref={desktopVideoRef}
          autoPlay
          loop
          muted
          playsInline
          className="hidden md:block w-full h-full object-cover"
        >
          <source
            src="https://api.magnificapec.com/cardiofit/videoCardioFig.mp4"
            type="video/mp4"
          />
        </video>
        {/* Vertical video for mobile */}
        <video
          ref={mobileVideoRef}
          autoPlay
          loop
          muted
          playsInline
          className="block md:hidden w-full h-full object-cover"
        >
          <source
            src="https://api.magnificapec.com/cardiofit/vertical.mp4"
            type="video/mp4"
          />
        </video>
        {/* Dark overlay */}
        {/* <div className="absolute inset-0 bg-[#00041c]/70" />
        {/* Gradient overlay */}
        {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00041c]/50 to-[#00041c]" /> */} 
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          {/* Logo/Brand */}
          {/* <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <span className="text-[#00fffd] text-sm md:text-base font-semibold tracking-[0.3em] uppercase neon-text">
              CardioFit Lab
            </span>
          </motion.div> */}

          {/* Main Heading */}
          {/* <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl md:text-5xl lg:text-7xl font-bold text-foreground mb-6 leading-tight text-balance"
          >
            Ingeniería de Precisión para el{" "}
            <span className="text-[#00fffd] neon-text">Rendimiento Humano</span>
          </motion.h1>

          {/* Subheading */}
          {/* <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl lg:text-2xl text-[#68d2df] mb-10 max-w-3xl mx-auto leading-relaxed text-pretty"
          >
            Donde la ciencia se encuentra con la fuerza. Fusionamos cardiología y biomecánica en Ibagué.
          </motion.h2> */} 

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {/* <Button
              onClick={scrollToContact}
              size="lg"
              className="bg-[#00fffd] text-[#00041c] hover:bg-[#68d2df] font-semibold text-lg px-8 py-6 rounded-full neon-glow-strong transition-all duration-300 hover:scale-105"
            >
              Agendar Diagnóstico
            </Button> */}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-[#00fffd] cursor-pointer"
          onClick={() => document.getElementById("planes")?.scrollIntoView({ behavior: "smooth" })}
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </motion.div>
    </section>
  )
}
