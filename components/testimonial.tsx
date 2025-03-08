"use client"

import { motion } from "framer-motion"

interface TestimonialProps {
  quote: string
  author: string
  highlight: string
  className?: string
  variants?: any
}

export default function Testimonial({ quote, author, highlight, className = "", variants }: TestimonialProps) {
  return (
    <motion.div
      className={`bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:border-red-500/30 transition-all duration-300 ${className}`}
      variants={variants}
      whileHover={{
        scale: 1.03,
        boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
      }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex flex-col h-full">
        <p className="text-lg mb-4 flex-grow leading-relaxed">"{quote}"</p>
        <div className="mt-auto">
          <motion.div
            className="bg-red-600/20 text-red-500 text-sm font-medium px-3 py-1 rounded-full inline-block mb-2"
            whileHover={{ scale: 1.05 }}
          >
            {highlight}
          </motion.div>
          <p className="font-medium">{author}</p>
        </div>
      </div>
    </motion.div>
  )
}

