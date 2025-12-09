
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '@/store/store'
import { logout } from '@/lib/auth/store/auth.slice'
import { Button } from '@/components/ui/button'
import {
   LayoutDashboard,
   FileText,
   Package,
   Users,
   StickyNote,
   Settings,
   LogOut,
   Menu,
   X,
   Car,
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const sidebarItems = [
   { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
   { name: 'Posts', href: '/dashboard/posts', icon: FileText },
   { name: 'Products', href: '/dashboard/products', icon: Package },
   { name: 'Cars', href: '/dashboard/cars', icon: Car },
   { name: 'Lawyers', href: '/dashboard/lawyers', icon: Users },
   { name: 'Notes', href: '/dashboard/notes', icon: StickyNote },
   { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export function DashboardLayout() {
   const location = useLocation()
   const navigate = useNavigate()
   const dispatch = useDispatch<AppDispatch>()
   const { user } = useSelector((state: RootState) => state.auth)
   const [sidebarOpen, setSidebarOpen] = useState(false)

   const handleLogout = async () => {
      await dispatch(logout())
      navigate('/')
   }

   return (
      <div className="min-h-screen bg-background text-foreground font-sans">
         {/* Mobile sidebar toggle */}
         <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-sidebar border-b border-sidebar-border px-4 py-3 flex items-center justify-between">
            <span className="font-bold text-lg font-mono tracking-tighter text-sidebar-foreground">ManageX</span>
            <Button
               variant="ghost"
               size="icon"
               onClick={() => setSidebarOpen(!sidebarOpen)}
               className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
               {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
         </div>

         {/* Sidebar */}
         <aside
            className={cn(
               "fixed top-0 left-0 z-30 h-full w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-200 ease-in-out lg:translate-x-0",
               sidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}
         >
            <div className="flex flex-col h-full">
               <div className="p-6 border-b border-sidebar-border">
                  <Link to="/dashboard" className="text-xl font-bold font-mono tracking-tighter text-sidebar-foreground flex items-center gap-2">
                     <span className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
                        M
                     </span>
                     ManageX
                  </Link>
               </div>

               <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                  {sidebarItems.map((item) => {
                     const isActive = location.pathname === item.href
                     return (
                        <Link
                           key={item.name}
                           to={item.href}
                           onClick={() => setSidebarOpen(false)}
                           className={cn(
                              "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 group",
                              isActive
                                 ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm ring-1 ring-sidebar-border"
                                 : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                           )}
                        >
                           <item.icon className={cn("h-4 w-4 shrink-0 transition-colors", isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary")} />
                           {item.name}
                        </Link>
                     )
                  })}
               </nav>

               <div className="p-4 border-t border-sidebar-border bg-sidebar/50">
                  <div className="flex items-center gap-3 px-2 py-2 mb-2 rounded-md hover:bg-sidebar-accent transition-colors cursor-default">
                     <div className="h-8 w-8 rounded-md bg-sidebar-primary flex items-center justify-center text-sidebar-primary-foreground font-bold shrink-0">
                        {user?.firstName?.charAt(0).toUpperCase() || 'U'}
                     </div>
                     <div className="flex-1 min-w-0 overflow-hidden">
                        <p className="text-sm font-semibold text-sidebar-foreground truncate">
                           {user?.firstName} {user?.lastName}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                           {user?.email || ''}
                        </p>
                     </div>
                  </div>
                  <Button
                     variant="ghost"
                     className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                     onClick={handleLogout}
                  >
                     <LogOut className="h-4 w-4 mr-3" />
                     Logout
                  </Button>
               </div>
            </div>
         </aside>

         {/* Main content */}
         <main className="lg:pl-64 pt-16 lg:pt-0 min-h-screen transition-all duration-200">
            <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <Outlet />
            </div>
         </main>

         {/* Mobile overlay */}
         {sidebarOpen && (
            <div
               className="fixed inset-0 z-20 bg-background/80 backdrop-blur-sm lg:hidden animate-in fade-in duration-200"
               onClick={() => setSidebarOpen(false)}
            />
         )}
      </div>
   )
}
