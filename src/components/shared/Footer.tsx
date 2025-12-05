import { Link } from 'react-router-dom'
import { Scale } from 'lucide-react'

const navigation = {
  firm: [
    { name: 'About Us', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Attorneys', href: '/lawyers' },
    { name: 'Newsroom', href: '#' },
  ],
  platform: [
    { name: 'Client Portal', href: '/login' },
    { name: 'User Management', href: '#' },
    { name: 'Security', href: '#' },
    { name: 'API Access', href: '#' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Disclaimer', href: '#' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-16">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <span className="text-slate-900 font-semibold tracking-tight">VERITAS.</span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
              Redefining legal practice with technology-driven transparency and world-class counsel.
            </p>
          </div>

          {/* Firm Links */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-4">Firm</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              {navigation.firm.map((item) => (
                <li key={item.name}>
                  <Link to={item.href} className="hover:text-emerald-600 transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-4">Platform</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              {navigation.platform.map((item) => (
                <li key={item.name}>
                  <Link to={item.href} className="hover:text-emerald-600 transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-4">Legal</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              {navigation.legal.map((item) => (
                <li key={item.name}>
                  <Link to={item.href} className="hover:text-emerald-600 transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-400">© {new Date().getFullYear()} Veritas Legal LLP. All rights reserved. Attorney Advertising.</p>
          <div className="flex items-center gap-6">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span className="text-xs text-slate-400 font-medium">System Operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
