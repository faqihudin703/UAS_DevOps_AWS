export const dynamic = 'force-dynamic'

import pool from '@/lib/db'
import { RowDataPacket } from 'mysql2'
import Link from 'next/link'

interface ArticleRow extends RowDataPacket {
  id: number
  title: string
  slug: string
  excerpt: string
  category: string
  author_name: string
  created_at: string
}

async function getPublishedArticles() {
  const [rows] = await pool.query<ArticleRow[]>(
    `SELECT a.id, a.title, a.slug, a.excerpt, a.category, a.created_at,
            u.name AS author_name
     FROM articles a
     JOIN users u ON a.author_id = u.id
     WHERE a.published = 1
     ORDER BY a.created_at DESC`
  )
  return rows
}

export default async function LandingPage() {
  const articles = await getPublishedArticles()

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)' }}>

      {/* Header */}
      <header style={{
        borderBottom: '1px solid var(--line)',
        padding: '0 3rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '60px',
        background: 'var(--paper)',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <span style={{
          fontFamily: 'var(--mono)',
          fontSize: '0.85rem',
          fontWeight: 700,
          letterSpacing: '0.1em',
          color: 'var(--ink)',
        }}>
          REDAKSI
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <span style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.6rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
          }}>
            {articles.length} artikel
          </span>
          <Link
            href="/login"
            style={{
              fontFamily: 'var(--mono)',
              fontSize: '0.6rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              padding: '0.4rem 1rem',
              background: 'var(--ink)',
              color: 'var(--paper)',
              textDecoration: 'none',
            }}
          >
            Masuk
          </Link>
        </div>
      </header>

      {/* Hero */}
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '6rem 2rem 4rem',
        borderBottom: '1px solid var(--line)',
      }}>
        <span style={{
          fontFamily: 'var(--mono)',
          fontSize: '0.6rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'var(--accent)',
          display: 'block',
          marginBottom: '1.2rem',
        }}>
          // Platform Konten Digital
        </span>
        <h1 style={{
          fontFamily: 'var(--mono)',
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          lineHeight: 0.95,
          marginBottom: '1.8rem',
          color: 'var(--ink)',
        }}>
          Redaksi.
        </h1>
        <p style={{
          fontSize: '1.05rem',
          lineHeight: 1.8,
          color: 'var(--muted)',
          maxWidth: '520px',
        }}>
          Platform manajemen artikel untuk tim editorial. Tulis, kelola, dan publikasikan
          konten dengan alur kerja yang bersih dan efisien.
        </p>
      </div>

      {/* Articles */}
      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '0 2rem 6rem' }}>
        {articles.length === 0 ? (
          <p style={{
            padding: '4rem 0',
            fontFamily: 'var(--mono)',
            fontSize: '0.7rem',
            color: 'var(--muted)',
            letterSpacing: '0.1em',
          }}>
            Belum ada artikel yang dipublikasikan.
          </p>
        ) : (
          articles.map((art, i) => (
            <article
              key={art.id}
              style={{
                padding: '2.2rem 0',
                borderBottom: '1px solid var(--line)',
                display: 'grid',
                gridTemplateColumns: '44px 1fr',
                gap: '1.5rem',
              }}
            >
              <span style={{
                fontFamily: 'var(--mono)',
                fontSize: '0.57rem',
                letterSpacing: '0.12em',
                color: 'var(--muted)',
                paddingTop: '4px',
              }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '0.5rem', alignItems: 'center' }}>
                  <span style={{
                    fontFamily: 'var(--mono)',
                    fontSize: '0.54rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    padding: '2px 8px',
                    border: '1px solid var(--line)',
                    color: 'var(--muted)',
                  }}>
                    {art.category}
                  </span>
                </div>
                <h2 style={{
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  letterSpacing: '-0.01em',
                  marginBottom: '0.5rem',
                  color: 'var(--ink)',
                }}>
                  {art.title}
                </h2>
                <p style={{
                  fontSize: '0.88rem',
                  lineHeight: 1.7,
                  color: 'var(--muted)',
                  marginBottom: '0.9rem',
                }}>
                  {art.excerpt}
                </p>
                <span style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '0.57rem',
                  letterSpacing: '0.08em',
                  color: 'var(--muted)',
                }}>
                  {art.author_name} · {new Date(art.created_at).toLocaleDateString('id-ID', {
                    day: 'numeric', month: 'long', year: 'numeric',
                  })}
                </span>
              </div>
            </article>
          ))
        )}
      </main>

      <footer style={{
        borderTop: '1px solid var(--line)',
        padding: '1.5rem 3rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'var(--paper)',
      }}>
        <span style={{
          fontFamily: 'var(--mono)',
          fontSize: '0.65rem',
          fontWeight: 700,
          letterSpacing: '0.08em',
          color: 'var(--ink)',
        }}>
          REDAKSI
        </span>
        <span style={{
          fontFamily: 'var(--mono)',
          fontSize: '0.55rem',
          letterSpacing: '0.1em',
          color: 'var(--muted)',
        }}>
          Harits Faqihuddin - 2388010020
        </span>
      </footer>
    </div>
  )
}
