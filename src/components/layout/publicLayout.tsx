import { Outlet } from 'react-router-dom'
import { Header } from '@/components/shared/Header'
import { Footer } from '@/components/shared/Footer'

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
