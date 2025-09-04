import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import { Toaster } from '@/components/ui/toaster';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const ForgotPasswordPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <ForgotPasswordForm />
      </div>
      <Toaster />
    </div>
  );
};

export default ForgotPasswordPage;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
