import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import LoginForm from '@/components/LoginForm'
import Link from 'next/link'

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
            REDAKSI
          </p>
          <p style={{
            marginTop: '0.5rem',
            fontFamily: 'var(--mono)',
            fontSize: '0.58rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'rgba(245,242,236,0.28)',
          }}>
            Admin Panel
          </p>
        </div>

        <LoginForm />

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link
            href="/"
            style={{
              fontFamily: 'var(--mono)',
              fontSize: '0.57rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'rgba(245,242,236,0.25)',
              textDecoration: 'none',
            }}
          >
            ← Kembali ke beranda
          </Link>
        </div>
      </div>
    </main>
  )
}
