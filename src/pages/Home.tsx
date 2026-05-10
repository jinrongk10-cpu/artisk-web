import { useRef, useEffect, useState, useCallback, useMemo } from 'react'
import { ArrowRight } from 'lucide-react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'

const SPRING = { stiffness: 80, damping: 14, mass: 1.5 }
const SPRING_SLOW = { stiffness: 60, damping: 12, mass: 2 }
const SPRING_TAP = { stiffness: 300, damping: 20, mass: 0.5 }

const CARD_SHADOW_BASE =
  '0 1px 2px rgba(0,0,0,0.02), 0 4px 16px rgba(0,0,0,0.04)'
const CARD_SHADOW_HOVER =
  '0 2px 4px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.08)'
const CARD_SHADOW_LIGHT_HOVER =
  '0 1px 3px rgba(0,0,0,0.03), 0 4px 16px rgba(0,0,0,0.06)'

const content = {
  brand: {
    name: 'Artisk',
    logoSrc: '/logo.png',
  },
  hero: {
    headline: 'Build a Brand that Scales.',
    subheadline:
      "Artisk understands the world your brand is entering. Your competitors, your audience, your opening.\nWe don't just generate assets. We build a system that learns and evolves with your brand.",
    ctaLabel: 'Build my brand system',
    images: {
      vertical: [
        '/Home/hero-case-.png',
        '/Home/hero-case- 2.png',
        '/Home/hero-case- 5.png',
        '/Home/hero-case- 6.png',
        '/Home/hero-case- 7.png',
        '/Home/hero-case- 9.png',
      ],
      horizontal: [
        '/Home/hero-case- 3.png',
        '/Home/hero-case- 4.png',
        '/Home/hero-case- 8.png',
      ],
    },
    labels: [
      ['Identity', 'Typography', 'Campaign'],
      ['Color', 'Digital', 'Layout'],
      ['Motion', 'Scale', 'System'],
    ],
  },
  coreFeatures: {
    headline: 'Brand personality consistent in every touchpoint',
    subheadline:
      'From packaging to social media, your system thinks ahead so all assets follow the same brand system. Nothing ever starts from scratch.',
    items: [
      {
        title: 'Build your visual identity',
        body: 'Your logo, color, and type, designed around where your brand stands. Not just what looks good today.',
        img: '/Home/feature-1.png',
      },
      {
        title: 'Everything in a consistent system',
        body: 'Artisk connects identity, rules, and memory so brands scale fast without losing consistency.',
        img: '/Home/feature-2.png',
      },
      {
        title: 'Built for digital growth',
        body: 'From social stories and posts to online banners, Artisk builds you brand-ready visuals across every digital touchpoint.',
        img: '/Home/feature-3.png',
      },
      {
        title: "Always ready for what's next",
        body: 'Artisk anticipates what you need before you ask. Campaigns, launches, merch drops. Already waiting in the right folder.',
        img: '/Home/feature-4.png',
      },
    ],
  },
  whyArtisk: {
    subheadline:
      'People forget. Prompts reset. Artisk gives your brand a system that never does.',
    columns: [
      {
        title: 'Traditional design',
        bullets: [
          'Knowledge lives in people',
          'Context resets every project',
          'Assets get scattered across tools',
        ],
      },
      {
        title: 'Generic AI tools',
        bullets: [
          'Fast outputs, weak context',
          'No persistent decision layer',
          'Every new prompt starts over',
        ],
      },
      {
        title: 'Artisk',
        bullets: [
          'Identity, rules, assets, decisions connected',
          'Outputs stay aligned with the system',
          'Brand intelligence compounds over time',
        ],
      },
    ],
  },
  testimonials: [
    {
      title: 'Effortless branding for startups',
      quote:
        "I launched my skincare brand in two weeks \u2014 something that would\u2019ve taken months with an agency. Artisk gave me a logo, color palette, and social templates that actually feel like me, not a template.",
      name: 'Lena Park',
      role: 'Founder, Glow Theory',
      avatar: '/Home/avatar-lena.png',
    },
    {
      title: 'Unique & Authentic logo designs',
      quote:
        'I was skeptical an AI could deliver a logo with real personality. But Artisk understood our brand positioning and gave us something distinctive \u2014 not another generic mark. Our investors noticed.',
      name: 'David Akindele',
      role: 'Head of Brand, Sati Labs',
      avatar: '/Home/avatar-david.png',
    },
    {
      title: 'Fast Track to Polished Brand and Identity',
      quote:
        'We rebranded across 12 touchpoints \u2014 packaging, web, trade show booth \u2014 in under a week. Every asset pulled from the same system, so nothing looked out of place. Our design team now spends less time fixing consistency and more time on creative work.',
      name: 'Noah Grant',
      role: 'Creative Director, Crimson & Co',
      avatar: '/Home/avatar-noah.png',
    },
  ],
  faq: {
    eyebrow: 'Have questions?',
    title: 'Answers.',
    items: [
      {
        q: 'How do design credits work?',
        a: '1 credit per design, 2 credits for SVG files, and 10 credits to start a brand kit.',
      },
      {
        q: 'Do I need design experience to use Artisk?',
        a: 'No. Artisk guides you through building a brand system and keeps every output consistent with your approved rules.',
      },
      {
        q: 'Can I export assets and use them outside Artisk?',
        a: 'Yes. You can download high-quality outputs and use them across real-world and digital touchpoints.',
      },
      {
        q: 'What happens if I need more designs?',
        a: 'Standard and Pro can add Top Up design credits instantly without changing your plan.',
      },
      {
        q: 'Can you help with manufacturing?',
        a: 'Yes. The Manufacture option connects you with Artisk experts for materials, finishes, and production guidance.',
      },
    ],
  },
  footer: {
    description: 'Artisk builds brand systems that learn and evolve with you.',
    product: ['Features', 'Use Cases', 'Changelog'],
    company: ['About', 'Careers', 'Press Kit', 'Contact'],
    resources: ['Blog', 'Help Center', 'API Docs', 'Community'],
    social: { twitter: '#', linkedin: '#', instagram: '#' },
    copyright: '\u00a9 2025 Artisk',
    legal: ['Terms', 'Privacy', 'Cookies'],
  },
} as const

const navLinks = [
  'Features',
  'Use cases',
  'Inspirations',
  'Pricing',
  'Company',
  'Blog',
]

function useScrollReveal(staggerIndex = 0, offsetEnd = 0.2) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 1.2', `end ${offsetEnd}`],
  })

  const staggerShift = staggerIndex * 0.08
  const y = useTransform(
    scrollYProgress,
    [0 + staggerShift, 0.15 + staggerShift, 0.8, 1],
    [80, 0, 0, -80],
  )
  const opacity = useTransform(
    scrollYProgress,
    [0 + staggerShift, 0.12 + staggerShift, 0.85, 1],
    [0, 1, 1, 0],
  )

  return {
    ref,
    style: {
      y: useSpring(y, SPRING),
      opacity: useSpring(opacity, SPRING),
    },
  }
}

export default function Home() {
  return (
    <div className="relative min-h-screen text-[rgba(0,0,0,0.85)]">
      <BackgroundOrbs />
      <Header />
      <main>
        <HeroSection />
        <SectionDivider />
        <CoreFeatures />
        <SectionDivider />
        <WhyArtisk />
        <SectionDivider />
        <Testimonials />
        <SectionDivider />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}

function HeroSection() {
  return (
    <section>
      <Hero />
      <PinnedImageWall />
    </section>
  )
}

function SectionDivider() {
  return (
    <div className="mx-auto max-w-6xl px-6">
      <div className="border-t border-[rgba(0,0,0,0.05)]" />
    </div>
  )
}

type Pos = { left: number; top: number }

const ZONES = [
  { left: [5, 35], top: [-15, 25] },
  { left: [50, 85], top: [-10, 30] },
]

function randomPos(zone: (typeof ZONES)[number], existing: Pos[]): Pos {
  for (let attempt = 0; attempt < 30; attempt++) {
    const left = zone.left[0] + Math.random() * (zone.left[1] - zone.left[0])
    const top = zone.top[0] + Math.random() * (zone.top[1] - zone.top[0])
    const tooClose = existing.some(
      (p) => Math.hypot(p.left - left, p.top - top) < 40,
    )
    if (!tooClose) return { left, top }
  }
  return {
    left: zone.left[0] + Math.random() * (zone.left[1] - zone.left[0]),
    top: zone.top[0] + Math.random() * (zone.top[1] - zone.top[0]),
  }
}

function BackgroundOrbs() {
  const [targets, setTargets] = useState<Pos[]>(() => {
    const a = randomPos(ZONES[0], [])
    const b = randomPos(ZONES[1], [a])
    return [a, b]
  })

  const tick = useCallback(() => {
    setTargets((prev) => {
      const next: Pos[] = []
      for (let i = 0; i < 2; i++) {
        const others = [...next, ...prev.filter((_, j) => j !== i)]
        next.push(randomPos(ZONES[i], others))
      }
      return next
    })
  }, [])

  useEffect(() => {
    const id = setInterval(tick, 6000)
    return () => clearInterval(id)
  }, [tick])

  return (
    <>
      {targets.map((t, i) => (
        <motion.div
          key={i}
          className="orb-container"
          animate={{
            left: `${t.left}%`,
            top: `${t.top}%`,
          }}
          transition={{
            type: 'spring',
            stiffness: 8,
            damping: 6,
            mass: 3,
          }}
          style={{
            transform: `translate(-50%, -50%)`,
          }}
        >
          <div className={`orb-inner orb-inner--${i + 1}`} />
        </motion.div>
      ))}
    </>
  )
}

function Header() {
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 18, mass: 0.8 }}
      className="glass-header sticky top-0 z-50"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="/" className="flex-shrink-0">
          <img src={content.brand.logoSrc} alt={content.brand.name} className="h-7 w-auto" />
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`/${link.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-[13px] font-medium text-[rgba(0,0,0,0.55)] transition-colors duration-200 hover:text-[rgba(0,0,0,0.8)]"
            >
              {link}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="/log-in"
            className="text-[13px] font-medium text-[rgba(0,0,0,0.55)] transition-colors duration-200 hover:text-[rgba(0,0,0,0.8)]"
          >
            Log In
          </a>
          <a
            href="/sign-in"
            className="text-[13px] font-semibold text-[#0A0F0C] transition-colors duration-200 hover:text-[rgba(0,0,0,0.7)]"
          >
            Sign In
          </a>
        </div>
      </div>
    </motion.header>
  )
}

function Hero() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 pb-2 pt-12 md:pb-4 md:pt-16">
      <div className="relative z-10 mx-auto text-center">
        <h1 className="text-[40px] font-medium leading-[1.1] tracking-tight text-[#0A0F0C] md:text-[64px] whitespace-nowrap">
          {content.hero.headline}
        </h1>
        <p className="mx-auto mt-4 whitespace-pre-wrap text-pretty text-[16px] leading-relaxed text-[rgba(0,0,0,0.6)] md:text-[18px]">
          {content.hero.subheadline}
        </p>
        <div className="mt-20 flex justify-center">
          <motion.button
            whileHover={{ y: -2, boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}
            whileTap={{ y: 0 }}
            transition={{ type: 'spring', ...SPRING_TAP }}
            type="button"
            className="btn-primary"
          >
            {content.hero.ctaLabel}
            <ArrowRight className="h-4 w-4" />
          </motion.button>
        </div>
      </div>
    </section>
  )
}

function PinnedImageWall() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  })

  const progress = useTransform(scrollYProgress, [0, 1], [0, 1])

  const [scale, setScale] = useState(1)

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      const baseW = 1280
      const s = Math.min(Math.max(w / baseW, 0.7), 1.25)
      setScale(s)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const offsets = useMemo(
    () => [
      [
        { x: -160 * scale, y: 15 * scale },
        { x: -25 * scale, y: 30 * scale },
        { x: 140 * scale, y: 15 * scale },
      ],
      [
        { x: -180 * scale, y: 20 * scale },
        { x: 0, y: 35 * scale },
        { x: 160 * scale, y: 20 * scale },
      ],
      [
        { x: -120 * scale, y: 30 * scale },
        { x: 30 * scale, y: 40 * scale },
        { x: 190 * scale, y: 30 * scale },
      ],
    ],
    [scale],
  )

  const { vertical, horizontal } = content.hero.images
  const labelText = content.hero.labels

  const rowsData = [
    [vertical[0], vertical[1], horizontal[0]],
    [vertical[2], horizontal[1], vertical[3]],
    [horizontal[2], vertical[4], vertical[5]],
  ]

  const labelOpacity = useTransform(progress, [0.3, 0.75], [0, 1])
  const labelYRaw = useTransform(progress, [0.3, 0.75], [12, 0])
  const labelY = useSpring(labelYRaw, SPRING)

  const rowGap = useSpring(useTransform(progress, [0, 1], [50 * scale, 28 * scale]), SPRING_SLOW)
  const colGap = useSpring(useTransform(progress, [0, 1], [50 * scale, 28 * scale]), SPRING_SLOW)

  return (
    <div ref={wrapperRef} style={{ height: '150vh' }}>
      <div
        className="sticky top-0 h-screen flex items-start justify-center"
        style={{
          paddingTop: `${80 * scale}px`,
          paddingBottom: `${64 * scale}px`,
        }}
      >
        <motion.div
          className="hero-image-wall"
          style={{
            gap: rowGap,
          }}
        >
          {rowsData.map((row, rowIdx) => (
            <motion.div
              key={rowIdx}
              className="hero-image-row"
              style={{ gap: colGap }}
            >
              {row.map((src, colIdx) => {
                const off = offsets[rowIdx][colIdx]
                const x = useSpring(
                  useTransform(progress, [0, 1], [0, off.x]),
                  SPRING_SLOW,
                )
                const y = useSpring(
                  useTransform(progress, [0, 1], [0, off.y]),
                  SPRING_SLOW,
                )
                const isHorizontal =
                  (rowIdx === 0 && colIdx === 2) ||
                  (rowIdx === 1 && colIdx === 1) ||
                  (rowIdx === 2 && colIdx === 0)
                return (
                  <motion.div
                    key={colIdx}
                    className="relative flex-shrink-0"
                    style={{ x, y }}
                  >
                    <img
                      src={src}
                      alt=""
                      loading="lazy"
                      className="hero-image"
                      style={{
                        width: isHorizontal ? `${340 * scale}px` : `${160 * scale}px`,
                        height: `${200 * scale}px`,
                      }}
                    />
                    <motion.span
                      className="absolute left-1/2 -translate-x-1/2 font-semibold uppercase tracking-wider text-[rgba(0,0,0,0.45)] whitespace-nowrap"
                      style={{
                        top: `calc(100% + ${10 * scale}px)`,
                        opacity: labelOpacity,
                        y: labelY,
                        fontSize: `${11 * scale}px`,
                      }}
                    >
                      {labelText[rowIdx][colIdx]}
                    </motion.span>
                  </motion.div>
                )
              })}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

function CoreFeatures() {
  const { ref, style } = useScrollReveal()

  return (
    <section ref={ref} className="mx-auto max-w-6xl px-6 py-32 md:py-40">
      <div className="max-w-2xl">
        <motion.div style={style}>
          <div className="text-[12px] font-semibold tracking-wider uppercase text-[rgba(0,0,0,0.45)]">
            Core Features
          </div>
          <h2 className="mt-3 text-balance text-[30px] font-semibold leading-[1.2] tracking-tight text-[#0A0F0C] md:text-[36px]">
            {content.coreFeatures.headline}
          </h2>
          <p className="mt-4 text-pretty text-[15px] leading-relaxed text-[rgba(0,0,0,0.6)] md:text-[16px]">
            {content.coreFeatures.subheadline}
          </p>
        </motion.div>
      </div>

      <div className="mt-20 flex flex-col" style={{ gap: '120px' }}>
        {content.coreFeatures.items.map((item, idx) => {
          const even = idx % 2 === 0
          return (
            <RevealBlock key={item.title} index={idx}>
              <div className={`flex flex-col gap-10 md:flex-row md:items-center md:gap-20 ${even ? '' : 'md:flex-row-reverse'}`}>
                <div className="flex-1">
                  <div className="text-[64px] font-semibold leading-none tracking-tighter text-[rgba(0,0,0,0.06)] mb-5">
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  <h3 className="text-[17px] font-semibold text-[rgba(0,0,0,0.85)] md:text-[18px]">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-[14px] leading-relaxed text-[rgba(0,0,0,0.55)] max-w-md">
                    {item.body}
                  </p>
                </div>
                <div className="flex-1">
                  <img
                    src={item.img}
                    alt=""
                    loading="lazy"
                    className="aspect-[16/9] w-full rounded-2xl border border-[rgba(0,0,0,0.06)] object-cover"
                  />
                </div>
              </div>
            </RevealBlock>
          )
        })}
      </div>
    </section>
  )
}

function WhyArtisk() {
  const { ref, style } = useScrollReveal()

  return (
    <section ref={ref} className="mx-auto max-w-6xl px-6 py-32 md:py-40">
      <div className="max-w-3xl">
        <motion.div style={style}>
          <div className="text-[12px] font-semibold tracking-wider uppercase text-[rgba(0,0,0,0.45)]">
            Why Artisk
          </div>
          <p className="mt-3 text-pretty text-[18px] font-medium leading-relaxed text-[rgba(0,0,0,0.75)] md:text-[20px]">
            {content.whyArtisk.subheadline}
          </p>
        </motion.div>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {content.whyArtisk.columns.map((col, idx) => {
          const isArtisk = col.title === 'Artisk'
          return (
            <RevealBlock key={col.title} index={idx}>
              <HoverCard light={!isArtisk}>
                <div
                  className={`glass-card rounded-2xl p-6 ${isArtisk ? '' : 'glass-card--light'}`}
                >
                  <h3 className="text-[16px] font-semibold text-[rgba(0,0,0,0.85)]">
                    {col.title}
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {col.bullets.map((b) => (
                      <li key={b} className="flex gap-3">
                        <span
                          className={
                            isArtisk
                              ? 'why-bullet why-bullet--active'
                              : 'why-bullet why-bullet--default'
                          }
                        />
                        <span className="text-[13px] leading-relaxed text-[rgba(0,0,0,0.55)]">
                          {b}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </HoverCard>
            </RevealBlock>
          )
        })}
      </div>
    </section>
  )
}

function Testimonials() {
  const { ref, style } = useScrollReveal()
  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <section ref={ref} className="mx-auto max-w-6xl px-6 py-32 md:py-40">
      <motion.div style={style} className="mb-14">
        <div className="text-[12px] font-semibold tracking-wider uppercase text-[rgba(0,0,0,0.45)]">
          Testimonials
        </div>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-3">
        {content.testimonials.map((t, idx) => {
          const isOpen = expanded === idx
          return (
            <RevealBlock key={t.title} index={idx}>
              <motion.div
                layout
                onClick={() => setExpanded(isOpen ? null : idx)}
                className="cursor-pointer"
              >
                <motion.div
                  layout
                  className="glass-card glass-card--light rounded-2xl p-6"
                  whileHover={isOpen ? {} : { y: -4, boxShadow: CARD_SHADOW_LIGHT_HOVER }}
                  transition={{ type: 'spring', stiffness: 120, damping: 15, mass: 0.8 }}
                  style={{ boxShadow: isOpen ? CARD_SHADOW_LIGHT_HOVER : CARD_SHADOW_BASE }}
                >
                  <motion.h3 layout className="text-[16px] font-semibold text-[rgba(0,0,0,0.85)]">
                    {t.title}
                  </motion.h3>
                  <motion.p layout className="mt-4 text-[13px] leading-relaxed text-[rgba(0,0,0,0.55)]">
                    &ldquo;{t.quote}&rdquo;
                  </motion.p>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="mt-5 pt-5 border-t border-[rgba(0,0,0,0.06)] space-y-4">
                          <div>
                            <div className="text-[11px] font-semibold uppercase tracking-wider text-[rgba(0,0,0,0.35)] mb-1">Company</div>
                            <div className="text-[13px] text-[rgba(0,0,0,0.65)]">{t.role}</div>
                          </div>
                          <div>
                            <div className="text-[11px] font-semibold uppercase tracking-wider text-[rgba(0,0,0,0.35)] mb-1">Impact</div>
                            <div className="text-[13px] leading-relaxed text-[rgba(0,0,0,0.55)]">
                              Artisk enabled this team to ship faster while maintaining brand consistency across all touchpoints.
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <motion.div layout className="mt-6 flex items-center gap-3">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="text-[13px] font-semibold text-[rgba(0,0,0,0.7)]">
                        {t.name}
                      </div>
                      <div className="text-[11px] text-[rgba(0,0,0,0.4)]">{t.role.split(',')[0]}</div>
                    </div>
                    <motion.div
                      className="ml-auto"
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <span className="text-[16px] text-[rgba(0,0,0,0.25)]">+</span>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </RevealBlock>
          )
        })}
      </div>
    </section>
  )
}

function FAQ() {
  const { ref, style } = useScrollReveal()

  return (
    <section ref={ref} className="mx-auto max-w-6xl px-6 py-32 md:py-40">
      <div className="max-w-3xl">
        <motion.div style={style}>
          <div className="text-[12px] font-semibold text-[rgba(0,0,0,0.45)]">
            {content.faq.eyebrow}
          </div>
          <h2 className="mt-3 text-[30px] font-semibold leading-[1.2] tracking-tight text-[#0A0F0C] md:text-[36px]">
            {content.faq.title}
          </h2>
        </motion.div>
      </div>

      <div className="mt-14 space-y-3">
        {content.faq.items.map((item, idx) => (
          <RevealBlock key={item.q} index={idx}>
            <details className="faq-item">
              <summary>
                <span className="text-pretty">{item.q}</span>
                <span className="faq-toggle">+</span>
              </summary>
              <div className="faq-answer">{item.a}</div>
            </details>
          </RevealBlock>
        ))}
      </div>
    </section>
  )
}

function Footer() {
  const groupedLinks = [
    { label: 'Product', links: content.footer.product },
    { label: 'Company', links: content.footer.company },
    { label: 'Resources', links: content.footer.resources },
  ]

  return (
    <footer className="border-t border-[rgba(0,0,0,0.06)]" style={{ background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex flex-col gap-16 md:flex-row md:justify-between">
          <div className="max-w-xs">
            <img
              src={content.brand.logoSrc}
              alt={content.brand.name}
              className="h-7 w-auto"
            />
            <p className="mt-4 text-[13px] leading-relaxed text-[rgba(0,0,0,0.65)]">
              {content.footer.description}
            </p>
          </div>

          <div className="flex gap-24">
            {groupedLinks.map((group) => (
              <div key={group.label}>
                <h4 className="text-[13px] font-semibold text-[rgba(0,0,0,0.85)]">{group.label}</h4>
                <ul className="mt-3 space-y-2">
                  {group.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="text-[13px] text-[rgba(0,0,0,0.65)] transition-colors duration-200 hover:text-[rgba(0,0,0,0.9)]"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-[rgba(0,0,0,0.06)] pt-8 md:flex-row">
          <div className="flex items-center gap-6 text-[12px] text-[rgba(0,0,0,0.5)]">
            <span>{content.footer.copyright}</span>
            {content.footer.legal.map((l) => (
              <a
                key={l}
                href="#"
                className="transition-colors duration-200 hover:text-[rgba(0,0,0,0.8)]"
              >
                {l}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4 text-[rgba(0,0,0,0.5)]">
            <a href={content.footer.social.twitter} className="text-[13px] transition-colors duration-200 hover:text-[rgba(0,0,0,0.8)]">𝕏</a>
            <a href={content.footer.social.linkedin} className="text-[13px] transition-colors duration-200 hover:text-[rgba(0,0,0,0.8)]">in</a>
            <a href={content.footer.social.instagram} className="text-[13px] transition-colors duration-200 hover:text-[rgba(0,0,0,0.8)]">📷</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

function RevealBlock({ children, index = 0 }: { children: React.ReactNode; index?: number }) {
  const { ref, style } = useScrollReveal(index)

  return (
    <motion.div ref={ref} style={style}>
      {children}
    </motion.div>
  )
}

function HoverCard({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <motion.div
      whileHover={{
        y: light ? -4 : -6,
        boxShadow: light ? CARD_SHADOW_LIGHT_HOVER : CARD_SHADOW_HOVER,
      }}
      transition={{ type: 'spring', stiffness: 120, damping: 15, mass: 0.8 }}
      style={{ boxShadow: CARD_SHADOW_BASE }}
    >
      {children}
    </motion.div>
  )
}
