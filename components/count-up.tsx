"use client"

import { useEffect, useState, useRef } from "react"
import { useInView } from "framer-motion"

interface CountUpProps {
  end: number
  start?: number
  duration?: number
  decimals?: number
  prefix?: string
  suffix?: string
}

export default function CountUp({
  end,
  start = 0,
  duration = 2,
  decimals = 0,
  prefix = "",
  suffix = "",
}: CountUpProps) {
  const [count, setCount] = useState(start)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (isInView && !hasAnimated) {
      let startTimestamp: number | null = null
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1)
        const currentCount = progress * (end - start) + start

        setCount(currentCount)

        if (progress < 1) {
          window.requestAnimationFrame(step)
        } else {
          setHasAnimated(true)
        }
      }

      window.requestAnimationFrame(step)
    }
  }, [start, end, duration, isInView, hasAnimated])

  return (
    <span ref={ref}>
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  )
}

