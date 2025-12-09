import { Routes, Route } from "react-router-dom"
import { AuthLayout } from "./components/layout/AuthLayout"
import { PublicLayout } from "./components/layout/publicLayout"
import { DashboardLayout } from "./components/layout/DashboardLayout"
import { ProtectedRoute } from "./components/layout/ProtectedRoute"
import { Toaster } from "@/components/shadcn"

// Public pages
import { LandingPage } from "./pages/LandingPage"
import { ContactPage } from "./pages/ContactPage"
import { LawyerListPage } from "./pages/LawyerListPage"
import { PostsPage } from "./pages/PostsPage"
import { ProductsPage } from "./pages/ProductsPage"
import { CarsPage } from "./pages/CarsPage"
import { CarDetailsPage } from "./pages/CarDetailsPage"
import { EnginesPage } from "./pages/EnginesPage"
import { EngineDetailsPage } from "./pages/EngineDetailsPage"

// Auth pages
import { LoginPage } from "./pages/auth/LoginPage"
import { RegistrationPage } from "./pages/auth/RegistrationPage"

// Dashboard pages
import { DashboardHome } from "./pages/dashboard/DashboardHome"
import { PostsManagement } from "./pages/dashboard/PostsManagement"
import { ProductsManagement } from "./pages/dashboard/ProductsManagement"
import { LawyersManagement } from "./pages/dashboard/LawyersManagement"
import { NotesManagement } from "./pages/dashboard/NotesManagement"
import { SettingsPage } from "./pages/dashboard/SettingsPage"
import { CarsManagement } from "./pages/dashboard/CarsManagement"

function App() {
  return (
    <>
      <Routes>
        {/* Public routes with Header and Footer */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/lawyers" element={<LawyerListPage />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/cars" element={<CarsPage />} />
          <Route path="/cars/:id" element={<CarDetailsPage />} />
          <Route path="/engines" element={<EnginesPage />} />
          <Route path="/engines/:id" element={<EngineDetailsPage />} />
        </Route>

        {/* Auth routes without Header and Footer */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
        </Route>

        {/* Protected Dashboard routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardHome />} />
            <Route path="/dashboard/posts" element={<PostsManagement />} />
            <Route path="/dashboard/products" element={<ProductsManagement />} />
            <Route path="/dashboard/cars" element={<CarsManagement />} />
            <Route path="/dashboard/lawyers" element={<LawyersManagement />} />
            <Route path="/dashboard/notes" element={<NotesManagement />} />
            <Route path="/dashboard/settings" element={<SettingsPage />} />
          </Route>
        </Route>
      </Routes>

      <Toaster />
    </>
  )
}

export default App
