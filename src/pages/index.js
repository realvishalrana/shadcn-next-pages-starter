import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// Removed Redux dependency
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { ArrowRight, Shield, Zap, Globe, Code, Database } from 'lucide-react';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { storage } from '@/lib/storage';

export default function Home() {
  const router = useRouter();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for authentication
    const storedUser = storage.getItem('user');
    const storedToken = storage.getItem('token');

    if (storedUser && storedToken) {
      router.push('/dashboard');
    } else {
      setIsLoading(false);
    }
  }, [router]);

  // Show loading state during hydration
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">MyApp</h1>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              <Link href="/auth/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/auth/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <Badge variant="secondary" className="mb-4">
            🚀 Built with Next.js 15 & Modern Stack
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Modern Web Application
            <span className="block text-blue-600">Best Practices</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A complete Next.js application with authentication,
            internationalization, state management, form validation, and modern
            UI components.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <Shield className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle>Authentication</CardTitle>
              <CardDescription>
                Complete auth system with login, register, forgot password, and
                JWT tokens
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Globe className="h-8 w-8 text-green-600 mb-2" />
              <CardTitle>Internationalization</CardTitle>
              <CardDescription>
                Multi-language support with next-i18next and 10+ languages
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Database className="h-8 w-8 text-purple-600 mb-2" />
              <CardTitle>State Management</CardTitle>
              <CardDescription>
                Redux Toolkit for predictable state management with async thunks
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Code className="h-8 w-8 text-orange-600 mb-2" />
              <CardTitle>Form Validation</CardTitle>
              <CardDescription>
                React Hook Form with Yup validation and shadcn/ui components
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Zap className="h-8 w-8 text-yellow-600 mb-2" />
              <CardTitle>API Integration</CardTitle>
              <CardDescription>
                Axios-based API client with interceptors and error handling
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="h-8 w-8 text-red-600 mb-2" />
              <CardTitle>Code Quality</CardTitle>
              <CardDescription>
                ESLint, Prettier, Husky pre-commit hooks for consistent code
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Tech Stack */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Built With</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'Next.js 15',
              'React 19',
              'Tailwind CSS',
              'shadcn/ui',
              'Redux Toolkit',
              'React Hook Form',
              'Axios',
              'next-i18next',
              'Yup',
              'ESLint',
              'Prettier',
              'Husky',
            ].map(tech => (
              <Badge key={tech} variant="outline" className="px-4 py-2">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 MyApp. Built with modern web technologies.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
