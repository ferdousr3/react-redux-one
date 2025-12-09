
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { LayoutDashboard, LogOut, Menu, X, Search, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '@/store/store'
import { logout } from '@/lib/auth/store/auth.slice'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

const navigation = [
  { name: "CARS", href: "/cars" },
  { name: "PARTS", href: "/products" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
    toast.success('Logged out successfully')
  }

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-foreground font-bold tracking-tighter text-2xl font-mono">
            Engine Sales
          </span>
        </Link>

        {/* RIGHT SIDE CONTAINER: Nav Links + Actions */}
        <div className="hidden md:flex items-center gap-8">

            {/* Navigation Links - Now Right Aligned */}
            <div className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
                {navigation.map((item) => (
                    <Link
                    key={item.name}
                    to={item.href}
                    className="hover:text-primary transition-colors font-mono"
                    >
                    {item.name}
                    </Link>
                ))}
            </div>

            <div className="w-px h-6 bg-border" />

            {/* Actions */}
            <div className="flex items-center gap-4">
            {/* Search Icon */}
            <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                <Search className="w-5 h-5" />
            </button>

            {isAuthenticated ? (
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2 rounded-none hover:bg-muted">
                    <div className="h-8 w-8 bg-muted flex items-center justify-center border border-border">
                        <span className="text-sm font-bold text-primary font-mono">
                        {user?.firstName?.charAt(0).toUpperCase() || "U"}
                        </span>
                    </div>
                    <span className="text-sm font-bold text-foreground font-mono">
                        {user?.firstName || "User"}
                    </span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 rounded-none border-border">
                    <DropdownMenuItem asChild className="rounded-none focus:bg-muted cursor-pointer">
                    <Link to="/dashboard" className="flex items-center gap-2 font-mono">
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                    </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-destructive cursor-pointer rounded-none focus:bg-destructive/10 font-mono"
                    >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <>
                <Link
                    to="/login"
                    className="flex items-center gap-2 text-sm font-bold font-mono text-muted-foreground hover:text-primary transition-colors"
                >
                    Log in
                </Link>
                <Link
                    to="/register"
                    className="relative overflow-hidden bg-primary text-primary-foreground text-xs font-bold font-mono px-6 py-3 transition-all hover:bg-primary/90 flex items-center gap-2 group rounded-full"
                >
                    <span className="relative z-10 flex items-center gap-2">
                    Register
                    <ArrowRight
                        className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"
                        strokeWidth={1.5}
                    />
                    </span>
                </Link>
                </>
            )}
            </div>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden p-2 text-muted-foreground"
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
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-6 py-4 space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block text-sm font-medium text-muted-foreground hover:text-primary transition-colors font-mono"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-border space-y-3">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    className="block text-sm font-medium text-muted-foreground hover:text-primary transition-colors font-mono"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout()
                      setMobileMenuOpen(false)
                    }}
                    className="block text-sm font-medium text-destructive hover:text-destructive/80 transition-colors font-mono w-full text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block text-sm font-medium text-muted-foreground hover:text-primary transition-colors font-mono"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Log in
                  </Link>
                  <Link
                    to="/register"
                    className="block w-full bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium px-4 py-2.5 rounded-full transition-all text-center font-mono"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
