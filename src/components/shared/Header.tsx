"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Scale, ArrowRight, Menu, X } from "lucide-react"

const navigation = [
  { name: "Lawyers", href: "/lawyers" },
  { name: "Posts", href: "/posts" },
  { name: "Products", href: "/products" },
  { name: "Contact", href: "/contact" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-slate-900 font-semibold tracking-tight text-lg">
            VERITAS.
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="hover:text-emerald-700 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/login"
            className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-emerald-700 transition-colors"
          >
            Log in
          </Link>
          <Link
            to="/register"
            className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium px-4 py-2 rounded-full transition-all shadow-lg shadow-slate-200/50 flex items-center gap-2 group"
          >
            Client Portal
            <ArrowRight
              className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"
              strokeWidth={1.5}
            />
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden p-2 text-slate-600"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="px-6 py-4 space-y-4">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block text-sm font-medium text-slate-600 hover:text-emerald-700 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <Link
                to="/login"
                className="block text-sm font-medium text-slate-600 hover:text-emerald-700 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="block w-full bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium px-4 py-2.5 rounded-full transition-all text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Client Portal
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
