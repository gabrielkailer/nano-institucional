import { useLenis } from './hooks/useLenis'
import Hero from './components/sections/Hero'
import Tese from './components/sections/Tese'

export default function App() {
  useLenis()

  return (
    <main>
      <Hero />
      <Tese />
      {/* Próximas seções entram aqui conforme os prints do Figma */}
    </main>
  )
}
