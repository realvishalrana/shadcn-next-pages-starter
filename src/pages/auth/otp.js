import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import OTPForm from '@/components/auth/OTPForm';
import { Toaster } from '@/components/ui/toaster';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { storage } from '@/lib/storage';

const OTPPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    // Check if user is already authenticated
    const storedUser = storage.getItem('user');
    const storedToken = storage.getItem('token');

    if (storedUser && storedToken) {
      router.push('/dashboard');
    } else {
      // Get phone number from query params or localStorage
      const phone = router.query.phone || storage.getItem('tempPhone');
      if (phone) {
        setPhoneNumber(phone);
      }
      setIsLoading(false);
    }
  }, [router]);

  const handleOTPSuccess = () => {
    console.log('🎉 OTP Success callback called! Redirecting to dashboard...');
    router.push('/dashboard');
  };

  const handleEditPhone = () => {
    router.push('/auth/register');
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
        <OTPForm
          phoneNumber={phoneNumber}
          onSuccess={handleOTPSuccess}
          onEditPhone={handleEditPhone}
        />
      </div>
      <Toaster />
    </div>
  );
};

export default OTPPage;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
