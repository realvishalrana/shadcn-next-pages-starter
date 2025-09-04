import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// Removed Redux dependency
import RegisterForm from '@/components/auth/RegisterForm';
import { Toaster } from '@/components/ui/toaster';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { storage } from '@/lib/storage';

const RegisterPage = () => {
  const router = useRouter();
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

  const handleRegisterSuccess = () => {
    // Redirect to OTP verification
    router.push('/auth/otp');
  };

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <RegisterForm onSuccess={handleRegisterSuccess} />
      </div>
      <Toaster />
    </div>
  );
};

export default RegisterPage;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
