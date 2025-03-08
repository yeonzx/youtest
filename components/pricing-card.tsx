"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface PricingCardProps {
  tier: string
  price: string
  status: string
  slots: string
  isHighlighted?: boolean
  isSoldOut?: boolean
  variants?: any
}

export default function PricingCard({
  tier,
  price,
  status,
  slots,
  isHighlighted = false,
  isSoldOut = false,
  variants,
}: PricingCardProps) {
  return (
    <motion.div
      className={`
        rounded-2xl p-6 
        ${
          isHighlighted
            ? "bg-gradient-to-b from-black/80 to-zinc-900/80 backdrop-blur-md border-2 border-red-500/70"
            : "bg-black/40 backdrop-blur-md border border-white/10"
        }
        ${isSoldOut ? "opacity-60" : ""}
      `}
      variants={variants}
      whileHover={
        !isSoldOut
          ? {
              scale: isHighlighted ? 1.05 : 1.03,
              boxShadow: isHighlighted ? "0 10px 30px rgba(239,68,68,0.2)" : "0 10px 30px rgba(0,0,0,0.2)",
            }
          : {}
      }
    >
      <div className="text-center">
        <h3 className="text-xl font-bold">{tier}</h3>
        <div className="my-4">
          <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">
            {price}
          </span>
        </div>
        <p className="text-sm text-white/70 mb-2">{slots}</p>
        <p className={`text-sm ${isHighlighted ? "text-red-400" : "text-white/70"} mb-6`}>{status}</p>

        <motion.div whileHover={!isSoldOut ? { scale: 1.05 } : {}} whileTap={!isSoldOut ? { scale: 0.98 } : {}}>
          <Button
            className={`w-full ${
              isHighlighted
                ? "bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white transition-all duration-300 hover:shadow-[0_0_15px_rgba(239,68,68,0.5)] border-0"
                : "bg-zinc-800 hover:bg-zinc-700 text-white border-0"
            }`}
            disabled={isSoldOut}
            onClick={() => {
              document.getElementById("consultation-form")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            {isSoldOut ? "마감됨" : "신청하기"}
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}

