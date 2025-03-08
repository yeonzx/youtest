"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, Loader2 } from "lucide-react"
import { motion } from "framer-motion"

export default function ConsultationForm() {
  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    email: "",
    channel: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      // Google Sheets integration would go here
      // This is a server action that would connect to Google Sheets API
      await submitToGoogleSheets(formState)

      // Simulate successful submission
      setTimeout(() => {
        setIsSubmitted(true)
        setIsSubmitting(false)
      }, 1500)
    } catch (err) {
      setError("제출 중 오류가 발생했습니다. 다시 시도해주세요.")
      setIsSubmitting(false)
      console.error(err)
    }
  }

  // This function would be implemented as a server action in a real application
  const submitToGoogleSheets = async (data: typeof formState) => {
    // In a real implementation, this would use Google Sheets API
    // For now, we'll just simulate a delay
    return new Promise((resolve) => setTimeout(resolve, 1000))
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center py-8"
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.1,
          }}
        >
          <CheckCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
        </motion.div>
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="text-xl font-bold mb-2"
        >
          상담 신청이 완료되었습니다!
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="text-white/70 mb-4 leading-relaxed"
        >
          담당자가 빠른 시일 내에 연락드리겠습니다.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <Button
            className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white border-0"
            onClick={() => setIsSubmitted(false)}
          >
            다시 작성하기
          </Button>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          이름 *
        </label>
        <Input
          id="name"
          name="name"
          value={formState.name}
          onChange={handleChange}
          required
          className="bg-black/60 backdrop-blur-md border-zinc-700 focus:border-red-500 focus:ring-red-500/20 transition-all duration-300"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <label htmlFor="phone" className="block text-sm font-medium mb-1">
          연락처 *
        </label>
        <Input
          id="phone"
          name="phone"
          value={formState.phone}
          onChange={handleChange}
          required
          className="bg-black/60 backdrop-blur-md border-zinc-700 focus:border-red-500 focus:ring-red-500/20 transition-all duration-300"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          이메일 *
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formState.email}
          onChange={handleChange}
          required
          className="bg-black/60 backdrop-blur-md border-zinc-700 focus:border-red-500 focus:ring-red-500/20 transition-all duration-300"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <label htmlFor="channel" className="block text-sm font-medium mb-1">
          유튜브 채널 (있으시다면)
        </label>
        <Input
          id="channel"
          name="channel"
          value={formState.channel}
          onChange={handleChange}
          className="bg-black/60 backdrop-blur-md border-zinc-700 focus:border-red-500 focus:ring-red-500/20 transition-all duration-300"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <label htmlFor="message" className="block text-sm font-medium mb-1">
          문의사항
        </label>
        <Textarea
          id="message"
          name="message"
          value={formState.message}
          onChange={handleChange}
          rows={4}
          className="bg-black/60 backdrop-blur-md border-zinc-700 focus:border-red-500 focus:ring-red-500/20 transition-all duration-300"
        />
      </motion.div>

      {error && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-sm">
          {error}
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white py-6 transition-all duration-300 hover:shadow-[0_0_15px_rgba(239,68,68,0.5)] border-0"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 제출 중...
            </span>
          ) : (
            "상담 신청하기"
          )}
        </Button>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.7 }}
        className="text-xs text-white/50 text-center"
      >
        제출하시면 개인정보 수집 및 이용에 동의하는 것으로 간주됩니다.
      </motion.p>
    </motion.form>
  )
}

