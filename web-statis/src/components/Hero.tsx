import { ArrowDown, MapPin, Zap } from 'lucide-react'

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

      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-[1.15fr_0.85fr] gap-16 items-end relative z-10">
        {/* Left */}
        <div>
          <span className="font-mono text-[0.6rem] tracking-[0.35em] uppercase text-accent block mb-6">
            // 2388010020 · Informatika · UINSSC
          </span>

          <h1 className="font-mono font-bold leading-[0.92] tracking-tight mb-4"
              style={{ fontSize: 'clamp(2.8rem,8vw,6rem)' }}>
            Harits<br />Faqihuddin
          </h1>

          <p className="text-muted mb-8 leading-relaxed max-w-md" style={{ fontSize: 'clamp(0.95rem,1.5vw,1.15rem)' }}>
            <strong className="text-ink font-semibold">Blockchain & Infrastructure Engineer</strong><br />
            Founder of Santara Labs · AI Agent Engineer at Solinkify
          </p>

          <p className="text-muted text-[0.95rem] leading-[1.85] max-w-[460px] mb-10">
            Semester 6 student shipping production blockchain infrastructure from a homelab in Cirebon.
            7 live products under Santara Labs — oracles, DeFi protocols, a Solana<->0G bridge, and an NPM SDK.
            Active LP on Meteora DLMM. Building in silence since 2025.
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

        {/* Right — info table */}
        <div className="border-l border-black/10 pl-10 pb-2">
          {[
            { label: 'Location',  value: 'Cirebon, Indonesia', icon: <MapPin size={12} className="text-muted" /> },
            { label: 'Focus',     value: 'Solana · EVM · DeFi · Infra' },
            { label: 'Community', value: 'Superteam Indonesia · Solinkify' },
            { label: 'Building',  value: 'Santara Labs — oracle & data infra', icon: <Zap size={12} className="text-accent" /> },
            { label: 'GitHub',    value: 'github.com/faqihudin703', link: 'https://github.com/faqihudin703' },
            { label: 'X',         value: '@Frosky703', link: 'https://x.com/Frosky703' },
          ].map(row => (
            <div key={row.label} className="py-[1.1rem] border-b border-black/08 grid grid-cols-[90px_1fr] gap-3 items-start first:border-t first:border-black/08">
              <span className="font-mono text-[0.55rem] tracking-[0.2em] uppercase text-muted pt-[3px]">
                {row.label}
              </span>
              <span className="text-[0.87rem] font-medium text-ink flex items-center gap-1.5">
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
        <span className="font-mono text-[0.57rem] tracking-[0.18em] text-muted">Est. 2025 · Santara Labs</span>
      </div>
    </section>
  )
}
