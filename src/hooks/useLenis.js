import { useEffect } from 'react'
import Lenis from 'lenis'

// Smooth scroll global. Base pros efeitos de scroll (parallax, reveal, etc).
export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis()
    let raf

    const loop = (time) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])
}
