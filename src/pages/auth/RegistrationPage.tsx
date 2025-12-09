import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registrationSchema, RegistrationFormValues } from '@/schemas/auth.schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { register, clearError } from '@/lib/auth/store/auth.slice';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { Check, X, Eye, EyeOff, User, Mail, Lock, ArrowLeft } from 'lucide-react';

// Password requirement checker
function PasswordRequirements({ password }: { password: string }) {
  const requirements = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'One lowercase letter', met: /[a-z]/.test(password) },
    { label: 'One uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'One number', met: /[0-9]/.test(password) },
  ];

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
  );
}

export function RegistrationPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  const watchedPassword = form.watch('password');

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  async function onSubmit(data: RegistrationFormValues) {
    const result = await dispatch(register({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    }));

    if (register.fulfilled.match(result)) {
      toast.success('Account created successfully! Please login.');
      navigate('/login');
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 relative overflow-hidden">
        {/* Decorative Background */}
         <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-100 to-white -z-10" />

      <div className="relative z-10 w-full max-w-md my-8">
           <Link to="/" className="inline-flex items-center text-gray-500 hover:text-gray-900 mb-8 transition-colors">
             <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
          </Link>

          <Card className="bg-white border-gray-200 shadow-xl">
            <CardHeader className="space-y-1 text-center">
              <div className="w-12 h-12 bg-[#dd0031] rounded-xl flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl shadow-lg shadow-red-600/20">
                  E
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">Create an account</CardTitle>
              <CardDescription className="text-gray-500">
                Enter your information to get started
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">First name</FormLabel>
                          <FormControl>
                            <div className="relative group">
                              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-[#dd0031] transition-colors" />
                              <Input placeholder="John" className="pl-10 input-light h-11 focus:border-[#dd0031]" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Last name</FormLabel>
                          <FormControl>
                            <div className="relative group">
                              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-[#dd0031] transition-colors" />
                              <Input placeholder="Doe" className="pl-10 input-light h-11 focus:border-[#dd0031]" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Email</FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-[#dd0031] transition-colors" />
                            <Input type="email" placeholder="john.doe@example.com" className="pl-10 input-light h-11 focus:border-[#dd0031]" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Password</FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-[#dd0031] transition-colors" />
                            <Input
                              type={showPassword ? 'text' : 'password'}
                              placeholder="Create a password"
                              className="pl-10 pr-10 input-light h-11 focus:border-[#dd0031]"
                              {...field}
                            />
                            <button
                              type="button"
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer z-20 p-1"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </FormControl>
                        <PasswordRequirements password={watchedPassword || ''} />
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Confirm Password</FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-[#dd0031] transition-colors" />
                            <Input
                              type={showConfirmPassword ? 'text' : 'password'}
                              placeholder="Confirm your password"
                              className="pl-10 pr-10 input-light h-11 focus:border-[#dd0031]"
                              {...field}
                            />
                             <button
                              type="button"
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer z-20 p-1"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full bg-[#dd0031] hover:bg-[#b00027] text-white font-bold py-6 text-lg relative z-50 shadow-lg shadow-red-600/25 hover:shadow-red-600/50 transition-all mt-6" disabled={loading}>
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Creating account...
                      </span>
                    ) : (
                      'Create account'
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-center border-t border-gray-100 pt-6">
              <p className="text-sm text-gray-500">
                Already have an account?{' '}
                <Link to="/login" className="text-[#dd0031] font-medium hover:underline hover:text-[#b00027] transition-colors">
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </Card>
      </div>
    </div>
  );
}
