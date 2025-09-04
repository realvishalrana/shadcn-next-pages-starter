import { useTranslation as useNextI18nextTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

export const useTranslation = (namespace = 'common') => {
  const { t, i18n } = useNextI18nextTranslation(namespace);
  const router = useRouter();

  const changeLanguage = lng => {
    if (router && router.push) {
      // Use Next.js router to change locale
      router.push(router.asPath, router.asPath, { locale: lng });
    }
  };

  return {
    t,
    i18n,
    changeLanguage,
    currentLanguage: router?.locale || 'en',
    languages: ['en', 'es'],
  };
};
