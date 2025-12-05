import { RouteObject } from 'react-router-dom'
import { LoginPage } from './LoginPage'
import { RegistrationPage } from './RegistrationPage'

export const authRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegistrationPage />,
  },
]
