import { ArrowDown, MapPin, Zap } from 'lucide-react'
import photo from '../assets/foto.jpg'
set PHOTO_SRC = photo

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen pt-32 pb-16 px-6 flex flex-col justify-between relative overflow-hidden border-b border-black/10"
    >
      {/* Watermark */}
      <span
        aria-hidden="true"
        className="absolute right-0 top-1/2 -translate-y-[55%] font-mono font-bold text-[clamp(8rem,22vw,18rem)] leading-none text-transparent select-none pointer-events-none"
        style={{ WebkitTextStroke: '1px rgba(12,12,12,0.055)' }}
      >
        HF
      </span>

      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-[1fr_auto_1fr] gap-12 items-end relative z-10">

        {/* Kiri — teks */}
        <div>
          <span className="font-mono text-[0.6rem] tracking-[0.35em] uppercase text-accent block mb-6">
            // 2388010020 · Informatika · UINSSC
          </span>
          <h1
            className="font-mono font-bold leading-[0.92] tracking-tight mb-4"
            style={{ fontSize: 'clamp(2.8rem,7vw,5.5rem)' }}
          >
            Harits<br />Faqihuddin
          </h1>
          <p className="text-muted mb-6 leading-relaxed" style={{ fontSize: 'clamp(0.9rem,1.4vw,1.05rem)' }}>
            <strong className="text-ink font-semibold">Blockchain & Infrastructure Engineer</strong><br />
            Founder of Santara Labs · AI Agent Engineer at Solinkify
          </p>
          <p className="text-muted text-[0.92rem] leading-[1.85] max-w-[400px] mb-10">
            Semester 6 student shipping production blockchain infrastructure
            from a homelab in Cirebon. 7 live products under Santara Labs.
            Active LP on Meteora DLMM. Building in silence since 2024.
          </p>
          <div className="flex gap-3 flex-wrap">
            <a
              href="#projects"
              className="font-mono text-[0.65rem] tracking-[0.18em] uppercase px-6 py-3 bg-ink text-paper hover:bg-accent transition-colors"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="font-mono text-[0.65rem] tracking-[0.18em] uppercase px-6 py-3 border border-black/20 text-ink hover:border-accent hover:text-accent transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>

        {/* Tengah — foto */}
        <div className="flex flex-col items-center gap-3 self-end pb-2">
          <div className="relative overflow-hidden w-[200px] md:w-[230px] aspect-[3/4] border border-black/10">
            <img
              src={PHOTO_SRC}
              alt="Harits Faqihuddin"
              className="w-full h-full object-cover object-top"
            />
            {/* Label di bawah foto */}
            <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-ink/80 backdrop-blur-sm">
              <p className="font-mono text-[0.55rem] tracking-[0.15em] uppercase text-paper/70 text-center">
                Harits Faqihuddin
              </p>
            </div>
          </div>
          <span className="font-mono text-[0.52rem] tracking-[0.2em] uppercase text-muted">
            Cirebon, ID
          </span>
        </div>

        {/* Kanan — info table */}
        <div className="border-l border-black/10 pl-8 pb-2">
          {[
            { label: 'Focus',     value: 'Solana · EVM · DeFi · DePIN',    icon: null,                                         link: null },
            { label: 'Community', value: 'Superteam Indonesia · Solinkify', icon: null,                                         link: null },
            { label: 'Products',  value: '7 live — santaras.my.id',        icon: <Zap size={12} className="text-accent" />,    link: 'https://santaras.my.id' },
            { label: 'GitHub',    value: 'github.com/Frosky703',            icon: null,                                         link: 'https://github.com/Frosky703' },
            { label: 'X',         value: '@Frosky703',                      icon: null,                                         link: 'https://x.com/Frosky703' },
            { label: 'Location',  value: 'Cirebon, Indonesia',              icon: <MapPin size={12} className="text-muted" />, link: null },
          ].map(row => (
            <div
              key={row.label}
              className="py-[1rem] border-b border-black/[0.08] grid grid-cols-[80px_1fr] gap-3 items-start first:border-t first:border-black/[0.08]"
            >
              <span className="font-mono text-[0.54rem] tracking-[0.2em] uppercase text-muted pt-[3px]">
                {row.label}
              </span>
              <span className="text-[0.82rem] font-medium text-ink flex items-center gap-1.5">
                {row.icon}
                {row.link
                  ? <a href={row.link} target="_blank" rel="noreferrer" className="text-accent hover:underline">{row.value}</a>
                  : row.value
                }
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-6xl mx-auto w-full flex justify-between items-center pt-8 border-t border-black/10 relative z-10">
        <span className="font-mono text-[0.57rem] tracking-[0.25em] uppercase text-muted flex items-center gap-3">
          <ArrowDown size={12} /> Scroll to explore
        </span>
        <span className="font-mono text-[0.57rem] tracking-[0.18em] text-muted">Est. 2024 · Santara Labs</span>
      </div>
    </section>
  )
}