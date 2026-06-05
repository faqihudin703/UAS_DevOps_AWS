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

async function addArticle(formData: FormData) {
  'use server'
  const session = await auth()
  if (!session) return
  const title    = (formData.get('title') as string).trim()
  const excerpt  = (formData.get('excerpt') as string).trim()
  const body     = (formData.get('body') as string).trim()
  const category = (formData.get('category') as string).trim() || 'Umum'
  if (!title || !excerpt || !body) return
  const slug = title.toLowerCase().replace(/[^a-z0-9\s-]/g,'').replace(/\s+/g,'-').slice(0,240) + '-' + Date.now()
  await pool.query(
    'INSERT INTO articles (title, slug, excerpt, body, category, author_id) VALUES (?,?,?,?,?,?)',
    [title, slug, excerpt, body, category, (session.user as any).id]
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

export default async function DashboardPage() {
  const session = await auth()
  if (!session) redirect('/login')
  const articles = await getArticles()
  const role = (session.user as any).role

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)' }}>
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'var(--ink)',
        borderBottom: '1px solid rgba(245,242,236,0.08)',
        padding: '0 3rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: '58px',
      }}>
        <a href="/" style={{ fontFamily: 'var(--mono)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--paper)', textDecoration: 'none' }}>
          RED<span style={{ color: 'var(--accent)' }}>AK</span>SI
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', letterSpacing: '0.08em', color: 'rgba(245,242,236,0.4)' }}>
            {session.user?.name}
            <span style={{ marginLeft: '8px', color: 'var(--accent)', fontSize: '0.52rem', textTransform: 'uppercase', border: '1px solid rgba(26,107,58,0.4)', padding: '2px 6px' }}>
              {role}
            </span>
          </span>
          <form action={async () => { 'use server'; await signOut({ redirectTo: '/login' }) }}>
            <button style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '0.32rem 0.75rem', background: 'transparent', border: '1px solid rgba(245,242,236,0.14)', color: 'rgba(245,242,236,0.38)', cursor: 'pointer' }}>
              Keluar
            </button>
          </form>
        </div>
      </header>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 2rem', display: 'grid', gridTemplateColumns: '1fr 340px', gap: '3rem', alignItems: 'start' }}>
        <div>
          <div style={{ paddingBottom: '1.5rem', marginBottom: '0', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
            <div>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.57rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--accent)', display: 'block', marginBottom: '0.3rem' }}>// Konten</span>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 600, letterSpacing: '-0.02em' }}>Daftar Artikel</h1>
            </div>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', letterSpacing: '0.12em', color: 'var(--muted)' }}>{articles.length} artikel</span>
          </div>

          {articles.length === 0 && (
            <p style={{ padding: '3rem 0', fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--muted)', letterSpacing: '0.1em' }}>Belum ada artikel.</p>
          )}

          {articles.map((art, i) => (
            <article key={art.id} style={{ padding: '1.8rem 0', borderBottom: '1px solid var(--line)', display: 'grid', gridTemplateColumns: '36px 1fr auto', gap: '1.2rem', alignItems: 'start' }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.57rem', letterSpacing: '0.12em', color: 'var(--muted)', paddingTop: '3px' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '0.54rem', letterSpacing: '0.14em', textTransform: 'uppercase', padding: '2px 7px', border: '1px solid var(--line)', color: 'var(--muted)' }}>
                    {art.category}
                  </span>
                </div>
                <h2 style={{ fontSize: '0.97rem', fontWeight: 600, letterSpacing: '-0.01em', marginBottom: '0.4rem' }}>{art.title}</h2>
                <p style={{ fontSize: '0.83rem', lineHeight: 1.6, color: 'var(--muted)', marginBottom: '0.7rem' }}>{art.excerpt}</p>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.56rem', letterSpacing: '0.08em', color: 'var(--muted)' }}>
                  {art.author_name} · {new Date(art.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </div>
              {role === 'admin' && (
                <form action={deleteArticle}>
                  <input type="hidden" name="id" value={art.id} />
                  <button style={{ fontFamily: 'var(--mono)', fontSize: '0.54rem', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '0.3rem 0.65rem', background: 'transparent', border: '1px solid rgba(248,113,113,0.25)', color: 'rgba(248,113,113,0.55)', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                    Hapus
                  </button>
                </form>
              )}
            </article>
          ))}
        </div>

        <div style={{ position: 'sticky', top: '80px' }}>
          <div style={{ paddingBottom: '1.2rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--line)' }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.57rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--accent)', display: 'block', marginBottom: '0.3rem' }}>// Tambah</span>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 600, letterSpacing: '-0.01em' }}>Artikel Baru</h2>
          </div>
          <ArticleForm action={addArticle} />
        </div>
      </div>
    </div>
  )
}
