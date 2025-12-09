import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormValues } from '@/schemas/auth.schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { login, clearError } from '@/lib/auth/store/auth.slice';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from 'lucide-react';

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const from = (location.state as any)?.from?.pathname || '/dashboard';
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  async function onSubmit(data: LoginFormValues) {
    const result = await dispatch(login(data));
    if (login.fulfilled.match(result)) {
      toast.success('Welcome back!');
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 relative overflow-hidden">
        {/* Decorative Background */}
         <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-100 to-white -z-10" />

      <div className="relative z-10 w-full max-w-md">
          <Link to="/" className="inline-flex items-center text-gray-500 hover:text-gray-900 mb-8 transition-colors">
             <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
          </Link>

          <Card className="bg-white border-gray-200 shadow-xl">
            <CardHeader className="space-y-1 text-center">
              <div className="w-12 h-12 bg-[#dd0031] rounded-xl flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl shadow-lg shadow-red-600/20">
                  E
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">Welcome back</CardTitle>
              <CardDescription className="text-gray-500">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Email</FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-[#dd0031] transition-colors" />
                            <Input
                              type="email"
                              placeholder="john@example.com"
                              className="pl-10 input-light h-11 focus:border-[#dd0031] focus:ring-[#dd0031]/20"
                              {...field}
                            />
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
                              placeholder="Enter your password"
                              className="pl-10 pr-10 input-light h-11 focus:border-[#dd0031] focus:ring-[#dd0031]/20"
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
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end">
                    <Link
                      to="/forgot-password"
                      className="text-sm text-[#dd0031] hover:text-[#b00027] hover:underline font-medium transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Button type="submit" className="w-full bg-[#dd0031] hover:bg-[#b00027] text-white font-bold py-6 text-lg relative z-50 shadow-lg shadow-red-600/25 hover:shadow-red-600/50 transition-all" disabled={loading}>
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Signing in...
                      </span>
                    ) : (
                      'Sign in'
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-center border-t border-gray-100 pt-6">
              <p className="text-sm text-gray-500">
                Don't have an account?{' '}
                <Link to="/register" className="text-[#dd0031] font-medium hover:underline hover:text-[#b00027] transition-colors">
                  Sign up
                </Link>
              </p>
            </CardFooter>
          </Card>
      </div>
    </div>
  );
}
