import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const content = {
  label: 'Lorem ipsum dolor sit amet.',
  headline: 'O mercado existe na medida que é observado.',
  asideHeading: 'Lorem ipsum dolor sit amet.',
  body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  brandName: 'Nano Holding',
  brandRole: 'Creative Company',
}

const EASE = [0.22, 1, 0.36, 1]
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

/* --- peças reutilizadas nas duas montagens (desktop / empilhada) --- */
function Divider({ className = '' }) {
  return <motion.div variants={item} className={'h-px w-full bg-black/85 ' + className} />
}
function BlueHeading({ className = '' }) {
  return (
    <motion.h2
      variants={item}
      className={
        'font-medium leading-[1.3] text-nano-ink text-[20px] md:text-[32px] ' + className
      }
    >
      {content.asideHeading}
    </motion.h2>
  )
}
function Body({ className = '' }) {
  return (
    <motion.p
      variants={item}
      className={'max-w-[44ch] text-[14px] leading-[1.75] text-black/90 ' + className}
    >
      {content.body}
    </motion.p>
  )
}
function BrandRow({ className = '' }) {
  return (
    <motion.div
      variants={item}
      className={'flex items-end justify-between gap-4 ' + className}
    >
      <div className="text-[14px] leading-[1.35]">
        <p className="font-medium">{content.brandName}</p>
        <p className="text-black/65">{content.brandRole}</p>
      </div>
      <img
        src="/images/icon-elemento-02.png"
        alt=""
        aria-hidden="true"
        className="h-6 w-6 shrink-0 object-contain md:h-8 md:w-8 lg:h-9 lg:w-9"
      />
    </motion.div>
  )
}

export default function Hero() {
  const stageRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ['start start', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])

  return (
    <section className="w-full overflow-hidden bg-white">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto w-full max-w-[1440px] px-5 py-6 md:px-8 md:py-8 lg:px-16 lg:py-12"
      >
        <div className="lg:grid lg:grid-cols-[minmax(0,979fr)_minmax(0,368fr)] lg:items-stretch lg:gap-9">
          {/* ============ COLUNA VISUAL (imagem + topo + card) ============ */}
          <div className="relative">
            <div ref={stageRef} className="relative overflow-hidden">
              <motion.div variants={item} style={{ y: imageY }} className="will-change-transform">
                <img
                  src="/images/hero-mobile.png"
                  alt="Montanha estilizada — Nano Holding"
                  className="block w-full md:hidden"
                />
                <img
                  src="/images/hero-tablet.png"
                  alt="Montanha estilizada — Nano Holding"
                  className="hidden w-full md:block lg:hidden"
                />
                <img
                  src="/images/hero-desktop.png"
                  alt="Montanha estilizada — Nano Holding"
                  className="hidden w-full lg:block"
                />
              </motion.div>

              {/* topo: logo + (linha decorativa) + menu */}
              <motion.div
                variants={item}
                className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-5 py-4 md:px-6 md:py-5 lg:px-7 lg:py-6"
              >
                <div className="flex items-center gap-3">
                  <img src="/images/logo.png" alt="Nano Holding" className="h-4 w-auto lg:h-6" />
                  <span className="hidden h-px w-6 bg-white/70 lg:block" />
                </div>
                <button
                  type="button"
                  aria-label="Menu"
                  className="flex flex-col gap-[5px] p-1 lg:hidden"
                >
                  <span className="block h-[2px] w-5 bg-white" />
                  <span className="block h-[2px] w-5 bg-white" />
                </button>
              </motion.div>
            </div>

            {/* card branco sobreposto: rótulo + headline */}
            <motion.div
              variants={item}
              className="relative z-10 -mt-28 w-[88%] bg-white pt-5 pr-6 md:-mt-32 md:w-[74%] md:pt-6 md:pr-8 lg:absolute lg:bottom-0 lg:left-0 lg:mt-0 lg:w-[70%] lg:pt-7 lg:pr-10"
            >
              <p className="font-medium text-nano-ink text-[11px] md:text-[16px]">
                {content.label}
              </p>
              <h1 className="mt-2 max-w-[22ch] font-medium leading-[1.24] text-black text-[22px] md:text-[32px] lg:text-[36px]">
                {content.headline}
              </h1>
            </motion.div>
          </div>

          {/* ============ EDITORIAL — DESKTOP (coluna direita) ============ */}
          <div className="hidden lg:flex lg:h-full lg:flex-col lg:pt-2">
            <BlueHeading />
            <div className="grow-[3]" />
            <div className="flex flex-col gap-4">
              <Divider />
              <Body />
            </div>
            <div className="grow" />
            <BrandRow className="pt-6" />
          </div>

          {/* ============ EDITORIAL — EMPILHADA (mobile / tablet) ============ */}
          <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-5 md:mt-12 md:grid-cols-2 md:items-start lg:hidden">
            <Divider className="md:col-span-2" />
            <BlueHeading />
            <Body />
            <BrandRow className="pt-4 md:col-span-2 md:pt-6" />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
