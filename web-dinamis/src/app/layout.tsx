import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Redaksi',
  description: 'Platform manajemen artikel dan konten digital',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  )
}
