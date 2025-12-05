import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

export function ProtectedRoute() {
   const { isAuthenticated, loading } = useSelector((state: RootState) => state.auth)
   const location = useLocation()

   // Check localStorage directly as fallback for race conditions
   const hasToken = !!localStorage.getItem('accessToken')

   // Show nothing while auth is loading
   if (loading) {
      return (
         <div className="flex items-center justify-center min-h-screen">
            <div className="h-8 w-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
         </div>
      )
   }

   // User is authenticated if Redux says so OR if there's a token in localStorage
   if (!isAuthenticated && !hasToken) {
      return <Navigate to="/login" state={{ from: location }} replace />
   }

   return <Outlet />
}
