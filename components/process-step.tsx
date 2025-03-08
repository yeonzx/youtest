"use client"

import { motion } from "framer-motion"

interface ProcessStepProps {
  week: string
  title: string
  description: string
  variants?: any
  index?: number
}

export default function ProcessStep({ week, title, description, variants, index = 0 }: ProcessStepProps) {
  return (
    <motion.div
      className="bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:border-red-500/30 transition-all duration-300"
      variants={variants}
      custom={index}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
      }}
    >
      <div className="flex flex-col md:flex-row gap-4">
        <motion.div
          className="bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-2 rounded-lg text-sm font-bold self-start"
          whileHover={{ scale: 1.05 }}
        >
          {week}
        </motion.div>
        <div>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-white/70 leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.div>
  )
}

