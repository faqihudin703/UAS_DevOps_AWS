const experiences = [
  {
    period: '2025 — Present',
    role: 'Founder & Lead Engineer',
    org: 'Santara Labs',
    badge: 'Full-time',
    desc: 'Building blockchain infrastructure: Weather Oracle, BI Oracle, Price Oracles (ETH/IDR + ETH/USDC), Santara Protocol (Base), Gas Station (Arbitrum), Cortex (Solana ↔ 0G), and Terminal bridge. Motto: "Engineered in Silence. Runs Everywhere."',
  },
  {
    period: '2026 — Present',
    role: 'AI Agent Engineer',
    org: 'Solinkify',
    badge: 'Part-time',
    desc: 'Published solinkify-ai-agent-sdk v1.1.0 to NPM. MCP server, x402 M2M payment flow on Solana, spending cap enforcement, invoice pre-validation, dual keypair mode.',
  },
  {
    period: '2026 — Present',
    role: 'Public Member',
    org: 'Superteam Indonesia',
    badge: 'Community',
    desc: 'Organic relationships with DevRel and Co-Lead. Contributed IDRN Phase 2 blockchain PoC. Submitted Panen Protocol to Colosseum Frontier 2026 and National Campus Hackathon.',
  },
  {
    period: '2026 — Present',
    role: 'Active LP — DLMM Pools',
    org: 'Meteora',
    badge: 'DeFi',
    desc: 'Active liquidity provider on Meteora\'s DLMM pools. Concentrated bin strategies on Solana & Hype pairs.',
  },
  {
    period: '2023 — Present',
    role: 'Informatics Student',
    org: 'UIN Siber Syekh Nurjati Cirebon',
    badge: 'Semester 6',
    desc: 'Undergraduate thesis: ModSecurity WAF effectiveness against OWASP Top 10. SHA-256 hashed attack-triggered logs pushed to Solana devnet via memo instruction — blockchain-backed audit integrity. Infrastructure: EC2 target, homelab attacker, Prometheus + Grafana via Tailscale.',
  },
]

export default function Experience() {
  return (
    <section id="experience" className="py-28 px-6 bg-paper2">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-baseline gap-5 mb-14 pb-5 border-b border-black/10">
          <span className="font-mono text-[0.57rem] tracking-[0.28em] uppercase text-accent">// 03</span>
          <h2 className="text-[clamp(1.6rem,3vw,2.4rem)] font-semibold tracking-tight">Experience</h2>
        </div>

        <div className="flex flex-col">
          {experiences.map((e, i) => (
            <div
              key={i}
              className="grid md:grid-cols-[150px_1fr_auto] gap-6 md:gap-10 py-8 border-b border-black/10 group"
            >
              <span className="font-mono text-[0.58rem] tracking-[0.1em] text-muted leading-relaxed pt-0.5">
                {e.period}
              </span>
              <div>
                <h3 className="text-[1rem] font-semibold tracking-tight mb-1 group-hover:text-accent transition-colors">
                  {e.role}
                </h3>
                <p className="font-mono text-[0.7rem] tracking-[0.06em] text-accent mb-3">{e.org}</p>
                <p className="text-[0.85rem] leading-[1.72] text-muted max-w-xl">{e.desc}</p>
              </div>
              <span className="font-mono text-[0.54rem] tracking-[0.14em] uppercase px-3 py-1.5 border border-black/10 text-muted h-fit whitespace-nowrap self-start">
                {e.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
