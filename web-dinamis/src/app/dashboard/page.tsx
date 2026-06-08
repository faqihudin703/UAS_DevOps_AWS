export const dynamic = 'force-dynamic'

import { auth, signOut } from '@/lib/auth'
import { redirect } from 'next/navigation'
import pool from '@/lib/db'
import { RowDataPacket } from 'mysql2'
import ArticleForm from '@/components/ArticleForm'

interface ArticleRow extends RowDataPacket {
  id: number
  title: string
  slug: string
  excerpt: string
  category: string
  author_name: string
  published: number
  created_at: string
}

interface StatsRow extends RowDataPacket {
  total: number
  published: number
  draft: number
}

async function getArticles() {
  const [rows] = await pool.query<ArticleRow[]>(
    `SELECT a.id, a.title, a.slug, a.excerpt, a.category, a.published, a.created_at,
            u.name AS author_name
     FROM articles a
     JOIN users u ON a.author_id = u.id
     ORDER BY a.created_at DESC`
  )
  return rows
}

async function getStats() {
  const [rows] = await pool.query<StatsRow[]>(
    `SELECT
       COUNT(*) AS total,
       SUM(published = 1) AS published,
       SUM(published = 0) AS draft
     FROM articles`
  )
  return rows[0]
}

async function addArticle(formData: FormData) {
  'use server'
  const session = await auth()
  if (!session) return
  const title     = (formData.get('title') as string).trim()
  const excerpt   = (formData.get('excerpt') as string).trim()
  const body      = (formData.get('body') as string).trim()
  const category  = (formData.get('category') as string).trim() || 'Umum'
  const published = formData.get('published') === '1' ? 1 : 0
  if (!title || !excerpt || !body) return
  const slug = title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').slice(0, 240) + '-' + Date.now()
  await pool.query(
    'INSERT INTO articles (title, slug, excerpt, body, category, author_id, published) VALUES (?,?,?,?,?,?,?)',
    [title, slug, excerpt, body, category, (session.user as any).id, published]
  )
  redirect('/dashboard')
}

async function deleteArticle(formData: FormData) {
  'use server'
  const session = await auth()
  if (!session) return
  await pool.query('DELETE FROM articles WHERE id = ?', [formData.get('id')])
  redirect('/dashboard')
}

async function togglePublished(formData: FormData) {
  'use server'
  const session = await auth()
  if (!session) return
  const id        = formData.get('id')
  const current   = formData.get('current')
  const nextState = current === '1' ? 0 : 1
  await pool.query('UPDATE articles SET published = ? WHERE id = ?', [nextState, id])
  redirect('/dashboard')
}

export default async function DashboardPage() {
  const session = await auth()
  if (!session) redirect('/login')

  const [articles, stats] = await Promise.all([getArticles(), getStats()])
  const role        = (session.user as any).role
  const authorName  = session.user?.name ?? ''

  const s: React.CSSProperties = {}

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)' }}>

      {/* Topbar */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'var(--ink)',
        borderBottom: '1px solid rgba(245,242,236,0.08)',
        padding: '0 2.5rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: '58px',
        gap: '2rem',
      }}>
        <a href="/" style={{ fontFamily: 'var(--mono)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--paper)', textDecoration: 'none', flexShrink: 0 }}>
          REDAKSI
        </a>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '1.5rem', flex: 1, justifyContent: 'center' }}>
          {[
            { label: 'Total',     value: stats?.total ?? 0,     color: 'rgba(245,242,236,0.5)' },
            { label: 'Published', value: stats?.published ?? 0, color: 'var(--accent-light)' },
            { label: 'Draft',     value: stats?.draft ?? 0,     color: 'rgba(248,113,113,0.7)' },
          ].map(s => (
            <div key={s.label} style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.9rem', fontWeight: 700, color: s.color }}>{s.value}</span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.52rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(245,242,236,0.25)' }}>{s.label}</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', flexShrink: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', letterSpacing: '0.06em', color: 'rgba(245,242,236,0.5)' }}>{authorName}</span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.5rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent-light)' }}>{role}</span>
          </div>
          <form action={async () => { 'use server'; await signOut({ redirectTo: '/login' }) }}>
            <button style={{ fontFamily: 'var(--mono)', fontSize: '0.56rem', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '0.3rem 0.7rem', background: 'transparent', border: '1px solid rgba(245,242,236,0.12)', color: 'rgba(245,242,236,0.35)', cursor: 'pointer' }}>
              Keluar
            </button>
          </form>
        </div>
      </header>

      <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '3rem 2rem', display: 'grid', gridTemplateColumns: '1fr 360px', gap: '3rem', alignItems: 'start' }}>

        {/* Artikel list */}
        <div>
          <div style={{ paddingBottom: '1.4rem', marginBottom: '0', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
            <div>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.55rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--accent)', display: 'block', marginBottom: '0.3rem' }}>// Konten</span>
              <h1 style={{ fontSize: '1.4rem', fontWeight: 600, letterSpacing: '-0.02em' }}>Daftar Artikel</h1>
            </div>
          </div>

          {articles.length === 0 && (
            <p style={{ padding: '3rem 0', fontFamily: 'var(--mono)', fontSize: '0.68rem', color: 'var(--muted)', letterSpacing: '0.1em' }}>Belum ada artikel.</p>
          )}

          {articles.map((art, i) => (
            <article key={art.id} style={{ padding: '1.6rem 0', borderBottom: '1px solid var(--line)', display: 'grid', gridTemplateColumns: '34px 1fr auto', gap: '1.2rem', alignItems: 'start' }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.55rem', letterSpacing: '0.12em', color: 'var(--muted)', paddingTop: '3px' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                {/* Badges */}
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.45rem', flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '0.52rem', letterSpacing: '0.14em', textTransform: 'uppercase', padding: '2px 7px', border: '1px solid var(--line)', color: 'var(--muted)' }}>
                    {art.category}
                  </span>
                  <span style={{
                    fontFamily: 'var(--mono)', fontSize: '0.5rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                    padding: '2px 7px',
                    border: `1px solid ${art.published ? 'rgba(26,107,58,0.35)' : 'rgba(248,113,113,0.25)'}`,
                    color: art.published ? 'var(--accent)' : 'rgba(248,113,113,0.7)',
                  }}>
                    {art.published ? 'Published' : 'Draft'}
                  </span>
                </div>
                <h2 style={{ fontSize: '0.95rem', fontWeight: 600, letterSpacing: '-0.01em', marginBottom: '0.35rem' }}>{art.title}</h2>
                <p style={{ fontSize: '0.82rem', lineHeight: 1.6, color: 'var(--muted)', marginBottom: '0.65rem' }}>{art.excerpt}</p>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.54rem', letterSpacing: '0.07em', color: 'var(--muted)' }}>
                  {art.author_name} · {new Date(art.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', alignItems: 'flex-end' }}>
                {/* Toggle published */}
                {role === 'admin' && (
                  <form action={togglePublished}>
                    <input type="hidden" name="id" value={art.id} />
                    <input type="hidden" name="current" value={art.published} />
                    <button style={{ fontFamily: 'var(--mono)', fontSize: '0.5rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.28rem 0.6rem', background: 'transparent', border: `1px solid ${art.published ? 'rgba(245,242,236,0.12)' : 'rgba(26,107,58,0.3)'}`, color: art.published ? 'rgba(245,242,236,0.3)' : 'rgba(26,107,58,0.8)', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                      {art.published ? 'Jadikan Draft' : 'Publish'}
                    </button>
                  </form>
                )}
                {/* Hapus */}
                {role === 'admin' && (
                  <form action={deleteArticle}>
                    <input type="hidden" name="id" value={art.id} />
                    <button style={{ fontFamily: 'var(--mono)', fontSize: '0.5rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.28rem 0.6rem', background: 'transparent', border: '1px solid rgba(248,113,113,0.2)', color: 'rgba(248,113,113,0.5)', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                      Hapus
                    </button>
                  </form>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Sidebar form */}
        <div style={{ position: 'sticky', top: '74px' }}>
          <div style={{ paddingBottom: '1.2rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--line)' }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.55rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--accent)', display: 'block', marginBottom: '0.3rem' }}>// Tambah</span>
            <h2 style={{ fontSize: '1.05rem', fontWeight: 600, letterSpacing: '-0.01em' }}>Artikel Baru</h2>
          </div>

          {/* Author info — read only */}
          <div style={{ marginBottom: '1rem', padding: '0.7rem 0.9rem', background: 'var(--paper2)', border: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.57rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)' }}>Author</span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', letterSpacing: '0.05em', color: 'var(--ink)', fontWeight: 600 }}>{authorName}</span>
          </div>

          <ArticleForm action={addArticle} />
        </div>
      </div>
    </div>
  )
}
