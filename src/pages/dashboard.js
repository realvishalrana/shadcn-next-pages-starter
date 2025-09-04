import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { storage } from '@/lib/storage';
import DashboardLayout from '@/components/layout/DashboardLayout';
import FantasyDashboard from '@/components/dashboard/FantasyDashboard';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const DashboardPage = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for user data
    const storedUser = storage.getItem('user');
    const storedToken = storage.getItem('token');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setIsLoading(false);
    } else {
      router.push('/auth/login');
      return;
    }
  }, [router]);

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
    <DashboardLayout>
      <FantasyDashboard />
    </DashboardLayout>
  );
};

export default DashboardPage;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
