"use client"

import React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, Send, User, X } from "lucide-react"
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

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: number
}

interface UserInfo {
  name: string
  phone: string
  countryCode: string
}

const CACHE_KEY = "cardiofit-chat-cache"

const countryCodes = [
  { code: "+57", country: "Colombia", flag: "CO" },
  { code: "+1", country: "Estados Unidos", flag: "US" },
  { code: "+52", country: "México", flag: "MX" },
  { code: "+34", country: "España", flag: "ES" },
  { code: "+54", country: "Argentina", flag: "AR" },
  { code: "+56", country: "Chile", flag: "CL" },
  { code: "+51", country: "Perú", flag: "PE" },
  { code: "+593", country: "Ecuador", flag: "EC" },
  { code: "+58", country: "Venezuela", flag: "VE" },
  { code: "+507", country: "Panamá", flag: "PA" },
]

export function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>([])
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isRegistering, setIsRegistering] = useState(true)
  
  // Registration form state
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [countryCode, setCountryCode] = useState("+57")
  
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Load from cache on mount
  useEffect(() => {
    const cached = localStorage.getItem(CACHE_KEY)
    if (cached) {
      try {
        const data = JSON.parse(cached)
        if (data.userInfo) {
          setUserInfo(data.userInfo)
          setIsRegistering(false)
        }
        if (data.messages && Array.isArray(data.messages)) {
          setMessages(data.messages)
        }
      } catch (e) {
        console.error("Error loading chat cache:", e)
      }
    }
  }, [])

  // Save to cache when messages or userInfo change
  useEffect(() => {
    if (userInfo || messages.length > 0) {
      const data = { userInfo, messages }
      localStorage.setItem(CACHE_KEY, JSON.stringify(data))
    }
  }, [messages, userInfo])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim() && phone.trim()) {
      const newUserInfo = {
        name: name.trim(),
        phone: phone.trim(),
        countryCode,
      }
      setUserInfo(newUserInfo)
      setIsRegistering(false)
      
      // Add welcome message
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        type: "assistant",
        content: `¡Hola ${name}! Bienvenido a CardioFit Lab. ¿En qué podemos ayudarte hoy?`,
        timestamp: Date.now(),
      }
      setMessages([welcomeMessage])
    }
  }

  const sendMessage = async () => {
    if (!inputValue.trim() || !userInfo || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue.trim(),
      timestamp: Date.now(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    try {
      const response = await fetch(
        "https://n8n.magnificapec.com/webhook/db09d378-4196-4484-86aa-bec9ed891911",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Pregunta: userMessage.content,
            phone: `${userInfo.countryCode}${userInfo.phone}`,
            Name: userInfo.name,
          }),
        }
      )

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: data.output || "Gracias por tu mensaje. Un asesor te contactará pronto.",
        timestamp: Date.now(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error sending message:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: "Lo sentimos, hubo un error al procesar tu mensaje. Por favor intenta de nuevo.",
        timestamp: Date.now(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const clearChat = () => {
    localStorage.removeItem(CACHE_KEY)
    setMessages([])
    setUserInfo(null)
    setIsRegistering(true)
    setName("")
    setPhone("")
    setCountryCode("+57")
  }

  const formatMessageContent = (content: string) => {
    // Convert markdown-style links to actual links
    const urlRegex = /(https?:\/\/[^\s]+)/g
    const parts = content.split(urlRegex)
    
    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00fffd] underline hover:text-[#68d2df] break-all"
          >
            {part}
          </a>
        )
      }
      // Handle line breaks
      return part.split("\n").map((line, lineIndex) => (
        <span key={`${index}-${lineIndex}`}>
          {line}
          {lineIndex < part.split("\n").length - 1 && <br />}
        </span>
      ))
    })
  }

  return (
    <div className="glass rounded-xl neon-border h-[400px] flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-[#00fffd]/20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[#00fffd]/10">
            <MessageCircle className="w-5 h-5 text-[#00fffd]" />
          </div>
          <div>
            <h3 className="text-foreground font-semibold text-sm">
              ¿Tienes dudas?
            </h3>
            <p className="text-[#68d2df] text-xs">
              Escríbenos tu inquietud
            </p>
          </div>
        </div>
        {userInfo && (
          <button
            onClick={clearChat}
            className="p-1.5 rounded-lg hover:bg-[#00fffd]/10 transition-colors"
            title="Nuevo chat"
          >
            <X className="w-4 h-4 text-[#68d2df]" />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {isRegistering ? (
            <motion.div
              key="register"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-4 h-full flex flex-col justify-center"
            >
              <div className="text-center mb-4">
                <div className="w-12 h-12 rounded-full bg-[#00fffd]/10 flex items-center justify-center mx-auto mb-3">
                  <User className="w-6 h-6 text-[#00fffd]" />
                </div>
                <p className="text-[#68d2df] text-sm">
                  Uno de nuestros asesores resolverá tus dudas
                </p>
              </div>

              <form onSubmit={handleRegister} className="space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="chat-name" className="text-foreground text-sm">
                    Nombre
                  </Label>
                  <Input
                    id="chat-name"
                    type="text"
                    placeholder="Tu nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-[#00041c]/50 border-[#00fffd]/20 focus:border-[#00fffd] text-foreground placeholder:text-foreground/40 h-10"
                    required
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-1.5">
                    <Label className="text-foreground text-sm">País</Label>
                    <Select value={countryCode} onValueChange={setCountryCode}>
                      <SelectTrigger className="bg-[#00041c]/50 border-[#00fffd]/20 focus:border-[#00fffd] text-foreground h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#001030] border-[#00fffd]/20">
                        {countryCodes.map((country) => (
                          <SelectItem
                            key={country.code}
                            value={country.code}
                            className="text-foreground focus:bg-[#00fffd]/20"
                          >
                            <span className="flex items-center gap-1">
                              <span className="text-xs">{country.flag}</span>
                              <span>{country.code}</span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2 space-y-1.5">
                    <Label htmlFor="chat-phone" className="text-foreground text-sm">
                      Teléfono
                    </Label>
                    <Input
                      id="chat-phone"
                      type="tel"
                      placeholder="300 123 4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                      className="bg-[#00041c]/50 border-[#00fffd]/20 focus:border-[#00fffd] text-foreground placeholder:text-foreground/40 h-10"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={!name.trim() || !phone.trim()}
                  className="w-full bg-[#00fffd] text-[#00041c] hover:bg-[#68d2df] font-semibold h-10 rounded-lg transition-all duration-300 disabled:opacity-50"
                >
                  Comenzar Chat
                </Button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex flex-col"
            >
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
                        message.type === "user"
                          ? "bg-[#00fffd] text-[#00041c]"
                          : "bg-[#00041c]/80 border border-[#00fffd]/20 text-foreground"
                      }`}
                    >
                      {formatMessageContent(message.content)}
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-[#00041c]/80 border border-[#00fffd]/20 rounded-xl px-4 py-2">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-[#00fffd] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-2 h-2 bg-[#00fffd] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-2 h-2 bg-[#00fffd] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-3 border-t border-[#00fffd]/20">
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Escribe tu mensaje..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                    className="bg-[#00041c]/50 border-[#00fffd]/20 focus:border-[#00fffd] text-foreground placeholder:text-foreground/40 h-10"
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={!inputValue.trim() || isLoading}
                    className="bg-[#00fffd] text-[#00041c] hover:bg-[#68d2df] h-10 w-10 p-0 rounded-lg transition-all duration-300 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
