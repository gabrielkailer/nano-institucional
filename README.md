# Nano Holding — Site Institucional

Site institucional montado a partir do design do Figma.

## Stack
- **Vite 8** + **React 19** — build/dev rápido
- **Tailwind CSS 4** — estilo (config CSS-first em `src/index.css`)
- **Framer Motion** — animações de UI (reveal, hover, transições)
- **GSAP** + **@gsap/react** — animações de scroll/timeline mais pesadas
- **Lenis** — smooth scroll global

## Rodar
```bash
npm install      # primeira vez
npm run dev      # servidor de desenvolvimento
npm run build    # build de produção → dist/
npm run preview  # pré-visualizar o build
```

## Estrutura
```
assets/figma-exports/   → prints do Figma (referência, não vão pro site)
  desktop/ tablet/ mobile/
public/                 → assets servidos direto (favicon, /images reais)
  images/
src/
  main.jsx              → entry
  App.jsx               → composição das seções
  index.css             → tokens (cores/fontes) + Tailwind
  hooks/useLenis.js     → smooth scroll
  components/
    sections/           → uma seção por arquivo (Hero, Sobre, ...)
```

## Fluxo de trabalho
1. Exporta as seções do Figma → `assets/figma-exports/{desktop,tablet,mobile}/`
2. Manda os prints pra mim.
3. Monto cada seção em `src/components/sections/` (responsivo: mobile → tablet → desktop).
4. Assets reais (logo, fotos) vão em `public/images/`.
