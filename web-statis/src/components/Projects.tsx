import { ArrowUpRight } from 'lucide-react'

const projects = [
  {
    num: '01',
    name: 'Santara Weather Oracle',
    desc: 'Live weather data from BMKG stations across Indonesia, pushed on-chain to Solana. Running 6 nodes across 52 feeds with over 25,000 transactions processed. 99.997% uptime since launch.',
    tags: ['Solana', 'Anchor', 'DePIN', 'SQLite'],
    link: 'https://oracle.santaras.my.id',
    linkLabel: 'oracle.santaras.my.id',
  },
  {
    num: '02',
    name: 'Panen Protocol',
    desc: 'DeFi invoice financing for Indonesian SMEs on Solana devnet. 80% advance, 3.5% fee split (3% LP + 0.5% treasury), XGBoost AI classifier (F1=0.9815), bilingual frontend ID/EN.',
    tags: ['Solana', 'Anchor 1.0', 'Next.js', 'XGBoost'],
    link: 'https://panen.santaras.my.id',
    linkLabel: 'panen.santaras.my.id',
  },
  {
    num: '03',
    name: 'Santara Protocol',
    desc: 'Digital Rupiah Ecosystem on Base Sepolia. Three-step flow: get Digital Rupiah instantly via swap → deposit into the Vault to earn yield passively → cash out rewards into USDC anytime. Saving. Yielding. Spending.',
    tags: ['Base Sepolia', 'EVM', 'Digital Rupiah', 'DeFi', 'Vault'],
    link: 'https://protocol.santaras.my.id',
    linkLabel: 'protocol.santaras.my.id',
  },
  {
    num: '04',
    name: 'Santara Gas Station',
    desc: 'Lending and gas infrastructure on Arbitrum Sepolia. Part of the Santara EVM infrastructure suite alongside the Price Oracle USDC (1.47M+ datapoints).',
    tags: ['Arbitrum Sepolia', 'EVM', 'Lending', 'Infra'],
    link: 'https://station.santaras.my.id',
    linkLabel: 'station.santaras.my.id',
  },
  {
    num: '05',
    name: 'Santara BI Oracle',
    desc: 'Solana oracle feeding official Bank Indonesia forex rates on-chain. Authority-only writes, daily update enforcement with business day validation, spread validation, _reserved fields for upgrade safety.',
    tags: ['Solana', 'Anchor', 'Forex', 'BI Rate'],
    link: 'https://bi-oracle.santaras.my.id',
    linkLabel: 'bi-oracle.santaras.my.id',
  },
  {
    num: '06',
    name: 'Santara Price Oracle',
    desc: 'Dual-chain price oracle dashboard. ETH/IDR (Base Sepolia, Indodax, 1.27M+ datapoints) and ETH/USDC (Arbitrum Sepolia, Binance, 1.47M+ datapoints). Anti-DELETE SQLite triggers, true lifetime counter.',
    tags: ['Base Sepolia', 'Arbitrum', 'Price Feed', 'SQLite'],
    link: 'https://price-oracle.santaras.my.id',
    linkLabel: 'price-oracle.santaras.my.id',
  },
  {
    num: '07',
    name: 'Santara Cortex',
    desc: 'Solana ↔ 0G AI bridge for AI-powered NFTs. Connects Solana on-chain assets with 0G decentralized AI compute layer for inference and model execution.',
    tags: ['Solana', '0G Network', 'AI NFT', 'Bridge'],
    link: 'https://cortex.santaras.my.id',
    linkLabel: 'cortex.santaras.my.id',
  },
  {
    num: '08',
    name: 'solinkify-ai-agent-sdk',
    desc: 'NPM package v1.1.0 — installable globally via npm install -g. MCP server, x402 M2M payments on Solana, spending cap enforcement, invoice pre-validation, dual keypair mode. Published under the Solinkify ecosystem.',
    tags: ['NPM', 'MCP', 'x402', 'Solana', 'TypeScript'],
    link: 'https://www.npmjs.com/package/solinkify-ai-agent-sdk',
    linkLabel: 'npmjs.com',
  },
  {
    num: '09',
    name: 'Meteora DLMM LP Strategy',
    desc: 'Active liquidity management on Meteora\'s Dynamic Liquidity Market Maker. Concentrated bin placement on high-volume Solana pairs, fee capture during volatility.',
    tags: ['Meteora', 'DLMM', 'Solana', 'DeFi', 'LP'],
    link: 'https://app.meteora.ag',
    linkLabel: 'app.meteora.ag',
  },
]

export default function Projects() {
  return (
    <section id="projects" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-baseline gap-5 mb-14 pb-5 border-b border-black/10">
          <span className="font-mono text-[0.57rem] tracking-[0.28em] uppercase text-accent">// 02</span>
          <h2 className="text-[clamp(1.6rem,3vw,2.4rem)] font-semibold tracking-tight">Projects</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-black/10">
          {projects.map(p => (
            <div
              key={p.num}
              className="bg-paper p-8 flex flex-col gap-3.5 group hover:bg-paper2 transition-colors duration-200"
            >
              <span className="font-mono font-bold text-[1.9rem] leading-none text-black/[0.07] transition-colors">
                {p.num}
              </span>
              <h3 className="text-[0.97rem] font-semibold tracking-tight group-hover:text-accent transition-colors">
                {p.name}
              </h3>
              <p className="text-[0.82rem] leading-[1.68] text-muted flex-1">
                {p.desc}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {p.tags.map(t => (
                  <span
                    key={t}
                    className="font-mono text-[0.54rem] tracking-[0.12em] uppercase px-2 py-1 border border-black/10 text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
              {p.link ? (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-[0.57rem] tracking-[0.15em] uppercase text-muted hover:text-accent flex items-center gap-1 transition-colors self-start"
                >
                  {p.linkLabel} <ArrowUpRight size={11} />
                </a>
              ) : (
                <span className="font-mono text-[0.57rem] tracking-[0.15em] uppercase text-muted/60">
                  {p.linkLabel}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}