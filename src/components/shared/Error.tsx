import { AlertCircle, RefreshCw, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface ErrorMessageProps {
   message: string
   onRetry?: () => void
   className?: string
}

export function ErrorMessage({ message, onRetry, className = '' }: ErrorMessageProps) {
   return (
      <div className={`flex items-center gap-2 text-destructive text-sm ${className}`}>
         <AlertCircle className="h-4 w-4 flex-shrink-0" />
         <span>{message}</span>
         {onRetry && (
            <Button variant="ghost" size="sm" onClick={onRetry} className="h-6 px-2">
               <RefreshCw className="h-3 w-3" />
            </Button>
         )}
      </div>
   )
}

interface ErrorCardProps {
   title?: string
   message: string
   onRetry?: () => void
}

export function ErrorCard({ title = 'Something went wrong', message, onRetry }: ErrorCardProps) {
   return (
      <Card className="border-destructive/50 bg-destructive/5">
         <CardContent className="flex flex-col items-center justify-center py-8 gap-4">
            <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
               <XCircle className="h-6 w-6 text-destructive" />
            </div>
            <div className="text-center">
               <h3 className="font-semibold text-destructive">{title}</h3>
               <p className="text-sm text-muted-foreground mt-1">{message}</p>
            </div>
            {onRetry && (
               <Button variant="outline" size="sm" onClick={onRetry}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try again
               </Button>
            )}
         </CardContent>
      </Card>
   )
}

interface PageErrorProps {
   message?: string
   onRetry?: () => void
}

export function PageError({
   message = 'Failed to load data. Please try again.',
   onRetry
}: PageErrorProps) {
   return (
      <div className="flex flex-col items-center justify-center py-12 gap-4">
         <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center">
            <XCircle className="h-8 w-8 text-destructive" />
         </div>
         <div className="text-center">
            <h3 className="font-semibold text-lg">Oops! Something went wrong</h3>
            <p className="text-muted-foreground mt-1">{message}</p>
         </div>
         {onRetry && (
            <Button onClick={onRetry}>
               <RefreshCw className="h-4 w-4 mr-2" />
               Retry
            </Button>
         )}
      </div>
   )
}
