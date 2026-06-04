const skillGroups = [
  {
    label: 'Blockchain',
    skills: ['Solana / Anchor 1.0', 'EVM / Solidity', 'Web3.js', 'ethers.js', 'Anchor IDL', 'DePIN'],
  },
  {
    label: 'DeFi & On-chain',
    skills: ['Meteora DLMM', 'LP Management', 'AMM Strategy', 'BI Oracle', 'Price Feeds', 'x402 M2M'],
  },
  {
    label: 'Infrastructure & Cloud',
    skills: ['Docker', 'GitHub Actions', 'AWS EC2', 'Nginx', 'Cloudflare Tunnel', 'Tailscale', 'Mikrotik'],
  },
  {
    label: 'Languages & Frameworks',
    skills: ['TypeScript', 'Rust', 'Node.js', 'Next.js', 'React', 'Python', 'Golang'],
  },
  {
    label: 'Security & Monitoring',
    skills: ['CTF', 'ModSecurity / WAF', 'OWASP Top 10', 'Prometheus', 'Grafana', 'N8N'],
  },
]

export default function About() {
  return (
    <section id="about" className="py-28 px-6 bg-ink text-paper">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-baseline gap-5 mb-14 pb-5 border-b border-white/08">
          <span className="font-mono text-[0.57rem] tracking-[0.28em] uppercase text-accent">// 01</span>
          <h2 className="text-[clamp(1.6rem,3vw,2.4rem)] font-semibold tracking-tight">About & Skills</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          <div className="space-y-5">
            <p className="text-[0.97rem] leading-[1.88] text-white/60">
              Started with <strong className="text-paper font-semibold">networking and server administration</strong>,
              got pulled into blockchain after a campus seminar in late 2023. Within a year I was running
              production oracle infrastructure on Solana, writing Anchor programs, and building DePIN nodes on ESP32.
            </p>
            <p className="text-[0.97rem] leading-[1.88] text-white/60">
              Under <strong className="text-paper font-semibold">Santara Labs</strong> I operate a full oracle
              and data infrastructure stack: Weather Oracle (BMKG, 6 nodes, 99.997% uptime), BI Oracle
              (Bank Indonesia forex rates), Price Oracles on Base Sepolia and Arbitrum Sepolia with 2.7M+
              combined datapoints, Santara Protocol (Digital Rupiah ecosystem — IDRX/NXS/wSAN on Base Sepolia),
              Gas Station (Arbitrum), and Cortex (Solana ↔ 0G AI bridge). The whole stack runs on a homelab.
            </p>
            <p className="text-[0.97rem] leading-[1.88] text-white/60">
              On the DeFi side, I actively manage liquidity on{' '}
              <strong className="text-paper font-semibold">Meteora DLMM</strong> — concentrated bin strategies
              on high-volume Solana pairs, with rebalancing signals tied to Santara's own oracle feeds.
            </p>
            <p className="text-[0.97rem] leading-[1.88] text-white/60">
              I contribute as an <strong className="text-paper font-semibold">AI Agent Engineer at Solinkify</strong>,
              where I published{' '}
              <code className="font-mono text-[0.83em] text-white/50">solinkify-ai-agent-sdk</code> v1.1.0 to NPM —
              MCP server with x402 M2M payments on Solana, spending cap, dual keypair mode. I'm also a
              Superteam Indonesia member and IDRN Phase 2 blockchain contributor.
            </p>
          </div>

          <div className="space-y-7">
            {skillGroups.map(group => (
              <div key={group.label}>
                <span className="font-mono text-[0.56rem] tracking-[0.25em] uppercase text-white/28 block mb-3">
                  {group.label}
                </span>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map(s => (
                    <span
                      key={s}
                      className="font-mono text-[0.6rem] tracking-[0.12em] px-3 py-1.5 border border-white/12 text-white/50 hover:border-accent hover:text-accent transition-colors cursor-default"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}