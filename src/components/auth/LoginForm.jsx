'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from '@/hooks/useForm';
import { loginSchema } from '@/lib/validations';
import { useLoginMutation } from '@/store/api/apiSlice';
import { useTranslation } from '@/hooks/useTranslation';
import { storage } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import Link from 'next/link';

const LoginForm = ({ onSuccess }) => {
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const { t } = useTranslation();

  const { register, handleSubmit, errors, isSubmitting } = useForm(
    loginSchema,
    {
      email: '',
      password: '',
    }
  );

  const onSubmit = async data => {
    try {
      setError(null);

      // Simulate API call with localStorage
      const storedUser = storage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        // Simple email check (in real app, you'd verify password too)
        if (user.email === data.email) {
          onSuccess?.();
        } else {
          setError('Invalid email or password');
        }
      } else {
        setError('No account found. Please register first.');
      }
    } catch (error) {
      setError('Login failed');
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">
          {t('auth.login.title')}
        </CardTitle>
        <CardDescription className="text-center">
          {t('auth.login.subtitle')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">{t('auth.login.email')}</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register('email')}
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">{t('auth.login.password')}</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                {...register('password')}
                className={errors.password ? 'border-red-500 pr-10' : 'pr-10'}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <Link
              href="/auth/forgot-password"
              className="text-sm text-primary hover:underline"
            >
              {t('auth.login.forgotPassword')}
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || isLoading}
          >
            {isSubmitting || isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('auth.login.signingIn')}
              </>
            ) : (
              t('auth.login.signIn')
            )}
          </Button>

          <div className="text-center text-sm">
            {t('auth.login.noAccount')}{' '}
            <Link
              href="/auth/register"
              className="text-primary hover:underline"
            >
              {t('auth.login.signUp')}
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
