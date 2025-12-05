import { Routes, Route } from "react-router-dom"
import { AuthLayout } from "./components/layout/AuthLayout"
import { publicRoutes } from "./pages/public.routes"
import { authRoutes } from "./pages/auth/auth.routes"
import { Toaster } from "@/components/shadcn"
import { PublicLayout } from "./components/layout/publicLayout"

function App() {
  return (
    <>
      <Routes>
        {/* Public routes with Header and Footer */}
        <Route element={<PublicLayout />}>
          {publicRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Route>

        {/* Auth routes without Header and Footer */}
        <Route element={<AuthLayout />}>
          {authRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>

      <Toaster />
    </>
  )
}

export default App
