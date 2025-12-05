import { Loader2 } from 'lucide-react'

interface LoadingSpinnerProps {
   size?: 'sm' | 'md' | 'lg'
   className?: string
}

const sizes = {
   sm: 'h-4 w-4',
   md: 'h-6 w-6',
   lg: 'h-8 w-8',
}

export function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
   return (
      <Loader2 className={`animate-spin text-primary ${sizes[size]} ${className}`} />
   )
}

interface LoadingButtonProps {
   loading: boolean
   children: React.ReactNode
   className?: string
}

export function LoadingButton({ loading, children, className = '' }: LoadingButtonProps) {
   return (
      <span className={`flex items-center justify-center gap-2 ${className}`}>
         {loading && <LoadingSpinner size="sm" />}
         {children}
      </span>
   )
}

interface PageLoadingProps {
   message?: string
}

export function PageLoading({ message = 'Loading...' }: PageLoadingProps) {
   return (
      <div className="flex flex-col items-center justify-center py-12 gap-3">
         <LoadingSpinner size="lg" />
         <p className="text-muted-foreground text-sm">{message}</p>
      </div>
   )
}

interface TableLoadingProps {
   columns?: number
   rows?: number
}

export function TableLoading({ columns = 4, rows = 5 }: TableLoadingProps) {
   return (
      <div className="space-y-3">
         {Array.from({ length: rows }).map((_, i) => (
            <div key={i} className="flex gap-4">
               {Array.from({ length: columns }).map((_, j) => (
                  <div
                     key={j}
                     className="h-10 bg-muted animate-pulse rounded flex-1"
                  />
               ))}
            </div>
         ))}
      </div>
   )
}
