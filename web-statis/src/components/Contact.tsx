import { Github, Twitter, Globe, Mail, MapPin } from 'lucide-react'

const contacts = [
  { label: 'Email',    value: 'faqihudin703@gmail.com',  link: 'mailto:faqihudin703@gmail.com', icon: <Mail size={13} /> },
  { label: 'X',        value: '@Frosky703',              link: 'https://x.com/Frosky703',       icon: <Twitter size={13} /> },
  { label: 'GitHub',   value: 'github.com/Frosky703',   link: 'https://github.com/Frosky703',  icon: <Github size={13} /> },
  { label: 'Location', value: 'Cirebon, West Java, ID', link: null,                            icon: <MapPin size={13} /> },
]

export default function Contact() {
  return (
    <>
      <section id="contact" className="py-28 px-6 bg-ink text-paper">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-baseline gap-5 mb-14 pb-5 border-b border-white/08">
            <span className="font-mono text-[0.57rem] tracking-[0.28em] uppercase text-accent">// 04</span>
            <h2 className="text-[clamp(1.6rem,3vw,2.4rem)] font-semibold tracking-tight">Contact</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-20 items-start">
            <div>
              <h3 className="text-[clamp(1.8rem,3.5vw,3rem)] font-semibold tracking-tight leading-[1.08] mb-5">
                Let's build<br />something{' '}
                <em className="not-italic text-accent">real.</em>
              </h3>
              <p className="text-[0.96rem] leading-[1.82] text-white/50 max-w-sm">
                Open to collaboration on blockchain infrastructure, oracle systems, DeFi/DLMM strategies,
                or DePIN. Not interested in MVPs that don't ship.
              </p>
            </div>

            <div>
              {contacts.map(c => (
                <div
                  key={c.label}
                  className="grid grid-cols-[80px_1fr] gap-4 items-center py-5 border-b border-white/08 first:border-t first:border-white/08"
                >
                  <span className="font-mono text-[0.54rem] tracking-[0.2em] uppercase text-white/28">
                    {c.label}
                  </span>
                  <span className="font-mono text-[0.77rem] tracking-[0.05em] text-white/75 flex items-center gap-2">
                    <span className="text-accent/70">{c.icon}</span>
                    {c.link ? (
                      <a
                        href={c.link}
                        target={c.link.startsWith('http') ? '_blank' : undefined}
                        rel="noreferrer"
                        className="hover:text-accent transition-colors"
                      >
                        {c.value}
                      </a>
                    ) : c.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-ink border-t border-white/06 px-6 py-5">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <span className="font-mono text-[0.67rem] font-bold tracking-[0.1em] text-white/45">
            faqih<span className="text-accent">.</span>dev
          </span>
          <span className="font-mono text-[0.53rem] tracking-[0.12em] text-white/22">
            © 2026 Harits Faqihuddin · NIM 2388010020
          </span>
        </div>
      </footer>
    </>
  )
}
