import { useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '@/store/store'
import { FileText, Package, Users, StickyNote, TrendingUp, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { fetchPosts } from '@/lib/posts/store/post.reducer'
import { fetchProducts } from '@/lib/products/store/product.reducer'
import { fetchLawyers } from '@/lib/lawyers/store/lawyer.slice'
import { fetchNotes } from '@/lib/notes/store/notes.slice'

export function DashboardHome() {
   const dispatch = useDispatch<AppDispatch>()
   const { user } = useSelector((state: RootState) => state.auth)
   const { posts, initialized: postsInit } = useSelector((state: RootState) => state.posts)
   const { products, initialized: productsInit } = useSelector((state: RootState) => state.products)
   const { lawyers, initialized: lawyersInit } = useSelector((state: RootState) => state.lawyers)
   const { notes, initialized: notesInit } = useSelector((state: RootState) => state.notes)

   // Fetch data on mount if not initialized
   useEffect(() => {
      if (!postsInit) dispatch(fetchPosts({}))
      if (!productsInit) dispatch(fetchProducts({}))
      if (!lawyersInit) dispatch(fetchLawyers({}))
      if (!notesInit) dispatch(fetchNotes({}))
   }, [dispatch, postsInit, productsInit, lawyersInit, notesInit])

   const stats = [
      {
         name: 'Posts',
         value: posts.length,
         icon: FileText,
         href: '/dashboard/posts',
         color: 'from-blue-500 to-blue-600',
         bgColor: 'bg-blue-50',
         iconColor: 'text-blue-600'
      },
      {
         name: 'Products',
         value: products.length,
         icon: Package,
         href: '/dashboard/products',
         color: 'from-emerald-500 to-emerald-600',
         bgColor: 'bg-emerald-50',
         iconColor: 'text-emerald-600'
      },
      {
         name: 'Lawyers',
         value: lawyers.length,
         icon: Users,
         href: '/dashboard/lawyers',
         color: 'from-purple-500 to-purple-600',
         bgColor: 'bg-purple-50',
         iconColor: 'text-purple-600'
      },
      {
         name: 'Notes',
         value: notes.length,
         icon: StickyNote,
         href: '/dashboard/notes',
         color: 'from-amber-500 to-amber-600',
         bgColor: 'bg-amber-50',
         iconColor: 'text-amber-600'
      },
   ]

   return (
      <div className="space-y-8">
         {/* Welcome Header with 3D effect */}
         <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 p-8 text-white shadow-xl">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
            <div className="relative z-10">
               <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-5 w-5" />
                  <span className="text-emerald-100 text-sm font-medium">Dashboard Overview</span>
               </div>
               <h1 className="text-3xl font-bold mb-2">
                  Welcome back, {user?.firstName || 'User'}! 👋
               </h1>
               <p className="text-emerald-100 max-w-lg">
                  Here's what's happening with your content today. Manage all your resources from one place.
               </p>
            </div>
         </div>

         {/* Stats Grid with 3D Cards */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
               <Link
                  key={stat.name}
                  to={stat.href}
                  className="group"
               >
                  <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                     {/* Gradient top bar */}
                     <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color}`} />

                     <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">
                           {stat.name}
                        </CardTitle>
                        <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                           <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
                        </div>
                     </CardHeader>
                     <CardContent>
                        <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                        <div className="flex items-center justify-between mt-2">
                           <span className="text-xs text-gray-500">
                              Total {stat.name.toLowerCase()}
                           </span>
                           <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
                        </div>
                     </CardContent>
                  </Card>
               </Link>
            ))}
         </div>

         {/* Quick Actions with 3D effect */}
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg overflow-hidden">
               <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500" />
               <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                     <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Quick Actions
                     </span>
                  </CardTitle>
                  <CardDescription>Get started with common tasks</CardDescription>
               </CardHeader>
               <CardContent className="space-y-3">
                  <Link
                     to="/dashboard/posts"
                     className="flex items-center justify-between p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all group"
                  >
                     <div>
                        <div className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                           Create a new post
                        </div>
                        <div className="text-sm text-gray-500">
                           Share your thoughts with the world
                        </div>
                     </div>
                     <FileText className="h-8 w-8 text-gray-300 group-hover:text-blue-500 transition-colors" />
                  </Link>
                  <Link
                     to="/dashboard/products"
                     className="flex items-center justify-between p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50 transition-all group"
                  >
                     <div>
                        <div className="font-medium text-gray-900 group-hover:text-emerald-600 transition-colors">
                           Add a product
                        </div>
                        <div className="text-sm text-gray-500">
                           List a new product in your store
                        </div>
                     </div>
                     <Package className="h-8 w-8 text-gray-300 group-hover:text-emerald-500 transition-colors" />
                  </Link>
                  <Link
                     to="/dashboard/notes"
                     className="flex items-center justify-between p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-amber-300 hover:bg-amber-50/50 transition-all group"
                  >
                     <div>
                        <div className="font-medium text-gray-900 group-hover:text-amber-600 transition-colors">
                           Create a note
                        </div>
                        <div className="text-sm text-gray-500">
                           Jot down your ideas quickly
                        </div>
                     </div>
                     <StickyNote className="h-8 w-8 text-gray-300 group-hover:text-amber-500 transition-colors" />
                  </Link>
               </CardContent>
            </Card>

            <Card className="border-0 shadow-lg overflow-hidden">
               <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />
               <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                     <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                        Account Summary
                     </span>
                  </CardTitle>
                  <CardDescription>Your account details</CardDescription>
               </CardHeader>
               <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                     <div className="h-16 w-16 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                        {user?.firstName?.charAt(0).toUpperCase() || 'U'}
                     </div>
                     <div>
                        <h3 className="font-semibold text-lg text-gray-900">
                           {user?.firstName} {user?.lastName}
                        </h3>
                        <p className="text-gray-500 text-sm">{user?.email}</p>
                     </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                     <div className="text-center p-3 rounded-lg bg-gray-50">
                        <div className="text-2xl font-bold text-gray-900">
                           {posts.length + products.length + lawyers.length + notes.length}
                        </div>
                        <div className="text-xs text-gray-500">Total Items</div>
                     </div>
                     <div className="text-center p-3 rounded-lg bg-gray-50">
                        <div className="text-2xl font-bold text-emerald-600">Active</div>
                        <div className="text-xs text-gray-500">Account Status</div>
                     </div>
                  </div>
               </CardContent>
            </Card>
         </div>
      </div>
   )
}
