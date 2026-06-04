'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const router = useRouter()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    setLoading(false)

    if (res?.error) {
      setError('Email atau password tidak valid.')
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={field}>
        <label style={lbl}>Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          placeholder="admin@redaksi.id"
          style={inp}
          onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
          onBlur={e  => (e.target.style.borderColor = 'rgba(245,242,236,0.12)')}
        />
      </div>

      <div style={field}>
        <label style={lbl}>Password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          placeholder="••••••••"
          style={inp}
          onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
          onBlur={e  => (e.target.style.borderColor = 'rgba(245,242,236,0.12)')}
        />
      </div>

      {error && (
        <p style={{
          fontFamily: 'var(--mono)',
          fontSize: '0.67rem',
          color: '#f87171',
          letterSpacing: '0.05em',
          padding: '0.7rem 1rem',
          background: 'rgba(248,113,113,0.07)',
          border: '1px solid rgba(248,113,113,0.2)',
        }}>
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        style={{
          marginTop: '0.5rem',
          padding: '0.9rem',
          background: loading ? 'rgba(26,107,58,0.4)' : 'var(--accent)',
          color: 'var(--paper)',
          border: 'none',
          fontFamily: 'var(--mono)',
          fontSize: '0.68rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Masuk...' : 'Masuk'}
      </button>

      <p style={{
        textAlign: 'center',
        fontFamily: 'var(--mono)',
        fontSize: '0.56rem',
        letterSpacing: '0.1em',
        color: 'rgba(245,242,236,0.2)',
        marginTop: '0.4rem',
      }}>
        Demo · admin@redaksi.id / password123
      </p>
    </form>
  )
}

const field: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '0.4rem' }

const lbl: React.CSSProperties = {
  fontFamily: 'var(--mono)',
  fontSize: '0.59rem',
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: 'rgba(245,242,236,0.35)',
}

const inp: React.CSSProperties = {
  padding: '0.75rem 1rem',
  background: 'rgba(245,242,236,0.04)',
  border: '1px solid rgba(245,242,236,0.12)',
  color: 'var(--paper)',
  fontFamily: 'var(--sans)',
  fontSize: '0.93rem',
  outline: 'none',
  transition: 'border-color 0.2s',
  width: '100%',
}
