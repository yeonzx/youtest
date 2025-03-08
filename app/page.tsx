"use client"

import React from "react"

import { Button } from "@/components/ui/button"
import { ChevronRight, CheckCircle, X, Menu, ArrowDown } from "lucide-react"
import ConsultationForm from "@/components/consultation-form"
import PricingCard from "@/components/pricing-card"
import Testimonial from "@/components/testimonial"
import ProcessStep from "@/components/process-step"
import CountdownTimer from "@/components/countdown-timer"
import { useEffect, useRef, useState } from "react"
import CountUp from "@/components/count-up"
import { motion } from "framer-motion"

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({})

  // Set countdown end date (7 days from now)
  const endDate = new Date()
  endDate.setDate(endDate.getDate() + 7)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      Object.entries(sectionsRef.current).forEach(([key, section]) => {
        if (!section) return

        const sectionTop = section.offsetTop
        const sectionBottom = sectionTop + section.offsetHeight

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setActiveSection(key)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setIsMenuOpen(false)
  }

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const staggerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden font-sans">
      {/* Background Grid */}
      <div className="fixed inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f20_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f20_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="font-bold text-xl"
          >
            유튜브 성장 시스템
          </motion.div>
          <div className="hidden md:flex items-center gap-8">
            {["process", "testimonials", "pricing", "consultation-form"].map((section, index) => (
              <motion.a
                key={section}
                href={`#${section}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`text-white/70 hover:text-white transition-all ${activeSection === section ? "text-red-500" : ""}`}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(section)
                }}
              >
                {section === "process" && "프로세스"}
                {section === "testimonials" && "성공사례"}
                {section === "pricing" && "가격"}
                {section === "consultation-form" && "상담신청"}
              </motion.a>
            ))}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <Button
                className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white rounded-full px-6 transition-all duration-300 hover:shadow-[0_0_15px_rgba(239,68,68,0.5)] hover:-translate-y-1 border-0"
                onClick={() => scrollToSection("consultation-form")}
              >
                상담 신청하기
              </Button>
            </motion.div>
          </div>
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-zinc-900/80 backdrop-blur-md border-b border-white/10"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {["process", "testimonials", "pricing", "consultation-form"].map((section) => (
                <a
                  key={section}
                  href={`#${section}`}
                  className={`text-white/70 hover:text-white py-2 transition-all ${activeSection === section ? "text-red-500" : ""}`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(section)
                  }}
                >
                  {section === "process" && "프로세스"}
                  {section === "testimonials" && "성공사례"}
                  {section === "pricing" && "가격"}
                  {section === "consultation-form" && "상담신청"}
                </a>
              ))}
              <Button
                className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white w-full border-0"
                onClick={() => scrollToSection("consultation-form")}
              >
                상담 신청하기
              </Button>
            </div>
          </motion.div>
        )}
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 container mx-auto px-4 relative overflow-hidden">
        {/* Web3 Style Geometric Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 right-10 w-64 h-64 rounded-full bg-gradient-to-r from-red-600/20 to-purple-600/20 blur-[80px] z-0"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              rotate: [0, 90, 180, 270, 360],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
          />

          <motion.div
            className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-gradient-to-r from-blue-600/20 to-red-600/20 blur-[100px] z-0"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
              rotate: [0, -90, -180, -270, -360],
            }}
            transition={{
              duration: 25,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              delay: 2,
            }}
          />

          <motion.div
            className="absolute top-1/3 left-1/4 w-4 h-4 bg-red-500 rounded-full z-0"
            animate={{
              y: [0, 100, 0],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 15,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
          />

          <motion.div
            className="absolute bottom-1/4 right-1/3 w-6 h-6 bg-purple-500 rounded-full z-0"
            animate={{
              y: [0, -120, 0],
              opacity: [0, 1, 0],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 18,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              delay: 5,
            }}
          />

          <motion.div
            className="absolute top-1/2 right-1/4 w-3 h-3 bg-blue-500 rounded-full z-0"
            animate={{
              x: [0, -80, 0],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 12,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              delay: 3,
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-1 rounded-full text-sm font-medium mb-4"
          >
            국내 상위 1% 대행사 출신
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight"
          >
            유튜브 제작사의{" "}
            <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600 relative inline-block"
              animate={{
                textShadow: ["0 0 0px rgba(239,68,68,0)", "0 0 10px rgba(239,68,68,0.5)", "0 0 0px rgba(239,68,68,0)"],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              잔인한 진실
            </motion.span>
            을 폭로합니다
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-white/70 mt-6 leading-relaxed"
          >
            "대행사의 80%는 유튜브가 어떻게 작동하는지 모릅니다."
          </motion.p>

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 mb-4"
          >
            <div className="bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/10 inline-block">
              <p className="text-white/80 mb-2 text-sm">특별 할인 마감까지 남은 시간</p>
              <CountdownTimer targetDate={endDate} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="pt-4"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button
                className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white text-lg rounded-full px-8 py-6 transition-all duration-300 hover:shadow-[0_0_20px_rgba(239,68,68,0.5)] border-0"
                onClick={() => scrollToSection("consultation-form")}
              >
                무료 채널 진단 받기 <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-white/50 text-sm mt-3"
            >
              가짜 조회수와 구독자 확인해 드립니다
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="pt-12"
          >
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
              <ArrowDown className="mx-auto h-8 w-8 text-white/30" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="py-16 bg-zinc-900/50 backdrop-blur-sm relative overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black to-transparent z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />

        {/* Web3 Style Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-full h-full bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.1)_0,transparent_70%)]"></div>

          <motion.div
            className="absolute top-1/4 left-1/3 w-40 h-40 border border-red-500/20 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
              rotate: 360,
            }}
            transition={{
              duration: 15,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />

          <motion.div
            className="absolute bottom-1/3 right-1/4 w-60 h-60 border border-purple-500/10 rounded-full"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.2, 0.1],
              rotate: -360,
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-20">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-4xl font-bold text-center mb-12 leading-tight"
          >
            악덕 대행사가 당신을 속이는{" "}
            <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600"
              animate={{
                textShadow: ["0 0 0px rgba(239,68,68,0)", "0 0 10px rgba(239,68,68,0.5)", "0 0 0px rgba(239,68,68,0)"],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              5가지 수법
            </motion.span>
          </motion.h2>

          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            {[
              {
                number: 1,
                title: "가짜 조회수와 구독자로 눈속임",
                description:
                  "해외 봇 농장에서 구매한 가짜 지표로 성과를 위장합니다. 결과적으로 알고리즘이 파괴되어 '죽은 채널'이 생성됩니다.",
              },
              {
                number: 2,
                title: "예쁜 영상만 만들고 성장은 모른 척",
                description:
                  '"고급 촬영장비 사용합니다"라며 촬영비를 2~3배 부풀려 청구하고, 화려한 영상에만 집중하며 실제 매출 전환은 고려하지 않습니다.',
              },
              {
                number: 3,
                title: "클릭되지 않는 썸네일 디자인",
                description: '"최적화된 썸네일입니다"라고 말하지만 실제 클릭률은 고작 0.5~1%에 불과합니다.',
              },
              {
                number: 4,
                title: "5년 전에 멈춘 알고리즘 지식",
                description:
                  '"전략적 콘텐츠"를 말하지만 실제론 5년 전 구식 정보만 알고 있으며, 현재 유튜브 추천 시스템에 대한 이해가 전무합니다.',
              },
              {
                number: 5,
                title: "고객 전환 시스템 부재",
                description:
                  '"시간이 지나면 효과가 있을 겁니다"라는 말만 반복하며 계약 연장을 유도합니다. 당신의 돈으로 자신들의 포트폴리오만 채우는 대행사들입니다.',
                fullWidth: true,
              },
            ].map((problem, index) => (
              <motion.div
                key={problem.number}
                variants={fadeInUpVariants}
                className={`bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:border-red-500/30 transition-all duration-300 transform hover:-translate-y-1 ${problem.fullWidth ? "md:col-span-2" : ""}`}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    className="bg-gradient-to-r from-red-600 to-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1"
                    whileHover={{
                      scale: 1.1,
                      boxShadow: "0 0 10px rgba(239,68,68,0.5)",
                    }}
                  >
                    {problem.number}
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{problem.title}</h3>
                    <p className="text-white/70 leading-relaxed">{problem.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Case Study */}
      <section className="py-16 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto bg-black/40 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:border-red-500/30 transition-all duration-500"
        >
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <motion.div
              className="w-24 h-24 rounded-full bg-gradient-to-br from-red-600 to-red-500 flex items-center justify-center flex-shrink-0"
              animate={{
                boxShadow: ["0 0 0px rgba(239,68,68,0)", "0 0 20px rgba(239,68,68,0.3)", "0 0 0px rgba(239,68,68,0)"],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              <span className="text-4xl font-bold">K</span>
            </motion.div>
            <div>
              <p className="text-lg md:text-xl italic leading-relaxed">
                "1년간 대행사에{" "}
                <motion.span
                  className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600 font-bold"
                  animate={{
                    textShadow: [
                      "0 0 0px rgba(239,68,68,0)",
                      "0 0 10px rgba(239,68,68,0.5)",
                      "0 0 0px rgba(239,68,68,0)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                >
                  5,800만원
                </motion.span>
                을 투자했지만 실제 고객은 단 3명뿐이었습니다. 그런데 새 시스템으로 전환 후 첫 달에만{" "}
                <motion.span
                  className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600 font-bold"
                  animate={{
                    textShadow: [
                      "0 0 0px rgba(239,68,68,0)",
                      "0 0 10px rgba(239,68,68,0.5)",
                      "0 0 0px rgba(239,68,68,0)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1.5 }}
                >
                  21명의 신규 환자
                </motion.span>
                가 찾아왔습니다."
              </p>
              <p className="text-white/70 mt-2">- 정형외과 원장 K</p>
            </div>
          </div>
        </motion.div>

        <div className="text-center max-w-3xl mx-auto mt-12 space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl font-bold leading-tight"
          >
            더 이상 매달 500만원씩 대행사에 낭비하지 마세요
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-white/70 leading-relaxed"
          >
            월 1,500만원 받던 대행 시스템을 그대로 복사해 드립니다.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-white/10 mt-8"
          >
            <h3 className="text-xl font-bold mb-4">선택의 기로에 서 있습니다:</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                className="bg-zinc-900/60 backdrop-blur-md p-4 rounded-xl border border-white/5"
                whileHover={{ scale: 0.98, opacity: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <X className="text-red-500 mx-auto mb-2 h-8 w-8" />
                <p className="leading-relaxed">앞으로 1년 더 매달 500만원씩 효과 없는 대행사에 쏟아부을 것인가?</p>
              </motion.div>
              <motion.div
                className="bg-zinc-900/60 backdrop-blur-md p-4 rounded-xl border border-red-500/50"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(239,68,68,0.3)",
                }}
                transition={{ duration: 0.2 }}
              >
                <CheckCircle className="text-red-500 mx-auto mb-2 h-8 w-8" />
                <p className="leading-relaxed">
                  단 4주 만에 당신의 전문성을 '매출 기계'로 바꿀 검증된 시스템을 도입할 것인가?
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <motion.section
        className="py-16 bg-gradient-to-b from-black to-zinc-900/50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
            <motion.div
              className="bg-black/40 backdrop-blur-md p-6 rounded-2xl text-center border border-white/10 hover:border-red-500/30 transition-all duration-300"
              whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
            >
              <p className="text-white/70 text-sm mb-1">평균 조회수 증가</p>
              <p className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">
                <CountUp end={347} suffix="%" duration={2.5} />
              </p>
            </motion.div>

            <motion.div
              className="bg-black/40 backdrop-blur-md p-6 rounded-2xl text-center border border-white/10 hover:border-red-500/30 transition-all duration-300"
              whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
            >
              <p className="text-white/70 text-sm mb-1">평균 구독자 증가</p>
              <p className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">
                <CountUp end={210} suffix="%" duration={2.5} />
              </p>
            </motion.div>

            <motion.div
              className="bg-black/40 backdrop-blur-md p-6 rounded-2xl text-center border border-white/10 hover:border-red-500/30 transition-all duration-300"
              whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
            >
              <p className="text-white/70 text-sm mb-1">평균 클릭률</p>
              <p className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">
                <CountUp end={12.8} suffix="%" decimals={1} duration={2.5} />
              </p>
            </motion.div>

            <motion.div
              className="bg-black/40 backdrop-blur-md p-6 rounded-2xl text-center border border-white/10 hover:border-red-500/30 transition-all duration-300"
              whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
            >
              <p className="text-white/70 text-sm mb-1">매출 전환율</p>
              <p className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">
                <CountUp end={23.5} suffix="%" decimals={1} duration={2.5} />
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <section
        id="testimonials"
        className="py-16 bg-zinc-900/50 backdrop-blur-sm relative"
        ref={(el) => (sectionsRef.current["testimonials"] = el)}
      >
        {/* Web3 Style Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-full h-full bg-[radial-gradient(ellipse_at_bottom,rgba(239,68,68,0.1)_0,transparent_70%)]"></div>

          <motion.div
            className="absolute top-1/3 right-1/4 w-32 h-32 border border-red-500/10 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
              rotate: 360,
            }}
            transition={{
              duration: 12,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-4xl font-bold text-center mb-12 leading-tight"
          >
            실제{" "}
            <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600"
              animate={{
                textShadow: ["0 0 0px rgba(239,68,68,0)", "0 0 10px rgba(239,68,68,0.5)", "0 0 0px rgba(239,68,68,0)"],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              성공 사례
            </motion.span>
          </motion.h2>

          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            <Testimonial
              quote="이전에 다른 대행사와 일했을 때는 영상 10개로 구독자 200명 정도 였습니다. 세팅해주신대로 그냥 집에서 촬영 했는데, 이 정도로 성과 좋은 영상이 나올줄은 몰랐습니다. 유튜브를 너무 어렵게 생각했던 것 같아요."
              author="공부법 채널 A"
              highlight="컨설팅 직후 영상 20만 돌파"
              variants={fadeInUpVariants}
            />

            <Testimonial
              quote="지난 주 영상 보고 수임을 했습니다.. 감사해요 대표님.."
              author="변호사 P"
              highlight="영상 하나만으로 2,000만원 사건 수임"
              variants={fadeInUpVariants}
            />

            <Testimonial
              quote="유튜브 영상 보고 왔다는 손님들이 많아져서 요즘 관리좀 하고 있습니다. 신환이 지난 달 대비 3배 정도 증가한 것 같네요. 지난주에는 나는 솔로 출연제의가..ㅋㅋ"
              author="치과의사 K"
              highlight="신환 3배 증가"
              variants={fadeInUpVariants}
            />

            <Testimonial
              quote="직원 한테 알려줬더니, 너무 잘하네요. 할 줄 알면서 시키는 거랑, 그냥 시키는대로 영상만 찍는 거랑은 차원이 다르다는 걸 느끼고 있어요"
              author="치과의사 G"
              highlight="직원도 쉽게 운영 가능"
              variants={fadeInUpVariants}
            />

            <Testimonial
              quote="저 실버버튼 도착했어요 ㅋㅋ 실감이 잘안나네요. 이제 다른 채널들이 저를 따라하기 시작해요"
              author="학원 채널 B"
              highlight="실버버튼 획득"
              className="md:col-span-2"
              variants={fadeInUpVariants}
            />
          </motion.div>
        </div>
      </section>

      {/* Process */}
      <section
        id="process"
        className="py-16 container mx-auto px-4 relative"
        ref={(el) => (sectionsRef.current["process"] = el)}
      >
        {/* Web3 Style Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.1)_0,transparent_60%)]"></div>

          <motion.div
            className="absolute bottom-1/4 left-1/5 w-48 h-48 border border-red-500/10 rounded-full"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.2, 0.1],
              rotate: -360,
            }}
            transition={{
              duration: 18,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-4xl font-bold text-center mb-4 leading-tight"
          >
            6주 만에 유튜브를{" "}
            <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600"
              animate={{
                textShadow: ["0 0 0px rgba(239,68,68,0)", "0 0 10px rgba(239,68,68,0.5)", "0 0 0px rgba(239,68,68,0)"],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              매출 머신
            </motion.span>
            으로 바꾸는 프로세스
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center text-white/70 text-lg mb-12 leading-relaxed"
          >
            복사하여 붙여넣기만 하면 되는 'CTRL+C, CTRL+V' 시스템
          </motion.p>

          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-8"
          >
            {[
              {
                week: "1주차",
                title: "유선 / 대면 미팅",
                description:
                  "총괄 담당자와 상담 및 계약 진행, 100만 유튜버 담당 PD 참여, 현 10만 유튜브 채널 운영자 참여",
              },
              {
                week: "2주차",
                title: "계약 / 팀 배정",
                description: "클라이언트 맞춤 캐릭터 설정 및 채널 컨셉 구체화",
              },
              {
                week: "3주차",
                title: "압도적 존재감의 채널 DNA 구축",
                description:
                  "잠재 고객의 가장 아픈 곳을 정확히 찌르는 콘텐츠 전략, 경쟁자 사이에서 단 3초 만에 눈에 띄는 차별화 포인트, 시청자가 '이 사람만 믿을 수 있겠다'고 느끼는 신뢰 설계도",
              },
              {
                week: "4주차",
                title: "유튜브 알고리즘 지배 전략",
                description:
                  "유튜브가 당신의 영상을 적극 추천하게 만드는 알고리즘 트리거 5가지, 클릭률을 300% 높이는 썸네일 & 제목 공식, 경쟁자를 제치고 검색 상위에 노출되는 SEO 키워드 배치법, 시청 유지율을 높이는 영상 스크립트 구조화 방법",
              },
              {
                week: "5주차",
                title: "90분 만에 완성하는 영상 제작 시스템",
                description:
                  "촬영? 버튼만 누르면 끝나는 환경 1:1 맞춤 세팅, 최소 투자로 최대 효과를 내는 장비 & 세팅 최적화, 외주 네트워크 구축 및 품질 관리 시스템, 시간 효율성을 극대화하는 템플릿 & 체크리스트 개발",
              },
              {
                week: "6주차",
                title: "시청자를 고객으로 바꾸는 전환 파이프라인",
                description:
                  "마케팅 비용 1도 안들이고, 고객 DB 모으는 전략, 유튜브 트래픽을 실제 매출로 바꾸는 전환 시나리오, 고객 신뢰도를 높이는 콘텐츠 설계 전략, 지속 가능한 수익 창출 구조 확립",
              },
            ].map((step, index) => (
              <ProcessStep
                key={step.week}
                week={step.week}
                title={step.title}
                description={step.description}
                variants={fadeInUpVariants}
                index={index}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Special */}
      <section className="py-16 bg-zinc-900/50 backdrop-blur-sm relative">
        {/* Web3 Style Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.1)_0,transparent_70%)]"></div>

          <motion.div
            className="absolute top-1/2 left-1/2 w-64 h-64 border border-red-500/10 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
              x: [-50, 0, -50],
              y: [-50, 0, -50],
            }}
            transition={{
              duration: 15,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-4xl font-bold text-center mb-12 leading-tight"
          >
            이 프로그램이{" "}
            <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600"
              animate={{
                textShadow: ["0 0 0px rgba(239,68,68,0)", "0 0 10px rgba(239,68,68,0.5)", "0 0 0px rgba(239,68,68,0)"],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              특별한 4가지 이유
            </motion.span>
          </motion.h2>

          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            {[
              {
                number: 1,
                title: "결과가 보장된 유일한 프로그램",
                description: "과제를 제대로 이수했는데 성과가 없다면 100% 환불해 드립니다.",
              },
              {
                number: 2,
                title: "완성된 시스템을 그대로 복사해가는 방식",
                description:
                  '돈과 시간을 낭비하며 돌아갈 필요 없이 다양한 분야에서 검증된 성공 방식을 그대로 적용합니다. "마치 성공한 채널의 복제품을 받은 느낌입니다"',
              },
              {
                number: 3,
                title: "유튜브 성장과 매출 전환을 동시에 해결",
                description:
                  '대부분의 프로그램: 성장만 가르침 / 우리 프로그램: 성장+매출 전환 공식 제공. "조회수뿐 아니라 실제 고객이 찾아오는 마법 같은 경험"',
              },
              {
                number: 4,
                title: "대행사보다 월등히 적은 비용으로 최소 2배 높은 성과",
                description:
                  '매달 지출되는 500만원 대신, 단 한 번의 투자로 지속적인 매출 창출. "1년 동안 대행사에 쏟아부은 돈의 10%만 투자해 30배 이상의 성과"',
              },
            ].map((reason, index) => (
              <motion.div
                key={reason.number}
                variants={fadeInUpVariants}
                className="bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:border-red-500/30 transition-all duration-300"
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                }}
              >
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <motion.span
                    className="bg-gradient-to-r from-red-600 to-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3"
                    whileHover={{
                      scale: 1.2,
                      boxShadow: "0 0 10px rgba(239,68,68,0.5)",
                    }}
                  >
                    {reason.number}
                  </motion.span>
                  {reason.title}
                </h3>
                <p className="text-white/70 leading-relaxed">{reason.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Decision Time */}
      <section className="py-16 container mx-auto px-4 relative">
        {/* Web3 Style Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-full h-full bg-[radial-gradient(circle_at_bottom_left,rgba(239,68,68,0.1)_0,transparent_60%)]"></div>
        </div>

        <div className="max-w-3xl mx-auto text-center space-y-8 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-4xl font-bold leading-tight"
          >
            당신의 성공이 걸린{" "}
            <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600"
              animate={{
                textShadow: ["0 0 0px rgba(239,68,68,0)", "0 0 10px rgba(239,68,68,0.5)", "0 0 0px rgba(239,68,68,0)"],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              마지막 결정의 순간
            </motion.span>
            입니다
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-black/40 backdrop-blur-md p-8 rounded-2xl border border-white/10"
          >
            <p className="text-xl mb-6 leading-relaxed">
              아무와 함께 하지 않습니다. 매일 수십 건의 문의가 쏟아지지만,
              <br />
              확실하게 성장 시켜 드릴 수 있는 분{" "}
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600 font-bold"
                animate={{
                  textShadow: [
                    "0 0 0px rgba(239,68,68,0)",
                    "0 0 10px rgba(239,68,68,0.5)",
                    "0 0 0px rgba(239,68,68,0)",
                  ],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                단, 3분
              </motion.span>
              과 함께 합니다.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <motion.div
                className="bg-zinc-900/60 backdrop-blur-md p-4 rounded-xl border border-white/5"
                whileHover={{ scale: 0.98, opacity: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <p className="leading-relaxed">6개월 뒤 아직도 유튜브를 시작할지 말지 고민하시겠습니까?</p>
              </motion.div>
              <motion.div
                className="bg-zinc-900/60 backdrop-blur-md p-4 rounded-xl border border-red-500/50"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(239,68,68,0.3)",
                }}
                transition={{ duration: 0.2 }}
              >
                <p className="leading-relaxed">아니면 수만명의 구독자를 가진 영향력 있는 분이 되어있으시겠습니까?</p>
              </motion.div>
            </div>

            <p className="text-white/70 leading-relaxed">
              저희는 여러분들이 진심으로 빠르게 성장했으면 좋겠습니다.
              <br />
              그래서 확실히 결과를 낼 수 있는 분들만 선별합니다.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-white/10"
          >
            <h3 className="text-xl font-bold mb-4">컨설팅 과정:</h3>
            <div className="flex flex-wrap md:flex-nowrap justify-between items-center max-w-md mx-auto">
              {[
                { step: 1, label: "상담 신청", active: true },
                { step: 2, label: "대면 미팅", active: false },
                { step: 3, label: "6주 컨설팅", active: false },
                { step: 4, label: "채널 폭발", active: false },
              ].map((item, index, array) => (
                <React.Fragment key={item.step}>
                  <motion.div
                    className="text-center mb-4 md:mb-0"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * item.step }}
                  >
                    <motion.div
                      className={`w-12 h-12 rounded-full ${item.active ? "bg-gradient-to-r from-red-600 to-red-500" : "bg-zinc-800"} flex items-center justify-center mx-auto mb-2`}
                      whileHover={{ scale: 1.1 }}
                      animate={
                        item.active
                          ? {
                              boxShadow: [
                                "0 0 0px rgba(239,68,68,0)",
                                "0 0 15px rgba(239,68,68,0.5)",
                                "0 0 0px rgba(239,68,68,0)",
                              ],
                            }
                          : {}
                      }
                      transition={item.active ? { duration: 2, repeat: Number.POSITIVE_INFINITY } : {}}
                    >
                      {item.step}
                    </motion.div>
                    <p>{item.label}</p>
                  </motion.div>
                  {index < array.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.5 + 0.1 * index }}
                      className="hidden md:block"
                    >
                      <ChevronRight className="text-white/30" />
                    </motion.div>
                  )}
                </React.Fragment>
              ))}
            </div>
            <p className="text-white/70 text-sm mt-4">대면 미팅은 홍대입구에 위치한 저희 본사에서 진행합니다.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8"
          >
            <div className="bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/10 inline-block">
              <p className="text-white/80 mb-2 text-sm">특별 할인 마감까지 남은 시간</p>
              <CountdownTimer targetDate={endDate} />
            </div>
            <p className="text-lg text-white/70 mt-4 leading-relaxed">
              지난 기수는 모집{" "}
              <motion.span
                className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600"
                animate={{
                  textShadow: [
                    "0 0 0px rgba(239,68,68,0)",
                    "0 0 10px rgba(239,68,68,0.5)",
                    "0 0 0px rgba(239,68,68,0)",
                  ],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                17시간
              </motion.span>
              만에 모집 마감이 되었습니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing */}
      <section
        id="pricing"
        className="py-16 bg-zinc-900/50 backdrop-blur-sm relative"
        ref={(el) => (sectionsRef.current["pricing"] = el)}
      >
        {/* Web3 Style Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-full h-full bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.1)_0,transparent_70%)]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button
                  className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white text-xl rounded-full px-10 py-7 transition-all duration-300 hover:shadow-[0_0_20px_rgba(239,68,68,0.5)] border-0"
                  onClick={() => scrollToSection("consultation-form")}
                >
                  지금 상담 신청하기 <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-white/50 text-sm mt-3"
              >
                "매출 폭발을 원하는 분만 클릭하세요"
              </motion.p>
            </motion.div>

            <motion.div
              variants={staggerContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid md:grid-cols-3 gap-6"
            >
              <PricingCard
                tier="1기"
                price="210만원"
                status="모집완료"
                slots="3명"
                isSoldOut={true}
                variants={fadeInUpVariants}
              />

              <PricingCard
                tier="2기"
                price="280만원"
                status="현재 2자리 남음"
                slots="3명"
                isHighlighted={true}
                variants={fadeInUpVariants}
              />

              <PricingCard
                tier="3기"
                price="370만원"
                status="대기자 명단 등록 중"
                slots="3명"
                variants={fadeInUpVariants}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Consultation Form */}
      <section
        id="consultation-form"
        className="py-16 container mx-auto px-4 relative"
        ref={(el) => (sectionsRef.current["consultation-form"] = el)}
      >
        {/* Web3 Style Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.1)_0,transparent_70%)]"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto bg-black/40 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:border-red-500/30 transition-all duration-500 relative z-10"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 leading-tight">무료 상담 신청하기</h2>

          <ConsultationForm />
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-900/80 backdrop-blur-md py-8 border-t border-white/10">
        <div className="container mx-auto px-4 text-center text-white/50 text-sm">
          <p>© {new Date().getFullYear()} 유튜브 성장 시스템. All rights reserved.</p>
          <p className="mt-2">홍대입구역 2번 출구 도보 5분</p>
        </div>
      </footer>
    </div>
  )
}

