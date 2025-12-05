import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { changePasswordSchema, ChangePasswordFormValues } from '@/schemas/auth.schema'
import { authApi } from '@/lib/auth/api/auth.api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { toast } from 'sonner'
import { Eye, EyeOff, Check, X, Loader2 } from 'lucide-react'

// Password requirement checker
function PasswordRequirements({ password }: { password: string }) {
  const requirements = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'One lowercase letter', met: /[a-z]/.test(password) },
    { label: 'One uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'One number', met: /[0-9]/.test(password) },
  ]

  return (
    <div className="mt-2 space-y-1">
      <p className="text-xs text-muted-foreground mb-1">Password requirements:</p>
      {requirements.map((req, index) => (
        <div key={index} className="flex items-center gap-2 text-xs">
          {req.met ? (
            <Check className="h-3 w-3 text-emerald-500" />
          ) : (
            <X className="h-3 w-3 text-muted-foreground" />
          )}
          <span className={req.met ? 'text-emerald-600' : 'text-muted-foreground'}>
            {req.label}
          </span>
        </div>
      ))}
    </div>
  )
}

export function SettingsPage() {
   const [loading, setLoading] = useState(false)
   const [showCurrentPassword, setShowCurrentPassword] = useState(false)
   const [showNewPassword, setShowNewPassword] = useState(false)
   const [showConfirmPassword, setShowConfirmPassword] = useState(false)

   const form = useForm<ChangePasswordFormValues>({
      resolver: zodResolver(changePasswordSchema),
      defaultValues: {
         currentPassword: '',
         newPassword: '',
         confirmNewPassword: '',
      },
      mode: 'onChange',
   })

   const watchedNewPassword = form.watch('newPassword')

   async function onSubmit(data: ChangePasswordFormValues) {
      setLoading(true)
      try {
         await authApi.changePassword({
            currentPassword: data.currentPassword,
            newPassword: data.newPassword,
         })
         toast.success('Password changed successfully!')
         form.reset()
      } catch (error: any) {
         toast.error(error.response?.data?.message || 'Failed to change password')
      } finally {
         setLoading(false)
      }
   }

   return (
      <div className="space-y-6">
         <div>
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-500 mt-1">Manage your account settings</p>
         </div>

         <Card className="max-w-xl">
            <CardHeader>
               <CardTitle>Change Password</CardTitle>
               <CardDescription>
                  Update your password to keep your account secure
               </CardDescription>
            </CardHeader>
            <CardContent>
               <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                     <FormField
                        control={form.control}
                        name="currentPassword"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Current Password</FormLabel>
                              <FormControl>
                                 <div className="relative">
                                    <Input
                                       type={showCurrentPassword ? 'text' : 'password'}
                                       placeholder="Enter current password"
                                       {...field}
                                    />
                                    <button
                                       type="button"
                                       className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                       onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                    >
                                       {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                 </div>
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="newPassword"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>New Password</FormLabel>
                              <FormControl>
                                 <div className="relative">
                                    <Input
                                       type={showNewPassword ? 'text' : 'password'}
                                       placeholder="Enter new password"
                                       {...field}
                                    />
                                    <button
                                       type="button"
                                       className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                       onClick={() => setShowNewPassword(!showNewPassword)}
                                    >
                                       {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                 </div>
                              </FormControl>
                              <PasswordRequirements password={watchedNewPassword || ''} />
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="confirmNewPassword"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Confirm New Password</FormLabel>
                              <FormControl>
                                 <div className="relative">
                                    <Input
                                       type={showConfirmPassword ? 'text' : 'password'}
                                       placeholder="Confirm new password"
                                       {...field}
                                    />
                                    <button
                                       type="button"
                                       className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                       onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                       {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                 </div>
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <Button type="submit" disabled={loading}>
                        {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                        {loading ? 'Changing Password...' : 'Change Password'}
                     </Button>
                  </form>
               </Form>
            </CardContent>
         </Card>
      </div>
   )
}
