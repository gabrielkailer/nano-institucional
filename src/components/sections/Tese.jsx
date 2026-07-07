import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

const TICKS_V = { background: 'repeating-linear-gradient(to bottom, #545454 0 1px, transparent 1px 36px)' }
const TICKS_H = { background: 'repeating-linear-gradient(to right, #545454 0 1px, transparent 1px 36px)' }

function Arrow({ className = '' }) {
  return (
    <svg viewBox="0 0 10 8" fill="none" aria-hidden="true" className={'h-2.5 w-3 ' + className}>
      <path
        d="M0.5 3.68a.5.5 0 0 0 0 1v-1ZM9.34 4.04a.5.5 0 0 0 0-.71L6.16.15a.5.5 0 1 0-.71.7L8.28 3.68 5.45 6.51a.5.5 0 1 0 .71.71l3.18-3.18ZM.5 4.18h8.49v-1H.5v1Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function Tese() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const cloudY = useTransform(scrollYProgress, [0, 1], ['-4%', '8%'])

  return (
    <section ref={ref} className="relative min-h-screen w-full overflow-hidden bg-white">
      {/* nuvem de pontos — sangra pela direita */}
      <motion.img
        src="/images/s2-cloud.png"
        alt="Nuvem de partículas — escala nano"
        style={{ y: cloudY }}
        className="pointer-events-none absolute -top-8 right-0 z-0 w-[82%] max-w-[520px] select-none md:top-0 md:w-[54%] md:max-w-none lg:top-0 lg:h-[112%] lg:w-auto lg:max-w-[58%] lg:object-contain lg:object-right-top"
      />

      {/* quadrado outline (decorativo) */}
      <div className="pointer-events-none absolute right-[7%] top-[9%] z-10 aspect-square w-16 border border-black/80 md:w-24 lg:right-[6%] lg:top-[7%] lg:w-[138px]" />

      {/* régua vertical (direita) */}
      <div
        className="pointer-events-none absolute right-4 top-[8%] z-10 hidden h-[80%] w-4 md:block"
        style={TICKS_V}
      />
      {/* régua horizontal (base) */}
      <div
        className="pointer-events-none absolute bottom-[7%] right-[6%] z-10 hidden h-4 w-[46%] max-w-[684px] md:block"
        style={TICKS_H}
      />

      {/* bloco de texto */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="relative z-20 mx-auto flex min-h-screen max-w-[1440px] items-start px-6 pt-[80%] pb-24 md:items-center md:px-8 md:pt-0 md:pb-0 lg:px-[86px]"
      >
        <div className="max-w-[520px] md:max-w-[45%] lg:max-w-[560px]">
          <motion.img
            variants={item}
            src="/images/icon-elemento-02.png"
            alt=""
            aria-hidden="true"
            className="mb-6 h-8 w-8 object-contain md:mb-8 md:h-9 md:w-9"
          />

          <motion.h2
            variants={item}
            className="font-normal leading-[1.3] text-[22px] md:text-[30px] lg:text-[36px]"
          >
            <span className="text-[#d6d7d8]">Olhar em escala nano </span>
            <span className="font-medium text-nano-ink">é reduzir o nível de abstração </span>
            <span className="text-[#d6d7d8]">
              até que o que antes parecia definido volte a ser maleável.
            </span>
          </motion.h2>

          <motion.a
            variants={item}
            href="#"
            className="group mt-8 inline-flex items-center gap-2 text-[16px] font-medium text-nano-ink"
          >
            Explorar Tese
            <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
          </motion.a>
        </div>
      </motion.div>
    </section>
  )
}
