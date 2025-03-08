"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface CountdownTimerProps {
  targetDate: Date
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime()

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        }
      }

      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      }
    }

    // Initial calculation
    setTimeLeft(calculateTimeLeft())

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    // Clear interval on unmount
    return () => clearInterval(timer)
  }, [targetDate])

  const timeUnits = [
    { label: "일", value: timeLeft.days },
    { label: "시간", value: timeLeft.hours },
    { label: "분", value: timeLeft.minutes },
    { label: "초", value: timeLeft.seconds },
  ]

  return (
    <div className="flex justify-center gap-2 md:gap-4">
      {timeUnits.map((unit, index) => (
        <div key={unit.label} className="flex flex-col items-center">
          <motion.div
            className="bg-black/60 backdrop-blur-md w-16 md:w-20 h-16 md:h-20 rounded-xl border border-red-500/30 flex items-center justify-center"
            animate={{
              boxShadow:
                unit.value <= 5 && unit.label === "일"
                  ? ["0 0 0px rgba(239,68,68,0)", "0 0 15px rgba(239,68,68,0.5)", "0 0 0px rgba(239,68,68,0)"]
                  : "none",
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <motion.span
              key={`${unit.value}-${unit.label}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600"
            >
              {unit.value.toString().padStart(2, "0")}
            </motion.span>
          </motion.div>
          <span className="text-xs mt-1 text-white/70">{unit.label}</span>
        </div>
      ))}
    </div>
  )
}

