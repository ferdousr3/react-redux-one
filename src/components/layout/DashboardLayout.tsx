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
} from 'lucide-react'
import { useState } from 'react'

const sidebarItems = [
   { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
   { name: 'Posts', href: '/dashboard/posts', icon: FileText },
   { name: 'Products', href: '/dashboard/products', icon: Package },
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
      <div className="min-h-screen bg-gray-50">
         {/* Mobile sidebar toggle */}
         <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b px-4 py-3 flex items-center justify-between">
            <span className="font-semibold text-gray-900">ManageX</span>
            <Button
               variant="ghost"
               size="icon"
               onClick={() => setSidebarOpen(!sidebarOpen)}
            >
               {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
         </div>

         {/* Sidebar */}
         <aside
            className={`fixed top-0 left-0 z-30 h-full w-64 bg-white border-r transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
               sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
         >
            <div className="flex flex-col h-full">
               <div className="p-6 border-b">
                  <Link to="/dashboard" className="text-xl font-bold text-gray-900">
                     ManageX
                  </Link>
               </div>

               <nav className="flex-1 p-4 space-y-1">
                  {sidebarItems.map((item) => {
                     const isActive = location.pathname === item.href
                     return (
                        <Link
                           key={item.name}
                           to={item.href}
                           onClick={() => setSidebarOpen(false)}
                           className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                              isActive
                                 ? 'bg-emerald-50 text-emerald-700'
                                 : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                           }`}
                        >
                           <item.icon className="h-5 w-5" />
                           {item.name}
                        </Link>
                     )
                  })}
               </nav>

               <div className="p-4 border-t">
                  <div className="flex items-center gap-3 px-4 py-2 mb-2">
                     <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center">
                        <span className="text-sm font-medium text-emerald-700">
                           {user?.firstName?.charAt(0).toUpperCase() || 'U'}
                        </span>
                     </div>
                     <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                           {user?.firstName} {user?.lastName}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                           {user?.email || ''}
                        </p>
                     </div>
                  </div>
                  <Button
                     variant="ghost"
                     className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                     onClick={handleLogout}
                  >
                     <LogOut className="h-5 w-5 mr-3" />
                     Logout
                  </Button>
               </div>
            </div>
         </aside>

         {/* Main content */}
         <main className="lg:pl-64 pt-16 lg:pt-0">
            <div className="p-6">
               <Outlet />
            </div>
         </main>

         {/* Mobile overlay */}
         {sidebarOpen && (
            <div
               className="fixed inset-0 z-20 bg-black/50 lg:hidden"
               onClick={() => setSidebarOpen(false)}
            />
         )}
      </div>
   )
}
