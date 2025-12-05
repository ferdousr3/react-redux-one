import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

export function ProtectedRoute() {
   const { isAuthenticated } = useSelector((state: RootState) => state.auth)
   const location = useLocation()

   if (!isAuthenticated) {
      return <Navigate to="/login" state={{ from: location }} replace />
   }

   return <Outlet />
}
