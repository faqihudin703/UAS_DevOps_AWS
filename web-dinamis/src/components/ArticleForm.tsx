'use client'

import { useState } from 'react'

interface Props {
  action: (formData: FormData) => Promise<void>
}

export default function ArticleForm({ action }: Props) {
  const [published, setPublished] = useState(true)

  return (
    <form action={action} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

      <div style={field}>
        <label style={lbl}>Judul</label>
        <input
          name="title"
          type="text"
          required
          placeholder="Judul artikel..."
          style={inp}
          onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
          onBlur={e  => (e.target.style.borderColor = 'rgba(12,12,12,0.15)')}
        />
      </div>

      <div style={field}>
        <label style={lbl}>Kategori</label>
        <select
          name="category"
          style={{ ...inp, cursor: 'pointer' }}
          onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
          onBlur={e  => (e.target.style.borderColor = 'rgba(12,12,12,0.15)')}
        >
          <option value="Umum">Umum</option>
          <option value="DevOps">DevOps</option>
          <option value="Web Dev">Web Dev</option>
          <option value="Blockchain">Blockchain</option>
          <option value="AI & ML">AI & ML</option>
          <option value="Security">Security</option>
        </select>
      </div>

      <div style={field}>
        <label style={lbl}>Ringkasan</label>
        <textarea
          name="excerpt"
          required
          rows={3}
          placeholder="Deskripsi singkat..."
          style={{ ...inp, resize: 'vertical', lineHeight: 1.6 }}
          onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
          onBlur={e  => (e.target.style.borderColor = 'rgba(12,12,12,0.15)')}
        />
      </div>

      <div style={field}>
        <label style={lbl}>Isi Artikel</label>
        <textarea
          name="body"
          required
          rows={7}
          placeholder="Konten lengkap artikel..."
          style={{ ...inp, resize: 'vertical', lineHeight: 1.65 }}
          onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
          onBlur={e  => (e.target.style.borderColor = 'rgba(12,12,12,0.15)')}
        />
      </div>

      {/* Published toggle */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.6rem 0.9rem', background: 'var(--paper2)', border: '1px solid var(--line)' }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '0.57rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)' }}>
          Status
        </span>
        <button
          type="button"
          onClick={() => setPublished(p => !p)}
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.57rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            padding: '0.3rem 0.8rem',
            background: 'transparent',
            border: `1px solid ${published ? 'rgba(26,107,58,0.4)' : 'rgba(248,113,113,0.3)'}`,
            color: published ? 'var(--accent)' : 'rgba(248,113,113,0.7)',
            cursor: 'pointer',
            transition: 'all 0.15s',
          }}
        >
          {published ? 'Published' : 'Draft'}
        </button>
        <input type="hidden" name="published" value={published ? '1' : '0'} />
      </div>

      <button
        type="submit"
        style={{
          padding: '0.85rem',
          background: 'var(--ink)',
          color: 'var(--paper)',
          border: 'none',
          fontFamily: 'var(--mono)',
          fontSize: '0.65rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          transition: 'background 0.2s',
        }}
        onMouseEnter={e => ((e.target as HTMLButtonElement).style.background = 'var(--accent)')}
        onMouseLeave={e => ((e.target as HTMLButtonElement).style.background = 'var(--ink)')}
      >
        Simpan Artikel
      </button>
    </form>
  )
}

const field: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '0.4rem' }

const lbl: React.CSSProperties = {
  fontFamily: 'var(--mono)',
  fontSize: '0.58rem',
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: 'var(--muted)',
}

const inp: React.CSSProperties = {
  padding: '0.7rem 0.9rem',
  background: 'var(--paper2)',
  border: '1px solid rgba(12,12,12,0.15)',
  color: 'var(--ink)',
  fontFamily: 'var(--sans)',
  fontSize: '0.88rem',
  outline: 'none',
  transition: 'border-color 0.2s',
  width: '100%',
}
