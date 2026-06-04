import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import LoginForm from '@/components/LoginForm'

export default async function LoginPage() {
  const session = await auth()
  if (session) redirect('/dashboard')

  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--ink)',
      padding: '2rem',
    }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{
            fontFamily: 'var(--mono)',
            fontSize: '1.4rem',
            fontWeight: 700,
            letterSpacing: '0.06em',
            color: 'var(--paper)',
          }}>
            RED<span style={{ color: 'var(--accent)' }}>AK</span>SI
          </p>
          <p style={{
            marginTop: '0.5rem',
            fontFamily: 'var(--mono)',
            fontSize: '0.58rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'rgba(245,242,236,0.28)',
          }}>
            Sistem Manajemen Artikel
          </p>
        </div>
        <LoginForm />
      </div>
    </main>
  )
}
